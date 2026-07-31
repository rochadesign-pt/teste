import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { home } from '../data/site'
import { FauxPhoto } from './FauxPhoto'
import { Bottle } from './Bottle'

const EASE = [0.32, 0.72, 0, 1]
const AUTOPLAY = 6000

// Full-width hero slideshow — 3–4 banners telling the news.
export function HeroBanner() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const slide = home.slides[i]

  useEffect(() => {
    if (paused || reduce) return
    const t = setInterval(() => setI((n) => (n + 1) % home.slides.length), AUTOPLAY)
    return () => clearInterval(t)
  }, [paused, reduce])

  const go = (dir) => setI((n) => (n + dir + home.slides.length) % home.slides.length)

  return (
    <section
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Novidades e promoções"
    >
      <div className="relative min-h-[520px] overflow-hidden lg:min-h-[640px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: reduce ? 1 : 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute inset-0"
          >
            <FauxPhoto scene={slide.scene} subject={slide.subject} className="h-full w-full">
              <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.64)_0%,rgba(0,0,0,0.34)_46%,transparent_76%)]" />
              {/* product shot */}
              <div className="absolute right-[6%] bottom-0 hidden w-[24%] max-w-[300px] translate-y-[4%] drop-shadow-[0_30px_44px_rgba(0,0,0,0.4)] lg:block">
                <Bottle className="w-full" />
              </div>
            </FauxPhoto>

            {/* copy */}
            <div className="absolute inset-0 mx-auto flex max-w-[1600px] flex-col justify-center px-6 text-white lg:px-10">
              {slide.badge && (
                <motion.span
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.12 }}
                  className="mb-3 w-fit rounded-full bg-accent px-3 py-1 text-sm font-bold text-white"
                >
                  {slide.badge}
                </motion.span>
              )}
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
                className="font-display mt-3 max-w-xl text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-[3.4rem]"
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
                className="mt-8 flex items-center gap-4"
              >
                <Link
                  to={slide.href}
                  className="inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-8 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent hover:text-white"
                >
                  {slide.cta}
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                </Link>
                {slide.price && (
                  <span className="text-sm font-semibold text-white/90">
                    desde <span className="text-base">{slide.price}</span>
                  </span>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* dots */}
        <div className="absolute bottom-6 left-6 z-10 flex gap-1.5 lg:left-10" role="tablist" aria-label="Slides">
          {home.slides.map((s, n) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={n === i}
              aria-label={`Slide ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                n === i ? 'w-6 bg-accent' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
        {/* arrows */}
        <div className="absolute right-6 bottom-6 z-10 hidden gap-1.5 md:flex lg:right-10">
          {[
            { dir: -1, label: 'Slide anterior', d: 'M7 1L2 6l5 5' },
            { dir: 1, label: 'Slide seguinte', d: 'M2 1l5 5-5 5' },
          ].map((b) => (
            <button
              key={b.dir}
              type="button"
              aria-label={b.label}
              onClick={() => go(b.dir)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-colors duration-200 hover:bg-white hover:text-ink"
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
