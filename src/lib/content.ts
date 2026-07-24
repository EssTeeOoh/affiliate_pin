import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import type {
  ArticleFrontmatter,
  CategoryFrontmatter,
  ContentCollection,
  MdxDocument,
  PageFrontmatter,
  ProductFrontmatter
} from "./types";

const contentRoot = path.join(process.cwd(), "content");

function collectionDir(collection: ContentCollection) {
  return path.join(contentRoot, collection);
}

async function readCollection<TFrontmatter extends Record<string, unknown>>(
  collection: ContentCollection
): Promise<Array<MdxDocument<TFrontmatter>>> {
  const dir = collectionDir(collection);
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"));

  const documents = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file.name);
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = matter(raw);
      const slug = (parsed.data.slug as string | undefined) ?? file.name.replace(/\.mdx$/, "");
      return {
        slug,
        frontmatter: parsed.data as TFrontmatter,
        body: parsed.content
      };
    })
  );

  return documents;
}

function normalizeArticleFrontmatter(frontmatter: ArticleFrontmatter): ArticleFrontmatter {
  const primaryCategory = frontmatter.primaryCategory ?? frontmatter.category ?? "Article";

  return {
    ...frontmatter,
    primaryCategory,
    secondaryCategories: (frontmatter.secondaryCategories ?? []).slice(0, 2)
  };
}

export const getCategories = cache(async () => {
  const categories = await readCollection<CategoryFrontmatter>("categories");
  return categories.sort((a, b) => {
    const orderA = a.frontmatter.order ?? 999;
    const orderB = b.frontmatter.order ?? 999;
    return orderA - orderB || a.frontmatter.title.localeCompare(b.frontmatter.title);
  });
});

export const getProducts = cache(async () => {
  const products = await readCollection<ProductFrontmatter>("products");
  return products.sort((a, b) => {
    const orderA = a.frontmatter.order ?? 999;
    const orderB = b.frontmatter.order ?? 999;
    return orderA - orderB || a.frontmatter.title.localeCompare(b.frontmatter.title);
  });
});

export const getPages = cache(async () => readCollection<PageFrontmatter>("pages"));
export const getArticles = cache(async () => {
  const articles = await readCollection<ArticleFrontmatter>("articles");
  return articles
    .map((article) => ({
      ...article,
      frontmatter: normalizeArticleFrontmatter(article.frontmatter)
    }))
    .sort((a, b) => {
      const orderA = a.frontmatter.order ?? 999;
      const orderB = b.frontmatter.order ?? 999;
      return orderA - orderB || a.frontmatter.title.localeCompare(b.frontmatter.title);
    });
});

export const getCategorySlugs = cache(async () => (await getCategories()).map((doc) => doc.slug));
export const getProductSlugs = cache(async () => (await getProducts()).map((doc) => doc.slug));
export const getPageSlugs = cache(async () => (await getPages()).map((doc) => doc.slug));
export const getArticleSlugs = cache(async () => (await getArticles()).map((doc) => doc.slug));

export const getCategoryBySlug = cache(async (slug: string) =>
  (await getCategories()).find((doc) => doc.slug === slug)
);

export const getProductBySlug = cache(async (slug: string) =>
  (await getProducts()).find((doc) => doc.slug === slug)
);

export const getPageBySlug = cache(async (slug: string) =>
  (await getPages()).find((doc) => doc.slug === slug)
);

export const getArticleBySlug = cache(async (slug: string) =>
  (await getArticles()).find((doc) => doc.slug === slug)
);

export const getFeaturedCategories = cache(async () =>
  (await getCategories()).filter((doc) => doc.frontmatter.featured)
);

export const getFeaturedProducts = cache(async () =>
  (await getProducts()).filter((doc) => doc.frontmatter.featured)
);

export const getFeaturedArticles = cache(async () =>
  (await getArticles()).filter((doc) => doc.frontmatter.featured)
);

export function getArticleCategoryLabels(frontmatter: ArticleFrontmatter) {
  const primaryCategory = frontmatter.primaryCategory ?? frontmatter.category ?? "Article";
  const secondaryCategories = (frontmatter.secondaryCategories ?? []).slice(0, 2);

  return {
    primaryCategory,
    secondaryCategories
  };
}

export const getProductsByCategory = cache(async (categorySlug: string) =>
  (await getProducts()).filter((doc) => doc.frontmatter.category === categorySlug)
);

function matchesQuery(value: string | undefined, query: string) {
  return value ? value.toLowerCase().includes(query) : false;
}

export const searchCatalog = cache(async (rawQuery: string) => {
  const query = rawQuery.trim().toLowerCase();
  const [categories, products, articles] = await Promise.all([
    getCategories(),
    getProducts(),
    getArticles()
  ]);

  if (!query) {
    return {
      categories,
      products,
      articles
    };
  }

  return {
    categories: categories.filter(
      (doc) =>
        matchesQuery(doc.frontmatter.title, query) || matchesQuery(doc.frontmatter.summary, query)
    ),
    products: products.filter(
      (doc) =>
        matchesQuery(doc.frontmatter.title, query) ||
        matchesQuery(doc.frontmatter.summary, query) ||
        matchesQuery(doc.frontmatter.bestFor, query) ||
        matchesQuery(doc.frontmatter.category.replace(/-/g, " "), query)
    ),
    articles: articles.filter(
      (doc) =>
        matchesQuery(doc.frontmatter.title, query) ||
        matchesQuery(doc.frontmatter.summary, query) ||
        matchesQuery(doc.frontmatter.intro, query) ||
        matchesQuery(doc.frontmatter.primaryCategory, query) ||
        matchesQuery(doc.frontmatter.category, query) ||
        doc.frontmatter.secondaryCategories?.some((secondaryCategory) =>
          matchesQuery(secondaryCategory, query)
        ) === true
    )
  };
});
