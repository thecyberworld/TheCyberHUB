import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

async function generateSitemap() {
    const smStream = new SitemapStream({ hostname: "https://www.thecyberhub.org" });
    const writeStream = createWriteStream("./sitemap.xml");

    smStream.pipe(writeStream);

    // Manually added static routes
    const routes = [
        { url: "/", changefreq: "daily", priority: 1.0 },
        { url: "/about", changefreq: "weekly", priority: 0.8 },
        { url: "/community", changefreq: "weekly", priority: 0.7 },
        { url: "/interviewQuestions", changefreq: "weekly", priority: 0.7 },
        { url: "/jobs", changefreq: "weekly", priority: 0.7 },
        { url: "/login", changefreq: "weekly", priority: 0.5 },
        { url: "/quiz", changefreq: "weekly", priority: 0.7 },
        { url: "/support", changefreq: "weekly", priority: 0.7 },
        { url: "/aichat", changefreq: "weekly", priority: 0.7 },
        { url: "/contact", changefreq: "weekly", priority: 0.7 },
        { url: "/volunteer", changefreq: "weekly", priority: 0.7 },
        { url: "/opensec-projects", changefreq: "weekly", priority: 0.7 },
        { url: "/community-events", changefreq: "weekly", priority: 0.7 },
        { url: "/leaderboard", changefreq: "weekly", priority: 0.7 },
        { url: "/newleaderboard", changefreq: "weekly", priority: 0.7 },
        { url: "/resources/methodology", changefreq: "weekly", priority: 0.7 },
        { url: "/resources/checklist", changefreq: "weekly", priority: 0.7 },
        { url: "/resources/payloads", changefreq: "weekly", priority: 0.7 },
        { url: "/terms-conditions", changefreq: "weekly", priority: 0.5 },
        { url: "/privacy-policy", changefreq: "weekly", priority: 0.5 },
        // Add more static routes as needed
    ];

    // Manually added dynamic routes
    const dynamicRoutes = [
        { url: "/explore/*", changefreq: "weekly", priority: 0.7 },
        { url: "/feeds/*", changefreq: "weekly", priority: 0.7 },
        { url: "/blogs/*", changefreq: "weekly", priority: 0.7 },
        { url: "/forum/*", changefreq: "weekly", priority: 0.7 },
        { url: "/ctf/*", changefreq: "weekly", priority: 0.7 },
        { url: "/websecurity/*", changefreq: "weekly", priority: 0.7 },
        { url: "/roadmaps/*", changefreq: "weekly", priority: 0.7 },
        { url: "/tools/*", changefreq: "weekly", priority: 0.7 },
        { url: "/courses/*", changefreq: "weekly", priority: 0.7 },
        { url: "/settings/*", changefreq: "weekly", priority: 0.7 },
        { url: "/dashboard/*", changefreq: "weekly", priority: 0.7 },
        { url: "/admin-dashboard/*", changefreq: "weekly", priority: 0.7 },
        { url: "/security/*", changefreq: "weekly", priority: 0.7 },
        { url: "/quiz/:type", changefreq: "weekly", priority: 0.7 },
        { url: "/community-events/:eventId", changefreq: "weekly", priority: 0.7 },
        { url: "/user/:username", changefreq: "weekly", priority: 0.7 },
        { url: "/connections", changefreq: "weekly", priority: 0.7 },
        { url: "/user/edit/:username", changefreq: "weekly", priority: 0.7 },
        // Add routes from BlogsRoute
        { url: "/blogs", changefreq: "weekly", priority: 0.7 },
        { url: "/blogs/:title", changefreq: "weekly", priority: 0.7 },
        { url: "/blogs/create-blog", changefreq: "weekly", priority: 0.7 },
        { url: "/blogs/my-blogs", changefreq: "weekly", priority: 0.7 },
        { url: "/blogs/create", changefreq: "weekly", priority: 0.7 },
        { url: "/blogs/my-blogs/edit/:blogTitle", changefreq: "weekly", priority: 0.7 },
    ];

    // Add all routes to the sitemap stream
    routes.forEach((route) => smStream.write(route));
    dynamicRoutes.forEach((route) => smStream.write(route));

    // End the stream
    smStream.end();

    // Wait for the sitemap to be fully written
    await streamToPromise(smStream);
    console.log("Sitemap created successfully.");
}

generateSitemap().catch(console.error);
