import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { LogoutButton } from "@/components/LogoutButton";

export async function Header() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  const nombre = user?.user_metadata?.nombre as string | undefined;
  const apellido = user?.user_metadata?.apellido as string | undefined;
  const esProfesional = user?.user_metadata?.es_profesional === true;

  const initials = nombre && apellido
    ? `${nombre[0]}${apellido[0]}`.toUpperCase()
    : nombre
    ? nombre.slice(0, 2).toUpperCase()
    : "U";

  const displayName = nombre
    ? `${nombre}${apellido ? ` ${apellido.charAt(0)}.` : ""}`
    : user?.email?.split("@")[0] ?? "";

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/95 backdrop-blur-md">
      <div className="container-pad flex h-16 items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sv-dark to-sv-primary text-sm font-bold text-white font-display">
            S
          </span>
          <span className="font-display text-lg font-semibold text-sv-dark">
            Solv<span className="text-sv-primary">IT</span>
          </span>
        </Link>

        {/* Nav + acciones */}
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-500 hover:bg-ink-50 hover:text-sv-dark sm:inline-flex"
          >
            Marketplace
          </Link>
          <Link
            href="/como-funciona"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-500 hover:bg-ink-50 hover:text-sv-dark sm:inline-flex"
          >
            About Us
          </Link>

          <div className="mx-2 hidden h-5 w-px bg-ink-200 sm:block" />

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/mis-consultas"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-500 hover:bg-ink-50 hover:text-sv-dark sm:inline-flex"
              >
                Mis consultas
              </Link>

              {/* User pill */}
              <div className="flex items-center gap-2 rounded-full border border-ink-100 bg-ink-50 py-1 pl-1 pr-3">
                {/* Initials avatar */}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sv-dark to-sv-primary text-xs font-bold text-white">
                  {initials}
                </span>
                {/* Role badge */}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    esProfesional
                      ? "bg-sv-primary/15 text-sv-olive"
                      : "bg-zap-100 text-zap-700"
                  }`}
                >
                  {esProfesional ? "Oferente" : "Demandante"}
                </span>
                <span className="hidden text-sm font-medium text-sv-dark sm:inline">{displayName}</span>
              </div>

              <LogoutButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/ingresar" className="btn-ghost text-sm">
                Ingresar
              </Link>
              <Link href="/registrar" className="btn-primary text-sm">
                Crear cuenta
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
