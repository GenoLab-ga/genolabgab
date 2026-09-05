"use client";
import { useEffect, useState } from "react";

export default function ScrambleTitle({ text }: { text: string }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.split("").map((c, idx) =>
        c === " " ? " " : idx < i / 2 ? c : "ATCG"[Math.random() * 4 | 0]
      ).join(""));
      if (i / 2 >= text.length) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [text]);
  return (
    <h1 className="font-display text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
      {out}
    </h1>
  );
}
