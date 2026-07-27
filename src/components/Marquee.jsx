import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const ITEMS = [
  'Remove gorduras carbonizadas',
  'Brilho no inox',
  'Atua a quente',
  'pH 13–14',
  'Uso profissional',
  'Fabricado em Portugal',
]

export function Marquee({ dark = false }) {
  const container = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.to('.marquee-track', {
        xPercent: -50,
        duration: 28,
        ease: 'none',
        repeat: -1,
      })
    },
    { scope: container },
  )

  return (
    <div
      ref={container}
      className={`overflow-hidden border-y py-5 ${
        dark ? 'border-cream/10 bg-ink text-cream' : 'border-ink/10 bg-cream'
      }`}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {ITEMS.map((item) => (
              <span
                key={`${half}-${item}`}
                className="font-display flex items-center gap-6 pr-6 text-2xl font-extrabold whitespace-nowrap uppercase lg:text-3xl"
              >
                {item}
                <svg width="18" height="18" viewBox="0 0 18 18" className="text-orange" aria-hidden="true">
                  <path d="M9 0l2.2 6.8H18l-5.6 4.1 2.1 6.9L9 13.6l-5.5 4.2 2.1-6.9L0 6.8h6.8z" fill="currentColor" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
