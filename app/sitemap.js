import { articles, cases } from '../data/content';

export default function sitemap() {
  const staticRoutes = ['', 'services', 'solutions', 'case-studies', 'process', 'about', 'insights', 'contact', 'privacy', 'terms'];
  const dynamicRoutes = [
    ...cases.map(([slug]) => `case-studies/${slug}`),
    ...articles.map(([slug]) => `insights/${slug}`),
  ];
  return [...staticRoutes, ...dynamicRoutes].map(path => ({
    url: `https://axivy.io/${path}`,
    lastModified: new Date(),
  }));
}
