import arcjet, { createMiddleware, detectBot, fixedWindow } from "@arcjet/next";
export const config = {
  // matcher tells Next.js which routes to run the middleware on.
  // This runs the middleware on all routes except for static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
        "CATEGORY:VERCEL",
        "CATEGORY:SOCIAL",
        "CATEGORY:ACADEMIC",
        "CATEGORY:MONITOR",
        "CATEGORY:META",
      ],
    }),
    fixedWindow({
        mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
        window: "60s", // 60 second fixed window
        max: 100, // allow a maximum of 100 requests
      }),
  ],
});
// Pass any existing middleware with the optional existingMiddleware prop
export default createMiddleware(aj);