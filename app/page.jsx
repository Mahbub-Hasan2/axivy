import Link from 'next/link';
import HomeExperience from '../components/HomeExperience';
import { Layout } from '../components/SiteShell';
import { cases, services, solutions } from '../data/content';
import { whatsappUrl } from '../data/contact';

const problems = [
  ['Missed enquiries', 'Busy teams can miss a message before anyone has a chance to respond.'],
  ['Slow follow-ups', 'Without a clear next step, promising conversations can lose momentum.'],
  ['Scattered details', 'Customer context gets split between chats, inboxes and spreadsheets.'],
  ['Limited visibility', 'It is hard to see what needs attention when updates live in different places.'],
];

const serviceDescriptions = {
  'website-development': 'Clear, fast websites that help customers understand your business and take the next step.',
  'lead-management': 'Capture enquiries from the channels you use and make ownership and follow-up easy to see.',
  'crm-systems': 'Keep customer details, conversations and next actions organized in one shared place.',
  'whatsapp-systems': 'Connect WhatsApp conversations with enquiry capture, team updates and timely follow-ups.',
  'business-automation': 'Reduce repetitive admin by connecting the tools and steps your team uses every day.',
  'ai-solutions': 'Apply AI to useful tasks like answering common questions and collecting enquiry details.',
};

const industrySlugs = ['automotive', 'restaurants-cafes', 'cleaning-maintenance', 'other-smes'];

const process = [
  ['Discover', 'Understand your business, customers and current workflow.'],
  ['Define', 'Agree on a clear scope, priorities and practical plan.'],
  ['Design', 'Shape the experience around your customers and team.'],
  ['Build', 'Create and connect the digital tools your business needs.'],
  ['Launch', 'Test the details and prepare the solution for real use.'],
  ['Improve', 'Review how it works and make useful refinements over time.'],
];

const faqs = [
  ['What are the costs?', 'Pricing depends on the scope and features. We confirm the exact cost after understanding your requirements, with no hidden fees.'],
  ['Can you connect our website with WhatsApp?', 'Yes. We can make it easier for customers to move from a website enquiry into a relevant WhatsApp conversation and a clear team follow-up.'],
  ['Can you work with the tools we already use?', 'Often, yes. We first understand your current tools and workflow, then identify what can be connected or improved.'],
  ['Do you provide ongoing support?', 'Ongoing support and improvements can be arranged around the solution and what your team needs.'],
];

function SectionHeading({ eyebrow, title, copy, id }) {
  return <div className="mb-6 grid gap-3 sm:mb-8 md:grid-cols-[1fr_.72fr] md:items-end md:gap-8">
    <div>
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-[var(--brand-green-dark)]">{eyebrow}</p>}
      <h2 id={id} className="max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-.045em] text-[var(--ink)] sm:text-4xl">{title}</h2>
    </div>
    {copy && <p className="max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">{copy}</p>}
  </div>;
}

