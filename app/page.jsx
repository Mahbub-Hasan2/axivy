import Link from 'next/link';
import HomeExperience from '../components/HomeExperience';
import JsonLd from '../components/JsonLd';
import { Layout } from '../components/SiteShell';
import { cases, services, solutions } from '../data/content';
import { whatsappUrl } from '../data/contact';
import { DEFAULT_OG_IMAGE, SITE_URL } from '../lib/site';

export const metadata = {
  title: { absolute: 'Axivy | Digital Solutions & Automation for Qatar Businesses' },
  description: 'Axivy helps Qatar businesses build websites, CRM systems, WhatsApp workflows and practical automation to capture enquiries, improve customer management and reduce repetitive work.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Axivy | Digital Solutions & Automation for Qatar Businesses',
    description: 'Axivy helps Qatar businesses build websites, CRM systems, WhatsApp workflows and practical automation to capture enquiries, improve customer management and reduce repetitive work.',
    url: SITE_URL,
    siteName: 'Axivy',
    locale: 'en_QA',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axivy | Digital Solutions & Automation for Qatar Businesses',
    description: 'Axivy helps Qatar businesses build websites, CRM systems, WhatsApp workflows and practical automation to capture enquiries, improve customer management and reduce repetitive work.',
    images: ['/og-image.png'],
  },
};

const problems = [
  ['Missed enquiries', 'Busy teams can miss customer messages across separate chats before anyone has a chance to respond.'],
  ['Slow follow-ups', 'Without automated next steps and clear lead routing, promising conversations lose momentum.'],
  ['Scattered details', 'Customer context gets split between WhatsApp, email inboxes, spreadsheets and memory.'],
  ['Limited visibility', 'It is hard for managers to see what needs attention when updates live in different places.'],
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
  ['What are the costs?', 'Pricing depends on the scope and features. We confirm exact costs after understanding your requirements, with transparent QAR ranges and no hidden fees.'],
  ['Can you connect our website with WhatsApp?', 'Yes. We make it seamless for customers to move from a website enquiry into a relevant WhatsApp conversation and an organized team follow-up.'],
  ['Can you work with the tools we already use?', 'Often, yes. We first audit your current tools and workflow, then identify what can be connected, automated or improved.'],
  ['Do you provide ongoing support?', 'Ongoing support and continuous improvements can be arranged around the solution and what your team needs to run smoothly.'],
];

function SectionHeading({ eyebrow, title, copy, id, dark = false }) {
  return <div className="mb-6 grid gap-3 sm:mb-8 md:grid-cols-[1fr_.72fr] md:items-end md:gap-8">
    <div>
      {eyebrow && <p className={`mb-3 text-xs font-bold uppercase tracking-[.18em] ${dark ? 'text-[var(--lime)]' : 'text-[var(--brand-green-dark)]'}`}>{eyebrow}</p>}
      <h2 id={id} className={`max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-.045em] sm:text-4xl ${dark ? 'text-white' : 'text-[var(--ink)]'}`}>{title}</h2>
    </div>
    {copy && <p className={`max-w-xl text-sm leading-7 sm:text-base ${dark ? 'text-white/75' : 'text-[var(--muted)]'}`}>{copy}</p>}
  </div>;
}

