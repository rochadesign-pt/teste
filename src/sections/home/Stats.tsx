import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Counter } from "@/components/motion/Counter";
import { staggerContainer, staggerItem } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { stats } from "@/data/club";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Base estrutural: Relume Stats 15/16. Contadores GSAP + ano de fundação
// gigante em outline a atravessar a secção ao ritmo do scroll.
export function Stats() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".stats-year",
        { xPercent: 12 },
        {
          xPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className="court-lines relative overflow-hidden bg-bordeaux-900 py-20 text-white md:py-28"
    >
      {/* Ano de fundação gigante em parallax */}
      <span
        aria-hidden="true"
        className="stats-year text-outline pointer-events-none absolute -top-6 left-0 font-display text-[16rem] leading-none md:text-[26rem]"
      >
        1943
      </span>

      <div className="container-site relative">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="eyebrow-light mb-3">O clube em números</p>
          <SplitReveal className="display-title text-4xl text-white md:text-6xl">
            Mais do que um clube, <span className="text-gold-500">uma cidade inteira</span>
          </SplitReveal>
        </div>

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
