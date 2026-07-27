import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const EASE = [0.32, 0.72, 0, 1]

const OPTIONS = [
  { id: 'open', label: 'Tudo visível' },
  { id: 'tabs', label: 'Separadores' },
]

// Floating A/B control to compare the two purchase-selector layouts live.
// Meant as a test aid — remove once a direction is chosen.
export function LayoutToggle({ variant, onChange }) {
  const reduce = useReducedMotion()
  const [hidden, setHidden] = useState(false)

  if (hidden) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
      className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border border-line bg-white/90 p-1.5 pr-2 shadow-lg backdrop-blur"
    >
      <span className="pl-2 text-[10px] font-medium tracking-[0.12em] opacity-40">TESTE A/B</span>
      <div className="flex gap-0.5 rounded-full bg-page p-0.5">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={variant === o.id}
            className={`relative rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
              variant === o.id ? 'text-white' : 'opacity-60 hover:opacity-100'
            }`}
          >
            {variant === o.id && (
              <motion.span
                layoutId="layout-toggle"
                transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                className="absolute inset-0 rounded-full bg-ink"
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setHidden(true)}
        aria-label="Ocultar controlo de teste"
        className="flex h-6 w-6 items-center justify-center rounded-full text-xs opacity-40 transition-opacity hover:opacity-100"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>
  )
}
