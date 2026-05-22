import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ExitoPage() {
  return (
    <>
      <Header />
      <main className="container-pad py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zap-300 text-3xl">
            ✓
          </div>
          <h1 className="display mt-6 text-4xl md:text-5xl">
            ¡Listo! Tu pedido está publicado.
          </h1>
          <p className="mt-4 text-lg text-ink-700">
            Le mostramos tu problema a los técnicos verificados de tu zona. Te
            avisamos por email y por la app cuando lleguen las primeras
            ofertas.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">
              Volver al inicio
            </Link>
          </div>

          <div className="mt-12 card border-zap-300 bg-zap-50 p-5 text-left">
            <div className="text-sm font-semibold">Recordá:</div>
            <p className="mt-1 text-sm text-ink-700">
              No te cobramos nada hasta que aceptes una oferta. Si nadie toma
              tu trabajo o no concretás, no pagás la tarifa de conexión.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
