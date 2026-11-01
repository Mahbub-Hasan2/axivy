export function GET(request) {
  return Response.redirect(new URL('/favicon-32.png', request.url), 308);
}
