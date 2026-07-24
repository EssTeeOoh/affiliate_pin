const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;

export const siteConfig = {
  name: "Setup Signal",
  description:
    "Curated recommendations for gaming, desk setup, PC accessories, mobile accessories, tech gadgets, and work-from-home essentials.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl,
  portfolioUrl: "https://teeooh.pythonanywhere.com",
  affiliateDisclosure:
    "As an Amazon Associate, we may earn from qualifying purchases.",
  navLinks: [
    { href: "/categories", label: "Categories" },
    { href: "/articles", label: "Articles" },
    { href: "/about", label: "About" },
    { href: "/affiliate-disclosure", label: "Disclosure" }
  ]
};

export const featuredCategorySlugs = [
  "gaming",
  "desk-setup",
  "pc-accessories",
  "mobile-accessories"
];
