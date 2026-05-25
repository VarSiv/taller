import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FilterDropdown } from "@/components/FilterDropdown";
import { MarketplaceGrid } from "@/components/MarketplaceGrid";
import { CATEGORIES, POSTED_JOBS, ZONES, type PostedJob } from "@/lib/data";
import { supabase, type Publicacion } from "@/lib/supabase";
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
  const { data: dbJobs } = await supabase
    .from("publicaciones")
    .select("*")
    .neq("status", "cerrado")
    .order("created_at", { ascending: false });

  // Convertir al formato interno para filtrar igual que los estáticos
  const supabaseJobs: PostedJob[] = (dbJobs ?? []).map((p: Publicacion) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    categorySlug: p.category_slug,
    zone: p.zone,
    urgency: p.urgency as PostedJob["urgency"],
    photo: p.photo ?? "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=60",
    postedBy: p.posted_by,
    postedAgo: "reciente",
    budget: { min: 0, max: 0 },
    bidsCount: 0,
    status: p.status as PostedJob["status"],
  }));

  // Mezclar: primero los de Supabase, luego los estáticos
  const allJobs = [...supabaseJobs, ...POSTED_JOBS];

  const filtered = allJobs.filter((j) => {
    if (cat && j.categorySlug !== cat) return false;
    if (zona && !j.zone.toLowerCase().includes(zona.toLowerCase())) return false;
    if (q) {
      const hay = `${j.title} ${j.description}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const activeCount = (cat ? 1 : 0) + (zona ? 1 : 0);
  const supabaseJobIds = supabaseJobs.map((j) => j.id);

  return (
    <>
      <Header />
      <main>
        <section className="py-8">
          <div className="container-pad">

            <div className="mb-6 flex items-center gap-4">
              <FilterDropdown
                categories={CATEGORIES}
                zones={ZONES}
                cat={cat}
                zona={zona}
                q={q}
                activeCount={activeCount}
              />
              <span className="text-sm text-ink-400">
                {filtered.length} {filtered.length === 1 ? "consulta activa" : "consultas activas"}
              </span>
            </div>

            <MarketplaceGrid
              jobs={filtered}
              supabaseJobIds={supabaseJobIds}
              esProfesional={esProfesional}
              sinSesion={sinSesion}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

