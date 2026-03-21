import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Order of Change",
  description: "How The Order of Change collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      paragraphs: [
        "When you subscribe to our newsletter, we collect your email address and optionally your first name. When you use our contact form, we collect your name, email address, chosen subject, and message content.",
        "We also collect standard web analytics data including pages visited, referring URLs, and general geographic location. This data is aggregated and not tied to individual identities.",
      ],
    },
    {
      title: "How We Use Your Information",
      paragraphs: [
        "Email addresses are used solely to deliver our newsletter and respond to your inquiries. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
        "Analytics data is used to understand how readers engage with our content, helping us improve the quality and relevance of our analysis.",
      ],
    },
    {
      title: "Data Storage & Security",
      paragraphs: [
        "Your data is stored on secure servers with encryption at rest and in transit. We retain subscriber information for as long as you remain subscribed. Contact form submissions are retained for 12 months to ensure we can follow up on tips and corrections.",
        "We implement industry-standard security measures to protect against unauthorized access, alteration, or destruction of your personal data.",
      ],
    },
    {
      title: "Your Rights",
      paragraphs: [
        "You may unsubscribe from our newsletter at any time using the link included in every email. You may also request deletion of your personal data by emailing hello@orderofchange.com.",
        "If you are located in the European Economic Area, you have additional rights under the GDPR including the right to access, rectify, and port your data. We will respond to such requests within 30 days.",
      ],
    },
    {
      title: "Cookies",
      paragraphs: [
        "We use essential cookies required for the website to function. We do not use advertising or tracking cookies. If we use analytics services, they are configured to respect Do Not Track signals and anonymize IP addresses.",
      ],
    },
    {
      title: "Changes to This Policy",
      paragraphs: [
        "We may update this privacy policy from time to time. Material changes will be noted at the top of this page with the date of the latest revision. Continued use of the site after changes constitutes acceptance of the updated policy.",
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
            Privacy Policy
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
              For privacy-related inquiries, contact us at{" "}
              <span style={{ color: "#b8860b" }}>hello@orderofchange.com</span>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
