"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import type { PostedJob } from "@/lib/data";

interface Props {
  job: PostedJob;
  onClose: () => void;
}

export function ContactarModal({ job, onClose }: Props) {
  const [precio, setPrecio] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  async function handleEnviar() {
    if (!precio) return;
    setLoading(true);

    await supabase.from("propuestas").insert({
      publicacion_id: job.id,
      precio: Number(precio),
    });

    setLoading(false);
    setEnviado(true);
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
        {/* Foto */}
        <div className="relative h-52 w-full bg-ink-100">
          <Image src={job.photo} alt={job.title} fill sizes="640px" className="object-cover" />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {!enviado ? (
            <>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-sv-dark">{job.postedBy}</span>
                <span className="text-ink-300">·</span>
                <span className="text-ink-400">{job.zone}</span>
                <span className="ml-auto rounded-full bg-zap-100 px-2.5 py-0.5 text-xs font-medium text-sv-olive">
                  {job.categorySlug}
                </span>
              </div>

              <h2 className="display mt-3 text-2xl leading-snug">{job.title}</h2>
              <p className="mt-2 text-sm text-ink-400 leading-relaxed">{job.description}</p>

              <div className="my-5 border-t border-zap-100" />

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
                <button onClick={onClose} className="btn-ghost flex-1">
                  Cancelar
                </button>
                <button
                  onClick={handleEnviar}
                  disabled={!precio || loading}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  {loading ? "Enviando…" : "Enviar propuesta"}
                </button>
              </div>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sv-primary/10 text-3xl">
                ✓
              </div>
              <h2 className="display mt-4 text-2xl text-sv-dark">¡Propuesta enviada!</h2>
              <p className="mt-2 text-sm text-ink-400">
                Le avisamos a <strong>{job.postedBy}</strong> que ofrecés resolver esto por{" "}
                <strong>${Number(precio).toLocaleString("es-AR")}</strong>.
              </p>
              <button onClick={onClose} className="btn-primary mt-6 w-full">
                Volver al marketplace
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
