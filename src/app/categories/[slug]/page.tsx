import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryProductsSection } from "@/components/category-products-section";
import {
  getCategoryBySlug,
  getCategorySlugs,
  getProductsByCategory
} from "@/lib/content";
import { paginate } from "@/lib/pagination";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return {
    title: category.frontmatter.seoTitle ?? category.frontmatter.title,
    description: category.frontmatter.seoDescription ?? category.frontmatter.summary,
    alternates: {
      canonical: `/categories/${slug}`
    }
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);
  const pagination = paginate(products, 1);

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
