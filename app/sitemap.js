import { articles, cases, services, solutions } from '../data/content';
import { searchPages } from '../data/searchPages';
import { SITE_URL } from '../lib/site';

const STATIC_LAST_MODIFIED = '2026-10-31T00:00:00.000Z';

export default function sitemap() {
  const staticRoutes = [
    ['', 1],
    ['services', 0.9],
    ['solutions', 0.9],
    ['case-studies', 0.8],
    ['demo', 0.7],
    ['process', 0.7],
    ['about', 0.7],
    ['insights', 0.8],
    ['contact', 0.8],
    ['privacy', 0.3],
    ['terms', 0.3],
  ];
  const dynamicRoutes = [
    ...services.map(({ slug }) => [`services/${slug}`, 0.8, STATIC_LAST_MODIFIED]),
    ...solutions.map(({ slug }) => [`solutions/${slug}`, 0.8, STATIC_LAST_MODIFIED]),
    ...cases.map(([slug]) => [`case-studies/${slug}`, 0.7, STATIC_LAST_MODIFIED]),
    ...articles.map(({ slug, date }) => [`insights/${slug}`, 0.7, `${date}T00:00:00.000Z`]),
    ...searchPages.map(({ slug }) => [slug, 0.7, STATIC_LAST_MODIFIED]),
  ];

  return [...staticRoutes.map(([path, priority]) => [path, priority, STATIC_LAST_MODIFIED]), ...dynamicRoutes].map(([path, priority, lastModified]) => ({
    url: path ? `${SITE_URL}/${path}` : SITE_URL,
    lastModified,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority,
  }));
}
