import type { ReactNode } from "react";

export function MdxContent({
  children,
  wide = false
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return <div className={wide ? "prose-shell prose-shell-wide" : "prose-shell"}>{children}</div>;
}
