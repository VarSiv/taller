"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import { CategoryArt } from "@/components/CategoryArt";

type Propuesta = {
  id: string;
  precio: number;
  titulo: string | null;
  zona: string | null;
  categoria: string | null;
  demandante: string | null;
  estado: string | null;
  codigo_pago: string | null;
  created_at: string;
};

type Tab = "todas" | "pendiente" | "aceptada" | "rechazada";

const ESTADO_MAP: Record<string, { label: string; cls: string }> = {
  pendiente: { label: "Pendiente", cls: "bg-amber-100 text-amber-700" },
  aceptada:  { label: "Aceptada",  cls: "bg-sv-primary/10 text-sv-olive" },
  rechazada: { label: "Rechazada", cls: "bg-rose-100 text-rose-700" },
};

function StatusPill({ estado }: { estado: string }) {
  const s = ESTADO_MAP[estado] ?? ESTADO_MAP.pendiente;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold ${s.cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {s.label}
    </span>
  );
}

function MiPropuestaCard({ p }: { p: Propuesta }) {
  const cat = CATEGORIES.find((c) => c.slug === p.categoria);
  const estado = p.estado ?? "pendiente";

  return (
    <div className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-[0_1px_2px_rgba(40,63,59,0.04)]">
      <CategoryArt
        icon={cat?.icon ?? "🔧"}
        hue={cat?.hue ?? 180}
        className="h-16 w-16 shrink-0 rounded-2xl"
      />

      <div className="flex-1 min-w-0">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <StatusPill estado={estado} />
          <span className="text-[11.5px] text-ink-400">
            {cat?.name} · {p.zona} · {new Date(p.created_at).toLocaleDateString("es-AR")}
          </span>
        </div>

        <h3 className="display mt-1 text-[17px] leading-snug text-sv-dark">
          {p.titulo ?? "Consulta"}
        </h3>
        <div className="mt-1 text-[12.5px] text-ink-400">
          Demandante:{" "}
          <span className="font-medium text-sv-dark">{p.demandante ?? "—"}</span>
        </div>

        {estado === "aceptada" && (
          <div className="mt-3 space-y-2">
            <div className="inline-flex items-center gap-2 rounded-lg border border-sv-primary/15 bg-sv-primary/8 px-3 py-2 text-xs font-medium text-sv-olive">
              <span>✓</span>
              Aceptada — coordiná con el demandante
            </div>
            {p.codigo_pago && (
              <div className="rounded-xl border border-sv-primary/20 bg-sv-primary/5 p-3">
                <p className="text-[10.5px] font-semibold uppercase tracking-wide text-sv-olive">
                  Tu código de pago
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-500">
                  Enviáselo al demandante por WhatsApp para confirmar el cobro:
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="font-display text-3xl font-bold tracking-[0.2em] text-sv-dark">
                    {p.codigo_pago}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {estado === "rechazada" && (
          <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700">
              <span>✕</span>
              Propuesta rechazada
            </div>
            <p className="mt-0.5 text-[11.5px] text-rose-500">
              El demandante no eligió tu propuesta. La consulta ya fue cerrada.
            </p>
          </div>
        )}
      </div>

      {/* Price — oculto si fue rechazada */}
      {estado !== "rechazada" && (
        <div className="shrink-0 flex flex-col items-end gap-1">
          <div className="font-display text-[22px] font-semibold leading-none tracking-tight text-sv-dark">
            ${Number(p.precio).toLocaleString("es-AR")}
          </div>
          <div className="text-[11px] text-ink-400">tu propuesta</div>
        </div>
      )}
    </div>
  );
}

function statBorder(i: number) {
  const cls: string[] = ["border-ink-100"];
  if (i % 2 === 1) cls.push("border-l");
  if (i >= 2) cls.push("border-t", "sm:border-t-0");
  if (i > 0) cls.push("sm:border-l");
  return cls.join(" ");
}

export function OferenteView({
  propuestas,
  nombre,
  apellido,
  email,
}: {
  propuestas: Propuesta[];
  nombre?: string;
  apellido?: string;
  email?: string;
}) {
  const [tab, setTab] = useState<Tab>("todas");

  const displayName = [nombre, apellido].filter(Boolean).join(" ") || email || "Profesional";
  const initials =
    nombre && apellido
      ? `${nombre[0]}${apellido[0]}`.toUpperCase()
      : nombre
      ? nombre.slice(0, 2).toUpperCase()
      : "P";

  const getEstado = (p: Propuesta) => p.estado ?? "pendiente";

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "todas",     label: "Todas",      count: propuestas.length },
    { id: "pendiente", label: "Pendientes", count: propuestas.filter((p) => getEstado(p) === "pendiente").length },
    { id: "aceptada",  label: "Aceptadas",  count: propuestas.filter((p) => getEstado(p) === "aceptada").length },
    { id: "rechazada", label: "Rechazadas", count: propuestas.filter((p) => getEstado(p) === "rechazada").length },
  ];

  const filtered = tab === "todas" ? propuestas : propuestas.filter((p) => getEstado(p) === tab);

  const stats = [
    { value: propuestas.length, label: "Enviadas", accent: false },
    { value: propuestas.filter((p) => getEstado(p) === "aceptada").length, label: "Aceptadas", accent: true },
    { value: propuestas.filter((p) => getEstado(p) === "pendiente").length, label: "Pendientes", accent: false },
    { value: propuestas.filter((p) => getEstado(p) === "rechazada").length, label: "Rechazadas", accent: false },
  ];

  if (propuestas.length === 0) {
    return (
      <div className="card p-10 text-center">
        <div className="text-4xl">🔧</div>
        <h3 className="display mt-3 text-2xl">Todavía no enviaste propuestas</h3>
        <p className="mt-2 text-ink-400">
          Cuando contactes a un demandante, tus propuestas van a aparecer acá.
        </p>
        <Link href="/" className="btn-primary mt-6">
          Ver consultas disponibles
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Profile header */}
      <div className="flex items-center gap-5 rounded-2xl border border-ink-100 bg-white p-6 shadow-[0_1px_2px_rgba(40,63,59,0.04)]">
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sv-dark to-sv-primary font-display text-3xl font-semibold text-white">
          {initials}
        </span>
        <div className="min-w-0">
          <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
            <h1 className="display text-2xl">{displayName}</h1>
            <span className="rounded-full bg-sv-primary/15 px-2.5 py-1 text-[11.5px] font-semibold text-sv-olive">
              Oferente
            </span>
          </div>
          {email && <p className="text-sm text-ink-400">✉ {email}</p>}
        </div>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-ink-100 bg-white sm:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`p-5 ${statBorder(i)}`}>
            <div
              className={`font-display text-[26px] leading-none tracking-tight sm:text-[28px] ${
                s.accent ? "text-sv-primary" : "text-sv-dark"
              }`}
            >
              {s.value}
            </div>
            <div className="mt-1.5 text-xs text-ink-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Section */}
      <div>
        <h2 className="display mb-3.5 text-xl sm:text-[22px]">Mis propuestas</h2>

        {/* Tab bar */}
        <div className="flex border-b border-ink-100">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`mr-4 inline-flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition ${
                tab === t.id
                  ? "border-sv-primary text-sv-dark"
                  : "border-transparent text-ink-400 hover:text-sv-dark"
              }`}
            >
              {t.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
                  tab === t.id ? "bg-sv-primary text-white" : "bg-ink-100 text-ink-400"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-200 p-12 text-center">
              <div className="text-3xl opacity-60">📭</div>
              <h4 className="display mt-2.5 text-base">Nada por acá</h4>
              <p className="mt-1 text-sm text-ink-400">
                No tenés propuestas en este estado.
              </p>
            </div>
          ) : (
            filtered.map((p) => <MiPropuestaCard key={p.id} p={p} />)
          )}
        </div>
      </div>
    </div>
  );
}
