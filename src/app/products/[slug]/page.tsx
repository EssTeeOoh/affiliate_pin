import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { AffiliateButton } from "@/components/affiliate-button";
import { MdxContent } from "@/components/mdx-content";
import { SectionHeading } from "@/components/section-heading";
import { getProductBySlug, getProductSlugs } from "@/lib/content";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.frontmatter.seoTitle ?? product.frontmatter.title,
    description: product.frontmatter.seoDescription ?? product.frontmatter.summary,
    alternates: {
      canonical: `/products/${slug}`
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { content } = await compileMDX({
    source: product.body
  });

  return (
    <div className="page-stack">
      <section className="hero hero-grid card product-hero">
        <div className="hero-copy-block">
          <p className="eyebrow">Product review</p>
          <h1>{product.frontmatter.title}</h1>
          <p className="hero-copy">{product.frontmatter.summary}</p>
          <div className="hero-meta product-hero-meta">
            {product.frontmatter.bestFor ? (
              <span>Best suited for {product.frontmatter.bestFor}</span>
            ) : null}
            {product.frontmatter.rating ? (
              <span>{product.frontmatter.rating.toFixed(1)} / 5 rating</span>
            ) : null}
          </div>
          <div className="hero-actions product-hero-actions">
            <AffiliateButton
              href={product.frontmatter.affiliateUrl}
              label="Buy on Amazon"
              size="compact"
            />
          </div>
        </div>

        <div className="product-hero-media">
          {product.frontmatter.image ? (
            <a href={product.frontmatter.affiliateUrl} target="_blank" rel="noreferrer">
              <Image
                src={product.frontmatter.image}
                alt={product.frontmatter.title}
                fill
                priority
                sizes="(max-width: 860px) 100vw, 360px"
                className="product-hero-image"
              />
            </a>
          ) : (
            <a
              href={product.frontmatter.affiliateUrl}
              target="_blank"
              rel="noreferrer"
              className="product-hero-fallback"
            >
              <span>{product.frontmatter.title}</span>
            </a>
          )}
        </div>
      </section>

      <section className="section-stack">
        <SectionHeading
          eyebrow="Quick take"
          title="Pros and cons"
        />
        <div className="grid grid-2">
          <article className="card">
            <h3>Pros</h3>
            <ul className="list">
              {(product.frontmatter.pros ?? []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Cons</h3>
            <ul className="list">
              {(product.frontmatter.cons ?? []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="card">
        <MdxContent>{content}</MdxContent>
      </section>

      <section className="card callout">
        <p className="eyebrow">Affiliate link</p>
        <p>{siteConfig.affiliateDisclosure}</p>
        <AffiliateButton
          href={product.frontmatter.affiliateUrl}
          label="Buy on Amazon"
          size="compact"
        />
      </section>
    </div>
  );
}
