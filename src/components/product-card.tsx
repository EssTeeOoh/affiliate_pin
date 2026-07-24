import Link from "next/link";
import type { ProductFrontmatter } from "@/lib/types";

export function ProductCard({
  slug,
  frontmatter
}: {
  slug: string;
  frontmatter: ProductFrontmatter;
}) {
  return (
    <article className="card product-card">
      <div className="card-kicker">
        <span>{frontmatter.category.replace(/-/g, " ")}</span>
        {frontmatter.rating ? <span>{frontmatter.rating.toFixed(1)} / 5</span> : null}
      </div>
      <div className="card-accent-bar" aria-hidden="true" />
      <h3>{frontmatter.title}</h3>
      <p>{frontmatter.summary}</p>
      <div className="card-meta">
        {frontmatter.bestFor ? <span>Best suited for {frontmatter.bestFor}</span> : null}
      </div>
      <div className="card-actions">
        <Link href={`/products/${slug}`} className="button button-secondary">
          View review
        </Link>
        <a
          href={frontmatter.affiliateUrl}
          target="_blank"
          rel="noreferrer"
          className="button"
        >
          Buy now
        </a>
      </div>
    </article>
  );
}
