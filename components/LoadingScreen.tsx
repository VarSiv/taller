"use client";

export function LoadingScreen({ message = "Cargando…" }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f5fdf9] animate-in fade-in duration-200">
      {/* Wordmark */}
      <div className="mb-10 flex items-center gap-2.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sv-dark shadow-lg">
          <span className="font-display text-xl font-bold text-sv-primary">S</span>
        </div>
        <span className="font-display text-[26px] font-semibold tracking-tight text-sv-dark">SolvIT</span>
      </div>

      {/* Spinner de anillo */}
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-[3px] border-sv-primary/15" />
        <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-sv-primary" />
      </div>

      {/* Mensaje */}
      <p className="mt-5 text-sm font-medium text-ink-400">{message}</p>

      {/* Puntos animados */}
      <div className="mt-3 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-1.5 w-1.5 animate-bounce rounded-full bg-sv-primary/40"
            style={{ animationDelay: `${i * 160}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
