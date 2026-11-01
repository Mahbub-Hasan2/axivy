import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import JsonLd from '../../components/JsonLd';
import { Layout } from '../../components/SiteShell';
import ContactForm from '../../components/ContactForm';
import AuditRequestForm from '../../components/AuditRequestForm';
import ServiceCardActions from '../../components/ServiceCardActions';
import { AXIVY_LOCATION, AXIVY_PHONE, AXIVY_WHATSAPP, whatsappUrl } from '../../data/contact';
import { articles, caseDetails, cases, services, solutions } from '../../data/content';
import { DEFAULT_OG_IMAGE, SITE_URL } from '../../lib/site';

const Arrow = () => <span aria-hidden>↗</span>;

const staticPageMetadata = {
  services: {
    title: 'Digital Services in Qatar',
    description: 'Websites, lead management, CRM, WhatsApp systems, business automation and AI solutions for Qatar businesses, with clear scope and indicative QAR pricing.',
    canonical: '/services',
  },
  solutions: {
    title: 'Industry Solutions',
    description: 'Practical websites, CRM systems and automation for automotive, restaurants and cafés, cleaning and maintenance, and other SMEs in Qatar.',
    canonical: '/solutions',
  },
  'case-studies': {
    title: 'Case Studies & Concepts',
    description: 'Explore Axivy website projects, real business work and clearly labelled system concepts for customer enquiries, bookings and follow-up.',
    canonical: '/case-studies',
  },
  process: {
    title: 'Our Process',
    description: 'See how Axivy moves from discovery and planning to build, launch and ongoing improvement for digital systems in Qatar.',
    canonical: '/process',
  },
  about: {
    title: 'About Axivy',
    absoluteTitle: true,
    description: 'Axivy is a founder-led digital solutions practice in Doha, Qatar, building practical websites, CRM systems and automation for growing businesses.',
    canonical: '/about',
  },
  insights: {
    title: 'Insights',
    description: 'Practical perspectives on lead management, websites, WhatsApp, CRM and automation for Qatar businesses.',
    canonical: '/insights',
  },
  contact: {
    title: 'Contact Axivy',
    absoluteTitle: true,
    description: 'Tell Axivy what you are trying to improve, automate or build. Start a conversation about your website, CRM, WhatsApp or business automation project.',
    canonical: '/contact',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How Axivy handles the information you share through its website, enquiry forms, WhatsApp links and optional analytics.',
    canonical: '/privacy',
  },
  terms: {
    title: 'Terms of Use',
    description: 'The terms that apply when you use the Axivy website and request information, quotes or project services.',
    canonical: '/terms',
  },
};

function resolvePage(slug) {
  if (!Array.isArray(slug) || slug.length === 0 || slug.length > 2) notFound();
  const [page, id] = slug;

  if (id) {
    if (page === 'services') {
      const service = services.find(item => item.slug === id);
      if (!service) notFound();
      return {
        kind: 'service-detail',
        data: { service, index: services.indexOf(service) },
        meta: {
          title: service.title,
          description: service.description,
          canonical: `/services/${id}`,
        },
      };
    }
    if (page === 'solutions') {
      const solution = solutions.find(item => item.slug === id);
      if (!solution) notFound();
      return {
        kind: 'solution-detail',
        data: { solution },
        meta: {
          title: `${solution.name} Solutions`,
          description: solution.summary,
          canonical: `/solutions/${id}`,
        },
      };
    }
    if (page === 'case-studies') {
      const item = cases.find(entry => entry[0] === id);
      if (!item) notFound();
      return {
        kind: 'case-detail',
        data: { item },
        meta: {
          title: item[1],
          description: item[4],
          canonical: `/case-studies/${id}`,
        },
      };
    }
    if (page === 'insights') {
      const article = articles.find(entry => entry[0] === id);
      if (!article) notFound();
      return {
        kind: 'insight-detail',
        data: { article },
        meta: {
          title: article[1],
          description: article[2],
          canonical: `/insights/${id}`,
          type: 'article',
          date: article[4],
        },
      };
    }
    notFound();
  }

  const meta = staticPageMetadata[page];
  if (!meta) notFound();
  return { kind: page, data: null, meta };
}

