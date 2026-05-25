"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CATEGORIES, type PostedJob } from "@/lib/data";
import { CategoryArt } from "./CategoryArt";

interface Props {
  job: PostedJob;
  onClose: () => void;
}

export function ContactarModal({ job, onClose }: Props) {
  const router = useRouter();
  const [precio, setPrecio] = useState("");
  const [loading, setLoading] = useState(false);

  const cat = CATEGORIES.find((c) => c.slug === job.categorySlug);
  const hue = cat?.hue ?? 180;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  async function handleEnviar() {
    if (!precio) return;
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    const meta = user?.user_metadata;
    const nombrePro = [meta?.nombre, meta?.apellido].filter(Boolean).join(" ") || null;

    await supabase.from("propuestas").insert({
      publicacion_id: job.id,
      precio: Number(precio),
      profesional_id: user?.id ?? null,
      nombre_profesional: nombrePro,
      profesional_email: user?.email ?? null,
      profesional_telefono: meta?.telefono ?? null,
      profesional_zona: meta?.zona ?? null,
      profesional_dni: meta?.dni ?? null,
      titulo: job.title,
      descripcion: job.description,
      zona: job.zone,
      categoria: job.categorySlug,
      foto: job.photo,
      demandante: job.postedBy,
    });

    setLoading(false);
    router.push("/mis-consultas");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CategoryArt header */}
        <div className="relative h-52 w-full">
          <CategoryArt icon={cat?.icon ?? "🔧"} hue={hue} className="h-full w-full" />

          {/* Category badge */}
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/40 bg-white/30 px-3 py-1 text-xs font-medium text-sv-dark backdrop-blur-md">
            {cat?.icon} {cat?.name ?? job.categorySlug}
          </span>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm hover:bg-black/40"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-ink-400">
            <span className="font-medium text-sv-dark">{job.postedBy}</span>
            <span>·</span>
            <span>{job.zone}</span>
            <span>·</span>
            <span>{job.postedAgo}</span>
          </div>

          <h2 className="display mt-2 text-xl leading-snug">{job.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-400">{job.description}</p>

          <div className="my-5 border-t border-ink-100" />

          <div>
            <label className="label">¿Cuánto cobrás por la primera consulta para validar el problema?</label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-ink-400">$</span>
              <input
                type="number"
                min="0"
                placeholder="15000"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="field pl-7"
              />
            </div>
            <p className="mt-1 text-xs text-ink-400">
              El demandante verá este precio antes de aceptar.
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleEnviar}
              disabled={!precio || loading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {loading ? "Enviando…" : "Enviar propuesta"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
