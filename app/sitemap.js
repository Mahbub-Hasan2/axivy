import { articles, cases, solutions } from '../data/content';

export default function sitemap() {
  const staticRoutes = ['', 'services', 'solutions', 'case-studies', 'process', 'about', 'insights', 'contact', 'privacy', 'terms'];
  const dynamicRoutes = [
    ...solutions.map(({ slug }) => `solutions/${slug}`),
    ...cases.map(([slug]) => `case-studies/${slug}`),
    ...articles.map(([slug]) => `insights/${slug}`),
  ];
  return [...staticRoutes, ...dynamicRoutes].map(path => ({
    url: `https://axivy.io/${path}`,
    lastModified: new Date(),
  }));
}
