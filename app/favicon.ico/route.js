export function GET(request) {
  return Response.redirect(new URL('/favicon.png', request.url), 308);
}
