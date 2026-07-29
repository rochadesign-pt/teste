import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { home } from '../data/site'
import { Bottle, SprayMist } from './Bottle'

const EASE = [0.32, 0.72, 0, 1]
const AUTOPLAY = 6000

const TONES = {
  light: 'bg-white text-ink',
  dark: 'bg-ink text-white',
  accent: 'bg-accent text-white',
}

function SlideVisual({ slide }) {
  if (slide.id === 'bundles') {
    return (
      <div className="relative flex h-full items-end justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{ zIndex: 3 - i, marginLeft: i ? '-14%' : 0 }}
            className="w-[30%] max-w-[150px] translate-y-[8%] drop-shadow-[0_20px_28px_rgba(0,0,0,0.25)]"
          >
            <Bottle className="w-full" />
          </div>
        ))}
        <span className="font-display absolute top-6 right-6 rounded-lg bg-white px-3 py-2 text-2xl font-bold text-ink shadow-lg">
          {slide.badge}
        </span>
      </div>
    )
  }
  if (slide.id === 'pro') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-8">
        {['Faturação com NIF', 'Fichas técnicas e FDS', 'Apoio técnico dedicado'].map((t, i) => (
          <div
            key={t}
            className="flex w-full max-w-[280px] items-center gap-2.5 rounded-lg bg-white/15 px-4 py-3 text-sm font-medium backdrop-blur"
            style={{ marginLeft: `${i * 14}px` }}
          >
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
              <path d="M1 5l3.4 3.4L11 1.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t}
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="relative flex h-full items-center justify-center">
      <SprayMist className="absolute top-[16%] left-[12%] w-16" />
      <div className="w-[38%] max-w-[190px] drop-shadow-[0_24px_36px_rgba(0,0,0,0.2)]">
        <Bottle className="w-full" />
      </div>
      {slide.price && (
        <span className="absolute top-6 right-6 rounded-md bg-ink px-3 py-1.5 text-sm font-semibold text-white">
          {slide.price}
        </span>
      )}
    </div>
  )
}

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
      className="mx-auto max-w-[1280px] px-6 pt-28 lg:px-12 lg:pt-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Promoções em destaque"
    >
      <div className="relative overflow-hidden rounded-xl border border-line shadow-xs">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: reduce ? 0 : 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : -24 }}
            transition={{ duration: 0.45, ease: EASE }}
            className={`grid min-h-[380px] grid-cols-1 md:grid-cols-2 ${TONES[slide.tone]}`}
          >
            {/* copy */}
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p
                className={`text-[11px] font-medium tracking-[0.16em] ${
                  slide.tone === 'light' ? 'text-accent-deep' : 'text-white/70'
                }`}
              >
                {slide.eyebrow}
              </p>
              <h1 className="font-display mt-3 max-w-md text-3xl leading-[1.08] font-semibold sm:text-4xl lg:text-[2.6rem]">
                {slide.title}
              </h1>
              <p
                className={`mt-4 max-w-md text-sm leading-relaxed ${
                  slide.tone === 'light' ? 'text-muted' : 'text-white/70'
                }`}
              >
                {slide.text}
              </p>
              <div className="mt-7">
                <Link
                  to={slide.href}
                  className={`inline-flex h-11 items-center gap-2.5 rounded-lg px-6 text-sm font-semibold transition-colors duration-200 ${
                    slide.tone === 'light'
                      ? 'bg-ink text-white hover:bg-accent-deep'
                      : 'bg-white text-ink hover:bg-accent-soft'
                  }`}
                >
                  {slide.cta}
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* visual */}
            <div
              className={`relative hidden md:block ${
                slide.tone === 'light' ? 'bg-page' : 'bg-white/5'
              }`}
            >
              <SlideVisual slide={slide} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* controls */}
        <div className="absolute bottom-4 left-8 z-10 flex items-center gap-3 lg:left-12">
          <div className="flex gap-1.5" role="tablist" aria-label="Slides">
            {home.slides.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-6 bg-accent'
                    : `w-1.5 ${slide.tone === 'light' ? 'bg-ink/20' : 'bg-white/30'}`
                }`}
              />
            ))}
          </div>
        </div>
        <div className="absolute right-4 bottom-3 z-10 flex gap-1.5">
          {[
            { dir: -1, label: 'Slide anterior', d: 'M7 1L2 6l5 5' },
            { dir: 1, label: 'Slide seguinte', d: 'M2 1l5 5-5 5' },
          ].map((b) => (
            <button
              key={b.dir}
              type="button"
              aria-label={b.label}
              onClick={() => go(b.dir)}
              className={`flex h-8 w-8 items-center justify-center rounded-md border transition-colors duration-200 ${
                slide.tone === 'light'
                  ? 'border-line bg-white hover:border-ink/30'
                  : 'border-white/20 bg-white/10 text-white hover:border-white/50'
              }`}
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
