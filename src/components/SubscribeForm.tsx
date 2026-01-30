"use client";

import { useActionState } from "react";
import { subscribeAction, type FormState } from "@/lib/actions";

const initialState: FormState = { success: false };

export function SubscribeForm() {
  const [state, formAction, pending] = useActionState(subscribeAction, initialState);

  if (state.success) {
    return (
      <div className="text-center py-8">
        <p className="font-display text-2xl mb-2">You&apos;re in.</p>
        <p className="font-mono text-sm" style={{ color: "#a1a1aa" }}>
          Check your inbox for a welcome from The Order of Change.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="subscribe-email"
          className="font-mono text-xs uppercase tracking-wider block mb-2"
          style={{ color: "#a1a1aa" }}
        >
          Email Address
        </label>
        <input
          id="subscribe-email"
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

      <div>
        <label
          htmlFor="subscribe-name"
          className="font-mono text-xs uppercase tracking-wider block mb-2"
          style={{ color: "#a1a1aa" }}
        >
          First Name (Optional)
        </label>
        <input
          id="subscribe-name"
          name="firstName"
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

      {state.error && (
        <p className="font-mono text-xs" style={{ color: "#ef4444" }}>
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 bg-[#b8860b] text-[#0a0a0a] hover:bg-[#d4a00a] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ border: "none" }}
      >
        {pending ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}
