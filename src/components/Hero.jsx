import { motion, useReducedMotion } from 'framer-motion'
import { Bottle, SprayMist } from './Bottle'
import { BuyPanel } from './BuyPanel'
import { product } from '../data/product'

const EASE = [0.32, 0.72, 0, 1]

function Photo({ src, alt, children, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-line bg-white shadow-xs ${className}`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        children
      )}
    </div>
  )
}

export function Hero({ format, setFormat, onAdd, variant }) {
  const reduce = useReducedMotion()
  const g = product.gallery

  return (
    <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-6 pt-28 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-12 lg:pt-32">
      {/* Left — photo gallery: main + details + lifestyle */}
      <div className="flex flex-col gap-3 lg:sticky lg:top-28 lg:self-start">
        {/* main product photo */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Photo src={g.main} alt="Tiragorduras HTG-30 750 mL" className="aspect-[4/3.2]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                aria-hidden="true"
                className="font-display absolute top-6 left-1/2 -translate-x-1/2 text-[6.5rem] leading-none font-semibold whitespace-nowrap text-accent/8 select-none lg:text-[8rem]"
              >
                HTG-30
              </span>
              <SprayMist className="absolute top-[18%] left-[12%] w-16" />
              <motion.div
                animate={reduce ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-[34%] max-w-[210px] drop-shadow-[0_24px_36px_rgba(0,0,0,0.18)]"
              >
                <Bottle className="w-full" />
              </motion.div>
              <span className="absolute bottom-4 left-4 rounded-md bg-page px-2.5 py-1 text-[11px] font-medium">
                pH 13–14 · alcalino
              </span>
              <span className="absolute right-4 bottom-4 rounded-md bg-ink px-2.5 py-1 text-[11px] font-medium text-white">
                Uso profissional
              </span>
            </div>
          </Photo>
        </motion.div>

        {/* detail tiles */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          >
            <Photo src={g.details[0]} alt="Detalhe do pulverizador" className="aspect-square bg-page">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[18%] left-1/2 w-[130%] -translate-x-1/2">
                  <Bottle className="w-full" />
                </div>
              </div>
            </Photo>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
          >
            <Photo src={g.details[1]} alt="Detalhe da pulverização" className="aspect-square bg-accent-soft/60">
              <div className="absolute inset-0 flex items-center justify-center">
                <SprayMist className="w-3/5 opacity-80" />
              </div>
            </Photo>
          </motion.div>
        </div>

        {/* lifestyle */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.22 }}
        >
          <Photo src={g.lifestyle} alt="Aplicação em cozinha profissional" className="aspect-[16/9] border-0 bg-ink">
            <div className="absolute inset-0 bg-gradient-to-tr from-ink via-ink/90 to-[#20302a]" />
            <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
              <span className="self-start rounded-md bg-white/10 px-2 py-1 text-[10px] font-medium tracking-[0.12em]">
                HORECA
              </span>
              <div>
                <p className="max-w-sm text-sm leading-snug opacity-90">
                  “É o primeiro produto que recomendo em cozinhas com fritura intensiva.”
                </p>
                <p className="mt-1.5 text-[11px] opacity-50">Chef consultor · Porto</p>
              </div>
            </div>
          </Photo>
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
