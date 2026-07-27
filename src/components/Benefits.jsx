import { motion, useReducedMotion } from 'framer-motion'
import { product } from '../data/product'

const EASE = [0.32, 0.72, 0, 1]

export function Benefits() {
  const reduce = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  }
  const card = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-14 max-w-2xl"
      >
        <p className="mb-4 text-xs font-bold tracking-[0.2em] text-accent">PORQUÊ O HTG-30</p>
        <h2 className="font-display text-4xl leading-[1.02] font-black uppercase sm:text-5xl lg:text-6xl">
          Feito para a gordura
          <br />
          que mais ninguém tira.
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {product.benefits.map((b, i) => (
          <motion.article
            key={b.title}
            variants={card}
            whileHover={reduce ? {} : { y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className={`flex min-h-[280px] flex-col justify-between rounded-3xl p-7 ${
              i === 0 ? 'bg-accent text-white' : i === 3 ? 'bg-ink text-white' : 'bg-white shadow-sm'
            }`}
          >
            <span className="font-display text-sm font-extrabold opacity-50">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display mb-3 text-xl leading-tight font-extrabold uppercase">
                {b.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-80">{b.text}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
