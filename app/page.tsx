import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import { getTechs } from "@/lib/devdocs";
import { groupTechs } from "@/lib/url";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: { absolute: "FreeCodeDocs — free developer documentation" },
  description: "Documentation for hundreds of languages, frameworks and libraries in one fast, searchable, free reader.",
};

const POPULAR = ["React", "Python", "TypeScript", "Node.js", "Django", "Vue.js", "Rust", "Go", "PostgreSQL", "Docker", "Tailwind CSS", "Next.js", "Kotlin", "Redis", "Bash", "Git"];
const FEATURES = [
  { icon: "book", title: "Every technology in one place", text: "Languages, frameworks and libraries side by side, so you stop hunting for the right site." },
  { icon: "search", title: "Search that keeps up", text: "Jump to any framework with ⌘K, then press / to search every page inside a documentation set." },
  { icon: "layers", title: "Pick your version", text: "Each framework appears once. Switch versions from the sidebar without losing your place in the library." },
  { icon: "code", title: "Code you can copy", text: "Highlighted code blocks keep their label and copy button in view, even on narrow screens." },
  { icon: "phone", title: "Built for every screen", text: "A fixed navbar and a slide-in section drawer keep navigation one tap away on mobile." },
  { icon: "bolt", title: "Fast by design", text: "Pages are fetched on the server, cleaned, and cached, so repeat visits load quickly." },
] as const;
const STEPS = [
  { t: "Pick a technology", d: "Browse the library or press ⌘K and type a name." },
  { t: "Find the page", d: "Use the sections sidebar, or press / to search within that documentation." },
  { t: "Read and copy", d: "Clean pages, previous and next links, and code you can copy in one click." },
];

function Mock() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border border-line bg-bg shadow-[0_20px_50px_-24px_rgba(20,23,31,0.35)]">
        <div className="flex items-center gap-1.5 border-b border-line bg-subtle px-4 py-3">
          {[0, 1, 2].map((i) => <span key={i} className="size-2.5 rounded-full bg-line" />)}
          <span className="ml-3 font-mono text-xs text-muted">freecodedocs.com/docs/react</span>
        </div>
        <div className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[9rem_1fr]">
          <div className="space-y-2.5 border-r border-line p-4">
            {[70, 90, 55, 80, 65].map((w, i) => <div key={i} className={`h-2 rounded ${i === 1 ? "bg-accent/70" : "bg-line"}`} style={{ width: `${w}%` }} />)}
          </div>
          <div className="min-w-0 p-4 font-mono text-[11px] leading-6 sm:text-xs sm:leading-7">
            <span className="type" style={{ "--d": "0.3s" } as React.CSSProperties}><span className="hljs-keyword">import</span> {"{ useState }"} <span className="hljs-keyword">from</span> <span className="hljs-string">"react"</span>;</span>
            <span className="type" style={{ "--d": "1.4s" } as React.CSSProperties}><span className="hljs-keyword">function</span> <span className="hljs-title">Counter</span>() {"{"}</span>
            <span className="type" style={{ "--d": "2.5s" } as React.CSSProperties}>{"  "}<span className="hljs-keyword">const</span> [n, setN] = <span className="hljs-title">useState</span>(<span className="hljs-number">0</span>);</span>
            <span className="type" style={{ "--d": "3.6s" } as React.CSSProperties}>{"  "}<span className="hljs-keyword">return</span> {"<button>{n}</button>"};</span>
            <span className="type" style={{ "--d": "4.7s" } as React.CSSProperties}>{"}"}<span className="caret ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-accent" /></span>
          </div>
        </div>
      </div>
      {[["search", "-right-3 -top-5", "0s"], ["layers", "-left-4 bottom-10", "1.2s"], ["bolt", "-right-4 bottom-2", "2.4s"]].map(([n, pos, d]) => (
        <span key={n} style={{ animationDelay: d }} className={`float absolute ${pos} hidden size-11 place-items-center rounded-lg border border-line bg-bg text-accent shadow-sm sm:grid`}>
          <Icon name={n as "search"} />
        </span>
      ))}
    </div>
  );
}

