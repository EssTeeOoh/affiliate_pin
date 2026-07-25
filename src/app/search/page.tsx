import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { CategoryCard } from "@/components/category-card";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { searchCatalog } from "@/lib/content";
import { siteConfig } from "@/lib/site";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";

  return {
    title: query ? `Search results for "${query}"` : "Search",
    description: `Search categories, guides, product reviews, and brands at ${siteConfig.name}.`,
    alternates: {
      canonical: "/search"
    }
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const { categories, products, articles } = await searchCatalog(query);
  const hasQuery = query.length > 0;
  const totalResults = categories.length + products.length + articles.length;

  return (
    <div className="page-stack search-page">
      <section className="hero card">
        <p className="eyebrow">Search</p>
        <h1>Search the catalog with one query.</h1>
        <p className="hero-copy">
          Search across categories, guides, product reviews, and brand names from a single page.
        </p>
        <form className="search-form search-form-large" action="/search" method="get" role="search">
          <label className="sr-only" htmlFor="search-page-query">
            Search products, brands, and categories
          </label>
          <input
            id="search-page-query"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Try mechanical keyboard, Logitech, or USB-C hub"
          />
          <button type="submit" className="button">
            Search
          </button>
        </form>
        <div className="hero-chips" aria-label="Suggested searches">
          <span>Keyboard</span>
          <span>Desk setup</span>
          <span>Mouse</span>
          <span>Logitech</span>
          <span>USB-C hub</span>
        </div>
      </section>

      {hasQuery ? (
        <p className="search-status">
          Showing {totalResults} result{totalResults === 1 ? "" : "s"} for <strong>{query}</strong>.
        </p>
      ) : (
        <p className="search-status">Search to filter the full catalog.</p>
      )}

      <section className="section-stack">
        <SectionHeading
          eyebrow="Articles"
          title="Article matches"
          description="Open the guides that best match your query."
        />
        {articles.length > 0 ? (
          <div className="grid grid-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} slug={article.slug} frontmatter={article.frontmatter} />
            ))}
          </div>
        ) : (
          <div className="card search-empty">
            <h2>No article matches found.</h2>
            <p>Try a broader topic such as accessories, desk setup, or gaming.</p>
          </div>
        )}
      </section>

      <section className="section-stack">
        <SectionHeading
          eyebrow="Categories"
          title="Category matches"
          description="Open category pages that match your search."
        />
        {categories.length > 0 ? (
          <div className="grid grid-2">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                slug={category.slug}
                frontmatter={category.frontmatter}
              />
            ))}
          </div>
        ) : (
          <div className="card search-empty">
            <h2>No category matches found.</h2>
            <p>Try a broader search term like &quot;gaming&quot; or &quot;desk setup&quot;.</p>
          </div>
        )}
      </section>

      <section className="section-stack">
        <SectionHeading
          eyebrow="Products"
          title="Product matches"
          description="Open the products that match your search."
        />
        {products.length > 0 ? (
          <div className="grid grid-2">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                frontmatter={product.frontmatter}
              />
            ))}
          </div>
        ) : (
          <div className="card search-empty">
            <h2>No product matches found.</h2>
            <p>Try a product name, brand name, category, or use-case.</p>
          </div>
        )}
      </section>
    </div>
  );
}
