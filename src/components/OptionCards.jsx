import { motion, useReducedMotion } from 'framer-motion'
import { Bottle } from './Bottle'

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
      className={`flex w-full items-center gap-3 rounded-lg border bg-white px-4 py-3 text-left transition-colors duration-200 ${
        active ? 'border-accent ring-2 ring-accent/15' : 'border-line hover:border-ink/25'
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
        <span className="block text-xs text-muted">{perL(f)}</span>
      </span>
      <span className="text-sm font-medium tabular-nums">{fmt(f.price)}</span>
    </motion.button>
  )
}

// Visual for a bundle card: real photo when provided, otherwise a composed
// fallback that stacks the bottles to suggest a set.
function SetVisual({ o }) {
  if (o.image) {
    return <img src={o.image} alt={o.name} loading="lazy" className="h-full w-full object-cover" />
  }
  const n = Math.min(3, o.items.length)
  return (
    <div className="flex h-full items-end justify-center bg-page">
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          style={{ zIndex: n - i, marginLeft: i ? '-16%' : 0 }}
          className="w-[26%] translate-y-[12%] drop-shadow-[0_8px_12px_rgba(0,0,0,0.12)]"
        >
          <Bottle className="w-full" />
        </div>
      ))}
    </div>
  )
}

// Kit — compact text row per the mockup: name + role left, price right.
export function KitRow({ o, active, onSelect }) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      whileTap={reduce ? {} : { scale: 0.995 }}
      title={o.items.join(' + ')}
      className={`flex h-full w-full items-center gap-2.5 rounded-lg border bg-white px-3.5 py-3 text-left transition-colors duration-200 ${
        active ? 'border-accent ring-2 ring-accent/15' : 'border-line hover:border-ink/25'
      }`}
    >
      <Radio active={active} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] leading-tight font-medium">{o.name}</span>
        <span className="block truncate text-[11px] text-muted">{o.role}</span>
      </span>
      <span className="shrink-0 text-right">
        <span className="block text-[13px] font-semibold tabular-nums">{fmt(o.price)}</span>
        <span className="block text-[10px] text-muted/70 tabular-nums line-through">{fmt(o.full)}</span>
      </span>
    </motion.button>
  )
}

// Bundle — light image card with a green ring, per the mockup: photo on top
// with a discount tag, name + role below, strikethrough + price at the bottom.
export function BundleCard({ o, active, onSelect }) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      whileTap={reduce ? {} : { scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`relative flex h-full flex-col overflow-hidden rounded-lg border bg-white text-left shadow-xs transition-colors duration-200 ${
        active ? 'border-accent ring-2 ring-accent/25' : 'border-line hover:border-accent/50'
      }`}
    >
      {/* image */}
      <div className="relative h-28 w-full overflow-hidden border-b border-line">
        <SetVisual o={o} />
        <span className="absolute top-2 left-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-white">
          −{save(o)}%
        </span>
        <span className="absolute top-2 right-2">
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
              active ? 'border-accent bg-accent' : 'border-ink/25 bg-white'
            }`}
            aria-hidden="true"
          >
            <svg width="8" height="6" viewBox="0 0 10 8" fill="none" className={active ? 'opacity-100' : 'opacity-0'}>
              <path d="M1 4l2.8 2.8L9 1.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
        </span>
      </div>

      {/* info */}
      <div className="flex flex-1 flex-col p-3">
        <p className="text-[13px] leading-tight font-medium">{o.name}</p>
        <p className="mt-0.5 flex-1 text-[11px] leading-snug text-muted">{o.role}</p>
        <div className="mt-2.5 flex items-baseline gap-1.5">
          <span className="text-[11px] text-muted/60 tabular-nums line-through">{fmt(o.full)}</span>
          <span className="text-sm font-semibold tabular-nums">{fmt(o.price)}</span>
        </div>
      </div>
    </motion.button>
  )
}
