import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Reveal, staggerContainer, staggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { teams } from "@/data/teams";

// Grelha de escalões — cartões tipográficos com a sigla gigante,
// no espírito dos cartazes de jogo do clube.
export function TeamsPreview() {
  const preview = teams.slice(0, 4);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-site">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <Reveal>
            <p className="eyebrow mb-3">Equipas</p>
            <h2 className="display-title text-4xl md:text-6xl">
              Do Baby Basket <span className="text-bordeaux-800">aos Seniores</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button asChild variant="outline">
              <Link to="/equipas">Todas as equipas</Link>
            </Button>
          </Reveal>
        </div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {preview.map((team, index) => (
            <motion.li key={team.slug} variants={staggerItem}>
              <Link
                to="/equipas"
                className={
                  index === 0
                    ? "group flex min-h-64 flex-col justify-between bg-bordeaux-900 p-6 text-white transition-colors hover:bg-bordeaux-800"
                    : "group flex min-h-64 flex-col justify-between border-2 border-ink-950/10 bg-white p-6 transition-colors hover:border-ink-950"
                }
              >
                <span
                  className={
                    index === 0
                      ? "font-display text-6xl text-gold-500"
                      : "font-display text-6xl text-ink-950/10 transition-colors group-hover:text-gold-500"
                  }
                >
                  {team.short}
                </span>
                <span>
                  <span className="display-title block text-2xl">{team.name}</span>
                  <span
                    className={
                      index === 0
                        ? "mt-1 block text-xs uppercase tracking-wider2 text-white/60"
                        : "mt-1 block text-xs uppercase tracking-wider2 text-ink-950/50"
                    }
                  >
                    {team.competition}
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
