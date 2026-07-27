import { motion, useReducedMotion } from 'framer-motion'
import { product } from '../data/product'

const EASE = [0.32, 0.72, 0, 1]

const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`

export function Formats({ setFormat }) {
  const reduce = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  }
  const card = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  }

  const scrollTop = (id) => {
    setFormat(id)
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section className="bg-green-soft/60">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 flex flex-wrap items-end justify-between gap-6"
        >
          <h2 className="font-display text-4xl leading-[1.02] font-black uppercase sm:text-5xl lg:text-6xl">
            Do balcão
            <br />à cozinha inteira.
          </h2>
          <p className="max-w-xs text-sm leading-relaxed opacity-60">
            O mesmo poder desengordurante, em quatro formatos — do pulverizador
            diário à recarga de 20 litros.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {product.formats.map((f) => (
            <motion.button
              key={f.id}
              type="button"
              variants={card}
              onClick={() => scrollTop(f.id)}
              whileHover={reduce ? {} : { y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="group flex min-h-[220px] flex-col justify-between rounded-3xl bg-cream p-7 text-left shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-3xl font-black">{f.label}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 transition-colors duration-200 group-hover:bg-orange group-hover:text-cream">
                  →
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold opacity-50">{f.detail}</p>
                <p className="font-display mt-1 text-xl font-extrabold text-green">
                  {fmt(f.price)}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
