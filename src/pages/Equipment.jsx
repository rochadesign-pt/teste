import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { getEquipment, equipmentList, initSelection, computeTotal, mainIdOf, configSummary } from '../data/equipment'
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

function Ribbon({ eq }) {
  return (
    <section className="border-y border-line bg-white">
      <div className={`${WRAP} grid grid-cols-2 gap-y-4 py-6 md:grid-cols-4`}>
        {eq.specHighlights.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5 text-[13px] font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft">
              <svg width="11" height="9" viewBox="0 0 12 10" fill="none" aria-hidden="true"><path d="M1 5l3.4 3.4L11 1.6" stroke="#518708" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span>
              {s.value} {s.unit} <span className="text-muted">· {s.label}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ServiceHighlight({ eq }) {
  const s = eq.service
  return (
    <section className={`${WRAP} py-16 lg:py-20`}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div {...reveal}>
          <Placeholder className="aspect-[4/3] border border-line shadow-xs" rounded="rounded-2xl">
            <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white">Serviço incluído</span>
          </Placeholder>
        </motion.div>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep">{s.eyebrow}</p>
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

function Benefits({ eq }) {
  return (
    <section className="bg-page">
      <div className={`${WRAP} py-16 lg:py-20`}>
        <motion.h2 {...reveal} className="font-display max-w-xl text-3xl font-semibold sm:text-4xl">{eq.benefitsTitle}</motion.h2>
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {eq.benefits.map((b, i) => (
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

function Steps({ eq }) {
  return (
    <section className="bg-ink text-white">
      <div className={`${WRAP} py-20 lg:py-24`}>
        <motion.div {...reveal} className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">{eq.stepsTitle}</h2>
          <p className="max-w-xs text-sm leading-relaxed text-white/50">{eq.stepsHint}</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {eq.steps.map((step, i) => (
            <motion.article key={step.n} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-accent/40">
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

function Reviews({ eq }) {
  return (
    <section id="reviews" className={`${WRAP} py-16 lg:py-20`}>
      <motion.div {...reveal} className="mb-8">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">O que dizem os utilizadores</h2>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Stars value={eq.reviewSummary.average} />
          <span className="font-medium">{eq.reviewSummary.average.toFixed(1).replace('.', ',')}</span>
          <span className="text-muted">· {eq.reviewSummary.total} avaliações verificadas</span>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {eq.reviews.map((r, i) => (
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

function Accessories({ eq }) {
  return (
    <section className="bg-page">
      <div className={`${WRAP} py-16 lg:py-20`}>
        <motion.div {...reveal} className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1.5 text-[11px] font-medium tracking-[0.16em] text-accent-deep">{eq.accessoriesEyebrow}</p>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">{eq.accessoriesTitle}</h2>
          </div>
          <Link to="/categorias" className="text-sm font-medium text-accent-deep underline-offset-2 hover:underline">Ver catálogo →</Link>
        </motion.div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {eq.accessories.map((c, i) => (
            <motion.div key={c.name} {...reveal} transition={{ ...reveal.transition, delay: (i % 3) * 0.06 }} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
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

function Faq({ eq }) {
  const [open, setOpen] = useState(0)
  const reduce = useReducedMotion()
  return (
    <section className={`${WRAP} py-16 lg:py-20`}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <motion.div {...reveal}>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Perguntas frequentes</h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">Tudo o que precisa de saber antes de decidir.</p>
          <a href="#" className="mt-5 inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-deep">Falar com a equipa</a>
        </motion.div>
        <div className="divide-y divide-line border-t border-line">
          {eq.faqs.map((f, i) => {
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

function OtherEquipment({ current }) {
  const others = equipmentList.filter((e) => e.slug !== current)
  if (!others.length) return null
  return (
    <section className={`${WRAP} pb-20`}>
      <p className="mb-4 text-[11px] font-medium tracking-[0.16em] text-accent-deep">OUTROS EQUIPAMENTOS</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {others.map((e) => (
          <Link key={e.slug} to={`/equipamento/${e.slug}`} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-ink/25">
            <Placeholder className="h-20 w-20 shrink-0 border border-line" rounded="rounded-xl" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium tracking-[0.12em] text-muted">{e.line}</p>
              <p className="mt-0.5 text-sm font-semibold group-hover:text-accent-deep">{e.name}</p>
              <p className="mt-1 text-sm font-semibold tabular-nums">desde {fmt(e.basePrice)}</p>
            </div>
            <span className="text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function StickyBar({ eq, total, onAdd }) {
  const [show, setShow] = useState(false)
  const reduce = useReducedMotion()
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
              <p className="truncate text-[13px] font-semibold">{eq.name}</p>
              <p className="truncate text-[11px] text-muted">{eq.statusLabel}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <p className="font-display text-lg font-semibold tabular-nums">{fmt(total)}</p>
              <button type="button" onClick={onAdd} className="flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep">
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
  const { slug } = useParams()
  const eq = getEquipment(slug)
  const [selection, setSelection] = useState(() => (eq ? initSelection(eq) : {}))

  // reset selection when the product changes
  useEffect(() => {
    if (eq) setSelection(initSelection(eq))
  }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps

  const total = useMemo(() => (eq ? computeTotal(eq, selection) : 0), [eq, selection])

  const setSingle = (groupId, choiceId) => setSelection((s) => ({ ...s, [groupId]: choiceId }))
  const toggleAddon = (groupId, choiceId) =>
    setSelection((s) => {
      const cur = s[groupId] || []
      return { ...s, [groupId]: cur.includes(choiceId) ? cur.filter((x) => x !== choiceId) : [...cur, choiceId] }
    })

  const handleAdd = () => {
    if (!eq) return
    addItem(mainIdOf(eq, selection), 1, true, { price: total, name: eq.name, detail: configSummary(eq, selection), kind: 'equip-config' })
  }

  if (!eq) {
    return (
      <main className="pt-[160px] pb-24 text-center">
        <p className="text-sm text-muted">Equipamento não encontrado.</p>
        <Link to="/equipamento/mixpro-ds4" className="mt-4 inline-block text-sm font-medium text-accent-deep hover:underline">
          Ver equipamentos →
        </Link>
      </main>
    )
  }

  return (
    <main>
      <EquipmentHero product={eq} selection={selection} setSingle={setSingle} toggleAddon={toggleAddon} total={total} onAdd={handleAdd} />
      <Ribbon eq={eq} />
      <ServiceHighlight eq={eq} />
      <Benefits eq={eq} />
      <Steps eq={eq} />
      <Reviews eq={eq} />
      <Accessories eq={eq} />
      <Faq eq={eq} />
      <OtherEquipment current={eq.slug} />
      <StickyBar eq={eq} total={total} onAdd={handleAdd} />
    </main>
  )
}
