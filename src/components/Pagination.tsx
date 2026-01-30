import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  function href(page: number) {
    return page === 1 ? basePath : `${basePath}?page=${page}`;
  }

  return (
    <nav className="flex items-center justify-center gap-2 py-12" aria-label="Pagination">
      {currentPage > 1 && (
        <Link
          href={href(currentPage - 1)}
          className="font-mono text-xs uppercase tracking-wider px-4 py-2 transition-all duration-300 hover:text-[#b8860b]"
          style={{ color: "#a1a1aa", border: "1px solid #2a2a2a" }}
        >
          ← Prev
        </Link>
      )}

      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`dots-${i}`}
            className="font-mono text-xs px-2"
            style={{ color: "#52525b" }}
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={href(page)}
            className="font-mono text-xs px-3 py-2 transition-all duration-300"
            style={{
              color: page === currentPage ? "#0a0a0a" : "#a1a1aa",
              backgroundColor: page === currentPage ? "#b8860b" : "transparent",
              border: `1px solid ${page === currentPage ? "#b8860b" : "#2a2a2a"}`,
            }}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={href(currentPage + 1)}
          className="font-mono text-xs uppercase tracking-wider px-4 py-2 transition-all duration-300 hover:text-[#b8860b]"
          style={{ color: "#a1a1aa", border: "1px solid #2a2a2a" }}
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
