import Link from 'next/link';
import Image from 'next/image';
import { Layout } from '../../components/SiteShell';
import ContactForm from '../../components/ContactForm';
import AuditRequestForm from '../../components/AuditRequestForm';
import ServiceCardActions from '../../components/ServiceCardActions';
import { AXIVY_LOCATION, AXIVY_PHONE, AXIVY_WHATSAPP, whatsappUrl } from '../../data/contact';
import { articles, cases, services, solutions } from '../../data/content';

const Arrow = () => <span aria-hidden>↗</span>;
const toTitle = value => value.replaceAll('-', ' ').replace(/\b\w/g, char => char.toUpperCase());

export async function generateMetadata({ params }) {
  const { slug = [] } = await params;
  const names = { services: 'Services', solutions: 'Solutions', 'case-studies': 'Selected Work', process: 'Our Process', about: 'About', insights: 'Insights', contact: 'Contact', privacy: 'Privacy Policy', terms: 'Terms' };
  return { title: names[slug.join('/')] || toTitle(slug.at(-1) || 'Axivy'), description: 'Axivy builds practical digital solutions and business automation for growing companies in Qatar.' };
}

function PageHero({ eyebrow, title, copy }) {
  return <section className="page-hero"><div className="shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{copy && <p>{copy}</p>}</div></section>;
}

function CardGrid({ items }) {
  return <div className="plain-grid">{items.map((item, index) => {
    const title = item[1];
    return <article className="plain-card" key={title}><ServiceCardActions service={title} number={String(index + 1).padStart(2, '0')} whatsappHref={whatsappUrl(`Hi Axivy, I'd like to discuss a ${title.toLowerCase()} project.`)} /><h2>{title}</h2><p>{item[2]}</p></article>;
  })}</div>;
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
      <div className="about-photo-wrap"><Image src="/images/munir-uddin-mahbub.jpeg" alt="Munir Uddin Mahbub, founder of Axivy" width={1101} height={1448} priority /><span>Founder-led, practical by design</span></div>
      <div className="about-intro-copy"><p className="eyebrow">The person behind Axivy</p><h2>Technology should make the next business day easier.</h2><p>Axivy is led by Munir Uddin Mahbub, a full-stack developer focused on turning everyday business problems into useful digital systems.</p><p>Instead of beginning with a platform or a feature list, we begin with the customer journey, the work your team repeats and the point where important details are getting missed.</p><div className="about-founder-signoff"><strong>Munir Uddin Mahbub</strong><span>Founder &amp; Full-Stack Developer</span></div></div>
    </section>
    <section className="about-principles"><div><p className="eyebrow">How we think</p><h2>Good systems are clear for your customers and easy for your team.</h2></div><div className="about-principles-list"><article><span>01</span><div><h3>Start with the real workflow</h3><p>We map what already happens—from the first enquiry to the next follow-up—before recommending technology.</p></div></article><article><span>02</span><div><h3>Build only what helps</h3><p>Every website, automation and integration should remove friction, save time or make the customer experience clearer.</p></div></article><article><span>03</span><div><h3>Keep the next step visible</h3><p>Useful systems help your team know who needs a reply, what has happened and what should happen next.</p></div></article></div></section>
    <section className="about-statement"><p>“The goal is not more technology. It is a better way to serve customers and run the business.”</p><span>Axivy · Doha, Qatar</span></section>
    <section className="about-close"><div><p className="eyebrow">Let’s make work easier</p><h2>Tell us where your current process feels difficult.</h2></div><Link className="btn btn-primary" href="/contact">Start a conversation <Arrow/></Link></section>
  </div>;
}

function CaseDetail({ item }) {
  return <><PageHero eyebrow={item[3]} title={item[1]} copy={item[4]}/><section className="page-content"><div className="shell about-grid"><article><p className="eyebrow">Project overview</p><h2 className="section-heading">A considered digital customer journey.</h2><p className="section-copy">The project focuses on practical customer touchpoints and systems that support the way a business works. No unverified results or performance claims are included.</p><div className="feature-path" style={{marginTop:22}}>{(item[5] || []).map((x,i)=><span key={x}>{i>0&&<i>→</i>}{x}</span>)}</div></article><aside className="plain-card"><span className="service-number">PROJECT DETAILS</span><h2>{item[2]}</h2><p>Status: {item[3]}</p><p style={{marginTop:12}}>Focus: online discovery, customer communication and a clear next step.</p></aside></div></section></>;
}

