import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { product } from '../data/product'

const EASE = [0.32, 0.72, 0, 1]

const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`
const savings = (b) => Math.round((1 - b.price / b.full) * 100)

const TABS = [
  { id: 'combos', label: 'Combina bem com' },
  { id: 'bundles', label: 'Bundles' },
]

function Row({ left, sub, right, action, active, onClick }) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileTap={reduce ? {} : { scale: 0.99 }}
      className={`group flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-200 ${
        active
          ? 'border-accent bg-accent-soft/70'
          : 'border-line bg-white hover:border-ink/25'
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
          active ? 'border-accent bg-accent' : 'border-ink/20 bg-white group-hover:border-ink/40'
        }`}
        aria-hidden="true"
      >
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          className={`transition-opacity duration-150 ${active ? 'opacity-100' : 'opacity-0'}`}
        >
          <path d="M1 4l2.8 2.8L9 1.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{left}</span>
        <span className="block truncate text-xs opacity-50">{sub}</span>
      </span>
      <span className="shrink-0 text-right">
        <span className="block text-sm font-medium tabular-nums">{right}</span>
        {action && (
          <span className="block text-[11px] font-medium text-accent-deep">{action}</span>
        )}
      </span>
    </motion.button>
  )
}

export function Options({ format, setFormat, onAdd }) {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState('combos')
  const [picked, setPicked] = useState({ combos: [], bundle: null })

  const selected = product.formats.find((f) => f.id === format)

  const toggleCombo = (code) =>
    setPicked((p) => ({
      ...p,
      combos: p.combos.includes(code)
        ? p.combos.filter((c) => c !== code)
        : [...p.combos, code],
    }))

  const total =
    selected.price +
    picked.combos.reduce(
      (sum, code) => sum + product.combos.find((c) => c.code === code).price,
      0,
    ) +
    (picked.bundle ? product.bundles.find((b) => b.name === picked.bundle).price : 0)

  const extras = picked.combos.length + (picked.bundle ? 1 : 0)

  const content = {
    combos: (
      <div className="grid grid-cols-1 gap-2">
        {product.combos.map((c) => (
          <Row
            key={c.code}
            left={c.name}
            sub={c.detail}
            right={fmt(c.price)}
            action={picked.combos.includes(c.code) ? 'Adicionado' : '+ Juntar'}
            active={picked.combos.includes(c.code)}
            onClick={() => toggleCombo(c.code)}
          />
        ))}
      </div>
    ),
    bundles: (
      <div className="grid grid-cols-1 gap-2">
        {product.bundles.map((b) => (
          <Row
            key={b.name}
            left={
              <>
                {b.name}
                <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent-deep">
                  poupa {savings(b)}%
                </span>
              </>
            }
            sub={b.items}
            right={
              <>
                <s className="mr-1.5 font-normal opacity-40">{fmt(b.full)}</s>
                {fmt(b.price)}
              </>
            }
            active={picked.bundle === b.name}
            onClick={() =>
              setPicked((p) => ({ ...p, bundle: p.bundle === b.name ? null : b.name }))
            }
          />
        ))}
      </div>
    ),
  }

  return (
    <section id="opcoes" className="mx-auto max-w-[1440px] scroll-mt-24 px-6 pb-24 lg:px-12 lg:pb-32">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto max-w-3xl rounded-[2rem] bg-white p-6 shadow-sm sm:p-10"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep">
              OPÇÕES DE COMPRA
            </p>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              À medida da operação.
            </h2>
          </div>
          <p className="max-w-[220px] text-xs leading-relaxed opacity-50">
            Tudo o que precisa num só lugar: volumetria, produtos complementares
            e bundles.
          </p>
        </div>

        {/* 1 — volumetria, always visible */}
        <div className="mb-8">
          <p className="mb-3 text-xs font-medium opacity-50">1 · Volumetria</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {product.formats.map((f) => (
              <motion.button
                key={f.id}
                type="button"
                onClick={() => setFormat(f.id)}
                aria-pressed={format === f.id}
                whileTap={reduce ? {} : { scale: 0.98 }}
                className={`rounded-2xl border px-4 py-3.5 text-left transition-colors duration-200 ${
                  format === f.id
                    ? 'border-accent bg-accent-soft/70'
                    : 'border-line bg-white hover:border-ink/25'
                }`}
              >
                <span className="block text-sm font-medium">{f.label}</span>
                <span className="block text-xs tabular-nums opacity-50">
                  {fmt(f.price)} · {f.detail}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 2 — optional extras */}
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium opacity-50">2 · Complementos (opcional)</p>
          <div role="tablist" aria-label="Complementos" className="flex gap-1 rounded-full bg-page p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
                  tab === t.id ? 'text-white' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="options-tab"
                    transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -6 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {content[tab]}
          </motion.div>
        </AnimatePresence>

        {/* summary */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <div>
            <p className="text-sm font-medium tabular-nums">
              Total{' '}
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={total}
                  initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="inline-block font-semibold text-accent-deep"
                >
                  {fmt(total)}
                </motion.span>
              </AnimatePresence>
            </p>
            <p className="mt-1 text-xs leading-relaxed opacity-50">
              HTG-30 · {selected.label}
              {extras > 0 && ` + ${extras} complemento${extras > 1 ? 's' : ''}`} · IVA
              incluído.{' '}
              <a href="#" className="font-medium text-accent-deep underline-offset-2 hover:underline">
                Volumes industriais? Peça uma proposta
              </a>
            </p>
          </div>
          <motion.button
            type="button"
            onClick={() => onAdd(picked)}
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={reduce ? {} : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="h-12 rounded-full bg-accent px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-deep"
          >
            Adicionar seleção
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
