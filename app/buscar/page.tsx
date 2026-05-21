import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { ServiceCard } from "@/components/ServiceCard";
import { CATEGORIES, SERVICES, ZONES } from "@/lib/data";

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string; zona?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.toLowerCase().trim() ?? "";
  const cat = params.cat ?? "";
  const zona = params.zona ?? "";

  const filtered = SERVICES.filter((s) => {
    if (cat && s.categorySlug !== cat) return false;
    if (zona && !s.zones.some((z) => z.toLowerCase().includes(zona.toLowerCase())))
      return false;
    if (q) {
      const hay = `${s.title} ${s.shortPitch} ${s.description} ${s.tags.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  return (
    <>
      <Header />
      <main>
        <section className="bg-white">
          <div className="container-pad py-8">
            <div className="max-w-3xl">
              <h1 className="display text-3xl md:text-4xl">
                {q
                  ? `Resultados para "${q}"`
                  : cat
                    ? `Servicios de ${CATEGORIES.find((c) => c.slug === cat)?.name ?? cat}`
                    : "Explorar servicios"}
              </h1>
              <p className="mt-2 text-ink-600">
                {filtered.length} servicios disponibles en Buenos Aires.
              </p>
              <div className="mt-6">
                <SearchBar size="md" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container-pad grid gap-8 lg:grid-cols-[260px,1fr]">
            <aside className="space-y-6">
              <FilterBlock title="Categoría">
                <div className="space-y-1">
                  <Link
                    href={buildQuery({ q, zona })}
                    className={`block rounded-lg px-3 py-1.5 text-sm ${!cat ? "bg-ink-950 text-white" : "text-ink-700 hover:bg-ink-100"}`}
                  >
                    Todas
                  </Link>
                  {CATEGORIES.map((c) => (
                    <Link
                      key={c.slug}
                      href={buildQuery({ q, zona, cat: c.slug })}
                      className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-sm ${cat === c.slug ? "bg-ink-950 text-white" : "text-ink-700 hover:bg-ink-100"}`}
                    >
                      <span>
                        {c.icon} {c.name}
                      </span>
                      <span className={cat === c.slug ? "text-ink-300" : "text-ink-400"}>
                        {c.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </FilterBlock>

              <FilterBlock title="Zona">
                <div className="flex flex-wrap gap-1.5">
                  {ZONES.map((z) => {
                    const active = zona === z;
                    return (
                      <Link
                        key={z}
                        href={buildQuery({ q, cat, zona: active ? "" : z })}
                        className={`pill border ${active ? "border-ink-950 bg-ink-950 text-white" : "border-ink-200 bg-white text-ink-700 hover:border-ink-400"}`}
                      >
                        {z}
                      </Link>
                    );
                  })}
                </div>
              </FilterBlock>

              <FilterBlock title="Filtros rápidos">
                <Toggle label="Top Pro" />
                <Toggle label="Disponible hoy" />
                <Toggle label="Matriculado" />
                <Toggle label="Garantía incluida" />
              </FilterBlock>

              <div className="card border-zap-300 bg-zap-50 p-4 text-sm">
                <div className="font-semibold text-ink-950">
                  ¿No encontrás lo que buscás?
                </div>
                <p className="mt-1 text-ink-700">
                  Publicá tu problema y los técnicos compiten por tomarlo.
                </p>
                <Link href="/publicar" className="btn-primary mt-3 w-full">
                  Publicar problema
                </Link>
              </div>
            </aside>

            <div>
              {filtered.length === 0 ? (
                <div className="card p-10 text-center">
                  <div className="text-2xl">🤷</div>
                  <h3 className="display mt-2 text-2xl">
                    Sin resultados aún
                  </h3>
                  <p className="mt-2 text-ink-600">
                    Probá con otra búsqueda o publicá tu problema directo.
                  </p>
                  <Link href="/publicar" className="btn-primary mt-6">
                    Publicar mi problema
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mb-5 flex items-center justify-between text-sm text-ink-600">
                    <span>
                      Mostrando {filtered.length} de {SERVICES.length} servicios
                    </span>
                    <select className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm">
                      <option>Más relevantes</option>
                      <option>Mejor calificados</option>
                      <option>Precio: menor a mayor</option>
                      <option>Precio: mayor a menor</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((s) => (
                      <ServiceCard key={s.id} service={s} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function buildQuery(p: { q?: string; cat?: string; zona?: string }) {
  const sp = new URLSearchParams();
  if (p.q) sp.set("q", p.q);
  if (p.cat) sp.set("cat", p.cat);
  if (p.zona) sp.set("zona", p.zona);
  const s = sp.toString();
  return `/buscar${s ? `?${s}` : ""}`;
}

function FilterBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 text-xs uppercase tracking-wider text-ink-500">
        {title}
      </div>
      {children}
    </div>
  );
}

function Toggle({ label }: { label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-ink-800 hover:bg-ink-100">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-ink-300 accent-ink-950"
      />
      {label}
    </label>
  );
}
