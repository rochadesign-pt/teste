import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { home } from '../data/site'
import { catalog } from '../data/product'
import { HeroSlider } from '../components/HeroSlider'
import { Marquee } from '../components/Marquee'
import { GuaranteeIcon, Stars } from '../components/PayIcons'
import { FauxPhoto } from '../components/FauxPhoto'
import { Bottle } from '../components/Bottle'

const EASE = [0.32, 0.72, 0, 1]
const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.55, ease: EASE },
}

function SectionHead({ eyebrow, title, action, light = false }) {
  return (
    <motion.div {...reveal} className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className={`mb-2 text-[11px] font-medium tracking-[0.16em] ${light ? 'text-accent' : 'text-accent-deep'}`}>
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
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
          className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-white transition-colors duration-200 hover:border-ink/30"
        >
          <svg width="9" height="12" viewBox="0 0 9 12" fill="none" aria-hidden="true">
            <path d={b.d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
    </div>
  )
}

/* ——— USPs ——— */
function Usps() {
  return (
    <section className="mt-10 border-y border-line bg-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-6 py-7 lg:grid-cols-4 lg:px-12">
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

/* ——— Categorias — image tiles ——— */
function Categories() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-12">
      <SectionHead
        eyebrow="CATEGORIAS"
        title="Compre por categoria"
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
            className="group"
          >
            <FauxPhoto
              scene={c.scene}
              subject={c.subject}
              className="aspect-[4/5] rounded-lg shadow-xs"
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.55)_100%)] transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
                <div>
                  <p className="text-base font-semibold">{c.title}</p>
                  <p className="text-[11px] text-white/70">{c.count} produtos</p>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15 backdrop-blur transition-colors duration-200 group-hover:bg-accent">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </FauxPhoto>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

