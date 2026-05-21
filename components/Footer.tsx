import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-ink-100 bg-ink-950 text-ink-200">
      <div className="container-pad grid gap-10 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="text-white">
            <Logo />
          </div>
          <p className="mt-4 max-w-xs text-sm text-ink-300">
            Marketplace de servicios para el hogar en Buenos Aires.
            Técnicos verificados, precios de referencia y pago respaldado.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-ink-400">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-zap-300" />
            Operando en CABA y Zona Norte
          </div>
        </div>

        <FooterCol
          title="Servicios"
          links={[
            { href: "/categoria/plomeria", label: "Plomería" },
            { href: "/categoria/electricidad", label: "Electricidad" },
            { href: "/categoria/aire", label: "Aire acondicionado" },
            { href: "/categoria/cerrajeria", label: "Cerrajería" },
            { href: "/categoria/pintura", label: "Pintura" },
            { href: "/categorias", label: "Ver todas" },
          ]}
        />
        <FooterCol
          title="SolvIT"
          links={[
            { href: "/como-funciona", label: "Cómo funciona" },
            { href: "/oferentes", label: "Para profesionales" },
            { href: "/buscar", label: "Explorar servicios" },
            { href: "/publicar", label: "Publicar un problema" },
          ]}
        />
        <FooterCol
          title="Confianza"
          links={[
            { href: "#", label: "Verificación de técnicos" },
            { href: "#", label: "Garantía SolvIT" },
            { href: "#", label: "Pago respaldado" },
            { href: "#", label: "Política de reseñas" },
          ]}
        />
      </div>
      <div className="border-t border-ink-800">
        <div className="container-pad flex flex-col items-start gap-3 py-6 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <span>© 2026 SolvIT · Buenos Aires, Argentina</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="hover:text-white">Términos</a>
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Cookies</a>
            <a href="#" className="hover:text-white">Defensa al consumidor</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-ink-400">
        {title}
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-ink-200 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
