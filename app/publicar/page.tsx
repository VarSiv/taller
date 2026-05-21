"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CATEGORIES, URGENCIES, ZONES, formatARS } from "@/lib/data";

const STEPS = [
  "Rubro",
  "Detalle",
  "Fotos",
  "Zona y urgencia",
  "Presupuesto",
  "Revisión",
] as const;

export default function PublicarPage() {
  return (
    <Suspense
      fallback={
        <div className="container-pad py-20 text-ink-500">Cargando…</div>
      }
    >
      <PublicarInner />
    </Suspense>
  );
}

function PublicarInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initialCat = params.get("cat") ?? "";

  const [step, setStep] = useState(initialCat ? 1 : 0);
  const [cat, setCat] = useState(initialCat);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [zone, setZone] = useState("");
  const [urgency, setUrgency] = useState("hoy");
  const [budgetMin, setBudgetMin] = useState(20000);
  const [budgetMax, setBudgetMax] = useState(80000);

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
  }
  function back() {
    if (step > 0) setStep(step - 1);
  }

  function submit() {
    router.push("/publicar/exito");
  }

  const canContinue = (() => {
    if (step === 0) return !!cat;
    if (step === 1) return title.trim().length > 8 && desc.trim().length > 20;
    if (step === 2) return true;
    if (step === 3) return !!zone && !!urgency;
    if (step === 4) return budgetMin < budgetMax;
    return true;
  })();

  const selectedCat = CATEGORIES.find((c) => c.slug === cat);

  return (
    <>
      <Header />
      <main>
        <div className="container-pad py-10">
          {/* Stepper */}
          <div className="mb-8 flex flex-wrap items-center gap-2 text-xs text-ink-500">
            <Link href="/" className="hover:text-ink-900">
              SolvIT
            </Link>
            <span>/</span>
            <span>Publicar problema</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[260px,1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <ol className="space-y-2">
                {STEPS.map((s, i) => {
                  const done = i < step;
                  const active = i === step;
                  return (
                    <li
                      key={s}
                      className={`flex items-center gap-3 rounded-xl border p-3 text-sm ${
                        active
                          ? "border-ink-950 bg-ink-950 text-white"
                          : done
                            ? "border-ink-200 bg-white text-ink-700"
                            : "border-dashed border-ink-200 bg-transparent text-ink-500"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs font-semibold ${
                          active
                            ? "bg-zap-300 text-ink-950"
                            : done
                              ? "bg-brand-100 text-brand-700"
                              : "bg-ink-100 text-ink-500"
                        }`}
                      >
                        {done ? "✓" : i + 1}
                      </span>
                      {s}
                    </li>
                  );
                })}
              </ol>

              <div className="mt-6 card border-zap-300 bg-zap-50 p-4 text-xs text-ink-700">
                <div className="font-semibold text-ink-950">
                  ¿Por qué pedimos esto?
                </div>
                <p className="mt-1">
                  Cuanto mejor describas el problema, más rápido te llegan
                  ofertas precisas. Solo pagás si te conectamos con un técnico.
                </p>
              </div>
            </aside>

            <div>
              <div className="text-xs uppercase tracking-wider text-ink-500">
                Paso {step + 1} de {STEPS.length}
              </div>
              <h1 className="display mt-1 text-3xl md:text-4xl">
                {STEPS[step] === "Rubro" && "¿Qué necesitás resolver?"}
                {STEPS[step] === "Detalle" && "Contanos el problema"}
                {STEPS[step] === "Fotos" && "Subí fotos del problema"}
                {STEPS[step] === "Zona y urgencia" && "¿Dónde y cuándo?"}
                {STEPS[step] === "Presupuesto" && "Tu rango de presupuesto"}
                {STEPS[step] === "Revisión" && "Revisemos antes de publicar"}
              </h1>

              <div className="mt-8">
                {step === 0 && (
                  <StepRubro value={cat} onChange={setCat} />
                )}
                {step === 1 && (
                  <StepDetalle
                    title={title}
                    desc={desc}
                    onTitle={setTitle}
                    onDesc={setDesc}
                  />
                )}
                {step === 2 && (
                  <StepFotos photos={photos} setPhotos={setPhotos} />
                )}
                {step === 3 && (
                  <StepZona
                    zone={zone}
                    urgency={urgency}
                    onZone={setZone}
                    onUrgency={setUrgency}
                  />
                )}
                {step === 4 && (
                  <StepBudget
                    min={budgetMin}
                    max={budgetMax}
                    setMin={setBudgetMin}
                    setMax={setBudgetMax}
                    cat={cat}
                  />
                )}
                {step === 5 && (
                  <StepReview
                    title={title}
                    desc={desc}
                    cat={selectedCat?.name}
                    zone={zone}
                    urgency={urgency}
                    budgetMin={budgetMin}
                    budgetMax={budgetMax}
                    photos={photos}
                  />
                )}
              </div>

              {/* Footer nav */}
              <div className="mt-10 flex flex-col-reverse gap-3 border-t border-ink-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="btn-ghost disabled:opacity-40"
                >
                  ← Volver
                </button>
                {step < STEPS.length - 1 ? (
                  <button
                    onClick={next}
                    disabled={!canContinue}
                    className="btn-primary disabled:opacity-50"
                  >
                    Continuar
                  </button>
                ) : (
                  <button onClick={submit} className="btn-zap">
                    Publicar problema
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* --- STEPS --- */

function StepRubro({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-ink-600">
        Elegí el rubro principal. Si tu problema toca varios, después podemos
        sumar.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        {CATEGORIES.map((c) => {
          const active = value === c.slug;
          return (
            <button
              key={c.slug}
              onClick={() => onChange(c.slug)}
              className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition ${
                active
                  ? "border-ink-950 bg-ink-950 text-white"
                  : "border-ink-200 bg-white hover:border-ink-400"
              }`}
            >
              <div
                className={`absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br ${c.accent} opacity-${active ? "30" : "80"}`}
              />
              <div className="relative">
                <div className="text-2xl">{c.icon}</div>
                <div
                  className={`mt-2 text-sm font-semibold ${active ? "text-white" : "text-ink-950"}`}
                >
                  {c.name}
                </div>
                <div
                  className={`text-xs ${active ? "text-ink-300" : "text-ink-500"}`}
                >
                  {c.blurb}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDetalle({
  title,
  desc,
  onTitle,
  onDesc,
}: {
  title: string;
  desc: string;
  onTitle: (v: string) => void;
  onDesc: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="label">Resumen del problema</label>
        <input
          value={title}
          onChange={(e) => onTitle(e.target.value)}
          placeholder="Ej: Pérdida abajo de la pileta de cocina"
          className="field"
        />
        <div className="mt-1 text-xs text-ink-500">
          Una frase corta. Como si se lo contaras a un amigo.
        </div>
      </div>
      <div>
        <label className="label">Contanos más</label>
        <textarea
          value={desc}
          onChange={(e) => onDesc(e.target.value)}
          rows={6}
          placeholder="Hace cuánto pasa, qué probaste, si hay agua/gas/luz cortada, cuándo te queda mejor que vayan…"
          className="field"
        />
        <div className="mt-1 text-xs text-ink-500">
          {desc.length} / 1000 caracteres
        </div>
      </div>
      <div className="card border-zap-300 bg-zap-50 p-4 text-sm">
        <div className="font-semibold">Tip de SolvIT</div>
        <p className="mt-1 text-ink-700">
          Cuanto más concreta sea tu descripción, mejores ofertas vas a recibir
          y menos viajes en vano del técnico.
        </p>
      </div>
    </div>
  );
}

function StepFotos({
  photos,
  setPhotos,
}: {
  photos: string[];
  setPhotos: (p: string[]) => void;
}) {
  const sample = [
    "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1585129777188-c79e9f190c0c?auto=format&fit=crop&w=400&q=60",
  ];

  function addSample(i: number) {
    if (photos.length >= 5) return;
    setPhotos([...photos, sample[i % sample.length]]);
  }
  function remove(idx: number) {
    setPhotos(photos.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <p className="text-ink-600">
        Las fotos son opcionales pero recomendadas. 2–3 buenas fotos aceleran
        todo.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((src, i) => (
          <div
            key={i}
            className="group relative aspect-square overflow-hidden rounded-xl bg-ink-100"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="200px"
              className="object-cover"
            />
            <button
              onClick={() => remove(i)}
              className="absolute right-2 top-2 rounded-full bg-ink-950 px-2 py-0.5 text-[11px] text-white opacity-0 transition group-hover:opacity-100"
            >
              Quitar
            </button>
          </div>
        ))}
        {photos.length < 5 && (
          <button
            onClick={() => addSample(photos.length)}
            className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-ink-200 text-center hover:border-ink-400"
          >
            <div>
              <div className="text-3xl">📷</div>
              <div className="mt-2 text-xs text-ink-600">Agregar foto</div>
              <div className="text-[10px] text-ink-400">(demo)</div>
            </div>
          </button>
        )}
      </div>
      <div className="mt-4 text-xs text-ink-500">
        En la app real podrías sacar foto o video desde el teléfono. Para el
        prototipo, agregamos fotos de muestra.
      </div>
    </div>
  );
}

function StepZona({
  zone,
  urgency,
  onZone,
  onUrgency,
}: {
  zone: string;
  urgency: string;
  onZone: (v: string) => void;
  onUrgency: (v: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <label className="label">Zona</label>
        <div className="flex flex-wrap gap-1.5">
          {ZONES.map((z) => (
            <button
              key={z}
              onClick={() => onZone(z)}
              className={`pill border ${
                zone === z
                  ? "border-ink-950 bg-ink-950 text-white"
                  : "border-ink-200 bg-white text-ink-700 hover:border-ink-400"
              }`}
            >
              📍 {z}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Urgencia</label>
        <div className="grid gap-2 sm:grid-cols-3">
          {URGENCIES.map((u) => (
            <button
              key={u.value}
              onClick={() => onUrgency(u.value)}
              className={`rounded-2xl border p-4 text-left ${
                urgency === u.value
                  ? "border-ink-950 bg-ink-950 text-white"
                  : "border-ink-200 bg-white hover:border-ink-400"
              }`}
            >
              <div className="text-sm font-semibold">{u.label}</div>
              <div
                className={`text-xs ${urgency === u.value ? "text-ink-300" : "text-ink-500"}`}
              >
                {u.note}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepBudget({
  min,
  max,
  setMin,
  setMax,
  cat,
}: {
  min: number;
  max: number;
  setMin: (v: number) => void;
  setMax: (v: number) => void;
  cat: string;
}) {
  const refRange = REFERENCE_RANGES[cat] ?? { min: 20000, max: 80000 };

  return (
    <div className="space-y-6">
      <div className="card border-zap-300 bg-zap-50 p-4">
        <div className="text-xs uppercase tracking-wider text-ink-600">
          Rango de referencia de SolvIT
        </div>
        <div className="mt-1 display text-3xl">
          {formatARS(refRange.min)} — {formatARS(refRange.max)}
        </div>
        <div className="mt-1 text-xs text-ink-700">
          Construido con datos de mercado y transacciones reales en tu zona y
          rubro. No es un precio impuesto, es una referencia.
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Mínimo dispuesto a pagar</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            className="field"
          />
        </div>
        <div>
          <label className="label">Máximo dispuesto a pagar</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="field"
          />
        </div>
      </div>

      <div className="card p-4 text-xs text-ink-700">
        <div className="font-semibold text-ink-950">
          ¿Cómo se cobra la tarifa de SolvIT?
        </div>
        <p className="mt-1">
          Cobramos $4.500 únicamente cuando aceptás una oferta. Si nadie toma
          tu trabajo, no pagás nada.
        </p>
      </div>
    </div>
  );
}

const REFERENCE_RANGES: Record<string, { min: number; max: number }> = {
  plomeria: { min: 20000, max: 90000 },
  electricidad: { min: 18000, max: 110000 },
  gas: { min: 35000, max: 140000 },
  aire: { min: 65000, max: 180000 },
  cerrajeria: { min: 25000, max: 120000 },
  pintura: { min: 120000, max: 450000 },
  carpinteria: { min: 80000, max: 600000 },
  albanileria: { min: 50000, max: 400000 },
  electrodomesticos: { min: 12000, max: 90000 },
  vidrieria: { min: 15000, max: 120000 },
};

function StepReview({
  title,
  desc,
  cat,
  zone,
  urgency,
  budgetMin,
  budgetMax,
  photos,
}: {
  title: string;
  desc: string;
  cat?: string;
  zone: string;
  urgency: string;
  budgetMin: number;
  budgetMax: number;
  photos: string[];
}) {
  const urgencyLabel =
    URGENCIES.find((u) => u.value === urgency)?.label ?? urgency;
  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="pill bg-brand-100 text-brand-800">Lista para publicar</span>
        <span className="pill bg-ink-50 text-ink-700">{cat}</span>
        <span className="pill bg-ink-50 text-ink-700">📍 {zone}</span>
        <span className="pill bg-ink-50 text-ink-700">⏱ {urgencyLabel}</span>
      </div>

      <h2 className="display mt-4 text-2xl">{title || "Sin título"}</h2>
      <p className="mt-2 whitespace-pre-wrap text-sm text-ink-700">
        {desc || "Sin descripción"}
      </p>

      {photos.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {photos.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-xl bg-ink-100"
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 border-t border-ink-100 pt-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-ink-600">Tu rango de presupuesto</span>
          <span className="font-semibold">
            {formatARS(budgetMin)} – {formatARS(budgetMax)}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-ink-600">Tarifa de conexión SolvIT</span>
          <span className="font-semibold">$4.500</span>
        </div>
        <div className="mt-1 text-xs text-ink-500">
          Solo se cobra si aceptás una oferta.
        </div>
      </div>
    </div>
  );
}
