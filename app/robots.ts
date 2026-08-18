import type { MetadataRoute } from "next";

const BASE_URL = "https://www.distilnation.nz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account", "/login/", "/signup/", "/forgot-password/", "/reset-password/", "/auth/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
