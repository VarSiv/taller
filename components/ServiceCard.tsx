import Image from "next/image";
import Link from "next/link";
import { formatARS, proById, type Service } from "@/lib/data";
import { StarRating } from "./StarRating";

export function ServiceCard({ service }: { service: Service }) {
  const pro = proById(service.proId);
  return (
    <Link
      href={`/servicio/${service.slug}`}
      className="group card overflow-hidden transition-shadow hover:shadow-[0_8px_30px_rgba(14,17,13,0.08)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
        />
        {service.tags?.[0] && (
          <span className="absolute left-3 top-3 pill bg-white/95 text-ink-900 backdrop-blur">
            {service.tags[0]}
          </span>
        )}
      </div>
      <div className="p-4">
        {pro && (
          <div className="mb-2 flex items-center gap-2">
            <Image
              src={pro.avatar}
              alt={pro.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-xs text-ink-600">{pro.name}</span>
            {pro.badges.includes("Top Pro") && (
              <span className="pill bg-zap-300 text-ink-950">Top Pro</span>
            )}
          </div>
        )}
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-ink-950 group-hover:underline">
          {service.title}
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <StarRating rating={service.rating} reviews={service.reviewsCount} />
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-ink-500">
              desde
            </div>
            <div className="text-sm font-semibold text-ink-950">
              {formatARS(service.priceFrom)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
