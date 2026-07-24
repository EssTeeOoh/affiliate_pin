import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { getArticles, getFeaturedArticles } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Articles",
  description: `Editorial roundup articles and buying guides at ${siteConfig.name}.`
};

export default async function ArticlesPage() {
  const [articles, featuredArticles] = await Promise.all([getArticles(), getFeaturedArticles()]);

  return (
    <div className="page-stack">
      <section className="hero card">
        <p className="eyebrow">Articles</p>
        <h1>Editorial buying guides and roundup articles.</h1>
        <p className="hero-copy">
          Browse focused guides that compare practical products, explain what each pick is good
          for, and connect readers to the matching review pages.
        </p>
      </section>

      {featuredArticles.length > 0 ? (
        <section className="section-stack">
        <SectionHeading
          eyebrow="Featured articles"
          title="Featured guides"
          description="Start with the most relevant roundup articles and product-led guides."
        />
          <div className="grid grid-2">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} slug={article.slug} frontmatter={article.frontmatter} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-stack">
        <SectionHeading
          eyebrow="All articles"
          title="Article library"
          description="All published guides currently available on Setup Signal."
        />
        <div className="grid grid-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} slug={article.slug} frontmatter={article.frontmatter} />
          ))}
        </div>
      </section>
    </div>
  );
}
