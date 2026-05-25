"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function EliminarPublicacion({ id }: { id: string }) {
  const router = useRouter();
  const [confirmando, setConfirmando] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleEliminar() {
    setLoading(true);
    await supabase.from("publicaciones").delete().eq("id", id);
    router.refresh();
  }

  if (confirmando) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-ink-400">¿Seguro?</span>
        <button
          type="button"
          onClick={handleEliminar}
          disabled={loading}
          className="text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
        >
          {loading ? "Eliminando…" : "Sí, eliminar"}
        </button>
        <button
          type="button"
          onClick={() => setConfirmando(false)}
          className="text-xs text-ink-400 hover:text-ink-600"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirmando(true)}
      className="text-xs text-ink-400 hover:text-red-600 transition-colors"
    >
      Eliminar
    </button>
  );
}
