import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { equipmentTypes, typeOf } from '../data/equipmentCatalog'
import { services, serviceStages, priceLabel, itemsForService } from '../data/services'
import { Placeholder } from '../components/Placeholder'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1280px] px-6 lg:px-12'

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 0.5, ease: EASE },
}

const STATS = [
  { value: '14', label: 'Unidades com técnicos' },
  { value: '3–5', label: 'Dias úteis para instalar' },
  { value: '48 h', label: 'Resposta em assistência' },
  { value: '1', label: 'Contacto para tudo' },
]

const FLOW = [
  { n: '01', title: 'Escolhes o equipamento', text: 'Os serviços de que precisa já vêm com ele — incluídos ou como opção, com o preço à vista.' },
  { n: '02', title: 'Agendamos contigo', text: 'A unidade mais próxima liga-te para marcar o dia que dá jeito à tua operação.' },
  { n: '03', title: 'Instalamos e formamos', text: 'O técnico monta, calibra e mostra à tua equipa como usar com segurança.' },
  { n: '04', title: 'Acompanhamos', text: 'Manutenção, recalibração e assistência — com quem já conhece o teu equipamento.' },
]

const FAQS = [
  { q: 'Posso contratar um serviço sem comprar equipamento?', a: 'Os serviços de arranque (montagem, instalação, formação) vêm sempre com o equipamento. A visita técnica, a manutenção, a recalibração e a assistência podes pedir para um equipamento que já tens — mesmo que não tenha sido comprado connosco.' },
  { q: 'O que quer dizer “incluído”?', a: 'Que o serviço já está no preço do equipamento, sem custo à parte. Quando é opcional, vês o preço ao lado e escolhes se o queres juntar.' },
  { q: 'Quem faz os serviços?', a: 'Técnicos da nossa rede, na unidade mais próxima de ti. São os mesmos que fazem a manutenção depois — não subcontratamos a instalação.' },
  { q: 'E nas ilhas?', a: 'Temos técnicos na Madeira e nos Açores. Os prazos de agendamento podem ser um pouco mais longos; confirmamos sempre contigo antes.' },
]

