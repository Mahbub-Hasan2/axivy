'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AXIVY_LOCATION, AXIVY_PHONE, whatsappUrl } from '../data/contact';

const nav = [['Services', '/services'], ['Solutions', '/solutions'], ['Work', '/case-studies'], ['Process', '/process'], ['About', '/about']];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="shell header-inner">
      <Link href="/" className="wordmark" aria-label="Axivy home">Axivy<span className="wordmark-mark">.</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}<Link href="/insights">Insights</Link></nav>
      <Link href="/contact" className="btn btn-primary header-cta">Let's Talk <span aria-hidden>↗</span></Link>
      <button className="mobile-menu-button" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>{open ? '×' : '☰'}</button>
    </div>
    {open && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
      {nav.map(([label, href]) => <Link href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link href="/insights" onClick={() => setOpen(false)}>Insights</Link>
      <Link href="/contact" className="btn btn-primary" onClick={() => setOpen(false)}>Let's Talk <span aria-hidden>↗</span></Link>
    </nav>}
  </header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="shell">
    <div className="footer-grid">
      <div className="footer-brand-column"><Link href="/" className="footer-brand">Axivy<span className="wordmark-mark">.</span></Link><p className="footer-tagline">Digital Solutions &amp; Automation</p><p className="footer-detail">{AXIVY_LOCATION}</p><p className="footer-detail">WhatsApp: {AXIVY_PHONE}</p><a className="btn btn-primary footer-action" href={whatsappUrl("Hi Axivy, I'd like to discuss a business solution.")} target="_blank" rel="noreferrer">Chat on WhatsApp <span aria-hidden>↗</span></a></div>
      <div><h2 className="footer-heading">Explore</h2><nav className="footer-links" aria-label="Footer navigation">
        {[['Services', '/services'], ['Solutions', '/solutions'], ['Work', '/case-studies'], ['Process', '/process'], ['About', '/about'], ['Insights', '/insights'], ['Contact', '/contact']].map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
      </nav></div>
      <div><h2 className="footer-heading">Based in Qatar</h2><p className="footer-tagline">Supporting teams in Qatar and working with businesses remotely.</p><nav className="footer-legal" aria-label="Legal links"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Axivy. All rights reserved.</span><span>{AXIVY_LOCATION}</span></div>
  </div></footer>;
}

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.querySelector('.home-hero, .page-hero');
    if (!hero) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return visible ? <a className="whatsapp-float" href={whatsappUrl("Hi Axivy, I'd like to discuss a business solution.")} target="_blank" rel="noreferrer" aria-label="Chat with Axivy on WhatsApp"><span aria-hidden>◉</span> WhatsApp</a> : null;
}

export function Layout({ children }) {
  return <><Header />{children}<Footer /><WhatsAppFloat /></>;
}