export async function generateStaticParams() {
  return [
    ...Object.keys(staticPageMetadata).map(page => ({ slug: [page] })),
    ...services.map(({ slug }) => ({ slug: ['services', slug] })),
    ...solutions.map(({ slug }) => ({ slug: ['solutions', slug] })),
    ...cases.map(([slug]) => ({ slug: ['case-studies', slug] })),
    ...articles.map(([slug]) => ({ slug: ['insights', slug] })),
  ];
}

export async function generateMetadata({ params }) {
  const { slug = [] } = await params;
  const resolved = resolvePage(slug);
  const { meta } = resolved;
  const isArticle = meta.type === 'article';

  return {
    title: meta.absoluteTitle ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: { canonical: meta.canonical },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}${meta.canonical}`,
      siteName: 'Axivy',
      locale: 'en_QA',
      type: isArticle ? 'article' : 'website',
      images: [DEFAULT_OG_IMAGE],
      ...(isArticle && meta.date ? { publishedTime: meta.date, modifiedTime: meta.date } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.png'],
    },
    ...(isArticle
      ? { authors: [{ name: 'Munir Uddin Mahbub', url: `${SITE_URL}/about` }] }
      : {}),
  };
}

function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

function PageHero({ eyebrow, title, copy, breadcrumb }) {
  return <section className="page-hero"><div className="shell">
    {breadcrumb && <nav className="breadcrumbs" aria-label="Breadcrumb"><ol>
      {breadcrumb.map((item, index) => <li key={`${item.label}-${index}`}>
        {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
      </li>)}
    </ol></nav>}
    <p className="eyebrow">{eyebrow}</p>
    <h1>{title}</h1>
    {copy && <p>{copy}</p>}
  </div></section>;
}

function CardGrid({ items }) {
  return <div className="service-offer-grid">{items.map((item, index) => <article className="service-offer-card" key={item.slug}>
    <div className="service-offer-top"><ServiceCardActions service={item.title} number={String(index + 1).padStart(2, '0')} whatsappHref={whatsappUrl(`Hi Axivy, I'd like to discuss a ${item.title.toLowerCase()} project.`)} /><span className="service-offer-kicker">SERVICE {String(index + 1).padStart(2, '0')}</span></div>
    <h2>{item.title}</h2>
    <p className="service-offer-description">{item.description}</p>
    <div className="service-offer-includes"><p>What’s included</p><ul className="service-included">{item.included.map(point => <li key={point}>{point}</li>)}</ul></div>
    <div className="service-offer-bottom"><div><span className="service-price-label">Indicative project range</span><strong className="service-price-range">{item.priceRange}</strong><span className="service-price-start">Starting from {item.startingPrice}</span></div><Link className="service-details-link" href={`/services/${item.slug}`}>Explore details <Arrow/></Link></div>
  </article>)}</div>;
}

