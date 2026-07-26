import { Link } from "react-router-dom";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";

// CTA final de contraste — sócio + captações.
export function JoinCTA() {
  return (
    <section className="halftone bg-ink-950 py-20 text-white md:py-28">
      <div className="container-site text-center">
        <Reveal>
          <p className="eyebrow-light mb-4">Junta-te ao Illiabum</p>
          <h2 className="display-title mx-auto max-w-4xl text-5xl md:text-7xl">
            O clube é de quem <span className="text-gold-500">o vive</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/70">
            Torna-te sócio, inscreve os miúdos na formação ou aparece no pavilhão num
            dia de jogo. Há muitas formas de vestir o bordô e amarelo.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/contactos#socios">Torna-te Sócio</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link to="/equipas">Inscrições na formação</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
