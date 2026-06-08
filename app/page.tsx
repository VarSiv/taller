import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FilterDropdown } from "@/components/FilterDropdown";
import { MarketplaceGrid } from "@/components/MarketplaceGrid";
import { CATEGORIES, ZONES, type PostedJob } from "@/lib/data";
import { type Publicacion } from "@/lib/supabase";
import { createSupabaseServer } from "@/lib/supabase-server";

export const revalidate = 0; // siempre datos frescos

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string; zona?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.toLowerCase().trim() ?? "";
  const cat = params.cat ?? "";
  const zona = params.zona ?? "";

  // Rol del usuario actual
  const supabaseServer = await createSupabaseServer();
  const { data: { user } } = await supabaseServer.auth.getUser();
  const esProfesional = user?.user_metadata?.es_profesional === true;
  const sinSesion = !user;

  // Publicaciones de Supabase
  const { data: dbJobs } = await supabaseServer
    .from("publicaciones")
    .select("*")
    .neq("status", "cerrado")
    .order("created_at", { ascending: false });

  // IDs de publicaciones del usuario actual
  const misPublicacionesIds = user
    ? (dbJobs ?? []).filter((p: Publicacion) => p.user_id === user.id).map((p: Publicacion) => p.id)
    : [];

  // Convertir al formato interno para filtrar igual que los estáticos
  const supabaseJobs: PostedJob[] = (dbJobs ?? []).map((p: Publicacion) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    categorySlug: p.category_slug,
    zone: p.zone,
    urgency: p.urgency as PostedJob["urgency"],
    photo: p.photo ?? null,
    photos: p.photos ?? [],
    postedBy: p.posted_by,
    postedAgo: "reciente",
    budget: { min: 0, max: 0 },
    bidsCount: 0,
    status: p.status as PostedJob["status"],
  }));

  const allJobs = supabaseJobs;

  const filtered = allJobs.filter((j) => {
    if (cat && j.categorySlug !== cat) return false;
    if (zona && !j.zone.toLowerCase().includes(zona.toLowerCase())) return false;
    if (q) {
      const hay = `${j.title} ${j.description}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  // IDs de publicaciones donde el profesional ya tiene propuesta pendiente
  let yaContactadoIds: string[] = [];
  if (esProfesional && user) {
    const { data: propsPendientes } = await supabaseServer
      .from("propuestas")
      .select("publicacion_id")
      .eq("profesional_id", user.id)
      .eq("estado", "pendiente");
    yaContactadoIds = (propsPendientes ?? []).map((p: { publicacion_id: string }) => p.publicacion_id);
  }

  const activeCount = (cat ? 1 : 0) + (zona ? 1 : 0);
  const supabaseJobIds = supabaseJobs.map((j) => j.id);

  return (
    <>
      <Header />
      <main className={`overflow-x-hidden ${esProfesional ? "bg-[#0e1a17]" : ""}`}>

        {/* Hero — solo para visitantes sin sesión */}
        {sinSesion && (
          <section className="border-b border-ink-100/60 bg-white py-14 sm:py-20 lg:py-28">
            <div className="container-pad">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="display text-4xl leading-[1.12] text-sv-dark sm:text-5xl lg:text-6xl">
                  Tu problema<br />tiene solución.
                </h1>
                <p className="mt-4 text-base leading-relaxed text-ink-500 sm:text-lg lg:text-xl">
                  Describí lo que necesitás. Técnicos certificados te mandan
                  presupuesto en minutos, sin cargos hasta que aceptes.
                </p>
                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
                  <Link href="/publicar" className="btn-primary w-full py-4 text-base sm:w-auto sm:px-10">
                    Publicar mi problema
                  </Link>
                  <Link href="/registrar" className="btn-ghost w-full py-4 text-base text-ink-500 sm:w-auto sm:px-10">
                    Soy técnico, quiero trabajar →
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-400">
                  <span>✓ Sin cargo hasta aceptar</span>
                  <span>✓ Técnicos verificados</span>
                  <span>✓ Respuesta en minutos</span>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="min-h-screen py-10">
          <div className="container-pad">

            {/* Intro */}
            <div className="mb-8">
              <div className={`flex items-center gap-2 text-xs ${esProfesional ? "text-zap-500" : "text-ink-400"}`}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sv-primary" />
                <span className="font-medium uppercase tracking-widest">En vivo</span>
              </div>
              <h1 className={`display mt-1.5 text-3xl md:text-4xl ${esProfesional ? "text-white" : "text-sv-dark"}`}>
                Consultas activas
              </h1>
              <p className={`mt-1 text-sm ${esProfesional ? "text-zap-400" : "text-ink-400"}`}>
                {allJobs.length === 0
                  ? "Todavía no hay consultas publicadas."
                  : `${allJobs.length} ${allJobs.length === 1 ? "problema esperando un técnico" : "problemas esperando un técnico"}`}
              </p>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <FilterDropdown
                categories={CATEGORIES}
                zones={ZONES}
                cat={cat}
                zona={zona}
                q={q}
                activeCount={activeCount}
              />
              {(cat || zona || q) && (
                <span className="text-sm text-ink-400">
                  {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
                </span>
              )}
            </div>

            <MarketplaceGrid
              jobs={filtered}
              supabaseJobIds={supabaseJobIds}
              esProfesional={esProfesional}
              sinSesion={sinSesion}
              yaContactadoIds={yaContactadoIds}
              misPublicacionesIds={misPublicacionesIds}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

