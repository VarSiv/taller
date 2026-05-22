"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PostedJob } from "@/lib/data";
import { ContactarModal } from "./ContactarModal";

interface Props {
  jobs: PostedJob[];
  supabaseJobIds: string[];
  esProfesional: boolean;
  sinSesion: boolean;
}

export function MarketplaceGrid({ jobs, supabaseJobIds, esProfesional, sinSesion }: Props) {
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Tarjeta fija para publicar */}
        <Link
          href="/publicar"
          className="card flex min-h-[280px] flex-col items-center justify-center gap-3 overflow-hidden border-2 border-dashed border-sv-primary bg-zap-50 p-6 text-center transition hover:border-sv-olive hover:bg-zap-100"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sv-primary text-2xl text-white">
            +
          </div>
          <div>
            <p className="font-semibold text-sv-dark">Publicar mi problema</p>
            <p className="mt-1 text-xs text-ink-400">Los técnicos te mandan presupuesto en minutos</p>
          </div>
        </Link>

        {jobs.map((j) => (
          <JobCard
            key={j.id}
            job={j}
            isNew={supabaseJobIds.includes(j.id)}
            esProfesional={esProfesional}
            sinSesion={sinSesion}
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
  isNew,
  esProfesional,
  sinSesion,
  onContactar,
}: {
  job: PostedJob;
  isNew: boolean;
  esProfesional: boolean;
  sinSesion: boolean;
  onContactar: () => void;
}) {
  return (
    <div className={`card overflow-hidden ${isNew ? "ring-2 ring-sv-primary" : ""}`}>
      <div className="relative h-44 w-full bg-ink-100">
        <Image
          src={job.photo}
          alt={job.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
        {isNew && (
          <span className="absolute left-2 top-2 rounded-full bg-sv-primary px-2 py-0.5 text-[11px] font-semibold text-white">
            Nueva
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-sv-dark">
          <span>{job.postedBy}</span>
          <span className="text-ink-300">·</span>
          <span className="text-ink-400">{job.zone}</span>
        </div>
        <p className="mt-2 line-clamp-3 text-sm text-ink-400">{job.description}</p>

        {sinSesion && (
          <Link href="/ingresar" className="btn-primary mt-4 block w-full text-center">
            Ingresar para contactar
          </Link>
        )}
        {!sinSesion && esProfesional && (
          <button type="button" onClick={onContactar} className="btn-primary mt-4 w-full">
            Contactar
          </button>
        )}
      </div>
    </div>
  );
}
