import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { home } from '../data/site'
import { FauxPhoto } from './FauxPhoto'
import { Bottle } from './Bottle'

const EASE = [0.32, 0.72, 0, 1]
const AUTOPLAY = 6500

export function HeroSlider() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const slide = home.slides[index]

  useEffect(() => {
    if (paused || reduce) return
    const t = setInterval(() => setIndex((i) => (i + 1) % home.slides.length), AUTOPLAY)
    return () => clearInterval(t)
  }, [paused, reduce])

  const go = (dir) => setIndex((i) => (i + dir + home.slides.length) % home.slides.length)

  return (
    <section
      className="mx-auto max-w-[1280px] px-4 pt-24 sm:px-6 lg:px-8 lg:pt-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Promoções em destaque"
    >
      <div className="relative min-h-[440px] overflow-hidden rounded-xl lg:min-h-[520px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: reduce ? 1 : 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute inset-0"
          >
            <FauxPhoto
              src={slide.image}
              alt=""
              scene={slide.scene}
              subject={slide.id === 'bundles' ? 'set' : slide.id === 'htg30' ? 'mist' : null}
              className="h-full w-full"
            >
              {/* readability gradient */}
              <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.34)_46%,transparent_75%)]" />
            </FauxPhoto>

            {/* copy overlay */}
            <div className="absolute inset-0 flex flex-col justify-center p-8 text-white lg:p-14">
              <motion.p
                initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                className="text-[11px] font-medium tracking-[0.18em] text-white/80"
              >
                {slide.eyebrow}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.22 }}
                className="font-display mt-4 max-w-xl text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-[3.4rem]"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
                className="mt-4 max-w-md text-sm leading-relaxed text-white/80"
              >
                {slide.text}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.38 }}
                className="mt-8"
              >
                <Link
                  to={slide.href}
                  className="inline-flex h-12 items-center gap-2.5 rounded-lg bg-white px-7 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent hover:text-white"
                >
                  {slide.cta}
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                </Link>
              </motion.div>
            </div>

            {/* floating product card */}
            {slide.card && (
              <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.45 }}
                className="absolute right-6 bottom-20 hidden items-center gap-3 rounded-lg border border-white/20 bg-white/95 p-2.5 pr-4 shadow-lg backdrop-blur md:flex"
              >
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-page">
                  <Bottle className="h-10 w-auto" />
                </div>
                <div>
                  <p className="text-[12px] leading-tight font-semibold text-ink">{slide.card.name}</p>
                  <p className="text-[11px] text-muted">
                    {slide.card.detail} · <span className="font-semibold text-ink">{slide.card.price}</span>
                  </p>
                </div>
              </motion.div>
            )}
            {slide.badge && (
              <span className="font-display absolute top-6 right-6 hidden rounded-lg bg-white px-3.5 py-2 text-2xl font-bold text-ink shadow-lg md:block">
                {slide.badge}
              </span>
            )}
          </motion.div>
        </AnimatePresence>

        {/* controls */}
        <div className="absolute bottom-5 left-8 z-10 flex gap-1.5 lg:left-14" role="tablist" aria-label="Slides">
          {home.slides.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-accent' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
        <div className="absolute right-5 bottom-4 z-10 hidden gap-1.5 md:flex">
          {[
            { dir: -1, label: 'Slide anterior', d: 'M7 1L2 6l5 5' },
            { dir: 1, label: 'Slide seguinte', d: 'M2 1l5 5-5 5' },
          ].map((b) => (
            <button
              key={b.dir}
              type="button"
              aria-label={b.label}
              onClick={() => go(b.dir)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 bg-white/10 text-white backdrop-blur transition-colors duration-200 hover:bg-white hover:text-ink"
            >
              <svg width="9" height="12" viewBox="0 0 9 12" fill="none" aria-hidden="true">
                <path d={b.d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
