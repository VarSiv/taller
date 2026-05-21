import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostedJobCard } from "@/components/PostedJobCard";
import { POSTED_JOBS, PROS, formatARS } from "@/lib/data";

export default function MisPublicacionesPage() {
  const myJob = POSTED_JOBS[0];
  const offers = PROS.slice(0, 3).map((p, i) => ({
    pro: p,
    amount: [32500, 38000, 45000][i],
    eta: ["Hoy 17:30", "Mañana AM", "Hoy 19:00"][i],
    note: [
      "Llego con cable de 30 m y bomba si hace falta. Voy con factura.",
      "Tengo libre la mañana. Si lo cierro hoy aprovecho a llevar repuesto del flexible.",
      "Para esa hora puedo. Necesito 1 h y media estimada.",
    ][i],
  }));

  return (
    <>
      <Header />
      <main className="container-pad py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="display text-4xl">Mis publicaciones</h1>
            <p className="mt-2 text-ink-600">
              Acá vas a ver el estado de cada pedido y las ofertas que te
              llegan.
            </p>
          </div>
          <Link href="/publicar" className="btn-primary">
            Nueva publicación
          </Link>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 border-b border-ink-100 text-sm">
          <button className="border-b-2 border-ink-950 px-4 py-2 font-medium text-ink-950">
            Activas <span className="text-ink-500">(3)</span>
          </button>
          <button className="px-4 py-2 text-ink-600 hover:text-ink-900">
            En curso <span className="text-ink-400">(1)</span>
          </button>
          <button className="px-4 py-2 text-ink-600 hover:text-ink-900">
            Cerradas <span className="text-ink-400">(7)</span>
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,360px]">
          {/* Detail of current job */}
          <div>
            <div className="card overflow-hidden">
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="pill bg-brand-100 text-brand-800">
                    Recibiendo ofertas
                  </span>
                  <span className="pill bg-ink-50 text-ink-700">
                    🔧 Plomería · Palermo
                  </span>
                  <span className="pill bg-ink-50 text-ink-700">
                    Publicado hace 12 min
                  </span>
                </div>
                <h2 className="display mt-3 text-2xl">{myJob.title}</h2>
                <p className="mt-2 text-sm text-ink-700">{myJob.description}</p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=60",
                    "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=400&q=60",
                    "https://images.unsplash.com/photo-1585129777188-c79e9f190c0c?auto=format&fit=crop&w=400&q=60",
                  ].map((src) => (
                    <div
                      key={src}
                      className="relative aspect-square overflow-hidden rounded-xl bg-ink-100"
                    >
                      <Image src={src} alt="" fill sizes="200px" className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-ink-100 bg-ink-50 p-4 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-ink-700">
                    Rango: {formatARS(myJob.budget.min)} – {formatARS(myJob.budget.max)}
                  </span>
                  <div className="flex gap-2">
                    <button className="btn-ghost text-xs">Editar</button>
                    <button className="btn-outline text-xs">Cerrar pedido</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Offers */}
            <h3 className="display mt-10 text-2xl">
              Ofertas recibidas <span className="text-ink-500">({offers.length})</span>
            </h3>
            <div className="mt-4 space-y-3">
              {offers.map(({ pro, amount, eta, note }, i) => (
                <div key={pro.id} className="card p-5">
                  <div className="flex gap-4">
                    <Image
                      src={pro.avatar}
                      alt={pro.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/profesional/${pro.slug}`}
                          className="text-sm font-semibold text-ink-950 hover:underline"
                        >
                          {pro.name}
                        </Link>
                        {pro.badges.includes("Top Pro") && (
                          <span className="pill bg-zap-300 text-ink-950">
                            Top Pro
                          </span>
                        )}
                        <span className="text-xs text-ink-500">
                          ★ {pro.rating} ({pro.reviewsCount}) · {pro.responseTime}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-ink-700">{note}</p>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs text-ink-500">
                          Llegada estimada: <strong className="text-ink-800">{eta}</strong>
                        </span>
                        <div className="text-right">
                          <div className="text-[11px] uppercase tracking-wider text-ink-500">
                            Oferta
                          </div>
                          <div className="display text-2xl">
                            {formatARS(amount)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button className="btn-primary text-xs">
                          Aceptar y conectar
                        </button>
                        <button className="btn-outline text-xs">
                          Chatear
                        </button>
                        <button className="btn-ghost text-xs">
                          Descartar
                        </button>
                      </div>
                    </div>
                  </div>
                  {i === 0 && (
                    <div className="mt-4 rounded-xl border border-zap-300 bg-zap-50 p-3 text-xs">
                      <strong>Recomendado por SolvIT.</strong> Su precio está
                      dentro del rango de referencia y tiene la mejor
                      reputación en plomería en Palermo.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <aside>
            <div className="sticky top-24 space-y-4">
              <div className="card p-5">
                <div className="text-xs uppercase tracking-wider text-ink-500">
                  Estado del pedido
                </div>
                <ol className="mt-4 space-y-3 text-sm">
                  <Tick done label="Publicado" />
                  <Tick done label="Ofertas recibidas" sub="3 ofertas en 12 min" />
                  <Tick label="Aceptar oferta" current />
                  <Tick label="Trabajo realizado" />
                  <Tick label="Cierre con código" />
                </ol>
              </div>

              <div className="card border-zap-300 bg-zap-50 p-5">
                <div className="text-xs uppercase tracking-wider text-ink-600">
                  Tarifa de conexión
                </div>
                <div className="display mt-1 text-3xl">$4.500</div>
                <p className="mt-2 text-xs text-ink-700">
                  Se cobra recién cuando aceptás una oferta. Si cerrás el pedido
                  sin aceptar, no pagás nada.
                </p>
              </div>

              <div className="card p-5">
                <div className="text-sm font-semibold">¿Necesitás ayuda?</div>
                <p className="mt-1 text-xs text-ink-600">
                  Hablá con un coordinador humano si tenés dudas.
                </p>
                <button className="btn-outline mt-3 w-full text-xs">
                  Abrir chat de soporte
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Tick({
  label,
  sub,
  done,
  current,
}: {
  label: string;
  sub?: string;
  done?: boolean;
  current?: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-[10px] font-bold ${
          done
            ? "bg-brand-100 text-brand-700"
            : current
              ? "bg-zap-300 text-ink-950"
              : "bg-ink-100 text-ink-400"
        }`}
      >
        {done ? "✓" : "•"}
      </span>
      <div>
        <div
          className={
            done
              ? "text-ink-800 line-through"
              : current
                ? "font-semibold text-ink-950"
                : "text-ink-500"
          }
        >
          {label}
        </div>
        {sub && <div className="text-xs text-ink-500">{sub}</div>}
      </div>
    </li>
  );
}
