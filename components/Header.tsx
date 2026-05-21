import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-[#fafaf6]/85 backdrop-blur">
      <div className="container-pad flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-ink-700 md:flex">
            <Link href="/buscar" className="hover:text-ink-950">
              Explorar
            </Link>
            <Link href="/categorias" className="hover:text-ink-950">
              Categorías
            </Link>
            <Link href="/como-funciona" className="hover:text-ink-950">
              Cómo funciona
            </Link>
            <Link
              href="/oferentes"
              className="hover:text-ink-950"
            >
              Para profesionales
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/ingresar" className="btn-ghost hidden sm:inline-flex">
            Ingresar
          </Link>
          <Link href="/publicar" className="btn-zap">
            <span className="hidden sm:inline">Publicar problema</span>
            <span className="sm:hidden">Publicar</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