/* ——— Image with text — porquê Mistolin PRO ——— */
function Science() {
  const s = home.science
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
        <motion.div {...reveal}>
          <FauxPhoto scene="kitchen" subject="bottle" className="aspect-[4/4.6] rounded-xl shadow-xs">
            <span className="absolute top-4 left-4 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-medium text-ink">
              Testado em operação real
            </span>
          </FauxPhoto>
        </motion.div>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep">{s.eyebrow}</p>
          <h2 className="font-display max-w-md text-3xl leading-[1.1] font-semibold sm:text-4xl">{s.title}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{s.text}</p>

          <ul className="mt-6 space-y-3">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                  <svg width="10" height="8" viewBox="0 0 12 10" fill="none" aria-hidden="true">
                    <path d="M1 5l3.4 3.4L11 1.6" stroke="#518708" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {s.stats.map((st) => (
              <div key={st.label}>
                <p className="font-display text-2xl font-semibold">{st.value}</p>
                <p className="text-[11px] text-muted">{st.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ——— Produtos em destaque ——— */
const CARD_SCENES = ['cream', 'steel', 'green', 'kitchen', 'cream', 'steel']

function Featured({ addItem }) {
  const track = useRef(null)
  const scroll = (dir) => track.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-12">
      <SectionHead
        eyebrow="MAIS VENDIDOS"
        title="Os preferidos dos profissionais"
        action={<Arrows onPrev={() => scroll(-1)} onNext={() => scroll(1)} />}
      />
      <div
        ref={track}
        className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:-mx-12 lg:px-12"
      >
        {home.featured.map((p, i) => (
          <article
            key={p.id + p.detail}
            className="group w-[250px] shrink-0 snap-start"
          >
            <Link to={p.href} className="block">
              <FauxPhoto
                scene={CARD_SCENES[i % CARD_SCENES.length]}
                className="relative aspect-square rounded-lg shadow-xs"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[34%] drop-shadow-[0_16px_24px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
                    <Bottle className="w-full" />
                  </div>
                </div>
                {p.tag && (
                  <span
                    className={`absolute top-2.5 left-2.5 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                      p.tag === 'Bundle' ? 'bg-accent text-white' : 'bg-white/95 text-ink shadow-xs'
                    }`}
                  >
                    {p.tag}
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    catalog[p.id] && addItem(p.id)
                  }}
                  aria-label={`Adicionar ${p.name} ao carrinho`}
                  className="absolute right-2.5 bottom-2.5 flex h-9 w-9 items-center justify-center rounded-md bg-white/95 text-ink opacity-0 shadow-xs transition-all duration-200 group-hover:opacity-100 hover:bg-ink hover:text-white"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </FauxPhoto>
            </Link>
            <div className="px-1 pt-3">
              <p className="truncate text-[13px] font-medium">{p.name}</p>
              <p className="text-[11px] text-muted">{p.detail}</p>
              <p className="mt-1 text-sm font-semibold tabular-nums">
                {p.full && (
                  <span className="mr-1.5 text-[11px] font-normal text-muted/60 line-through">{fmt(p.full)}</span>
                )}
                {fmt(p.price)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ——— Antes / Depois ——— */
function BeforeAfter() {
  const b = home.beforeAfter
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-8 lg:px-12">
      <SectionHead eyebrow={b.eyebrow} title={b.title} />
      <motion.div {...reveal} className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FauxPhoto scene="kitchen" className="aspect-[16/10] rounded-lg shadow-xs">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(0,0,0,0.6)_100%)]" />
          <span className="absolute top-4 left-4 rounded-md bg-ink/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
            {b.before.label}
          </span>
          <p className="absolute bottom-4 left-4 max-w-xs text-sm text-white/90">{b.before.text}</p>
        </FauxPhoto>
        <FauxPhoto scene="steel" subject="bottle" className="aspect-[16/10] rounded-lg shadow-xs">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(0,0,0,0.45)_100%)]" />
          <span className="absolute top-4 left-4 rounded-md bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">
            {b.after.label}
          </span>
          <p className="absolute bottom-4 left-4 max-w-xs text-sm text-white/90">{b.after.text}</p>
        </FauxPhoto>
      </motion.div>
    </section>
  )
}

/* ——— Banner promocional (imagem) ——— */
function PromoBanner() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-12">
      <motion.div {...reveal}>
        <FauxPhoto scene="green" subject="set" className="rounded-xl">
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.25)_55%,transparent_80%)]" />
          <div className="relative flex min-h-[280px] flex-col justify-center p-8 text-white lg:p-14">
            <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.14em]">
              <span className="rounded-md bg-white px-1.5 py-0.5 text-[9px] font-semibold text-ink">PROMO</span>
              <span className="text-white/70">POR TEMPO LIMITADO</span>
            </p>
            <h2 className="font-display mt-3 max-w-md text-3xl leading-[1.08] font-semibold sm:text-4xl">
              Bundles com até 15% de poupança
            </h2>
            <p className="mt-3 max-w-sm text-sm text-white/75">
              Do pack do dia a dia ao fornecimento trimestral — stock garantido e envio grátis acima de 30 €.
            </p>
            <div className="mt-7">
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
  const track = useRef(null)
  const scroll = (dir) => track.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-12">
        <SectionHead
          eyebrow="TESTEMUNHOS"
          title="Quem usa, confia"
          action={<Arrows onPrev={() => scroll(-1)} onNext={() => scroll(1)} />}
        />
        <div
          ref={track}
          className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:-mx-12 lg:px-12"
        >
          {home.testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex w-[320px] shrink-0 snap-start flex-col justify-between rounded-lg border border-line bg-page p-6"
            >
              <div>
                <Stars value={t.rating} />
                <blockquote className="mt-3 text-sm leading-relaxed">“{t.quote}”</blockquote>
              </div>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent-deep">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-[13px] font-semibold">{t.name}</p>
                  <p className="text-[11px] text-muted">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ——— Galeria UGC ——— */
function Gallery() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-12">
      <SectionHead eyebrow="COMUNIDADE" title="Nas cozinhas de todo o país" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {home.gallery.map((g, i) => (
          <motion.a
            key={g.label}
            href="#"
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.05 }}
            className={`group ${i === 0 ? 'col-span-2 row-span-2 sm:col-span-1 lg:col-span-2 lg:row-span-1' : ''}`}
          >
            <FauxPhoto scene={g.scene} subject={g.subject} className="aspect-square rounded-lg shadow-xs">
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/30" />
              <span className="absolute bottom-3 left-3 rounded-md bg-ink/60 px-2 py-1 text-[10px] font-medium text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                {g.label}
              </span>
            </FauxPhoto>
          </motion.a>
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
    <section className="mx-auto max-w-[1280px] px-6 pb-16 lg:px-12">
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
      <HeroSlider />
      <Usps />
      <Categories />
      <Science />
      <Featured addItem={addItem} />
      <BeforeAfter />
      <PromoBanner />
      <Testimonials />
      <Gallery />
      <Marquee />
      <div className="h-12" />
      <Newsletter />
    </main>
  )
}
