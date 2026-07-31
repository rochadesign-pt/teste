import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { home } from '../data/site'
import { shopCategories, shopProducts, countByCat } from '../data/catalog'
import { HeroBanner } from '../components/HeroBanner'
import { ProductCard } from '../components/ProductCard'
import { FauxPhoto } from '../components/FauxPhoto'
import { GuaranteeIcon, Stars } from '../components/PayIcons'
import { Bottle } from '../components/Bottle'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1600px] px-6 lg:px-10'
const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`
const byKey = (k) => shopProducts.find((p) => p.key === k)

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

function Arrows({ onPrev, onNext }) {
  return (
    <div className="flex gap-1.5">
      {[
        { fn: onPrev, label: 'Anterior', d: 'M7 1L2 6l5 5' },
        { fn: onNext, label: 'Seguinte', d: 'M2 1l5 5-5 5' },
      ].map((b) => (
        <button
          key={b.label}
          type="button"
          aria-label={b.label}
          onClick={b.fn}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white transition-colors duration-200 hover:border-ink/30"
        >
          <svg width="9" height="12" viewBox="0 0 9 12" fill="none" aria-hidden="true">
            <path d={b.d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
    </div>
  )
}

/* ——— 3 · New Arrivals (promo + carrossel + tabs) ——— */
function NewArrivals({ addItem }) {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState(home.newArrivals.tabs[0].id)
  const track = useRef(null)
  const items = useMemo(() => shopProducts.filter((p) => (tab === 'novidades' ? p.new : p.tag === 'Mais vendido' || p.tag === 'Melhor €/L')).slice(0, 8), [tab])
  const scroll = (d) => track.current?.scrollBy({ left: d * 260, behavior: 'smooth' })

  return (
    <section className={`${WRAP} py-14`}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Novidades</h2>
        <div className="flex items-center gap-3">
          <div role="tablist" className="flex gap-1 rounded-full border border-line bg-page p-1">
            {home.newArrivals.tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${tab === t.id ? 'text-white' : 'text-muted hover:text-ink'}`}
              >
                {tab === t.id && (
                  <motion.span layoutId="na-tab" transition={{ duration: reduce ? 0 : 0.3, ease: EASE }} className="absolute inset-0 rounded-full bg-ink" />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
          <Arrows onPrev={() => scroll(-1)} onNext={() => scroll(1)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[280px_1fr]">
        {/* promo card */}
        <Link to={home.newArrivals.promo.href} className="group hidden lg:block">
          <FauxPhoto scene="green" subject="bottle" zoom className="relative h-full rounded-xl">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.6)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-[11px] font-medium tracking-[0.14em] text-white/70">{home.newArrivals.promo.eyebrow}</p>
              <p className="font-display mt-1 text-xl leading-tight font-semibold">{home.newArrivals.promo.title}</p>
              <p className="mt-2 text-[12px] text-white/70">{home.newArrivals.promo.text}</p>
              <span className="mt-4 inline-flex h-9 items-center gap-2 rounded-full bg-white px-5 text-[12px] font-semibold text-ink transition-colors group-hover:bg-accent group-hover:text-white">
                {home.newArrivals.promo.cta} →
              </span>
            </div>
          </FauxPhoto>
        </Link>

        {/* carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            ref={track}
            className="flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none]"
          >
            {items.map((p) => (
              <div key={p.key} className="w-[220px] shrink-0 snap-start">
                <ProductCard p={p} addItem={addItem} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ——— 4 · Flash sale bar (countdown) ——— */
function FlashSale() {
  const reduce = useReducedMotion()
  const [end] = useState(() => Date.now() + 12 * 3600 * 1000)
  const [left, setLeft] = useState(end - Date.now())
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, end - Date.now())), 1000)
    return () => clearInterval(t)
  }, [end])
  const s = Math.floor(left / 1000)
  const parts = [
    ['dias', Math.floor(s / 86400)],
    ['horas', Math.floor((s % 86400) / 3600)],
    ['min', Math.floor((s % 3600) / 60)],
    ['seg', s % 60],
  ]
  return (
    <section className={`${WRAP} pb-2`}>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-accent-soft px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-white">FLASH</span>
          <p className="text-sm font-semibold">Promoções relâmpago terminam em:</p>
        </div>
        <div className="flex items-center gap-1.5">
          {parts.map(([label, v], i) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className="flex flex-col items-center">
                <span className="flex h-9 min-w-9 items-center justify-center rounded-md bg-ink px-1.5 font-display text-sm font-semibold tabular-nums text-white">
                  {String(v).padStart(2, '0')}
                </span>
              </span>
              {i < 3 && <span className="font-semibold text-ink/40">:</span>}
            </span>
          ))}
        </div>
        <Link to="/produto/htg-30" className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep">
          Ver ofertas
        </Link>
      </div>
    </section>
  )
}

