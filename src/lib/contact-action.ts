"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema, type ContactState } from "./contact-schema";

const str = (v: FormDataEntryValue | null, max: number) =>
  typeof v === "string" ? v.slice(0, max) : "";

// Demande à Cloudflare si le jeton Turnstile est authentique
async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
      cache: "no-store",
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false; // au moindre doute, on refuse
  }
}

export async function sendContact(
  _previous: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Couche 1 : le piège. Un humain ne voit pas ce champ, un robot le remplit.
  // On répond "succès" pour ne pas lui apprendre qu'il est repéré.
  if (str(formData.get("website"), 200) !== "") return { status: "success" };

  const values = {
    name: str(formData.get("name"), 100),
    email: str(formData.get("email"), 200),
    subject: str(formData.get("subject"), 150),
    message: str(formData.get("message"), 5000),
  };

  // Couche 2 : validation côté serveur
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: NonNullable<ContactState["fieldErrors"]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "email" || key === "subject" || key === "message") {
        fieldErrors[key] = true;
      }
    }
    return { status: "error", error: "validation", fieldErrors, values };
  }

  // Couche 3 : Turnstile
  const h = await headers();
  const ip =
    h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const token = str(formData.get("cf-turnstile-response"), 4096);
  if (!(await verifyTurnstile(token, ip))) {
    return { status: "error", error: "captcha", values };
  }

  // Couche 4 : envoi. Les secrets viennent de l'environnement, jamais du code.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Configuration e-mail incomplète");
    return { status: "error", error: "send", values };
  }

  const { name, email, subject, message } = parsed.data;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email, // un clic sur "Répondre" écrit au visiteur
    subject: `[GenoLabGab] ${subject}`,
    text: `Nom : ${name}\nE-mail : ${email}\n\n${message}`, // texte brut : pas de HTML injecté
  });

  if (error) {
    console.error("Échec Resend :", error.name); // détail dans les journaux, pas chez le visiteur
    return { status: "error", error: "send", values };
  }
  return { status: "success" };
}

