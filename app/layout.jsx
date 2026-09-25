import './globals.css';

export const metadata = {
  metadataBase: new URL('https://axivy.io'),
  title: { default: 'Axivy | Digital Solutions & Automation Qatar', template: '%s | Axivy' },
  description: 'Axivy builds websites, customer systems and practical automation for growing businesses in Qatar.',
  openGraph: { title: 'Axivy | Digital Solutions & Automation', description: 'Practical systems for growing businesses.', url: 'https://axivy.io', siteName: 'Axivy', type: 'website' },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
