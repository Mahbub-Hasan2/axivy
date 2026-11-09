'use client';

import { useState } from 'react';

const choices = [
  ['starter', 'No website yet', 'Starter'],
  ['growth', 'Enquiries and follow-ups slip', 'Growth'],
  ['care', 'Already set up, want upkeep', 'Monthly Care'],
];

export default function ServicesChooser() {
  const [active, setActive] = useState(null);
  const select = key => { setActive(key); document.getElementById(`package-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); window.history.replaceState(null, '', `#audit-${key}`); };
  return <section className="services-chooser" aria-label="Choose a starting point"><div className="shell"><p className="eyebrow">Which fits you?</p><div role="group" className="services-chooser-options">{choices.map(([key, problem, label]) => <button type="button" key={key} aria-pressed={active === key} onClick={() => select(key)} className={active === key ? 'is-selected' : ''}><span>{problem}</span><strong>{label} <span aria-hidden>→</span></strong></button>)}</div></div></section>;
}
