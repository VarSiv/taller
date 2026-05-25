interface Props {
  icon: string;
  hue: number;
  className?: string;
}

export function CategoryArt({ icon, hue, className = "" }: Props) {
  const bg = `oklch(0.90 0.07 ${hue})`;
  const glow = `oklch(0.78 0.10 ${hue})`;

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        background: `radial-gradient(ellipse at 60% 35%, ${glow} 0%, ${bg} 70%)`,
      }}
    >
      <span
        className="select-none text-5xl"
        style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.18))" }}
      >
        {icon}
      </span>
    </div>
  );
}
