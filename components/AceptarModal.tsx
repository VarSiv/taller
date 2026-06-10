"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CATEGORIES } from "@/lib/data";
import { CategoryArt } from "./CategoryArt";
import { aceptarPropuesta } from "@/app/mis-consultas/actions";
import { supabase } from "@/lib/supabase";

export type PropuestaParaPago = {
  id: string;
  precio: number;
  nombre_profesional: string | null;
  profesional_id: string;
  publicacion_id: string;
  created_at: string;
};

export type PublicacionParaPago = {
  id: string;
  title: string;
  category_slug: string;
  zone: string;
  photo?: string | null;
};

interface Props {
  propuesta: PropuestaParaPago;
  publicacion: PublicacionParaPago;
  onClose: () => void;
  onPagoExitoso?: () => void;
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  const steps = ["Resumen", "Método de pago", "Procesando", "¡Listo!"];
  return (
    <div className="flex items-center gap-1 px-6 pt-5 pb-4">
      {steps.map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-all duration-500 ${
            i <= step ? "bg-sv-primary" : "bg-ink-200"
          }`}
        />
      ))}
    </div>
  );
}

const DATOS_TRANSFERENCIA = [
  { label: "CVU",    value: "0000003100036596584321" },
  { label: "Alias",  value: "matteo.osunaa" },
  { label: "Número", value: "+541157980934" },
  { label: "Mail",   value: "matteo.osuna@gmail.com" },
];

const COMISION = 4500;

// ─── Step 0: Resumen ──────────────────────────────────────────────────────────
function StepResumen({
  propuesta,
  publicacion,
  cat,
  hue,
  precio,
  comision,
  total,
  onCancelar,
  onContinuar,
}: {
  propuesta: PropuestaParaPago;
  publicacion: PublicacionParaPago;
  cat: ReturnType<typeof CATEGORIES.find>;
  hue: number;
  precio: number;
  comision: number;
  total: number;
  onCancelar: () => void;
  onContinuar: () => void;
}) {
  return (
    <>
      <ProgressBar step={0} />

      {/* Foto de la consulta o CategoryArt */}
      <div className="relative mx-5 h-28 overflow-hidden rounded-2xl">
        {publicacion.photo
          ? <Image src={publicacion.photo} alt={publicacion.title} fill sizes="480px" className="object-cover" />
          : <CategoryArt icon={cat?.icon ?? "🔧"} hue={hue} className="h-full w-full" />
        }
        <button
          type="button"
          onClick={onCancelar}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/25 text-sm text-white backdrop-blur-sm hover:bg-black/40"
        >
          ✕
        </button>
      </div>

      <div className="max-h-[calc(90vh-13rem)] overflow-y-auto px-5 pt-5 pb-6">
        <h2 className="display text-xl text-sv-dark">Revisá antes de pagar</h2>
        <p className="mt-0.5 text-sm text-ink-400">
          Confirmá que esta es la propuesta que querés aceptar.
        </p>

        {/* Locked professional */}
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-ink-100 bg-ink-50 p-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-200 text-lg">
            🔒
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-sv-dark">Profesional disponible</div>
            <div className="text-xs text-ink-400">
              Su contacto se desbloquea al completar el pago
            </div>
          </div>
          <div className="font-display text-xl font-semibold text-sv-dark shrink-0">
            ${precio.toLocaleString("es-AR")}
          </div>
        </div>

        {/* Job */}
        <div className="mt-4 space-y-0.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Trabajo</p>
          <p className="font-display text-base font-semibold leading-snug text-sv-dark">
            {publicacion.title}
          </p>
          <p className="text-xs text-ink-400">
            📍 {publicacion.zone}
            {cat ? ` · ${cat.name}` : ""}
          </p>
        </div>

        {/* Price breakdown */}
        <div className="mt-5 rounded-2xl border border-ink-100 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-500">Primera consulta</span>
            <span className="font-medium text-sv-dark">${precio.toLocaleString("es-AR")}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-ink-500">Comisión de plataforma</span>
            <span className="font-medium text-sv-dark">${comision.toLocaleString("es-AR")}</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-3">
            <span className="font-semibold text-sv-dark">Total a pagar</span>
            <span className="font-display text-2xl font-semibold tracking-tight text-sv-dark">
              ${total.toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        <p className="mt-3 text-center text-[11px] text-ink-400">
          🔒 Pago seguro — SolvIT retiene el monto hasta confirmar el servicio.
        </p>
      </div>

      <div className="flex gap-3 border-t border-ink-100 px-5 py-4">
        <button type="button" onClick={onCancelar} className="btn-ghost flex-1">
          Cancelar
        </button>
        <button type="button" onClick={onContinuar} className="btn-primary flex-1">
          Continuar →
        </button>
      </div>
    </>
  );
}

// ─── Step 1: Transferencia bancaria ───────────────────────────────────────────
function StepPago({
  total,
  isPending,
  onAtras,
  onPagar,
}: {
  total: number;
  isPending: boolean;
  onAtras: () => void;
  onPagar: () => void;
}) {
  const [copiado, setCopiado] = useState<string | null>(null);

  function copiar(value: string, label: string) {
    navigator.clipboard.writeText(value).then(() => {
      setCopiado(label);
      setTimeout(() => setCopiado(null), 2000);
    });
  }

  return (
    <>
      <ProgressBar step={1} />

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pb-4">
        <button
          type="button"
          onClick={onAtras}
          disabled={isPending}
          className="flex h-8 w-8 items-center justify-center rounded-full text-sv-dark hover:bg-ink-50 transition disabled:opacity-40"
        >
          ←
        </button>
        <div>
          <h2 className="display text-lg text-sv-dark">Transferencia bancaria</h2>
          <p className="text-xs text-ink-400">Realizá el pago y luego confirmá</p>
        </div>
      </div>

      <div className="max-h-[calc(90vh-14rem)] overflow-y-auto px-5 pb-2">
        {/* Datos de transferencia */}
        <div className="rounded-2xl border border-ink-100 divide-y divide-ink-100 overflow-hidden">
          {DATOS_TRANSFERENCIA.map((dato) => (
            <div key={dato.label} className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-400">
                  {dato.label}
                </p>
                <p className="mt-0.5 truncate text-sm font-medium text-sv-dark">
                  {dato.value}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copiar(dato.value, dato.label)}
                className="shrink-0 rounded-lg bg-ink-100 px-2.5 py-1 text-[11px] font-semibold text-sv-dark transition hover:bg-ink-200"
              >
                {copiado === dato.label ? "¡Copiado!" : "Copiar"}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-3 text-[11.5px] leading-relaxed text-ink-400">
          Una vez realizada la transferencia por el monto total, tocá <strong className="text-sv-dark">"Confirmar pago"</strong> para desbloquear el contacto del profesional.
        </p>
      </div>

      {/* Bottom */}
      <div className="border-t border-ink-100 px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-ink-500">Total a transferir</span>
          <span className="font-display text-2xl font-semibold tracking-tight text-sv-dark">
            ${total.toLocaleString("es-AR")}
          </span>
        </div>
        <button
          type="button"
          onClick={onPagar}
          disabled={isPending}
          className="btn-primary w-full disabled:opacity-50"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Procesando…
            </span>
          ) : (
            `Confirmar pago $${total.toLocaleString("es-AR")}`
          )}
        </button>
        <p className="mt-2 text-center text-[11px] text-ink-400">
          Al confirmar aceptás los{" "}
          <span className="text-sv-primary">términos del servicio</span> de SolvIT.
        </p>
      </div>
    </>
  );
}

// ─── Step 3: Desbloqueado ─────────────────────────────────────────────────────
function ContactRow({
  label,
  value,
  action,
}: {
  label: string;
  value: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border-t border-ink-100 px-4 py-3 first:border-t-0">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium text-sv-dark">{value}</p>
      </div>
      {action}
    </div>
  );
}

function StepDesbloqueado({
  nombre,
  profesionalId,
  publicacion,
  cat,
  onClose,
}: {
  nombre: string;
  profesionalId: string;
  publicacion: PublicacionParaPago;
  cat: ReturnType<typeof CATEGORIES.find>;
  onClose: () => void;
}) {
  const [perfil, setPerfil] = useState<{ telefono?: string | null; email?: string | null; zona?: string | null } | null>(null);

  useEffect(() => {
    supabase
      .from("perfiles_profesionales")
      .select("telefono, email, zona")
      .eq("user_id", profesionalId)
      .single()
      .then(({ data }) => setPerfil(data ?? {}));
  }, [profesionalId]);

  const telefono = perfil?.telefono ?? null;
  const email = perfil?.email ?? null;
  const zona = perfil?.zona ?? null;

  const initials = nombre
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const waLink = telefono
    ? `https://wa.me/${telefono.replace(/\D/g, "")}`
    : null;

  return (
    <>
      <ProgressBar step={3} />

      <div className="max-h-[calc(90vh-5rem)] overflow-y-auto px-5 pb-6 pt-2">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sv-primary/10">
            <svg className="h-8 w-8 text-sv-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="display mt-3 text-xl text-sv-dark">¡Pago confirmado!</h2>
          <p className="mt-1 text-sm text-ink-400">Ya podés coordinar la visita con el profesional.</p>
        </div>

        {/* Datos desbloqueados */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-sv-primary/20 bg-white">
          {/* Pro header */}
          <div className="flex items-center gap-3 bg-sv-primary/5 px-4 py-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sv-dark to-sv-primary font-display text-base font-semibold text-white">
              {initials}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sv-dark">{nombre}</span>
                <span className="rounded-full bg-sv-primary/15 px-2 py-0.5 text-[10px] font-semibold text-sv-olive">
                  🔓 Datos desbloqueados
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-ink-400">Profesional verificado en SolvIT</p>
            </div>
          </div>

          {/* Filas de contacto */}
          {telefono && (
            <ContactRow label="Teléfono" value={telefono} />
          )}
          {telefono && waLink && (
            <ContactRow label="WhatsApp" value={telefono} />
          )}
          {email && (
            <ContactRow label="Email" value={email} />
          )}
          {zona && (
            <ContactRow label="Zona" value={`${zona} · zona de trabajo`} />
          )}
        </div>

        {/* Próximo paso */}
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-ink-100 bg-ink-50 px-4 py-3">
          <span className="text-lg">📅</span>
          <div>
            <p className="text-[11.5px] font-semibold text-sv-dark">Próximo paso</p>
            <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-400">
              Contactá a <strong className="text-sv-dark">{nombre.split(" ")[0]}</strong> para coordinar día y hora. La primera interacción debe realizarse dentro de las próximas <strong className="text-sv-dark">24 horas</strong>.
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="mt-5">
          <button
            type="button"
            onClick={onClose}
            className="btn-primary w-full"
          >
            Ver mis consultas
          </button>
        </div>
      </div>
    </>
  );
}

// ─── AceptarModal ─────────────────────────────────────────────────────────────
export function AceptarModal({ propuesta, publicacion, onClose, onPagoExitoso }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();

  const cat = CATEGORIES.find((c) => c.slug === publicacion.category_slug);
  const hue = cat?.hue ?? 180;
  const precio = Number(propuesta.precio);
  const comision = COMISION;
  const total = precio + comision;
  const nombre = propuesta.nombre_profesional ?? "Profesional";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function handlePagar() {
    startTransition(async () => {
      await aceptarPropuesta(propuesta.id, publicacion.id);
      router.refresh();
      setStep(3);
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={step < 3 ? onClose : undefined}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 0 && (
          <StepResumen
            propuesta={propuesta}
            publicacion={publicacion}
            cat={cat}
            hue={hue}
            precio={precio}
            comision={comision}
            total={total}
            onCancelar={onClose}
            onContinuar={() => setStep(1)}
          />
        )}

        {step === 1 && (
          <StepPago
            total={total}
            isPending={isPending}
            onAtras={() => setStep(0)}
            onPagar={handlePagar}
          />
        )}

        {step === 3 && (
          <StepDesbloqueado
            nombre={nombre}
            profesionalId={propuesta.profesional_id}
            publicacion={publicacion}
            cat={cat}
            onClose={onPagoExitoso ?? onClose}
          />
        )}
      </div>
    </div>
  );
}
