'use client';

import { useState } from 'react';
import { whatsappUrl } from '../data/contact';

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get('name') || '').trim();
    const business = String(fields.get('business') || '').trim();
    const phone = String(fields.get('phone') || '').trim();
    const email = String(fields.get('email') || '').trim();
    const service = String(fields.get('service') || 'General Enquiry');
    const message = String(fields.get('message') || '').trim();
    const lines = [
      "Hi Axivy, I'd like to discuss a business solution.",
      '',
      `Name: ${name}`,
      `Business: ${business || 'Not provided'}`,
      `My WhatsApp: ${phone || 'Not provided'}`,
      `Email: ${email}`,
      `Need help with: ${service}`,
      `Message: ${message || 'Not provided'}`,
    ];
    window.open(whatsappUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, business, company: business, phone, email, service, message }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'We could not send your enquiry. Please try again.');

      setStatusType('success');
      setStatus('Your enquiry was sent to Axivy. You can also review and send the WhatsApp message that opened.');
      setIsSubmitted(true);
      form.reset();
      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    } catch (error) {
      setStatusType('error');
      setStatus(error.message || 'We could not send your enquiry. Please try again; your details are still in the form.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return <form onSubmit={handleSubmit} className="contact-form">
    <label>Name<input name="name" required maxLength={120} autoComplete="name" placeholder="Your name" /></label>
    <label>Business Name<input name="business" maxLength={160} autoComplete="organization" placeholder="Business name" /></label>
    <label>WhatsApp Number<input name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="Your number" /></label>
    <label>Email<input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@business.com" /></label>
    <label className="span-two">What do you need help with?<select name="service" defaultValue="Not Sure">{['Website','Lead Management','CRM','WhatsApp','Automation','AI','Analytics','Custom Solution','Not Sure'].map(x=><option key={x}>{x}</option>)}</select></label>
    <label className="span-two">Message<textarea name="message" maxLength={2000} placeholder="Tell us a little about your business and the challenge." /></label>
    <button className="btn btn-primary span-two" type="submit" disabled={isSubmitting} style={{justifySelf:'start'}}>{isSubmitting ? 'Sending…' : isSubmitted ? 'Enquiry Sent ✓' : 'Send Enquiry'} <span aria-hidden>→</span></button>
    {status && <p role="status" aria-live="polite" className={`status-message span-two ${statusType === 'error' ? 'status-message-error' : ''}`}>{status}</p>}
  </form>;
}
