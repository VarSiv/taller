import Image from "next/image";
import { categoryBySlug, formatARS, type PostedJob } from "@/lib/data";

const STATUS_LABEL: Record<PostedJob["status"], string> = {
  abierto: "Abierto",
  en_revision: "Revisando ofertas",
  asignado: "Asignado",
};

const STATUS_STYLE: Record<PostedJob["status"], string> = {
  abierto: "bg-brand-100 text-brand-800",
  en_revision: "bg-amber-100 text-amber-800",
  asignado: "bg-ink-100 text-ink-700",
};

const URGENCY_LABEL: Record<PostedJob["urgency"], string> = {
  hoy: "Hoy",
  esta_semana: "Esta semana",
  flexible: "Flexible",
};

export function PostedJobCard({ job }: { job: PostedJob }) {
  const cat = categoryBySlug(job.categorySlug);
  return (
    <div className="card p-4">
      <div className="flex gap-4">
        <div className="relative h-20 w-20 flex-none overflow-hidden rounded-xl bg-ink-100">
          <Image
            src={job.photo ?? ""}
            alt={job.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`pill ${STATUS_STYLE[job.status]}`}>
              {STATUS_LABEL[job.status]}
            </span>
            {cat && (
              <span className="pill bg-ink-50 text-ink-700">
                {cat.icon} {cat.name}
              </span>
            )}
            <span className="pill bg-ink-50 text-ink-700">
              Urgencia: {URGENCY_LABEL[job.urgency]}
            </span>
          </div>
          <h3 className="mt-2 text-sm font-semibold leading-snug text-ink-950">
            {job.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-ink-600">
            {job.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 pt-3 text-xs text-ink-600">
        <div className="flex items-center gap-3">
          <span>{job.postedBy}</span>
          <span>·</span>
          <span>{job.zone}</span>
          <span>·</span>
          <span>{job.postedAgo}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium text-ink-900">
            {formatARS(job.budget.min)} – {formatARS(job.budget.max)}
          </span>
          <span className="rounded-full bg-ink-950 px-2.5 py-0.5 text-[11px] font-medium text-white">
            {job.bidsCount} ofertas
          </span>
        </div>
      </div>
    </div>
  );
}
