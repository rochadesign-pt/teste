import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { club } from "@/data/club";

// Base estrutural: Relume Header 113 (hero off-grid de 2 colunas sobre fundo
// escuro) — reconstruído com a identidade do clube e tipografia de cartaz.
export function Hero() {
  const reduce = useReducedMotion();

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.1 : 0.7, delay, ease: [0.25, 1, 0.5, 1] as const },
  });

  return (
    <section className="relative overflow-hidden bg-bordeaux-900 text-white">
      <div className="court-lines halftone absolute inset-0" />
      {/* Círculo central do campo, como elemento gráfico */}
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/2 hidden size-[44rem] -translate-y-1/2 rounded-full border-[3px] border-white/10 lg:block"
      >
        <div className="absolute inset-24 rounded-full border-[3px] border-gold-500/20" />
      </div>

      <div className="container-site relative flex min-h-svh max-h-[70rem] flex-col justify-end pb-16 pt-32 md:pb-20">
        <motion.p {...enter(0.05)} className="eyebrow-light mb-6">
          {club.city} · Desde {club.founded}
        </motion.p>

        <motion.h1
          {...enter(0.15)}
          className="display-title text-[19vw] leading-[0.85] sm:text-8xl md:text-9xl lg:text-[11rem]"
        >
          Illiabum
          <span className="block text-gold-500">Clube</span>
        </motion.h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:items-end md:gap-20">
          <motion.div {...enter(0.3)} className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/jogos">Ver Jogos</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link to="/clube">O Clube</Link>
            </Button>
          </motion.div>

          <motion.p {...enter(0.4)} className="max-w-md text-base text-white/70 md:text-lg">
            Mais de {new Date().getFullYear() - club.founded} anos de basquetebol, dois
            títulos de campeão nacional e uma formação que faz de Ílhavo terra de
            basquetebol. Isto é o Illiabum.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
