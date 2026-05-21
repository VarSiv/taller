import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ComoFuncionaPage() {
  return (
    <>
      <Header />
      <main>
        <section className="container-pad py-16">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-wider text-ink-500">
              Cómo funciona
            </span>
            <h1 className="display mt-2 text-5xl leading-[1.05] md:text-6xl">
              De la foto al técnico,
              <br />
              <span className="italic">sin ruleta.</span>
            </h1>
            <p className="mt-5 text-lg text-ink-700">
              SolvIT no es un directorio. Cobramos una tarifa fija de conexión
              solo si te conectamos con un técnico verificado. Nada de
              porcentajes sobre el trabajo, nada de “presupuesto según la cara”.
            </p>
          </div>
        </section>

        {/* Customer flow */}
        <section className="container-pad pb-20">
          <div className="card bg-white p-8 md:p-14">
            <h2 className="display text-3xl">Si necesitás resolver algo</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              <Step
                n="01"
                title="Publicás el problema"
                body="Subís fotos o video, describís el problema y la plataforma te muestra un rango de precios de referencia para esa intervención en tu zona."
              />
              <Step
                n="02"
                title="Técnicos verificados ofertan"
                body="Solo profesionales con identidad y antecedentes auditados pueden tomar tu pedido. Vienen con la matrícula a la vista, no en blanco."
              />
              <Step
                n="03"
                title="Aceptás y trabajamos"
                body="Elegís la oferta que más te convenza por precio y reputación. Recién ahí pagás la tarifa de conexión. Si no aceptás nada, no pagás."
              />
            </ol>
          </div>
        </section>

        {/* Pro flow */}
        <section className="bg-ink-950 py-20 text-white">
          <div className="container-pad">
            <h2 className="display text-3xl md:text-4xl">
              Si sos técnico
            </h2>
            <p className="mt-3 max-w-2xl text-ink-300">
              Cero comisiones sobre tu cotización. Llegás con el problema ya
              descripto y un rango aceptado. Vos cotizás y te quedás con el
              100%.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <DarkStep
                n="01"
                title="Te registrás y validamos"
                body="Entrevista presencial, antecedentes, matrícula si corresponde. Si todo está bien, quedás verificado en 48–72 hs."
              />
              <DarkStep
                n="02"
                title="Tomás los trabajos que querés"
                body="Filtrás por zona, rubro y rango de precio. Tu cronograma lo armás vos. Sin asignaciones obligatorias."
              />
              <DarkStep
                n="03"
                title="Cobrás íntegro al cierre"
                body="El pago del cliente queda respaldado por la plataforma y se libera con tu código de cierre. Sin retenciones."
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="container-pad py-20">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card p-8">
              <div className="text-xs uppercase tracking-wider text-ink-500">
                Para clientes
              </div>
              <div className="display mt-2 text-4xl">
                $4.500 <span className="text-base font-sans font-normal text-ink-500">por conexión</span>
              </div>
              <p className="mt-3 text-ink-700">
                Pagás solo si aceptás una oferta. Cubre la verificación del
                técnico, el respaldo del pago y la garantía de reparación.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink-700">
                <li>✅ $0 por publicar</li>
                <li>✅ $0 si nadie toma el trabajo</li>
                <li>✅ Indexada por IPC trimestralmente</li>
              </ul>
            </div>
            <div className="card border-zap-300 bg-zap-50 p-8">
              <div className="text-xs uppercase tracking-wider text-ink-600">
                Para profesionales
              </div>
              <div className="display mt-2 text-4xl">0% de comisión</div>
              <p className="mt-3 text-ink-700">
                No tocamos tu cotización. La tarifa la paga el cliente. Vos te
                quedás con el 100% de cada trabajo cerrado.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink-700">
                <li>✅ $0 por publicar ofertas</li>
                <li>✅ $0 por usar la app</li>
                <li>✅ Pago liberado al cierre del trabajo</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container-pad pb-20">
          <h2 className="display text-3xl">Preguntas frecuentes</h2>
          <div className="mt-6 divide-y divide-ink-100 border-y border-ink-100">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium text-ink-950">
                  {f.q}
                  <span className="text-ink-400 transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm text-ink-700">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-ink-950 p-8 text-white">
            <div>
              <h3 className="display text-2xl">¿Listo para probarlo?</h3>
              <p className="mt-1 text-ink-300">
                Publicá tu problema. Si nadie lo toma, no pagás nada.
              </p>
            </div>
            <Link href="/publicar" className="btn-zap">
              Publicar problema
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const FAQ = [
  {
    q: "¿Por qué cobran solo al aceptar una oferta?",
    a: "Porque el valor que aportamos es la conexión calificada. Si no te conectamos con un técnico que te sirve, no entregamos nada y no cobramos.",
  },
  {
    q: "¿Cómo verifican a los técnicos?",
    a: "Entrevista presencial, validación de identidad, antecedentes y matrícula cuando corresponde (gasistas, electricistas). La verificación se renueva anualmente.",
  },
  {
    q: "¿Qué pasa si el trabajo sale mal?",
    a: "Tenés 30 días de garantía de reparación incluida en cada trabajo gestionado por la plataforma. Si el técnico no responde, SolvIT te asigna otro sin costo.",
  },
  {
    q: "¿Pueden contactarme por fuera de la app?",
    a: "Sí, pero perdés la garantía, el respaldo del pago y la reputación auditada. La reputación del técnico también solo se acumula con trabajos hechos dentro de SolvIT.",
  },
  {
    q: "¿Hacen limpieza o servicios de rutina?",
    a: "No. Nos enfocamos en oficios técnicos donde la asimetría de información es grande. Para limpieza recurrente hay opciones mejores que nosotros.",
  },
];

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="card border-ink-100 p-6">
      <div className="font-mono text-xs text-brand-600">{n}</div>
      <div className="mt-3 text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-ink-700">{body}</div>
    </li>
  );
}

function DarkStep({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-900 p-6">
      <div className="font-mono text-xs text-zap-300">{n}</div>
      <div className="mt-3 text-lg font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm text-ink-300">{body}</div>
    </div>
  );
}
