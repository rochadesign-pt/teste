import { motion } from "framer-motion";

import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal, staggerContainer, staggerItem } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { teams } from "@/data/teams";
import { cn } from "@/lib/utils";

export default function Equipas() {
  return (
    <>
      <PageHeader
        eyebrow="Equipas"
        title={
          <>
            Do primeiro drible <span className="text-gold-500">ao título</span>
          </>
        }
        description="Mais de dez escalões, do Baby Basket aos Seniores. A formação é a alma do Illiabum — e a equipa principal é o palco onde ela brilha."
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container-site">
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-5%" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {teams.map((team) => (
              <motion.li
                key={team.slug}
                variants={staggerItem}
                className={cn(team.featured && "sm:col-span-2 lg:col-span-3")}
              >
                <article
                  className={cn(
                    "group flex h-full flex-col justify-between gap-8 p-6 transition-colors md:p-8",
                    team.featured
                      ? "court-lines bg-bordeaux-900 text-white md:flex-row md:items-end"
                      : "border-2 border-ink-950/10 bg-white hover:border-ink-950",
                  )}
                >
                  <div>
                    <span
                      className={cn(
                        "font-display text-7xl md:text-8xl",
                        team.featured
                          ? "text-gold-500"
                          : "text-ink-950/10 transition-colors group-hover:text-gold-500",
                      )}
                    >
                      {team.short}
                    </span>
                    <h2 className="display-title mt-4 text-3xl md:text-4xl">{team.name}</h2>
                    <p
                      className={cn(
                        "mt-3 max-w-xl text-sm leading-relaxed",
                        team.featured ? "text-white/70" : "text-ink-950/60",
                      )}
                    >
                      {team.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-4">
                    <Badge variant={team.featured ? "gold" : "bordeaux"}>
                      {team.competition}
                    </Badge>
                    {team.featured && (
                      <p className="text-xs uppercase tracking-wider2 text-white/50">
                        Plantel e equipa técnica [a adicionar]
                      </p>
                    )}
                  </div>
                </article>
              </motion.li>
            ))}
          </motion.ul>

          <Reveal className="mt-16">
            <div className="flex flex-col items-start justify-between gap-6 border-2 border-ink-950 bg-gold-500 p-8 md:flex-row md:items-center md:p-10">
              <div>
                <h2 className="display-title text-3xl md:text-4xl">
                  Queres experimentar basquetebol?
                </h2>
                <p className="mt-2 max-w-xl text-sm text-ink-950/70">
                  As captações estão abertas para todos os escalões, dos 4 aos 18 anos.
                  Primeira semana de treinos sem compromisso.
                </p>
              </div>
              <Button asChild variant="dark" size="lg">
                <a href="/contactos">Fala connosco</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
