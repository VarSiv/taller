"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export function PendienteClient() {
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const hasError = params.get("error") === "token_invalido";
  const [reenviando, setReenviando] = useState(false);
  const [reenviado, setReenviado] = useState(false);

  async function reenviar() {
    setReenviando(true);
    await new Promise((r) => setTimeout(r, 1200));
    setReenviando(false);
    setReenviado(true);
  }

  if (hasError) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-[#f5fdf9] px-5">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <span className="text-4xl">❌</span>
          </div>
          <h1 className="display text-2xl text-sv-dark">Link inválido</h1>
          <p className="mt-3 text-sm text-ink-500">
            Este link de confirmación ya fue usado o expiró. Si tu publicación
            no aparece en el marketplace, intentá publicar nuevamente.
          </p>
          <Link href="/publicar" className="btn-primary mt-8 inline-block">
            Publicar de nuevo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#f5fdf9] px-5">
      <div className="w-full max-w-sm">

        {/* Ícono */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-sv-primary/10">
          <span className="text-5xl">📬</span>
        </div>

        {/* Texto principal */}
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sv-primary">
            Último paso
          </p>
          <h1 className="display mt-2 text-[2rem] leading-tight text-sv-dark">
            Revisá tu mail para confirmar
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
            Te enviamos un link de confirmación a{" "}
            {email ? (
              <span className="font-semibold text-sv-dark">{email}</span>
            ) : (
              "tu casilla de correo"
            )}
            . Hacé clic en el link para que tu publicación aparezca en el marketplace.
          </p>
        </div>

        {/* Pasos visuales */}
        <div className="mt-8 rounded-2xl border border-zap-100 bg-white p-5">
          <div className="space-y-4">
            <Step n={1} text="Abrí tu casilla de correo" done />
            <Step n={2} text='Buscá el mail de SolvIT con el asunto "Confirmá tu publicación"' done={false} />
            <Step n={3} text="Hacé clic en el botón de confirmación" done={false} />
          </div>
        </div>

        {/* Reenviar */}
        <div className="mt-6 text-center">
          {reenviado ? (
            <p className="text-sm font-medium text-sv-primary">
              ✓ Mail reenviado — revisá tu bandeja
            </p>
          ) : (
            <button
              type="button"
              onClick={reenviar}
              disabled={reenviando}
              className="text-sm text-ink-400 underline underline-offset-4 hover:text-sv-dark disabled:opacity-50"
            >
              {reenviando ? "Reenviando…" : "¿No llegó? Reenviar mail"}
            </button>
          )}
        </div>

        {/* Volver */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-ink-400 hover:text-sv-dark">
            ← Volver al marketplace
          </Link>
        </div>

      </div>
    </main>
  );
}

function Step({ n, text, done }: { n: number; text: string; done: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
          done
            ? "bg-sv-primary text-white"
            : "border border-zap-200 bg-zap-50 text-ink-400"
        }`}
      >
        {done ? "✓" : n}
      </span>
      <span className={`text-sm leading-relaxed ${done ? "text-sv-dark" : "text-ink-500"}`}>
        {text}
      </span>
    </div>
  );
}
