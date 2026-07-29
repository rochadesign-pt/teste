import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { nav } from '../data/site'
import { Bottle } from './Bottle'

const EASE = [0.32, 0.72, 0, 1]

function Chevron({ open }) {
  return (
    <motion.svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      aria-hidden="true"
    >
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

function MegaProdutos({ onNavigate }) {
  return (
    <div className="mx-auto grid max-w-[1600px] grid-cols-[repeat(4,1fr)_300px] gap-10 px-6 py-10 lg:px-10">
      {nav.produtos.columns.map((col) => (
        <div key={col.title}>
          <Link
            to={`/categoria/${col.slug}`}
            onClick={onNavigate}
            className="text-[13px] font-semibold hover:text-accent-deep"
          >
            {col.title}
          </Link>
          <ul className="mt-3 space-y-2">
            {col.links.map((l) => (
              <li key={l}>
                <Link
                  to={`/categoria/${col.slug}`}
                  onClick={onNavigate}
                  className="text-[13px] text-muted transition-colors duration-150 hover:text-ink"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to={`/categoria/${col.slug}`}
            onClick={onNavigate}
            className="mt-3 inline-block text-[12px] font-medium text-accent-deep underline-offset-2 hover:underline"
          >
            Ver tudo →
          </Link>
        </div>
      ))}

      {/* featured card */}
      <div className="flex flex-col rounded-lg border border-line bg-page p-4">
        <p className="text-[10px] font-medium tracking-[0.14em] text-accent-deep">
          {nav.produtos.featured.eyebrow}
        </p>
        <div className="my-3 flex h-24 items-center justify-center overflow-hidden rounded-md bg-white">
          <Bottle className="h-20 w-auto" />
        </div>
        <p className="text-sm font-semibold">{nav.produtos.featured.title}</p>
        <p className="mt-0.5 text-[12px] leading-snug text-muted">{nav.produtos.featured.text}</p>
        <Link
          to={nav.produtos.featured.href}
          onClick={onNavigate}
          className="mt-3 inline-flex h-9 items-center justify-center rounded-md bg-ink px-4 text-[12px] font-semibold text-white transition-colors duration-200 hover:bg-accent-deep"
        >
          {nav.produtos.featured.cta}
        </Link>
      </div>

      {/* highlights strip */}
      <div className="col-span-full flex flex-wrap items-center gap-2 border-t border-line pt-5">
        <span className="text-[11px] font-medium tracking-[0.12em] text-muted">DESTAQUES</span>
        {nav.produtos.highlights.map((h) => (
          <a
            key={h}
            href="#"
            className="rounded-md border border-line bg-white px-3 py-1.5 text-[12px] font-medium transition-colors duration-150 hover:border-ink/30"
          >
            {h}
          </a>
        ))}
      </div>
    </div>
  )
}

function MegaSolucoes() {
  return (
    <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-2.5 px-6 py-10 sm:grid-cols-3 lg:px-10">
      {nav.solucoes.sectors.map((s) => (
        <a
          key={s.title}
          href="#"
          className="group rounded-lg border border-line bg-white p-5 transition-colors duration-150 hover:border-accent hover:bg-page/50"
        >
          <p className="text-sm font-semibold group-hover:text-accent-deep">{s.title}</p>
          <p className="mt-0.5 text-[12px] text-muted">{s.text}</p>
        </a>
      ))}
    </div>
  )
}

export function Nav({ cartCount = 0, onCartOpen }) {
  const reduce = useReducedMotion()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(null) // 'produtos' | 'solucoes' | 'mobile' | null
  const closeTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close menus on route change / escape
  useEffect(() => setOpen(null), [location.pathname])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const enter = (id) => {
    clearTimeout(closeTimer.current)
    setOpen(id)
  }
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(null), 150)
  }
  const cancelClose = () => clearTimeout(closeTimer.current)

  const mega = open === 'produtos' || open === 'solucoes'

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* announcement bar */}
        <div className="bg-ink text-center text-[11px] font-medium text-white">
          <p className="px-4 py-1.5">
            Envio grátis em encomendas acima de 30 € · Expedição em 24–48h
          </p>
        </div>

        <div
          className={`transition-colors duration-300 ${
            scrolled || mega || open === 'mobile'
              ? 'bg-white shadow-[0_1px_0_rgba(9,11,12,0.08)]'
              : 'bg-white/85 backdrop-blur-md'
          }`}
        >
          <nav className="flex h-16 w-full items-center justify-between px-6 lg:px-10">
            <Link to="/" className="flex items-baseline gap-2 text-ink">
              <span className="font-display text-xl font-bold tracking-tight">MISTOLIN</span>
              <span className="rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
                PRO
              </span>
            </Link>

            {/* desktop menu */}
            <ul className="hidden items-center gap-1 text-sm font-medium md:flex">
              <li onMouseEnter={() => enter('produtos')} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  aria-expanded={open === 'produtos'}
                  onClick={() => setOpen(open === 'produtos' ? null : 'produtos')}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-2 transition-colors duration-150 ${
                    open === 'produtos' ? 'bg-page' : 'hover:bg-page'
                  }`}
                >
                  Produtos
                  <Chevron open={open === 'produtos'} />
                </button>
              </li>
              <li onMouseEnter={() => enter('solucoes')} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  aria-expanded={open === 'solucoes'}
                  onClick={() => setOpen(open === 'solucoes' ? null : 'solucoes')}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-2 transition-colors duration-150 ${
                    open === 'solucoes' ? 'bg-page' : 'hover:bg-page'
                  }`}
                >
                  Soluções
                  <Chevron open={open === 'solucoes'} />
                </button>
              </li>
              {nav.simple.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="rounded-md px-3 py-2 transition-colors duration-150 hover:bg-page"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Pesquisar"
                className="hidden h-9 w-9 items-center justify-center rounded-md border border-line bg-white text-ink transition-colors duration-200 hover:border-ink/30 md:flex"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M11.5 11.5 15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={onCartOpen}
                className="flex h-9 items-center gap-2 rounded-md bg-ink px-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-deep"
              >
                Carrinho
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-accent text-[11px] font-bold">
                  {cartCount}
                </span>
              </button>
              {/* mobile burger */}
              <button
                type="button"
                aria-label="Abrir menu"
                aria-expanded={open === 'mobile'}
                onClick={() => setOpen(open === 'mobile' ? null : 'mobile')}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-line md:hidden"
              >
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                  <path d="M1 1h14M1 6h14M1 11h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </nav>

          {/* mega panels */}
          <AnimatePresence>
            {mega && (
              <motion.div
                key={open}
                initial={{ opacity: 0, y: reduce ? 0 : -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                transition={{ duration: 0.22, ease: EASE }}
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                className="hidden border-t border-line bg-white shadow-[0_24px_48px_-24px_rgba(9,11,12,0.18)] md:block"
              >
                {open === 'produtos' ? <MegaProdutos onNavigate={() => setOpen(null)} /> : <MegaSolucoes />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* dim page under open mega menu */}
      <AnimatePresence>
        {mega && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-[1px]"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* mobile drawer */}
      <AnimatePresence>
        {open === 'mobile' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(null)}
              className="fixed inset-0 z-40 bg-ink/30"
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: reduce ? 0 : '-100%', opacity: reduce ? 0 : 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: reduce ? 0 : '-100%', opacity: reduce ? 0 : 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="fixed top-0 left-0 z-50 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-white p-6 pt-20"
            >
              <Link
                to="/categorias"
                onClick={() => setOpen(null)}
                className="mb-2 flex items-center justify-between border-b border-line py-4 text-sm font-semibold"
              >
                Todas as categorias
                <span aria-hidden="true">→</span>
              </Link>
              {nav.produtos.columns.map((col) => (
                <div key={col.title} className="border-b border-line py-4">
                  <Link
                    to={`/categoria/${col.slug}`}
                    onClick={() => setOpen(null)}
                    className="text-sm font-semibold"
                  >
                    {col.title}
                  </Link>
                  <ul className="mt-2 space-y-2">
                    {col.links.map((l) => (
                      <li key={l}>
                        <Link
                          to={`/categoria/${col.slug}`}
                          onClick={() => setOpen(null)}
                          className="text-[13px] text-muted"
                        >
                          {l}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="border-b border-line py-4">
                <p className="text-sm font-semibold">Soluções</p>
                <ul className="mt-2 space-y-2">
                  {nav.solucoes.sectors.map((s) => (
                    <li key={s.title}>
                      <a href="#" className="text-[13px] text-muted">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-4">
                {nav.simple.map((item) => (
                  <a key={item.label} href={item.href} className="block py-1.5 text-sm font-medium">
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
