import { motion, useReducedMotion } from 'framer-motion'
import { Placeholder } from './Placeholder'
import { EquipmentBuyPanel } from './EquipmentBuyPanel'

const EASE = [0.32, 0.72, 0, 1]

export function EquipmentHero({ product, selection, setSingle, toggleAddon, total, onAdd }) {
  const reduce = useReducedMotion()

  return (
    <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-6 pt-[160px] pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-12 lg:pt-[172px]">
      {/* Left — gallery (gray placeholders) */}
      <div className="flex flex-col gap-3 lg:sticky lg:top-[152px] lg:self-start">
        <motion.div initial={{ opacity: 0, scale: reduce ? 1 : 0.99 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: EASE }}>
          <Placeholder className="aspect-[4/3.2] border border-line shadow-xs" rounded="rounded-2xl">
            <span className="absolute top-4 left-4 rounded-full bg-ink px-3 py-1 text-[11px] font-medium text-white">{product.gallery.badgeTop}</span>
            <span className="absolute right-4 bottom-4 rounded-full bg-page px-3 py-1 text-[11px] font-medium">{product.gallery.badgeBottom}</span>
          </Placeholder>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          <motion.div initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}>
            <Placeholder className="aspect-square border border-line" rounded="rounded-2xl" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}>
            <Placeholder className="aspect-square border border-line" rounded="rounded-2xl" />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.22 }}>
          <div className="relative overflow-hidden rounded-2xl bg-ink">
            <div className="absolute inset-0 bg-gradient-to-tr from-ink via-ink/90 to-[#20302a]" />
            <div className="relative flex aspect-[16/9] flex-col justify-between p-5 text-white">
              <span className="self-start rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em]">
                {product.statusLabel.toUpperCase()}
              </span>
              <div>
                <p className="max-w-sm text-sm leading-snug opacity-90">“{product.reviews[0].body.split('.')[0]}.”</p>
                <p className="mt-1.5 text-[11px] opacity-50">{product.reviews[0].name} · {product.reviews[0].role}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right — buy panel */}
      <motion.div initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}>
        <EquipmentBuyPanel product={product} selection={selection} setSingle={setSingle} toggleAddon={toggleAddon} total={total} onAdd={onAdd} />
      </motion.div>
    </section>
  )
}
