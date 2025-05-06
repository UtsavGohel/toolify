/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://toolify.torktoo.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  exclude: [], // e.g. ['/dashboard'] if needed
};
