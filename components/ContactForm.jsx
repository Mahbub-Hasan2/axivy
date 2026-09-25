'use client';

import { useState } from 'react';
import { whatsappUrl } from '../data/contact';

export default function ContactForm() {
  const [status, setStatus] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const lines = [
      "Hi Axivy, I'd like to discuss a business solution.",
      '',
      `Name: ${fields.get('name')}`,
      `Business: ${fields.get('business') || 'Not provided'}`,
      `My WhatsApp: ${fields.get('phone') || 'Not provided'}`,
      `Email: ${fields.get('email') || 'Not provided'}`,
      `Need help with: ${fields.get('service')}`,
      `Message: ${fields.get('message') || 'Not provided'}`,
    ];
    window.open(whatsappUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
    setStatus('Your enquiry is ready in WhatsApp. Review the message and tap Send to contact Axivy.');
  }

  return <form onSubmit={handleSubmit} className="contact-form">
    <label>Name<input name="name" required autoComplete="name" placeholder="Your name" /></label>
    <label>Business Name<input name="business" autoComplete="organization" placeholder="Business name" /></label>
    <label>WhatsApp Number<input name="phone" type="tel" autoComplete="tel" placeholder="Your number" /></label>
    <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@business.com" /></label>
    <label className="span-two">What do you need help with?<select name="service" defaultValue="Not Sure">{['Website','Lead Management','CRM','WhatsApp','Automation','AI','Analytics','Custom Solution','Not Sure'].map(x=><option key={x}>{x}</option>)}</select></label>
    <label className="span-two">Message<textarea name="message" placeholder="Tell us a little about your business and the challenge." /></label>
    <button className="btn btn-primary span-two" type="submit" style={{justifySelf:'start'}}>Send Enquiry <span aria-hidden>→</span></button>
    {status && <p role="status" aria-live="polite" className="status-message span-two">{status}</p>}
  </form>;
}
