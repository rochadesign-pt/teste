import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { product } from '../data/product'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function Steps() {
  const container = useRef(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const tl = gsap.timeline({
        scrollTrigger: { trigger: container.current, start: 'top 70%' },
      })
      tl.from('.steps-headline', {
        opacity: 0,
        y: reduce ? 0 : 28,
        duration: 0.6,
        ease: 'power3.out',
      }).from(
        '.step-row',
        {
          opacity: 0,
          y: reduce ? 0 : 32,
          duration: 0.65,
          stagger: 0.18,
          ease: 'power3.out',
        },
        '-=0.2',
      )
    },
    { scope: container },
  )

  return (
    <section ref={container} className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="steps-headline mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-accent">MODO DE UTILIZAÇÃO</p>
            <h2 className="font-display text-4xl leading-[1.02] font-black uppercase sm:text-5xl lg:text-6xl">
              Três passos.
              <br />
              Zero gordura.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed opacity-60">
            Em pavimentos e limpezas de manutenção, recomenda-se a utilização
            do HTG-30 numa diluição até 10%.
          </p>
        </div>

        <div className="divide-y divide-white/10">
          {product.steps.map((step) => (
            <div
              key={step.n}
              className="step-row group grid grid-cols-1 items-baseline gap-4 py-10 md:grid-cols-[120px_1fr_1.2fr]"
            >
              <span className="font-display text-5xl font-black text-accent lg:text-6xl">
                {step.n}
              </span>
              <h3 className="font-display text-3xl font-extrabold uppercase transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-2 lg:text-4xl">
                {step.title}
              </h3>
              <p className="max-w-lg leading-relaxed opacity-70">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