export default async function Home() {
  let groups: ReturnType<typeof groupTechs> = [];
  let versions = 0;
  try { const t = await getTechs(); groups = groupTechs(t); versions = t.length; } catch { }
  const stats = [
    [groups.length ? `${groups.length}` : "Hundreds", "languages and frameworks"],
    [versions ? `${versions}` : "Many", "documentation versions"],
    ["Free", "no account, no sign-up"],
  ];
  const chips = [...POPULAR, ...POPULAR];

  return (
    <>
      <noscript><style>{".reveal{opacity:1!important;transform:none!important}.bar{transform:none!important}.type{width:100%!important}"}</style></noscript>
      <SiteHeader techs={groups} />
      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-10">
          <div className="dots absolute inset-0 -z-10" aria-hidden />
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">Every developer doc.<br />One calm place.</h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">FreeCodeDocs brings documentation for hundreds of languages, frameworks and libraries into one fast, searchable reader. It’s free, with no accounts and no clutter.</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/docs" prefetch={false} className="group inline-flex h-11 items-center gap-2 rounded-md bg-ink px-5 text-sm font-medium text-bg transition-colors hover:bg-accent">
                  Browse documentation <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a href="#how" className="inline-flex h-11 items-center rounded-md border border-line px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent">How it works</a>
              </div>
              <p className="mt-4 text-sm text-muted">Tip: press <kbd className="rounded border border-line px-1.5 font-mono text-xs">⌘K</kbd> anywhere to jump to a framework.</p>
            </div>
            <Mock />
          </div>
        </section>

        <section aria-label="Popular technologies" className="overflow-hidden border-y border-line bg-subtle py-4">
          <div className="marquee max-w-6xl mx-auto" aria-hidden>
            {chips.map((n, i) => (
              <span key={i} className="mx-2 flex items-center gap-2 rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm">
                <span className="font-mono text-xs font-semibold text-accent">{n.slice(0, 2)}</span>{n}
              </span>
            ))}
          </div>
          <p className="sr-only">Includes {POPULAR.join(", ")} and many more.</p>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-10">
          <Reveal className="grid divide-y divide-line rounded-lg border border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map(([n, l]) => (
              <div key={l} className="p-6"><div className="text-3xl font-semibold tracking-tight">{n}</div><div className="mt-1 text-sm text-muted">{l}</div></div>
            ))}
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-10">
          <Reveal><h2 className="max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">Everything you need to read docs, nothing you don’t.</h2></Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 80} className="group bg-bg p-6">
                <span className="grid size-10 place-items-center rounded-md bg-subtle text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]"><Icon name={f.icon} /></span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="how" className="border-t border-line bg-subtle px-5 py-20 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal><h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">From question to answer in three steps.</h2></Reveal>
            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.t}>
                  <Reveal delay={i * 120}>
                    <div className="h-0.5 w-full bg-line"><div className="bar h-full bg-accent" /></div>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="grid size-7 place-items-center rounded-full bg-ink font-mono text-xs text-bg">{i + 1}</span>
                      <h3 className="font-semibold">{s.t}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-10">
          <Reveal className="mx-auto max-w-6xl rounded-xl bg-ink px-6 py-14 text-center text-bg sm:px-10">
            <h2 className="mx-auto max-w-lg text-2xl font-semibold tracking-tight sm:text-3xl">Start reading in seconds.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-bg/70">Open the library, pick a framework, and get to the page you need.</p>
           <Link href="/docs" prefetch={false} className="group mt-7 inline-flex h-11 items-center gap-2 rounded-md bg-bg px-5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5">
             Open the library <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-0.5" />
           </Link>
          </Reveal>
        </section>
      </main>
    </>
  );
}
