import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { home } from '../data/site'
import { HeroBanner } from '../components/HeroBanner'
import { ProductCard } from '../components/ProductCard'
import { GuaranteeIcon, Stars } from '../components/PayIcons'
import { FauxPhoto } from '../components/FauxPhoto'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1600px] px-6 lg:px-10'

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 0.5, ease: EASE },
}

function SectionHead({ eyebrow, title, action }) {
  return (
    <motion.div {...reveal} className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-1.5 text-[11px] font-medium tracking-[0.16em] text-accent-deep">{eyebrow}</p>}
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
      </div>
      {action}
    </motion.div>
  )
}

/* ——— USPs ——— */
function Usps() {
  return (
    <section className="mt-3 border-y border-line bg-white">
      <div className={`${WRAP} grid grid-cols-2 gap-6 py-6 lg:grid-cols-4`}>
        {home.usps.map((u) => (
          <div key={u.title} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent-deep">
              <GuaranteeIcon icon={u.icon} className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[13px] leading-tight font-semibold">{u.title}</p>
              <p className="text-[11px] text-muted">{u.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ——— Shop by category — 6 tiles ——— */
function CategoryStrip() {
  return (
    <section className={`${WRAP} py-14`}>
      <SectionHead
        eyebrow="CATEGORIAS"
        title="Compre por categoria"
        action={
          <a href="#" className="text-sm font-medium text-accent-deep underline-offset-2 hover:underline">
            Ver catálogo completo →
          </a>
        }
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {home.categories.map((c, i) => (
          <motion.a
            key={c.title}
            href="#"
            {...reveal}
            transition={{ ...reveal.transition, delay: (i % 6) * 0.05 }}
            className="group"
          >
            <FauxPhoto scene={c.scene} subject={c.subject} zoom className="aspect-[4/5] rounded-xl shadow-xs">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(0,0,0,0.62)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="text-sm font-semibold">{c.title}</p>
                <p className="text-[11px] text-white/70">{c.count} produtos</p>
              </div>
            </FauxPhoto>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

/* ——— Featured products tabs (Hyper) ——— */
function ProductTabs({ addItem }) {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState(home.productTabs[0].id)
  const items = home.products.filter((p) => p.tabs.includes(tab)).slice(0, 10)

  return (
    <section className="bg-white">
      <div className={`${WRAP} py-14`}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div role="tablist" aria-label="Coleções" className="flex gap-1 rounded-lg border border-line bg-page p-1">
            {home.productTabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`relative rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  tab === t.id ? 'text-white' : 'text-muted hover:text-ink'
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="prodtab"
                    transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                    className="absolute inset-0 rounded-md bg-ink"
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
          <a href="#" className="text-sm font-medium text-accent-deep underline-offset-2 hover:underline">
            Ver todos →
          </a>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -6 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 lg:grid-cols-5"
          >
            {items.map((p) => (
              <ProductCard key={p.key} p={p} addItem={addItem} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ——— Grid banners ——— */
function GridBanners() {
  return (
    <section className={`${WRAP} py-14`}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {home.banners.map((b, i) => (
          <motion.div
            key={b.title}
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.08 }}
          >
            <Link to={b.href} className="group block">
              <FauxPhoto scene={b.scene} subject={b.subject} zoom className="relative min-h-[220px] rounded-xl">
                <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.25)_60%,transparent_85%)]" />
                <div className="relative flex h-full min-h-[220px] flex-col justify-center p-7 text-white">
                  <p className="text-[11px] font-medium tracking-[0.14em] text-white/70">{b.eyebrow}</p>
                  <h3 className="font-display mt-2 max-w-xs text-2xl leading-tight font-semibold">{b.title}</h3>
                  <p className="mt-2 max-w-xs text-[13px] text-white/75">{b.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold">
                    {b.cta}
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </FauxPhoto>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ——— Coleção em destaque ——— */
function Showcase({ addItem }) {
  const s = home.showcase
  const items = s.keys.map((k) => home.products.find((p) => p.key === k)).filter(Boolean)
  return (
    <section className="bg-white">
      <div className={`${WRAP} py-14`}>
        <SectionHead
          eyebrow={s.eyebrow}
          title={s.title}
          action={
            <a href={s.href} className="text-sm font-medium text-accent-deep underline-offset-2 hover:underline">
              Ver coleção →
            </a>
          }
        />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.1fr_2fr]">
          {/* feature tile */}
          <motion.div {...reveal}>
            <Link to="/produto/htg-30" className="group block h-full">
              <FauxPhoto scene="kitchen" subject="bottle" zoom className="relative h-full min-h-[280px] rounded-xl">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[11px] font-medium tracking-[0.14em] text-white/70">{s.text}</p>
                  <p className="font-display mt-1 text-xl font-semibold">{s.title}</p>
                </div>
              </FauxPhoto>
            </Link>
          </motion.div>
          {/* product grid */}
          <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.06 }} className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-4 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.key} p={p} addItem={addItem} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ——— Banner bundles ——— */
function PromoBanner() {
  return (
    <section className={`${WRAP} py-6`}>
      <motion.div {...reveal}>
        <FauxPhoto scene="green" subject="set" className="rounded-xl">
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.25)_55%,transparent_82%)]" />
          <div className="relative flex min-h-[240px] flex-col justify-center p-8 text-white lg:p-12">
            <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.14em]">
              <span className="rounded-md bg-white px-1.5 py-0.5 text-[9px] font-semibold text-ink">PROMO</span>
              <span className="text-white/70">POR TEMPO LIMITADO</span>
            </p>
            <h2 className="font-display mt-3 max-w-md text-3xl leading-[1.08] font-semibold sm:text-4xl">
              Bundles com até 15% de poupança
            </h2>
            <p className="mt-3 max-w-sm text-sm text-white/75">
              Stock garantido e envio grátis acima de 30 €.
            </p>
            <div className="mt-6">
              <Link
                to="/produto/htg-30"
                className="inline-flex h-11 items-center gap-2.5 rounded-lg bg-white px-6 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-white"
              >
                Ver oportunidades
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </FauxPhoto>
      </motion.div>
    </section>
  )
}

/* ——— Testemunhos ——— */
function Testimonials() {
  return (
    <section className={`${WRAP} py-14`}>
      <SectionHead eyebrow="TESTEMUNHOS" title="Quem usa, confia" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {home.testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            {...reveal}
            transition={{ ...reveal.transition, delay: (i % 4) * 0.05 }}
            className="flex flex-col justify-between rounded-xl border border-line bg-white p-5"
          >
            <div>
              <Stars value={t.rating} />
              <blockquote className="mt-3 text-[13px] leading-relaxed">“{t.quote}”</blockquote>
            </div>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-[13px] font-semibold text-accent-deep">
                {t.name.charAt(0)}
              </span>
              <div>
                <p className="text-[12px] font-semibold">{t.name}</p>
                <p className="text-[11px] text-muted">{t.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}

/* ——— Newsletter ——— */
function Newsletter() {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)
  return (
    <section className={`${WRAP} pb-16`}>
      <motion.div {...reveal}>
        <FauxPhoto scene="cream" subject="mist" className="rounded-xl border border-line">
          <div className="relative grid grid-cols-1 items-center gap-8 p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep">NEWSLETTER</p>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Promoções e novidades, direto ao email.
              </h2>
              <p className="mt-2 text-sm text-muted">
                Campanhas exclusivas, novos produtos e dicas técnicas. Sem spam.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setDone(true)
              }}
              className="flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="O seu email profissional"
                aria-label="Email"
                className="h-12 flex-1 rounded-lg border border-line bg-white px-4 text-sm outline-none placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
              <motion.button
                type="submit"
                whileTap={reduce ? {} : { scale: 0.98 }}
                className="h-12 rounded-lg bg-ink px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-deep"
              >
                {done ? 'Subscrito ✓' : 'Subscrever'}
              </motion.button>
            </form>
          </div>
        </FauxPhoto>
      </motion.div>
    </section>
  )
}

export function Home({ addItem }) {
  return (
    <main>
      <HeroBanner />
      <Usps />
      <CategoryStrip />
      <ProductTabs addItem={addItem} />
      <GridBanners />
      <Showcase addItem={addItem} />
      <PromoBanner />
      <Testimonials />
      <Newsletter />
    </main>
  )
}