function InsightDetail({ article }) {
  return <><PageHero eyebrow="Axivy insights" title={article[1]} copy={article[2] || "Practical thinking for businesses improving the way they attract, manage and serve customers."}/><article className="page-content"><div className="shell"><div style={{maxWidth:700,margin:'0 auto'}}><p className="eyebrow">A practical perspective</p><h2 className="section-heading">Better systems start with a clear view of the customer journey.</h2><div className="section-copy" style={{display:'grid',gap:16,marginTop:18}}>{(article[3] || []).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div><Link href="/contact" className="btn btn-primary" style={{marginTop:22}}>Discuss your workflow <Arrow/></Link></div></div></article></>;
}

function SolutionDetail({ solution }) {
  const message = `Hi Axivy, I'd like to discuss a solution for my ${solution.name.toLowerCase()} business.`;
  return <>
    <PageHero eyebrow="Solutions" title={solution.name} copy={solution.summary}/>
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
  return <><PageHero eyebrow="Get in touch" title="Let's Talk About Your Business" copy="Tell us what you are trying to improve, automate or build. We'll help you identify a practical solution."/><section className="page-content"><div className="shell form-layout"><aside><p className="eyebrow">Talk with Axivy</p><h2 className="section-heading">A direct conversation is a good place to start.</h2><div className="contact-detail"><strong>WhatsApp</strong><p><a href={AXIVY_WHATSAPP}>{AXIVY_PHONE}</a></p><a className="btn btn-primary" style={{marginTop:13}} href={whatsappUrl("Hi Axivy, I'd like to discuss a business solution.")} target="_blank" rel="noreferrer">Chat on WhatsApp <Arrow/></a></div><div className="contact-detail"><strong>Location</strong><p>{AXIVY_LOCATION}</p></div></aside><ContactForm/></div></section></>;
}

function LegalPage({ type }) {
  const privacy = type === 'privacy';
  return <><PageHero eyebrow="Legal" title={privacy ? 'Privacy Policy' : 'Terms of Use'}/><section className="page-content"><div className="shell"><article style={{maxWidth:700,margin:'0 auto'}}><h2 className="section-heading" style={{fontSize:28}}>{privacy ? 'Your privacy matters' : 'Using this website'}</h2><p className="section-copy">{privacy ? 'When contact and quote requests are configured, the name, email, business, phone number, message and selected service you submit are sent to Axivy’s configured inbox through its email provider. The WhatsApp action also prepares a message for you to review and send. The site records WhatsApp clicks and successfully sent quote requests in Google Analytics when it is configured.' : 'This website provides general information about Axivy and its services. Content is provided in good faith and may change as our services evolve.'}</p><h3 style={{marginTop:30,fontSize:17}}>Contact</h3><p className="section-copy">For questions, contact Axivy in Doha, Qatar through WhatsApp at {AXIVY_PHONE}.</p></article></div></section></>;
}

function NotFound() {
  return <><PageHero eyebrow="404" title="This page is not here."/><section className="page-content"><div className="shell"><Link className="btn btn-primary" href="/">Back to Axivy <Arrow/></Link></div></section></>;
}

export default async function Page({ params }) {
  const { slug = [] } = await params;
  const [page, id] = slug;
  if (page === 'solutions' && id) {
    const solution = solutions.find(entry => entry.slug === id);
    return <Layout>{solution ? <SolutionDetail solution={solution}/> : <NotFound/>}</Layout>;
  }
  if (page === 'case-studies' && id) {
    const item = cases.find(entry => entry[0] === id);
    return <Layout>{item ? <CaseDetail item={item}/> : <NotFound/>}</Layout>;
  }
  if (page === 'insights' && id) {
    const article = articles.find(entry => entry[0] === id);
    return <Layout>{article ? <InsightDetail article={article}/> : <NotFound/>}</Layout>;
  }

  let content;
  if (page === 'services') content = <><PageHero eyebrow="Services" title="Digital tools that make everyday work easier." copy="From the first customer enquiry to the follow-up, build a system that fits your business."/><section className="page-content"><div className="shell"><CardGrid items={services}/></div></section></>;
  else if (page === 'solutions') content = <><PageHero eyebrow="Solutions" title="Built around the way your business works." copy="Choose a practical starting point for clearer customer journeys and less repetitive work."/><section className="page-content"><div className="shell"><SolutionList/></div></section></>;
  else if (page === 'case-studies') content = <><PageHero eyebrow="Selected work" title="Work with a practical point of view." copy="Real projects are labelled clearly. Concepts show possible workflows without making business claims."/><section className="page-content"><div className="shell"><WorkList/></div></section></>;
  else if (page === 'process') content = <><PageHero eyebrow="Our process" title="A clear path from idea to launch." copy="Thoughtful discovery, clear scope and a practical focus through each step."/><section className="page-content"><div className="shell"><ProcessList/></div></section></>;
  else if (page === 'about') content = <><PageHero eyebrow="About Axivy" title="Building practical technology for real businesses." copy="Axivy focuses on useful digital systems for businesses in Qatar and beyond."/><section className="page-content"><div className="shell"><AboutContent/></div></section></>;
  else if (page === 'insights') content = <><PageHero eyebrow="Insights" title="Ideas for better business systems." copy="Useful perspectives on websites, customer management and automation."/><section className="page-content"><div className="shell insight-grid">{articles.map(([slugValue,title])=><Link key={slugValue} href={`/insights/${slugValue}`} className="insight-card"><span className="insight-category">Business systems</span><h2 className="insight-title">{title}</h2><span className="insight-read">Read insight <span aria-hidden>→</span></span></Link>)}</div></section></>;
  else if (page === 'contact') content = <ContactPage/>;
  else if (page === 'privacy' || page === 'terms') content = <LegalPage type={page}/>;
  else content = <NotFound/>;

  return <Layout>{content}</Layout>;
}
