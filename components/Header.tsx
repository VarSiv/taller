import Link from "next/link";
import Image from "next/image";
import { createSupabaseServer } from "@/lib/supabase-server";
import { LogoutButton } from "@/components/LogoutButton";
import { MobileMenu } from "@/components/MobileMenu";

export async function Header() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  const nombre = user?.user_metadata?.nombre as string | undefined;
  const apellido = user?.user_metadata?.apellido as string | undefined;
  const esProfesional = user?.user_metadata?.es_profesional === true;
  const dk = esProfesional;

  const initials = nombre && apellido
    ? `${nombre[0]}${apellido[0]}`.toUpperCase()
    : nombre
    ? nombre.slice(0, 2).toUpperCase()
    : "U";

  const displayName = nombre
    ? `${nombre}${apellido ? ` ${apellido.charAt(0)}.` : ""}`
    : user?.email?.split("@")[0] ?? "";

  const navLink = dk
    ? "rounded-lg px-3.5 py-2 text-sm font-medium text-zap-100/70 transition-colors hover:bg-white/10 hover:text-white"
    : "rounded-lg px-3.5 py-2 text-sm font-medium text-ink-500 transition-colors hover:bg-zap-100 hover:text-sv-dark";

  return (
    <header className={`relative sticky top-0 z-40 border-b backdrop-blur-lg ${
      dk ? "border-white/10 bg-[#0e1a17]/95" : "border-ink-100/80 bg-white/90"
    }`}>
      <div className="flex h-14 w-full items-center gap-4 px-5 sm:px-8 lg:px-12">

        {/* Logo */}
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image src="/logo.png" alt="SolvIT" width={32} height={32} className="h-8 w-8 object-contain" />
            <span className={`font-display text-[17px] font-semibold tracking-tight ${dk ? "text-white" : "text-sv-dark"}`}>
              Solv<span className={dk ? "text-zap-300" : "text-sv-primary"}>IT</span>
            </span>
          </Link>
        </div>

        {/* Nav central */}
        <nav className="hidden items-center gap-0.5 sm:flex">
          <Link href="/" className={navLink}>Marketplace</Link>
          <Link href="/como-funciona" className={navLink}>Cómo funciona</Link>
          {user && <Link href="/mis-consultas" className={navLink}>Mis consultas</Link>}
        </nav>

        {/* Acciones */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {user ? (
            <>
              <div className={`flex items-center gap-2.5 rounded-full border py-1 pl-1.5 pr-3 ${
                dk ? "border-white/15 bg-white/10" : "border-ink-100 bg-ink-50/60"
              }`}>
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                  dk ? "bg-zap-500" : "bg-sv-dark"
                }`}>
                  {initials}
                </span>
                <span className={`hidden text-sm font-medium sm:inline ${dk ? "text-zap-50" : "text-sv-dark"}`}>
                  {displayName}
                </span>
                <span className={`hidden rounded-full px-1.5 py-px text-[10px] font-semibold sm:inline ${
                  dk
                    ? "bg-zap-500/20 text-zap-300"
                    : esProfesional
                    ? "bg-sv-primary/15 text-sv-olive"
                    : "bg-amber-100 text-amber-700"
                }`}>
                  {esProfesional ? "Técnico" : "Cliente"}
                </span>
              </div>
              <LogoutButton dark={dk} />
            </>
          ) : (
            <>
              <Link href="/ingresar" className="btn-ghost hidden text-sm sm:inline-flex">
                Ingresar
              </Link>
              <Link href="/registrar" className="btn-primary text-sm">
                Crear cuenta
              </Link>
            </>
          )}
          <MobileMenu hasUser={!!user} dark={dk} />
        </div>

      </div>
    </header>
  );
}