function ServiceDetail({ service, index }) {
  const whatsappHref = whatsappUrl(`Hi Axivy, I'd like to discuss a ${service.title.toLowerCase()} project for my business.`);
  const breadcrumb = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.title },
  ];
  return <>
    <JsonLd data={{
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumbSchema(breadcrumb),
        {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          serviceType: service.title,
          url: `${SITE_URL}/services/${service.slug}`,
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: { '@type': 'Country', name: 'Qatar' },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'QAR',
            description: `${service.priceRange} indicative project range`,
            url: `${SITE_URL}/services/${service.slug}`,
          },
        },
      ],
    }} />
    <PageHero eyebrow={`Service ${String(index + 1).padStart(2, '0')}`} title={service.title} copy={service.description} breadcrumb={breadcrumb}/>
    <section className="service-detail-overview"><div className="shell service-detail-overview-grid">
      <div><p className="eyebrow">A practical solution</p><h2 className="section-heading">Built around what your business needs next.</h2><p className="service-detail-copy">{service.detail}</p></div>
      <aside className="service-fit-card"><span className="service-fit-label">A good fit if</span><p>{service.idealFor}</p><a href="#included" className="work-link">See what’s included <span aria-hidden>↓</span></a></aside>
    </div></section>
    <section className="page-content service-deliverables" id="included"><div className="shell service-deliverables-grid">
      <div><p className="eyebrow">Clear scope</p><h2 className="section-heading">What you can expect to receive.</h2><p className="section-copy">We confirm the exact scope together before work begins. A typical {service.title.toLowerCase()} engagement can include:</p></div>
      <ol className="service-deliverable-list">{service.included.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol>
    </div></section>
    <section className="service-pricing-section"><div className="shell service-pricing-panel"><div><p className="eyebrow">Planning estimate</p><h2>{service.priceRange}</h2><p>Projects start from {service.startingPrice}. This is an indicative QAR range, not a fixed quote. Final pricing depends on scope, integrations, content and any third-party subscriptions.</p></div><div className="service-pricing-actions"><ServiceCardActions service={service.title} number={String(index + 1).padStart(2, '0')} whatsappHref={whatsappHref}/></div></div></section>
    <section className="service-next-step"><div className="shell service-next-step-inner"><div><p className="eyebrow">Start with a conversation</p><h2>Let’s scope the right next step.</h2><p>Tell us what you are trying to improve. We’ll discuss your workflow and help clarify a practical scope.</p></div><div className="service-next-step-actions"><a className="btn btn-primary" href={whatsappHref} target="_blank" rel="noreferrer">Discuss on WhatsApp <Arrow/></a><Link className="btn btn-secondary" href="/contact">Send an enquiry <Arrow/></Link></div></div></section>
  </>;
}

function SolutionList() {
  return <div className="plain-grid">{solutions.map((solution, index) => <Link className="plain-card solution-list-card" href={`/solutions/${solution.slug}`} key={solution.slug}>
    <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
    <h2>{solution.name}</h2>
    <p>{solution.summary}</p>
    <span className="work-link">See how it works <span aria-hidden>→</span></span>
  </Link>)}</div>;
}

function WorkList() {
  return <div className="plain-grid">{cases.map(([slug, name, category, status, description]) => <article className="plain-card" key={slug}><div className="work-meta"><span>{category}</span><span className="work-tag">{status}</span></div><h2>{name}</h2><p>{description}</p><Link className="work-link" href={`/case-studies/${slug}`}>View case study <Arrow/></Link></article>)}</div>;
}

function ProcessList() {
  const steps = [
    ['01', 'Discover', 'We begin with the day-to-day reality: how customers find you, where enquiries arrive and what your team has to do manually.', 'A clear view of the customer journey and the bottlenecks worth solving.', 'You share the current process, goals and the tools your team already uses.'],
    ['02', 'Plan', 'We turn that understanding into a focused plan. We prioritise the improvements that will make the biggest practical difference first.', 'A simple scope, clear priorities and a shared idea of what success looks like.', 'You review the approach before any build work begins.'],
    ['03', 'Build', 'We design and develop the website, workflow or system around the agreed process—keeping the experience clear for both your team and customers.', 'A tailored solution that fits the way your business actually operates.', 'You see progress at meaningful checkpoints and can give feedback early.'],
    ['04', 'Connect', 'Where it helps, we connect the points of the journey: lead capture, CRM, WhatsApp, bookings and the internal notifications your team relies on.', 'Fewer handoffs, less duplicate work and better visibility across the journey.', 'You confirm the people, information and tools that should work together.'],
    ['05', 'Launch', 'Before going live, we test the key customer paths, refine the details and make sure the handover feels straightforward for your team.', 'A ready-to-use system with a clear next step for every important journey.', 'You receive a practical walkthrough of the finished setup.'],
    ['06', 'Improve', 'Once the system is in real use, we look at what is working, what customers are doing and where small adjustments can have a useful impact.', 'A system that can keep getting more useful as your business grows.', 'You can bring new needs and improvement ideas as they emerge.'],
  ];
  return <>
    <div className="process-page-intro"><p>Every project is tailored, but the working relationship stays simple: understand the problem, build the right next step, then improve it with real use.</p><span>From first conversation to ongoing improvement</span></div>
    <div className="process-journey" aria-label="Axivy project process">{steps.map(([number, title, copy, outcome, involvement]) => <article className="process-journey-step" key={number}>
      <div className="process-journey-marker"><span>{number}</span><i aria-hidden>↓</i></div>
      <div className="process-journey-main"><p className="eyebrow">{title}</p><h2>{title}</h2><p>{copy}</p></div>
      <div className="process-journey-detail"><p><strong>You get</strong>{outcome}</p><p><strong>Your part</strong>{involvement}</p></div>
    </article>)}</div>
    <section className="process-expectations"><div><p className="eyebrow">What to expect</p><h2>Clear communication, thoughtful scope and practical progress.</h2></div><div className="process-expectations-list"><p><span>01</span>No unnecessary complexity</p><p><span>02</span>Feedback at the moments that matter</p><p><span>03</span>A solution your team can actually use</p></div></section>
    <div className="process-page-cta"><div><p className="eyebrow">Start with your workflow</p><h2>Tell us what you want to make easier.</h2></div><Link className="btn btn-primary" href="/contact">Start a conversation <Arrow/></Link></div>
  </>;
}

