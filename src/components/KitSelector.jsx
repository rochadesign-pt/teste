import { motion, useReducedMotion } from 'framer-motion'

const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`
const save = (o) => (o.full ? Math.round((1 - o.price / o.full) * 100) : 0)

// Ícone por tipo de item incluído no kit.
const TYPE = {
  equipment: { label: 'Equipamento', d: 'M2.5 5.5 8 2.5l5.5 3v5L8 13.5 2.5 10.5v-5z M2.5 5.5 8 8.5l5.5-3 M8 8.5v5' },
  service: { label: 'Serviço', d: 'M9.5 2.5a3 3 0 0 0-4 4l-3.2 3.2a1.2 1.2 0 0 0 1.7 1.7L7.2 8.2a3 3 0 0 0 4-4l-1.7 1.7-1.5-.4-.4-1.5 1.9-1.5z' },
  product: { label: 'Produto incluído', d: 'M6.5 1.5h3M7 1.5v2M9 1.5v2 M5.5 3.5h5v2l1 1.5v6.5a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V7l1-1.5v-2z' },
  warranty: { label: 'Garantia', d: 'M8 1.5l5 2v4c0 3.3-2.2 5.6-5 6.5-2.8-.9-5-3.2-5-6.5v-4l5-2z M5.8 8l1.5 1.5L10.4 6' },
}

function IncludeRow({ item }) {
  const t = TYPE[item.type] || TYPE.equipment
  const accent = item.type === 'service' || item.type === 'product'
  return (
    <li className="flex items-start gap-2.5">
      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${accent ? 'bg-accent-soft text-accent-deep' : 'bg-page text-ink/60'}`}>
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
          <path d={t.d} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium leading-tight">
          {item.label}
          {accent && (
            <span className="rounded-full bg-accent-soft px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.06em] text-accent-deep">
              {t.label.toUpperCase()}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[11px] leading-snug text-muted">{item.note}</span>
      </span>
    </li>
  )
}

// Horizontal card: identity + price on the left, included items on the right —
// stacked so both kits align and compare item by item.
function KitCard({ k, active, onSelect }) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      whileTap={reduce ? {} : { scale: 0.997 }}
      className={`flex w-full flex-col gap-4 rounded-2xl border bg-white p-5 text-left transition-colors duration-200 lg:flex-row lg:items-stretch lg:gap-6 ${
        active ? 'border-accent ring-2 ring-accent/20' : 'border-line hover:border-ink/25'
      }`}
    >
      {/* identity + price */}
      <div className="lg:w-[260px] lg:shrink-0 lg:border-r lg:border-line lg:pr-6">
        <span className="flex flex-wrap items-center gap-2">
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${active ? 'border-accent bg-accent' : 'border-ink/25 bg-white'}`}
            aria-hidden="true"
          >
            <svg width="8" height="6" viewBox="0 0 10 8" fill="none" className={active ? 'opacity-100' : 'opacity-0'}>
              <path d="M1 4l2.8 2.8L9 1.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-sm font-semibold leading-tight">{k.name}</span>
          {k.badge && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-[9px] font-semibold tracking-[0.04em] text-white">{k.badge}</span>
          )}
        </span>
        <p className="mt-1.5 text-[12px] leading-snug text-muted">{k.role}</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold tabular-nums">{fmt(k.price)}</span>
          {k.full && (
            <>
              <span className="text-[12px] text-muted/60 line-through tabular-nums">{fmt(k.full)}</span>
              <span className="rounded-full bg-accent-soft px-1.5 py-0.5 text-[9px] font-semibold text-accent-deep">−{save(k)}%</span>
            </>
          )}
        </div>
      </div>

      {/* included items */}
      <ul className="flex flex-1 flex-col gap-2.5">
        {k.includes.map((item) => (
          <IncludeRow key={item.label} item={item} />
        ))}
      </ul>
    </motion.button>
  )
}

export function KitSelector({ kits, activeId, onSelect }) {
  return (
    <div role="radiogroup" aria-label="Escolha do kit" className="space-y-3">
      {kits.map((k) => (
        <KitCard key={k.id} k={k} active={activeId === k.id} onSelect={() => onSelect(k.id)} />
      ))}
    </div>
  )
}