/* ——— 5 · Grelha de coleções + lifestyle split ——— */
function CollectionGrid() {
  return (
    <section className={`${WRAP} py-12`}>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {home.collectionTiles.map((c, i) => (
          <motion.div key={i} {...reveal} transition={{ ...reveal.transition, delay: (i % 4) * 0.05 }}>
            <Link to={`/categoria/${c.slug}`} className="group block">
              <FauxPhoto scene={c.scene} subject={c.subject} zoom className="relative aspect-[4/3] rounded-xl">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.6)_100%)]" />
                <p className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white">{c.title}</p>
              </FauxPhoto>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1.8fr]">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {home.lifestyleSplit.small.map((s) => (
            <Link key={s.title} to={`/categoria/${s.slug}`} className="group block">
              <FauxPhoto scene={s.scene} subject="bottle" zoom className="relative aspect-[16/9] rounded-xl lg:aspect-auto lg:h-full">
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.45)_0%,transparent_70%)]" />
                <p className="absolute top-4 left-4 text-sm font-semibold text-white">{s.title}</p>
              </FauxPhoto>
            </Link>
          ))}
        </div>
        <motion.div {...reveal}>
          <Link to={home.lifestyleSplit.big.href} className="group block">
            <FauxPhoto scene={home.lifestyleSplit.big.scene} className="relative aspect-[16/9] rounded-xl">
              <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.55)_0%,transparent_75%)]" />
              <div className="absolute inset-y-0 left-0 flex max-w-sm flex-col justify-center p-8 text-white">
                <h3 className="font-display text-2xl leading-tight font-semibold sm:text-3xl">{home.lifestyleSplit.big.title}</h3>
                <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-ink transition-colors group-hover:bg-accent group-hover:text-white">
                  {home.lifestyleSplit.big.cta} →
                </span>
              </div>
            </FauxPhoto>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ——— 6 · Testimonial feature ——— */
