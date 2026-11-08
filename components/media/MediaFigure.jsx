import fs from 'fs';
import path from 'path';
import Image from 'next/image';

export function publicAssetExists(src) {
  return Boolean(src && src.startsWith('/') && fs.existsSync(path.join(process.cwd(), 'public', src.replace(/^\//, ''))));
}

export default function MediaFigure({ src, alt = '', caption, width, height, sizes = '100vw', priority = false }) {
  if (!publicAssetExists(src)) return null;
  return <figure className="media-figure">
    <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className="media-figure-image" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}
