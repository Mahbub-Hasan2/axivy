import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const json = (body, status = 200) => Response.json(body, { status });

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Please check the form and try again.' }, 400);
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return json({ error: 'Please check the form details and try again.' }, 400);
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const business = typeof payload.business === 'string' ? payload.business.trim() : '';
  const whatsapp = typeof payload.whatsapp === 'string' ? payload.whatsapp.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const challenge = typeof payload.challenge === 'string' ? payload.challenge.trim() : '';
  const industry = typeof payload.industry === 'string' ? payload.industry.trim() : '';

  if (!name || name.length > 120) {
    return json({ error: 'Please enter your name (up to 120 characters).' }, 400);
  }

  if (!business || business.length > 160) {
    return json({ error: 'Please enter your business name (up to 160 characters).' }, 400);
  }

  if (!whatsapp || whatsapp.length > 40) {
    return json({ error: 'Please enter a valid WhatsApp number (up to 40 characters).' }, 400);
  }

  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }

  if (challenge.length > 2000) {
    return json({ error: 'Challenge description is too long (maximum 2,000 characters).' }, 400);
  }

  const sheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.GOOGLE_SHEETS_AUDIT_URL;
  const to = process.env.AXIVY_LEADS_TO;
  const from = process.env.AXIVY_EMAIL_FROM;

  if (!sheetWebhookUrl && !to) {
    return json(
      {
        error:
          'Audit submission is not configured yet. Please configure GOOGLE_SHEET_WEBHOOK_URL in your .env.local file.',
      },
      503
    );
  }

  let sheetSaved = false;
  let emailSent = false;

  // 1. Send data to Google Sheets (Google Apps Script Web App)
  if (sheetWebhookUrl) {
    try {
      const sheetResponse = await fetch(sheetWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'audit',
          name,
          business,
          whatsapp,
          email: email || 'Not provided',
          challenge: challenge || 'Not provided',
          industry: industry || 'Not specified',
          timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Qatar' }),
        }),
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(15000),
      });

      if (!sheetResponse.ok) {
        console.error(`Google Sheets webhook failed with HTTP status: ${sheetResponse.status}`);
      } else {
        sheetSaved = true;
      }
    } catch (sheetError) {
      console.error(
        'Failed to post to Google Sheets webhook:',
        sheetError instanceof Error ? sheetError.message : sheetError
      );
    }
  }

  // 2. Email notification to Admin & Auto-confirmation to Client (if email configured)
  if (to && from) {
    const adminText = [
      'New Free Audit Request Received:',
      '',
      `Name: ${name}`,
      `Business: ${business}`,
      `WhatsApp: ${whatsapp}`,
      `Email: ${email || 'Not provided'}`,
      `Industry / Solution: ${industry || 'Not specified'}`,
      '',
      'What is slowing them down:',
      challenge || 'Not provided',
    ].join('\n');
    const adminSubject = `Free Audit Request: ${business} (${name})`;

    const clientSubject = `Your Free Workflow Audit Request — Axivy`;
    const clientText = [
      `Hi ${name},`,
      '',
      'Thank you for requesting a free audit from Axivy!',
      'Our team is reviewing your details and will prepare a short, honest breakdown of your workflows and opportunities.',
      'We will get back to you shortly via WhatsApp or email.',
      `Thank you for requesting a free systems and workflow audit for ${business}!`,
      '',
      'Request Summary:',
      'Our team is currently studying your enquiry details and operational challenges to prepare a practical, honest breakdown of what is working, where you might be losing potential leads, and how targeted automation or systems can save you hours of repetitive work.',
      '',
      'Audit Request Summary:',
      `- Business: ${business}`,
      `- Industry / Solution: ${industry || 'Not specified'}`,
      `- WhatsApp: ${whatsapp}`,
      '',
      'Need an urgent answer or have extra details to share?',
      'You can reach us directly on WhatsApp:',
      'WhatsApp: +974 7108 3700 (https://wa.me/97471083700)',
      '',
      'Best regards,',
      'The Axivy Team',
      'Digital Solutions & Automation',
      'Doha, Qatar',
      'https://axivy.io',
    ].join('\n');

    const clientHtml = `
      <div style="font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #171717; line-height: 1.6;">
        <h2 style="color: #2b371b; margin-top: 0; font-size: 22px;">Thank you for requesting a Free Audit</h2>
        <p>Hi ${name},</p>
        <p>We have successfully received your audit request for <strong>${business}</strong>. Our team will review how your business handles enquiries and workflows, and we'll reach out to you shortly via WhatsApp or email.</p>
        <div style="background: #f7f7f5; border-left: 4px solid #788e4c; padding: 14px 18px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 4px 0;"><strong>Business:</strong> ${business}</p>
          <p style="margin: 4px 0;"><strong>WhatsApp:</strong> ${whatsapp}</p>
          <p style="margin: 4px 0;"><strong>Industry / Solution:</strong> ${industry || 'Not specified'}</p>
      <div style="font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px 24px; color: #171717; line-height: 1.6; background: #ffffff; border: 1px solid #e8e8e3; border-radius: 12px;">
        <div style="margin-bottom: 22px;">
          <span style="font-size: 19px; font-weight: 700; color: #1e2614; letter-spacing: -0.02em;">Axivy</span>
          <span style="font-size: 12px; color: #6b7754; margin-left: 8px;">• Digital Solutions & Automation</span>
        </div>
        <p>If you have any questions in the meantime, feel free to reply directly to this email or message us on WhatsApp.</p>
        <p style="margin-top: 24px; font-size: 13px; color: #666; border-top: 1px solid #e5e5e0; padding-top: 16px;">
          Best regards,<br />
          <strong>Axivy Digital Solutions</strong><br />
          <a href="https://axivy.io" style="color: #788e4c; text-decoration: none;">axivy.io</a>

        <h2 style="color: #2b371b; margin: 0 0 16px; font-size: 21px; line-height: 1.25;">We have received your Free Audit request</h2>
        <p style="margin: 0 0 14px; font-size: 15px;">Hi ${name},</p>
        <p style="margin: 0 0 16px; font-size: 14px; color: #333; line-height: 1.65;">
          Thank you for requesting a free systems and workflow audit for <strong>${business}</strong>.
        </p>
        <p style="margin: 0 0 16px; font-size: 14px; color: #333; line-height: 1.65;">
          Our team is currently analyzing your current setup and challenges. We will prepare an honest, practical breakdown of what is working, where you might be losing potential leads, and where systems or automation will help you most.
        </p>

        <div style="background: #f7f8f4; border-left: 4px solid #788e4c; padding: 14px 18px; margin: 20px 0; border-radius: 6px;">
          <p style="margin: 3px 0; font-size: 13px; color: #444;"><strong style="color: #171717;">Business:</strong> ${business}</p>
          <p style="margin: 3px 0; font-size: 13px; color: #444;"><strong style="color: #171717;">WhatsApp:</strong> ${whatsapp}</p>
          <p style="margin: 3px 0; font-size: 13px; color: #444;"><strong style="color: #171717;">Industry / Solution:</strong> ${industry || 'Not specified'}</p>
        </div>

        <div style="background: #f2f5ec; border: 1px solid #dbe4ce; border-radius: 8px; padding: 16px; margin: 22px 0;">
          <p style="margin: 0 0 6px; font-size: 13px; font-weight: 700; color: #2d381c;">
            Have additional questions or files to share?
          </p>
          <p style="margin: 0 0 12px; font-size: 13px; color: #555;">
            You can message our team directly on WhatsApp at <strong>+974 7108 3700</strong>:
          </p>
          <a href="https://wa.me/97471083700" style="display: inline-block; background: #25d366; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 700; padding: 10px 18px; border-radius: 7px;">
            💬 Chat on WhatsApp (+974 7108 3700)
          </a>
        </div>

        <p style="margin: 20px 0 0; font-size: 13px; color: #555;">
          We will review your workflows and share our actionable breakdown shortly.
        </p>

        <div style="margin-top: 28px; padding-top: 18px; border-top: 1px solid #e8e8e3; font-size: 12px; color: #777; line-height: 1.6;">
          <p style="margin: 0 0 4px;"><strong style="color: #333;">Axivy Digital Solutions</strong> — Doha, Qatar</p>
          <p style="margin: 0 0 4px;">Phone / WhatsApp: <a href="https://wa.me/97471083700" style="color: #69784e; text-decoration: none;">+974 7108 3700</a> | Web: <a href="https://axivy.io" style="color: #69784e; text-decoration: none;">axivy.io</a></p>
          <p style="margin: 6px 0 0; color: #999; font-size: 11px;">You received this confirmation because a free audit was requested on axivy.io.</p>
        </div>
      </div>
    `;

    try {
      if (process.env.RESEND_API_KEY) {
        // Send email to Admin
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ from, to: [to], reply_to: email || undefined, subject: adminSubject, text: adminText }),
          cache: 'no-store',
          signal: AbortSignal.timeout(10000),
        });
        if (response.ok) {
          emailSent = true;
        }

        // Send confirmation email to Client (if client provided email)
        if (email) {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from,
              to: [email],
              reply_to: to,
              subject: clientSubject,
              text: clientText,
              html: clientHtml,
            }),
            cache: 'no-store',
            signal: AbortSignal.timeout(10000),
          }).catch(err => console.error('Client audit auto-reply failed:', err));
        }
      } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
        const port = Number(process.env.SMTP_PORT || 587);
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port,
          secure: process.env.SMTP_SECURE === 'true' || port === 465,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
        });
        await transporter.sendMail({ from, to, replyTo: email || undefined, subject: adminSubject, text: adminText });
        emailSent = true;

        if (email) {
          transporter.sendMail({
            from,
            to: email,
            replyTo: to,
            subject: clientSubject,
            text: clientText,
            html: clientHtml,
          }).catch(err => console.error('Client audit auto-reply failed:', err));
        }
      }
    } catch (emailError) {
      console.error(
        'Audit email notification failed:',
        emailError instanceof Error ? emailError.message : 'Unknown email provider error'
      );
    }
  }

  // If webhook was provided but saving failed, and no email was sent
  if (sheetWebhookUrl && !sheetSaved && !emailSent) {
    return json(
      {
        error:
          'Could not save your audit request to Google Sheets right now. Please try again or reach out on WhatsApp.',
      },
      502
    );
  }

  return json({ ok: true, message: 'Your audit request has been successfully submitted.' });
}
