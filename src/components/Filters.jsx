import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.32, 0.72, 0, 1]

// Peças de filtro partilhadas entre as listagens (categorias, equipamentos).
export function Chevron({ open }) {
  return (
    <motion.svg width="10" height="6" viewBox="0 0 10 6" fill="none" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2, ease: EASE }} aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

export function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-line">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-4 text-left text-[13px] font-semibold">
        {title}
        <Chevron open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Check({ checked, onChange, children, count }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-[13px]">
      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${checked ? 'border-accent bg-accent' : 'border-ink/25 bg-white'}`}>
        {checked && (
          <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l2.8 2.8L9 1.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="flex-1">{children}</span>
      {count != null && <span className="text-[11px] text-muted/70">{count}</span>}
    </label>
  )
}

export function Radio({ checked, onChange, children, count }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-[13px]">
      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${checked ? 'border-accent' : 'border-ink/25'}`}>
        <span className={`h-2 w-2 rounded-full bg-accent transition-transform ${checked ? 'scale-100' : 'scale-0'}`} />
      </span>
      <input type="radio" checked={checked} onChange={onChange} className="sr-only" />
      <span className="flex-1">{children}</span>
      {count != null && <span className="text-[11px] text-muted/70">{count}</span>}
    </label>
  )
}
