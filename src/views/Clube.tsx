import { motion } from "framer-motion";

import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal, staggerContainer, staggerItem } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/badge";
import { club, honours, timeline } from "@/data/club";

function History() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_2fr]">
        <Reveal>
          <p className="eyebrow mb-3">A nossa história</p>
          <h2 className="display-title text-4xl md:text-5xl">
            De 1943 <span className="text-bordeaux-800">até hoje</span>
          </h2>
        </Reveal>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="relative border-l-2 border-ink-950/10 pl-8"
        >
          {timeline.map((item) => (
            <motion.li key={item.year} variants={staggerItem} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[2.55rem] top-1 size-4 rounded-full border-4 border-gold-500 bg-white" />
              <p className="font-display text-3xl text-bordeaux-800">{item.year}</p>
              <h3 className="display-title mt-1 text-2xl">{item.title}</h3>
              <p className="mt-2 max-w-xl text-ink-950/60">{item.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

function Honours() {
  return (
    <section className="court-lines bg-ink-950 py-16 text-white md:py-24">
      <div className="container-site">
        <Reveal className="mb-12">
          <p className="eyebrow-light mb-3">Palmarés</p>
          <h2 className="display-title text-4xl md:text-6xl">
            Troféus <span className="text-gold-500">com peso</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm text-white/50">
            Designações das competições conforme registos públicos — a validar com o
            histórico oficial do clube.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid gap-4 md:grid-cols-3"
        >
          {honours.map((honour) => (
            <motion.div
              key={honour.title}
              variants={staggerItem}
              className="border-2 border-white/10 p-8 transition-colors hover:border-gold-500"
            >
              <p className="font-display text-7xl text-gold-500">
                {honour.seasons.length}
                <span className="text-3xl text-white/40">×</span>
              </p>
              <h3 className="display-title mt-4 text-2xl">{honour.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {honour.seasons.map((season) => (
                  <Badge key={season} variant="outline-light">
                    {season}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Pavilion() {
  return (
    <section className="bg-neutral-100 py-16 md:py-24">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow mb-3">A nossa casa</p>
          <h2 className="display-title text-4xl md:text-5xl">{club.pavilion}</h2>
          <p className="mt-6 max-w-lg text-ink-950/60">
            É aqui que tudo acontece: os treinos da formação, os jogos da equipa
            sénior e as tardes de bancada cheia. Em dia de jogo, o pavilhão é o
            coração de Ílhavo.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          {/* Ilustração do campo — substituir por fotografia do pavilhão */}
          <div className="court-lines halftone relative aspect-[4/3] overflow-hidden bg-bordeaux-900">
            <div className="absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-gold-500/40" />
            <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-gold-500/40" />
            <p className="absolute bottom-4 right-5 text-[0.65rem] uppercase tracking-wider2 text-white/40">
              Fotografia do pavilhão [a adicionar]
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Clube() {
  return (
    <>
      <PageHeader
        eyebrow="O Clube"
        title={
          <>
            Uma cidade, <span className="text-gold-500">um clube</span>
          </>
        }
        description={`Fundado a ${club.foundedDate}, o Illiabum Clube é a instituição desportiva de referência de Ílhavo e um dos históricos do basquetebol português.`}
      />
      <History />
      <Honours />
      <Pavilion />
    </>
  );
}
