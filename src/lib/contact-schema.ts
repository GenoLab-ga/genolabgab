import { z } from "zod";

// Interdit les retours à la ligne dans les champs courts (évite les injections d'en-têtes)
const oneLine = /^[^\r\n]*$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100).regex(oneLine),
  email: z.string().trim().email().max(200).regex(oneLine),
  subject: z.string().trim().min(3).max(150).regex(oneLine),
  message: z.string().trim().min(10).max(5000),
});

export type ContactField = "name" | "email" | "subject" | "message";

// L'état renvoyé par le serveur à la page
export type ContactState = {
  status: "idle" | "success" | "error";
  error?: "validation" | "captcha" | "send";
  fieldErrors?: Partial<Record<ContactField, true>>;
  values?: Partial<Record<ContactField, string>>; // pour ne pas effacer ce qui a été saisi
};
