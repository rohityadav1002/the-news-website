"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#0a0a0a", color: "#fafaf9" }}
    >
      <div className="text-center max-w-xl">
        <div
          className="w-16 h-16 flex items-center justify-center mx-auto mb-8"
          style={{ border: "1px solid #b8860b" }}
        >
          <span className="font-mono text-xl font-bold" style={{ color: "#b8860b" }}>
            OC
          </span>
        </div>

        <p
          className="font-mono text-xs uppercase tracking-[0.3em] mb-4"
          style={{ color: "#b8860b" }}
        >
          Error
        </p>

        <h1 className="font-display text-3xl lg:text-4xl mb-4">Something went wrong</h1>

        <p className="mb-8" style={{ color: "#a1a1aa" }}>
          We encountered an unexpected error loading this page. Please try again or return to the homepage.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => reset()}
            className="font-mono text-xs uppercase tracking-wider px-6 py-3 transition-all duration-300 cursor-pointer bg-[#b8860b] text-[#0a0a0a] hover:bg-[#d4a00a]"
            style={{ border: "none" }}
          >
            Try Again
          </button>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wider px-6 py-3 transition-all duration-300 hover:bg-[#b8860b] hover:text-[#0a0a0a]"
            style={{ border: "1px solid #b8860b", color: "#b8860b" }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
