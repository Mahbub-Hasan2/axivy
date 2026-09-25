const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#0b1220"/><path d="M15 19h35v8H24v7h20v8H24v9h-9z" fill="#fff"/><circle cx="50" cy="49" r="5" fill="#06b6d4"/></svg>`;

export function GET() {
  return new Response(icon, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
