import { cn } from "@/lib/utils";

// Emblema provisório — substituir pelo logótipo oficial do clube.
export function Crest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-9", className)} aria-hidden="true">
      <circle cx="16" cy="16" r="15" className="fill-bordeaux-900" />
      <circle
        cx="16"
        cy="16"
        r="15"
        fill="none"
        className="stroke-gold-500"
        strokeWidth="2"
      />
      <path
        d="M1 16h30M16 1v30M4 6c6 6 6 14 0 20M28 6c-6 6-6 14 0 20"
        fill="none"
        className="stroke-gold-500"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <Crest />
      <span
        className={cn(
          "font-display text-lg uppercase leading-none tracking-wide",
          light ? "text-white" : "text-ink-950",
        )}
      >
        Illiabum
        <span className="block text-[0.6rem] tracking-wider2 text-gold-600">
          Clube · 1943
        </span>
      </span>
    </span>
  );
}
