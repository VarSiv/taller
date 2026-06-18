import { Header } from "@/components/Header";
import { Suspense } from "react";
import { PendienteClient } from "./PendienteClient";

export default function PendientePage() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <PendienteClient />
      </Suspense>
    </>
  );
}
