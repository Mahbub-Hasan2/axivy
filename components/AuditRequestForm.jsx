'use client';

import { useState } from 'react';

export default function AuditRequestForm({ industry }) {
  const [fields, setFields] = useState({ name: '', business: '', whatsapp: '', email: '', challenge: '' });
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
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'We could not send your request. Please try again.');

      setStatusType('success');
      setStatus('Your free audit request has been sent. Axivy will review your workflow and get back to you.');
      setIsSubmitted(true);
    } catch (error) {
      setStatusType('error');
      setStatus(error.message || 'We could not send your request. Please try again; your details are still here.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return <section className="page-content" id="request-audit">
    <div className="shell audit-form-layout">
      <div>
        <p className="eyebrow">A practical first step</p>
        <h2 className="section-heading">Not sure where to start? Get a free audit.</h2>
        <p className="section-copy">Tell us a bit about how your business currently handles enquiries, bookings and follow-ups. We'll review it and send you a short, honest breakdown of what's working, what's likely costing you leads, and where a system like this would help most. No obligation, no generic pitch.</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name<input name="name" autoComplete="name" required maxLength={120} value={fields.name} onChange={event => setFields(current => ({ ...current, name: event.target.value }))} /></label>
        <label>Business name<input name="business" autoComplete="organization" required maxLength={160} value={fields.business} onChange={event => setFields(current => ({ ...current, business: event.target.value }))} /></label>
        <label>WhatsApp number<input name="whatsapp" type="tel" autoComplete="tel" required maxLength={40} value={fields.whatsapp} onChange={event => setFields(current => ({ ...current, whatsapp: event.target.value }))} /></label>
        <label>Email (optional)<input name="email" type="email" autoComplete="email" maxLength={254} value={fields.email} onChange={event => setFields(current => ({ ...current, email: event.target.value }))} /></label>
        <label className="span-two">What's slowing you down right now?<textarea name="challenge" rows={4} maxLength={2000} value={fields.challenge} onChange={event => setFields(current => ({ ...current, challenge: event.target.value }))} /></label>
        <button className="btn btn-primary span-two" type="submit" disabled={isSubmitting || isSubmitted}>{isSubmitting ? 'Sending…' : 'Request My Free Audit'} <span aria-hidden>↗</span></button>
        {status && <p className={`status-message span-two ${statusType === 'error' ? 'status-message-error' : ''}`} role="status" aria-live="polite">{status}</p>}
      </form>
    </div>
  </section>;
}
