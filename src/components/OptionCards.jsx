import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const EASE = [0.32, 0.72, 0, 1]

const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`
const perL = (f) => `${(f.price / f.liters).toFixed(2).replace('.', ',')} €/L`
const save = (o) => Math.round((1 - o.price / o.full) * 100)

function IconKit({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="7.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10.5" y="7.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 7.5V5.5h8V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function IconBundle({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M3 8h14v8.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M2 5.5h16V8H2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M10 5.5v12M10 5.5S8.6 2.5 6.9 3.2C5.6 3.7 6 5.5 10 5.5zM10 5.5s1.4-3 3.1-2.3c1.3.5.9 2.3-3.1 2.3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

export function Radio({ active }) {
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

export function VolumeRow({ f, active, onSelect }) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
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
}

// Tile / box style for kits and bundles — varies the rhythm from the
// volumetry rows. `promo` gives bundles a highlighted, opportunity look.
export function SetTile({ o, active, onSelect, promo = false }) {
  const reduce = useReducedMotion()
  const Icon = promo ? IconBundle : IconKit
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      whileTap={reduce ? {} : { scale: 0.99 }}
      whileHover={reduce ? {} : { y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-200 ${
        active
          ? promo
            ? 'border-accent bg-accent-soft/70 shadow-sm'
            : 'border-ink bg-white shadow-sm'
          : promo
            ? 'border-accent/35 bg-accent-soft/25 hover:border-accent/60'
            : 'border-line bg-white/60 hover:border-ink/30'
      }`}
    >
      {/* promo ribbon */}
      {promo && (
        <span className="absolute top-0 right-0 rounded-bl-xl bg-accent px-2.5 py-1 text-[9px] font-semibold tracking-[0.1em] text-white">
          OPORTUNIDADE
        </span>
      )}

      <div className="mb-3 flex items-center justify-between">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            promo ? 'bg-accent/15 text-accent-deep' : 'bg-page text-ink'
          }`}
        >
          <Icon />
        </span>
        <Radio active={active} />
      </div>

      <p className="text-sm leading-tight font-medium">{o.name}</p>
      <p className="mt-1 text-[11px] leading-snug opacity-50">{o.role}</p>
      <p className="mt-2 text-[11px] leading-snug opacity-40">{o.items.join(' · ')}</p>

      <div className="mt-3 flex items-end justify-between border-t border-line/70 pt-3">
        <div>
          <span className="text-sm font-semibold tabular-nums">{fmt(o.price)}</span>
          <span className="ml-1.5 text-[11px] tabular-nums opacity-40 line-through">{fmt(o.full)}</span>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            promo ? 'bg-accent text-white' : 'bg-accent-soft text-accent-deep'
          }`}
        >
          poupa {save(o)}%
        </span>
      </div>
    </motion.button>
  )
}

// Kit / bundle card (list style). `expand` reveals included items only when
// active (tabs variant); otherwise items show as a compact inline line.
export function SetCard({ o, active, onSelect, expand = false }) {
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
          {!expand && (
            <p className="mt-1 truncate text-[11px] opacity-40">{o.items.join(' · ')}</p>
          )}
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-medium tabular-nums">{fmt(o.price)}</p>
          <p className="text-[11px] tabular-nums opacity-40 line-through">{fmt(o.full)}</p>
        </div>
      </div>

      {expand && (
        <AnimatePresence initial={false}>
          {active && (
            <motion.div
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
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.button>
  )
}