function AboutContent() {
  return <div className="about-page">
    <section className="about-intro-grid">
      <div className="about-photo-wrap"><Image src="/images/munir-uddin-mahbub.jpeg" alt="Munir Uddin Mahbub, founder of Axivy" width={1101} height={1448} sizes="(max-width: 820px) 500px, 400px" priority /><span>Founder-led, practical by design</span></div>
      <div className="about-intro-copy"><p className="eyebrow">The person behind Axivy</p><h2>Technology should make the next business day easier.</h2><p>Axivy is led by Munir Uddin Mahbub, a full-stack developer focused on turning everyday business problems into useful digital systems.</p><p>Instead of beginning with a platform or a feature list, we begin with the customer journey, the work your team repeats and the point where important details are getting missed.</p><div className="about-founder-signoff"><strong>Munir Uddin Mahbub</strong><span>Founder &amp; Full-Stack Developer</span></div></div>
    </section>
    <section className="about-principles"><div><p className="eyebrow">How we think</p><h2>Good systems are clear for your customers and easy for your team.</h2></div><div className="about-principles-list"><article><span>01</span><div><h3>Start with the real workflow</h3><p>We map what already happens—from the first enquiry to the next follow-up—before recommending technology.</p></div></article><article><span>02</span><div><h3>Build only what helps</h3><p>Every website, automation and integration should remove friction, save time or make the customer experience clearer.</p></div></article><article><span>03</span><div><h3>Keep the next step visible</h3><p>Useful systems help your team know who needs a reply, what has happened and what should happen next.</p></div></article></div></section>
    <section className="about-statement"><p>“The goal is not more technology. It is a better way to serve customers and run the business.”</p><span>Axivy · Doha, Qatar</span></section>
    <section className="about-close"><div><p className="eyebrow">Let’s make work easier</p><h2>Tell us where your current process feels difficult.</h2></div><Link className="btn btn-primary" href="/contact">Start a conversation <Arrow/></Link></section>
  </div>;
}

