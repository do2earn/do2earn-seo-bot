export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const basePath = "/do2earn-seo-bot";

    if (url.pathname === basePath) {
      url.pathname = basePath + "/";
      return Response.redirect(url.toString(), 301);
    }

    if (!url.pathname.startsWith(basePath + "/")) {
      return new Response("Not Found", { status: 404 });
    }

    url.pathname = url.pathname.slice(basePath.length) || "/";
    if (url.pathname === "/") url.pathname = "/index.html";

    return env.ASSETS.fetch(new Request(url.toString(), request));
  }
};
