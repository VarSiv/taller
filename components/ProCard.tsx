import Image from "next/image";
import Link from "next/link";
import { type Pro } from "@/lib/data";
import { StarRating } from "./StarRating";

export function ProCard({ pro }: { pro: Pro }) {
  return (
    <Link
      href={`/profesional/${pro.slug}`}
      className="card flex gap-4 p-4 transition hover:border-ink-300"
    >
      <Image
        src={pro.avatar}
        alt={pro.name}
        width={64}
        height={64}
        className="h-16 w-16 flex-none rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-ink-950">
              {pro.name}
            </div>
            <div className="truncate text-xs text-ink-600">{pro.title}</div>
          </div>
          {pro.badges.includes("Top Pro") && (
            <span className="pill bg-zap-300 text-ink-950">Top Pro</span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-3 text-xs text-ink-600">
          <StarRating rating={pro.rating} reviews={pro.reviewsCount} />
          <span>·</span>
          <span>{pro.jobsCompleted} trabajos</span>
        </div>
        <div className="mt-1 truncate text-xs text-ink-500">{pro.zone}</div>
      </div>
    </Link>
  );
}
