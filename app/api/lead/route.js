import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const allowedServices = new Set([
  'Website Development',
  'Lead Management',
  'CRM Systems',
  'WhatsApp Systems',
  'Business Automation',
  'AI Solutions',
  'Website',
  'CRM',
  'WhatsApp',
  'Automation',
  'AI',
  'Analytics',
  'Custom Solution',
  'Not Sure',
  'General Enquiry',
]);

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
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const company = typeof payload.company === 'string' ? payload.company.trim() : '';
  const business = typeof payload.business === 'string' ? payload.business.trim() : '';
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  const service = typeof payload.service === 'string' ? payload.service : 'General Enquiry';

  if (!name || name.length > 120 || !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Enter a valid name and email address, then try again.' }, 400);
  }
  if (company.length > 160 || business.length > 160 || phone.length > 40 || message.length > 2000 || !allowedServices.has(service)) {
    return json({ error: 'Please check the form details and try again.' }, 400);
  }

  const sheetWebhookUrl = process.env.GOOGLE_SHEET_LEADS_URL || process.env.GOOGLE_SHEET_WEBHOOK_URL;
  const to = process.env.AXIVY_LEADS_TO;
  const from = process.env.AXIVY_EMAIL_FROM;

  if (!sheetWebhookUrl && (!to || !from)) {
    return json(
      {
        error:
          'Enquiry delivery is not configured yet. Please contact Axivy on WhatsApp instead; your details are still in the form.',
      },
      503
    );
  }

  let sheetSaved = false;
  let emailSent = false;

  // 1. Save data to Google Sheets (via Google Apps Script Webhook)
  if (sheetWebhookUrl) {
    try {
      const sheetResponse = await fetch(sheetWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quote',
          name,
          email,
          business: business || company || 'Not provided',
          company: company || business || 'Not provided',
          phone: phone || 'Not provided',
          service,
          message: message || 'Not provided',
          timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Qatar' }),
        }),
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(15000),
      });

      if (!sheetResponse.ok) {
        console.error(`Google Sheets lead webhook failed with status: ${sheetResponse.status}`);
      } else {
        sheetSaved = true;
      }
    } catch (sheetError) {
      console.error(
        'Failed to save lead to Google Sheets:',
        sheetError instanceof Error ? sheetError.message : sheetError
      );
    }
  }

  // 2. Send email notification to Admin & Auto-confirmation to Client
  if (to && from) {
    const isGeneral = service === 'General Enquiry' || service === 'Not Sure';
    const clientSubject = isGeneral
      ? 'Thank you for contacting Axivy'
      : `Regarding your enquiry for ${service} — Axivy`;

    const clientHeadline = isGeneral
      ? 'Thank you for contacting Axivy'
      : `Thank you for your enquiry regarding ${service}`;

    const clientBodyIntro = isGeneral
      ? 'We have received your message. Our team is currently reviewing your enquiry and will connect with you shortly with relevant information.'
      : `We have received your enquiry for <strong>${service}</strong>. Our solutions team is currently studying your business requirements and exploring the best approach to streamline your operations, save time, and help you capture more clients.`;

    const adminSubject = `Quote request: ${service} - ${name}`;
    const adminText = [
      `Service: ${service}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Company / business: ${company || business || 'Not provided'}`,
      `WhatsApp number: ${phone || 'Not provided'}`,
      '',
      'Message:',
      message || 'Not provided',
    ].join('\n');
    const clientText = [
      `Hi ${name},`,
      '',
      `Thank you for contacting Axivy! We have received your request for ${service}.`,
      'Our team is reviewing your requirements and will reach out to you shortly via WhatsApp or email.',
      isGeneral
        ? 'Thank you for contacting Axivy! We have received your message.'
        : `Thank you for contacting Axivy regarding ${service}!`,
      '',
      'Request Summary:',
      `- Service: ${service}`,
      isGeneral
        ? 'Our team is reviewing your message and will reach out to you shortly.'
        : 'Our solutions team is currently studying your business requirements and exploring the most effective system to help streamline your operations and deliver the best results.',
      '',
      'Enquiry Summary:',
      `- Requested: ${service}`,
      `- Company / Business: ${company || business || 'Not specified'}`,
      `- Contact: ${phone || email}`,
      `- Your Contact: ${phone || email}`,
      '',
      'If you have any urgent questions, feel free to reply directly to this email or message us on WhatsApp.',
      'Need an urgent answer or want to chat with us right away?',
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
      <div style="font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px 24px; color: #171717; line-height: 1.6; background: #ffffff; border: 1px solid #e8e8e3; border-radius: 12px;">
        <div style="margin-bottom: 22px;">
          <span style="font-size: 19px; font-weight: 700; color: #1e2614; letter-spacing: -0.02em;">Axivy</span>
          <span style="font-size: 12px; color: #6b7754; margin-left: 8px;">• Digital Solutions &amp; Automation</span>
        </div>

        <h2 style="color: #2b371b; margin: 0 0 16px; font-size: 21px; line-height: 1.25;">${clientHeadline}</h2>
        <p style="margin: 0 0 14px; font-size: 15px;">Hi ${name},</p>
        <p style="margin: 0 0 16px; font-size: 14px; color: #333; line-height: 1.65;">
          ${clientBodyIntro}
        </p>

        <div style="background: #f7f8f4; border-left: 4px solid #788e4c; padding: 14px 18px; margin: 20px 0; border-radius: 6px;">
          <p style="margin: 3px 0; font-size: 13px; color: #444;"><strong style="color: #171717;">Service:</strong> ${service}</p>
          <p style="margin: 3px 0; font-size: 13px; color: #444;"><strong style="color: #171717;">Company / Business:</strong> ${company || business || 'Not specified'}</p>
          ${phone ? `<p style="margin: 3px 0; font-size: 13px; color: #444;"><strong style="color: #171717;">WhatsApp / Phone:</strong> ${phone}</p>` : ''}
        </div>

        <div style="background: #f2f5ec; border: 1px solid #dbe4ce; border-radius: 8px; padding: 16px; margin: 22px 0;">
          <p style="margin: 0 0 6px; font-size: 13px; font-weight: 700; color: #2d381c;">
            Need a quick answer or want to discuss right away?
          </p>
          <p style="margin: 0 0 12px; font-size: 13px; color: #555;">
            Our team is available on WhatsApp. You can message us directly at <strong>+974 7108 3700</strong>:
          </p>
          <a href="https://wa.me/97471083700" style="display: inline-block; background: #25d366; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 700; padding: 10px 18px; border-radius: 7px;">
            💬 Chat on WhatsApp (+974 7108 3700)
          </a>
        </div>

        <p style="margin: 20px 0 0; font-size: 13px; color: #555;">
          We will review your requirements and reach out to you shortly.
        </p>

        <div style="margin-top: 28px; padding-top: 18px; border-top: 1px solid #e8e8e3; font-size: 12px; color: #777; line-height: 1.6;">
          <p style="margin: 0 0 4px;"><strong style="color: #333;">Axivy Digital Solutions</strong> — Doha, Qatar</p>
          <p style="margin: 0 0 4px;">Phone / WhatsApp: <a href="https://wa.me/97471083700" style="color: #69784e; text-decoration: none;">+974 7108 3700</a> | Web: <a href="https://axivy.io" style="color: #69784e; text-decoration: none;">axivy.io</a></p>
          <p style="margin: 6px 0 0; color: #999; font-size: 11px;">You received this confirmation because a request was submitted on axivy.io.</p>
        </div>
      </div>
    `;

    try {
      if (process.env.RESEND_API_KEY) {
        // Send email to Admin
        const adminResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ from, to: [to], reply_to: email, subject: adminSubject, text: adminText }),
          cache: 'no-store',
          signal: AbortSignal.timeout(10000),
        });
        if (adminResponse.ok) emailSent = true;

        // Send auto-reply confirmation email to Client
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
        }).catch(err => console.error('Client auto-reply failed:', err));

      } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
        const port = Number(process.env.SMTP_PORT || 587);
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port,
          secure: process.env.SMTP_SECURE === 'true' || port === 465,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
        });

        // Send email to Admin
        await transporter.sendMail({ from, to, replyTo: email, subject: adminSubject, text: adminText });
        emailSent = true;

        // Send auto-reply confirmation email to Client
        transporter.sendMail({
          from,
          to: email,
          replyTo: to,
          subject: clientSubject,
          text: clientText,
          html: clientHtml,
        }).catch(err => console.error('Client auto-reply failed:', err));
      }
    } catch (error) {
      console.error('Lead email delivery failed:', error instanceof Error ? error.message : 'Unknown email error');
    }
  }

  // Only report success if at least one delivery channel (sheet or email) actually succeeded.
  if (!sheetSaved && !emailSent) {
    return json({ error: 'We could not send your request right now. Please try again or reach out on WhatsApp.' }, 502);
  }

  return json({ ok: true, message: 'Enquiry received successfully.' });
}
