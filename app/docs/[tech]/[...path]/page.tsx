import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyCode from "@/components/CopyCode";
import ErrorState from "@/components/ErrorState";
import { DocsError, getIndex, getPageHtml, getTechs, pageList } from "@/lib/devdocs";
import { renderDoc } from "@/lib/render";
import { docHref } from "@/lib/url";

export const revalidate = 86400;

export const dynamicParams = true;

const POPULAR_TECHS = [
  "python", "react", "typescript", "java", "css",
  "html", "node", "go", "php", "git", "mysql",
];
const MAX_PAGES_PER_TECH = 40;

export async function generateStaticParams() {
  const out: { tech: string; path: string[] }[] = [];
  for (const tech of POPULAR_TECHS) {
    try {
      const pages = pageList(await getIndex(tech)).slice(0, MAX_PAGES_PER_TECH);
      for (const p of pages) out.push({ tech, path: p.path.split("/") });
    } catch {
      // Skipped at build time; still works fine as an on-demand ISR page.
    }
  }
  return out;
}

type Props = { params: Promise<{ tech: string; path: string[] }> };
const toPath = (segs: string[]) => segs.map(decodeURIComponent).join("/");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tech, path } = await params;
  try {
    const [techs, index] = await Promise.all([getTechs(), getIndex(tech)]);
    const p = toPath(path);
    const entry = pageList(index).find((e) => e.path === p);
    const tName = techs.find((t) => t.slug === tech)?.name ?? tech;
    if (!entry) return { title: tName };
    return {
      title: `${entry.name} — ${tName}`,
      description: `${entry.name}: ${tName} documentation, section "${entry.type}".`,
      alternates: { canonical: docHref(tech, p) },
    };
  } catch { return { title: tech }; }
}

export default async function DocPage({ params }: Props) {
  const { tech, path: segs } = await params;
  const path = toPath(segs);
  try {
    const [techs, index, html] = await Promise.all([getTechs(), getIndex(tech), getPageHtml(tech, path)]);
    const pages = pageList(index);
    const i = pages.findIndex((e) => e.path === path);
    const entry = pages[i];
    const prev = pages[i - 1], next = pages[i + 1];
    const cur = techs.find((t) => t.slug === tech);
    const tName = cur?.name ?? tech;
    const ver = cur?.version || cur?.release || "";
    return (
      <article className="overflow-hidden">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li><Link href="/" prefetch={false} className="hover:text-ink">Docs</Link></li>
            <li aria-hidden>/</li>
            <li><Link href={`/docs/${tech}`} prefetch={false} className="hover:text-ink">{tName}</Link>{ver && <span className="ml-2 rounded border border-line px-1.5 font-mono text-xs">{ver}</span>}</li>
            {entry && <><li aria-hidden>/</li><li>{entry.type}</li><li aria-hidden>/</li><li aria-current="page" className="text-ink">{entry.name}</li></>}
          </ol>
        </nav>
        <div className="doc" dangerouslySetInnerHTML={{ __html: renderDoc(html, tech, path) }} />
        <CopyCode />
        <nav aria-label="Pagination" className="mt-14 grid max-w-[46rem] grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
          {prev ? <Link href={docHref(tech, prev.path)} prefetch={false} className="rounded-md border border-line p-3 hover:border-accent"><span className="block text-xs text-muted">Previous</span>{prev.name}</Link> : <span />}
          {next ? <Link href={docHref(tech, next.path)} prefetch={false} className="rounded-md border border-line p-3 text-right hover:border-accent"><span className="block text-xs text-muted">Next</span>{next.name}</Link> : <span />}
        </nav>
      </article>
    );
  } catch (e) {
    if (e instanceof DocsError && e.status === 404) notFound();
    return <ErrorState title="Couldn't load this page" message={(e as Error).message} href={docHref(tech, path)} />;
  }
}
