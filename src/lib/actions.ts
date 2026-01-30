"use server";

import { getPayloadClient } from "./payload";

export type FormState = {
  success: boolean;
  error?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= 254;
}

// Simple in-memory rate limiter (per-action, keyed by identifier)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string, maxAttempts: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count++;
  return entry.count > maxAttempts;
}

export async function subscribeAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const email = (formData.get("email") as string || "").trim().toLowerCase();
  const firstName = (formData.get("firstName") as string || "").trim();

  if (!email || !isValidEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Rate limit: 5 subscribe attempts per email per hour
  if (isRateLimited(`sub:${email}`, 5, 60 * 60 * 1000)) {
    return { success: false, error: "Too many attempts. Please try again later." };
  }

  try {
    const payload = await getPayloadClient();

    // Check if already subscribed
    const existing = await payload.find({
      collection: "subscribers",
      where: { email: { equals: email } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      return { success: false, error: "This email is already subscribed." };
    }

    await payload.create({
      collection: "subscribers",
      data: {
        email,
        firstName: firstName || undefined,
      },
    });

    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

const VALID_SUBJECTS = ["tip", "correction", "media", "feedback", "other"];

export async function contactAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = (formData.get("name") as string || "").trim();
  const email = (formData.get("email") as string || "").trim().toLowerCase();
  const subject = (formData.get("subject") as string || "").trim();
  const message = (formData.get("message") as string || "").trim();

  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required." };
  }

  if (!isValidEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (!VALID_SUBJECTS.includes(subject)) {
    return { success: false, error: "Please select a valid subject." };
  }

  if (message.length > 5000) {
    return { success: false, error: "Message must be under 5000 characters." };
  }

  // Rate limit: 3 contact submissions per email per hour
  if (isRateLimited(`contact:${email}`, 3, 60 * 60 * 1000)) {
    return { success: false, error: "Too many submissions. Please try again later." };
  }

  try {
    const payload = await getPayloadClient();

    await payload.create({
      collection: "contact-submissions",
      data: { name, email, subject, message },
    });

    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
