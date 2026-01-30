"use client";

import { useActionState } from "react";
import { contactAction, type FormState } from "@/lib/actions";

const initialState: FormState = { success: false };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(contactAction, initialState);

  if (state.success) {
    return (
      <div className="text-center py-12">
        <p className="font-display text-2xl mb-2">Message sent.</p>
        <p className="font-mono text-sm" style={{ color: "#a1a1aa" }}>
          We read every message. Expect a response within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="contact-name"
            className="font-mono text-xs uppercase tracking-wider block mb-2"
            style={{ color: "#a1a1aa" }}
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
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
            htmlFor="contact-email"
            className="font-mono text-xs uppercase tracking-wider block mb-2"
            style={{ color: "#a1a1aa" }}
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
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
          htmlFor="contact-subject"
          className="font-mono text-xs uppercase tracking-wider block mb-2"
          style={{ color: "#a1a1aa" }}
        >
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
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
          htmlFor="contact-message"
          className="font-mono text-xs uppercase tracking-wider block mb-2"
          style={{ color: "#a1a1aa" }}
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
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

      {state.error && (
        <p className="font-mono text-xs" style={{ color: "#ef4444" }}>
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 bg-[#b8860b] text-[#0a0a0a] hover:bg-[#d4a00a] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ border: "none" }}
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
