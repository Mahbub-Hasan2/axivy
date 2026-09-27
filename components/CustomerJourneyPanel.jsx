'use client';

import { useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Website enquiry',
    status: 'Captured',
    detail: 'A clear form or WhatsApp prompt collects the details your team needs from the first message.',
    benefit: 'Customers get a simple next step instead of searching for how to contact you.',
    action: 'Capture contact details',
  },
  {
    number: '02',
    title: 'Lead record',
    status: 'Organized',
    detail: 'The enquiry becomes one shared record with the customer details, request and follow-up owner.',
    benefit: 'Your team can see every opportunity in one place and avoid duplicate work.',
    action: 'Assign the right person',
  },
  {
    number: '03',
    title: 'WhatsApp follow-up',
    status: 'Ready',
    detail: 'A timely, relevant WhatsApp message helps the customer move from interest to a real conversation.',
    benefit: 'Faster replies make it less likely that a good enquiry goes cold.',
    action: 'Send a timely reply',
  },
  {
    number: '04',
    title: 'Booking confirmed',
    status: 'Next step',
    detail: 'Once the customer is ready, the agreed appointment, quote or service request is clearly recorded.',
    benefit: 'Everyone knows what happens next and the customer receives a more reliable experience.',
    action: 'Confirm the next step',
  },
];

export default function CustomerJourneyPanel() {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const selected = steps[selectedIndex];

  return <div className="system-panel">
    <div className="system-panel-top"><span>Customer journey overview</span><span className="system-status">Click a step to explore</span></div>
    <div className="system-body">
      <div className="system-list" role="tablist" aria-label="Customer journey steps">
        {steps.map((step, index) => <button
          className={`system-row ${index === selectedIndex ? 'current' : ''}`}
          key={step.number}
          type="button"
          role="tab"
          aria-selected={index === selectedIndex}
          aria-controls="journey-detail"
          onClick={() => setSelectedIndex(index)}
        >
          <span className="system-row-number">{step.number}</span>
          <span className="system-row-title">{step.title}</span>
          <span className="system-row-meta">{step.status}</span>
        </button>)}
      </div>
      <div className="system-side" id="journey-detail" role="tabpanel">
        <div className="system-mini journey-detail" aria-live="polite">
          <div className="system-mini-label">What happens here</div>
          <div className="system-mini-value">{selected.title}</div>
          <p>{selected.detail}</p>
        </div>
        <div className="system-mini journey-benefit">
          <div className="system-mini-label">Why it helps</div>
          <p>{selected.benefit}</p>
          <span className="system-mini-chip">Next: {selected.action}</span>
        </div>
      </div>
    </div>
  </div>;
}
