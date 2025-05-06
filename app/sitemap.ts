import { MetadataRoute } from "next";
import { tools } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://toolify.torktoo.com";

  const routes = [
    "",
    "/privacy",
    "/terms",
    ...tools.map((tool) => `/${tool.id}`),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
