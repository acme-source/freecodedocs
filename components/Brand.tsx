import Link from "next/link";
export default function Brand() {
  return (
    <Link href="/" prefetch={false} className="group flex items-center gap-2 font-semibold tracking-tight">
      <span aria-hidden className="grid size-7 place-items-center rounded-md bg-ink font-mono text-[11px] text-bg transition-transform group-hover:-rotate-3">{"</>"}</span>
      FreeCodeDocs
    </Link>
  );
}
