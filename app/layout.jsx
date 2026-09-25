import './globals.css';
import Script from 'next/script';

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const validGaMeasurementId = gaMeasurementId && /^G-[A-Z0-9]+$/i.test(gaMeasurementId) ? gaMeasurementId : null;

export const metadata = {
  metadataBase: new URL('https://axivy.io'),
  title: { default: 'Axivy | Digital Solutions & Automation for Qatar Businesses', template: '%s | Axivy' },
  description: 'Axivy helps Qatar businesses build websites, CRM systems, WhatsApp workflows and practical automation to capture enquiries, improve customer management and reduce repetitive work.',
  openGraph: { title: 'Axivy | Digital Solutions & Automation for Qatar Businesses', description: 'Axivy helps Qatar businesses build websites, CRM systems, WhatsApp workflows and practical automation to capture enquiries, improve customer management and reduce repetitive work.', url: 'https://axivy.io', siteName: 'Axivy', type: 'website' },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}{validGaMeasurementId && <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${validGaMeasurementId}`} strategy="afterInteractive" />
    <Script id="ga4-init" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${validGaMeasurementId}');`}</Script>
  </>}</body></html>;
}
