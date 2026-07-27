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

// Visual for a kit/bundle tile: real photo when provided, otherwise a
// composed fallback that stacks the bottles to suggest a set.
function SetVisual({ o, promo }) {
  if (o.image) {
    return <img src={o.image} alt={o.name} loading="lazy" className="h-full w-full object-cover" />
  }
  const n = Math.min(3, o.items.length)
  return (
    <div className={`flex h-full items-end justify-center ${promo ? 'bg-accent-soft/60' : 'bg-page'}`}>
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          style={{ zIndex: n - i, marginLeft: i ? '-16%' : 0 }}
          className="w-[30%] translate-y-[14%] drop-shadow-[0_8px_12px_rgba(0,0,0,0.12)]"
        >
          <Bottle className="w-full" />
        </div>
      ))}
    </div>
  )
}

// Tile / box style for kits and bundles — varies the rhythm from the
// volumetry rows, with a product image on top. `promo` gives bundles a
// highlighted, opportunity look.
export function SetTile({ o, active, onSelect, promo = false }) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      whileTap={reduce ? {} : { scale: 0.99 }}
      whileHover={reduce ? {} : { y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border text-left transition-colors duration-200 ${
        active
          ? promo
            ? 'border-accent bg-accent-soft/70 shadow-sm'
            : 'border-ink bg-white shadow-sm'
          : promo
            ? 'border-accent/35 bg-accent-soft/25 hover:border-accent/60'
            : 'border-line bg-white/60 hover:border-ink/30'
      }`}
    >
      {/* image banner */}
      <div className="relative h-24 w-full overflow-hidden">
        <SetVisual o={o} promo={promo} />
        {promo && (
          <span className="absolute top-0 left-0 rounded-br-xl bg-accent px-2.5 py-1 text-[9px] font-semibold tracking-[0.1em] text-white">
            OPORTUNIDADE
          </span>
        )}
        <span className="absolute top-2 right-2">
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
              active ? 'border-ink bg-white' : 'border-white/70 bg-white/70'
            }`}
            aria-hidden="true"
          >
            <span className={`h-2 w-2 rounded-full bg-ink transition-transform duration-200 ${active ? 'scale-100' : 'scale-0'}`} />
          </span>
        </span>
        <span
          className={`absolute right-2 bottom-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            promo ? 'bg-accent text-white' : 'bg-ink text-white'
          }`}
        >
          poupa {save(o)}%
        </span>
      </div>

      {/* info */}
      <div className="flex flex-1 flex-col p-3.5">
        <p className="text-sm leading-tight font-medium">{o.name}</p>
        <p className="mt-1 text-[11px] leading-snug opacity-50">{o.role}</p>
        <p className="mt-1.5 flex-1 text-[11px] leading-snug opacity-40">{o.items.join(' · ')}</p>

        <div className="mt-2.5 flex items-baseline gap-1.5 border-t border-line/70 pt-2.5">
          <span className="text-sm font-semibold tabular-nums">{fmt(o.price)}</span>
          <span className="text-[11px] tabular-nums opacity-40 line-through">{fmt(o.full)}</span>
        </div>
      </div>
    </motion.button>
  )
}

// Bundle card — a deliberately different, promo-forward format: a dark
// full-width offer strip with a light photo thumb, so bundles read as
// "deals" and never get mistaken for the light kit tiles.
export function BundleCard({ o, active, onSelect }) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      whileTap={reduce ? {} : { scale: 0.995 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`relative flex w-full items-stretch gap-3 overflow-hidden rounded-2xl border p-2 text-left text-white transition-colors duration-200 ${
        active ? 'border-accent bg-ink ring-1 ring-accent' : 'border-ink/80 bg-ink hover:border-accent/60'
      }`}
    >
      {/* accent edge */}
      <span className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden="true" />

      {/* thumb */}
      <div className="relative h-[74px] w-[74px] shrink-0 overflow-hidden rounded-xl">
        <SetVisual o={o} promo />
      </div>

      {/* info */}
      <div className="flex min-w-0 flex-1 flex-col py-0.5 pr-1">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-white">
            <span className="h-1 w-1 rounded-full bg-white" />
            PROMO
          </span>
          <span className="text-[10px] tracking-[0.08em] text-white/50">TEMPO LIMITADO</span>
          <span className="ml-auto">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                active ? 'border-accent bg-accent' : 'border-white/40'
              }`}
              aria-hidden="true"
            >
              <svg width="9" height="7" viewBox="0 0 10 8" fill="none" className={active ? 'opacity-100' : 'opacity-0'}>
                <path d="M1 4l2.8 2.8L9 1.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          </span>
        </div>

        <p className="mt-1.5 truncate text-sm font-medium">{o.name}</p>
        <p className="truncate text-[11px] text-white/50">{o.items.join(' · ')}</p>

        <div className="mt-auto flex items-end gap-2 pt-1.5">
          <span className="text-lg font-semibold tabular-nums">{fmt(o.price)}</span>
          <span className="pb-0.5 text-[11px] tabular-nums text-white/40 line-through">{fmt(o.full)}</span>
          <span className="ml-auto rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold tabular-nums text-white">
            −{save(o)}% · poupa {fmt(o.full - o.price)}
          </span>
        </div>
      </div>
    </motion.button>
  )
}
