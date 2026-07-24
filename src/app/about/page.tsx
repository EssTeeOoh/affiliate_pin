import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPageBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn how ${siteConfig.name} curates product recommendations.`
};

export default async function AboutPage() {
  const page = await getPageBySlug("about");

  if (!page) {
    return null;
  }

  const { content } = await compileMDX({
    source: page.body
  });

  return <section className="card prose-shell prose-shell-wide">{content}</section>;
}
