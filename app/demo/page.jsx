import JsonLd from '../../components/JsonLd';
import InteractiveDemo from '../../components/InteractiveDemo';
import { Layout } from '../../components/SiteShell';
import { SITE_URL } from '../../lib/site';

export const metadata = {
  title: 'Interactive enquiry system demo',
  description: 'Try a local interactive example of how a customer enquiry can be received, recorded, alerted and followed up.',
  alternates: { canonical: '/demo' },
};

export default function DemoPage() {
  return <Layout><InteractiveDemo /><JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Interactive demo', item: `${SITE_URL}/demo` },
  ] }} /></Layout>;
}
