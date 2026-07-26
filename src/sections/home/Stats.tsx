import { motion } from "framer-motion";

import { Counter } from "@/components/motion/Counter";
import { Reveal, staggerContainer, staggerItem } from "@/components/motion/Reveal";
import { stats } from "@/data/club";

// Base estrutural: Relume Stats 15/16 (stats sobre fundo escuro),
// com contadores GSAP e tipografia de marcador.
export function Stats() {
  return (
    <section className="court-lines bg-bordeaux-900 py-16 text-white md:py-24">
      <div className="container-site">
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <p className="eyebrow-light mb-3">O clube em números</p>
          <h2 className="display-title text-4xl md:text-6xl">
            Mais do que um clube, <span className="text-gold-500">uma cidade inteira</span>
          </h2>
        </Reveal>

        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="border-l-2 border-gold-500 pl-5"
            >
              <dt className="order-2 mt-3 block text-sm text-white/60">
                {stat.label}
              </dt>
              <dd className="order-1">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-6xl leading-none text-white md:text-7xl"
                />
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
