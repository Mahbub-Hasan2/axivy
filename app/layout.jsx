import './globals.css';

export const metadata = {
  metadataBase: new URL('https://axivy.io'),
  title: { default: 'Axivy | Digital Solutions & Automation for Qatar Businesses', template: '%s | Axivy' },
  description: 'Axivy helps Qatar businesses build websites, CRM systems, WhatsApp workflows and practical automation to capture enquiries, improve customer management and reduce repetitive work.',
  openGraph: { title: 'Axivy | Digital Solutions & Automation for Qatar Businesses', description: 'Axivy helps Qatar businesses build websites, CRM systems, WhatsApp workflows and practical automation to capture enquiries, improve customer management and reduce repetitive work.', url: 'https://axivy.io', siteName: 'Axivy', type: 'website' },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
