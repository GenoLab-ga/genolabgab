"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type Props = {
  siteKey: string;
  onToken: (token: string) => void;
  resetSignal?: unknown; // quand cette valeur change, on demande un nouveau jeton
  language?: string;
};

export default function TurnstileWidget({ siteKey, onToken, resetSignal, language }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const mount = useCallback(() => {
    if (!window.turnstile || !containerRef.current || widgetId.current) return;
    widgetId.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      language: language ?? "auto",
      callback: (token: string) => onToken(token),
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
    });
  }, [siteKey, language, onToken]);

  // Affiche le widget (ou le retire en quittant la page)
  useEffect(() => {
    mount();
    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [mount]);

  // Un jeton ne sert qu'une fois : après chaque envoi, on en redemande un
  useEffect(() => {
    if (widgetId.current && window.turnstile) {
      onToken("");
      window.turnstile.reset(widgetId.current);
    }
  }, [resetSignal, onToken]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={mount}
      />
      <div ref={containerRef} />
    </>
  );
}
