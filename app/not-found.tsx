import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container-pad py-32 text-center">
        <div className="text-6xl">🛠️</div>
        <h1 className="display mt-4 text-5xl">Esta página se rompió.</h1>
        <p className="mt-2 text-ink-600">
          Algo no anda. Probá volver al inicio o publicar tu problema.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">
            Volver al inicio
          </Link>
          <Link href="/publicar" className="btn-outline">
            Publicar problema
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
