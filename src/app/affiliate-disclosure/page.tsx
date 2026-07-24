import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPageBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `How affiliate links work on ${siteConfig.name}.`
};

export default async function DisclosurePage() {
  const page = await getPageBySlug("affiliate-disclosure");

  if (!page) {
    return null;
  }

  const { content } = await compileMDX({
    source: page.body
  });

  return <section className="card prose-shell prose-shell-wide">{content}</section>;
}