function FeaturedMockup() {
  return <div aria-hidden className="pointer-events-none relative mx-auto my-4 w-full max-w-[25rem] rotate-[-1.2deg] rounded-xl border border-white/80 bg-white p-3 text-[var(--ink)] shadow-[0_18px_44px_rgba(17,26,35,.14)] sm:my-5">
    <div className="flex items-center justify-between gap-2 border-b border-[var(--line)] pb-2">
      <span className="text-[10px] font-extrabold uppercase tracking-[.12em]">Gari Qatar</span>
      <span className="rounded-full bg-[var(--sage)] px-2 py-1 text-[8px] font-bold uppercase tracking-[.08em] text-[var(--brand-green-dark)]">Online store</span>
    </div>
    <div className="mt-2 flex items-center justify-between rounded-md bg-[var(--paper)] px-2.5 py-1.5 text-[9px] text-[var(--muted)]"><span>Search car accessories</span><span>⌕</span></div>
    <div className="mt-2 grid grid-cols-3 gap-1.5">
      {[['Floor mats', '▦'], ['LED lights', '✦'], ['Car care', '◈']].map(([label, icon]) => <div key={label} className="rounded-md border border-[var(--line)] bg-white p-1.5">
        <div className="grid h-11 place-items-center rounded bg-[var(--paper)] text-lg text-[var(--brand-green-dark)]">{icon}</div>
        <p className="mt-1.5 truncate text-[8px] font-semibold">{label}</p>
        <p className="text-[7px] text-[var(--muted)]">Ask on WhatsApp</p>
      </div>)}
    </div>
  </div>;
}

