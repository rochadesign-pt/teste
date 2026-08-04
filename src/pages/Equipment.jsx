import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { equipment, equipmentCatalog } from '../data/equipment'
import { EquipmentHero } from '../components/EquipmentHero'
import { Placeholder } from '../components/Placeholder'
import { Stars } from '../components/PayIcons'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1280px] px-6 lg:px-12'
const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 0.5, ease: EASE },
}

/* ——— ribbon of quick facts ——— */
function Ribbon() {
  const facts = ['4 saídas de doseamento', 'Até −40% de consumo', 'Instalação por técnico', 'Garantia 24 meses']
  return (
    <section className="border-y border-line bg-white">
      <div className={`${WRAP} grid grid-cols-2 gap-y-4 py-6 md:grid-cols-4`}>
        {facts.map((f) => (
          <div key={f} className="flex items-center gap-2.5 text-[13px] font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft">
              <svg width="11" height="9" viewBox="0 0 12 10" fill="none" aria-hidden="true">
                <path d="M1 5l3.4 3.4L11 1.6" stroke="#518708" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {f}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ——— installation = integrated service ——— */
function ServiceHighlight() {
  const s = equipment.service
  return (
    <section className={`${WRAP} py-16 lg:py-20`}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div {...reveal}>
          <Placeholder className="aspect-[4/3] border border-line shadow-xs" rounded="rounded-2xl">
            <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white">
              Serviço incluído
            </span>
          </Placeholder>
        </motion.div>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep">INSTALAÇÃO CHAVE-NA-MÃO</p>
          <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">{s.title}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{s.text}</p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-[13px]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                  <svg width="10" height="8" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.4 3.4L11 1.6" stroke="#518708" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

/* ——— benefits ——— */
function Benefits() {
  return (
    <section className="bg-page">
      <div className={`${WRAP} py-16 lg:py-20`}>
        <motion.h2 {...reveal} className="font-display max-w-xl text-3xl font-semibold sm:text-4xl">
          Porquê uma central de doseamento
        </motion.h2>
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {equipment.benefits.map((b, i) => (
            <motion.div key={b.title} {...reveal} transition={{ ...reveal.transition, delay: (i % 4) * 0.06 }} className="rounded-2xl border border-line bg-white p-1">
              <Placeholder className="aspect-[4/3]" rounded="rounded-xl" />
              <div className="p-4">
                <p className="text-sm font-semibold">{b.title}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted">{b.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ——— installation steps ——— */
function Steps() {
  return (
    <section className="bg-ink text-white">
      <div className={`${WRAP} py-20 lg:py-24`}>
        <motion.div {...reveal} className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Como funciona a instalação</h2>
          <p className="max-w-xs text-sm leading-relaxed text-white/50">
            Tratamos de tudo — do agendamento ao arranque — para a central ficar operacional no mesmo dia.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {equipment.steps.map((step, i) => (
            <motion.article
              key={step.n}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.1 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-accent/40"
            >
              <p className="text-[11px] font-medium tracking-[0.14em] text-white/40">{step.n}</p>
              <h3 className="mt-14 text-lg font-semibold transition-colors duration-300 group-hover:text-accent">{step.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ——— reviews ——— */
function Reviews() {
  return (
    <section id="reviews" className={`${WRAP} py-16 lg:py-20`}>
      <motion.div {...reveal} className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">O que dizem as operações</h2>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Stars value={equipment.reviewSummary.average} />
            <span className="font-medium">{equipment.reviewSummary.average.toFixed(1).replace('.', ',')}</span>
            <span className="text-muted">· {equipment.reviewSummary.total} avaliações verificadas</span>
          </div>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {equipment.reviews.map((r, i) => (
          <motion.figure key={r.name} {...reveal} transition={{ ...reveal.transition, delay: (i % 3) * 0.06 }} className="flex flex-col rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <Stars value={r.rating} />
              {r.verified && (
                <span className="flex items-center gap-1 text-[10px] font-medium text-accent-deep">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 6l3 3 7-7" stroke="#518708" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Compra verificada
                </span>
              )}
            </div>
            <figcaption className="mt-3 text-sm font-semibold">{r.title}</figcaption>
            <blockquote className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">{r.body}</blockquote>
            <div className="mt-4 border-t border-line pt-3">
              <p className="text-[13px] font-medium">{r.name}</p>
              <p className="text-[11px] text-muted">{r.role} · {r.date}</p>
            </div>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}

/* ——— compatible consumables (cross-sell) ——— */
function Consumables() {
  return (
    <section className="bg-page">
      <div className={`${WRAP} py-16 lg:py-20`}>
        <motion.div {...reveal} className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1.5 text-[11px] font-medium tracking-[0.16em] text-accent-deep">CONSUMÍVEIS COMPATÍVEIS</p>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Recargas para a central</h2>
          </div>
          <Link to="/categorias" className="text-sm font-medium text-accent-deep underline-offset-2 hover:underline">
            Ver catálogo →
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {equipment.consumables.map((c, i) => (
            <motion.div key={c.code} {...reveal} transition={{ ...reveal.transition, delay: (i % 3) * 0.06 }} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
              <Placeholder className="h-20 w-20 shrink-0 border border-line" rounded="rounded-xl" />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold leading-snug">{c.name}</p>
                <p className="text-[11px] text-muted">{c.detail}</p>
                <p className="mt-1 text-sm font-semibold tabular-nums">{fmt(c.price)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ——— faq ——— */
function Faq() {
  const [open, setOpen] = useState(0)
  const reduce = useReducedMotion()
  return (
    <section className={`${WRAP} py-16 lg:py-20`}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <motion.div {...reveal}>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Perguntas frequentes</h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Sobre a instalação, os consumíveis, a garantia e o apoio a empresas.
          </p>
          <a href="#" className="mt-5 inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-deep">
            Falar com a equipa técnica
          </a>
        </motion.div>
        <div className="divide-y divide-line border-t border-line">
          {equipment.faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="flex w-full items-start justify-between gap-4 py-5 text-left">
                  <span className="text-sm font-medium">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25, ease: EASE }} className="mt-0.5 text-lg opacity-40" aria-hidden="true">+</motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0.1 : 0.35, ease: EASE }} className="overflow-hidden">
                      <p className="pb-5 text-[13px] leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ——— sticky bar ——— */
function StickyBar({ kitId, onAdd }) {
  const [show, setShow] = useState(false)
  const reduce = useReducedMotion()
  const sel = equipmentCatalog[kitId]
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: reduce ? 0 : 80, opacity: reduce ? 0 : 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduce ? 0 : 80, opacity: reduce ? 0 : 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-md"
        >
          <div className={`${WRAP} flex items-center justify-between gap-4 py-3`}>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold">{equipment.name}</p>
              <p className="truncate text-[11px] text-muted">{sel.detail} · instalação incluída</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <p className="font-display text-lg font-semibold tabular-nums">{fmt(sel.price)}</p>
              <button
                type="button"
                onClick={() => onAdd(kitId, 1)}
                className="flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
              >
                Adicionar
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Equipment({ addItem }) {
  const [kitId, setKitId] = useState(equipment.kits[0].id)
  return (
    <main>
      <EquipmentHero kitId={kitId} setKitId={setKitId} onAdd={(id, qty) => addItem(id, qty)} />
      <Ribbon />
      <ServiceHighlight />
      <Benefits />
      <Steps />
      <Reviews />
      <Consumables />
      <Faq />
      <StickyBar kitId={kitId} onAdd={(id, qty) => addItem(id, qty)} />
    </main>
  )
}
