import MediaFigure from './MediaFigure';
import BrowserFrame from './BrowserFrame';

export default function Gallery({ items = [] }) {
  const visibleItems = items.filter(item => item?.src);
  if (!visibleItems.length) return null;
  return <div className="media-gallery">{visibleItems.map(item => <BrowserFrame key={item.src} label={item.alt || 'Screenshot preview'}><MediaFigure {...item} caption={item.sample ? `${item.caption || item.alt || 'Preview'} — Sample data` : item.caption} width={item.width || 1600} height={item.height || 1000} sizes="(min-width: 768px) 50vw, 100vw" /></BrowserFrame>)}</div>;
}
