import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ProductCard } from "@/components/product-card";
import { MdxContent } from "@/components/mdx-content";
import { SectionHeading } from "@/components/section-heading";
import { getArticleBySlug, getArticleCategoryLabels, getArticleSlugs, getProducts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.frontmatter.seoTitle ?? article.frontmatter.title,
    description: article.frontmatter.seoDescription ?? article.frontmatter.summary,
    alternates: {
      canonical: `/articles/${slug}`
    }
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const [products, { content }] = await Promise.all([
    getProducts(),
    compileMDX({
      source: article.body
    })
  ]);

  const featuredProducts = (article.frontmatter.productSlugs ?? [])
    .map((productSlug) => products.find((product) => product.slug === productSlug))
    .filter(Boolean);
  const { primaryCategory, secondaryCategories } = getArticleCategoryLabels(article.frontmatter);

  return (
    <div className="page-stack">
      <section className="hero card article-hero">
        <div className="hero-copy-block">
          <p className="eyebrow">Guide</p>
          <h1>{article.frontmatter.title}</h1>
          <p className="hero-copy">{article.frontmatter.intro}</p>
          {article.frontmatter.coverImage ? (
            <div className="article-hero-media">
              <Image
                src={article.frontmatter.coverImage}
                alt=""
                width={180}
                height={101}
                priority
                sizes="180px"
                quality={95}
                className="article-hero-image"
              />
            </div>
          ) : null}
          <div className="hero-meta">
            <span>{primaryCategory}</span>
            {secondaryCategories.map((category) => (
              <span key={category}>{category}</span>
            ))}
            <span>{featuredProducts.length} product picks</span>
          </div>
        </div>
      </section>

      <section className="card article-body-shell">
        <MdxContent wide>{content}</MdxContent>
      </section>

      {featuredProducts.length > 0 ? (
        <section className="section-stack">
          <SectionHeading
            eyebrow="Product picks"
            title="Products in this guide"
            description="Each pick links to the corresponding product review."
          />
          <div className="grid grid-2">
            {featuredProducts.map((product) =>
              product ? (
                <ProductCard
                  key={product.slug}
                  slug={product.slug}
                  frontmatter={product.frontmatter}
                />
              ) : null
            )}
          </div>
        </section>
      ) : null}

      <section className="card callout">
        <p className="eyebrow">Disclosure</p>
        <p>{siteConfig.affiliateDisclosure}</p>
      </section>
    </div>
  );
}
