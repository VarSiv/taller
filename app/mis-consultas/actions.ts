"use server";

import { createSupabaseServer } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function aceptarPropuesta(propuestaId: string, publicacionId: string) {
  const supabase = await createSupabaseServer();

  const codigo_pago = String(Math.floor(1000 + Math.random() * 9000));

  const [{ error: errProp }, { error: errPub }] = await Promise.all([
    supabase.from("propuestas").update({ estado: "aceptada", codigo_pago }).eq("id", propuestaId),
    supabase.from("publicaciones").update({ status: "cerrado" }).eq("id", publicacionId),
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
