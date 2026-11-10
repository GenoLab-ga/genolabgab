"use client";

import { useActionState, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { sendContact } from "@/lib/contact-action";
import type { ContactField, ContactState } from "@/lib/contact-schema";
import TurnstileWidget from "./TurnstileWidget";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function ContactForm({ siteKey }: { siteKey: string }) {
  const t = useTranslations("Contact");
  const locale = useLocale();
  // state = réponse du serveur ; formAction = la fonction à brancher sur le formulaire
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const [token, setToken] = useState("");

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-lg border border-border bg-surface p-6">
        <p className="font-medium">{t("successTitle")}</p>
        <p className="mt-2 text-sm text-muted">{t("successText")}</p>
      </div>
    );
  }

  const invalid = (k: ContactField) => Boolean(state.fieldErrors?.[k]);
  const short = [
    { key: "name", type: "text", max: 100, auto: "name" },
    { key: "email", type: "email", max: 200, auto: "email" },
    { key: "subject", type: "text", max: 150, auto: "off" },
  ] as const;

  return (
    <form action={formAction} className="relative space-y-5">
      {short.map((f) => (
        <div key={f.key}>
          <label htmlFor={f.key} className="text-sm font-medium">{t(f.key)}</label>
          <input
            id={f.key}
            name={f.key}
            type={f.type}
            required
            maxLength={f.max}
            autoComplete={f.auto}
            defaultValue={state.values?.[f.key]}
            aria-invalid={invalid(f.key)}
            className={`${inputClass} ${invalid(f.key) ? "border-malaria" : ""}`}
          />
          {invalid(f.key) && <p className="mt-1 text-xs text-malaria">{t("fieldInvalid")}</p>}
        </div>
      ))}

      <div>
        <label htmlFor="message" className="text-sm font-medium">{t("message")}</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          defaultValue={state.values?.message}
          aria-invalid={invalid("message")}
          className={`${inputClass} ${invalid("message") ? "border-malaria" : ""}`}
        />
        {invalid("message") && <p className="mt-1 text-xs text-malaria">{t("fieldInvalid")}</p>}
      </div>

      {/* Le piège : invisible pour un humain, tentant pour un robot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <TurnstileWidget siteKey={siteKey} onToken={setToken} resetSignal={state} language={locale} />
      <input type="hidden" name="cf-turnstile-response" value={token} />

      {state.status === "error" && state.error && (
        <p role="alert" className="rounded-md border border-malaria/40 bg-malaria/5 p-3 text-sm text-malaria">
          {t(`errors.${state.error}`)}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || !token}
        className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? t("sending") : t("send")}
      </button>
      {!token && <p className="text-xs text-muted">{t("captchaWait")}</p>}
    </form>
  );
}

