import './globals.css';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import JsonLd from '../components/JsonLd';
import { AXIVY_LOCATION, AXIVY_PHONE } from '../data/contact';
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, DEFAULT_TITLE, SITE_URL } from '../lib/site';

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const validGaMeasurementId = gaMeasurementId && /^G-[A-Z0-9]+$/i.test(gaMeasurementId) ? gaMeasurementId : null;
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: '%s | Axivy' },
  description: DEFAULT_DESCRIPTION,
  applicationName: 'Axivy',
  authors: [{ name: 'Munir Uddin Mahbub', url: `${SITE_URL}/about` }],
  creator: 'Munir Uddin Mahbub',
  publisher: 'Axivy',
  category: 'Business services',
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Axivy',
    locale: 'en_QA',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
  ...(googleSiteVerification ? { verification: { google: googleSiteVerification } } : {}),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111a23',
  colorScheme: 'light',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Axivy',
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      image: `${SITE_URL}/og-image.png`,
      description: DEFAULT_DESCRIPTION,
      telephone: AXIVY_PHONE,
      priceRange: 'From QAR 2,500',
      areaServed: { '@type': 'Country', name: 'Qatar' },
      address: { '@type': 'PostalAddress', addressLocality: 'Doha', addressCountry: 'QA' },
      founder: { '@type': 'Person', name: 'Munir Uddin Mahbub' },
      sameAs: ['https://www.linkedin.com/company/axivy'],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: AXIVY_PHONE,
          areaServed: 'QA',
          availableLanguage: ['English'],
        },
      ],
      knowsAbout: [
        'Website development',
        'Lead management',
        'CRM systems',
        'WhatsApp systems',
        'Business automation',
        'AI solutions',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Axivy',
      description: DEFAULT_DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className={inter.variable}>
      <body>
        {children}
        <JsonLd data={organizationSchema} />
        {validGaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${validGaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${validGaMeasurementId}');`}</Script>
          </>
        )}
      </body>
    </html>
  );
}
