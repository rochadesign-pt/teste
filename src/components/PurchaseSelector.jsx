import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { product } from '../data/product'
import { KitRow, BundleCard, VolumeRow } from './OptionCards'

const EASE = [0.32, 0.72, 0, 1]

const TABS = [
  { id: 'volumetria', label: 'Volumetrias' },
  { id: 'kit', label: 'Kits' },
  { id: 'bundle', label: 'Bundles' },
]

const HINTS = {
  volumetria: 'Escolha o tamanho — do pulverizador diário à recarga industrial.',
  kit: 'Conjuntos prontos onde o HTG-30 entra, para uma rotina completa.',
  bundle: 'Packs promocionais do HTG-30 com desconto imediato.',
}

const FIRST = {
  volumetria: (format) => format,
  kit: () => product.kits[0].name,
  bundle: () => product.bundles[0].name,
}

export function PurchaseSelector({ activeType, onRow, format, pickKit, pickBundle }) {
  const reduce = useReducedMotion()

  return (
    <div>
      {/* segmented control */}
      <div role="tablist" aria-label="Opções de compra" className="flex gap-1 rounded-lg border border-line bg-page p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeType === t.id}
            onClick={() => onRow(t.id, FIRST[t.id](format))}
            className={`relative flex-1 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-200 sm:text-sm ${
              activeType === t.id ? 'text-white' : 'text-muted hover:text-ink'
            }`}
          >
            {activeType === t.id && (
              <motion.span
                layoutId="buy-tab"
                transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                className="absolute inset-0 rounded-md bg-ink"
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <p className="mt-3 mb-3 text-xs leading-relaxed text-muted">{HINTS[activeType]}</p>

      {/* lists */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeType}
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -6 }}
          transition={{ duration: 0.25, ease: EASE }}
          className={activeType === 'bundle' ? 'grid grid-cols-2 gap-2' : 'space-y-2'}
          role="radiogroup"
        >
          {activeType === 'volumetria' &&
            product.formats.map((f) => (
              <VolumeRow key={f.id} f={f} active={format === f.id} onSelect={() => onRow('volumetria', f.id)} />
            ))}
          {activeType === 'kit' &&
            product.kits.map((k) => (
              <KitRow key={k.name} o={k} active={pickKit === k.name} onSelect={() => onRow('kit', k.name)} />
            ))}
          {activeType === 'bundle' &&
            product.bundles.map((b) => (
              <BundleCard key={b.name} o={b} active={pickBundle === b.name} onSelect={() => onRow('bundle', b.name)} />
            ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
