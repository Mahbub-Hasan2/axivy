import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import JsonLd from '../../components/JsonLd';
import DemoVideo from '../../components/DemoVideo';
import { Layout } from '../../components/SiteShell';
import ContactForm from '../../components/ContactForm';
import AuditRequestForm from '../../components/AuditRequestForm';
import ServiceCardActions from '../../components/ServiceCardActions';
import { AddOns, NotSureBlock, PackageCards, PackageComparison, PackageFaq, packageSteps, PricingNotes } from '../../components/Packages';
import { AXIVY_LOCATION, AXIVY_PHONE, AXIVY_WHATSAPP, whatsappUrl } from '../../data/contact';
import { articles, businessSituations, caseDetails, cases, demoVideoUrl, services, solutions } from '../../data/content';
import { DEFAULT_OG_IMAGE, SITE_URL } from '../../lib/site';
import { packageFaqs, packages } from '../../data/packages';
import { searchPages } from '../../data/searchPages';

const Arrow = () => <span aria-hidden>↗</span>;

const insightMetaTitles = {
  'website-vs-whatsapp': 'Website and WhatsApp for Business',
  'do-i-need-website-instagram-whatsapp': 'Website, Instagram & WhatsApp',
  'whatsapp-business-app-vs-api': 'WhatsApp Business App vs API',
  'spreadsheet-vs-crm-small-business': 'Spreadsheet vs CRM for Small Business',
};

