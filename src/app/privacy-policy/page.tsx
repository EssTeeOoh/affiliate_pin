import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPageBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles privacy and visitor data.`
};

export default async function PrivacyPolicyPage() {
  const page = await getPageBySlug("privacy-policy");

  if (!page) {
    return null;
  }

  const { content } = await compileMDX({
    source: page.body
  });

  return <section className="card prose-shell prose-shell-wide">{content}</section>;
}
