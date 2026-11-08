function getEmbedUrl(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const isYoutube = parsed.hostname.includes('youtube.com') || parsed.hostname === 'youtu.be';
    if (isYoutube) {
      const videoId = parsed.hostname === 'youtu.be' ? parsed.pathname.slice(1) : parsed.searchParams.get('v') || parsed.pathname.split('/').filter(Boolean).pop();
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
    }
    if (parsed.hostname.includes('loom.com')) {
      const videoId = parsed.pathname.split('/').filter(Boolean).pop();
      return videoId ? `https://www.loom.com/embed/${videoId}` : null;
    }
    return /\.mp4(?:$|\?)/i.test(parsed.pathname) ? url : null;
  } catch {
    return null;
  }
}

export default function DemoVideo({ url }) {
  const embedUrl = getEmbedUrl(url);
  if (!embedUrl) return null;

  const isMp4 = /\.mp4(?:$|\?)/i.test(embedUrl);
  return <section className="bg-white py-12 sm:py-16" aria-labelledby="demo-video-title">
    <div className="mx-auto w-[min(960px,calc(100%-2rem))] sm:w-[min(960px,calc(100%-3rem))]">
      <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[var(--brand-green-dark)]">A quick walkthrough</p>
      <h2 id="demo-video-title" className="max-w-2xl text-3xl font-semibold tracking-[-.045em] text-[var(--ink)] sm:text-4xl">See how it works in 60 seconds</h2>
      <div className="mt-6 aspect-video overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--dark)] shadow-sm">
        {isMp4 ? <video className="h-full w-full" controls preload="metadata"><source src={embedUrl} type="video/mp4" /></video> : <iframe className="h-full w-full" src={embedUrl} title="Axivy demo video: how an enquiry system works" loading="lazy" allowFullScreen />}
      </div>
    </div>
  </section>;
}
