import Link from 'next/link';
import CustomerJourneyPanel from '../components/CustomerJourneyPanel';
import { Layout } from '../components/SiteShell';
import { articles, cases, faqs, services, solutions } from '../data/content';
import { whatsappUrl } from '../data/contact';

const problems = [
  ['01', 'Missed enquiries', 'Potential customers contact you when your team is busy or unavailable.'],
  ['02', 'Slow follow-ups', 'Good leads can lose interest when responses and next steps depend on memory.'],
  ['03', 'Scattered information', 'Customer details and conversations end up across chats, spreadsheets and inboxes.'],
  ['04', 'Limited visibility', 'Without the right data, it can be difficult to understand where enquiries come from and what happens next.'],
];

const process = [
  ['01', 'Discover', 'Understand your business, customers and current workflow.'],
  ['02', 'Define', 'Set the right scope, priorities and practical plan.'],
  ['03', 'Design', 'Shape a clear experience around your customers and team.'],
  ['04', 'Build', 'Develop and connect the systems your business needs.'],
  ['05', 'Launch', 'Test, refine and prepare everything for real-world use.'],
  ['06', 'Improve', 'Monitor, maintain and evolve the system as you grow.'],
];

function WorkflowPreview() {
  const steps = [
    ['01', 'Website enquiry', 'A customer finds your business', '↗'],
    ['02', 'Lead captured', 'Details are collected clearly', '◎'],
    ['03', 'CRM', 'Your team sees the next step', '▤'],
    ['04', 'WhatsApp follow-up', 'A timely, personal response', '◌'],
    ['05', 'Booking', 'The enquiry moves forward', '✓'],
  ];

  return <div className="refhome-workflow" aria-label="Example customer enquiry workflow">
    <div className="refhome-workflow-head"><strong>Designed around your customer journey</strong><span>EXAMPLE WORKFLOW</span></div>
    <div className="refhome-workflow-steps">{steps.map(([number, title, detail, icon]) => <div className={`refhome-workflow-step ${number === '04' ? 'active' : ''}`} key={number}><i>{icon}</i><strong>{title}</strong><span>{detail}</span></div>)}</div>
    <div className="refhome-workflow-foot"><span>Website</span><b>→</b><span>Lead</span><b>→</b><span>CRM</span><b>→</b><span>WhatsApp</span><b>→</b><span>Booking</span></div>
  </div>;
}

function ProductMock() {
  return <div className="product-mock" role="img" aria-label="Illustrative automotive product catalogue interface"><div className="product-bar"><span className="product-brand">AUTOMOTIVE PRODUCT CATALOGUE</span><span className="product-basket">Illustrative UI</span></div><div className="product-grid">{['◉', '◈', '◇'].map((icon, index) => <div className="product-tile" key={icon}><div className="product-picture">{icon}</div><div className="product-line"/><div className="product-line short"/></div>)}</div></div>;
}

function WorkCard({ item, featured = false }) {
  if (!item) return null;
  const [slug, title, category, status, description] = item;
  return <article className={`refhome-work-card ${featured ? 'featured' : ''}`}>
    {featured ? <div className="refhome-work-art"><ProductMock/><span className="refhome-art-caption">ILLUSTRATIVE UI · NOT A LIVE PRODUCT SCREEN</span></div> : <div className={`refhome-work-art ${slug === 'sahara' ? 'sahara' : 'dark'}`}>{slug === 'sahara' ? <><strong className="refhome-sahara-mark">S</strong><span>Business website</span></> : <div className="refhome-work-demo"><span>CONCEPT / DEMO</span><strong>Workshop enquiries</strong><i>Booking flow →</i></div>}</div>}
    <div className="refhome-work-info"><div className="refhome-work-meta"><span>{category}</span><span>{status}</span></div><h3>{title}</h3><p>{description}</p><Link href={`/case-studies/${slug}`} className="refhome-inline-link">{featured ? 'View case study' : status === 'Concept / Demo' ? 'View concept' : 'View project'} <span aria-hidden>↗</span></Link></div>
  </article>;
}

