import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { faqGroups } from '../data/content'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1100px] px-6 lg:px-10'

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 0.5, ease: EASE },
}

function Item({ q, a, open, onToggle }) {
  const reduce = useReducedMotion()
  return (
    <div className="border-b border-line">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-start justify-between gap-4 py-5 text-left">
        <span className="text-[15px] font-medium">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25, ease: EASE }} className="mt-0.5 text-lg opacity-40" aria-hidden="true">+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0.1 : 0.35, ease: EASE }} className="overflow-hidden">
            <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  const [open, setOpen] = useState('encomendas-0')
  return (
    <main className="pt-[140px]">
      {/* hero */}
      <section className="border-b border-line bg-white">
        <div className={`${WRAP} py-12`}>
          <nav className="mb-4 flex items-center gap-1.5 text-[12px] text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-ink">Início</Link>
            <span>/</span>
            <span className="text-ink">Perguntas frequentes</span>
          </nav>
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep uppercase">Centro de ajuda</p>
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">Perguntas frequentes</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Encomendas, produtos, faturação, equipamentos e apoio. Se ficar alguma dúvida por responder, a nossa equipa está a um contacto de distância.
          </p>
        </div>
      </section>

      {/* groups */}
      <section className={`${WRAP} py-14`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
          {/* jump nav */}
          <aside className="hidden lg:block">
            <div className="sticky top-[160px]">
              <p className="mb-3 text-[11px] font-medium tracking-[0.12em] text-muted uppercase">Categorias</p>
              <ul className="space-y-1.5">
                {faqGroups.map((g) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`} className="text-[13px] text-muted transition-colors hover:text-ink">{g.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* accordions */}
          <div className="space-y-12">
            {faqGroups.map((g) => (
              <div key={g.id} id={g.id} className="scroll-mt-[160px]">
                <motion.h2 {...reveal} className="font-display mb-2 text-xl font-semibold sm:text-2xl">{g.title}</motion.h2>
                <div>
                  {g.items.map((it, i) => {
                    const key = `${g.id}-${i}`
                    return <Item key={key} q={it.q} a={it.a} open={open === key} onToggle={() => setOpen(open === key ? null : key)} />
                  })}
                </div>
              </div>
            ))}

            {/* contact */}
            <div className="rounded-2xl bg-accent-soft/70 p-8 sm:p-10">
              <h2 className="font-display text-xl font-semibold sm:text-2xl">Não encontrou a resposta?</h2>
              <p className="mt-2 max-w-md text-sm text-muted">Fale com a equipa técnica ou visite uma das 14 unidades. Ajudamos na escolha e na utilização dos produtos.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/contactos" className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-deep">Falar com a equipa</Link>
                <Link to="/lojas" className="inline-flex h-11 items-center rounded-full border border-line bg-white px-6 text-sm font-semibold transition-colors hover:border-ink">Encontrar loja</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
