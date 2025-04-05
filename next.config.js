const nextConfig = {
  i18n: {
    locales: ["en", "es"], // Supported locales
    defaultLocale: "es", // Default locale
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
      },
      {
        protocol: "https",
        hostname: "tierragirasol.vercel.app",
      },
      {
        protocol: "https",
        hostname: "cdn.b12.io",
      },
    ], // Add all allowed domains
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};

module.exports = nextConfig;
