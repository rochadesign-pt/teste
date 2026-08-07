import { motion, useReducedMotion } from 'framer-motion'
import { Placeholder } from './Placeholder'
import { BuyPanel } from './BuyPanel'
import { product } from '../data/product'

const EASE = [0.32, 0.72, 0, 1]

export function Hero({ format, setFormat, onAdd, variant }) {
  const reduce = useReducedMotion()
  const g = product.gallery

  return (
    <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-6 pt-[160px] pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-12 lg:pt-[172px]">
      {/* Left — photo gallery: main + details + lifestyle */}
      <div className="flex flex-col gap-3 lg:sticky lg:top-[152px] lg:self-start">
        {/* main product photo */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Placeholder src={g.main} alt="Tiragorduras HTG-30 750 mL" className="aspect-[4/3.2] border border-line shadow-xs" rounded="rounded-lg">
            <span className="absolute bottom-4 left-4 rounded-full bg-page px-3 py-1 text-[11px] font-medium">
              pH 13–14 · alcalino
            </span>
            <span className="absolute right-4 bottom-4 rounded-full bg-ink px-3 py-1 text-[11px] font-medium text-white">
              Uso profissional
            </span>
          </Placeholder>
        </motion.div>

        {/* detail tiles */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}>
            <Placeholder src={g.details[0]} alt="Detalhe do pulverizador" className="aspect-square border border-line" rounded="rounded-lg" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}>
            <Placeholder src={g.details[1]} alt="Detalhe da pulverização" className="aspect-square border border-line" rounded="rounded-lg" />
          </motion.div>
        </div>

        {/* lifestyle */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.22 }}
        >
          <div className="relative overflow-hidden rounded-lg bg-ink">
            <div className="absolute inset-0 bg-gradient-to-tr from-ink via-ink/90 to-[#20302a]" />
            <div className="relative flex aspect-[16/9] flex-col justify-between p-5 text-white">
              <span className="self-start rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em]">
                HORECA
              </span>
              <div>
                <p className="max-w-sm text-sm leading-snug opacity-90">
                  “É o primeiro produto que recomendo em cozinhas com fritura intensiva.”
                </p>
                <p className="mt-1.5 text-[11px] opacity-50">Chef consultor · Porto</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right — buy panel */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
      >
        <BuyPanel format={format} setFormat={setFormat} onAdd={onAdd} variant={variant} />
      </motion.div>
    </section>
  )
}