function WorkCard({ item, featured = false }) {
  if (!item) return null;
  const [slug, title, category, status, description, journey = []] = item;
  const isConcept = /concept/i.test(status);

  return <article className={`group overflow-hidden rounded-2xl border border-[var(--line)] bg-white ${featured ? 'md:row-span-2' : ''}`}>
    <Link href={`/case-studies/${slug}`} className="block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-green-dark)]">
      <div className={`relative flex min-h-44 flex-col justify-between overflow-hidden p-5 sm:min-h-52 sm:p-6 ${featured ? 'bg-[var(--sage)] md:min-h-[23rem]' : isConcept ? 'bg-[var(--dark)] text-white' : 'bg-white'}`}>
        <div className="flex items-start justify-between gap-3">
          <span className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold ${isConcept ? 'bg-[var(--lime)] text-[var(--ink)]' : 'bg-white/80 text-[var(--brand-green-dark)]'}`}>{status}</span>
          <span aria-hidden className={`text-lg transition-transform group-hover:translate-x-1 ${isConcept ? 'text-[var(--lime)]' : 'text-[var(--brand-green-dark)]'}`}>↗</span>
        </div>
        <div>
          <p className={`mb-2 text-xs font-semibold uppercase tracking-[.14em] ${isConcept ? 'text-white/65' : 'text-[var(--muted)]'}`}>{category}</p>
          <h3 className={`text-2xl font-semibold tracking-[-.04em] ${isConcept ? 'text-white' : 'text-[var(--ink)]'}`}>{title}</h3>
          {featured && <div className="mt-5 flex flex-wrap items-center gap-2" aria-label="Project journey">{journey.map((step, index) => <span key={step} className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/80 px-3 py-2 text-[11px] font-medium text-[var(--ink)]">{step}{index < journey.length - 1 && <span aria-hidden className="-mr-1 text-[var(--brand-green-dark)]">→</span>}</span>)}</div>}
          {!featured && isConcept && <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">Illustrative system concept — not a live product.</p>}
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-sm leading-6 text-[var(--muted)]">{description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-green-dark)]">{isConcept ? 'View concept' : 'View project'} <span aria-hidden>→</span></span>
      </div>
    </Link>
  </article>;
}

export default function Home() {
  const selectedCases = ['gari-qatar', 'sahara', 'auto-workshop-system'].map(slug => cases.find(item => item[0] === slug)).filter(Boolean);

  return <Layout><main className="overflow-hidden">
    <section className="relative isolate overflow-hidden bg-[var(--dark)] py-8 text-white sm:py-10 lg:py-14" aria-labelledby="home-title">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-[var(--brand-green-dark)] opacity-35 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-green)]/50 to-transparent" />
      <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] items-center gap-5 sm:w-[min(1200px,calc(100%-3rem))] lg:grid-cols-[1.02fr_.98fr] lg:gap-12">
        <div>
          <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[var(--lime)]"><span aria-hidden className="h-px w-6 bg-[var(--lime)]"/> Digital solutions &amp; automation · Doha, Qatar</p>
          <h1 id="home-title" className="max-w-3xl text-[clamp(2.35rem,5.25vw,4.6rem)] font-semibold leading-[1.01] tracking-[-.06em] text-white">Every enquiry deserves a <span className="text-[var(--lime)]">fast, personal reply.</span></h1>
          <p className="mt-4 max-w-xl text-[15px] leading-6 text-white/75 sm:mt-5 sm:text-base sm:leading-7">Axivy builds the websites, CRM and WhatsApp workflows that help Qatar businesses answer customers sooner, keep every lead organized and stop repeating manual work.</p>
          <div className="mt-5 flex flex-col gap-3 min-[420px]:flex-row sm:mt-6">
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[var(--lime)] px-5 text-sm font-bold text-[var(--ink)] transition-colors hover:bg-[var(--brand-green)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">Start a conversation <span aria-hidden>↗</span></Link>
            <a href={whatsappUrl("Hi Axivy, I'd like to discuss a business solution.")} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/25 bg-white/[.04] px-5 text-sm font-bold text-white transition-colors hover:border-white/60 hover:bg-white/[.08] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">Chat on WhatsApp <span aria-hidden>↗</span></a>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs leading-5 text-white/65 sm:text-sm"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--lime)]"/>Based in Doha, working with businesses across Qatar and remotely.</p>
        </div>
        <div className="hidden md:block"><HomeExperience mode="phone" /></div>
      </div>
    </section>

    <section className="bg-white py-9 sm:py-12 lg:py-14" aria-labelledby="problem-title">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] sm:w-[min(1200px,calc(100%-3rem))]">
        <SectionHeading eyebrow="The everyday friction" title="Good businesses lose customers when their systems fall behind." id="problem-title" />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">{problems.map(([title, description], index) => <article key={title} className="bg-[var(--paper)] p-5 sm:p-6"><span className="mb-5 block text-xs font-bold tracking-widest text-[var(--brand-green-dark)]">0{index + 1}</span><h3 className="text-lg font-semibold tracking-tight text-[var(--ink)]">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p></article>)}</div>
      </div>
    </section>

    <section className="bg-white py-9 sm:py-12 lg:py-14" aria-labelledby="services-title">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] sm:w-[min(1200px,calc(100%-3rem))]">
        <SectionHeading eyebrow="Practical digital systems" title="What we build for you" copy="Start with the part of your customer journey or daily workflow that needs to work better." id="services-title" />
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">{services.map((service, index) => <article key={service.slug} className="group grid grid-cols-[2.25rem_1fr] items-start gap-x-3 gap-y-2 py-5 transition-colors hover:bg-[var(--paper)] sm:grid-cols-[3rem_2.75rem_1fr_auto] sm:items-center sm:gap-5 sm:px-3 sm:py-6">
          <span className="hidden text-sm font-bold tabular-nums text-[var(--brand-green-dark)] sm:block">0{index + 1}</span>
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--sage)] text-base font-bold text-[var(--brand-green-dark)]">{service.icon}</span>
          <div><h3 className="text-lg font-semibold tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--brand-green-dark)] sm:text-xl">{service.title}</h3><p className="mt-1 max-w-3xl text-sm leading-6 text-[var(--muted)]">{serviceDescriptions[service.slug] || service.description}</p></div>
          <Link href={`/services/${service.slug}`} className="col-start-2 inline-flex w-fit items-center gap-2 text-sm font-bold text-[var(--brand-green-dark)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-green-dark)] sm:col-auto">Learn more <span aria-hidden className="transition-transform group-hover:translate-x-1">↗</span></Link>
        </article>)}</div>
      </div>
    </section>

    <section className="bg-[var(--dark)] py-9 text-white sm:py-12 lg:py-14" aria-labelledby="journey-title">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] sm:w-[min(1200px,calc(100%-3rem))]">
        <SectionHeading eyebrow="Connected customer journey" title="One customer journey, one connected system." copy="A customer should not have to repeat themselves at every step. Make the handoff clearer for them and your team." id="journey-title" />
        <HomeExperience mode="journey" />
      </div>
    </section>

    <section className="bg-white py-9 sm:py-12 lg:py-14" aria-labelledby="industries-title">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] sm:w-[min(1200px,calc(100%-3rem))]">
        <SectionHeading eyebrow="Solutions for your sector" title="Built around how your business works" copy="Your industry has its own pace and customer expectations. The right systems should fit the way you operate." id="industries-title" />
        <div className="grid border-y border-[var(--line)] sm:grid-cols-2 sm:gap-x-8">{industrySlugs.map(slug => { const industry = solutions.find(item => item.slug === slug); if (!industry) return null; return <Link key={slug} href={`/solutions/${slug}`} className="group flex min-h-24 items-center justify-between gap-5 border-b border-[var(--line)] py-5 last:border-b-0 sm:min-h-28 sm:even:border-b-0">
          <span><span className="block text-lg font-semibold tracking-tight text-[var(--ink)] group-hover:text-[var(--brand-green-dark)]">{industry.name}</span><span className="mt-1 block max-w-lg text-sm leading-6 text-[var(--muted)]">{industry.summary}</span></span><span aria-hidden className="shrink-0 text-lg text-[var(--brand-green-dark)] transition-transform group-hover:translate-x-1">↗</span>
        </Link>; })}</div>
      </div>
    </section>

    <section className="bg-[var(--paper)] py-9 sm:py-12 lg:py-14" aria-labelledby="work-title">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] sm:w-[min(1200px,calc(100%-3rem))]">
        <SectionHeading eyebrow="Selected work" title="Made for real business needs" copy="Explore a completed business project, a website project and a clearly labelled system concept." id="work-title" />
        <div className="grid gap-4 md:grid-cols-2"><WorkCard item={selectedCases[0]} featured/><WorkCard item={selectedCases[1]}/><WorkCard item={selectedCases[2]}/></div>
      </div>
    </section>

    <section className="bg-white py-9 sm:py-12 lg:py-14" aria-labelledby="process-title">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] sm:w-[min(1200px,calc(100%-3rem))]">
        <SectionHeading eyebrow="How we work" title="A clear path from idea to launch" copy="We start by understanding the business problem, then shape a solution your team can use." id="process-title" />
        <ol className="grid gap-0 border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">{process.map(([title, description], index) => <li key={title} className="relative border-b border-[var(--line)] py-5 pl-12 pr-4 sm:min-h-32 sm:py-6 lg:min-h-36"><span className="absolute left-0 top-5 text-sm font-bold tabular-nums text-[var(--brand-green-dark)] sm:top-6">0{index + 1}</span><h3 className="font-semibold text-[var(--ink)]">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p></li>)}</ol>
      </div>
    </section>

    <section className="bg-[var(--paper)] py-9 sm:py-12 lg:py-14" aria-labelledby="faq-title">
      <div className="mx-auto w-[min(860px,calc(100%-2rem))] sm:w-[min(860px,calc(100%-3rem))]">
        <SectionHeading eyebrow="Frequently asked" title="A few useful answers" id="faq-title" />
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">{faqs.map(([question, answer]) => <details key={question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[var(--ink)] marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-green-dark)] sm:text-lg"><span>{question}</span><span aria-hidden className="text-xl font-normal text-[var(--brand-green-dark)] transition-transform group-open:rotate-45">+</span></summary>
          <p className="max-w-3xl pt-3 pr-8 text-sm leading-7 text-[var(--muted)]">{answer}</p>
        </details>)}</div>
      </div>
    </section>

    <section className="bg-[var(--dark)] py-9 text-white sm:py-12 lg:py-14" aria-labelledby="contact-title">
      <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-6 sm:w-[min(1200px,calc(100%-3rem))] md:grid-cols-[1fr_auto] md:items-center md:gap-10">
        <div><p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-[var(--lime)]">Start a conversation</p><h2 id="contact-title" className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-4xl">Have a business problem worth solving?</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">Tell us what is slowing your business down and we'll suggest a practical digital or automation solution.</p></div>
        <div className="flex flex-col gap-3 min-[420px]:flex-row md:flex-col"><Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[var(--lime)] px-5 text-sm font-bold text-[var(--ink)] transition-colors hover:bg-[var(--brand-green)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">Let's talk <span aria-hidden>↗</span></Link><a href={whatsappUrl("Hi Axivy, I'd like to discuss a business solution.")} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/30 px-5 text-sm font-bold text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">Chat on WhatsApp <span aria-hidden>↗</span></a></div>
      </div>
    </section>
  </main></Layout>;
}
