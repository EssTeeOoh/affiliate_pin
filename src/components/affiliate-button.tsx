export function AffiliateButton({
  href,
  label = "Buy on Amazon",
  size = "default"
}: {
  href: string;
  label?: string;
  size?: "default" | "compact";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={size === "compact" ? "button button-compact" : "button"}
    >
      {label}
    </a>
  );
}
