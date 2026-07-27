import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const EASE = [0.32, 0.72, 0, 1]

const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`
const perL = (f) => `${(f.price / f.liters).toFixed(2).replace('.', ',')} €/L`
const save = (o) => Math.round((1 - o.price / o.full) * 100)

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

// Kit / bundle card. `expand` reveals included items only when active (tabs
// variant); otherwise items show as a compact inline line (open variant).
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
