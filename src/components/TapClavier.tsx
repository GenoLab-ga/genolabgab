"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

/* ───────────── Corpus ───────────── */
type Layout = "azerty" | "qwerty";
type Mode = "lecons" | "rangee" | "mots" | "phrases" | "bio" | "adn";

const MODES: { id: Mode; label: string }[] = [
  { id: "lecons", label: "Leçons" },
  { id: "rangee", label: "Rangée de base" },
  { id: "mots", label: "Mots" },
  { id: "phrases", label: "Phrases" },
  { id: "bio", label: "Biologie" },
  { id: "adn", label: "ADN" },
];
const DURATIONS = [30, 60, 120];

const WORDS =
  "le la de un une il elle nous vous ils pour dans avec sans sur sous plus moins très bien mais donc car que qui quand comme chaque jour nuit temps vie monde ville maison table livre porte route mer terre eau feu vent soleil lune ciel arbre fleur chat chien oiseau poisson cheval travail projet idée clé problème solution question réponse équipe école musique image mot phrase lettre chiffre nombre petit grand rapide lent simple clair fort doux premier dernier ensemble toujours jamais souvent parfois demain hier".split(
    " ",
  );
const BIO =
  "ADN ARN gène génome exon intron allèle variant mutation protéine ribosome enzyme plasmide promoteur transcrit séquençage alignement assemblage annotation expression différentielle phylogénie métagénome microbiome biomarqueur cellule noyau reads contig pipeline FASTQ BLAST PCR CRISPR RNA-seq".split(
    " ",
  );
const SENTENCES = [
  "Un bon rythme vaut mieux qu'une vitesse irrégulière.",
  "Gardez les yeux sur l'écran et laissez vos doigts trouver les touches.",
  "La précision d'abord, la vitesse viendra ensuite.",
  "Chaque séquence lue est alignée sur le génome de référence.",
  "Taper sans regarder le clavier fait gagner un temps précieux.",
  "Les index restent posés sur les touches F et J.",
  "Un pipeline reproductible commence par un environnement bien décrit.",
  "Respirez, détendez les épaules et gardez les poignets droits.",
  "Le contrôle qualité des données précède toute analyse sérieuse.",
  "Dix minutes par jour valent mieux qu'une heure par semaine.",
];

const rnd = (n: number) => Math.floor(Math.random() * n);
const pick = <T,>(a: readonly T[]): T => a[rnd(a.length)];
const HOME: Record<Layout, string> = { azerty: "qsdfghjklm", qwerty: "asdfghjkl" };
// Chaque leçon introduit de nouvelles touches (progression par doigt, rangée de base puis haut puis bas)
const LESSONS: Record<Layout, string[]> = {
  azerty: ["fj", "dk", "sl", "qm", "gh", "ei", "ru", "ty", "zo", "ap", "vn", "bc", "xw", "éèàç"],
  qwerty: ["fj", "dk", "sl", "a;", "gh", "ei", "ru", "ty", "wo", "qp", "vn", "bm", "cx", "z,."],
};
const LESSON_ACC = 95;
const LESSON_WPM = 15;
const lessonUnit = (layout: Layout, n: number) => {
  const pool = [...LESSONS[layout].slice(0, n + 1).join("")];
  const fresh = [...LESSONS[layout][n]];
  return () => {
    const len = 3 + rnd(3);
    const a = Array.from({ length: len }, () => pick(pool));
    if (rnd(10) < 8) a[rnd(len)] = pick(fresh); // 80 % des groupes contiennent une touche nouvelle
    return a.join("");
  };
};
const stripAccents = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const GEN: Record<Exclude<Mode, "lecons">, (l: Layout) => string> = {
  rangee: (l) => Array.from({ length: 4 }, () => pick([...HOME[l]])).join(""),
  mots: () => pick(WORDS),
  phrases: () => pick(SENTENCES),
  bio: () => pick(BIO),
  adn: () => Array.from({ length: 6 }, () => pick([..."ACGT"])).join(""),
};
const buildText = (mode: Mode, layout: Layout, lesson: number) => {
  const unit = mode === "lecons" ? lessonUnit(layout, lesson) : () => GEN[mode](layout);
  let s = "";
  while (s.length < 1200) s += (s ? " " : "") + unit();
  return layout === "qwerty" ? stripAccents(s) : s; // pas d'accents sur un clavier QWERTY
};