function PriceTag({ s }) {
  const strong = s.pricing.mode === 'included' || s.pricing.mode === 'free'
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold tabular-nums ${strong ? 'bg-accent-soft text-accent-deep' : 'bg-page text-ink'}`}>
      {priceLabel(s.pricing)}
    </span>
  )
}

function ServiceCard({ s, type }) {
  const items = itemsForService(s.id).filter((e) => !type || e.type === type)
  const cta = s.standalone
    ? { to: '/contactos', label: s.pricing.mode === 'free' ? 'Marcar visita' : 'Pedir para o meu equipamento' }
    : { to: `/equipamentos?tipo=${type || s.appliesTo[0]}`, label: 'Ver equipamentos' }

  return (
    <motion.article layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="flex flex-col rounded-2xl border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-semibold leading-snug">{s.name}</h3>
        <PriceTag s={s} />
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.short}</p>
      <ul className="mt-4 space-y-1.5">
        {s.includes.map((i) => (
          <li key={i} className="flex items-center gap-2 text-[12px]">
            <svg width="10" height="8" viewBox="0 0 12 10" fill="none" aria-hidden="true" className="shrink-0"><path d="M1 5l3.4 3.4L11 1.6" stroke="#64a70b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {i}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] text-muted">Duração · {s.duration}</p>

      {/* o serviço vive agarrado ao equipamento */}
      <div className="mt-4 border-t border-line pt-4">
        <p className="text-[10px] font-medium tracking-[0.12em] text-muted uppercase">Vem com</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {items.slice(0, 3).map((e) => {
            const ref = e.services.find((r) => r.id === s.id)
            const chip = (
              <>
                {e.short}
                {ref.mode === 'included' && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-label="incluído" />}
              </>
            )
            return e.href ? (
              <Link key={e.slug} to={e.href} className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] font-medium transition-colors hover:border-ink/30">{chip}</Link>
            ) : (
              <span key={e.slug} className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] font-medium">{chip}</span>
            )
          })}
          {items.length > 3 && <span className="px-1 py-1 text-[11px] text-muted">+{items.length - 3}</span>}
          {!items.length && s.appliesTo.map((t) => <span key={t} className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium">{typeOf(t)?.short}</span>)}
        </div>
      </div>

      <Link to={cta.to} className="mt-5 text-[12px] font-semibold text-accent-deep hover:underline">{cta.label} →</Link>
    </motion.article>
  )
}

export function Services() {
  const reduce = useReducedMotion()
  const [params, setParams] = useSearchParams()
  const typeParam = params.get('tipo')
  const type = equipmentTypes.some((t) => t.id === typeParam) ? typeParam : null
  const [openFaq, setOpenFaq] = useState(0)

  const setType = (id) => setParams(id ? { tipo: id } : {}, { replace: true })
  const visible = services.filter((s) => !type || s.appliesTo.includes(type))

  return (
    <main className="pt-[140px]">
      {/* hero */}
      <section className={`${WRAP} pt-8 pb-14`}>
        <nav className="mb-6 flex items-center gap-1.5 text-[12px] text-muted" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink">Início</Link>
          <span>/</span>
          <Link to="/equipamentos" className="hover:text-ink">Equipamentos</Link>
          <span>/</span>
          <span className="text-ink">Serviços</span>
        </nav>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="text-[11px] font-medium tracking-[0.18em] text-accent-deep uppercase">
              Serviços
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.08 }} className="font-display mt-4 max-w-[18ch] text-[2.6rem] leading-[1.02] font-semibold sm:text-6xl">
              O equipamento é metade. A outra metade somos nós.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE, delay: 0.16 }} className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              Não vendemos serviços soltos. Cada um vem agarrado ao equipamento que escolhes — montagem, calibração, formação e manutenção, feitas por técnicos da rede, perto de ti.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}>
            <Placeholder className="aspect-[4/3] border border-line shadow-xs" rounded="rounded-2xl">
              <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-medium text-ink backdrop-blur">
                Instalação MixPro DS-4 · cozinha profissional
              </span>
            </Placeholder>
          </motion.div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-semibold">{s.value}</p>
              <p className="mt-1 text-[12px] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* selector + services by stage */}
      <section className="border-t border-line bg-page">
        <div className={`${WRAP} py-16 lg:py-20`}>
          <motion.div {...reveal} className="mb-8">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Para que equipamento?</h2>
            <p className="mt-2 max-w-lg text-sm text-muted">Escolhe o tipo de equipamento e vês só os serviços que fazem sentido para ele.</p>
          </motion.div>
          <div className="mb-10 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {[{ id: null, label: 'Todos' }, ...equipmentTypes].map((t) => (
              <button
                key={t.id || 'all'}
                type="button"
                onClick={() => setType(t.id)}
                aria-pressed={type === t.id}
                className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors ${type === t.id ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink/30'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="space-y-12">
            {serviceStages.map((stage) => {
              const list = visible.filter((s) => s.stage === stage.id)
              if (!list.length) return null
              return (
                <div key={stage.id} className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr] lg:gap-10">
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.16em] text-accent-deep uppercase">{stage.label}</p>
                    <p className="mt-2 text-sm text-muted">{stage.text}</p>
                  </div>
                  <motion.div layout={!reduce} className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                      {list.map((s) => <ServiceCard key={s.id} s={s} type={type} />)}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* flow */}
      <section className="bg-ink text-white">
        <div className={`${WRAP} py-20`}>
          <motion.div {...reveal} className="mb-12">
            <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent uppercase">Como funciona</p>
            <h2 className="font-display max-w-xl text-3xl leading-tight font-semibold sm:text-4xl">Da encomenda ao primeiro turno, sem fios soltos</h2>
          </motion.div>
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FLOW.map((s, i) => (
              <motion.li key={s.n} {...reveal} transition={{ ...reveal.transition, delay: i * 0.06 }} className="border-t border-white/15 pt-5">
                <p className="font-display text-sm font-semibold text-accent tabular-nums">{s.n}</p>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* faq + cta */}
      <section className={`${WRAP} py-20`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div {...reveal}>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Perguntas frequentes</h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">Já tens equipamento e precisas de apoio? Fala connosco.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/equipamentos" className="inline-flex h-11 items-center gap-2.5 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-deep">
                Ver equipamentos
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              </Link>
              <Link to="/contactos" className="inline-flex h-11 items-center rounded-full border border-line bg-white px-6 text-sm font-semibold transition-colors hover:border-ink">
                Fala connosco
              </Link>
            </div>
          </motion.div>
          <div className="divide-y divide-line border-t border-line">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={f.q}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : i)} aria-expanded={isOpen} className="flex w-full items-start justify-between gap-4 py-5 text-left">
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
    </main>
  )
}
