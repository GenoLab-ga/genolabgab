// SectionTag.tsx
export default function SectionTag({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-10 flex items-center gap-4 font-mono text-sm">
      <span className="text-bio-400">&gt;</span>
      <span className="text-slate-500">{index}</span>
      <span className="text-slate-200">{label}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-lab-700 to-transparent" />
    </div>
  );
}
