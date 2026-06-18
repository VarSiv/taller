import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const supabase = await createSupabaseServer();

  const { data: pubId, error } = await supabase.rpc("confirm_publication", {
    token,
  });

  if (error || !pubId) {
    return NextResponse.redirect(
      new URL("/publicar/pendiente?error=token_invalido", req.url)
    );
  }

  return NextResponse.redirect(new URL("/publicar/exito", req.url));
}
