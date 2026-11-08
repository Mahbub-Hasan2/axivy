'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { whatsappUrl } from '../data/contact';

const defaultEnquiry = 'Hi, I would like to know more about your services.';
const steps = [
  ['Enquiry received', 'Your sample message is ready for the next step.'],
  ['Saved in a sample sheet', 'A sample row is shown below.'],
  ['Team alert', 'A mock notification is ready for the team.'],
  ['Follow-up reminder', 'A sample reminder is scheduled for tomorrow.'],
];

export default function InteractiveDemo() {
  const [enquiry, setEnquiry] = useState(defaultEnquiry);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!running || step >= steps.length) return undefined;
    const timeout = window.setTimeout(() => setStep(current => current + 1), reducedMotion ? 0 : 650);
    return () => window.clearTimeout(timeout);
  }, [running, step, reducedMotion]);

  const sendSample = event => {
    event.preventDefault();
    setStep(0);
    setRunning(true);
  };

  const reset = () => {
    setEnquiry(defaultEnquiry);
    setStep(0);
    setRunning(false);
  };

  return <div className="overflow-hidden">
    <section className="page-hero"><div className="shell">
      <p className="eyebrow">Interactive demo</p>
      <h1>See how an enquiry system works</h1>
      <p>Try a sample enquiry and watch the example move through a simple follow-up process.</p>
    </div></section>
    <section className="page-content"><div className="shell max-w-4xl">
      <div className="rounded-xl border border-[var(--brand-green)] bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--ink)]" role="note">Interactive example. Nothing you type is sent or stored.</div>
      <form className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-7" onSubmit={sendSample}>
        <label htmlFor="sample-enquiry" className="block text-sm font-bold text-[var(--ink)]">Sample enquiry</label>
        <textarea id="sample-enquiry" value={enquiry} onChange={event => setEnquiry(event.target.value)} rows={4} className="mt-3 w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3 text-sm leading-6 text-[var(--ink)]" />
        <div className="mt-4 flex flex-wrap gap-3"><button className="btn btn-primary" type="submit" disabled={!enquiry.trim() || running}>Send sample enquiry <span aria-hidden>→</span></button><button className="btn btn-secondary" type="button" onClick={reset}>Reset</button></div>
      </form>
      <div className="mt-8" aria-live="polite" aria-atomic="true">
        <p className="sr-only">{step ? `${steps[Math.min(step, steps.length) - 1][0]}.` : 'Enter a sample enquiry to begin.'}</p>
        <ol className="grid gap-3" aria-label="Sample enquiry timeline">
          {steps.map(([title, detail], index) => {
            const visible = step > index;
            return <li key={title} className={visible ? 'grid grid-cols-[2rem_1fr] gap-3 rounded-xl border border-[var(--brand-green)] bg-white p-4 opacity-100 transition-opacity motion-reduce:transition-none' : 'grid grid-cols-[2rem_1fr] gap-3 rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4 opacity-50 transition-opacity motion-reduce:transition-none'}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--sage)] text-xs font-bold text-[var(--brand-green-dark)]">{index + 1}</span>
              <div><h2 className="text-base font-bold text-[var(--ink)]">{title}</h2><p className="mt-1 text-sm leading-6 text-[var(--muted)]">{detail}</p>
                {visible && index === 1 && <div className="mt-3 overflow-x-auto rounded-lg border border-[var(--line)]"><table className="w-full min-w-[320px] text-left text-xs"><thead className="bg-[var(--sage)] text-[var(--brand-green-dark)]"><tr><th className="px-3 py-2">Name</th><th className="px-3 py-2">Enquiry</th><th className="px-3 py-2">Status</th></tr></thead><tbody><tr><td className="px-3 py-2">Sample customer</td><td className="px-3 py-2">{enquiry}</td><td className="px-3 py-2">New</td></tr></tbody></table></div>}
                {visible && index === 2 && <div className="mt-3 rounded-lg border border-[var(--line)] bg-[var(--sage)] p-3 text-sm text-[var(--ink)]"><strong>New enquiry</strong><br />Sample customer needs a reply.</div>}
                {visible && index === 3 && <div className="mt-3 rounded-lg border border-[var(--line)] bg-[var(--sage)] p-3 text-sm text-[var(--ink)]"><strong>Tomorrow</strong><br />Follow up with Sample customer.</div>}
              </div>
            </li>;
          })}
        </ol>
      </div>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Link className="btn btn-primary" href="/services#request-audit">Get a free audit <span aria-hidden>↗</span></Link><a className="btn btn-secondary" href={whatsappUrl("Hi Axivy, I'd like to discuss a business solution.")} target="_blank" rel="noreferrer">Ask on WhatsApp <span aria-hidden>↗</span></a></div>
    </div></section>
  </div>;
}
