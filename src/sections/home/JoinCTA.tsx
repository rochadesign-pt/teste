import { Link } from "react-router-dom";

import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button } from "@/components/ui/button";

// CTA final de contraste — marquee outline de fundo + botões magnéticos.
export function JoinCTA() {
  return (
    <section className="halftone relative overflow-hidden bg-ink-950 py-24 text-white md:py-36">
      <Marquee
        className="pointer-events-none absolute top-1/2 w-full -translate-y-1/2"
        duration={30}
      >
        <span className="text-outline pr-10 font-display text-[9rem] uppercase leading-none md:text-[15rem]">
          Torna-te Sócio · Torna-te Sócio ·&nbsp;
        </span>
      </Marquee>

      <div className="container-site relative text-center">
        <Reveal>
          <p className="eyebrow-light mb-4">Junta-te ao Illiabum</p>
        </Reveal>
        <SplitReveal className="display-title mx-auto max-w-4xl text-5xl text-white md:text-7xl">
          O clube é de quem <span className="text-gold-500">o vive</span>
        </SplitReveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-white/70">
            Torna-te sócio, inscreve os miúdos na formação ou aparece no pavilhão num
            dia de jogo. Há muitas formas de vestir o bordô e amarelo.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Magnetic>
              <Button asChild size="lg">
                <Link to="/contactos#socios">Torna-te Sócio</Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="outline-light" size="lg">
                <Link to="/equipas">Inscrições na formação</Link>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
