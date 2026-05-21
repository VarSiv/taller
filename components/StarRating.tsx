export function StarRating({
  rating,
  reviews,
  size = "sm",
}: {
  rating: number;
  reviews?: number;
  size?: "sm" | "md" | "lg";
}) {
  const text =
    size === "lg" ? "text-base" : size === "md" ? "text-sm" : "text-[13px]";
  return (
    <div className={`inline-flex items-center gap-1 ${text}`}>
      <Star />
      <span className="font-semibold text-ink-950">{rating.toFixed(2)}</span>
      {typeof reviews === "number" && (
        <span className="text-ink-500">({reviews})</span>
      )}
    </div>
  );
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="#0e110d" aria-hidden>
      <path d="M10 1.6l2.6 5.3 5.9.9-4.3 4.2 1 5.9L10 15.1l-5.3 2.8 1-5.9L1.4 7.8l5.9-.9L10 1.6z" />
    </svg>
  );
}
