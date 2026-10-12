"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Brand from "./Brand";
import { EmptyArt } from "./Art";
import type { TechLite } from "@/lib/url";

export default function SiteHeader({ techs, extraAction }: { techs: TechLite[]; extraAction?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen(true); }
      if (e.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", f);
    return () => removeEventListener("keydown", f);
  }, []);
  useEffect(() => { if (open) { setQ(""); ref.current?.focus(); } }, [open]);
  const n = q.trim().toLowerCase();
  const list = (n ? techs.filter((t) => t.name.toLowerCase().includes(n) || t.base.includes(n)) : techs).slice(0, 40);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-line bg-bg px-4">
        <Brand />
        <nav className="ml-6 hidden items-center gap-5 sm:flex">
           <Link href="/docs" prefetch={false} className="text-sm text-muted transition-colors hover:text-ink">Docs</Link>
           <Link href="/cheatsheets" prefetch={false} className="text-sm text-muted transition-colors hover:text-ink">Cheat Sheets</Link>
           <Link href="/compare" prefetch={false} className="text-sm text-muted transition-colors hover:text-ink">Compare</Link>
           <Link href="/blog" prefetch={false} className="text-sm text-muted transition-colors hover:text-ink">Blog</Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          {extraAction}
          <button onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label="Search frameworks"
            className="flex h-9 items-center gap-2 rounded-md border border-line px-3 text-sm text-muted transition-colors hover:border-accent sm:w-72">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><circle cx="7" cy="7" r="5" /><path d="M11 11l3.5 3.5" /></svg>
            <span className="hidden sm:inline">Search frameworks</span>
            <kbd className="ml-auto hidden rounded border border-line px-1.5 font-mono text-[10px] sm:block">⌘K</kbd>
          </button>
        </div>
      </header>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Search frameworks" className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 p-4 pt-[12vh]"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="w-full max-w-lg rounded-lg border border-line bg-bg shadow-xl">
            <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search frameworks and languages" aria-label="Search frameworks"
              className="h-12 w-full rounded-t-lg border-b border-line bg-bg px-4 text-sm placeholder:text-muted" />
            {list.length ? (
              <ul className="max-h-80 overflow-y-auto p-1">
                {list.map((t) => (
                  <li key={t.base}><Link href={`/docs/${t.slug}`} prefetch={false} onClick={() => setOpen(false)}
                    className="flex justify-between rounded px-3 py-2 text-sm hover:bg-subtle focus-visible:bg-subtle">
                    <span>{t.name}</span><span className="font-mono text-xs text-muted">{t.label}</span></Link></li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-2 p-8 text-sm text-muted"><EmptyArt />No framework matches “{q}”. Check the spelling or try a shorter name.</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
