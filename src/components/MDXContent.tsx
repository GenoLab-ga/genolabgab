import { MDXRemote } from "next-mdx-remote/rsc";

export default function MDXContent({ source }: { source: string }) {
    return (
        <div className="prose prose-slate max-w-none prose-headings:tracking-tight prose-a:text-primary">
        <MDXRemote source={source} />
        </div>
    );
}
