import { articles, cases, services, solutions } from '../data/content';
import { SITE_URL } from '../lib/site';

export default function sitemap() {
  const staticRoutes = [
    ['', 1],
    ['services', 0.9],
    ['solutions', 0.9],
    ['case-studies', 0.8],
    ['process', 0.7],
    ['about', 0.7],
    ['insights', 0.8],
    ['contact', 0.8],
    ['privacy', 0.3],
    ['terms', 0.3],
  ];
  const dynamicRoutes = [
    ...services.map(({ slug }) => [`services/${slug}`, 0.8]),
    ...solutions.map(({ slug }) => [`solutions/${slug}`, 0.8]),
    ...cases.map(([slug]) => [`case-studies/${slug}`, 0.7]),
    ...articles.map(([slug]) => [`insights/${slug}`, 0.7]),
  ];

  return [...staticRoutes, ...dynamicRoutes].map(([path, priority]) => ({
    url: path ? `${SITE_URL}/${path}` : SITE_URL,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority,
  }));
}
