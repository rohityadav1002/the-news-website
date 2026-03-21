import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | The Order of Change",
  description: "Terms and conditions for using The Order of Change.",
};

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      paragraphs: [
        "By accessing and using The Order of Change website, you accept and agree to be bound by these terms. If you do not agree, you should not use this site.",
      ],
    },
    {
      title: "Intellectual Property",
      paragraphs: [
        "All content published on The Order of Change, including articles, analysis, graphics, and design elements, is the intellectual property of The Order of Change unless otherwise noted. You may not reproduce, distribute, or republish our content without written permission.",
        "Brief quotations with proper attribution and a link back to the original article are permitted for commentary, criticism, and news reporting purposes.",
      ],
    },
    {
      title: "Editorial Independence",
      paragraphs: [
        "The Order of Change provides independent geopolitical analysis. Our content represents the views and analysis of our columnists and editorial team. It does not constitute financial, legal, or investment advice. Readers should conduct their own research before making decisions based on our analysis.",
      ],
    },
    {
      title: "User Conduct",
      paragraphs: [
        "When submitting information through our contact forms, you agree not to submit false, misleading, or malicious content. You agree not to attempt to gain unauthorized access to any part of our systems or disrupt the operation of the website.",
      ],
    },
    {
      title: "Newsletter",
      paragraphs: [
        "By subscribing to our newsletter, you consent to receive periodic emails containing our analysis and editorial content. You may unsubscribe at any time. We do not share subscriber information with third parties.",
      ],
    },
    {
      title: "Limitation of Liability",
      paragraphs: [
        "The Order of Change provides content on an \"as is\" basis. We make no warranties regarding the accuracy, completeness, or timeliness of our analysis. We are not liable for any losses or damages arising from your use of our content or reliance on our analysis.",
      ],
    },
    {
      title: "Corrections Policy",
      paragraphs: [
        "We are committed to factual accuracy. If an error is identified in our reporting, we will correct it promptly and note the correction at the top of the affected article. To report an error, contact corrections@orderofchange.com.",
      ],
    },
    {
      title: "Modifications",
      paragraphs: [
        "We reserve the right to modify these terms at any time. Material changes will be communicated through a notice on the website. Your continued use of the site after modifications constitutes acceptance of the updated terms.",
      ],
    },
  ];

  return (
    <>
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
            Legal
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mb-4">
            Terms of Service
          </h1>
          <p className="font-mono text-sm" style={{ color: "#52525b" }}>
            Last updated: January 2026
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, #2a2a2a, transparent)",
          }}
        />
      </div>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-2xl mb-4">{section.title}</h2>
              {section.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="leading-relaxed mb-4 last:mb-0"
                  style={{ color: "#a1a1aa" }}
                >
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div>
            <h2 className="font-display text-2xl mb-4">Contact</h2>
            <p className="leading-relaxed" style={{ color: "#a1a1aa" }}>
              Questions about these terms? Contact us at{" "}
              <span style={{ color: "#b8860b" }}>hello@orderofchange.com</span>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
