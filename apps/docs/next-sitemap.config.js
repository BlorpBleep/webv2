/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://cicadavpn.com",  // Replace with your actual domain
  generateRobotsTxt: true,  // Generates a robots.txt file
  exclude: ["/admin/*", "/private/*"],  // Add any routes you want to exclude from the sitemap
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin", "/private"] },
    ],
  },
};
