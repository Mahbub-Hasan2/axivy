'use client';

import { useState } from 'react';
import { whatsappUrl } from '../data/contact';

const schedulingLink = process.env.NEXT_PUBLIC_SCHEDULING_LINK || null;

const initialFields = {
  name: '',
  business: '',
  whatsapp: '',
  email: '',
  challenge: '',
};

export default function AuditRequestForm({ industry }) {
  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, industry }),
      });

      let result = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        throw new Error(result?.error || 'We could not send your request. Please try again.');
      }

      setStatusType('success');
      setStatus('Your free audit request has been sent. Axivy will review your workflow and get back to you.');
      setIsSubmitted(true);
      // Reset all form inputs
      setFields(initialFields);

      // Return button text back to default after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    } catch (error) {
      setStatusType('error');
      setStatus(error.message || 'We could not send your request. Please try again; your details are still here.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(field, value) {
    if (isSubmitted) setIsSubmitted(false);
    setFields(current => ({ ...current, [field]: value }));
  }

  return <section className="page-content" id="request-audit">
    <div className="shell audit-form-layout">
      <div>
        <p className="eyebrow">A practical first step</p>
        <h2 className="section-heading">Not sure where to start? Get a free audit.</h2>
        <p className="section-copy">Tell us a bit about how your business currently handles enquiries, bookings and follow-ups. We'll review it and send you a short, honest breakdown of what's working, what's likely costing you leads, and where a system like this would help most. No obligation, no generic pitch.</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name<input name="name" autoComplete="name" required maxLength={120} value={fields.name} onChange={event => handleChange('name', event.target.value)} /></label>
        <label>Business name<input name="business" autoComplete="organization" required maxLength={160} value={fields.business} onChange={event => handleChange('business', event.target.value)} /></label>
        <label>WhatsApp number<input name="whatsapp" type="tel" autoComplete="tel" required maxLength={40} value={fields.whatsapp} onChange={event => handleChange('whatsapp', event.target.value)} /></label>
        <label>Email (optional)<input name="email" type="email" autoComplete="email" maxLength={254} value={fields.email} onChange={event => handleChange('email', event.target.value)} /></label>
        <label className="span-two">What's slowing you down right now?<textarea name="challenge" rows={4} maxLength={2000} value={fields.challenge} onChange={event => handleChange('challenge', event.target.value)} /></label>
        <button className="btn btn-primary span-two" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : isSubmitted ? 'Request Sent ✓' : 'Request My Free Audit'} <span aria-hidden>↗</span></button>
        {status && <p className={`status-message span-two ${statusType === 'error' ? 'status-message-error' : ''}`} role="status" aria-live="polite">{status}</p>}
        {isSubmitted && (
          <div className="span-two audit-success-actions">
            {schedulingLink && <a className="btn btn-primary" href={schedulingLink} target="_blank" rel="noreferrer">Schedule a Call <span aria-hidden>↗</span></a>}
            <a className="btn btn-secondary" href={whatsappUrl(`Hi Axivy, I just requested a free audit for my ${industry} business — let's find a time to talk.`)} target="_blank" rel="noreferrer">Message us on WhatsApp <span aria-hidden>↗</span></a>
          </div>
        )}
      </form>
    </div>
  </section>;
}
