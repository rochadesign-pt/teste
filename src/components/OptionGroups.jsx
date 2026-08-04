import { motion, useReducedMotion } from 'framer-motion'
import { KitSelector } from './KitSelector'

const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`
const delta = (n) => (n > 0 ? `+ ${fmt(n)}` : 'Incluído')

function GroupLabel({ group, valueLabel }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <p className="text-xs font-medium">
        {group.label}
        {valueLabel && <span className="ml-1.5 text-muted">· {valueLabel}</span>}
      </p>
      {group.hint && <p className="text-[11px] text-muted">{group.hint}</p>}
    </div>
  )
}

function Swatch({ group, selectedId, onSelect }) {
  const selected = group.choices.find((c) => c.id === selectedId)
  return (
    <div>
      <GroupLabel group={group} valueLabel={selected?.label} />
      <div className="flex flex-wrap gap-2.5">
        {group.choices.map((c) => {
          const active = c.id === selectedId
          return (
            <button
              key={c.id}
              type="button"
              aria-label={c.label}
              aria-pressed={active}
              onClick={() => onSelect(c.id)}
              className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-200 ${active ? 'scale-105' : ''}`}
            >
              <span
                className={`h-7 w-7 rounded-full border border-black/10 ${active ? 'ring-2 ring-accent ring-offset-2 ring-offset-white' : ''}`}
                style={{ backgroundColor: c.hex }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function RadioRows({ group, selectedId, onSelect }) {
  const reduce = useReducedMotion()
  return (
    <div>
      <GroupLabel group={group} />
      <div className="space-y-2">
        {group.choices.map((c) => {
          const active = c.id === selectedId
          return (
            <motion.button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onSelect(c.id)}
              whileTap={reduce ? {} : { scale: 0.995 }}
              className={`flex w-full items-center gap-3 rounded-xl border bg-white px-4 py-3 text-left transition-colors duration-200 ${
                active ? 'border-accent ring-2 ring-accent/15' : 'border-line hover:border-ink/25'
              }`}
            >
              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${active ? 'border-ink' : 'border-ink/25'}`} aria-hidden="true">
                <span className={`h-2 w-2 rounded-full bg-ink transition-transform duration-200 ${active ? 'scale-100' : 'scale-0'}`} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-sm font-medium">
                  {c.label}
                  {c.tag && <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent-deep">{c.tag}</span>}
                </span>
                {c.note && <span className="block text-xs text-muted">{c.note}</span>}
              </span>
              <span className={`shrink-0 text-sm font-medium tabular-nums ${c.priceDelta > 0 ? '' : 'text-muted'}`}>{delta(c.priceDelta || 0)}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

function AddonRows({ group, selectedIds, onToggle }) {
  const reduce = useReducedMotion()
  return (
    <div>
      <GroupLabel group={group} />
      <div className="space-y-2">
        {group.choices.map((c) => {
          const active = selectedIds.includes(c.id)
          return (
            <motion.button
              key={c.id}
              type="button"
              role="checkbox"
              aria-checked={active}
              onClick={() => onToggle(c.id)}
              whileTap={reduce ? {} : { scale: 0.995 }}
              className={`flex w-full items-center gap-3 rounded-xl border bg-white px-4 py-3 text-left transition-colors duration-200 ${
                active ? 'border-accent ring-2 ring-accent/15' : 'border-line hover:border-ink/25'
              }`}
            >
              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${active ? 'border-accent bg-accent' : 'border-ink/25 bg-white'}`} aria-hidden="true">
                {active && (
                  <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.8 2.8L9 1.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></svg>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{c.label}</span>
                {c.note && <span className="block text-xs text-muted">{c.note}</span>}
              </span>
              <span className="shrink-0 text-sm font-medium tabular-nums">+ {fmt(c.priceDelta || 0)}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export function OptionGroups({ product, selection, setSingle, toggleAddon }) {
  return (
    <div className="space-y-6">
      {product.optionGroups.map((g) => {
        if (g.kind === 'kit') {
          return (
            <div key={g.id}>
              <GroupLabel group={g} />
              <KitSelector kits={g.choices} activeId={selection[g.id]} onSelect={(id) => setSingle(g.id, id)} />
            </div>
          )
        }
        if (g.kind === 'swatch') {
          return <Swatch key={g.id} group={g} selectedId={selection[g.id]} onSelect={(id) => setSingle(g.id, id)} />
        }
        if (g.kind === 'addon') {
          return <AddonRows key={g.id} group={g} selectedIds={selection[g.id] || []} onToggle={(id) => toggleAddon(g.id, id)} />
        }
        return <RadioRows key={g.id} group={g} selectedId={selection[g.id]} onSelect={(id) => setSingle(g.id, id)} />
      })}
    </div>
  )
}
