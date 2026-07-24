"use client";

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

type SpotlightItem = {
  title: string;
  label: string;
  summary: string;
  href: string;
  stat: string;
  accent: string;
  accentSoft: string;
  accentStrong: string;
};

export type { SpotlightItem };

export function FeaturedSpotlight({ items }: { items: SpotlightItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = useMemo(() => items[activeIndex] ?? items[0], [activeIndex, items]);

  if (!activeItem) {
    return null;
  }

  return (
    <aside
      className="spotlight"
      style={
        {
          "--spotlight-accent": activeItem.accent,
          "--spotlight-accent-soft": activeItem.accentSoft,
          "--spotlight-accent-strong": activeItem.accentStrong
        } as CSSProperties
      }
    >
      <div className="spotlight-tabs" role="tablist" aria-label="Featured items">
        {items.map((item, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={item.href}
              type="button"
              className={`spotlight-tab${active ? " is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-pressed={active}
            >
              <span className="spotlight-dot" aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="spotlight-panel">
        <div className="spotlight-visual spotlight-visual-media" aria-hidden="true">
          <Image
            src="/images/hero-keyboard-rainbow.png"
            alt=""
            fill
            priority
            sizes="(max-width: 860px) 100vw, 48vw"
            className="spotlight-hero-image"
          />
        </div>

        <div className="spotlight-copy">
          <p className="eyebrow">Featured signal</p>
          <h2>{activeItem.title}</h2>
          <p>{activeItem.summary}</p>
          <div className="spotlight-actions">
            <Link href={activeItem.href} className="button">
              Explore now
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
