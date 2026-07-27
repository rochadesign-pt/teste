import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { product } from '../data/product'

const EASE = [0.32, 0.72, 0, 1]

const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`
const perL = (f) => `${(f.price / f.liters).toFixed(2).replace('.', ',')} €/L`
const save = (o) => Math.round((1 - o.price / o.full) * 100)

const TABS = [
  { id: 'volumetria', label: 'Volumetrias' },
  { id: 'kits', label: 'Kits' },
  { id: 'bundles', label: 'Bundles' },
]

const HINTS = {
  volumetria: 'Escolha o tamanho — do pulverizador diário à recarga industrial.',
  kits: 'Conjuntos prontos onde o HTG-30 entra, para uma rotina completa.',
  bundles: 'Packs promocionais do HTG-30 com desconto imediato.',
}

function Radio({ active }) {
  return (
    <span
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
        active ? 'border-ink' : 'border-ink/25'
      }`}
      aria-hidden="true"
    >
      <span className={`h-2 w-2 rounded-full bg-ink transition-transform duration-200 ${active ? 'scale-100' : 'scale-0'}`} />
    </span>
  )
}

function SetCard({ o, active, onSelect }) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      whileTap={reduce ? {} : { scale: 0.995 }}
      className={`w-full rounded-2xl border px-4 py-3.5 text-left transition-colors duration-200 ${
        active ? 'border-ink bg-white shadow-sm' : 'border-line bg-white/60 hover:border-ink/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5">
          <Radio active={active} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{o.name}</span>
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent-deep">
              −{save(o)}%
            </span>
          </div>
          <p className="mt-0.5 text-xs opacity-50">{o.role}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-medium tabular-nums">{fmt(o.price)}</p>
          <p className="text-[11px] tabular-nums opacity-40 line-through">{fmt(o.full)}</p>
        </div>
      </div>

      {/* included items — revealed when active */}
      <AnimatePresence initial={false}>
        {active && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.1 : 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-3 ml-7 flex flex-wrap gap-1.5">
              {o.items.map((it) => (
                <span key={it} className="rounded-full bg-page px-2.5 py-1 text-[11px] font-medium">
                  {it}
                </span>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export function PurchaseSelector({ tab, setTab, format, setFormat, pickKit, setPickKit, pickBundle, setPickBundle }) {
  const reduce = useReducedMotion()

  return (
    <div>
      {/* segmented control */}
      <div role="tablist" aria-label="Opções de compra" className="flex gap-1 rounded-full bg-page p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`relative flex-1 rounded-full px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors duration-200 sm:text-sm ${
              tab === t.id ? 'text-white' : 'opacity-60 hover:opacity-100'
            }`}
          >
            {tab === t.id && (
              <motion.span
                layoutId="buy-tab"
                transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                className="absolute inset-0 rounded-full bg-ink"
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <p className="mt-3 mb-3 text-xs leading-relaxed opacity-50">{HINTS[tab]}</p>

      {/* lists */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -6 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="space-y-2"
          role="radiogroup"
        >
          {tab === 'volumetria' &&
            product.formats.map((f) => {
              const active = format === f.id
              return (
                <motion.button
                  key={f.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setFormat(f.id)}
                  whileTap={reduce ? {} : { scale: 0.995 }}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors duration-200 ${
                    active ? 'border-ink bg-white shadow-sm' : 'border-line bg-white/60 hover:border-ink/30'
                  }`}
                >
                  <Radio active={active} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      {f.label} — {f.detail}
                      {f.tag && (
                        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent-deep">
                          {f.tag}
                        </span>
                      )}
                    </span>
                    <span className="block text-xs opacity-50">{perL(f)}</span>
                  </span>
                  <span className="text-sm font-medium tabular-nums">{fmt(f.price)}</span>
                </motion.button>
              )
            })}

          {tab === 'kits' &&
            product.kits.map((k) => (
              <SetCard key={k.name} o={k} active={pickKit === k.name} onSelect={() => setPickKit(k.name)} />
            ))}

          {tab === 'bundles' &&
            product.bundles.map((b) => (
              <SetCard key={b.name} o={b} active={pickBundle === b.name} onSelect={() => setPickBundle(b.name)} />
            ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
