import type { Metadata } from "next";
import { CategoryCard } from "@/components/category-card";
import { SectionHeading } from "@/components/section-heading";
import { getCategories } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Categories",
  description: `Browse focused product categories at ${siteConfig.name}.`
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="page-stack">
      <section className="hero card">
        <p className="eyebrow">All categories</p>
        <h1>Category pages organized by setup type.</h1>
        <p className="hero-copy">
          Explore the current collection of topic-based pages and the products grouped within each
          one.
        </p>
        <div className="hero-chips">
          <span>Gaming</span>
          <span>Desk setup</span>
          <span>Cable management</span>
        </div>
      </section>

      <section className="section-stack">
        <SectionHeading
          eyebrow="Catalog"
          title="Curated categories"
          description="Open the category pages that match each product family."
        />
        <div className="grid grid-2">
          {categories.map((category) => (
            <CategoryCard key={category.slug} slug={category.slug} frontmatter={category.frontmatter} />
          ))}
        </div>
      </section>
    </div>
  );
}
