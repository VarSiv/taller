"use client";

import { useState } from "react";
import Link from "next/link";
import { type Category } from "@/lib/data";

type Props = {
  categories: Category[];
  zones: string[];
  cat: string;
  zona: string;
  q: string;
  activeCount: number;
};

function buildQuery(p: { q?: string; cat?: string; zona?: string }) {
  const sp = new URLSearchParams();
  if (p.q) sp.set("q", p.q);
  if (p.cat) sp.set("cat", p.cat);
  if (p.zona) sp.set("zona", p.zona);
  const s = sp.toString();
  return `/${s ? `?${s}` : ""}`;
}

export function FilterDropdown({ categories, zones, cat, zona, q, activeCount }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-sv-primary bg-white px-4 py-2 text-sm font-medium text-sv-dark hover:bg-zap-50 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Filtros
        {activeCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sv-primary text-[11px] font-semibold text-white">
            {activeCount}
          </span>
        )}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <>
          {/* Overlay para cerrar al hacer click afuera */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          <div className="animate-dropdown absolute left-0 top-full z-20 mt-2 w-[480px] max-w-[calc(100vw-2rem)] rounded-2xl border border-zap-100 bg-white p-5 shadow-lg">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Categorías */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sv-olive">
                  Categoría
                </p>
                <div className="space-y-1">
                  <Link
                    href={buildQuery({ q, zona })}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${!cat ? "bg-sv-dark text-white" : "text-sv-dark hover:bg-zap-50"}`}
                  >
                    Todas
                  </Link>
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={buildQuery({ q, zona, cat: c.slug })}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors ${cat === c.slug ? "bg-sv-dark text-white" : "text-sv-dark hover:bg-zap-50"}`}
                    >
                      <span>{c.icon} {c.name}</span>
                      <span className={cat === c.slug ? "text-zap-300" : "text-ink-400"}>{c.count}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Zonas */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sv-olive">
                  Zona
                </p>
                <div className="space-y-1">
                  {zones.map((z) => {
                    const active = zona === z;
                    return (
                      <Link
                        key={z}
                        href={buildQuery({ q, cat, zona: active ? "" : z })}
                        onClick={() => setOpen(false)}
                        className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${active ? "bg-sv-dark text-white" : "text-sv-dark hover:bg-zap-50"}`}
                      >
                        {z}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Limpiar filtros */}
            {activeCount > 0 && (
              <div className="mt-4 border-t border-zap-100 pt-4">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="text-sm text-sv-primary hover:text-sv-olive underline underline-offset-4"
                >
                  Limpiar filtros
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
