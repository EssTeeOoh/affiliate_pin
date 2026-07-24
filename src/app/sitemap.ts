import type { MetadataRoute } from "next";
import {
  getArticles,
  getCategories,
  getPages,
  getProducts,
  getProductsByCategory
} from "@/lib/content";
import { DEFAULT_PAGE_SIZE, getTotalPages } from "@/lib/pagination";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products, pages] = await Promise.all([
    getCategories(),
    getProducts(),
    getPages()
  ]);
  const articles = await getArticles();

  const root = siteConfig.url.replace(/\/$/, "");

  return [
    {
      url: root,
      lastModified: new Date()
    },
    {
      url: `${root}/articles`,
      lastModified: new Date()
    },
    ...articles.map((article) => ({
      url: `${root}/articles/${article.slug}`,
      lastModified: new Date()
    })),
    {
      url: `${root}/search`,
      lastModified: new Date()
    },
    {
      url: `${root}/categories`,
      lastModified: new Date()
    },
    ...categories.map((category) => ({
      url: `${root}/categories/${category.slug}`,
      lastModified: new Date()
    })),
    ...(await Promise.all(
      categories.map(async (category) => {
        const categoryProducts = await getProductsByCategory(category.slug);
        const totalPages = getTotalPages(categoryProducts.length, DEFAULT_PAGE_SIZE);
        return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
          url: `${root}/categories/${category.slug}/page/${index + 2}`,
          lastModified: new Date()
        }));
      })
    )).flat(),
    ...products.map((product) => ({
      url: `${root}/products/${product.slug}`,
      lastModified: new Date()
    })),
    ...pages.map((page) => ({
      url: `${root}/${page.slug}`,
      lastModified: new Date()
    }))
  ];
}
