import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { home } from '../data/site'
import { FauxPhoto } from './FauxPhoto'
import { Bottle } from './Bottle'

const EASE = [0.32, 0.72, 0, 1]

// Hyper signature: a large promo banner on the left, stacked collection
// cards on the right.
export function HeroBanner() {
  const reduce = useReducedMotion()
  const { banner, cards } = home.hero

  return (
    <section className="mx-auto max-w-[1600px] px-6 pt-[104px] lg:px-10">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.9fr_1fr]">
        {/* main banner */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <Link to={banner.href} className="group block">
            <FauxPhoto
              src={banner.image}
              scene={banner.scene}
              subject="mist"
              zoom
              className="relative min-h-[380px] rounded-xl lg:min-h-[520px]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.3)_50%,transparent_78%)]" />
              {/* product shot */}
              <div className="absolute right-6 bottom-0 hidden w-[30%] max-w-[240px] translate-y-[4%] drop-shadow-[0_28px_40px_rgba(0,0,0,0.4)] sm:block">
                <Bottle className="w-full" />
              </div>
              <div className="relative flex h-full flex-col justify-center p-8 text-white lg:p-12">
                <p className="text-[11px] font-medium tracking-[0.16em] text-white/80">{banner.eyebrow}</p>
                <h1 className="font-display mt-3 max-w-md text-4xl leading-[1.05] font-semibold sm:text-5xl">
                  {banner.title}
                </h1>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">{banner.text}</p>
                <div className="mt-7 flex items-center gap-4">
                  <span className="inline-flex h-11 items-center gap-2.5 rounded-lg bg-white px-6 text-sm font-semibold text-ink transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                    {banner.cta}
                    <span className="h-1.5 w-1.5 rounded-full bg-accent transition-colors group-hover:bg-white" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-white/90">
                    desde <span className="text-base">{banner.price}</span>
                  </span>
                </div>
              </div>
            </FauxPhoto>
          </Link>
        </motion.div>

        {/* collection cards */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.08 }}
            >
              <Link to={c.href} className="group block h-full">
                <FauxPhoto
                  scene={c.scene}
                  subject="bottle"
                  zoom
                  className="relative h-full min-h-[185px] rounded-xl lg:min-h-[254px]"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(0,0,0,0.5)_0%,transparent_55%)]" />
                  {c.badge && (
                    <span className="absolute top-3 right-3 rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      {c.badge}
                    </span>
                  )}
                  <div className="relative flex h-full flex-col justify-between p-5 text-white">
                    <div>
                      <p className="text-base font-semibold">{c.title}</p>
                      <p className="mt-0.5 text-[12px] text-white/70">{c.text}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold">
                      {c.cta}
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </FauxPhoto>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
