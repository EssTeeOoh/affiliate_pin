import { ProductCard } from "@/components/product-card";
import { Pagination } from "@/components/pagination";
import { SectionHeading } from "@/components/section-heading";
import type { MdxDocument, ProductFrontmatter } from "@/lib/types";

export function CategoryProductsSection({
  categoryTitle,
  products,
  page,
  totalPages,
  basePath
}: {
  categoryTitle: string;
  products: Array<MdxDocument<ProductFrontmatter>>;
  page: number;
  totalPages: number;
  basePath: string;
}) {
  return (
    <section className="section-stack">
      <SectionHeading
        eyebrow="Recommended products"
        title={`Products in ${categoryTitle}`}
        description="Current recommendations and product reviews."
      />
      <div className="category-page-meta">
        <span>
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <span>{products.length} item{products.length === 1 ? "" : "s"} on this page</span>
      </div>
      <div className="grid grid-2">
        {products.map((product) => (
          <ProductCard key={product.slug} slug={product.slug} frontmatter={product.frontmatter} />
        ))}
      </div>
      <Pagination basePath={basePath} currentPage={page} totalPages={totalPages} />
    </section>
  );
}
