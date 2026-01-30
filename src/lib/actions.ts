"use server";

import { getPayloadClient } from "./payload";

export type FormState = {
  success: boolean;
  error?: string;
};

export async function subscribeAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;
  const firstName = formData.get("firstName") as string;

  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
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

export async function contactAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required." };
  }

  if (!email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
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