function CaseDetail({ item }) {
  const [slug, name, category, status, description, journey = []] = item;
  const details = caseDetails[slug] || {};
  const breadcrumb = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/case-studies' },
    { label: name },
  ];
  const related = cases.filter(entry => entry[0] !== slug).slice(0, 2);

  return <>
    <JsonLd data={{
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumbSchema(breadcrumb),
        {
          '@type': 'CreativeWork',
          name,
          description,
          url: `${SITE_URL}/case-studies/${slug}`,
          creator: { '@id': `${SITE_URL}/#organization` },
          about: category,
          genre: status,
        },
      ],
    }} />
    <PageHero eyebrow={status} title={name} copy={description} breadcrumb={breadcrumb}/>
    <section className="page-content"><div className="shell case-study-grid">
      <article>
        <p className="eyebrow">The challenge</p>
        <h2 className="section-heading">{details.heading || 'A clear customer journey from first interest to next step.'}</h2>
        <p className="section-copy">{details.challenge || 'The project focuses on practical customer touchpoints and systems that support the way a business works. No unverified results or performance claims are included.'}</p>
        <div className="feature-path" style={{ marginTop: 26 }}>{journey.map((step, index) => <Fragment key={step}>{index > 0 && <i aria-hidden="true">→</i>}<span>{step}</span></Fragment>)}</div>

        {details.approach?.length > 0 && <div className="case-study-block">
          <h3>How we approached it</h3>
          <ol className="case-study-list case-study-list-numbered">{details.approach.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, '0')}</span><p>{point}</p></li>)}</ol>
        </div>}

        {details.built?.length > 0 && <div className="case-study-block">
          <h3>What the system covers</h3>
          <ul className="case-study-list">{details.built.map(point => <li key={point}>{point}</li>)}</ul>
        </div>}

        {details.focus && <blockquote className="case-study-quote">{details.focus}</blockquote>}
      </article>

      <aside className="case-study-aside">
        <div className="plain-card">
          <span className="service-number">PROJECT DETAILS</span>
          <dl className="case-facts">
            <div><dt>Category</dt><dd>{category}</dd></div>
            <div><dt>Status</dt><dd>{status}</dd></div>
            {details.timeframe && <div><dt>Timeframe</dt><dd>{details.timeframe}</dd></div>}
            {details.role && <div><dt>Focus</dt><dd>{details.role}</dd></div>}
          </dl>
        </div>
        <div className="case-note"><strong>Project note</strong><p>{details.note || 'This page describes project scope and approach. It does not claim unverified performance results.'}</p></div>
        <Link className="btn btn-primary" href="/contact">Discuss a similar project <Arrow/></Link>
      </aside>
    </div></section>

    <section className="case-study-next"><div className="shell">
      <div className="case-study-next-head"><div><p className="eyebrow">More work</p><h2>See how another journey fits together.</h2></div><Link className="work-link" href="/case-studies">View all work <span aria-hidden>→</span></Link></div>
      <div className="plain-grid">{related.map(([relatedSlug, relatedName, relatedCategory, relatedStatus, relatedDescription]) => <article className="plain-card" key={relatedSlug}><div className="work-meta"><span>{relatedCategory}</span><span className="work-tag">{relatedStatus}</span></div><h2>{relatedName}</h2><p>{relatedDescription}</p><Link className="work-link" href={`/case-studies/${relatedSlug}`}>View case study <Arrow/></Link></article>)}</div>
    </div></section>
  </>;
}

