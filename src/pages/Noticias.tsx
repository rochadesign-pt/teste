import { motion } from "framer-motion";

import { NewsCard } from "@/components/NewsCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { staggerContainer, staggerItem } from "@/components/motion/Reveal";
import { articles } from "@/data/news";

export default function Noticias() {
  return (
    <>
      <PageHeader
        eyebrow="Notícias"
        title={
          <>
            O que se passa <span className="text-gold-500">no clube</span>
          </>
        }
        description="Resultados, formação, vida do clube e comunidade. Tudo o que é bordô e amarelo, num só sítio."
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container-site">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-5%" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {articles.map((article) => (
              <motion.div key={article.id} variants={staggerItem}>
                <NewsCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
