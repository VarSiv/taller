"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-zap-200 hover:text-white transition-colors"
    >
      Salir
    </button>
  );
}