function InsightDetail({ article }) {
  const [slug, title, description, paragraphs = [], date] = article;
  const related = articles.filter(entry => entry[0] !== slug).slice(0, 2);
  const published = date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null;
  const readMinutes = Math.max(2, Math.ceil(paragraphs.join(' ').split(/\s+/).filter(Boolean).length / 220));
  const breadcrumb = [
    { label: 'Home', href: '/' },
    { label: 'Insights', href: '/insights' },
    { label: title },
  ];

  return <>
    <JsonLd data={{
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumbSchema(breadcrumb),
        {
          '@type': 'Article',
          headline: title,
          description,
          datePublished: date,
          dateModified: date,
          articleSection: 'Business systems',
          author: { '@type': 'Person', name: 'Munir Uddin Mahbub', url: `${SITE_URL}/about` },
          publisher: { '@id': `${SITE_URL}/#organization` },
          image: [`${SITE_URL}/og-image.png`],
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/insights/${slug}` },
        },
      ],
    }} />
    <PageHero eyebrow="Axivy insights" title={title} copy={description} breadcrumb={breadcrumb}/>
    <article className="page-content"><div className="shell">
      <div className="article-layout">
        <div className="article-main">
          <div className="article-meta">
            <span>By Munir Uddin Mahbub</span>
            {published && <><span aria-hidden>·</span><time dateTime={date}>{published}</time></>}
            <span aria-hidden>·</span>
            <span>{readMinutes} min read</span>
          </div>
          <p className="eyebrow">A practical perspective</p>
          <h2 className="section-heading">Better systems start with a clear view of the customer journey.</h2>
          <div className="article-body">{(paragraphs || []).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
          <div className="article-cta">
            <p>Want to apply this to your business?</p>
            <div><Link className="btn btn-primary" href="/contact">Discuss your workflow <Arrow/></Link><Link className="btn btn-secondary" href="/services">Explore services <span aria-hidden>→</span></Link></div>
          </div>
        </div>
        <aside className="article-aside">
          <div className="plain-card">
            <p className="eyebrow">Put this into practice</p>
            <h3>Start with one clear customer journey.</h3>
            <p>Map where enquiries arrive, who owns the next step and what information gets lost. That is usually enough to identify the most useful place to improve.</p>
            <Link className="work-link" href="/contact">Talk through your workflow <Arrow/></Link>
          </div>
          <div className="article-related">
            <h2>Related insights</h2>
            {related.map(([relatedSlug, relatedTitle, relatedDescription]) => <Link key={relatedSlug} href={`/insights/${relatedSlug}`}>
              <span>{relatedTitle}</span>
              <p>{relatedDescription}</p>
            </Link>)}
          </div>
        </aside>
      </div>
    </div></article>
  </>;
}

function SolutionDetail({ solution }) {
  const message = `Hi Axivy, I'd like to discuss a solution for my ${solution.name.toLowerCase()} business.`;
  const breadcrumb = [
    { label: 'Home', href: '/' },
    { label: 'Solutions', href: '/solutions' },
    { label: solution.name },
  ];
  return <>
    <JsonLd data={{
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumbSchema(breadcrumb),
        {
          '@type': 'Service',
          name: `${solution.name} solutions`,
          description: solution.summary,
          serviceType: `${solution.name} digital systems`,
          url: `${SITE_URL}/solutions/${solution.slug}`,
          provider: { '@id': `${SITE_URL}/#organization` },
          areaServed: { '@type': 'Country', name: 'Qatar' },
        },
      ],
    }} />
    <PageHero eyebrow="Solutions" title={solution.name} copy={solution.summary} breadcrumb={breadcrumb}/>
    <section className="solution-quick-start"><div className="shell solution-quick-start-inner"><p>Not sure which system is right for you?</p><div><a className="work-link" href="#request-audit">Start with a free workflow audit <Arrow/></a><a className="work-link" href={whatsappUrl(message)} target="_blank" rel="noreferrer">Ask a question on WhatsApp <Arrow/></a></div></div></section>
    <section className="page-content solution-story"><div className="shell">
      <div className="solution-problem"><div><p className="eyebrow">The challenge</p><h2 className="section-heading">Your customer journey should not depend on memory.</h2></div><p className="solution-problem-copy">{solution.problem}</p></div>
      <div className="solution-build-section"><div className="solution-build-heading"><span>01</span><div><p className="eyebrow">What we build</p><h2 className="section-heading">A system shaped around the way you already work.</h2></div></div><ol className="solution-build-list">{solution.whatWeBuild.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol></div>
    </div></section>
    <section className="solution-why"><div className="shell solution-why-grid"><div><p className="eyebrow">Why Axivy</p><h2>Practical technology, built around real operations.</h2></div><p>{solution.whyAxivy}</p></div></section>
    <section className="page-content solution-outcomes"><div className="shell"><p className="eyebrow">What this gives you</p><div className="solution-outcomes-grid">{solution.benefits.map((benefit, index) => <div key={benefit}><span>{String(index + 1).padStart(2, '0')}</span><p>{benefit}</p></div>)}</div></div></section>
    <AuditRequestForm industry={solution.name}/>
  </>;
}

function ContactPage() {
  return <><PageHero eyebrow="Get in touch" title="Let's Talk About Your Business" copy="Tell us what you are trying to improve, automate or build. We'll help you identify a practical solution."/><section className="page-content"><div className="shell form-layout"><aside><p className="eyebrow">Talk with Axivy</p><h2 className="section-heading">A direct conversation is a good place to start.</h2><div className="contact-detail"><strong>WhatsApp</strong><p><a href={AXIVY_WHATSAPP}>{AXIVY_PHONE}</a></p><a className="btn btn-primary" style={{marginTop:13}} href={whatsappUrl("Hi Axivy, I'd like to discuss a business solution.")} target="_blank" rel="noreferrer">Chat on WhatsApp <Arrow/></a></div><div className="contact-detail"><strong>Location</strong><p>{AXIVY_LOCATION}</p></div><div className="contact-detail"><strong>What happens next</strong><ol className="contact-next"><li>We review the details you share.</li><li>We ask any useful questions about your workflow.</li><li>We suggest a practical next step, with no obligation.</li></ol></div></aside><ContactForm/></div></section></> ;
}

function LegalPage({ type }) {
  const privacy = type === 'privacy';
  const content = privacy ? {
    intro: 'This policy explains what information Axivy collects when you use this website, contact us or request a quote. It is written to be practical and easy to understand.',
    sections: [
      ['Information you share', 'When you submit a contact, quote or audit request, we receive the name, email address, business name, phone or WhatsApp number, message and service or industry details you provide. These details are used to respond to your request and manage the resulting conversation.'],
      ['How enquiries are delivered', 'Form submissions may be sent to a configured email inbox and, where enabled, a private Google Sheet used to organise enquiries. Access is limited to people who need it to respond.'],
      ['WhatsApp conversations', 'Some buttons open WhatsApp with a prepared message. You choose whether to send it. WhatsApp processes messages under its own privacy terms, and Axivy receives the message only after you send it.'],
      ['Analytics and cookies', 'If Google Analytics is configured, the site may record page views and actions such as WhatsApp clicks or successful form submissions. This helps us understand which pages are useful. The site does not use advertising profiles. Essential cookies may be used by the hosting platform for security and performance.'],
      ['Retention and your choices', 'We keep enquiry information only as long as needed to respond, maintain business records or meet legal obligations. You can ask us to correct or delete information you have shared by contacting Axivy on WhatsApp.'],
      ['Third-party services', 'The site may link to WhatsApp, LinkedIn and other services. Their privacy policies apply when you use them. Axivy does not sell personal information.'],
    ],
  } : {
    intro: 'These terms apply when you use the Axivy website or request information, a quote or project services. By using the site, you agree to use it responsibly.',
    sections: [
      ['Website information', 'The website provides general information about Axivy and its services. Content is provided in good faith and may change as services, pricing and availability evolve.'],
      ['Quotes and project scope', 'Prices shown on the website are indicative ranges, not fixed quotations. A project begins only after the scope, deliverables, timeline and commercial terms are confirmed in writing.'],
      ['Intellectual property', 'The Axivy name, logo, website content and original materials belong to Axivy unless stated otherwise. You may not copy or republish them for commercial use without permission.'],
      ['Third-party links and tools', 'The website may link to third-party services. Axivy is not responsible for their content, availability or terms. Projects may rely on third-party platforms and subscriptions, which are subject to those providers’ terms.'],
      ['Limitations', 'We aim to keep the website accurate and available, but we do not guarantee uninterrupted access or that every page is free from errors. To the extent permitted by law, Axivy is not liable for losses arising from reliance on general website information.'],
      ['Changes and governing law', 'We may update these terms as the website or services change. These terms are governed by the laws of Qatar. Questions about them can be sent to Axivy through WhatsApp.'],
    ],
  };

  return <><PageHero eyebrow="Legal" title={privacy ? 'Privacy Policy' : 'Terms of Use'} copy={`Last updated: 31 October 2026`}/><section className="page-content"><div className="shell"><article className="legal-content"><p className="section-copy legal-intro">{content.intro}</p>{content.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}<div className="legal-contact"><h2>Contact</h2><p>For questions about this policy or these terms, contact Axivy in Doha, Qatar through WhatsApp at <a href={AXIVY_WHATSAPP}>{AXIVY_PHONE}</a>.</p></div></article></div></section></> ;
}

export default async function Page({ params }) {
  const { slug = [] } = await params;
  const resolved = resolvePage(slug);
  let content;

  if (resolved.kind === 'service-detail') {
    const { service, index } = resolved.data;
    content = <ServiceDetail service={service} index={index}/>;
  } else if (resolved.kind === 'solution-detail') {
    content = <SolutionDetail solution={resolved.data.solution}/>;
  } else if (resolved.kind === 'case-detail') {
    content = <CaseDetail item={resolved.data.item}/>;
  } else if (resolved.kind === 'insight-detail') {
    content = <InsightDetail article={resolved.data.article}/>;
  } else if (resolved.kind === 'services') {
    content = <><PageHero eyebrow="Services · Doha, Qatar" title="The right digital system for your next stage." copy="Explore practical services for clearer customer journeys, better follow-up and less repetitive work. Compare typical deliverables and indicative QAR pricing before choosing a place to start."/><section className="service-index-intro"><div className="shell service-index-intro-inner"><span>01 — 06</span><p>Every engagement is scoped around your business. Choose a service to explore what’s included and how the estimate is structured.</p><span className="service-estimate-note">Planning estimates in QAR</span></div></section><section className="page-content service-index-content"><div className="shell"><CardGrid items={services}/><p className="service-pricing-disclaimer">Pricing shown is an indicative project range, not a fixed quotation. Third-party software, subscriptions, paid APIs and hosting are not included unless specifically stated in the final scope.</p></div></section></>;
  } else if (resolved.kind === 'solutions') {
    content = <><PageHero eyebrow="Solutions" title="Built around the way your business works." copy="Choose a practical starting point for clearer customer journeys and less repetitive work."/><section className="page-content"><div className="shell"><SolutionList/></div></section></>;
  } else if (resolved.kind === 'case-studies') {
    content = <><PageHero eyebrow="Selected work" title="Work with a practical point of view." copy="Real projects are labelled clearly. Concepts show possible workflows without making business claims."/><section className="page-content"><div className="shell"><WorkList/></div></section></>;
  } else if (resolved.kind === 'process') {
    content = <><PageHero eyebrow="Our process" title="A clear path from idea to launch." copy="Thoughtful discovery, clear scope and a practical focus through each step."/><section className="page-content"><div className="shell"><ProcessList/></div></section></>;
  } else if (resolved.kind === 'about') {
    content = <><PageHero eyebrow="About Axivy" title="Building practical technology for real businesses." copy="Axivy focuses on useful digital systems for businesses in Qatar and beyond."/><section className="page-content"><div className="shell"><AboutContent/></div></section></>;
  } else if (resolved.kind === 'insights') {
    content = <><PageHero eyebrow="Insights" title="Ideas for better business systems." copy="Useful perspectives on websites, customer management and automation."/><section className="page-content"><div className="shell insight-grid">{articles.map(([slugValue, title, description, paragraphs, date]) => {
      const published = date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
      return <Link key={slugValue} href={`/insights/${slugValue}`} className="insight-card"><span className="insight-category">Business systems</span><h2 className="insight-title">{title}</h2><p className="insight-description">{description}</p><span className="insight-meta">{published ? <time dateTime={date}>{published}</time> : 'Practical guide'}<span aria-hidden>·</span>{Math.max(2, Math.ceil((paragraphs || []).join(' ').split(/\s+/).filter(Boolean).length / 220))} min read</span><span className="insight-read">Read insight <span aria-hidden>→</span></span></Link>;
    })}</div></section></>;
  } else if (resolved.kind === 'contact') {
    content = <ContactPage/>;
  } else if (resolved.kind === 'privacy' || resolved.kind === 'terms') {
    content = <LegalPage type={resolved.kind}/>;
  } else {
    notFound();
  }

  return <Layout>{content}</Layout>;
}
