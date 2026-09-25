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
  const service = typeof payload.service === 'string' ? payload.service : '';

  if (!name || name.length > 120 || !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Enter a valid name and email address, then try again.' }, 400);
  }
  if (company.length > 160 || business.length > 160 || phone.length > 40 || message.length > 2000 || !allowedServices.has(service)) {
    return json({ error: 'Please check the form details and try again.' }, 400);
  }

  const to = process.env.AXIVY_LEADS_TO;
  const from = process.env.AXIVY_EMAIL_FROM;
  if (!to || !from) {
    return json({ error: 'Enquiry delivery is not configured yet. Please contact Axivy on WhatsApp instead; your details are still in the form.' }, 503);
  }

  const text = [
    `Service: ${service}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company / business: ${company || business || 'Not provided'}`,
    `WhatsApp number: ${phone || 'Not provided'}`,
    '',
    'Message:',
    message || 'Not provided',
  ].join('\n');
  const subject = `Quote request: ${service}`;

  try {
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to: [to], reply_to: email, subject, text }),
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error(`Resend returned ${response.status}`);
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      const port = Number(process.env.SMTP_PORT || 587);
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: process.env.SMTP_SECURE === 'true' || port === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
      });
      await transporter.sendMail({ from, to, replyTo: email, subject, text });
    } else {
      return json({ error: 'Enquiry delivery is not configured yet. Please contact Axivy on WhatsApp instead; your details are still in the form.' }, 503);
    }

    return json({ ok: true });
  } catch (error) {
    console.error('Lead email delivery failed:', error instanceof Error ? error.message : 'Unknown email provider error');
    return json({ error: 'We could not send your request right now. Please try again; your details are still in the form.' }, 502);
  }
}
