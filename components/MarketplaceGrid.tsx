"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PostedJob } from "@/lib/data";
import { CATEGORIES } from "@/lib/data";
import { CategoryArt } from "./CategoryArt";
import { ContactarModal } from "./ContactarModal";

interface Props {
  jobs: PostedJob[];
  supabaseJobIds: string[];
  esProfesional: boolean;
  sinSesion: boolean;
  yaContactadoIds: string[];
}

const URGENCY_LABEL: Record<string, string> = {
  hoy: "Hoy mismo",
  esta_semana: "Esta semana",
  flexible: "Flexible",
};

const URGENCY_STYLE: Record<string, string> = {
  hoy: "bg-rose-100/80 text-rose-700",
  esta_semana: "bg-amber-100/80 text-amber-700",
  flexible: "bg-emerald-100/80 text-emerald-700",
};

export function MarketplaceGrid({ jobs, supabaseJobIds, esProfesional, sinSesion, yaContactadoIds }: Props) {
  const [selected, setSelected] = useState<PostedJob | null>(null);

  if (jobs.length === 0) {
    return (
      <div className="card p-10 text-center">
        <div className="text-2xl">🤷</div>
        <h3 className="display mt-2 text-2xl">Sin resultados</h3>
        <p className="mt-2 text-ink-400">Probá con otro filtro o publicá tu problema directo.</p>
        <Link href="/publicar" className="btn-primary mt-6">
          Publicar mi problema
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Tarjeta publicar — solo demandantes y sin sesión */}
        {!esProfesional && (
          <Link
            href="/publicar"
            className="animate-card group flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-sv-primary/40 bg-gradient-to-b from-zap-50 to-white p-6 text-center"
            style={{ animationDelay: "0ms", transition: "border-color 200ms ease-out, box-shadow 200ms ease-out" }}
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sv-primary/10 text-2xl"
              style={{ transition: "background-color 200ms ease-out, transform 160ms ease-out" }}
            >
              +
            </span>
            <div>
              <p className="font-display font-semibold text-sv-dark">Publicar mi problema</p>
              <p className="mt-1 text-xs text-ink-400">Los técnicos te mandan presupuesto en minutos</p>
            </div>
          </Link>
        )}

        {jobs.map((j, i) => (
          <JobCard
            key={j.id}
            job={j}
            index={!esProfesional ? i + 1 : i}
            isNew={supabaseJobIds.includes(j.id)}
            esProfesional={esProfesional}
            sinSesion={sinSesion}
            yaContactado={yaContactadoIds.includes(j.id)}
            onContactar={() => setSelected(j)}
          />
        ))}
      </div>

      {selected && (
        <ContactarModal job={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

function JobCard({
  job,
  index,
  isNew,
  esProfesional,
  sinSesion,
  yaContactado,
  onContactar,
}: {
  job: PostedJob;
  index: number;
  isNew: boolean;
  esProfesional: boolean;
  sinSesion: boolean;
  yaContactado: boolean;
  onContactar: () => void;
}) {
  const cat = CATEGORIES.find((c) => c.slug === job.categorySlug);
  const hue = cat?.hue ?? 180;
  const urgencyLabel = URGENCY_LABEL[job.urgency] ?? job.urgency;
  const urgencyStyle = URGENCY_STYLE[job.urgency] ?? "bg-ink-100 text-ink-500";

  return (
    <div
      className={`animate-card card flex flex-col overflow-hidden ${isNew ? "ring-2 ring-sv-primary" : ""}`}
      style={{
        animationDelay: `${Math.min(index * 45, 300)}ms`,
        transition: "box-shadow 200ms ease-out",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(14,17,13,0.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
    >
      {/* Header: foto real o arte generativo */}
      <div className="relative h-44 w-full overflow-hidden">
        {job.photo
          ? <Image src={job.photo} alt={job.title} fill sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" className="object-cover" />
          : <CategoryArt icon={cat?.icon ?? "🔧"} hue={hue} className="h-full w-full" />
        }

        {/* Category badge — frosted glass */}
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/40 bg-white/30 px-2.5 py-1 text-xs font-medium text-sv-dark backdrop-blur-md">
          {cat?.icon} {cat?.name ?? job.categorySlug}
        </span>

        {/* Urgency badge */}
        <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm ${urgencyStyle}`}>
          {urgencyLabel}
        </span>

        {/* "Nueva" dot para publicaciones de Supabase */}
        {isNew && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-sv-primary px-2 py-0.5 text-[11px] font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Nueva
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="display line-clamp-2 text-[15px] leading-snug text-sv-dark">
          {job.title}
        </h3>

        <p className="mt-1.5 text-xs text-ink-400">
          {job.postedBy} · {job.zone} · {job.postedAgo}
        </p>

        <p className="mt-2 line-clamp-2 text-sm text-ink-500">{job.description}</p>

        <div className="mt-3 flex items-center gap-2">
          <span className="chip text-[11px]">
            💬 {job.bidsCount} propuesta{job.bidsCount !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="mt-auto pt-4">
          {sinSesion && (
            <Link href="/ingresar" className="btn-outline block w-full text-center text-sm">
              Ingresar para contactar
            </Link>
          )}
          {!sinSesion && esProfesional && !yaContactado && (
            <button type="button" onClick={onContactar} className="btn-primary w-full text-sm">
              Contactar
            </button>
          )}
          {!sinSesion && esProfesional && yaContactado && (
            <div className="w-full rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-center text-xs font-medium text-amber-700">
              Propuesta enviada · esperando respuesta
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
