import { motion, useReducedMotion } from 'framer-motion'
import { Bottle, SprayMist } from './Bottle'
import { BuyPanel } from './BuyPanel'

const EASE = [0.32, 0.72, 0, 1]

export function Hero({ format, setFormat, onAdd }) {
  const reduce = useReducedMotion()

  return (
    <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-6 pt-24 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-12 lg:pt-28">
      {/* Left — product gallery */}
      <div className="flex flex-col gap-3 lg:sticky lg:top-24 lg:self-start">
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative flex aspect-[4/4.4] items-center justify-center overflow-hidden rounded-3xl bg-white shadow-sm sm:aspect-square"
        >
          <span
            aria-hidden="true"
            className="font-display absolute top-8 left-1/2 -translate-x-1/2 text-[7.5rem] leading-none font-medium whitespace-nowrap text-accent/8 select-none lg:text-[9rem]"
          >
            HTG-30
          </span>
          <SprayMist className="absolute top-[16%] left-[10%] w-20" />
          <motion.div
            animate={reduce ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 w-[46%] max-w-[260px] py-12 drop-shadow-[0_32px_48px_rgba(0,0,0,0.22)]"
          >
            <Bottle className="w-full" />
          </motion.div>
          <span className="absolute bottom-5 left-5 rounded-full bg-page px-3.5 py-1.5 text-[11px] font-medium">
            pH 13–14 · alcalino
          </span>
          <span className="absolute right-5 bottom-5 rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-medium text-white">
            Uso profissional
          </span>
        </motion.div>

        {/* tiles */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="flex aspect-[4/3] flex-col justify-between rounded-3xl bg-accent-soft p-5"
          >
            <SprayMist className="w-14 opacity-70" />
            <p className="font-display text-lg leading-snug font-medium text-accent-deep">
              Remove gorduras
              <br />
              carbonizadas em 5 min.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
            className="flex aspect-[4/3] flex-col justify-between rounded-3xl bg-ink p-5 text-white"
          >
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] self-start">
              HORECA
            </span>
            <div>
              <p className="text-[13px] leading-snug opacity-90">
                “É o primeiro produto que recomendo em cozinhas com fritura
                intensiva.”
              </p>
              <p className="mt-2 text-[11px] opacity-50">Chef consultor · Porto</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right — buy panel */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      >
        <BuyPanel format={format} setFormat={setFormat} onAdd={onAdd} />
      </motion.div>
    </section>
  )
}
