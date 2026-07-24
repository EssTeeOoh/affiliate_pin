import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { CategoryCard } from "@/components/category-card";
import { FeaturedSpotlight } from "@/components/featured-spotlight";
import type { SpotlightItem } from "@/components/featured-spotlight";
import { HomePhotoGallery } from "@/components/home-photo-gallery";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedArticles, getFeaturedCategories, getFeaturedProducts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default async function HomePage() {
  const [featuredCategories, featuredProducts] = await Promise.all([
    getFeaturedCategories(),
    getFeaturedProducts()
  ]);
  const featuredArticles = await getFeaturedArticles();

  const spotlightItems: SpotlightItem[] = featuredProducts.slice(0, 4).map((product, index) => {
    return {
      title: product.frontmatter.title,
      label: ["Keyboard", "Mouse", "Surface", "Connectivity"][index] ?? "Featured product",
      summary: product.frontmatter.summary,
      href: `/products/${product.slug}`,
      stat: product.frontmatter.bestFor ?? "Curated pick",
      accent: "#165dff",
      accentSoft: "rgba(22, 93, 255, 0.12)",
      accentStrong: "#0f4ed8"
    };
  });

  return (
    <div className="page-stack">
      <section className="hero hero-grid card">
        <div className="hero-copy-block">
          <p className="eyebrow">Premium recommendation hub</p>
          <h1>Curated gear for desks, gaming, and everyday work.</h1>
          <p className="hero-copy">{siteConfig.description}</p>
          <div className="hero-chips" aria-label="Highlights">
            <span>Reviews</span>
            <span>Categories</span>
            <span>Guides</span>
          </div>
          <div className="hero-actions">
            <Link href="/categories" className="button">
              Explore categories
            </Link>
            <Link href="/affiliate-disclosure" className="button button-secondary">
              Affiliate disclosure
            </Link>
          </div>
        </div>

        <FeaturedSpotlight items={spotlightItems} />
      </section>

      <HomePhotoGallery />

      <section className="section-stack">
        <SectionHeading
          eyebrow="Featured categories"
          title="Core categories"
          description="Start with the categories that define the current collection."
        />
        <div className="grid grid-2">
          {featuredCategories.map((category) => (
            <CategoryCard key={category.slug} slug={category.slug} frontmatter={category.frontmatter} />
          ))}
        </div>
      </section>

      <section className="section-stack">
        <SectionHeading
          eyebrow="Featured products"
          title="Recommended products"
          description="Highlighted products from the current lineup."
        />
        <div className="grid grid-2">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} slug={product.slug} frontmatter={product.frontmatter} />
          ))}
        </div>
      </section>

      {featuredArticles.length > 0 ? (
        <section className="section-stack">
          <SectionHeading
            eyebrow="Featured guides"
            title="Featured articles"
            description="Selected guides that pair a topic with the most relevant product reviews."
          />
          <div className="grid grid-2">
            {featuredArticles.slice(0, 2).map((article) => (
              <ArticleCard key={article.slug} slug={article.slug} frontmatter={article.frontmatter} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="card trust-band">
        <div>
          <p className="eyebrow">Editorial approach</p>
          <h2>Useful recommendations, clearly presented.</h2>
        </div>
        <p>
          Setup Signal publishes category pages, product reviews, and affiliate disclosures in a
          clean, mobile-friendly format built for quick scanning and confident decisions.
        </p>
      </section>
    </div>
  );
}
