import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-shell site-footer">
      <div className="footer-brand-block">
        <p className="footer-brand">{siteConfig.name}</p>
        <p className="footer-copy">
          Practical recommendations for desks, gaming setups, and everyday gear choices.
        </p>
      </div>

      <nav className="footer-links-group" aria-label="Footer">
        <p className="footer-links-title">Links</p>
        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/affiliate-disclosure">Affiliate disclosure</Link>
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/terms-of-use">Terms of use</Link>
        </div>
      </nav>

      <div className="footer-bottom">
        <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
        <a href={siteConfig.portfolioUrl} target="_blank" rel="noreferrer">
          Portfolio
        </a>
      </div>
    </footer>
  );
}
