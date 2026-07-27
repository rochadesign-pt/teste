import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { product } from '../data/product'

const EASE = [0.32, 0.72, 0, 1]

const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`
const savings = (b) => Math.round((1 - b.price / b.full) * 100)

const TABS = [
  { id: 'formats', label: 'Volumetrias' },
  { id: 'combos', label: 'Combina bem com' },
  { id: 'bundles', label: 'Bundles' },
]

function Row({ left, sub, right, action, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-200 ${
        active
          ? 'border-accent bg-accent-soft'
          : 'border-line bg-white hover:border-ink/30'
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
          active ? 'border-accent bg-accent' : 'border-ink/20 bg-white'
        }`}
        aria-hidden="true"
      >
        {active && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l2.8 2.8L9 1.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold">{left}</span>
        <span className="block truncate text-xs opacity-50">{sub}</span>
      </span>
      <span className="shrink-0 text-right">
        <span className="block text-sm font-bold tabular-nums">{right}</span>
        {action && (
          <span className="block text-[11px] font-semibold text-accent-deep">{action}</span>
        )}
      </span>
    </button>
  )
}

export function Options({ format, setFormat, onAdd }) {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState('formats')
  const [picked, setPicked] = useState({ combos: [], bundle: null })

  const toggleCombo = (code) =>
    setPicked((p) => ({
      ...p,
      combos: p.combos.includes(code)
        ? p.combos.filter((c) => c !== code)
        : [...p.combos, code],
    }))

  const content = {
    formats: (
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {product.formats.map((f) => (
          <Row
            key={f.id}
            left={`HTG-30 · ${f.label}`}
            sub={f.detail}
            right={fmt(f.price)}
            active={format === f.id}
            onClick={() => setFormat(f.id)}
          />
        ))}
      </div>
    ),
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
                <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">
                  −{savings(b)}%
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

  const extras = picked.combos.length + (picked.bundle ? 1 : 0)

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-24 lg:px-12 lg:pb-32">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto max-w-3xl rounded-[2rem] bg-white p-6 shadow-sm sm:p-10"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-accent">
              OPÇÕES DE COMPRA
            </p>
            <h2 className="font-display text-3xl font-extrabold uppercase sm:text-4xl">
              À medida da operação.
            </h2>
          </div>
          <p className="max-w-[220px] text-xs leading-relaxed opacity-50">
            Selecione a volumetria, complemente com a linha cozinha ou otimize o
            custo com um bundle.
          </p>
        </div>

        {/* segmented control */}
        <div
          role="tablist"
          aria-label="Opções de compra"
          className="mb-6 flex w-full gap-1 rounded-full bg-page p-1"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`relative flex-1 rounded-full px-3 py-2.5 text-xs font-bold whitespace-nowrap transition-colors duration-200 sm:text-sm ${
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

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {content[tab]}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="text-xs leading-relaxed opacity-50">
            {extras > 0
              ? `${extras} extra${extras > 1 ? 's' : ''} selecionado${extras > 1 ? 's' : ''} além do HTG-30.`
              : 'Seleção atual: apenas o HTG-30.'}
            <br />
            Volumes industriais ou revenda?{' '}
            <a href="#" className="font-semibold text-accent-deep underline-offset-2 hover:underline">
              Peça uma proposta
            </a>
            .
          </p>
          <motion.button
            type="button"
            onClick={onAdd}
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={reduce ? {} : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="h-12 rounded-full bg-accent px-7 text-sm font-bold text-white transition-colors duration-200 hover:bg-accent-deep"
          >
            Adicionar seleção
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
