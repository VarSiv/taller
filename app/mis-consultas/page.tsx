import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { createSupabaseServer } from "@/lib/supabase-server";
import { DemandanteView } from "./DemandanteView";
import { OferenteView } from "./OferenteView";

export const revalidate = 0;

export default async function MisConsultasPage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const esProfesional = user.user_metadata?.es_profesional === true;
  const nombre = user.user_metadata?.nombre as string | undefined;
  const apellido = user.user_metadata?.apellido as string | undefined;
  const email = user.email;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f5fdf9]">
        <div className="container-pad py-10">
          {esProfesional ? (
            <OferenteData userId={user.id} nombre={nombre} apellido={apellido} email={email} />
          ) : (
            <DemandanteData userId={user.id} nombre={nombre} apellido={apellido} email={email} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

async function DemandanteData({
  userId,
  nombre,
  apellido,
  email,
}: {
  userId: string;
  nombre?: string;
  apellido?: string;
  email?: string;
}) {
  const supabase = await createSupabaseServer();

  const { data: publicaciones } = await supabase
    .from("publicaciones")
    .select("id, title, description, category_slug, zone, status, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const pubIds = (publicaciones ?? []).map((p) => p.id);

  const { data: propuestas, error: propError } =
    pubIds.length > 0
      ? await supabase
          .from("propuestas")
          .select("*")
          .in("publicacion_id", pubIds)
          .order("precio", { ascending: true })
      : { data: [], error: null };

  if (propError) console.error("[mis-consultas] propuestas fetch error:", propError.message);

  const publicacionesConPropuestas = (publicaciones ?? []).map((pub) => ({
    ...pub,
    propuestas: (propuestas ?? []).filter((p) => p.publicacion_id === pub.id),
  }));

  return (
    <DemandanteView
      publicaciones={publicacionesConPropuestas}
      nombre={nombre}
      apellido={apellido}
      email={email}
    />
  );
}

async function OferenteData({
  userId,
  nombre,
  apellido,
  email,
}: {
  userId: string;
  nombre?: string;
  apellido?: string;
  email?: string;
}) {
  const supabase = await createSupabaseServer();

  const { data: propuestas, error: propError } = await supabase
    .from("propuestas")
    .select("*")
    .eq("profesional_id", userId)
    .order("created_at", { ascending: false });

  if (propError) console.error("[mis-consultas] oferente propuestas error:", propError.message);

  return (
    <OferenteView
      propuestas={propuestas ?? []}
      nombre={nombre}
      apellido={apellido}
      email={email}
    />
  );
}
