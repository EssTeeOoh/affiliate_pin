import Image from "next/image";
import Link from "next/link";
import { getArticleCategoryLabels } from "@/lib/content";
import type { ArticleFrontmatter } from "@/lib/types";

export function ArticleCard({
  slug,
  frontmatter
}: {
  slug: string;
  frontmatter: ArticleFrontmatter;
}) {
  const { primaryCategory, secondaryCategories } = getArticleCategoryLabels(frontmatter);

  return (
    <article className="card article-card">
      <div className="card-kicker">
        <span>{primaryCategory}</span>
        {frontmatter.featured ? <span>Featured</span> : null}
      </div>
      {frontmatter.coverImage ? (
        <div className="article-card-image">
          <Image
            src={frontmatter.coverImage}
            alt=""
            fill
            className="article-card-image-element"
            sizes="(max-width: 860px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div className="card-accent-bar" aria-hidden="true" />
      )}
      <h3>{frontmatter.title}</h3>
      <p>{frontmatter.summary}</p>
      {secondaryCategories.length > 0 ? (
        <div className="hero-chips article-chip-row" aria-label="Secondary categories">
          {secondaryCategories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      ) : null}
      <div className="card-meta">
        <span>{frontmatter.productSlugs?.length ?? 0} product picks</span>
      </div>
      <div className="card-actions">
        <Link href={`/articles/${slug}`} className="button button-secondary">
          Open guide
        </Link>
      </div>
    </article>
  );
}
