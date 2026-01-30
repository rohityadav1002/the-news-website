import Link from "next/link";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact | The Order of Change",
  description:
    "Get in touch with The Order of Change. Tips, feedback, media inquiries, and editorial corrections.",
  openGraph: {
    title: "Contact | The Order of Change",
    description: "Get in touch with The Order of Change.",
    type: "website",
  },
};

export default async function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(184,134,11,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p
            className="font-mono text-xs uppercase tracking-[0.3em] mb-6"
            style={{ color: "#b8860b" }}
          >
            Contact
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mb-8">
            Get in Touch
          </h1>
          <p
            className="font-display text-xl italic max-w-2xl mx-auto"
            style={{ color: "#a1a1aa" }}
          >
            Tips, feedback, media inquiries, and editorial corrections.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, #2a2a2a, transparent)",
          }}
        />
      </div>

      {/* Contact Grid */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                label: "Tips & Story Leads",
                description:
                  "Have information on a developing geopolitical story? Our editorial team reviews all tips.",
                email: "tips@orderofchange.com",
              },
              {
                label: "Editorial Corrections",
                description:
                  "Accuracy matters. If you have found a factual error in our reporting, let us know.",
                email: "corrections@orderofchange.com",
              },
              {
                label: "Media & Press",
                description:
                  "For interview requests, syndication inquiries, and media partnerships.",
                email: "press@orderofchange.com",
              },
              {
                label: "General Inquiries",
                description:
                  "Feedback, questions, or anything else. We read every message.",
                email: "hello@orderofchange.com",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-6 lg:p-8"
                style={{
                  backgroundColor: "#0f0f0f",
                  border: "1px solid #1c1c1c",
                }}
              >
                <h3 className="font-display text-xl mb-3">{item.label}</h3>
                <p
                  className="mb-4 leading-relaxed"
                  style={{ color: "#a1a1aa" }}
                >
                  {item.description}
                </p>
                <p
                  className="font-mono text-sm"
                  style={{ color: "#b8860b" }}
                >
                  {item.email}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="flex items-center gap-4 mb-12">
            <span
              className="font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color: "#b8860b" }}
            >
              Send a Message
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(to right, #2a2a2a, transparent)",
              }}
            />
          </div>

          <div
            className="p-8 lg:p-12"
            style={{
              backgroundColor: "#0f0f0f",
              border: "1px solid #1c1c1c",
            }}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="font-mono text-xs uppercase tracking-wider block mb-2"
                    style={{ color: "#a1a1aa" }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 font-mono text-sm outline-none transition-all duration-300 focus:border-[#b8860b]"
                    style={{
                      backgroundColor: "#0a0a0a",
                      border: "1px solid #2a2a2a",
                      color: "#fafaf9",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="font-mono text-xs uppercase tracking-wider block mb-2"
                    style={{ color: "#a1a1aa" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 font-mono text-sm outline-none transition-all duration-300 focus:border-[#b8860b]"
                    style={{
                      backgroundColor: "#0a0a0a",
                      border: "1px solid #2a2a2a",
                      color: "#fafaf9",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="font-mono text-xs uppercase tracking-wider block mb-2"
                  style={{ color: "#a1a1aa" }}
                >
                  Subject
                </label>
                <select
                  className="w-full px-4 py-3 font-mono text-sm outline-none transition-all duration-300 focus:border-[#b8860b] appearance-none cursor-pointer"
                  style={{
                    backgroundColor: "#0a0a0a",
                    border: "1px solid #2a2a2a",
                    color: "#a1a1aa",
                  }}
                >
                  <option value="">Select a topic</option>
                  <option value="tip">Story Tip</option>
                  <option value="correction">Editorial Correction</option>
                  <option value="media">Media / Press</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  className="font-mono text-xs uppercase tracking-wider block mb-2"
                  style={{ color: "#a1a1aa" }}
                >
                  Message
                </label>
                <textarea
                  rows={6}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 font-mono text-sm outline-none transition-all duration-300 focus:border-[#b8860b] resize-vertical"
                  style={{
                    backgroundColor: "#0a0a0a",
                    border: "1px solid #2a2a2a",
                    color: "#fafaf9",
                  }}
                />
              </div>

              <button
                type="submit"
                className="font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 bg-[#b8860b] text-[#0a0a0a] hover:bg-[#d4a00a] cursor-pointer"
                style={{ border: "none" }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Editorial Policy */}
      <section
        className="py-20 px-6 lg:px-12"
        style={{ backgroundColor: "#0f0f0f" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span
              className="font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color: "#b8860b" }}
            >
              Editorial Policy
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(to right, #2a2a2a, transparent)",
              }}
            />
          </div>

          <div className="space-y-6" style={{ color: "#a1a1aa" }}>
            <p className="leading-relaxed">
              The Order of Change is committed to accuracy, fairness, and
              independence. Our columnists write under pen names to protect their
              access and safety, not to avoid accountability. Every factual claim
              is sourced from official records, verified reports, or
              first-hand observation.
            </p>
            <p className="leading-relaxed">
              We do not accept payments for coverage. We do not run sponsored
              content disguised as analysis. Advertising, when present, is
              clearly labeled. Our editorial decisions are not influenced by
              commercial relationships.
            </p>
            <p className="leading-relaxed">
              If we get something wrong, we correct it publicly and promptly.
              Corrections are noted at the top of the article with a clear
              explanation of what changed and why.
            </p>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-24 px-6 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(184,134,11,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <span
            className="font-mono text-xs uppercase tracking-[0.3em] block mb-4"
            style={{ color: "#b8860b" }}
          >
            Stay Informed
          </span>
          <h2 className="font-display text-3xl lg:text-4xl mb-4">
            See the shift before it happens
          </h2>
          <p className="mb-8" style={{ color: "#a1a1aa" }}>
            Join readers who want to understand the forces reshaping geopolitics,
            markets, and power.
          </p>
          <Link
            href="/subscribe"
            className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 bg-[#b8860b] text-[#0a0a0a] hover:bg-[#d4a00a]"
          >
            <span>Subscribe Free</span>
            <span>→</span>
          </Link>
        </div>
      </section>

    </>
  );
}
