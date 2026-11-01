import { DEFAULT_DESCRIPTION } from '../lib/site';

export default function manifest() {
  return {
    name: 'Axivy — Digital Solutions & Automation',
    short_name: 'Axivy',
    description: DEFAULT_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#f6fbf4',
    theme_color: '#111a23',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
