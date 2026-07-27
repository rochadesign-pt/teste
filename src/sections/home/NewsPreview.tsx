import { motion } from "framer-motion";

import { NewsCard } from "@/components/NewsCard";
import { Reveal, staggerContainer, staggerItem } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button } from "@/components/ui/button";
import { articles } from "@/data/news";

export function NewsPreview() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container-site">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <Reveal>
              <p className="eyebrow mb-3">Notícias</p>
            </Reveal>
            <SplitReveal className="display-title text-4xl md:text-6xl">
              O que se passa <span className="text-bordeaux-800">no clube</span>
            </SplitReveal>
          </div>
          <Reveal delay={0.1}>
            <Button asChild variant="outline">
              <a href="/noticias">Todas as notícias</a>
            </Button>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {articles.slice(0, 3).map((article) => (
            <motion.div key={article.id} variants={staggerItem}>
              <NewsCard article={article} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