/* ───────────── Clavier AZERTY ─────────────
   Doigts : 0-3 main gauche, 4-7 main droite, 8 pouces */
type KeyDef = { id: string; label: string; sub?: string; f: number; w: number; home?: boolean };
type Cell = KeyDef | number; // number = espaceur (flex)

const mk = (chars: string, fingers: number[]): [string, string, number][] =>
  [...chars].map((c, i) => [c, c.toUpperCase(), fingers[i]]);
const F10 = [0, 1, 2, 3, 3, 4, 4, 5, 6, 7];
const key = ([b, s, f]: [string, string, number]): KeyDef => ({
  id: b,
  label: /[a-z]/.test(b) ? b.toUpperCase() : b,
  sub: s && !/[A-Z]/.test(s) ? s : undefined,
  f,
  w: 1,
  home: b === "f" || b === "j",
});
const sp = (id: string, label: string, f: number, w: number): KeyDef => ({ id, label, f, w });

const AZ_ROWS: Cell[][] = [
  [
    ...([["²", "", 0], ["&", "1", 0], ["é", "2", 1], ['"', "3", 2], ["'", "4", 3], ["(", "5", 3], ["-", "6", 4], ["è", "7", 4], ["_", "8", 5], ["ç", "9", 6], ["à", "0", 7], [")", "°", 7], ["=", "+", 7]] as [string, string, number][]).map(key),
    sp("Backspace", "⌫", 7, 1.6),
  ],
  [1.5, ...mk("azertyuiop", F10).map(key), key(["^", "¨", 7]), key(["$", "£", 7]), 1.1],
  [1.8, ...mk("qsdfghjklm", F10).map(key), key(["ù", "%", 7]), key(["*", "µ", 7]), 0.8],
  [
    sp("ShiftL", "⇧", 0, 1.3),
    key(["<", ">", 0]),
    ...mk("wxcvbn", [0, 1, 2, 3, 3, 4]).map(key),
    key([",", "?", 4]), key([";", ".", 5]), key([":", "/", 6]), key(["!", "§", 7]),
    sp("ShiftR", "⇧", 7, 2.3),
  ],
  [3.5, sp(" ", "", 8, 7), 4.1],
];

const QW_ROWS: Cell[][] = [
  [
    ...([["`", "~", 0], ["1", "!", 0], ["2", "@", 1], ["3", "#", 2], ["4", "$", 3], ["5", "%", 3], ["6", "^", 4], ["7", "&", 4], ["8", "*", 5], ["9", "(", 6], ["0", ")", 7], ["-", "_", 7], ["=", "+", 7]] as [string, string, number][]).map(key),
    sp("Backspace", "⌫", 7, 1.6),
  ],
  [1.5, ...mk("qwertyuiop", F10).map(key), key(["[", "{", 7]), key(["]", "}", 7]), key(["\\", "|", 7]), 0.1],
  [1.8, ...mk("asdfghjkl", F10.slice(0, 9)).map(key), key([";", ":", 7]), key(["'", '"', 7]), 1.8],
  [
    sp("ShiftL", "⇧", 0, 2.3),
    ...mk("zxcvbnm", [0, 1, 2, 3, 3, 4, 4]).map(key),
    key([",", "<", 5]), key([".", ">", 6]), key(["/", "?", 7]),
    sp("ShiftR", "⇧", 7, 2.3),
  ],
  [3.5, sp(" ", "", 8, 7), 4.1],
];

