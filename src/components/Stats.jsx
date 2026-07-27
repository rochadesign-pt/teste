import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { product } from '../data/product'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function Stats() {
  const container = useRef(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.utils.toArray('.stat-value').forEach((el) => {
        const target = Number(el.dataset.value)
        if (reduce) {
          el.innerText = target
          return
        }
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        )
      })
    },
    { scope: container },
  )

  return (
    <section ref={container} className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12">
      <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
        {product.stats.map((stat) => (
          <div key={stat.label} className="border-l-2 border-accent pl-6">
            <p className="font-display text-6xl font-black tabular-nums lg:text-7xl">
              <span className="stat-value" data-value={stat.value}>
                0
              </span>
              <span className="text-accent">{stat.suffix}</span>
            </p>
            <p className="mt-2 text-sm font-semibold opacity-60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
