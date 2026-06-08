"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function LogoutButton({ dark = false }: { dark?: boolean }) {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className={`text-sm transition-colors ${
        dark
          ? "text-zap-300/70 hover:text-white"
          : "text-ink-400 hover:text-sv-dark"
      }`}
    >
      Salir
    </button>
  );
}
