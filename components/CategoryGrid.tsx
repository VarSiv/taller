import Link from "next/link";
import type { Category } from "@/lib/data";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/categoria/${c.slug}`}
          className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-4 transition hover:border-ink-300"
        >
          <div
            className={`absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br ${c.accent} opacity-80 transition-transform group-hover:scale-110`}
          />
          <div className="relative">
            <div className="text-2xl">{c.icon}</div>
            <div className="mt-2 text-sm font-semibold text-ink-950">
              {c.name}
            </div>
            <div className="text-xs text-ink-500">{c.blurb}</div>
            <div className="mt-3 text-[11px] text-ink-400">
              {c.count} profesionales
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
