import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPageBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using ${siteConfig.name}.`
};

export default async function TermsOfUsePage() {
  const page = await getPageBySlug("terms-of-use");

  if (!page) {
    return null;
  }

  const { content } = await compileMDX({
    source: page.body
  });

  return <section className="card prose-shell prose-shell-wide">{content}</section>;
}
