import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { product } from '../data/product'

const EASE = [0.32, 0.72, 0, 1]

export function Faq() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <p className="mb-3 text-[11px] font-medium tracking-[0.16em] text-accent-deep">
              PERGUNTAS FREQUENTES
            </p>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Tudo sobre o HTG-30
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed opacity-60">
              Não encontra a resposta que procura? A nossa equipa técnica
              esclarece qualquer dúvida sobre aplicação, dosagem ou segurança.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-deep"
            >
              Falar com a equipa técnica
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="divide-y divide-line border-y border-line"
          >
            {product.faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[15px] font-medium">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg transition-colors duration-200 ${
                        isOpen ? 'bg-accent text-white' : 'bg-page'
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
                        transition={{ duration: reduce ? 0.1 : 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-sm leading-relaxed opacity-70">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
