import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-shell site-header">
      <div className="site-header-top">
        <Link href="/" className="brand-mark" aria-label={siteConfig.name}>
          <Image
            src="/images/setup-signal-logo.jpeg"
            alt=""
            width={28}
            height={28}
            className="brand-logo"
            priority
          />
          <span>{siteConfig.name}</span>
        </Link>
        <div className="site-header-tools">
          <form className="site-search" action="/search" method="get" role="search">
            <span className="site-search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <label className="sr-only" htmlFor="site-search">
              Search products and categories
            </label>
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="Search products, categories..."
            />
          </form>
          <ThemeToggle />
        </div>
      </div>
      <nav className="site-nav site-header-nav" aria-label="Primary">
        {siteConfig.navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="nav-link">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
