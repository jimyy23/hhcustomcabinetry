const MARKDOWN_ROUTES = new Map([
  ['/', '/agent-content/home.md'],
  ['/about', '/agent-content/about.md'],
  ['/about/', '/agent-content/about.md'],
  ['/contact', '/agent-content/contact.md'],
  ['/contact/', '/agent-content/contact.md'],
  ['/gallery', '/agent-content/gallery.md'],
  ['/gallery/', '/agent-content/gallery.md'],
  ['/services', '/agent-content/services.md'],
  ['/services/', '/agent-content/services.md'],
]);

const DISCOVERY_LINKS = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '</.well-known/ai-catalog.json>; rel="describedby"; type="application/json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
].join(', ');

const acceptsMarkdown = (request) =>
  request.headers.get('Accept')?.toLowerCase().includes('text/markdown') ?? false;

const withDiscoveryHeaders = (response) => {
  const headers = new Headers(response.headers);
  const vary = headers.get('Vary');
  const varyValues = vary?.split(',').map((value) => value.trim().toLowerCase()) ?? [];

  if (!varyValues.includes('accept')) headers.set('Vary', vary ? `${vary}, Accept` : 'Accept');
  headers.set('Link', DISCOVERY_LINKS);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const markdownAsset = MARKDOWN_ROUTES.get(url.pathname);

  if (
    markdownAsset &&
    ['GET', 'HEAD'].includes(context.request.method) &&
    acceptsMarkdown(context.request)
  ) {
    const assetUrl = new URL(markdownAsset, url.origin);
    const assetResponse = await context.env.ASSETS.fetch(assetUrl);

    if (assetResponse.ok) {
      const markdown = context.request.method === 'HEAD' ? null : await assetResponse.text();
      const headers = new Headers(assetResponse.headers);
      const tokenEstimate = markdown ? Math.ceil(markdown.length / 4) : 0;

      headers.set('Content-Type', 'text/markdown; charset=utf-8');
      headers.set('Content-Location', url.pathname);
      headers.set('Vary', 'Accept');
      headers.set('Link', DISCOVERY_LINKS);
      if (tokenEstimate > 0) headers.set('x-markdown-tokens', String(tokenEstimate));

      return new Response(markdown, { status: 200, headers });
    }
  }

  const response = await context.next();
  return response.headers.get('Content-Type')?.includes('text/html')
    ? withDiscoveryHeaders(response)
    : response;
}
