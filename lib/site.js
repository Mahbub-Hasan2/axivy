export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://axivy.vercel.app').replace(/\/+$/, '');
export const SITE_HOST = new URL(SITE_URL).host;

export const DEFAULT_TITLE = 'Axivy | Website & WhatsApp Enquiry Systems in Qatar';
export const DEFAULT_DESCRIPTION =
  'Axivy builds websites and WhatsApp enquiry systems for small businesses in Qatar, so every customer message is saved, answered and followed up. Packages from QAR 2,500. Free audit.';

export const DEFAULT_OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Axivy — practical digital systems for Qatar businesses',
};
