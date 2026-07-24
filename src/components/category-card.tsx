import Link from "next/link";
import type { CategoryFrontmatter } from "@/lib/types";

export function CategoryCard({
  slug,
  frontmatter
}: {
  slug: string;
  frontmatter: CategoryFrontmatter;
}) {
  return (
    <article className="card category-card">
      <div className="card-kicker">
        <span>Category</span>
        {frontmatter.featured ? <span>Featured</span> : null}
      </div>
      <div className="card-accent-bar" aria-hidden="true" />
      <h3>{frontmatter.title}</h3>
      <p>{frontmatter.summary}</p>
      <div className="card-actions">
        <Link href={`/categories/${slug}`} className="button button-secondary">
          Open category
        </Link>
      </div>
    </article>
  );
}
