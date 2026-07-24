import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "gaming accessories",
    "desk setup",
    "tech gadgets",
    "Pinterest articles",
    "affiliate reviews",
    "work from home",
    "product guides"
  ],
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/images/setup-signal-logo.jpeg",
    shortcut: "/images/setup-signal-logo.jpeg",
    apple: "/images/setup-signal-logo.jpeg"
  },
  verification: {
    google: "-btt6z54K0_YyGQGYlnw_1AaQLExv0T11BA7gkP7yGs"
  },
  openGraph: {
    type: "website",
    title: siteConfig.name,
    description: siteConfig.description
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('setup-signal-theme');
                  if (theme !== 'dark') theme = 'light';
                  document.documentElement.dataset.theme = theme;
                } catch (error) {}
              })();
            `
          }}
        />
        <div className="page-background" />
        <SiteHeader />
        <main className="site-shell">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
