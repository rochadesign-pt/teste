import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Bottle, SprayMist } from './Bottle'
import { product } from '../data/product'

const EASE = [0.32, 0.72, 0, 1]

const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`

export function Hero({ format, setFormat, onAdd }) {
  const reduce = useReducedMotion()
  const [added, setAdded] = useState(false)
  const selected = product.formats.find((f) => f.id === format)

  const handleAdd = () => {
    onAdd()
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  }
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <section className="mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 items-stretch gap-6 px-6 pt-24 pb-6 lg:grid-cols-2 lg:px-12">
      {/* Left — info */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex flex-col justify-center py-8 lg:pr-12"
      >
        <motion.div variants={item} className="mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.2em]">
          <span className="text-green">{product.brand}</span>
          <span className="h-1 w-1 rounded-full bg-orange" />
          <span className="opacity-50">{product.line.toUpperCase()}</span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-[13vw] leading-[0.9] font-black uppercase sm:text-7xl lg:text-[5.2rem]"
        >
          Tira
          <br />
          gorduras
          <span className="mt-3 block font-narrow text-[0.45em] font-extrabold text-orange">
            HTG-30 · 750 mL
          </span>
        </motion.h1>

        <motion.p variants={item} className="mt-8 max-w-md text-lg leading-relaxed opacity-80">
          {product.tagline} Desengordurante profissional de elevada alcalinidade
          para cozinhas industriais — remove gorduras acumuladas, óleos e
          sujidades orgânicas de todas as superfícies laváveis.
        </motion.p>

        {/* format picker */}
        <motion.div variants={item} className="mt-10">
          <p className="mb-3 text-xs font-bold tracking-[0.18em] opacity-50">FORMATO</p>
          <div className="flex flex-wrap gap-2">
            {product.formats.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormat(f.id)}
                aria-pressed={format === f.id}
                className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-colors duration-200 ${
                  format === f.id
                    ? 'border-ink bg-ink text-cream'
                    : 'border-ink/20 hover:border-ink'
                }`}
              >
                {f.label}
                <span className="ml-2 font-medium opacity-50">{f.detail}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* price + CTA */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-5">
          <motion.button
            type="button"
            onClick={handleAdd}
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={reduce ? {} : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="group flex h-16 items-center gap-4 rounded-full bg-orange pr-2 pl-6 text-base font-bold whitespace-nowrap text-cream shadow-[0_12px_32px_-12px_rgba(255,92,31,0.7)] transition-colors duration-200 hover:bg-orange-deep sm:gap-6 sm:pl-8"
          >
            {added ? 'Adicionado ✓' : 'Adicionar ao carrinho'}
            <span className="flex h-12 items-center rounded-full bg-ink px-5 text-cream tabular-nums whitespace-nowrap">
              {fmt(selected.price)}
            </span>
          </motion.button>
          <p className="text-xs leading-relaxed opacity-50">
            IVA incluído.
            <br />
            Envio em 24–48h.
          </p>
        </motion.div>
      </motion.div>

      {/* Right — product stage */}
      <motion.div
        initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="relative flex items-center justify-center overflow-hidden rounded-[2.5rem] bg-orange"
      >
        {/* oversized watermark type */}
        <span
          aria-hidden="true"
          className="font-display absolute top-6 left-1/2 -translate-x-1/2 text-[9rem] leading-none font-black whitespace-nowrap text-cream/15 select-none lg:text-[11rem]"
        >
          HTG-30
        </span>

        <SprayMist className="absolute top-[18%] left-[8%] w-24 opacity-0 lg:opacity-100" />

        <motion.div
          animate={reduce ? {} : { y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-[52%] max-w-[300px] py-16 drop-shadow-[0_40px_60px_rgba(0,0,0,0.25)]"
        >
          <Bottle className="w-full" />
        </motion.div>

        {/* floating badges */}
        <div className="absolute right-6 bottom-6 flex flex-col items-end gap-2">
          <span className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-cream">
            pH 13–14 · alcalino
          </span>
          <span className="rounded-full bg-cream px-4 py-2 text-xs font-bold text-ink">
            Uso profissional
          </span>
        </div>

        <div className="absolute bottom-6 left-6 hidden items-center gap-2 rounded-full bg-cream/90 px-4 py-2 text-xs font-bold backdrop-blur lg:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green" />
          Em stock
        </div>
      </motion.div>
    </section>
  )
}
