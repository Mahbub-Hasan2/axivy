'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const journeySteps = [
  {
    label: 'Website enquiry',
    what: 'A customer asks about a product, service or appointment through your website.',
    why: 'A clear first step makes it easier for interested customers to reach your team.',
  },
  {
    label: 'Lead captured',
    what: 'The enquiry and the details the customer shared are collected in one place.',
    why: 'Your team can see who needs a reply without searching through separate inboxes.',
  },
  {
    label: 'CRM',
    what: 'The customer record is organized with an owner and a useful next action.',
    why: 'Everyone involved can work from the same context and keep the conversation moving.',
  },
  {
    label: 'WhatsApp follow-up',
    what: 'A teammate responds with the relevant details and continues the conversation on WhatsApp.',
    why: 'A timely, personal reply helps the customer get a clear answer in a familiar channel.',
  },
  {
    label: 'Booking',
    what: 'The agreed next step, such as a visit or appointment, is confirmed and recorded.',
    why: 'The customer and team know what happens next, with fewer details left to memory.',
  },
];

const chatMessages = [
  { type: 'customer', text: 'Hi, is this available? Can I visit tomorrow?' },
  { type: 'system', text: 'Enquiry saved to your CRM' },
  { type: 'business', text: 'Hello! Yes, it is. Does 10:00 suit you?' },
  { type: 'customer', text: 'Perfect, see you then.' },
  { type: 'system', text: 'Booking confirmed for 10:00' },
];

function PhoneChat() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return <div role="img" aria-label="Illustrative customer chat: enquiry saved to the CRM, followed up on WhatsApp and confirmed as a booking" className={`relative mx-auto w-full max-w-[380px] lg:mr-2 ${hydrated ? 'chat-ready' : ''}`}>
    <div aria-hidden className="absolute -inset-4 rounded-[2.5rem] bg-[var(--brand-green)] opacity-20 blur-2xl" />
    <div className="relative rounded-[2rem] border-[5px] border-[var(--ink)] bg-[var(--ink)] p-1.5 shadow-[0_25px_70px_rgba(0,0,0,.28)]">
      <div aria-hidden className="mx-auto mb-1.5 h-1 w-12 rounded-full bg-white/30" />
      <div className="overflow-hidden rounded-[1.45rem] bg-[var(--paper)]">
        <div className="flex items-center justify-between border-b border-[var(--line)] bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-[var(--sage)]"><Image src="/favicon.png" alt="" width={48} height={48} sizes="32px" className="h-7 w-7 object-contain" /></span>
            <div><p className="text-sm font-bold text-[var(--ink)]">Axivy</p><p className="text-[11px] text-[var(--muted)]">Customer enquiry</p></div>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--brand-green-dark)]"><span className="h-2 w-2 rounded-full bg-[var(--brand-green)]"/>Connected flow</span>
        </div>
        <div className="flex min-h-[300px] flex-col justify-center gap-2.5 p-3.5 sm:min-h-[330px] sm:gap-3 sm:p-4">
          {chatMessages.map(message => message.type === 'system'
            ? <div key={message.text} className="chat-message chat-message-system mx-auto flex w-fit max-w-full items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-3 py-2 text-center text-[10px] font-semibold text-[var(--brand-green-dark)] sm:text-[11px]"><span aria-hidden className="grid h-5 w-5 shrink-0 place-items-center rounded-lg bg-[var(--sage)]">✓</span>{message.text}</div>
            : <div key={message.text} className={`chat-message max-w-[88%] rounded-2xl px-3 py-2.5 text-xs leading-5 shadow-sm sm:px-3.5 ${message.type === 'business' ? 'business-message ml-auto rounded-br-sm bg-[var(--brand-green)] text-[var(--ink)]' : 'customer-message mr-auto rounded-bl-sm border border-[var(--line)] bg-white text-[var(--ink)]'}`}>
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-wider opacity-65">{message.type === 'business' ? 'Axivy business' : 'Customer'}</span><span>{message.text}</span>{message.type === 'business' && <span className="ml-2 whitespace-nowrap text-[9px] font-bold text-white/70">✓✓</span>}
            </div>)}
        </div>
        <div className="flex items-center gap-2 border-t border-[var(--line)] bg-white px-3 py-2.5"><span className="flex h-9 flex-1 items-center rounded-full bg-[var(--paper)] px-3 text-[10px] text-[var(--muted)]">Message your customer</span><span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--lime)] text-[var(--ink)]" aria-hidden>↗</span></div>
      </div>
    </div>
    <style jsx>{`
      .chat-message { opacity: 1; transform: none; }
      .chat-ready .chat-message { opacity: 0; animation: message-appear 500ms cubic-bezier(.2,.75,.25,1) both; }
      .chat-ready .chat-message:nth-child(1) { animation-delay: 350ms; }
      .chat-ready .chat-message:nth-child(2) { animation-delay: 950ms; }
      .chat-ready .chat-message:nth-child(3) { animation-delay: 1550ms; }
      .chat-ready .chat-message:nth-child(4) { animation-delay: 2150ms; }
      .chat-ready .chat-message:nth-child(5) { animation-delay: 2750ms; }
      @keyframes message-appear { from { opacity: 0; transform: translateY(9px); } to { opacity: 1; transform: translateY(0); } }
      @media (prefers-reduced-motion: reduce) { .chat-message { opacity: 1; animation: none; transform: none; } }
    `}</style>
  </div>;
}

function JourneyTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const moveTab = (event, index) => {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % journeySteps.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + journeySteps.length) % journeySteps.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = journeySteps.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };
  const selected = journeySteps[active];

  return <div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
    <div role="tablist" aria-label="Customer journey steps" aria-orientation="vertical" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
      {journeySteps.map((step, index) => <button key={step.label} ref={node => { tabs.current[index] = node; }} id={`journey-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls="journey-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => moveTab(event, index)} className={`group flex min-h-16 items-center gap-3 rounded-xl border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lime)] sm:min-h-[4.5rem] sm:px-4 ${active === index ? 'border-[var(--lime)] bg-white text-[var(--ink)]' : 'border-white/15 bg-white/[.04] text-white hover:bg-white/[.09]'}`}>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold ${active === index ? 'bg-[var(--lime)] text-[var(--ink)]' : 'bg-white/10 text-[var(--lime)]'}`}>0{index + 1}</span><span className="text-sm font-semibold">{step.label}</span><span aria-hidden className={`ml-auto text-sm ${active === index ? 'text-[var(--brand-green-dark)]' : 'text-white/45'}`}>↗</span>
      </button>)}
    </div>
    <div id="journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${active}`} tabIndex={0} className="rounded-2xl border border-white/15 bg-white/[.06] p-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lime)] sm:p-7">
      <p className="text-xs font-bold uppercase tracking-[.15em] text-[var(--lime)]">Step 0{active + 1}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{selected.label}</h3>
      <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/15" aria-hidden><span className="block h-full rounded-full bg-[var(--lime)] transition-[width] duration-300" style={{ width: `${((active + 1) / journeySteps.length) * 100}%` }} /></div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div><p className="text-xs font-bold uppercase tracking-wider text-white/55">What happens</p><p className="mt-2 text-sm leading-6 text-white/85">{selected.what}</p></div>
        <div><p className="text-xs font-bold uppercase tracking-wider text-white/55">Why it helps</p><p className="mt-2 text-sm leading-6 text-white/85">{selected.why}</p></div>
      </div>
    </div>
  </div>;
}

export default function HomeExperience({ mode }) {
  return mode === 'phone' ? <PhoneChat /> : <JourneyTabs />;
}