export default function Home() {
  const featuredCases = cases.slice(0, 3);
  return <Layout><main className="refhome">
    <section className="home-hero refhome-hero">
      <div className="shell hero-grid refhome-hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">DIGITAL SOLUTIONS &amp; AUTOMATION</p>
          <h1 className="hero-title">Better digital systems for businesses that want to move faster.</h1>
          <p className="hero-description">Axivy helps Qatar businesses build better websites, manage customer enquiries, and automate repetitive work with practical digital systems.</p>
          <div className="hero-actions"><Link className="btn btn-primary" href="/contact">Let’s Talk <span aria-hidden>↗</span></Link><Link className="btn btn-secondary" href="/case-studies">View Our Work <span aria-hidden>↗</span></Link></div>
          <p className="hero-note"><span className="note-dot"/> Doha, Qatar · Available for remote projects</p>
        </div>
        <div className="refhome-hero-visual"><WorkflowPreview/></div>
      </div>
    </section>

    <div className="capability-strip"><div className="shell capability-inner"><div className="capability-list">{['Websites', 'CRM', 'WhatsApp', 'Automation', 'AI', 'Analytics'].map(label => <span className="capability-item" key={label}>{label}</span>)}</div></div></div>

    <section className="section refhome-problems"><div className="shell">
      <div className="section-head"><div><p className="eyebrow">THE PROBLEM</p><h2 className="section-heading">Good businesses lose opportunities when their systems don’t keep up.</h2></div><p className="section-copy">Customers can reach you at any time. When enquiries, follow-ups and customer information are handled manually, opportunities can easily get missed.</p></div>
      <div className="problem-grid">{problems.map(([number, title, copy]) => <article className="problem-card" key={number}><span className="problem-number">{number}</span><h3 className="problem-title">{title}</h3><p className="problem-description">{copy}</p></article>)}</div>
    </div></section>

    <section className="section refhome-services home-services-section"><div className="shell">
      <div className="section-head"><div><p className="eyebrow">WHAT WE BUILD</p><h2 className="section-heading">Digital systems built around your customer journey.</h2></div><div><p className="section-copy">From your first website visit to the final follow-up, Axivy connects the tools and workflows your business needs to operate more efficiently.</p><Link href="/services" className="refhome-inline-link">Explore all services <span aria-hidden>↗</span></Link></div></div>
      <div className="service-grid refhome-service-grid">{services.map((service, index) => <Link className="service-card refhome-service-card" href={`/services/${service.slug}`} key={service.slug}>
        <div className="service-card-top"><span className="service-number">{String(index + 1).padStart(2, '0')}</span><span className="service-icon" aria-hidden>{service.icon}</span></div>
        <h3 className="service-title">{service.title}</h3><p className="service-description">{service.description}</p>
        <div className="refhome-service-bottom"><span>Indicative: {service.priceRange}</span><span className="service-arrow" aria-hidden>Explore ↗</span></div>
      </Link>)}</div>
    </div></section>

    <section className="feature-section refhome-connected"><div className="shell feature-grid">
      <div><p className="eyebrow">CONNECTED SYSTEMS</p><h2 className="feature-title">One customer journey.<br/>One connected system.</h2><p className="feature-copy">Bring your website, CRM, WhatsApp and follow-ups into a workflow shaped around how your business actually works.</p><div className="feature-path" aria-label="Example connected workflow">{['Website', 'Lead', 'CRM', 'WhatsApp', 'Follow-up', 'Booking', 'Analytics'].map(label => <span key={label}>{label}</span>)}</div><Link className="btn btn-primary" href="/solutions" style={{marginTop: 22}}>Explore Connected Solutions <span aria-hidden>→</span></Link></div>
      <CustomerJourneyPanel/>
    </div></section>

    <section className="section refhome-industries"><div className="shell"><div className="section-head"><div><p className="eyebrow">BUILT FOR BUSINESS</p><h2 className="section-heading">Built around the way your business works.</h2></div><div><p className="section-copy">We adapt the technology to your workflow—not the other way around.</p><Link href="/solutions" className="refhome-inline-link">Explore Solutions <span aria-hidden>↗</span></Link></div></div><div className="industry-grid">{solutions.map(({ slug, name, summary }) => <Link className="industry-item" href={`/solutions/${slug}`} key={slug}><span><h3 className="industry-name">{name}</h3><p className="industry-description">{summary}</p></span><span className="industry-arrow" aria-hidden>↗</span></Link>)}</div></div></section>

    <section className="section refhome-work"><div className="shell"><div className="section-head"><div><p className="eyebrow">SELECTED WORK</p><h2 className="section-heading">Made to solve real business needs.</h2></div><div><p className="section-copy">A selection of real projects and clearly labelled concepts built around real business problems.</p><Link href="/case-studies" className="refhome-inline-link">All case studies <span aria-hidden>↗</span></Link></div></div><div className="refhome-work-grid"><WorkCard item={featuredCases[0]} featured/><WorkCard item={featuredCases[1]}/><WorkCard item={featuredCases[2]}/></div></div></section>

    <section className="section refhome-process"><div className="shell"><div className="section-head"><div><p className="eyebrow">HOW WE WORK</p><h2 className="section-heading">A clear path from idea to launch.</h2></div><div><p className="section-copy">We start with the business problem, then build the right solution around your goals, workflow and customers.</p><Link href="/process" className="refhome-inline-link">Our process <span aria-hidden>↗</span></Link></div></div><div className="process-grid">{process.map(([number, title, copy]) => <article className="process-step" key={number}><span className="process-number">{number}</span><h3 className="process-title">{title}</h3><p className="process-copy">{copy}</p></article>)}</div></div></section>

    <section className="section refhome-about"><div className="shell about-grid"><div className="refhome-about-mark"><span className="refhome-about-monogram">A</span><span className="refhome-about-orbit orbit-a"/><span className="refhome-about-orbit orbit-b"/><div><strong>AXIVY</strong><span>DOHA, QATAR · REMOTE-READY</span></div></div><div><p className="eyebrow">ABOUT AXIVY</p><h2 className="section-heading">Technology built around real business problems.</h2><p className="section-copy">Axivy helps businesses use technology in a practical way—through websites, customer systems, automation and AI.</p><p className="section-copy">We focus on understanding how your business actually works before deciding what technology it needs.</p><Link href="/about" className="refhome-inline-link">More about Axivy <span aria-hidden>↗</span></Link></div></div></section>

    <section className="section refhome-insights"><div className="shell"><div className="section-head"><div><p className="eyebrow">INSIGHTS</p><h2 className="section-heading">Ideas for better business systems.</h2></div><div><p className="section-copy">Practical guides on websites, customer management, WhatsApp, automation and AI for growing businesses.</p><Link href="/insights" className="refhome-inline-link">All insights <span aria-hidden>↗</span></Link></div></div><div className="insight-grid">{articles.slice(0, 3).map(([slug, title, description]) => <Link href={`/insights/${slug}`} className="insight-card" key={slug}><span className="insight-category">BUSINESS SYSTEMS</span><h3 className="insight-title">{title}</h3><p className="insight-description">{description}</p><span className="insight-read">Read insight <span aria-hidden>→</span></span></Link>)}</div></div></section>

    <section className="section refhome-faq"><div className="shell"><p className="eyebrow">COMMON QUESTIONS</p><h2 className="section-heading">A few things businesses often ask.</h2><div className="faq-grid">{faqs.slice(0, 8).map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>

    <section className="final-cta refhome-final"><div className="shell cta-grid"><div><p className="eyebrow">START A CONVERSATION</p><h2 className="cta-title">Have a business problem worth solving?</h2><p className="cta-copy">Tell us what is slowing your business down. We’ll help you identify a practical digital or automation solution.</p></div><div className="cta-actions"><Link className="btn btn-primary" href="/contact">Let’s Talk <span aria-hidden>→</span></Link><a className="btn btn-secondary" href={whatsappUrl("Hi Axivy, I'd like to discuss a business solution.")} target="_blank" rel="noreferrer">Chat on WhatsApp <span aria-hidden>→</span></a><span className="cta-phone">+974 7108 3700 · Doha, Qatar</span></div></div></section>
  </main></Layout>;
}