const staticPageMetadata = {
  services: {
    title: 'Website & WhatsApp Packages Qatar',
    description: 'Website and WhatsApp enquiry packages in Qatar: Starter from QAR 2,500, Growth from QAR 4,500, and Monthly Care from QAR 300 per month.',
    canonical: '/services',
  },
  solutions: {
    title: 'Solutions for any business',
    description: 'Practical ways to manage customer enquiries, bookings, information and repetitive admin for any business in Qatar.',
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

  if (!id) {
    const searchPage = searchPages.find(item => item.slug === page);
    if (searchPage) return { kind: 'search-landing', data: { searchPage }, meta: { title: searchPage.title, description: searchPage.description, canonical: `/${searchPage.slug}` } };
  }

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
      const article = articles.find(entry => entry.slug === id);
      if (!article) notFound();
      return {
        kind: 'insight-detail',
        data: { article },
        meta: {
          title: insightMetaTitles[article.slug] || article.metaTitle || article.title,
          description: article.metaDescription,
          canonical: `/insights/${id}`,
          type: 'article',
          date: article.date,
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
    ...articles.map(({ slug }) => ({ slug: ['insights', slug] })),
    ...searchPages.map(({ slug }) => ({ slug: [slug] })),
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
    <div className="service-offer-bottom"><Link className="service-details-link" href={`/services/${item.slug}`}>Explore details <Arrow/></Link></div>
  </article>)}</div>;
}

function ServicesPackagesPage() {
  const breadcrumb = [{ label: 'Home', href: '/' }, { label: 'Services' }];
  const problems = [['Enquiries get answered late', 'When a message has no owner or next step, a customer can wait longer than expected.'], ['Details are scattered', 'Useful context can end up split between chats, forms, inboxes and notes.'], ['Follow-ups slip', 'Without a reminder or shared list, a promising enquiry can be hard to return to.'], ['You look smaller than you are', 'Clear pages and a consistent contact path help customers understand how to reach you.']];
  return <><JsonLd data={{ '@context': 'https://schema.org', '@graph': [breadcrumbSchema(breadcrumb), { '@type': 'FAQPage', mainEntity: packageFaqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) }, ...packages.map(pkg => ({ '@type': 'Service', name: pkg.name, provider: { '@id': `${SITE_URL}/#organization` }, areaServed: { '@type': 'Country', name: 'Qatar' }, offers: { '@type': 'Offer', priceCurrency: 'QAR', description: pkg.price } }))] }} />
    <PageHero eyebrow="Services · Doha, Qatar" title="Simple packages that make sure every customer enquiry is answered." copy="Pick a package, or start with a free audit and we will recommend the smallest one that solves your problem. Clear deliverables, fixed prices, no jargon." breadcrumb={breadcrumb}/>
    <section className="page-content"><div className="shell"><div className="plain-grid">{problems.map(([title, text]) => <article className="plain-card" key={title}><h2>{title}</h2><p>{text}</p></article>)}</div></div></section>
    <section className="page-content" style={{ paddingTop: 0 }}><div className="shell"><PackageCards/><PricingNotes/></div></section>
    <section className="page-content" style={{ paddingTop: 0 }}><div className="shell"><p className="eyebrow">Compare packages</p><h2 className="section-heading">What each package includes.</h2><PackageComparison/></div></section>
    <section className="page-content" style={{ paddingTop: 0 }}><div className="shell"><p className="eyebrow">Add-ons</p><h2 className="section-heading">Extra help where it fits.</h2><AddOns/></div></section>
    <section className="page-content" style={{ paddingTop: 0 }}><div className="shell"><p className="eyebrow">How it works</p><h2 className="section-heading">A straightforward way to get started.</h2><ol className="plain-grid">{packageSteps.map(([title, text], index) => <li className="plain-card" key={title}><span className="service-number">{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></li>)}</ol><p className="section-copy" style={{ marginTop: 18 }}>Pay 50% to start and 50% on delivery.</p></div></section>
    <section className="page-content" style={{ paddingTop: 0 }}><div className="shell"><p className="eyebrow">What is inside the packages</p><h2 className="section-heading">Services combined around your enquiry journey.</h2><CardGrid items={services}/></div></section>
    <section className="page-content" style={{ paddingTop: 0 }}><div className="shell"><NotSureBlock/></div></section>
    <section className="page-content" style={{ paddingTop: 0 }}><div className="shell"><p className="eyebrow">Package questions</p><h2 className="section-heading">Useful answers before you choose.</h2><PackageFaq/></div></section>
    <span id="audit-starter" /><span id="audit-growth" /><span id="audit-care" /><AuditRequestForm industry="Any other business" packageChoice title="Get your free audit and a fixed quote." />
  </>;
}

function ServiceDetail({ service, index }) {
  const whatsappHref = whatsappUrl(`Hi Axivy, I'd like to discuss a ${service.title.toLowerCase()} project for my business.`);
  const serviceIntro = {
    'website-development': ['Help more visitors contact you.', 'Build a clear website that explains what you do and makes it easy to send an enquiry.'],
    'lead-management': ['Keep every enquiry in view.', 'Collect customer enquiries in one place so you can see who needs a reply.'],
    'crm-systems': ['Keep customer details in one place.', 'A CRM is a shared place for customer details, conversations and next steps.'],
    'whatsapp-systems': ['Make WhatsApp enquiries easier to manage.', 'Connect WhatsApp messages with the details and follow-up steps you need.'],
    'business-automation': ['Spend less time on repeat admin.', 'Automation means making repeat steps happen automatically, such as copying enquiry details or sending a reminder.'],
    'ai-solutions': ['Use AI for suitable repeat questions.', 'Use AI to handle approved common questions or collect basic details before a person takes over.'],
  }[service.slug] || [service.title, service.description];
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
        },
      ],
    }} />
    <PageHero eyebrow={`Service ${String(index + 1).padStart(2, '0')}`} title={serviceIntro[0]} copy={serviceIntro[1]} breadcrumb={breadcrumb}/>
    <section className="service-detail-overview"><div className="shell service-detail-overview-grid">
      <div><p className="eyebrow">A practical solution</p><h2 className="section-heading">Built around what your business needs next.</h2><p className="service-detail-copy">{service.detail}</p></div>
      <aside className="service-fit-card"><span className="service-fit-label">A good fit if</span><p>{service.idealFor}</p><a href="#included" className="work-link">See what’s included <span aria-hidden>↓</span></a></aside>
    </div></section>
    <section className="page-content service-deliverables" id="included"><div className="shell service-deliverables-grid">
      <div><p className="eyebrow">Clear scope</p><h2 className="section-heading">What you can expect to receive.</h2><p className="section-copy">We confirm the exact scope together before work begins. A typical {service.title.toLowerCase()} engagement can include:</p></div>
      <ol className="service-deliverable-list">{service.included.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol>
    </div></section>
    <section className="service-pricing-section"><div className="shell service-pricing-panel"><div><p className="eyebrow">How it fits our packages</p><h2>{service.inPackages}</h2><p>Choose a package for a clear starting point, then agree the final scope and fixed quote before work begins.</p></div><div className="service-pricing-actions"><Link className="btn btn-primary" href="/services">Compare packages <Arrow/></Link><a className="btn btn-secondary" href={whatsappHref} target="_blank" rel="noreferrer">Ask on WhatsApp <Arrow/></a></div></div></section>
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

function SituationCards() {
  return <div className="plain-grid">{businessSituations.map(({ situation, fix, href, link }) => <article className="plain-card" key={situation}>
    <h2>{situation}</h2><p>{fix}</p><Link className="work-link" href={href}>{link} <Arrow/></Link>
  </article>)}</div>;
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
    <section className="process-expectations"><div><p className="eyebrow">Before we start</p><h2>What we need from you.</h2></div><div className="process-expectations-list"><p><span>01</span>Your logo and photos</p><p><span>02</span>A list of your services</p><p><span>03</span>Access to your existing accounts, if you have them</p></div></section>
    <div className="process-journey" aria-label="Axivy project process">{steps.map(([number, title, copy, outcome, involvement]) => <article className="process-journey-step" key={number}>
      <div className="process-journey-marker"><span>{number}</span><i aria-hidden>↓</i></div>
      <div className="process-journey-main"><p className="eyebrow">{title}</p><h2>{title}</h2><p>{copy}</p></div>
      <div className="process-journey-detail"><p><strong>You get</strong>{outcome}</p><p><strong>Your part</strong>{involvement}</p></div>
    </article>)}</div>
    <section className="process-expectations"><div><p className="eyebrow">What to expect</p><h2>Clear communication, thoughtful scope and practical progress.</h2></div><div className="process-expectations-list"><p><span>01</span>No unnecessary complexity</p><p><span>02</span>Feedback at the moments that matter</p><p><span>03</span>A solution your team can actually use</p></div></section>
    <section className="process-expectations"><div><p className="eyebrow">How payment works</p><h2>Agree the price before work begins.</h2></div><div className="process-expectations-list"><p><span>01</span>Fixed price agreed first</p><p><span>02</span>50% to start, 50% on delivery</p><p><span>03</span>Domain, hosting and paid software fees are paid directly by you</p></div></section>
    <div className="process-page-cta"><div><p className="eyebrow">Start with your workflow</p><h2>Tell us what you want to make easier.</h2></div><Link className="btn btn-primary" href="/contact">Start a conversation <Arrow/></Link></div>
  </>;
}

function AboutContent() {
  return <div className="about-page">
    <section className="about-intro-grid">
      <div className="about-photo-wrap"><Image src="/images/munir-uddin-mahbub.jpeg" alt="Munir Uddin Mahbub, founder of Axivy" width={1101} height={1448} sizes="(max-width: 820px) 500px, 400px" priority /><span>Founder-led, practical by design</span></div>
      <div className="about-intro-copy"><p className="eyebrow">The person behind Axivy</p><h2>Make your day-to-day work easier.</h2><p>Axivy is led by Munir Uddin Mahbub, a full-stack developer who helps businesses make their websites and customer enquiries easier to manage.</p><p>We start with where customers contact you, which tasks take up time and where details get missed.</p><div className="about-founder-signoff"><strong>Munir Uddin Mahbub</strong><span>Founder &amp; Full-Stack Developer</span></div></div>
    </section>
    <section className="about-principles"><div><p className="eyebrow">How we think</p><h2>Make things clear for your customers and easier for you to run.</h2></div><div className="about-principles-list"><article><span>01</span><div><h3>Start with what happens now</h3><p>We look at the path from the first enquiry to the next follow-up before suggesting a tool.</p></div></article><article><span>02</span><div><h3>Build what helps</h3><p>A website, automation or connection should save time or make the next step clearer.</p></div></article><article><span>03</span><div><h3>Keep track of the next step</h3><p>You should be able to see who needs a reply, what has happened and what comes next.</p></div></article></div></section>
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

        {details.screenshots?.length > 0 && <div className="case-study-block">
          <h3>Screenshots</h3>
          {/* Add screenshot files under public/images/cases/ and reference each as { path: '/images/cases/file.png', alt: 'Description' } in data/content.js. */}
          <div className="grid gap-4 sm:grid-cols-2">{details.screenshots.map(({ path, alt }) => <Image key={path} src={path} alt={alt} width={1200} height={675} className="h-auto w-full rounded-xl border border-[var(--line)]" sizes="(max-width: 640px) calc(100vw - 2rem), 50vw" />)}</div>
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
  const { slug, title, description, answer, focus, steps, checklist, faqs: articleFaqs, closing, date, landing, related: relatedSlugs } = article;
  const related = relatedSlugs.map(relatedSlug => articles.find(entry => entry.slug === relatedSlug)).filter(Boolean);
  const published = date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null;
  const articleWords = [answer, focus, closing, ...steps.flatMap(([, copy]) => copy.split('\n\n')), ...checklist, ...articleFaqs.flat()].join(' ').split(/\s+/).filter(Boolean).length;
  const readMinutes = Math.max(3, Math.ceil(articleWords / 220));
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
        {
          '@type': 'FAQPage',
          mainEntity: articleFaqs.map(([question, acceptedAnswer]) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: acceptedAnswer },
          })),
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
          <div className="article-body">
            <p className="article-direct-answer"><strong>Short answer:</strong> {answer}</p>
            <p>{focus}</p>
            {steps.map(([heading, copy]) => <section key={heading}><h2>{heading}</h2>{copy.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
            <section><h2>Quick checklist</h2><ul>{checklist.map(item => <li key={item}>{item}</li>)}</ul></section>
            <section><h2>Frequently asked questions</h2>{articleFaqs.map(([question, response]) => <div key={question}><h3>{question}</h3><p>{response}</p></div>)}</section>
            <section><h2>Put the plan into practice</h2>{closing.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>
          </div>
          <div className="article-cta">
            <p>Want a practical view of the next step for your business?</p>
            <div><Link className="btn btn-primary" href="/contact">Request a free audit <Arrow/></Link><Link className="btn btn-secondary" href={landing[0]}>Explore {landing[1]} <span aria-hidden>→</span></Link></div>
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
            <h2>Related reading</h2>
            {related.map(({ slug: relatedSlug, title: relatedTitle, description: relatedDescription }) => <Link key={relatedSlug} href={`/insights/${relatedSlug}`}>
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
    <PageHero eyebrow="Solutions" title="Make your customer enquiries easier to manage." copy={`See practical ways to handle enquiries, bookings and customer details for your ${solution.name.toLowerCase()} business.`} breadcrumb={breadcrumb}/>
    <section className="solution-quick-start"><div className="shell solution-quick-start-inner"><p>Not sure which system is right for you?</p><div><a className="work-link" href="#request-audit">Start with a free workflow audit <Arrow/></a><a className="work-link" href={whatsappUrl(message)} target="_blank" rel="noreferrer">Ask a question on WhatsApp <Arrow/></a></div></div></section>
    <section className="page-content solution-story"><div className="shell">
      <div className="solution-problem"><div><p className="eyebrow">The challenge</p><h2 className="section-heading">Your customer journey should not depend on memory.</h2></div><p className="solution-problem-copy">{solution.problem}</p></div>
      <div className="solution-build-section"><div className="solution-build-heading"><span>01</span><div><p className="eyebrow">What we build</p><h2 className="section-heading">A system shaped around the way you already work.</h2></div></div><ol className="solution-build-list">{solution.whatWeBuild.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol></div>
    </div></section>
    <section className="solution-why"><div className="shell solution-why-grid"><div><p className="eyebrow">Why Axivy</p><h2>Founder-led work, shaped around your business.</h2></div><p>{solution.whyAxivy}</p></div></section>
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
    content = <ServicesPackagesPage/>;
  } else if (resolved.kind === 'solutions') {
    content = <><PageHero eyebrow="Solutions" title="Solutions for any business" copy="Start with the customer or admin problem you want to make easier."/><section className="page-content"><div className="shell"><SituationCards/><p className="section-copy" style={{ marginTop: 24 }}>Works for any business that gets enquiries, for example workshops, cafés, cleaning companies, shops and service providers.</p></div></section><section className="page-content" style={{ paddingTop: 0 }}><div className="shell"><p className="eyebrow">Examples</p><h2 className="section-heading">Examples for specific types of business.</h2><p className="section-copy">These pages show how the same services can fit different businesses.</p><SolutionList/></div></section></>;
  } else if (resolved.kind === 'case-studies') {
    content = <><PageHero eyebrow="Selected work" title="Work with a practical point of view." copy="Real projects are labelled clearly. Concepts show possible workflows without making business claims."/><DemoVideo url={demoVideoUrl}/><section className="page-content"><div className="shell"><WorkList/></div></section></>;
  } else if (resolved.kind === 'process') {
    content = <><PageHero eyebrow="Our process" title="A clear path from idea to launch." copy="Thoughtful discovery, clear scope and a practical focus through each step."/><section className="page-content"><div className="shell"><ProcessList/></div></section></>;
  } else if (resolved.kind === 'about') {
    content = <><PageHero eyebrow="About Axivy" title="Building practical technology for real businesses." copy="Axivy focuses on useful digital systems for businesses in Qatar and beyond."/><section className="page-content"><div className="shell"><AboutContent/></div></section></>;
  } else if (resolved.kind === 'insights') {
    content = <><PageHero eyebrow="Insights" title="Ideas for better business systems." copy="Useful perspectives on websites, customer management and automation."/><section className="page-content"><div className="shell insight-grid">{articles.map(({ slug: slugValue, title, description, answer, focus, closing, steps, checklist, faqs: articleFaqs, date }) => {
      const published = date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
      const wordCount = [answer, focus, closing, ...steps.flatMap(([, copy]) => copy.split('\n\n')), ...checklist, ...articleFaqs.flat()].join(' ').split(/\s+/).filter(Boolean).length;
      return <Link key={slugValue} href={`/insights/${slugValue}`} className="insight-card"><span className="insight-category">Business systems</span><h2 className="insight-title">{title}</h2><p className="insight-description">{description}</p><span className="insight-meta">{published ? <time dateTime={date}>{published}</time> : 'Practical guide'}<span aria-hidden>·</span>{Math.max(3, Math.ceil(wordCount / 220))} min read</span><span className="insight-read">Read insight <span aria-hidden>→</span></span></Link>;
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
