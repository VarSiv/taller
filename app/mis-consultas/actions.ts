"use server";

import { createSupabaseServer } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function aceptarPropuesta(propuestaId: string, publicacionId: string) {
  const supabase = await createSupabaseServer();

  // Verificar que la publicación pertenece al usuario autenticado
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  const { data: pub } = await supabase
    .from("publicaciones")
    .select("user_id")
    .eq("id", publicacionId)
    .single();

  if (!pub || pub.user_id !== user.id) throw new Error("No autorizado");

  const codigo_pago = String(Math.floor(1000 + Math.random() * 9000));
  const now = new Date().toISOString();

  const [{ error: errProp }, { error: errPub }] = await Promise.all([
    supabase.from("propuestas").update({
      estado: "aceptada",
      codigo_pago,
      aceptada_at: now,
    }).eq("id", propuestaId),
    // en_curso: propuesta aceptada, trabajo en progreso (NO cerrado todavía)
    supabase.from("publicaciones").update({ status: "en_curso" }).eq("id", publicacionId),
  ]);

  if (errProp) console.error("[aceptarPropuesta] propuestas update:", errProp.message);
  if (errPub)  console.error("[aceptarPropuesta] publicaciones update:", errPub.message);

  revalidatePath("/mis-consultas");
}

export async function rechazarPropuesta(propuestaId: string) {
  const supabase = await createSupabaseServer();
  await supabase.from("propuestas").update({ estado: "rechazada" }).eq("id", propuestaId);
  revalidatePath("/mis-consultas");
}

export async function confirmarCodigo(
  propuestaId: string,
  codigo: string
): Promise<{ ok: true } | { error: string }> {
  const supabase = await createSupabaseServer();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autenticado" };

  // Solo el profesional dueño de la propuesta puede confirmarla
  const { data: propuesta } = await supabase
    .from("propuestas")
    .select("profesional_id, codigo_pago, publicacion_id, estado")
    .eq("id", propuestaId)
    .single();

  if (!propuesta) return { error: "Propuesta no encontrada" };
  if (propuesta.profesional_id !== user.id) return { error: "No autorizado" };
  if (propuesta.estado !== "aceptada") return { error: "La propuesta no está en estado correcto" };

  // Comparación exacta — no se loguea el código correcto
  if (propuesta.codigo_pago !== codigo.trim()) {
    return { error: "Código incorrecto. Pedíselo al demandante cuando el servicio esté completo." };
  }

  const now = new Date().toISOString();

  const [{ error: errProp }, { error: errPub }] = await Promise.all([
    supabase.from("propuestas").update({
      estado: "completada",
      codigo_ingresado_at: now,
    }).eq("id", propuestaId),
    supabase.from("publicaciones").update({
      status: "cerrado",
      cerrada_at: now,
    }).eq("id", propuesta.publicacion_id),
  ]);

  if (errProp) return { error: `Error al confirmar: ${errProp.message}` };
  if (errPub)  console.error("[confirmarCodigo] publicaciones update:", errPub.message);

  revalidatePath("/mis-consultas");
  return { ok: true };
}
