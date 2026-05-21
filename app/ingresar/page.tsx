import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function IngresarPage() {
  return (
    <main className="grid min-h-screen md:grid-cols-2">
      {/* Left */}
      <div className="flex flex-col p-8 md:p-12">
        <Logo />
        <div className="mx-auto my-auto w-full max-w-sm">
          <h1 className="display text-4xl leading-tight">Ingresá a SolvIT</h1>
          <p className="mt-2 text-sm text-ink-600">
            Tu casa anda mal, vos no tenés que perder la mañana.
          </p>

          <form className="mt-8 space-y-4">
            <Field label="Email">
              <input
                type="email"
                placeholder="vos@ejemplo.com"
                className="field"
              />
            </Field>
            <Field label="Contraseña">
              <input
                type="password"
                placeholder="••••••••"
                className="field"
              />
            </Field>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-ink-700">
                <input type="checkbox" className="rounded border-ink-300 accent-ink-950" />
                Recordarme
              </label>
              <a href="#" className="text-ink-600 underline underline-offset-2">
                Olvidé mi contraseña
              </a>
            </div>
            <button type="button" className="btn-primary w-full">
              Ingresar
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-ink-500">
            <div className="h-px flex-1 bg-ink-200" />
            o ingresá con
            <div className="h-px flex-1 bg-ink-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn-outline justify-center">
              <span className="text-base">G</span> Google
            </button>
            <button className="btn-outline justify-center">
              <span className="text-base"></span> Apple
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-ink-600">
            ¿Primera vez? <Link href="#" className="font-medium text-ink-950 underline underline-offset-4">Crear cuenta</Link>
          </p>
        </div>

        <Link href="/" className="text-xs text-ink-500 hover:text-ink-900">
          ← Volver al inicio
        </Link>
      </div>

      {/* Right */}
      <div className="relative hidden overflow-hidden bg-ink-950 p-12 text-white md:flex md:flex-col md:justify-end">
        <div className="absolute -right-32 top-20 h-[400px] w-[400px] rounded-full bg-zap-300/30 blur-3xl" />
        <div className="absolute inset-0 bg-grid-faint bg-grid opacity-30" />
        <div className="relative max-w-md">
          <span className="text-xs uppercase tracking-wider text-zap-300">
            En SolvIT
          </span>
          <h2 className="display mt-2 text-4xl leading-tight">
            Pagás solo si te conectamos.
          </h2>
          <p className="mt-4 text-ink-300">
            Nada de presupuesto según la cara, nada de pagar por nada. La
            tarifa de conexión la liberás cuando aceptás una oferta.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            <Mini value="4.500" label="tarifa ARS" />
            <Mini value="540+" label="profesionales" />
            <Mini value="< 15m" label="primera oferta" />
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}

function Mini({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-ink-800 bg-ink-900/50 p-3">
      <div className="display text-2xl text-zap-300">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-ink-400">
        {label}
      </div>
    </div>
  );
}
