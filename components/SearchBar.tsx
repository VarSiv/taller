"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const POPULAR = [
  "destape de cocina",
  "instalar split",
  "pérdida de gas",
  "tablero saltó",
  "abrir puerta",
];

export function SearchBar({ size = "lg" }: { size?: "md" | "lg" }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!q.trim()) return router.push("/buscar");
    router.push(`/buscar?q=${encodeURIComponent(q.trim())}`);
  }

  const padY = size === "lg" ? "py-4" : "py-3";
  const fontSize = size === "lg" ? "text-base" : "text-sm";

  return (
    <div>
      <form
        onSubmit={submit}
        className={`flex w-full items-center gap-1 rounded-full border border-ink-200 bg-white p-1.5 shadow-[0_1px_0_rgba(14,17,13,0.04)] focus-within:border-ink-900`}
      >
        <div className="pl-4 text-ink-500">
          <Magnify />
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="¿Qué necesitás resolver? Plomero, instalar split, tablero…"
          className={`min-w-0 flex-1 bg-transparent px-2 ${padY} ${fontSize} placeholder:text-ink-400 focus:outline-none`}
        />
        <button type="submit" className="btn-primary">
          Buscar
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="text-xs text-ink-500">Populares:</span>
        {POPULAR.map((p) => (
          <button
            key={p}
            onClick={() => {
              setQ(p);
              router.push(`/buscar?q=${encodeURIComponent(p)}`);
            }}
            className="text-xs text-ink-700 underline decoration-ink-300 underline-offset-2 hover:decoration-ink-900"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

function Magnify() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M14 14l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
