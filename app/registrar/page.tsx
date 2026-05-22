"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegistrarPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [esProfesional, setEsProfesional] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError("");

    if (esProfesional === null) {
      setError("Indicá si sos profesional o no.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre, apellido, es_profesional: esProfesional } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    setTimeout(() => router.push("/"), 3000);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5fdf9] p-8">
      <div className="w-full max-w-sm">
        <h1 className="display text-4xl leading-tight">Crear cuenta</h1>
        <p className="mt-2 text-sm text-ink-400">
          Gratis. Sin comisiones. Tu problema, resuelto.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nombre">
              <input
                type="text"
                placeholder="Juan"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="field"
              />
            </Field>
            <Field label="Apellido">
              <input
                type="text"
                placeholder="Pérez"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="field"
              />
            </Field>
          </div>
          <Field label="Email">
            <input
              type="email"
              placeholder="vos@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="field"
            />
          </Field>
          <Field label="Contraseña">
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="field"
            />
          </Field>
          <Field label="Confirmar contraseña">
            <input
              type="password"
              placeholder="Repetí la contraseña"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="field"
            />
          </Field>

          <div>
            <span className="label">¿Sos profesional? (plomero, electricista, etc.)</span>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEsProfesional(true)}
                className={`rounded-xl border-2 py-3 text-sm font-medium transition-colors ${
                  esProfesional === true
                    ? "border-sv-primary bg-sv-primary text-white"
                    : "border-ink-200 bg-white text-ink-400 hover:border-sv-primary hover:text-sv-dark"
                }`}
              >
                Sí
              </button>
              <button
                type="button"
                onClick={() => setEsProfesional(false)}
                className={`rounded-xl border-2 py-3 text-sm font-medium transition-colors ${
                  esProfesional === false
                    ? "border-sv-primary bg-sv-primary text-white"
                    : "border-ink-200 bg-white text-ink-400 hover:border-sv-primary hover:text-sv-dark"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-xl bg-green-50 px-4 py-2 text-sm text-green-700">
              ¡Cuenta creada! Si recibís un email de confirmación, revisá tu bandeja. Redirigiendo…
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Creando cuenta…" : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-ink-400">
          ¿Ya tenés cuenta?{" "}
          <Link href="/ingresar" className="font-medium text-sv-dark underline underline-offset-4">
            Ingresar
          </Link>
        </p>

        <Link href="/" className="mt-4 block text-center text-xs text-ink-400 hover:text-sv-dark">
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}
