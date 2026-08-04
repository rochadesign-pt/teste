import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { absGroupOf } from '../data/equipment'
import { PayIcons, GuaranteeIcon, Stars } from './PayIcons'
import { OptionGroups } from './OptionGroups'

const EASE = [0.32, 0.72, 0, 1]
const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`

export function EquipmentBuyPanel({ product, selection, setSingle, toggleAddon, total, onAdd }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(null)
  const [saved, setSaved] = useState(false)

  const abs = absGroupOf(product)
  const absChoice = abs && abs.choices.find((c) => c.id === selection[abs.id])
  const compareAt = absChoice?.full || null
  const perMonth = product.financing ? total / product.financing.months : null

  return (
    <div className="flex flex-col">
      {/* line + wishlist */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-deep">{product.line}</span>
        <button
          type="button"
          aria-label={saved ? 'Remover dos favoritos' : 'Guardar nos favoritos'}
          aria-pressed={saved}
          onClick={() => setSaved(!saved)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white transition-colors duration-200 hover:border-ink/30"
        >
          <motion.svg width="15" height="14" viewBox="0 0 16 15" animate={reduce ? {} : { scale: saved ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3, ease: EASE }} aria-hidden="true">
            <path d="M8 14.2S1 10 1 5.2C1 2.9 2.8 1 5.1 1 6.3 1 7.4 1.6 8 2.5 8.6 1.6 9.7 1 10.9 1 13.2 1 15 2.9 15 5.2c0 4.8-7 9-7 9z" fill={saved ? '#64a70b' : 'none'} stroke={saved ? '#64a70b' : '#191c17'} strokeWidth="1.3" strokeLinejoin="round" />
          </motion.svg>
        </button>
      </div>

      {/* title */}
      <h1 className="font-display mt-5 text-4xl leading-[1.06] font-semibold sm:text-[2.9rem]">
        <span className="block font-medium text-ink/35">{product.eyebrow}</span>
        {product.name}
      </h1>

      <div className="mt-4 flex items-center gap-2 text-xs">
        <Stars value={product.rating} />
        <a href="#reviews" className="font-medium underline-offset-2 hover:underline">
          {product.rating.toFixed(1).replace('.', ',')} · {product.reviewSummary.total} avaliações
        </a>
        <span className="opacity-30">·</span>
        <span className="flex items-center gap-1.5 font-medium text-accent-deep">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          {product.statusLabel}
        </span>
      </div>

      {/* price */}
      <div className="mt-5">
        <div className="flex items-baseline gap-2.5">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p key={total} initial={{ opacity: 0, y: reduce ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : -8 }} transition={{ duration: 0.25, ease: EASE }} className="font-display text-3xl font-semibold tabular-nums">
              {fmt(total)}
            </motion.p>
          </AnimatePresence>
          {compareAt && <span className="text-sm text-muted line-through tabular-nums">{fmt(compareAt)}</span>}
          <p className="text-xs opacity-50">{product.priceNote}</p>
        </div>
        {perMonth && (
          <p className="mt-1.5 text-[13px] font-medium text-accent-deep">
            ou desde {fmt(perMonth)}/mês em {product.financing.months}×
            <span className="ml-1 font-normal text-muted">sem juros</span>
          </p>
        )}
      </div>

      <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed opacity-75">
        <span className="font-medium text-ink">{product.tagline}</span> {product.description}
      </p>

      {/* spec highlights */}
      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {product.specHighlights.map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-white px-3 py-2.5 text-center">
            <p className="font-display text-lg leading-none font-semibold tabular-nums">
              {s.value}
              <span className="text-[11px] font-medium text-muted"> {s.unit}</span>
            </p>
            <p className="mt-1 text-[11px] leading-tight text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* checklist */}
      <ul className="mt-6 space-y-2">
        {product.checklist.map((c) => (
          <li key={c} className="flex items-center gap-3 text-[13px]">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true" className="shrink-0">
              <path d="M1 5l3.4 3.4L11 1.6" stroke="#64a70b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {c}
          </li>
        ))}
      </ul>

      {/* configurable options */}
      <div className="mt-7">
        <OptionGroups product={product} selection={selection} setSingle={setSingle} toggleAddon={toggleAddon} />
      </div>

      {/* CTA */}
      <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
        <motion.button
          type="button"
          onClick={onAdd}
          whileHover={reduce ? {} : { scale: 1.01 }}
          whileTap={reduce ? {} : { scale: 0.985 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className="flex h-12 flex-1 items-center justify-center gap-2.5 rounded-full bg-ink text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-deep"
        >
          Adicionar ao carrinho — {fmt(total)}
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        </motion.button>
        <a href="#" className="flex h-12 items-center justify-center rounded-full border border-line bg-white px-6 text-sm font-semibold transition-colors duration-200 hover:border-ink">
          Pedir proposta
        </a>
      </div>

      <p className="mt-3 text-center text-[11px] text-muted">
        {product.statusLabel} · Faturação com NIF · Apoio técnico especializado
      </p>

      {/* payments + guarantees */}
      <div className="mt-5 flex flex-col items-center gap-4">
        <PayIcons className="justify-center" />
        <div className="grid w-full grid-cols-3 gap-2 border-y border-line py-4">
          {product.guarantees.map((g) => (
            <div key={g.title} className="flex flex-col items-center gap-1 text-center">
              <GuaranteeIcon icon={g.icon} className="h-4 w-4 text-accent-deep" />
              <p className="text-[11px] leading-tight font-medium">{g.title}</p>
              <p className="text-[10px] leading-tight text-muted">{g.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* specs accordions */}
      <div className="mt-2 divide-y divide-line">
        {product.specs.map((spec, i) => {
          const isOpen = open === i
          return (
            <div key={spec.title}>
              <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between py-4 text-left">
                <span className="text-sm font-medium">{spec.title}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25, ease: EASE }} className="text-base opacity-40" aria-hidden="true">+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0.1 : 0.35, ease: EASE }} className="overflow-hidden">
                    <p className="pb-4 text-[13px] leading-relaxed opacity-70">{spec.body}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
        <div className="flex flex-wrap gap-2 py-4">
          {['Ficha técnica (PDF)', 'Manual de utilização (PDF)'].map((doc) => (
            <a key={doc} href="#" className="group flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3.5 py-2 text-[11px] font-medium transition-colors duration-200 hover:border-ink">
              <svg width="10" height="12" viewBox="0 0 12 14" fill="none" aria-hidden="true" className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0.5">
                <path d="M6 1v8m0 0L3 6.2M6 9l3-2.8M1 12.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {doc}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