// caractère -> touche (id), Maj requise, doigt
const buildLook = (rows: Cell[][]) => {
  const look: Record<string, { id: string; shift: boolean; f: number }> = {};
  rows.flat().forEach((c) => {
    if (typeof c === "number") return;
    look[c.id] = { id: c.id, shift: false, f: c.f };
    if (/^[a-z]$/.test(c.id)) look[c.id.toUpperCase()] = { id: c.id, shift: true, f: c.f };
    else if (c.sub) look[c.sub] = { id: c.id, shift: true, f: c.f };
  });
  return look;
};
const LAYOUTS = {
  azerty: { rows: AZ_ROWS, look: buildLook(AZ_ROWS) },
  qwerty: { rows: QW_ROWS, look: buildLook(QW_ROWS) },
};

const HUES = [350, 20, 42, 85, 170, 195, 225, 265, 215];

/* ───────────── Stockage local réactif (localStorage + repli mémoire) ───────────── */
const listeners = new Set<() => void>();
const mem: Record<string, string> = {};
const readKey = (k: string) => {
  try {
    return localStorage.getItem(k) ?? mem[k] ?? "";
  } catch {
    return mem[k] ?? "";
  }
};
const writeKey = (k: string, v: string) => {
  mem[k] = v;
  try {
    localStorage.setItem(k, v);
  } catch {
    /* stockage indisponible */
  }
  listeners.forEach((l) => l());
};
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
};
const useStored = (k: string) => useSyncExternalStore(subscribe, () => readKey(k), () => "");
const parseJSON = <T,>(raw: string, fallback: T): T => {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};
type Entry = { t: number; wpm: number; acc: number; mode: Mode; dur: number };

/* Vitesse nette (1 mot = 5 caractères corrects) et précision cumulée */
const computeStats = (v: string, tgt: string, total: number, errs: number, el: number) => {
  let ok = 0;
  for (let i = 0; i < v.length; i++) if (v[i] === tgt[i]) ok++;
  return {
    wpm: el > 0 ? Math.round(ok / 5 / (Math.max(el, 2) / 60)) : 0,
    acc: total ? Math.round(((total - errs) / total) * 100) : 100,
  };
};

