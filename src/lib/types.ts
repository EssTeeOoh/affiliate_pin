export type ContentCollection = "categories" | "products" | "pages" | "articles";

export type MdxDocument<TFrontmatter extends Record<string, unknown>> = {
  slug: string;
  frontmatter: TFrontmatter;
  body: string;
};

export type CategoryFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  seoTitle?: string;
  seoDescription?: string;
  order?: number;
  featured?: boolean;
};

export type ProductFrontmatter = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  brand?: string;
  image?: string;
  bestFor?: string;
  rating?: number;
  featured?: boolean;
  order?: number;
  affiliateUrl: string;
  videoUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  searchTerms?: string[];
  pros?: string[];
  cons?: string[];
};

export type PageFrontmatter = {
  title: string;
  slug: string;
  summary?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type ArticleFrontmatter = {
  title: string;
  slug: string;
  intro: string;
  summary: string;
  coverImage?: string;
  featured?: boolean;
  order?: number;
  primaryCategory?: string;
  secondaryCategories?: string[];
  category?: string;
  productSlugs?: string[];
  seoTitle?: string;
  seoDescription?: string;
};
