import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { product } from '../data/product'
import { Stars } from './PayIcons'

const EASE = [0.32, 0.72, 0, 1]

export function Reviews() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(3)
  const { average, total, distribution } = product.reviewSummary
  const shown = product.reviews.slice(0, visible)

  return (
    <section id="reviews" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-12 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        >
          {/* summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 text-[11px] font-medium tracking-[0.16em] text-accent-deep">
              AVALIAÇÕES
            </p>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              O que dizem os profissionais
            </h2>

            <div className="mt-7 flex items-center gap-4">
              <p className="font-display text-5xl font-semibold tabular-nums">
                {average.toFixed(1).replace('.', ',')}
              </p>
              <div>
                <Stars value={average} />
                <p className="mt-1 text-sm opacity-60">{total} avaliações verificadas</p>
              </div>
            </div>

            {/* distribution */}
            <div className="mt-6 space-y-1.5">
              {distribution.map((d) => {
                const pct = (d.count / total) * 100
                return (
                  <div key={d.stars} className="flex items-center gap-3 text-xs">
                    <span className="w-8 shrink-0 tabular-nums opacity-60">{d.stars} ★</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-page">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                    <span className="w-6 shrink-0 text-right tabular-nums opacity-40">{d.count}</span>
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              className="mt-7 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium transition-colors duration-200 hover:border-ink"
            >
              Escrever avaliação
            </button>
          </div>

          {/* review list */}
          <div>
            <div className="space-y-4">
              {shown.map((r, i) => (
                <motion.article
                  key={r.name}
                  initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : (i % 3) * 0.06 }}
                  className="rounded-3xl border border-line p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent-deep">
                        {r.name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{r.name}</p>
                        <p className="text-[11px] opacity-50">{r.role}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-[11px] opacity-40">{r.date}</span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Stars value={r.rating} />
                    {r.verified && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-accent-deep">
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <circle cx="6" cy="6" r="5.5" fill="#64a70b" />
                          <path d="M3.5 6.2l1.6 1.6L8.5 4.4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Compra verificada
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-sm font-semibold">{r.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed opacity-70">{r.body}</p>
                </motion.article>
              ))}
            </div>

            {visible < product.reviews.length && (
              <button
                type="button"
                onClick={() => setVisible(product.reviews.length)}
                className="mt-4 w-full rounded-2xl border border-line py-3.5 text-sm font-medium transition-colors duration-200 hover:border-ink"
              >
                Ver mais avaliações
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
