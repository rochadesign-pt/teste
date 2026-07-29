import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { home } from '../data/site'
import { catalog } from '../data/product'
import { HeroSlider } from '../components/HeroSlider'
import { Marquee } from '../components/Marquee'
import { GuaranteeIcon } from '../components/PayIcons'
import { Bottle } from '../components/Bottle'

const EASE = [0.32, 0.72, 0, 1]
const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.55, ease: EASE },
}

function SectionHead({ eyebrow, title, action }) {
  return (
    <motion.div {...reveal} className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep">{eyebrow}</p>
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
      </div>
      {action}
    </motion.div>
  )
}

/* ——— Categorias ——— */
function Categories() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-12">
      <SectionHead
        eyebrow="CATEGORIAS"
        title="Tudo o que a sua operação precisa"
        action={
          <a href="#" className="text-sm font-medium text-accent-deep underline-offset-2 hover:underline">
            Ver todos os produtos →
          </a>
        }
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {home.categories.map((c, i) => (
          <motion.a
            key={c.title}
            href="#"
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.06 }}
            className="group flex min-h-[150px] flex-col justify-between rounded-lg border border-line bg-white p-5 shadow-xs transition-colors duration-200 hover:border-accent"
          >
            <div className="flex items-start justify-between">
              <p className="text-[11px] text-muted">{c.count} produtos</p>
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-page transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div>
              <p className="text-base font-semibold group-hover:text-accent-deep">{c.title}</p>
              <p className="mt-0.5 text-[12px] text-muted">{c.text}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

/* ——— Produtos em destaque (carrossel) ——— */
function Featured({ addItem }) {
  const track = useRef(null)
  const scroll = (dir) => track.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-12">
        <SectionHead
          eyebrow="MAIS VENDIDOS"
          title="Os preferidos dos profissionais"
          action={
            <div className="flex gap-1.5">
              {[
                { dir: -1, label: 'Anterior', d: 'M7 1L2 6l5 5' },
                { dir: 1, label: 'Seguinte', d: 'M2 1l5 5-5 5' },
              ].map((b) => (
                <button
                  key={b.dir}
                  type="button"
                  aria-label={b.label}
                  onClick={() => scroll(b.dir)}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-white transition-colors duration-200 hover:border-ink/30"
                >
                  <svg width="9" height="12" viewBox="0 0 9 12" fill="none" aria-hidden="true">
                    <path d={b.d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          }
        />

        <div
          ref={track}
          className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:-mx-12 lg:px-12"
        >
          {home.featured.map((p) => (
            <article
              key={p.id + p.detail}
              className="group w-[240px] shrink-0 snap-start rounded-lg border border-line bg-white shadow-xs transition-colors duration-200 hover:border-ink/25"
            >
              <Link to={p.href} className="block">
                <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-t-lg border-b border-line bg-page">
                  <div className="w-[36%] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
                    <Bottle className="w-full" />
                  </div>
                  {p.tag && (
                    <span
                      className={`absolute top-2 left-2 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                        p.tag === 'Bundle' ? 'bg-accent text-white' : 'bg-white text-ink shadow-xs'
                      }`}
                    >
                      {p.tag}
                    </span>
                  )}
                </div>
              </Link>
              <div className="p-3.5">
                <p className="truncate text-[13px] font-medium">{p.name}</p>
                <p className="text-[11px] text-muted">{p.detail}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm font-semibold tabular-nums">
                    {p.full && (
                      <span className="mr-1.5 text-[11px] font-normal text-muted/60 line-through">
                        {fmt(p.full)}
                      </span>
                    )}
                    {fmt(p.price)}
                  </p>
                  <button
                    type="button"
                    onClick={() => catalog[p.id] && addItem(p.id)}
                    aria-label={`Adicionar ${p.name} ao carrinho`}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-white transition-colors duration-200 hover:bg-accent-deep"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ——— Banner promocional ——— */
function PromoBanner() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-8 lg:px-12">
      <motion.div
        {...reveal}
        className="relative overflow-hidden rounded-xl bg-ink p-8 text-white lg:p-12"
      >
        <span className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden="true" />
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-lg">
            <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.14em]">
              <span className="rounded-md bg-accent px-1.5 py-0.5 text-[9px] font-semibold">PROMO</span>
              <span className="text-white/60">POR TEMPO LIMITADO</span>
            </p>
            <h2 className="font-display mt-3 text-2xl leading-tight font-semibold sm:text-3xl">
              Bundles com até <span className="text-accent">15% de poupança</span>
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Do pack do dia a dia ao fornecimento trimestral — stock garantido e
              envio grátis acima de 30 €.
            </p>
          </div>
          <Link
            to="/produto/htg-30"
            className="inline-flex h-11 items-center gap-2.5 rounded-lg bg-white px-6 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-soft"
          >
            Ver oportunidades
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

/* ——— Soluções por setor ——— */
function Sectors() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-12">
      <SectionHead eyebrow="SOLUÇÕES" title="Preparado para o seu setor" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {home.sectors.map((s, i) => (
          <motion.a
            key={s.title}
            href="#"
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.06 }}
            className="group rounded-lg border border-line bg-white p-5 shadow-xs transition-colors duration-200 hover:border-accent"
          >
            <p className="text-sm font-semibold group-hover:text-accent-deep">{s.title}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-muted">{s.text}</p>
            <p className="mt-4 text-[12px] font-medium text-accent-deep">
              Ver soluções{' '}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

/* ——— USPs ——— */
function Usps() {
  return (
    <section className="mt-12 border-y border-line bg-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-6 py-8 lg:grid-cols-4 lg:px-12">
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

/* ——— Newsletter ——— */
function Newsletter() {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-12">
      <motion.div
        {...reveal}
        className="rounded-xl border border-line bg-white p-8 shadow-xs lg:p-12"
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep">NEWSLETTER</p>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Promoções e novidades, direto ao email.
            </h2>
            <p className="mt-2 text-sm text-muted">
              Campanhas exclusivas, novos produtos e dicas técnicas para a sua operação.
              Sem spam.
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
      </motion.div>
    </section>
  )
}

export function Home({ addItem }) {
  return (
    <main>
      <HeroSlider />
      <Usps />
      <Categories />
      <Featured addItem={addItem} />
      <PromoBanner />
      <Sectors />
      <Marquee />
      <Newsletter />
    </main>
  )
}
