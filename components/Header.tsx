import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { LogoutButton } from "@/components/LogoutButton";

export async function Header() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  const nombre = user?.user_metadata?.nombre as string | undefined;
  const esProfesional = user?.user_metadata?.es_profesional === true;

  return (
    <header className="sticky top-0 z-40 border-b border-sv-olive/30 bg-sv-dark backdrop-blur">
      <div className="container-pad flex h-16 items-center justify-between gap-6">
        <div />

        <div className="flex items-center gap-3">
          <Link href="/como-funciona" className="hidden text-sm text-zap-200 hover:text-white sm:inline">
            About Us
          </Link>

          {user ? (
            <>
              <span className="hidden items-center gap-2 sm:flex">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    esProfesional
                      ? "bg-sv-primary text-white"
                      : "bg-zap-200/20 text-zap-200"
                  }`}
                >
                  {esProfesional ? "Profesional" : "Demandante"}
                </span>
                <span className="text-sm text-white">{nombre ?? user.email}</span>
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/ingresar" className="btn text-zap-200 hover:bg-sv-olive/40">
                Ingresar
              </Link>
              <Link href="/registrar" className="btn bg-sv-primary text-white hover:bg-sv-olive">
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
