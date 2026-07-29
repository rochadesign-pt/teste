import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { home } from '../data/site'
import { catalog } from '../data/product'
import { FauxPhoto } from './FauxPhoto'
import { Bottle } from './Bottle'

const EASE = [0.32, 0.72, 0, 1]
const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`

function useCountdown(hours) {
  const [target] = useState(() => Date.now() + hours * 3600 * 1000)
  const [left, setLeft] = useState(target - Date.now())
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000)
    return () => clearInterval(t)
  }, [target])
  const s = Math.floor(left / 1000)
  return {
    h: String(Math.floor(s / 3600)).padStart(2, '0'),
    m: String(Math.floor((s % 3600) / 60)).padStart(2, '0'),
    s: String(s % 60).padStart(2, '0'),
  }
}

function Unit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink font-display text-lg font-semibold tabular-nums text-white">
        {value}
      </span>
      <span className="mt-1 text-[10px] text-muted">{label}</span>
    </div>
  )
}

export function DealOfDay({ addItem }) {
  const reduce = useReducedMotion()
  const p = home.products.find((x) => x.key === home.deal.key)
  const { h, m, s } = useCountdown(home.deal.endsInHours)
  const pct = Math.round((home.deal.stock.sold / home.deal.stock.total) * 100)
  const addable = p?.id && catalog[p.id]

  if (!p) return null

  return (
    <section className="mx-auto max-w-[1600px] px-6 py-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.5, ease: EASE }}
        className="grid grid-cols-1 overflow-hidden rounded-xl border border-line bg-white md:grid-cols-[1fr_1.1fr]"
      >
        {/* image */}
        <div className="relative">
          <FauxPhoto scene={p.scene} className="h-full min-h-[280px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[42%] max-w-[220px] drop-shadow-[0_20px_30px_rgba(0,0,0,0.28)]">
                <Bottle className="w-full" />
              </div>
            </div>
            <span className="absolute top-4 left-4 rounded-md bg-accent px-2 py-1 text-[11px] font-bold text-white">
              {p.tag}
            </span>
          </FauxPhoto>
        </div>

        {/* details */}
        <div className="flex flex-col justify-center p-7 lg:p-10">
          <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] text-accent-deep">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {home.deal.eyebrow}
          </p>
          <h2 className="font-display mt-2 text-2xl font-semibold sm:text-3xl">{p.name}</h2>
          <p className="mt-1 text-sm text-muted">{p.detail}</p>

          <div className="mt-4 flex items-baseline gap-2.5">
            <span className="font-display text-3xl font-semibold tabular-nums">{fmt(p.price)}</span>
            {p.full && <span className="text-sm text-muted/60 tabular-nums line-through">{fmt(p.full)}</span>}
          </div>

          {/* countdown */}
          <div className="mt-5">
            <p className="mb-2 text-[12px] font-medium">Termina em:</p>
            <div className="flex items-center gap-2">
              <Unit value={h} label="horas" />
              <span className="pb-4 font-display text-lg text-muted">:</span>
              <Unit value={m} label="min" />
              <span className="pb-4 font-display text-lg text-muted">:</span>
              <Unit value={s} label="seg" />
            </div>
          </div>

          {/* stock progress */}
          <div className="mt-5 max-w-xs">
            <div className="mb-1.5 flex justify-between text-[11px] text-muted">
              <span>Vendidos: {home.deal.stock.sold}</span>
              <span>Disponível: {home.deal.stock.total - home.deal.stock.sold}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-page">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
                className="h-full rounded-full bg-accent"
              />
            </div>
          </div>

          <motion.button
            type="button"
            onClick={() => addable && addItem(p.id)}
            whileTap={reduce ? {} : { scale: 0.98 }}
            className="mt-6 flex h-12 w-fit items-center gap-2.5 rounded-lg bg-ink px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-deep"
          >
            Aproveitar oferta
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