function TestimonialFeature() {
  const p = byKey(home.feature.productKey)
  return (
    <section className="bg-accent-soft/50">
      <div className={`${WRAP} grid grid-cols-1 items-center gap-8 py-14 lg:grid-cols-[320px_1fr]`}>
        <motion.div {...reveal}>
          <div className="rounded-xl border border-line bg-white p-5 shadow-xs">
            <div className="flex h-40 items-center justify-center rounded-lg bg-page">
              <Bottle className="h-32 w-auto" />
            </div>
            <p className="mt-3 text-[13px] font-medium">{p.name}</p>
            <p className="text-[12px] text-muted">{p.detail}</p>
            <p className="mt-1 text-sm font-semibold">{fmt(p.price)}</p>
          </div>
        </motion.div>
        <motion.blockquote {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
          <p className="font-display text-2xl leading-snug font-medium sm:text-3xl">“{home.feature.quote}”</p>
          <footer className="mt-5 text-sm">
            <span className="font-semibold">{home.feature.name}</span>
            <span className="text-muted"> · {home.feature.role}</span>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  )
}

/* ——— 7 · Get inspired by spaces ——— */
function Spaces() {
  return (
    <section className={`${WRAP} py-14`}>
      <SectionHead eyebrow="INSPIRAÇÃO" title="Soluções por espaço" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {home.spaces.map((s, i) => (
          <motion.a key={s.title} href="#" {...reveal} transition={{ ...reveal.transition, delay: i * 0.06 }} className="group">
            <FauxPhoto scene={s.scene} subject="bottle" zoom className="relative aspect-[4/3] rounded-xl">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
              <span className="absolute top-3 right-3 flex h-8 items-center rounded-full bg-white/90 px-2.5 text-[11px] font-semibold text-ink backdrop-blur">
                {s.count} produtos
              </span>
              <p className="absolute inset-x-0 bottom-0 p-4 text-base font-semibold text-white">{s.title}</p>
            </FauxPhoto>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

/* ——— 8 · Dois promo banners ——— */
function TwoPromos() {
  return (
    <section className={`${WRAP} pb-4`}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {home.twoPromos.map((b) => (
          <motion.div key={b.title} {...reveal}>
            <Link to={b.href} className="group block">
              <FauxPhoto scene={b.scene} subject="bottle" zoom className="relative min-h-[200px] rounded-xl">
                <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.5)_0%,transparent_72%)]" />
                <span className="absolute top-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-center text-[12px] font-bold leading-none text-white">
                  {b.discount}
                </span>
                <div className="relative flex h-full min-h-[200px] flex-col justify-center p-7 text-white">
                  <h3 className="font-display text-2xl font-semibold">{b.title}</h3>
                  <p className="mt-1 text-[13px] text-white/75">{b.text}</p>
                  <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-ink transition-colors group-hover:bg-ink group-hover:text-white">
                    {b.cta} →
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

/* ——— 9 · Shop our offers (chips + grelha) ——— */
function ShopOffers({ addItem }) {
  const [chip, setChip] = useState(home.offersChips[0])
  const items = shopProducts.slice(0, 6)
  return (
    <section className={`${WRAP} py-14`}>
      <SectionHead
        eyebrow="CATÁLOGO"
        title="As nossas ofertas"
        action={
          <Link to="/categorias" className="text-sm font-medium text-accent-deep underline-offset-2 hover:underline">
            Ver tudo →
          </Link>
        }
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {home.offersChips.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setChip(c)}
            className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
              chip === c ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink/30'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((p) => (
          <ProductCard key={p.key} p={p} addItem={addItem} />
        ))}
      </div>
    </section>
  )
}

/* ——— 10 · Studio / sobre ——— */
function Studio() {
  const s = home.studio
  return (
    <section className="bg-white">
      <div className={`${WRAP} grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16`}>
        <motion.div {...reveal}>
          <FauxPhoto scene="steel" subject="bottle" className="aspect-[4/3.4] rounded-xl shadow-xs">
            <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-ink">Vale de Cambra, Portugal</span>
          </FauxPhoto>
        </motion.div>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep">{s.eyebrow}</p>
          <h2 className="font-display max-w-md text-3xl leading-[1.1] font-semibold sm:text-4xl">{s.title}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{s.text}</p>
          <ul className="mt-6 space-y-3">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft">
                  <svg width="10" height="8" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.4 3.4L11 1.6" stroke="#518708" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {p}
              </li>
            ))}
          </ul>
          <a href={s.href} className="mt-7 inline-flex h-11 items-center gap-2.5 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-accent-deep">
            {s.cta}
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ——— 11 · Quote bar ——— */
function QuoteBar() {
  const q = home.quoteBar
  return (
    <section className="bg-ink">
      <div className={`${WRAP} flex flex-col items-center gap-4 py-14 text-center text-white lg:flex-row lg:justify-between lg:text-left`}>
        <p className="hidden max-w-[160px] text-[13px] text-white/40 lg:block">{q.left}</p>
        <motion.p {...reveal} className="font-display max-w-2xl text-xl leading-snug font-medium sm:text-2xl">
          “{q.main}”
          <span className="mt-3 block text-[13px] font-normal text-accent">{q.author}</span>
        </motion.p>
        <p className="hidden max-w-[160px] text-right text-[13px] text-white/40 lg:block">{q.right}</p>
      </div>
    </section>
  )
}

/* ——— 12 · Difference in the details ——— */
function Details() {
  const d = home.details
  return (
    <section className={`${WRAP} py-14`}>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <motion.div {...reveal}>
          <FauxPhoto scene="kitchen" className="relative h-full min-h-[360px] rounded-xl">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <p className="text-[11px] font-medium tracking-[0.14em] text-white/70">{d.eyebrow}</p>
              <h2 className="font-display mt-2 max-w-sm text-3xl leading-tight font-semibold">{d.title}</h2>
              <p className="mt-2 max-w-sm text-[13px] text-white/75">{d.text}</p>
              <a href={d.href} className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-white px-6 text-[13px] font-semibold text-ink transition-colors hover:bg-accent hover:text-white">
                {d.cta} →
              </a>
            </div>
          </FauxPhoto>
        </motion.div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {d.selects.map((sel, i) => {
            const p = byKey(sel.key)
            return (
              <motion.div key={sel.key} {...reveal} transition={{ ...reveal.transition, delay: i * 0.05 }} className={i === 2 ? 'sm:col-span-2' : ''}>
                <Link to={p.href} className="group flex h-full items-center gap-4 rounded-xl border border-line bg-white p-4">
                  <div className="flex h-24 w-20 shrink-0 items-center justify-center rounded-lg bg-page">
                    <Bottle className="h-20 w-auto" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.12em] text-accent-deep">{sel.label.toUpperCase()}</p>
                    <p className="mt-1 text-sm font-semibold">{p.name}</p>
                    <p className="text-[12px] text-muted">{p.detail}</p>
                    <p className="mt-1 text-sm font-semibold">{fmt(p.price)}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ——— 13 · Keyword marquee ——— */
function KeywordMarquee() {
  const items = [...home.keywords, ...home.keywords]
  return (
    <section className="overflow-hidden border-y border-line bg-white py-4">
      <div className="marquee-track">
        {[0, 1].map((h) => (
          <div key={h} className="flex shrink-0 items-center">
            {items.map((k, i) => (
              <Link key={`${h}-${i}`} to="/categorias" className="flex items-center gap-6 pr-6 text-lg font-semibold whitespace-nowrap text-ink/70 transition-colors hover:text-accent-deep">
                {k}
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ——— 14 · Approach (4 features) ——— */
function Approach() {
  const a = home.approach
  return (
    <section className={`${WRAP} py-14`}>
      <motion.div {...reveal} className="mb-8 flex flex-col items-center gap-4 text-center">
        <div className="flex flex-wrap justify-center gap-2">
          {a.chips.map((c) => (
            <span key={c} className="rounded-full border border-line bg-white px-3 py-1 text-[12px] font-medium">{c}</span>
          ))}
        </div>
        <h2 className="font-display max-w-lg text-2xl font-semibold sm:text-3xl">{a.title}</h2>
      </motion.div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {a.features.map((f, i) => (
          <motion.div key={f.title} {...reveal} transition={{ ...reveal.transition, delay: (i % 4) * 0.05 }} className="rounded-xl border border-line bg-white p-1">
            <FauxPhoto scene={f.scene} subject="bottle" className="mb-3 aspect-[4/3] rounded-lg" />
            <div className="p-4 pt-1">
              <p className="text-sm font-semibold">{f.title}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-muted">{f.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ——— 15 · We're on Gram ——— */
function Gram() {
  return (
    <section className="bg-ink">
      <div className={`${WRAP} py-14`}>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 text-white">
          <div>
            <p className="mb-1.5 text-[11px] font-medium tracking-[0.16em] text-accent">SEGUE-NOS</p>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Nas cozinhas de todo o país</h2>
          </div>
          <a href="#" className="text-sm font-medium text-white/70 hover:text-white">@mistolin.pro →</a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {home.gram.map((g, i) => (
            <a key={i} href="#" className="group relative block">
              <FauxPhoto scene={g.scene} subject={g.subject} zoom className="aspect-square rounded-lg">
                <div className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/30" />
                <span className="absolute bottom-2 left-2 rounded bg-ink/60 px-1.5 py-0.5 text-[9px] font-medium text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  {g.handle}
                </span>
              </FauxPhoto>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ——— 16 · Services row ——— */
function Services() {
  const ic = {
    headset: 'M3 9a5 5 0 0 1 10 0M2.5 9v2a1.5 1.5 0 0 0 1.5 1.5M13.5 9v2M8 14h1.5a1.5 1.5 0 0 0 1.5-1.5',
    chat: 'M2 3.5h12v7H8l-3 2.5V10.5H2z',
    truck: 'M1.5 3.5h8v7h-8zM9.5 6h3l2 2.5v2h-5z',
    pin: 'M8 14s5-4.5 5-8A5 5 0 0 0 3 6c0 3.5 5 8 5 8z M8 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
  }
  return (
    <section className="border-y border-line bg-white">
      <div className={`${WRAP} grid grid-cols-2 gap-6 py-8 lg:grid-cols-4`}>
        {home.services.map((s) => (
          <div key={s.title} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d={ic[s.icon]} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="text-[13px] font-semibold">{s.title}</p>
              <p className="text-[12px] text-muted">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ——— 17 · Newsletter ——— */
function Newsletter() {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)
  return (
    <section className={`${WRAP} py-14`}>
      <motion.div {...reveal} className="grid grid-cols-1 items-center gap-8 rounded-xl bg-ink p-8 text-white lg:grid-cols-2 lg:p-12">
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent">NEWSLETTER</p>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Promoções e novidades, direto ao email.</h2>
          <p className="mt-2 text-sm text-white/60">Campanhas exclusivas, novos produtos e dicas técnicas. Sem spam.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setDone(true) }} className="flex flex-col gap-2 sm:flex-row">
          <input type="email" required placeholder="O seu email profissional" aria-label="Email" className="h-12 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-sm text-white outline-none placeholder:text-white/50 focus:border-accent" />
          <motion.button type="submit" whileTap={reduce ? {} : { scale: 0.98 }} className="h-12 rounded-full bg-accent px-7 text-sm font-semibold text-white transition-colors hover:bg-accent-deep">
            {done ? 'Subscrito ✓' : 'Subscrever'}
          </motion.button>
        </form>
      </motion.div>
    </section>
  )
}

export function Home({ addItem }) {
  return (
    <main className="pt-[140px]">
      <HeroBanner />
      <NewArrivals addItem={addItem} />
      <FlashSale />
      <CollectionGrid />
      <TestimonialFeature />
      <Spaces />
      <TwoPromos />
      <ShopOffers addItem={addItem} />
      <Studio />
      <QuoteBar />
      <Details />
      <KeywordMarquee />
      <Approach />
      <Gram />
      <Services />
      <Newsletter />
    </main>
  )
}
