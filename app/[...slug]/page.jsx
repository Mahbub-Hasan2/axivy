import Link from 'next/link';
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
  const steps = [['01','Discover','Understand the business, customers and current workflow.'],['02','Plan','Agree the right scope, approach and priorities.'],['03','Build','Design and develop the solution around the needs.'],['04','Connect','Bring CRM, WhatsApp and other tools together where useful.'],['05','Launch','Test the system, deploy it and support the team.'],['06','Improve','Review the workflow and make considered improvements.']];
  return <div className="process-grid">{steps.map(([number,title,copy])=><article className="process-step" key={number}><span className="process-number">{number}</span><h2 className="process-title">{title}</h2><p className="process-copy">{copy}</p></article>)}</div>;
}

function AboutContent() {
  return <div className="about-grid"><div className="founder-mark"><span className="founder-initials" aria-hidden>MM</span><div className="founder-caption"><strong>Munir Uddin Mahbub</strong><span>Founder &amp; Full-Stack Developer</span></div></div><div><p className="eyebrow">The approach</p><h2 className="section-heading">Technology should make the next business day easier.</h2><p className="section-copy">Axivy brings a full-stack development background and practical problem solving to websites, business automation, AI and software systems. The focus is on understanding how a business works before deciding what to build.</p><p className="section-copy" style={{marginTop:14}}>That means thoughtful scope, connected tools where they help, and systems that support real teams and customers in Doha, Qatar and beyond.</p></div></div>;
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
    <section className="page-content"><div className="shell solution-detail-grid">
      <article className="plain-card solution-detail-card"><p className="eyebrow">The Challenge</p><p className="section-copy">{solution.problem}</p></article>
      <article className="plain-card solution-detail-card"><p className="eyebrow">What We Build For You</p><ul className="solution-bullets">{solution.whatWeBuild.map(item => <li key={item}>{item}</li>)}</ul></article>
      <article className="plain-card solution-detail-card"><p className="eyebrow">Why Axivy</p><p className="section-copy">{solution.whyAxivy}</p></article>
      <article className="plain-card solution-detail-card"><p className="eyebrow">What You Get</p><ul className="solution-bullets">{solution.benefits.map(item => <li key={item}>{item}</li>)}</ul></article>
    </div></section>
    <section className="page-content solution-cta-section"><div className="shell"><div className="solution-cta"><div><p className="eyebrow">Start a conversation</p><h2 className="section-heading">Discuss your {solution.name.toLowerCase()} business.</h2></div><a className="btn btn-primary" href={whatsappUrl(message)} target="_blank" rel="noreferrer">Discuss on WhatsApp <Arrow/></a></div></div></section>
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
