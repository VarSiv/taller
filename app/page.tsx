import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { ServiceCard } from "@/components/ServiceCard";
import { CategoryGrid } from "@/components/CategoryGrid";
import { PostedJobCard } from "@/components/PostedJobCard";
import { CATEGORIES, POSTED_JOBS, SERVICES, PROS } from "@/lib/data";
import { StarRating } from "@/components/StarRating";

export default function Home() {
  const featuredServices = SERVICES.slice(0, 8);
  const topPros = PROS.slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-dot-pattern bg-dots opacity-60" />
          <div className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-zap-200/40 blur-3xl" />

          <div className="container-pad relative grid gap-12 py-14 md:grid-cols-12 md:gap-8 md:py-20">
            <div className="md:col-span-7">
              <div className="flex flex-wrap items-center gap-2 text-xs text-ink-600">
                <span className="chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  Operando en CABA y Zona Norte
                </span>
                <span className="chip">+540 profesionales verificados</span>
              </div>

              <h1 className="mt-6 display text-5xl leading-[1.05] sm:text-6xl md:text-[76px]">
                Tu casa anda mal,
                <br />
                <span className="italic text-ink-700">vos no</span> tenés que
                <br />
                perder la mañana.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700">
                Publicás tu problema, técnicos verificados compiten por tomarlo
                y ves el rango de precio antes de decidir. Pagás{" "}
                <span className="font-medium text-ink-950">
                  solo si te conectamos
                </span>
                .
              </p>

              <div className="mt-8 max-w-2xl">
                <SearchBar />
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-ink-600">
                <div className="flex items-center gap-2">
                  <Avatars />
                  <span>
                    <span className="font-semibold text-ink-950">8 de 10</span>{" "}
                    contrataciones del hogar se hacen sin garantía. Acá no.
                  </span>
                </div>
              </div>
            </div>

            {/* Right: floating cards preview */}
            <div className="relative md:col-span-5">
              <div className="relative mx-auto h-full max-w-md">
                <FloatingPreview />
              </div>
            </div>
          </div>
        </section>

        {/* TRUST MARQUEE */}
        <section className="border-y border-ink-100 bg-white">
          <div className="container-pad flex items-center gap-8 overflow-hidden py-5 text-sm text-ink-600">
            <span className="flex-none text-xs uppercase tracking-wider text-ink-500">
              Esto sí, esto no
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Chip icon="✓">Pago respaldado</Chip>
              <Chip icon="✓">Identidad de técnico verificada</Chip>
              <Chip icon="✓">Rango de precio antes de contratar</Chip>
              <Chip icon="✓">Garantía de reparación</Chip>
              <Chip icon="✗" off>
                Sin limpieza ni rutina
              </Chip>
              <Chip icon="✗" off>
                Sin "presupuesto según la cara"
              </Chip>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-20">
          <div className="container-pad">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="display text-3xl md:text-4xl">
                  ¿Qué necesitás resolver?
                </h2>
                <p className="mt-2 text-ink-600">
                  Diez rubros, cero categorías de limpieza o rutina.
                </p>
              </div>
              <Link
                href="/categorias"
                className="hidden text-sm text-ink-700 underline underline-offset-4 hover:text-ink-950 md:inline"
              >
                Ver todas
              </Link>
            </div>
            <CategoryGrid categories={CATEGORIES} />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-ink-950 py-20 text-white">
          <div className="container-pad">
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <span className="text-xs uppercase tracking-wider text-zap-300">
                  Cómo funciona
                </span>
                <h2 className="display mt-2 text-4xl md:text-5xl">
                  De la foto al técnico,
                  <span className="italic text-ink-300"> sin ruleta</span>.
                </h2>
                <p className="mt-4 text-ink-300">
                  Te entregamos un encuentro listo para trabajar: problema
                  descripto, precio de referencia aceptado, técnico verificado y
                  pago respaldado.
                </p>
                <Link
                  href="/publicar"
                  className="btn-zap mt-8 inline-flex"
                >
                  Publicar mi problema
                </Link>
              </div>

              <ol className="grid gap-5 md:col-span-8 md:grid-cols-3">
                <Step
                  n="01"
                  title="Subís fotos y describís"
                  body="Sacás 2 o 3 fotos y completás un cuestionario corto. Categorizamos rubro, urgencia y zona en menos de 1 minuto."
                />
                <Step
                  n="02"
                  title="Ves el rango y elegís"
                  body="Mostramos un rango de precios de referencia para esa intervención en tu zona. Los técnicos verificados ofertan dentro del rango."
                />
                <Step
                  n="03"
                  title="Te conectamos y arrancan"
                  body="Aceptás una oferta. Recién ahí cobramos la tarifa fija de conexión. Si nadie toma el trabajo, no pagás nada."
                />
              </ol>
            </div>
          </div>
        </section>

        {/* FEATURED SERVICES */}
        <section className="py-20">
          <div className="container-pad">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-ink-500">
                  Top en SolvIT
                </span>
                <h2 className="display mt-1 text-3xl md:text-4xl">
                  Servicios más pedidos esta semana
                </h2>
              </div>
              <Link
                href="/buscar"
                className="hidden text-sm text-ink-700 underline underline-offset-4 hover:text-ink-950 md:inline"
              >
                Ver todos
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {featuredServices.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        </section>

        {/* LIVE JOBS BOARD */}
        <section className="bg-white py-20 ring-1 ring-ink-100">
          <div className="container-pad">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-ink-500">
                  <span className="flex h-2 w-2">
                    <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-brand-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                  </span>
                  EN VIVO
                </div>
                <h2 className="display mt-1 text-3xl md:text-4xl">
                  Pedidos activos ahora mismo
                </h2>
                <p className="mt-2 text-ink-600">
                  Mirá qué están publicando los vecinos. Si sos profesional,
                  registrate y empezá a tomar trabajos.
                </p>
              </div>
              <Link href="/oferentes" className="btn-outline">
                Soy técnico, quiero entrar
              </Link>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {POSTED_JOBS.slice(0, 4).map((j) => (
                <PostedJobCard key={j.id} job={j} />
              ))}
            </div>
          </div>
        </section>

        {/* PROS SPOTLIGHT */}
        <section className="py-20">
          <div className="container-pad">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-ink-500">
                  Profesionales destacados
                </span>
                <h2 className="display mt-1 text-3xl md:text-4xl">
                  La reputación que se acumula y se ve.
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {topPros.map((p) => (
                <Link
                  key={p.id}
                  href={`/profesional/${p.slug}`}
                  className="card relative overflow-hidden p-6 transition hover:border-ink-300"
                >
                  <div className="flex items-start gap-4">
                    <Image
                      src={p.avatar}
                      alt={p.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <div className="text-base font-semibold text-ink-950">
                        {p.name}
                      </div>
                      <div className="text-sm text-ink-600">{p.title}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <StarRating rating={p.rating} reviews={p.reviewsCount} />
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 line-clamp-3 text-sm text-ink-700">
                    {p.bio}
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-ink-100 pt-4">
                    {p.highlights.slice(0, 3).map((h) => (
                      <div key={h.label}>
                        <div className="text-xs uppercase tracking-wider text-ink-500">
                          {h.label}
                        </div>
                        <div className="mt-0.5 text-sm font-semibold text-ink-950">
                          {h.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PROS RECRUITMENT */}
        <section className="py-12">
          <div className="container-pad">
            <div className="card relative overflow-hidden bg-gradient-to-br from-ink-950 to-ink-800 p-8 text-white md:p-14">
              <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-zap-300/20 blur-3xl" />
              <div className="grid gap-10 md:grid-cols-12">
                <div className="md:col-span-7">
                  <span className="text-xs uppercase tracking-wider text-zap-300">
                    Para profesionales
                  </span>
                  <h3 className="display mt-3 text-3xl leading-tight md:text-5xl">
                    Cobrás el 100% del trabajo.
                    <br />
                    La tarifa la paga el cliente.
                  </h3>
                  <p className="mt-4 max-w-xl text-ink-300">
                    Sin comisión sobre tu cotización. El cliente ya describió el
                    problema, ya aceptó un rango y está en una zona de alto
                    ticket. Vos elegís qué tomar y cuándo.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/oferentes" className="btn-zap">
                      Registrarme como profesional
                    </Link>
                    <Link
                      href="/como-funciona"
                      className="btn-outline border-ink-700 bg-transparent text-white hover:border-white"
                    >
                      Ver cómo funciona
                    </Link>
                  </div>
                </div>
                <div className="grid gap-3 md:col-span-5">
                  <Highlight
                    label="0%"
                    sub="de comisión sobre tu cotización"
                  />
                  <Highlight
                    label="$0"
                    sub="por publicar ofertas o navegar pedidos"
                  />
                  <Highlight
                    label="100%"
                    sub="del pago del trabajo, íntegro a vos"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20">
          <div className="container-pad">
            <div className="mb-10">
              <span className="text-xs uppercase tracking-wider text-ink-500">
                Lo que dicen
              </span>
              <h2 className="display mt-1 text-3xl md:text-4xl">
                Tranquilidad, en palabras.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <Quote
                text="Se me rompió el caño un domingo a la noche. Publiqué a las 22:00, a las 22:18 ya había un plomero confirmado para la mañana. Llegó con la pieza que necesitaba."
                author="Juana M."
                meta="Palermo · Plomería"
              />
              <Quote
                text="El rango de precio me sirvió un montón. Sabía qué esperar antes de que viniera nadie. El técnico facturó dentro del rango. Sin sorpresas."
                author="Federico A."
                meta="Recoleta · Electricidad"
              />
              <Quote
                text="Soy técnico y entré por un grupo de WhatsApp. En el primer mes cerré 9 trabajos en Belgrano que de otra forma no me hubieran llegado."
                author="Martín A."
                meta="Plomero matriculado"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12">
          <div className="container-pad">
            <div className="card relative overflow-hidden bg-zap-300 p-10 text-center md:p-16">
              <div className="absolute inset-0 bg-grid-faint bg-grid opacity-50" />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="display text-4xl leading-tight md:text-6xl">
                  Sacate la ruleta de
                  <br />
                  encima.
                </h2>
                <p className="mt-4 text-ink-800">
                  Tu primer publicación es gratis. Si nadie la toma, no pagás
                  nada.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link href="/publicar" className="btn-primary">
                    Publicar mi problema
                  </Link>
                  <Link
                    href="/buscar"
                    className="btn-outline border-ink-950"
                  >
                    Explorar servicios
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Chip({
  icon,
  children,
  off,
}: {
  icon: string;
  children: React.ReactNode;
  off?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
          off ? "bg-ink-100 text-ink-500" : "bg-brand-100 text-brand-700"
        }`}
      >
        {icon}
      </span>
      <span className={off ? "text-ink-500" : "text-ink-800"}>{children}</span>
    </span>
  );
}

function Step({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <li className="card border-ink-800 bg-ink-900 p-5">
      <div className="font-mono text-xs text-zap-300">{n}</div>
      <div className="mt-4 text-lg font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm text-ink-300">{body}</div>
    </li>
  );
}

function Highlight({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="rounded-xl border border-ink-700 bg-ink-900/50 p-4">
      <div className="display text-4xl text-zap-300">{label}</div>
      <div className="mt-1 text-sm text-ink-300">{sub}</div>
    </div>
  );
}

function Quote({
  text,
  author,
  meta,
}: {
  text: string;
  author: string;
  meta: string;
}) {
  return (
    <figure className="card p-6">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="text-zap-400"
        fill="currentColor"
        aria-hidden
      >
        <path d="M7 4C4.79 4 3 5.79 3 8v8h6V10H6C6 7.79 7.79 6 10 6V4H7zm10 0c-2.21 0-4 1.79-4 4v8h6V10h-3c0-2.21 1.79-4 4-4V4h-3z" />
      </svg>
      <blockquote className="mt-3 text-sm leading-relaxed text-ink-800">
        “{text}”
      </blockquote>
      <figcaption className="mt-5 border-t border-ink-100 pt-4">
        <div className="text-sm font-semibold text-ink-950">{author}</div>
        <div className="text-xs text-ink-500">{meta}</div>
      </figcaption>
    </figure>
  );
}

function Avatars() {
  return (
    <div className="flex -space-x-2">
      {[12, 47, 33, 44].map((i) => (
        <Image
          key={i}
          src={`https://i.pravatar.cc/64?img=${i}`}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 rounded-full border-2 border-[#fafaf6] object-cover"
        />
      ))}
    </div>
  );
}

function FloatingPreview() {
  return (
    <div className="relative h-[560px]">
      {/* Job posting card */}
      <div className="absolute left-0 top-0 w-[88%] -rotate-[3deg] card p-4 shadow-[0_18px_50px_-15px_rgba(14,17,13,0.25)]">
        <div className="flex items-center gap-2 text-xs">
          <span className="pill bg-brand-100 text-brand-800">Abierto</span>
          <span className="pill bg-ink-50 text-ink-700">🔧 Plomería</span>
          <span className="text-ink-500">hace 12 min</span>
        </div>
        <div className="mt-2 text-sm font-semibold leading-snug">
          Pérdida abajo de la pileta de la cocina, gotea hace 2 días
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1">
          {[
            "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=60",
            "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=400&q=60",
            "https://images.unsplash.com/photo-1585129777188-c79e9f190c0c?auto=format&fit=crop&w=400&q=60",
          ].map((src, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-lg bg-ink-100"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="100px" />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-ink-600">Palermo · Juana M.</span>
          <span className="font-semibold">$25k – $60k</span>
        </div>
      </div>

      {/* Price range chip */}
      <div className="absolute right-0 top-[160px] w-[68%] rotate-[2deg] card p-4 shadow-[0_18px_50px_-15px_rgba(14,17,13,0.25)]">
        <div className="text-[11px] uppercase tracking-wider text-ink-500">
          Rango de referencia
        </div>
        <div className="mt-1 text-2xl font-semibold">
          $24.000 — $58.000
        </div>
        <div className="mt-2 text-xs text-ink-600">
          Plomería · Palermo · hoy
        </div>
        <div className="relative mt-3 h-2 rounded-full bg-ink-100">
          <div className="absolute left-[12%] right-[18%] top-0 h-2 rounded-full bg-zap-300" />
          <div className="absolute left-[12%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-ink-950" />
          <div className="absolute right-[18%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-ink-950" />
        </div>
      </div>

      {/* Offer card */}
      <div className="absolute bottom-0 left-[8%] w-[92%] rotate-[1deg] card p-4 shadow-[0_18px_50px_-15px_rgba(14,17,13,0.25)]">
        <div className="flex items-center gap-3">
          <Image
            src="https://i.pravatar.cc/64?img=12"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-full"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <div className="truncate text-sm font-semibold">
                Martín Acosta
              </div>
              <span className="pill bg-zap-300 text-ink-950">Top Pro</span>
            </div>
            <div className="text-xs text-ink-600">
              Plomero matriculado · ★ 4.96 (87)
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wider text-ink-500">
              oferta
            </div>
            <div className="text-base font-semibold">$36.500</div>
          </div>
        </div>
        <div className="mt-3 flex gap-2 text-xs">
          <button className="flex-1 rounded-full bg-ink-950 px-3 py-2 font-medium text-white">
            Aceptar
          </button>
          <button className="rounded-full border border-ink-200 px-3 py-2 font-medium">
            Chatear
          </button>
        </div>
      </div>
    </div>
  );
}
