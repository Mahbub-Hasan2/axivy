export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://axivy.vercel.app').replace(/\/+$/, '');
export const SITE_HOST = new URL(SITE_URL).host;

export const DEFAULT_TITLE = 'Axivy | Digital Solutions & Automation for Qatar Businesses';
export const DEFAULT_DESCRIPTION =
  'Axivy helps Qatar businesses build websites, CRM systems, WhatsApp workflows and practical automation to capture enquiries, improve customer management and reduce repetitive work.';

export const DEFAULT_OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Axivy — practical digital systems for Qatar businesses',
};
