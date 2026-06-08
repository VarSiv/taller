"use client";

import { useState } from "react";
import Image from "next/image";
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
  photo: string | null;
};

type Tab = "todas" | "pendiente" | "aceptada" | "rechazada";

const ESTADO_MAP: Record<string, { label: string; cls: string; darkCls: string }> = {
  pendiente: { label: "Pendiente", cls: "bg-amber-100 text-amber-700",          darkCls: "bg-amber-400/15 text-amber-300" },
  aceptada:  { label: "Aceptada",  cls: "bg-sv-primary/10 text-sv-olive",       darkCls: "bg-zap-500/20 text-zap-300" },
  rechazada: { label: "Rechazada", cls: "bg-rose-100 text-rose-700",            darkCls: "bg-rose-500/15 text-rose-400" },
};

function StatusPill({ estado, dark }: { estado: string; dark: boolean }) {
  const s = ESTADO_MAP[estado] ?? ESTADO_MAP.pendiente;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold ${dark ? s.darkCls : s.cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {s.label}
    </span>
  );
}

function MiPropuestaCard({ p, dark }: { p: Propuesta; dark: boolean }) {
  const cat = CATEGORIES.find((c) => c.slug === p.categoria);
  const estado = p.estado ?? "pendiente";

  const cardCls = dark
    ? "rounded-2xl border border-white/10 bg-[#162420] p-5"
    : "rounded-2xl border border-ink-100 bg-white p-5 shadow-[0_1px_2px_rgba(40,63,59,0.04)]";

  const titleCls  = dark ? "text-zap-50"      : "text-sv-dark";
  const metaCls   = dark ? "text-zap-400"     : "text-ink-400";
  const priceCls  = dark ? "text-zap-50"      : "text-sv-dark";
  const labelCls  = dark ? "text-zap-500"     : "text-ink-400";
  const demCls    = dark ? "text-zap-200"     : "text-sv-dark";

  const priceBlock = estado !== "rechazada" && (
    <>
      <div className={`font-display text-[22px] font-semibold leading-none tracking-tight ${priceCls}`}>
        ${Number(p.precio).toLocaleString("es-AR")}
      </div>
      <div className={`text-[11px] ${labelCls}`}>tu propuesta</div>
    </>
  );

  return (
    <div className={cardCls}>
      {/* Fila superior: thumb + contenido + precio (desktop) */}
      <div className="flex gap-4">
        {p.photo ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
            <Image src={p.photo} alt="" fill sizes="64px" className="object-cover" />
          </div>
        ) : (
          <CategoryArt
            icon={cat?.icon ?? "🔧"}
            hue={cat?.hue ?? 180}
            className="h-16 w-16 shrink-0 rounded-2xl"
          />
        )}

        <div className="flex flex-1 min-w-0 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill estado={estado} dark={dark} />
            <span className={`text-[11.5px] ${metaCls}`}>
              {cat?.name} · {p.zona} · {new Date(p.created_at).toLocaleDateString("es-AR")}
            </span>
          </div>

          <h3 className={`display line-clamp-2 break-words text-[17px] leading-snug ${titleCls}`}>
            {p.titulo ?? "Consulta"}
          </h3>
          <div className={`text-[12.5px] ${metaCls}`}>
            Demandante:{" "}
            <span className={`font-medium break-words ${demCls}`}>{p.demandante ?? "—"}</span>
          </div>

          {/* Precio en mobile — debajo del título */}
          {priceBlock && (
            <div className="mt-2 flex items-baseline gap-1.5 sm:hidden">
              {priceBlock}
            </div>
          )}
        </div>

        {/* Precio en desktop — columna derecha */}
        {priceBlock && (
          <div className="hidden sm:flex shrink-0 flex-col items-end gap-1">
            {priceBlock}
          </div>
        )}
      </div>

      {/* Mensajes de estado */}
      {estado === "aceptada" && (
        <div className="mt-3 space-y-2">
          {p.codigo_pago && (
            <div className={`rounded-xl border p-3 ${dark ? "border-zap-500/20 bg-zap-500/5" : "border-sv-primary/20 bg-sv-primary/5"}`}>
              <p className={`text-[10.5px] font-semibold uppercase tracking-wide ${dark ? "text-zap-400" : "text-sv-olive"}`}>
                Tu código de pago
              </p>
              <p className={`mt-1 text-[12px] leading-relaxed ${dark ? "text-zap-300" : "text-ink-500"}`}>
                Enviáselo al demandante por WhatsApp para confirmar el cobro:
              </p>
              <div className="mt-2">
                <span className={`font-display text-3xl font-bold tracking-[0.2em] ${dark ? "text-zap-50" : "text-sv-dark"}`}>
                  {p.codigo_pago}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {estado === "rechazada" && (
        <div className={`mt-3 rounded-xl border px-3 py-2.5 ${dark ? "border-rose-500/20 bg-rose-500/10" : "border-rose-200 bg-rose-50"}`}>
          <div className={`flex items-center gap-2 text-xs font-semibold ${dark ? "text-rose-400" : "text-rose-700"}`}>
            <span>✕</span>
            Propuesta rechazada
          </div>
          <p className={`mt-0.5 text-[11.5px] ${dark ? "text-rose-400/70" : "text-rose-500"}`}>
            El demandante no eligió tu propuesta. La consulta ya fue cerrada.
          </p>
        </div>
      )}
    </div>
  );
}

function statBorder(i: number) {
  const cls: string[] = [];
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
  const dark = true; // oferente siempre dark

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
    { value: propuestas.length,                                                          label: "Enviadas",   accent: false },
    { value: propuestas.filter((p) => getEstado(p) === "aceptada").length,               label: "Aceptadas",  accent: true  },
    { value: propuestas.filter((p) => getEstado(p) === "pendiente").length,              label: "Pendientes", accent: false },
    { value: propuestas.filter((p) => getEstado(p) === "rechazada").length,              label: "Rechazadas", accent: false },
  ];

  if (propuestas.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#162420] p-10 text-center">
        <div className="text-4xl">🔧</div>
        <h3 className="display mt-3 text-2xl text-zap-50">Todavía no enviaste propuestas</h3>
        <p className="mt-2 text-zap-400">
          Cuando contactes a un demandante, tus propuestas van a aparecer acá.
        </p>
        <Link href="/" className="btn-primary mt-6 inline-block">
          Ver consultas disponibles
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Profile header */}
      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#162420] p-5">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zap-600 to-zap-400 font-display text-2xl font-semibold text-white sm:h-20 sm:w-20 sm:text-3xl">
          {initials}
        </span>
        <div className="min-w-0">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <h1 className="display text-xl text-zap-50 sm:text-2xl">{displayName}</h1>
            <span className="rounded-full bg-zap-500/20 px-2.5 py-1 text-[11.5px] font-semibold text-zap-300">
              Técnico
            </span>
          </div>
          {email && <p className="text-sm text-zap-500">✉ {email}</p>}
        </div>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-[#162420] sm:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`p-5 ${statBorder(i)} border-white/10`}>
            <div className={`font-display text-[26px] leading-none tracking-tight sm:text-[28px] ${s.accent ? "text-zap-300" : "text-zap-50"}`}>
              {s.value}
            </div>
            <div className="mt-1.5 text-xs text-zap-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Section */}
      <div>
        <h2 className="display mb-3.5 text-xl text-zap-50 sm:text-[22px]">Mis propuestas</h2>

        {/* Tab bar — scrollable en mobile para evitar overflow */}
        <div className="no-scrollbar flex overflow-x-auto border-b border-white/10">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`mr-3 inline-flex shrink-0 items-center gap-1.5 border-b-2 pb-3 text-xs font-semibold transition sm:mr-4 sm:gap-2 sm:text-sm ${
                tab === t.id
                  ? "border-zap-400 text-zap-50"
                  : "border-transparent text-zap-500 hover:text-zap-200"
              }`}
            >
              {t.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold sm:text-[11px] ${
                tab === t.id ? "bg-zap-400 text-sv-dark" : "bg-white/10 text-zap-400"
              }`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
              <div className="text-3xl opacity-60">📭</div>
              <h4 className="display mt-2.5 text-base text-zap-50">Nada por acá</h4>
              <p className="mt-1 text-sm text-zap-400">No tenés propuestas en este estado.</p>
            </div>
          ) : (
            filtered.map((p) => <MiPropuestaCard key={p.id} p={p} dark={dark} />)
          )}
        </div>
      </div>
    </div>
  );
}
