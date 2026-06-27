export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const accept = request.headers.get("accept") || "";

    // Markdown negotiation option: return markdown when explicitly requested.
    if (url.pathname === "/" && accept.includes("text/markdown")) {
      const md = await env.ASSETS.fetch(new Request(new URL("/index.md", url), request));
      const out = new Response(await md.text(), {
        status: 200,
        headers: {
          "content-type": "text/markdown; charset=utf-8",
          "vary": "Accept"
        }
      });
      addDiscoveryLinks(out.headers);
      return out;
    }

    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    addDiscoveryLinks(out.headers);
    return out;
  }
};

function addDiscoveryLinks(headers) {
  headers.append("Link", "</.well-known/api-catalog>; rel=\"api-catalog\"");
  headers.append("Link", "</docs/api/>; rel=\"service-doc\"");
  headers.append("Link", "</.well-known/oauth-authorization-server>; rel=\"oauth-authorization-server\"");
  headers.append("Link", "</.well-known/oauth-protected-resource>; rel=\"oauth-protected-resource\"");
  headers.append("Link", "</.well-known/mcp/server-card.json>; rel=\"mcp-server-card\"");
  headers.append("Link", "</.well-known/agent-skills/index.json>; rel=\"agent-skills\"");
}
