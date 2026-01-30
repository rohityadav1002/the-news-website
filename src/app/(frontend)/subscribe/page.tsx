import Link from "next/link";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Subscribe | The Order of Change",
  description:
    "Get independent geopolitical analysis delivered to your inbox. See the shift before it happens.",
  openGraph: {
    title: "Subscribe | The Order of Change",
    description:
      "Get independent geopolitical analysis delivered to your inbox.",
    type: "website",
  },
};

export default async function SubscribePage() {
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
            Subscribe
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mb-8">
            See the shift before it happens
          </h1>
          <p
            className="font-display text-xl italic max-w-2xl mx-auto"
            style={{ color: "#a1a1aa" }}
          >
            Independent geopolitical analysis delivered to your inbox. No noise.
            No spin. Just the forces reshaping the global order.
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

      {/* Subscribe Form */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-xl mx-auto">
          <div
            className="p-8 lg:p-12"
            style={{
              backgroundColor: "#0f0f0f",
              border: "1px solid #1c1c1c",
            }}
          >
            <h2 className="font-display text-2xl lg:text-3xl mb-2 text-center">
              Join the briefing
            </h2>
            <p
              className="text-center mb-8"
              style={{ color: "#a1a1aa" }}
            >
              Free. No spam. Unsubscribe anytime.
            </p>

            <form className="space-y-4">
              <div>
                <label
                  className="font-mono text-xs uppercase tracking-wider block mb-2"
                  style={{ color: "#a1a1aa" }}
                >
                  Email Address
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

              <div>
                <label
                  className="font-mono text-xs uppercase tracking-wider block mb-2"
                  style={{ color: "#a1a1aa" }}
                >
                  First Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Your first name"
                  className="w-full px-4 py-3 font-mono text-sm outline-none transition-all duration-300 focus:border-[#b8860b]"
                  style={{
                    backgroundColor: "#0a0a0a",
                    border: "1px solid #2a2a2a",
                    color: "#fafaf9",
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 bg-[#b8860b] text-[#0a0a0a] hover:bg-[#d4a00a] cursor-pointer"
                style={{ border: "none" }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section
        className="py-20 px-6 lg:px-12"
        style={{ backgroundColor: "#0f0f0f" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span
              className="font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color: "#b8860b" }}
            >
              What You Receive
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(to right, #2a2a2a, transparent)",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Weekly Briefing",
                text: "A curated summary of the most important geopolitical developments, with analysis from our columnists. Delivered every Monday.",
              },
              {
                title: "Breaking Analysis",
                text: "When major events reshape the global order, you get our analysis within hours. Not breaking news. Breaking understanding.",
              },
              {
                title: "Multiple Perspectives",
                text: "The same event, two editorial voices. Our columnists cover stories from critical, pragmatic, and neutral angles so you see the full picture.",
              },
              {
                title: "No Noise",
                text: "We do not send daily digests, promotional content, or partner offers. Every email contains analysis worth reading.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6"
                style={{ border: "1px solid #1c1c1c" }}
              >
                <h3 className="font-display text-xl mb-3">{item.title}</h3>
                <p className="leading-relaxed" style={{ color: "#a1a1aa" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="py-20 px-6 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(184,134,11,0.03) 0%, transparent 50%, rgba(184,134,11,0.03) 100%)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p
            className="font-display text-2xl lg:text-3xl italic mb-6"
            style={{ color: "#fafaf9" }}
          >
            &ldquo;The best analysis doesn&apos;t tell you what to think. It
            gives you the tools to see clearly.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="text-center">
              <p
                className="font-display text-3xl mb-1"
                style={{ color: "#b8860b" }}
              >
                147+
              </p>
              <p
                className="font-mono text-xs uppercase tracking-wider"
                style={{ color: "#52525b" }}
              >
                Countries Covered
              </p>
            </div>
            <div
              className="hidden md:block w-px h-12"
              style={{ backgroundColor: "#2a2a2a" }}
            />
            <div className="text-center">
              <p
                className="font-display text-3xl mb-1"
                style={{ color: "#b8860b" }}
              >
                500K+
              </p>
              <p
                className="font-mono text-xs uppercase tracking-wider"
                style={{ color: "#52525b" }}
              >
                Monthly Readers
              </p>
            </div>
            <div
              className="hidden md:block w-px h-12"
              style={{ backgroundColor: "#2a2a2a" }}
            />
            <div className="text-center">
              <p
                className="font-display text-3xl mb-1"
                style={{ color: "#b8860b" }}
              >
                98%
              </p>
              <p
                className="font-mono text-xs uppercase tracking-wider"
                style={{ color: "#52525b" }}
              >
                Reader Retention
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
