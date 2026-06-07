import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="text-slate-600 leading-relaxed mb-4">{children}</p>
    ),
    code: ({ children }) => (
      <code className="bg-slate-100 text-emerald-700 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto mb-4 text-sm">
        {children}
      </pre>
    ),
    ...components,
  };
}
