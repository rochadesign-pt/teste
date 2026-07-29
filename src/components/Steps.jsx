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
        y: reduce ? 0 : 24,
        duration: 0.6,
        ease: 'power3.out',
      }).from(
        '.step-card',
        {
          opacity: 0,
          y: reduce ? 0 : 24,
          duration: 0.55,
          stagger: 0.14,
          ease: 'power3.out',
        },
        '-=0.2',
      )
    },
    { scope: container },
  )

  return (
    <section ref={container} className="bg-ink text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="steps-headline mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Como aplicar o HTG-30
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-white/50">
            Em pavimentos e limpezas de manutenção, recomenda-se a utilização do
            HTG-30 numa diluição até 10%.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {product.steps.map((step) => (
            <article
              key={step.n}
              className="step-card group rounded-lg border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-accent/40"
            >
              <p className="text-[11px] font-medium tracking-[0.14em] text-white/40">{step.n}</p>
              <h3 className="mt-14 text-lg font-semibold transition-colors duration-300 group-hover:text-accent">
                {step.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
