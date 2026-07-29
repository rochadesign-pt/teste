import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { home } from '../data/site'
import { FauxPhoto } from './FauxPhoto'
import { Bottle } from './Bottle'

const EASE = [0.32, 0.72, 0, 1]
const AUTOPLAY = 6000

const DEPT_ICONS = {
  flame: 'M6 1c2 2 1 3.5 2.5 5C10.5 3.5 9 2.5 10 1c3 1.5 4 4.5 4 7a5 5 0 1 1-10 0c0-1.8.8-3.4 2-5z',
  drop: 'M8 1.5C11 5 13 7 13 9.5a5 5 0 1 1-10 0C3 7 5 5 8 1.5z',
  sparkle: 'M8 1l1.6 4.4L14 7l-4.4 1.6L8 13l-1.6-4.4L2 7l4.4-1.6L8 1z',
  shield: 'M8 1.5l5 2v4c0 3.3-2.2 5.6-5 6.5-2.8-.9-5-3.2-5-6.5v-4l5-2z',
  hand: 'M4 8V4.5a1 1 0 0 1 2 0V8m0-1V3a1 1 0 0 1 2 0v4m0 0V3.5a1 1 0 0 1 2 0V8m0-1.5a1 1 0 0 1 2 0V10a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4l-1-2',
  car: 'M2 9l1.5-4h9L14 9m-12 0h12m-12 0v3h2v-1h8v1h2V9M4.5 11a.5.5 0 100-1 .5.5 0 000 1m7 0a.5.5 0 100-1 .5.5 0 000 1',
  leaf: 'M2 14C2 8 6 3 14 2c0 8-5 12-9 12-1.5 0-3-.5-3-.5M5 11c2-3 4-5 7-6',
  tool: 'M10.5 2.5a3 3 0 0 0-4 4l-4.5 4.5 2 2 4.5-4.5a3 3 0 0 0 4-4l-2 2-1.5-1.5 2-2z',
}

function DeptIcon({ icon }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path d={DEPT_ICONS[icon] || DEPT_ICONS.sparkle} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Slideshow() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const slide = home.slides[i]

  useEffect(() => {
    if (paused || reduce) return
    const t = setInterval(() => setI((n) => (n + 1) % home.slides.length), AUTOPLAY)
    return () => clearInterval(t)
  }, [paused, reduce])

  return (
    <div
      className="relative min-h-[300px] overflow-hidden rounded-xl lg:min-h-[400px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: reduce ? 1 : 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute inset-0"
        >
          <FauxPhoto scene={slide.scene} subject="mist" className="h-full w-full">
            <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.28)_52%,transparent_80%)]" />
            <div className="absolute right-5 bottom-0 hidden w-[26%] max-w-[190px] translate-y-[4%] drop-shadow-[0_24px_36px_rgba(0,0,0,0.4)] sm:block">
              <Bottle className="w-full" />
            </div>
            <div className="relative flex h-full flex-col justify-center p-8 text-white lg:p-11">
              {slide.badge && (
                <span className="mb-3 w-fit rounded-md bg-accent px-2 py-0.5 text-xs font-bold text-white">
                  {slide.badge}
                </span>
              )}
              <p className="text-[11px] font-medium tracking-[0.16em] text-white/80">{slide.eyebrow}</p>
              <h2 className="font-display mt-2 max-w-md text-3xl leading-[1.06] font-semibold sm:text-4xl lg:text-[2.7rem]">
                {slide.title}
              </h2>
              <p className="mt-3 max-w-sm text-sm text-white/80">{slide.text}</p>
              <div className="mt-6 flex items-center gap-4">
                <Link
                  to={slide.href}
                  className="inline-flex h-11 items-center gap-2.5 rounded-lg bg-white px-6 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent hover:text-white"
                >
                  {slide.cta}
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                </Link>
                {slide.price && (
                  <span className="text-sm font-semibold text-white/90">
                    desde <span className="text-base">{slide.price}</span>
                  </span>
                )}
              </div>
            </div>
          </FauxPhoto>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-5 left-8 z-10 flex gap-1.5 lg:left-11" role="tablist" aria-label="Slides">
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
    </div>
  )
}

// Hyper hero: department sidebar (left) + slideshow and mini-banners (right).
export function HeroBanner() {
  const reduce = useReducedMotion()
  return (
    <section className="mx-auto max-w-[1600px] px-6 pt-[104px] lg:px-10">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[248px_1fr]">
        {/* department sidebar */}
        <aside className="hidden rounded-xl border border-line bg-white lg:block">
          <p className="border-b border-line px-4 py-3 text-[11px] font-semibold tracking-[0.12em] text-muted">
            TODAS AS CATEGORIAS
          </p>
          <ul className="p-1.5">
            {home.departments.map((d) => (
              <li key={d.title}>
                <a
                  href="#"
                  className="group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors duration-150 hover:bg-page"
                >
                  <span className="text-muted transition-colors group-hover:text-accent-deep">
                    <DeptIcon icon={d.icon} />
                  </span>
                  <span className="flex-1">{d.title}</span>
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="text-muted/50" aria-hidden="true">
                    <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* right column */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col gap-3"
        >
          <Slideshow />
          <div className="grid grid-cols-2 gap-3">
            {home.heroMiniBanners.map((b) => (
              <Link key={b.title} to={b.href} className="group block">
                <FauxPhoto scene={b.scene} subject="bottle" zoom className="relative h-[110px] rounded-xl lg:h-[124px]">
                  <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.55)_0%,transparent_70%)]" />
                  <div className="relative flex h-full flex-col justify-center p-4 text-white">
                    <p className="text-[13px] font-semibold">{b.title}</p>
                    <p className="text-[11px] text-white/70">{b.text}</p>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold">
                      {b.cta}
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </FauxPhoto>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
