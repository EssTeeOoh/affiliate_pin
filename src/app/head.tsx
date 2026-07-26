import { siteConfig } from "@/lib/site";

export default function Head() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: siteConfig.name,
              alternateName: siteConfig.tagline,
              description: siteConfig.description,
              url: siteConfig.url,
              logo: `${siteConfig.url}/favicon.ico`
            },
            {
              "@type": "WebSite",
              name: siteConfig.name,
              alternateName: siteConfig.tagline,
              description: siteConfig.description,
              url: siteConfig.url,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteConfig.url}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            }
          ]
        })
      }}
    />
  );
}
