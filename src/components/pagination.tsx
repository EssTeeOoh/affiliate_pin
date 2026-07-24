import Link from "next/link";

function pageHref(basePath: string, page: number) {
  return page === 1 ? basePath : `${basePath}/page/${page}`;
}

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  return Array.from(pages)
    .filter((page) => page > 0 && page <= totalPages)
    .sort((a, b) => a - b);
}

export function Pagination({
  basePath,
  currentPage,
  totalPages,
  label = "Pagination"
}: {
  basePath: string;
  currentPage: number;
  totalPages: number;
  label?: string;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label={label}>
      <Link
        href={pageHref(basePath, Math.max(1, currentPage - 1))}
        className={`pagination-link${currentPage === 1 ? " is-disabled" : ""}`}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
      >
        Previous
      </Link>

      <div className="pagination-pages" aria-label="Page numbers">
        {visiblePages.map((page, index) => {
          const prev = visiblePages[index - 1];
          const showGap = typeof prev === "number" && page - prev > 1;

          return (
            <span key={page} className="pagination-group">
              {showGap ? <span className="pagination-ellipsis">…</span> : null}
              <Link
                href={pageHref(basePath, page)}
                className={`pagination-link${page === currentPage ? " is-current" : ""}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </Link>
            </span>
          );
        })}
      </div>

      <Link
        href={pageHref(basePath, Math.min(totalPages, currentPage + 1))}
        className={`pagination-link${currentPage === totalPages ? " is-disabled" : ""}`}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : undefined}
      >
        Next
      </Link>
    </nav>
  );
}

