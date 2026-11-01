import Link from 'next/link';
import { Layout } from '../components/SiteShell';

const notFoundDescription = 'The page you were looking for is not available. Explore Axivy services, solutions, case studies and insights.';

export const metadata = {
  title: 'Page not found',
  description: notFoundDescription,
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Page not found | Axivy',
    description: notFoundDescription,
    siteName: 'Axivy',
    locale: 'en_QA',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Page not found | Axivy',
    description: notFoundDescription,
  },
};

export default function NotFound() {
  return <Layout>
    <section className="page-hero">
      <div className="shell">
        <p className="eyebrow">404</p>
        <h1>This page is not here.</h1>
        <p>The link may be out of date, or the page may have moved. Use the links below to find what you need.</p>
      </div>
    </section>
    <section className="page-content">
      <div className="shell">
        <div className="flex flex-wrap items-center gap-3">
          <Link className="btn btn-primary" href="/">Back to Axivy <span aria-hidden>↗</span></Link>
          <Link className="btn btn-secondary" href="/services">Explore services <span aria-hidden>→</span></Link>
          <Link className="btn btn-secondary" href="/contact">Contact us <span aria-hidden>→</span></Link>
        </div>
      </div>
    </section>
  </Layout>;
}
