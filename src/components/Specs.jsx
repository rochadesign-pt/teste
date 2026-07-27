import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { product } from '../data/product'

const EASE = [0.32, 0.72, 0, 1]

export function Specs() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(0)

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="mb-4 text-[11px] font-medium tracking-[0.16em] text-accent">DETALHES</p>
          <h2 className="font-display text-4xl leading-[1.02] font-medium sm:text-5xl">
            Tudo o que
            <br />
            precisa de saber.
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed opacity-70">{product.description}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['Ficha técnica (PDF)', 'Ficha de dados de segurança (PDF)'].map((doc) => (
              <a
                key={doc}
                href="#"
                className="group flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-xs font-medium transition-colors duration-200 hover:border-ink"
              >
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true" className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0.5">
                  <path d="M6 1v8m0 0L3 6.2M6 9l3-2.8M1 12.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {doc}
              </a>
            ))}
          </div>
        </motion.div>

        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {product.specs.map((spec, i) => {
            const isOpen = open === i
            return (
              <div key={spec.title}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between py-6 text-left"
                >
                  <span className="font-display text-xl font-medium lg:text-2xl">
                    {spec.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl font-medium transition-colors duration-200 ${
                      isOpen ? 'bg-accent text-white' : 'bg-ink/5'
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0.1 : 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 leading-relaxed opacity-70">{spec.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
