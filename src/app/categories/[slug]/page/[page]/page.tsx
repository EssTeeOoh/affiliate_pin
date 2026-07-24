import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryProductsSection } from "@/components/category-products-section";
import {
  getCategoryBySlug,
  getCategorySlugs,
  getProductsByCategory
} from "@/lib/content";
import { paginate, DEFAULT_PAGE_SIZE, getTotalPages } from "@/lib/pagination";

type Props = {
  params: Promise<{ slug: string; page: string }>;
};

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  const params: Array<{ slug: string; page: string }> = [];

  for (const slug of slugs) {
    const products = await getProductsByCategory(slug);
    const totalPages = getTotalPages(products.length, DEFAULT_PAGE_SIZE);

    for (let page = 2; page <= totalPages; page += 1) {
      params.push({ slug, page: String(page) });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, page } = await params;
  const category = await getCategoryBySlug(slug);
  const pageNumber = Number.parseInt(page, 10);

  if (!category || Number.isNaN(pageNumber) || pageNumber < 2) {
    return {};
  }

  return {
    title: `${category.frontmatter.title} - Page ${pageNumber}`,
    description: category.frontmatter.seoDescription ?? category.frontmatter.summary,
    alternates: {
      canonical: `/categories/${slug}/page/${pageNumber}`
    }
  };
}

export default async function CategoryPagedPage({ params }: Props) {
  const { slug, page } = await params;
  const category = await getCategoryBySlug(slug);
  const pageNumber = Number.parseInt(page, 10);

  if (!category || Number.isNaN(pageNumber) || pageNumber < 2) {
    notFound();
  }

  const products = await getProductsByCategory(slug);
  const pagination = paginate(products, pageNumber);

  if (pagination.currentPage !== pageNumber) {
    notFound();
  }

  return (
    <div className="page-stack">
      <section className="hero card">
        <p className="eyebrow">Category</p>
        <h1>{category.frontmatter.title}</h1>
        <p className="hero-copy">{category.frontmatter.summary}</p>
      </section>

      <CategoryProductsSection
        categoryTitle={category.frontmatter.title}
        products={pagination.items}
        page={pagination.currentPage}
        totalPages={pagination.totalPages}
        basePath={`/categories/${slug}`}
      />
    </div>
  );
}

