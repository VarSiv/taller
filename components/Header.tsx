import Link from "next/link";
import Image from "next/image";
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
    <header className="sticky top-0 z-40 border-b border-ink-100/80 bg-white/90 backdrop-blur-lg">
      <div className="container-pad flex h-14 items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/logo.png" alt="SolvIT" width={32} height={32} className="h-8 w-8 object-contain" />
          <span className="font-display text-[17px] font-semibold tracking-tight text-sv-dark">
            Solv<span className="text-sv-primary">IT</span>
          </span>
        </Link>

        {/* Nav central */}
        <nav className="hidden items-center gap-0.5 sm:flex">
          <Link
            href="/"
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-500 transition-colors hover:bg-ink-50 hover:text-sv-dark"
          >
            Marketplace
          </Link>
          <Link
            href="/como-funciona"
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-500 transition-colors hover:bg-ink-50 hover:text-sv-dark"
          >
            Cómo funciona
          </Link>
          {user && (
            <Link
              href="/mis-consultas"
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-500 transition-colors hover:bg-ink-50 hover:text-sv-dark"
            >
              Mis consultas
            </Link>
          )}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {/* Avatar + nombre + rol */}
              <div className="flex items-center gap-2.5 rounded-full border border-ink-100 bg-ink-50/60 py-1 pl-1.5 pr-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sv-dark text-[10px] font-bold text-white">
                  {initials}
                </span>
                <span className="hidden text-sm font-medium text-sv-dark sm:inline">
                  {displayName}
                </span>
                <span className={`hidden rounded-full px-1.5 py-px text-[10px] font-semibold sm:inline ${
                  esProfesional ? "bg-sv-primary/15 text-sv-olive" : "bg-amber-100 text-amber-700"
                }`}>
                  {esProfesional ? "Técnico" : "Cliente"}
                </span>
              </div>
              <LogoutButton />
            </>
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
