import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { product } from '../data/product'

const EASE = [0.32, 0.72, 0, 1]

const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`

export function StickyBar({ format, onAdd }) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const selected = product.formats.find((f) => f.id === format)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: reduce ? 0 : 96, opacity: reduce ? 0 : 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduce ? 0 : 96, opacity: reduce ? 0 : 1 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-x-4 bottom-4 z-50 lg:inset-x-auto lg:right-8 lg:left-1/2 lg:-translate-x-1/2"
        >
          <div className="flex items-center justify-between gap-4 rounded-full bg-ink py-2 pr-2 pl-6 text-white shadow-2xl lg:min-w-[560px]">
            <div className="min-w-0">
              <p className="font-display truncate text-sm font-medium">
                {product.name} · {selected.label}
              </p>
              <p className="text-xs opacity-60">{fmt(selected.price)} · IVA incluído</p>
            </div>
            <motion.button
              type="button"
              onClick={onAdd}
              whileHover={reduce ? {} : { scale: 1.03 }}
              whileTap={reduce ? {} : { scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="h-12 shrink-0 rounded-full bg-accent px-6 text-sm font-semibold whitespace-nowrap transition-colors duration-200 hover:bg-accent-deep"
            >
              Adicionar
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
