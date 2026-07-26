import { Marquee } from "@/components/motion/Marquee";

const items = [
  "Illiabum Clube",
  "Desde 1943",
  "Ílhavo",
  "Bicampeões Nacionais",
  "Formação",
  "Uma cidade, um clube",
];

// Faixa amarela contínua a separar o hero do resto da página — ritmo de pavilhão.
export function Ticker() {
  return (
    <Marquee className="border-y-4 border-ink-950 bg-gold-500 py-3 text-ink-950">
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center gap-6 pr-6 font-display text-xl uppercase tracking-wide md:text-2xl"
        >
          {item}
          <span className="size-2 rounded-full bg-ink-950" />
        </span>
      ))}
    </Marquee>
  );
}