function WorkCard({ item, featured = false }) {
  if (!item) return null;
  const [slug, title, category, status, description, journey = []] = item;
  const isConcept = /concept/i.test(status);

  return <article className={`group overflow-hidden rounded-2xl border border-[var(--line)] bg-white transition-all hover:shadow-lg ${featured ? 'md:row-span-2' : ''}`}>
    <Link href={`/case-studies/${slug}`} className="block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-green-dark)]">
      <div className={`relative flex min-h-44 flex-col justify-between overflow-hidden p-5 sm:min-h-52 sm:p-6 ${featured ? 'bg-[var(--sage)] md:min-h-[23rem]' : isConcept ? 'bg-[var(--dark)] text-white' : 'bg-white'}`}>
        <div className="flex items-start justify-between gap-3">
          <span className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold ${isConcept ? 'bg-[var(--lime)] text-[var(--ink)]' : 'bg-white/80 text-[var(--brand-green-dark)]'}`}>{status}</span>
          <span aria-hidden className={`text-lg transition-transform group-hover:translate-x-1 ${isConcept ? 'text-[var(--lime)]' : 'text-[var(--brand-green-dark)]'}`}>↗</span>
        </div>
        {featured && <FeaturedMockup />}
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

  return <Layout><div className="overflow-hidden">

    {/* HERO SECTION */}
    <section className="relative isolate overflow-hidden bg-[var(--dark)] py-12 text-white sm:py-16 lg:py-20" aria-labelledby="home-title">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[38rem] w-[38rem] rounded-full bg-[var(--brand-green-dark)] opacity-40 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-green)]/60 to-transparent" />

      <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] items-center gap-8 sm:w-[min(1200px,calc(100%-3rem))] lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
        <div>
          <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[.06] px-3.5 py-1.5 text-xs font-semibold text-[var(--lime)]">
            <span aria-hidden className="h-2 w-2 rounded-full bg-[var(--lime)] animate-pulse" />
            Doha, Qatar · Digital Solutions &amp; Automation
          </div>

          <h1 id="home-title" className="max-w-3xl text-[clamp(2.5rem,5.5vw,4.8rem)] font-bold leading-[1.02] tracking-[-.05em] text-white">
            Every enquiry deserves a <span className="text-[var(--lime)]">fast, personal reply.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Axivy builds high-performing websites, centralized CRM systems, and automated WhatsApp workflows that help Qatar businesses answer customers instantly and stop losing leads.
          </p>

          <div className="mt-7 flex flex-col gap-3.5 min-[420px]:flex-row">
            <Link href="/contact" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-[var(--lime)] px-6 text-sm font-bold text-[var(--ink)] shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#a3f03b] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">
              Start a Conversation <span aria-hidden>↗</span>
            </Link>
            <a href={whatsappUrl("Hi Axivy, I'd like to discuss a business solution.")} target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-xl border border-white/30 bg-white/[.05] px-6 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/[.1] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">
              Chat on WhatsApp <span aria-hidden>↗</span>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/15 pt-6 text-xs text-white/70 sm:text-sm">
            <div><strong className="block text-lg font-bold text-white">24h</strong> Fast Response</div>
            <div><strong className="block text-lg font-bold text-white">100%</strong> Tailored Scope</div>
            <div><strong className="block text-lg font-bold text-white">QAR</strong> Transparent Pricing</div>
          </div>
        </div>

        <div className="hidden md:block">
          <HomeExperience mode="phone" />
        </div>
      </div>
    </section>

    {/* QUICK INFO STRIP FOR FAST ACCESS */}
    <section className="border-b border-[var(--line)] bg-[var(--sage)] py-4 text-xs font-bold uppercase tracking-wider text-[var(--brand-green-dark)]" aria-label="Core Capabilities">
      <div className="mx-auto flex w-[min(1200px,calc(100%-2rem))] flex-wrap items-center justify-center gap-6 sm:w-[min(1200px,calc(100%-3rem))] sm:justify-between">
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green-dark)]" /> Websites &amp; Web Apps</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green-dark)]" /> Lead Management</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green-dark)]" /> CRM Systems</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green-dark)]" /> WhatsApp Workflows</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green-dark)]" /> Business Automation</span>
      </div>
    </section>

    {/* THE EVERYDAY FRICTION */}
    <section className="bg-white py-12 sm:py-16 lg:py-20" aria-labelledby="problem-title">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] sm:w-[min(1200px,calc(100%-3rem))]">
        <SectionHeading eyebrow="The everyday friction" title="Good businesses lose customers when their systems fall behind." copy="See why manual follow-ups and scattered inboxes cost revenue every single week." id="problem-title" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(([title, description], index) => (
            <article key={title} className="group rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 transition-transform hover:-translate-y-1 hover:border-[var(--brand-green)]">
              <span className="mb-4 block text-xs font-bold tracking-widest text-[var(--brand-green-dark)]">0{index + 1}</span>
              <h3 className="text-lg font-semibold tracking-tight text-[var(--ink)]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* WHAT WE BUILD (SERVICES) */}
    <section className="bg-[var(--paper)] py-12 sm:py-16 lg:py-20" aria-labelledby="services-title">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] sm:w-[min(1200px,calc(100%-3rem))]">
        <SectionHeading eyebrow="Practical digital systems" title="What we build for you" copy="Choose the part of your customer journey or daily workflow that needs an upgrade." id="services-title" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article key={service.slug} className="group flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[var(--brand-green)] hover:shadow-lg">
              <div>
                <div className="flex items-center justify-between">
                  <span aria-hidden className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--sage)] text-lg font-bold text-[var(--brand-green-dark)]">{service.icon}</span>
                  <span className="text-xs font-bold text-[var(--brand-green-dark)]">0{index + 1}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-[var(--ink)] group-hover:text-[var(--brand-green-dark)]">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{serviceDescriptions[service.slug] || service.description}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4">
                <span className="text-xs font-bold text-[var(--brand-green-dark)]">{service.startingPrice}</span>
                <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-green-dark)] hover:underline">
                  Explore details <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* CONNECTED CUSTOMER JOURNEY */}
    <section className="bg-[var(--dark)] py-12 text-white sm:py-16 lg:py-20" aria-labelledby="journey-title">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] sm:w-[min(1200px,calc(100%-3rem))]">
        <SectionHeading dark eyebrow="Connected customer journey" title="One customer journey, one connected system." copy="A customer should not have to repeat themselves at every step. Make the handoff effortless for them and your team." id="journey-title" />
        <HomeExperience mode="journey" />
      </div>
    </section>

    {/* SOLUTIONS FOR YOUR SECTOR */}
    <section className="bg-white py-12 sm:py-16 lg:py-20" aria-labelledby="industries-title">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] sm:w-[min(1200px,calc(100%-3rem))]">
        <SectionHeading eyebrow="Solutions for your sector" title="Built around how your business works" copy="Every industry has its own pace and customer expectations. The right systems fit your operational reality." id="industries-title" />
        <div className="grid gap-4 sm:grid-cols-2">
          {industrySlugs.map(slug => {
            const industry = solutions.find(item => item.slug === slug);
            if (!industry) return null;
            return (
              <Link key={slug} href={`/solutions/${slug}`} className="group flex items-center justify-between gap-5 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 transition-all hover:border-[var(--brand-green)] hover:bg-white hover:shadow-md">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-[var(--ink)] group-hover:text-[var(--brand-green-dark)]">{industry.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{industry.summary}</p>
                </div>
                <span aria-hidden className="shrink-0 rounded-full bg-white p-3 text-lg text-[var(--brand-green-dark)] shadow-sm transition-transform group-hover:translate-x-1">↗</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>

    {/* SELECTED WORK */}
    <section className="bg-[var(--paper)] py-12 sm:py-16 lg:py-20" aria-labelledby="work-title">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] sm:w-[min(1200px,calc(100%-3rem))]">
        <SectionHeading eyebrow="Selected work" title="Made for real business needs" copy="Explore completed projects, online stores, and clearly labelled system concepts." id="work-title" />
        <div className="grid gap-6 md:grid-cols-2">
          <WorkCard item={selectedCases[0]} featured />
          <WorkCard item={selectedCases[1]} />
          <WorkCard item={selectedCases[2]} />
        </div>
      </div>
    </section>

    {/* HOW WE WORK */}
    <section className="bg-white py-12 sm:py-16 lg:py-20" aria-labelledby="process-title">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] sm:w-[min(1200px,calc(100%-3rem))]">
        <SectionHeading eyebrow="How we work" title="A clear path from idea to launch" copy="We start by understanding your business friction, then shape a clean solution your team can immediately use." id="process-title" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {process.map(([title, description], index) => (
            <li key={title} className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6">
              <span className="mb-4 block text-xs font-bold tracking-widest text-[var(--brand-green-dark)]">0{index + 1}</span>
              <h3 className="text-lg font-semibold text-[var(--ink)]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* FAQ SECTION */}
    <section className="bg-[var(--paper)] py-12 sm:py-16 lg:py-20" aria-labelledby="faq-title">
      <div className="mx-auto w-[min(860px,calc(100%-2rem))] sm:w-[min(860px,calc(100%-3rem))]">
        <SectionHeading eyebrow="Frequently asked" title="A few useful answers" id="faq-title" />
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[var(--ink)] marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-green-dark)] sm:text-lg">
                <span>{question}</span>
                <span aria-hidden className="text-xl font-normal text-[var(--brand-green-dark)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-3xl pt-3 pr-8 text-sm leading-7 text-[var(--muted)]">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="bg-[var(--dark)] py-14 text-white sm:py-16 lg:py-20" aria-labelledby="contact-title">
      <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-8 sm:w-[min(1200px,calc(100%-3rem))] md:grid-cols-[1fr_auto] md:items-center md:gap-12">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[var(--lime)]">Start a conversation</p>
          <h2 id="contact-title" className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-4xl">Have a business problem worth solving?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">Tell us what is slowing your business down and we'll suggest a practical digital or automation solution.</p>
        </div>
        <div className="flex flex-col gap-3.5 min-[420px]:flex-row md:flex-col">
          <Link href="/contact" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-[var(--lime)] px-6 text-sm font-bold text-[var(--ink)] transition-colors hover:bg-[var(--brand-green-dark)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">
            Let's Talk <span aria-hidden>↗</span>
          </Link>
          <a href={whatsappUrl("Hi Axivy, I'd like to discuss a business solution.")} target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-xl border border-white/30 px-6 text-sm font-bold text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">
            Chat on WhatsApp <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>

  </div>
  <JsonLd data={{
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }} />
  </Layout>;
}
