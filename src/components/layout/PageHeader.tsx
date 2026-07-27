import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { SplitReveal } from "@/components/motion/SplitReveal";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

// Cabeçalho institucional das páginas interiores: bordô escuro, título
// gigante com reveal por linhas mascaradas, linha amarela que cresce.
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  const reduce = useReducedMotion();

  return (
    <section className="court-lines overflow-hidden bg-bordeaux-900 pb-16 pt-32 text-white md:pb-20 md:pt-44">
      <div className="container-site">
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.25, 1, 0.5, 1] }}
          className="eyebrow-light mb-4"
        >
          {eyebrow}
        </motion.p>

        <SplitReveal
          as="h1"
          delay={0.55}
          className="display-title max-w-4xl text-5xl text-white md:text-7xl"
        >
          {title}
        </SplitReveal>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85, ease: [0.25, 1, 0.5, 1] }}
            className="mt-6 max-w-2xl text-base text-white/70 md:text-lg"
          >
            {description}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduce ? 0.1 : 0.8, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="mt-8 h-1.5 w-24 origin-left bg-gold-500"
        />
      </div>
    </section>
  );
}
