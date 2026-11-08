'use client';

import { useEffect, useState } from 'react';

const links = [['packages', 'Packages'], ['compare', 'Compare'], ['addons', 'Add-ons'], ['how-it-works', 'How it works'], ['faq', 'FAQ'], ['request-audit', 'Free audit']];

export default function ServicesInPageNav() {
  const [active, setActive] = useState('packages');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: '-120px 0px -65% 0px' });
    links.forEach(([id]) => document.getElementById(id) && observer.observe(document.getElementById(id)));
    return () => observer.disconnect();
  }, []);
  return <nav className="services-inpage-nav" aria-label="Services page sections">{links.map(([id, label]) => <a href={`#${id}`} className={active === id ? 'is-active' : ''} key={id}>{label}</a>)}</nav>;
}