/* ───────────── Historique des scores (SVG, sans dépendance) ───────────── */
function Progress({ entries, onClear }: { entries: Entry[]; onClear: () => void }) {
  if (!entries.length) return null;
  const data = entries.slice(-30);
  const W = 600, H = 190, L = 34, R = 34, T = 12, B = 24;
  const yMax = Math.max(20, Math.ceil(Math.max(...data.map((d) => d.wpm)) / 10) * 10);
  const x = (i: number) => L + (data.length === 1 ? (W - L - R) / 2 : (i * (W - L - R)) / (data.length - 1));
  const yW = (v: number) => T + (H - T - B) * (1 - v / yMax);
  const yA = (v: number) => T + (H - T - B) * (1 - v / 100);
  const line = (f: (v: number) => number, k: "wpm" | "acc") => data.map((d, i) => `${x(i)},${f(d[k])}`).join(" ");
  const avg = (a: Entry[]) => (a.length ? Math.round(a.reduce((t, d) => t + d.wpm, 0) / a.length) : 0);
  const recent = avg(entries.slice(-5));
  const before = entries.length >= 10 ? avg(entries.slice(-10, -5)) : null;
  const fmt = (t: number) => new Date(t).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
  const kpis = [
    { v: entries.length, l: "sessions" },
    { v: Math.max(...entries.map((d) => d.wpm)), l: "record (mots/min)" },
    { v: before === null ? recent : `${recent} (${recent - before >= 0 ? "+" : ""}${recent - before})`, l: "moyenne des 5 dernières" },
  ];
  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">Votre progression</h2>
        <button type="button" onClick={onClear} className="text-sm text-slate-500 underline hover:text-slate-800">
          Effacer l&apos;historique
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-8">
        {kpis.map((k) => (
          <div key={k.l} className="flex flex-col">
            <span className="text-2xl font-semibold tabular-nums leading-none text-slate-900">{k.v}</span>
            <span className="mt-1 text-sm text-slate-500">{k.l}</span>
          </div>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label="Évolution de la vitesse et de la précision">
        {[0, 0.5, 1].map((p) => (
          <g key={p}>
            <line x1={L} x2={W - R} y1={yW(yMax * p)} y2={yW(yMax * p)} stroke="#e2e8f0" />
            <text x={L - 6} y={yW(yMax * p) + 4} textAnchor="end" fontSize="11" fill="#059669">{Math.round(yMax * p)}</text>
            <text x={W - R + 6} y={yA(100 * p) + 4} fontSize="11" fill="#94a3b8">{Math.round(100 * p)}</text>
          </g>
        ))}
        <polyline points={line(yA, "acc")} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
        <polyline points={line(yW, "wpm")} fill="none" stroke="#059669" strokeWidth="2.5" strokeLinejoin="round" />
        {data.map((d, i) => (
          <circle key={`${d.t}-${i}`} cx={x(i)} cy={yW(d.wpm)} r="3.5" fill="#059669">
            <title>{`${fmt(d.t)} : ${d.wpm} mots/min, ${d.acc} % (${MODES.find((m) => m.id === d.mode)?.label ?? d.mode}, ${d.dur} s)`}</title>
          </circle>
        ))}
        <text x={L} y={H - 6} fontSize="11" fill="#64748b">{fmt(data[0].t)}</text>
        <text x={W - R} y={H - 6} textAnchor="end" fontSize="11" fill="#64748b">{fmt(data[data.length - 1].t)}</text>
      </svg>
      <p className="mt-1 text-sm text-slate-500">
        Trait plein : vitesse (échelle de gauche). Pointillés : précision en % (échelle de droite). Les scores restent dans votre navigateur.
      </p>
    </section>
  );
}

/* ───────────── Composant ───────────── */
type Result = { lesson?: { passed: boolean }; wpm: number; acc: number; err: number; record: string; weak: string };

export default function TapClavier() {
  const [mode, setMode] = useState<Mode>("mots");
  const [dur, setDur] = useState(60);
  const [target, setTarget] = useState("");
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [focused, setFocused] = useState(false);
  const [hit, setHit] = useState<string | null>(null);
  const [counts, setCounts] = useState({ total: 0, errs: 0 });
  const [lesson, setLesson] = useState(0);
  const layout: Layout = useStored("tc-layout") === "qwerty" ? "qwerty" : "azerty";
  const doneRaw = useStored(`tc-lessons-${layout}`);
  const doneLessons = useMemo(() => parseJSON<number[]>(doneRaw, []), [doneRaw]);
  const histRaw = useStored("tc-history");
  const history = useMemo(() => parseJSON<Entry[]>(histRaw, []), [histRaw]);

  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const t0 = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const hitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typedRef = useRef("");
  const targetRef = useRef("");
  const total = useRef(0);
  const errs = useRef(0);
  const miss = useRef<Record<string, number>>({});
  const doneRef = useRef(false);
  const modeRef = useRef(mode);
  const durRef = useRef(dur);
  const layoutRef = useRef<Layout>("azerty");
  const lessonRef = useRef(0);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    if (timer.current) clearInterval(timer.current);
    const el = Math.min((performance.now() - t0.current) / 1000, durRef.current);
    const s = computeStats(typedRef.current, targetRef.current, total.current, errs.current, el);
    if (total.current >= 10) {
      const hist = parseJSON<Entry[]>(readKey("tc-history"), []);
      const entry: Entry = { t: Date.now(), wpm: s.wpm, acc: s.acc, mode: modeRef.current, dur: durRef.current };
      writeKey("tc-history", JSON.stringify([...hist, entry].slice(-100)));
    }
    const passed = modeRef.current === "lecons" && s.acc >= LESSON_ACC && s.wpm >= LESSON_WPM;
    if (passed) {
      const lk = `tc-lessons-${layoutRef.current}`;
      const d = parseJSON<number[]>(readKey(lk), []);
      if (!d.includes(lessonRef.current)) writeKey(lk, JSON.stringify([...d, lessonRef.current]));
    }
    let record = "";
    const k = `tc-best-${modeRef.current}${modeRef.current === "lecons" ? lessonRef.current : ""}-${durRef.current}`;
    try {
      const best = Number(localStorage.getItem(k)) || 0;
      if (s.wpm > best) {
        localStorage.setItem(k, String(s.wpm));
        record = best ? `Nouveau record : ${s.wpm} mots/min (précédent : ${best}).` : "Premier score enregistré pour ce mode.";
      } else record = `Record sur ce mode : ${best} mots/min.`;
    } catch {
      /* stockage indisponible */
    }
    const top = Object.entries(miss.current)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([c, n]) => `« ${c === " " ? "espace" : c} » (${n})`)
      .join(", ");
    setElapsed(el);
    setResult({
      lesson: modeRef.current === "lecons" ? { passed } : undefined,
      wpm: s.wpm,
      acc: s.acc,
      err: errs.current,
      record,
      weak: top ? `Touches à travailler : ${top}.` : "Aucune erreur : essayez une durée plus longue ou un autre mode.",
    });
    inputRef.current?.blur();
  }, []);

  const reset = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    doneRef.current = false;
    total.current = 0;
    errs.current = 0;
    miss.current = {};
    typedRef.current = "";
    const t = buildText(modeRef.current, layoutRef.current, lessonRef.current);
    targetRef.current = t;
    setTarget(t);
    setTyped("");
    setCounts({ total: 0, errs: 0 });
    setStarted(false);
    setElapsed(0);
    setResult(null);
    if (boxRef.current) boxRef.current.scrollTop = 0;
    inputRef.current?.focus();
  }, []);

  // Nouveau texte à chaque changement de mode/durée (généré côté client : pas de mismatch d'hydratation)
  useEffect(() => {
    modeRef.current = mode;
    durRef.current = dur;
    layoutRef.current = layout;
    lessonRef.current = lesson;
    reset();
  }, [mode, dur, layout, lesson, reset]);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
    if (hitTimer.current) clearTimeout(hitTimer.current);
  }, []);

  // Échap = recommencer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") reset();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [reset]);

  // Garde le curseur sur la 2e ligne visible
  useEffect(() => {
    const box = boxRef.current;
    const cur = box?.querySelector<HTMLElement>("[data-cur]");
    if (!box || !cur) return;
    box.scrollTop = Math.max(0, cur.offsetTop - parseFloat(getComputedStyle(box).lineHeight));
  }, [typed, target]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (doneRef.current) return;
    const tgt = targetRef.current;
    const v = e.target.value.slice(0, tgt.length);
    if (v !== e.target.value) e.target.value = v;
    if (!timer.current || !started) {
      if (v.length && !started) {
        setStarted(true);
        t0.current = performance.now();
        timer.current = setInterval(() => {
          const el = (performance.now() - t0.current) / 1000;
          setElapsed(Math.min(el, durRef.current));
          if (el >= durRef.current) finish();
        }, 200);
      }
    }
    for (let i = typedRef.current.length; i < v.length; i++) {
      total.current++;
      if (v[i] !== tgt[i]) {
        errs.current++;
        miss.current[tgt[i]] = (miss.current[tgt[i]] || 0) + 1;
      }
    }
    typedRef.current = v;
    setTyped(v);
    setCounts({ total: total.current, errs: errs.current });
    if (v === tgt) finish();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const id = e.key === "Backspace" ? "Backspace" : LAYOUTS[layout].look[e.key]?.id;
    if (!id) return;
    setHit(id);
    if (hitTimer.current) clearTimeout(hitTimer.current);
    hitTimer.current = setTimeout(() => setHit(null), 110);
  };

  /* Touche à mettre en évidence */
  const done = result !== null;
  let next: Set<string> = new Set();
  let warn = "";
  if (target && !done) {
    const bad = [...typed].some((c, i) => c !== target[i]);
    if (bad) warn = "Backspace";
    else {
      const m = LAYOUTS[layout].look[target[typed.length]];
      if (m) {
        next = new Set([m.id]);
        if (m.shift) next.add(m.f <= 3 ? "ShiftR" : "ShiftL"); // Maj de la main opposée
      }
    }
  }

  const live = computeStats(typed, target, counts.total, counts.errs, started ? elapsed : 0);
  const timeLeft = started ? Math.max(0, Math.ceil(dur - elapsed)) : dur;

  const charSpan = (i: number, c: string) => {
    let cls = "text-slate-400";
    let cur = false;
    if (i < typed.length) cls = typed[i] === c ? "text-slate-900" : "rounded-sm bg-red-100 text-red-600";
    else if (i === typed.length && !done) {
      cur = true;
      cls = "text-slate-400 shadow-[inset_2px_0_0_#10b981]";
    }
    return (
      <span key={i} className={cls} {...(cur ? { "data-cur": "" } : {})}>
        {c}
      </span>
    );
  };

  const words = target.split(" ");
  const starts = words.reduce<number[]>((acc, w, i) => [...acc, i ? acc[i - 1] + words[i - 1].length + 1 : 0], []);

  const seg = (active: boolean) =>
    `px-3.5 py-2 text-sm font-medium transition ${
      active ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  return (
    <div className="mt-8">
      {/* Réglages */}
      <div className="flex flex-wrap gap-3">
        <div className="inline-flex flex-wrap overflow-hidden rounded-xl border border-slate-200 bg-white" role="group" aria-label="Type d'exercice">
          {MODES.map((m) => (
            <button key={m.id} type="button" aria-pressed={mode === m.id} className={seg(mode === m.id)} onClick={() => {
                if (m.id === "lecons") setLesson(Math.max(0, LESSONS[layout].findIndex((_, i) => !doneLessons.includes(i))));
                setMode(m.id);
              }}>
              {m.label}
            </button>
          ))}
        </div>
        <div className="inline-flex overflow-hidden rounded-xl border border-slate-200 bg-white" role="group" aria-label="Durée">
          {DURATIONS.map((d) => (
            <button key={d} type="button" aria-pressed={dur === d} className={seg(dur === d)} onClick={() => setDur(d)}>
              {d} s
            </button>
          ))}
        </div>
        <div className="inline-flex overflow-hidden rounded-xl border border-slate-200 bg-white" role="group" aria-label="Disposition du clavier">
          {(["azerty", "qwerty"] as Layout[]).map((l) => (
            <button key={l} type="button" aria-pressed={layout === l} className={seg(layout === l)} onClick={() => writeKey("tc-layout", l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {mode === "lecons" && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Leçons">
            {LESSONS[layout].map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Leçon ${i + 1}`}
                aria-pressed={lesson === i}
                onClick={() => setLesson(i)}
                className={`h-9 w-9 rounded-lg border text-sm font-medium transition ${
                  lesson === i
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : doneLessons.includes(i)
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {doneLessons.includes(i) ? "✓" : i + 1}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Leçon {lesson + 1} : touches {[...LESSONS[layout][lesson]].join(" ").toUpperCase()}. Objectif : {LESSON_ACC} % de précision et {LESSON_WPM} mots/min.
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="mt-7 flex gap-8 sm:gap-10">
        {[
          { v: live.wpm, l: "mots par minute" },
          { v: live.acc, l: "précision (%)" },
          { v: timeLeft, l: "secondes restantes" },
        ].map((s) => (
          <div key={s.l} className="flex flex-col">
            <span className="text-3xl font-semibold tabular-nums leading-none text-slate-900 sm:text-4xl">{s.v}</span>
            <span className="mt-1 text-sm text-slate-500">{s.l}</span>
          </div>
        ))}
      </div>

      {/* Zone de texte */}
      <div
        className="relative mt-4 cursor-text rounded-2xl border border-slate-200 bg-white px-5 py-4"
        onClick={() => !done && inputRef.current?.focus()}
      >
        <div
          ref={boxRef}
          aria-label="Texte à recopier"
          className={`h-[6.3em] overflow-hidden text-lg leading-[2.1] transition-opacity sm:text-[1.4rem] ${focused || done ? "opacity-100" : "opacity-50"}`}
          style={{ fontFamily: "var(--font-ibm-plex-mono), ui-monospace, monospace" }}
        >
          {words.map((w, wi) => {
            const start = starts[wi];
            return (
              <Fragment key={wi}>
                <span className="inline-block whitespace-nowrap">{[...w].map((c, i) => charSpan(start + i, c))}</span>
                {wi < words.length - 1 && charSpan(start + w.length, " ")}
              </Fragment>
            );
          })}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={typed}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onPaste={(e) => e.preventDefault()}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={done}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Zone de saisie"
          className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
        />
      </div>
      <p className="mt-2 min-h-6 text-sm text-slate-500">
        Cliquez sur le texte puis tapez : le chrono démarre à la première touche. Échap pour recommencer.
      </p>

      {/* Résultat */}
      {result && (
        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-7" aria-live="polite">
          <h2 className="text-lg font-semibold text-slate-900">Exercice terminé</h2>
          <div className="mt-4 flex flex-wrap gap-8">
            {[
              { v: result.wpm, l: "mots par minute" },
              { v: result.acc, l: "précision (%)" },
              { v: result.err, l: "frappes erronées" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col">
                <span className="text-3xl font-semibold tabular-nums leading-none text-emerald-700">{s.v}</span>
                <span className="mt-1 text-sm text-slate-500">{s.l}</span>
              </div>
            ))}
          </div>
          {result.record && <p className="mt-4 text-sm font-medium text-emerald-700">{result.record}</p>}
          <p className="mt-1 text-sm text-slate-600">{result.weak}</p>
          {result.lesson && (
            <p className={`mt-3 text-sm font-medium ${result.lesson.passed ? "text-emerald-700" : "text-amber-700"}`}>
              {result.lesson.passed ? "Leçon validée." : `Leçon non validée : il faut ${LESSON_ACC} % de précision et ${LESSON_WPM} mots/min.`}
            </p>
          )}
          <button
            type="button"
            autoFocus={!result.lesson?.passed}
            onClick={reset}
            className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Rejouer
          </button>
          {result.lesson?.passed && lesson < LESSONS[layout].length - 1 && (
            <button
              type="button"
              autoFocus
              onClick={() => setLesson(lesson + 1)}
              className="ml-3 mt-5 rounded-lg border border-emerald-600 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Leçon suivante
            </button>
          )}
        </section>
      )}

      {/* Clavier visuel (masqué sur petit écran) */}
      <div className="mt-8 hidden select-none gap-1.5 md:grid" aria-hidden="true">
        {LAYOUTS[layout].rows.map((row, ri) => (
          <div key={ri} className="flex gap-1.5">
            {row.map((c, ci) => {
              if (typeof c === "number") return <div key={ci} style={{ flex: c }} />;
              const isNext = next.has(c.id);
              const isWarn = warn === c.id;
              return (
                <div
                  key={ci}
                  style={{
                    flex: c.w,
                    backgroundColor: isNext ? undefined : isWarn ? undefined : `hsl(${HUES[c.f]} 48% 86%)`,
                  }}
                  className={`relative flex h-11 min-w-0 items-center justify-center rounded-lg text-sm font-semibold text-slate-800 transition ${
                    isNext ? "-translate-y-0.5 bg-emerald-600 text-white outline outline-[3px] outline-emerald-600" : ""
                  } ${isWarn ? "bg-red-500 text-white" : ""} ${hit === c.id ? "translate-y-0.5 brightness-90" : ""}`}
                >
                  {c.sub && <i className="absolute left-1.5 top-0.5 text-[10px] font-normal not-italic opacity-60">{c.sub}</i>}
                  {c.label}
                  {c.home && <span className="absolute bottom-1.5 h-0.5 w-3 rounded-full bg-current opacity-60" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p className="mt-3 hidden text-sm text-slate-500 md:block">
        Chaque couleur correspond à un doigt. Posez les index sur F et J (repères en relief), pouces sur la barre d&apos;espace.
      </p>

      <Progress entries={history} onClear={() => writeKey("tc-history", "")} />
    </div>
  );
}
