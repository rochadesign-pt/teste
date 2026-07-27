import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isIlliabum, nextGame } from "@/data/games";
import { cn } from "@/lib/utils";

function TeamBlock({ name }: { name: string }) {
  const us = isIlliabum(name);
  const initials = us
    ? "IC"
    : name
        .replace(/[[\]]/g, "")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span
        className={cn(
          "flex size-20 items-center justify-center rounded-full font-display text-2xl md:size-28 md:text-4xl",
          us
            ? "bg-gold-500 text-ink-950"
            : "border-2 border-white/20 bg-white/5 text-white/60",
        )}
      >
        {initials}
      </span>
      <span className="display-title max-w-[12rem] text-xl text-white md:text-2xl">
        {name.replace(/[[\]]/g, "")}
      </span>
    </div>
  );
}

// Cartão "próximo jogo" ao estilo dos matchups NBA, com entrada em
// clip-reveal a abrir de baixo para cima.
export function NextGame() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow mb-3">Próximo jogo</p>
        </Reveal>
        <SplitReveal className="display-title text-4xl md:text-6xl">
          Dia de jogo <span className="text-bordeaux-800">no pavilhão</span>
        </SplitReveal>

        <motion.div
          initial={
            reduce
              ? { opacity: 0 }
              : { opacity: 0, clipPath: "inset(100% 0% 0% 0%)", y: 40 }
          }
          whileInView={
            reduce
              ? { opacity: 1 }
              : { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", y: 0 }
          }
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          viewport={{ once: true, margin: "-15%" }}
          className="mt-10 md:mt-14"
        >
          <div className="court-lines relative overflow-hidden bg-ink-950 px-6 py-12 text-white md:px-16 md:py-16">
            <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
              <TeamBlock name={nextGame.home} />
              <div className="text-center">
                <p className="font-display text-6xl text-gold-500 md:text-7xl">
                  {nextGame.time}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider2 text-white/50">
                  {nextGame.date}
                </p>
              </div>
              <TeamBlock name={nextGame.away} />
            </div>

            <div className="relative mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center">
              <Badge>{nextGame.competition}</Badge>
              <p className="text-sm text-white/60">
                {nextGame.round} · {nextGame.venue}
              </p>
              <Button asChild variant="outline-light" size="sm" className="mt-2">
                <Link to="/jogos">Calendário completo</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
