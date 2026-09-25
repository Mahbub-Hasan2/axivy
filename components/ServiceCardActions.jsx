'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Bot, Database, Globe2, MessageCircle, Sparkles, Users, Workflow, X } from 'lucide-react';

const serviceIcons = {
  'Website Development': Globe2,
  'Lead Management': Users,
  'CRM Systems': Database,
  'WhatsApp Systems': MessageCircle,
  'Business Automation': Workflow,
  'AI Solutions': Sparkles,
};

function trackEvent(eventName, service) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, { service });
  }
}

export default function ServiceCardActions({ service, number, whatsappHref }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const triggerRef = useRef(null);
  const nameRef = useRef(null);
  const dialogRef = useRef(null);
  const Icon = serviceIcons[service] || Bot;

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    nameRef.current?.focus();
    const handleKeyDown = event => {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea:not([disabled])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  function openQuoteForm() {
    setFields({ name: '', email: '', company: '', message: `I'm interested in ${service}` });
    setStatus('');
    setStatusType('success');
    setIsSubmitted(false);
    setIsOpen(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, service }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'We could not send your request. Please try again.');

      setStatusType('success');
      setStatus('Your quote request was sent. Axivy will follow up with you.');
      setIsSubmitted(true);
      trackEvent('quote_submitted', service);
    } catch (error) {
      setStatusType('error');
      setStatus(error.message || 'We could not send your request. Please try again. Your details are still here.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return <>
    <div className="service-card-heading">
      <span className="service-number">{number}</span>
      <Icon className="service-card-icon" size={20} strokeWidth={1.8} aria-hidden="true" />
    </div>
    <div className="service-card-actions">
      <a className="work-link" href={whatsappHref} target="_blank" rel="noreferrer" onClick={() => trackEvent('whatsapp_click', service)}>
        Discuss on WhatsApp <ArrowUpRight size={14} aria-hidden="true" />
      </a>
      <button ref={triggerRef} className="work-link quote-link" type="button" onClick={openQuoteForm}>Get a Quote</button>
    </div>

    {isOpen && <div className="quote-overlay" onMouseDown={event => { if (event.target === event.currentTarget) setIsOpen(false); }}>
      <section ref={dialogRef} className="quote-dialog" role="dialog" aria-modal="true" aria-labelledby="quote-dialog-title" aria-describedby="quote-dialog-description">
        <div className="quote-dialog-heading">
          <div>
            <p className="eyebrow">{service}</p>
            <h2 id="quote-dialog-title">Get a Quote</h2>
          </div>
          <button className="quote-close" type="button" aria-label="Close quote form" onClick={() => setIsOpen(false)}><X size={19} aria-hidden="true" /></button>
        </div>
        <p id="quote-dialog-description" className="quote-description">Tell us a little about what you need and we’ll get back to you.</p>
        <form className="contact-form quote-form" onSubmit={handleSubmit}>
          <label>Name<input ref={nameRef} name="name" autoComplete="name" required maxLength={120} value={fields.name} onChange={event => setFields(current => ({ ...current, name: event.target.value }))} /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} value={fields.email} onChange={event => setFields(current => ({ ...current, email: event.target.value }))} /></label>
          <label className="span-two">Company / Business name (optional)<input name="company" autoComplete="organization" maxLength={160} value={fields.company} onChange={event => setFields(current => ({ ...current, company: event.target.value }))} /></label>
          <label className="span-two">Message (optional)<textarea name="message" rows={3} maxLength={2000} value={fields.message} onChange={event => setFields(current => ({ ...current, message: event.target.value }))} /></label>
          <button className="btn btn-primary span-two" type="submit" disabled={isSubmitting || isSubmitted}>{isSubmitting ? 'Sending…' : 'Send Request'} <ArrowUpRight size={15} aria-hidden="true" /></button>
          {status && <p className={`status-message span-two ${statusType === 'error' ? 'status-message-error' : ''}`} role="status" aria-live="polite">{status}</p>}
        </form>
      </section>
    </div>}
  </>;
}
