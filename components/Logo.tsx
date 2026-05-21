import Link from "next/link";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const fontSize =
    size === "sm" ? "text-xl" : size === "lg" ? "text-3xl" : "text-2xl";
  return (
    <Link href="/" className="inline-flex items-center gap-1.5 group">
      <span className={`display ${fontSize} text-ink-950 leading-none`}>
        Solv
      </span>
      <span
        className={`display ${fontSize} text-ink-950 leading-none italic`}
        style={{ textDecoration: "underline", textDecorationColor: "#d4ff3a", textDecorationThickness: "4px", textUnderlineOffset: "1px" }}
      >
        IT
      </span>
      <span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-zap-300 transition-transform group-hover:scale-150" />
    </Link>
  );
}
