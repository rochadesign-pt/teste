import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { nav } from '../data/site'
import { shopCategories, countByCat } from '../data/catalog'
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

function SearchIcon({ className = '' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11.5 11.5 15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Recursos / páginas institucionais (dropdown estilo "Pages")
const recursos = [
  { label: 'Sustentabilidade', href: '#' },
  { label: 'Fichas técnicas & FDS', href: '#' },
  { label: 'Centro de ajuda', href: '#' },
  { label: 'Sobre a Mistolin', href: '#' },
  { label: 'Contactos', href: '#' },
]

// Linha de navegação com dropdowns (réplica do padrão Hyper).
const navRow = [
  { id: 'produtos', label: 'Produtos', kind: 'mega' },
  { id: 'solucoes', label: 'Soluções', kind: 'mega' },
  { id: 'cat-cozinha', label: 'Cozinha', kind: 'cat', slug: 'cozinha' },
  { id: 'cat-desinfecao', label: 'Desinfeção', kind: 'cat', slug: 'desinfecao' },
  { id: 'cat-superficies', label: 'Superfícies', kind: 'cat', slug: 'superficies' },
  { id: 'recursos', label: 'Recursos', kind: 'recursos' },
  { id: 'promocoes', label: 'Promoções', kind: 'link', href: '/categorias', accent: true },
]

const catBySlug = (slug) => shopCategories.find((c) => c.slug === slug)

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
          <Link
            key={h}
            to="/categorias"
            onClick={onNavigate}
            className="rounded-md border border-line bg-white px-3 py-1.5 text-[12px] font-medium transition-colors duration-150 hover:border-ink/30"
          >
            {h}
          </Link>
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

// Dropdown pequeno de subcategorias (estilo "Tables & Desks ▾")
function CatDropdown({ slug, onNavigate }) {
  const cat = catBySlug(slug)
  if (!cat) return null
  return (
    <div className="w-64 p-2">
      <Link
        to={`/categoria/${slug}`}
        onClick={onNavigate}
        className="flex items-center justify-between rounded-md px-3 py-2 text-[13px] font-semibold hover:bg-page"
      >
        Ver toda a categoria
        <span className="text-[11px] font-normal text-muted">{countByCat(slug)} produtos</span>
      </Link>
      <div className="my-1 h-px bg-line" />
      <ul>
        {cat.subcats.map((s) => (
          <li key={s}>
            <Link
              to={`/categoria/${slug}`}
              onClick={onNavigate}
              className="block rounded-md px-3 py-1.5 text-[13px] text-muted transition-colors hover:bg-page hover:text-ink"
            >
              {s}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Dropdown de recursos (estilo "Pages ▾")
function RecursosDropdown() {
  return (
    <div className="w-56 p-2">
      <ul>
        {recursos.map((r) => (
          <li key={r.label}>
            <a
              href={r.href}
              className="block rounded-md px-3 py-1.5 text-[13px] text-muted transition-colors hover:bg-page hover:text-ink"
            >
              {r.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Barra de pesquisa central com dropdown "Todas as categorias".
function SearchField({ open, setOpen, enter, scheduleClose, cancelClose, compact = false }) {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const submit = (e) => {
    e.preventDefault()
    navigate('/categorias')
    setOpen(null)
  }
  return (
    <div className="relative w-full">
      <form
        onSubmit={submit}
        className="flex h-11 items-stretch overflow-visible rounded-lg border border-line bg-white shadow-xs focus-within:border-accent"
      >
        {!compact && (
          <div className="relative shrink-0" onMouseEnter={() => enter('allcats')} onMouseLeave={scheduleClose}>
            <button
              type="button"
              aria-expanded={open === 'allcats'}
              onClick={() => setOpen(open === 'allcats' ? null : 'allcats')}
              className={`flex h-full items-center gap-2 rounded-l-lg border-r border-line px-4 text-[13px] font-medium whitespace-nowrap transition-colors ${
                open === 'allcats' ? 'bg-page' : 'bg-page/60 hover:bg-page'
              }`}
            >
              Todas as categorias
              <Chevron open={open === 'allcats'} />
            </button>
          </div>
        )}
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="O que procura hoje?"
          aria-label="Procurar produtos"
          className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted/70"
        />
        <button
          type="submit"
          aria-label="Pesquisar"
          className="flex shrink-0 items-center justify-center rounded-r-lg bg-accent px-5 text-white transition-colors hover:bg-accent-deep"
        >
          <SearchIcon />
        </button>
      </form>

      {/* dropdown de todas as categorias */}
      <AnimatePresence>
        {open === 'allcats' && !compact && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: EASE }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="absolute top-[calc(100%+8px)] left-0 z-50 w-72 rounded-lg border border-line bg-white p-2 shadow-[0_24px_48px_-24px_rgba(9,11,12,0.25)]"
          >
            {shopCategories.map((c) => (
              <Link
                key={c.slug}
                to={`/categoria/${c.slug}`}
                onClick={() => setOpen(null)}
                className="flex items-center justify-between rounded-md px-3 py-2 text-[13px] font-medium transition-colors hover:bg-page"
              >
                {c.title}
                <span className="text-[11px] font-normal text-muted">{countByCat(c.slug)}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Nav({ cartCount = 0, onCartOpen }) {
  const reduce = useReducedMotion()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(null) // navRow id | 'allcats' | 'mobile' | null
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
  const anyOverlay = mega || open === 'allcats'

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* utility bar */}
        <div className="bg-ink text-white">
          <div className="mx-auto flex h-7 max-w-[1600px] items-center justify-between px-6 text-[11px] font-medium lg:px-10">
            <div className="hidden items-center gap-4 sm:flex">
              <a href="#" className="opacity-70 hover:opacity-100">Centro de ajuda</a>
              <a href="#" className="opacity-70 hover:opacity-100">Seguir encomenda</a>
              <a href="#" className="opacity-70 hover:opacity-100">Fichas técnicas</a>
            </div>
            <p className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Envio grátis acima de 30 € · Expedição em 24–48h
            </p>
            <div className="hidden items-center gap-4 sm:flex">
              <span className="opacity-70">Portugal (EUR €)</span>
              <span className="opacity-40">·</span>
              <a href="#" className="opacity-70 hover:opacity-100">Apoio pro</a>
            </div>
          </div>
        </div>

        <div
          className={`bg-white transition-shadow duration-300 ${
            scrolled || anyOverlay || open === 'mobile' ? 'shadow-[0_1px_0_rgba(9,11,12,0.08)]' : ''
          }`}
        >
          {/* main row: logo · pesquisa central · ações */}
          <div className="flex h-16 w-full items-center gap-4 px-6 lg:gap-8 lg:px-10">
            <Link to="/" className="flex shrink-0 items-baseline gap-2 text-ink">
              <span className="font-display text-xl font-bold tracking-tight">MISTOLIN</span>
              <span className="rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
                PRO
              </span>
            </Link>

            {/* pesquisa — elemento principal */}
            <div className="hidden flex-1 justify-center md:flex">
              <div className="w-full max-w-[680px]">
                <SearchField
                  open={open}
                  setOpen={setOpen}
                  enter={enter}
                  scheduleClose={scheduleClose}
                  cancelClose={cancelClose}
                />
              </div>
            </div>

            {/* ações */}
            <div className="flex shrink-0 items-center gap-2 lg:gap-4">
              <a
                href="#"
                className="hidden items-center gap-2 text-[13px] font-medium text-ink hover:text-accent-deep xl:flex"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2.5 6.5 4 2.5h8l1.5 4M2.5 6.5v6.5h11V6.5M2.5 6.5h11M6 13V9.5h4V13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Encontrar loja
                <span className="rounded bg-accent-soft px-1.5 py-0.5 text-[10px] font-semibold text-accent-deep">14</span>
              </a>
              <span className="hidden h-5 w-px bg-line xl:block" />
              <a
                href="#"
                className="hidden items-center gap-2 text-[13px] font-medium text-ink hover:text-accent-deep lg:flex"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M3 13c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Conta
              </a>
              <span className="hidden h-5 w-px bg-line lg:block" />
              <button
                type="button"
                onClick={onCartOpen}
                className="flex h-9 items-center gap-2 rounded-md bg-ink px-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-deep"
              >
                <span className="hidden sm:inline">Carrinho</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="sm:hidden">
                  <path d="M1.5 1.5h1.7l1.3 8h7l1.3-6H4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="6" cy="13.5" r="1" fill="currentColor" />
                  <circle cx="11" cy="13.5" r="1" fill="currentColor" />
                </svg>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-accent px-1 text-[11px] font-bold">
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
          </div>

          {/* pesquisa mobile (full-width) */}
          <div className="border-t border-line px-6 py-1.5 md:hidden">
            <SearchField open={open} setOpen={setOpen} enter={enter} scheduleClose={scheduleClose} cancelClose={cancelClose} compact />
          </div>

          {/* nav row com dropdowns (desktop) */}
          <div className="hidden border-t border-line md:block">
            <nav className="mx-auto flex h-12 max-w-[1600px] items-center gap-0.5 px-6 lg:px-10">
              {navRow.map((item) => {
                if (item.kind === 'link') {
                  return (
                    <Link
                      key={item.id}
                      to={item.href}
                      className={`rounded-md px-3 py-2 text-[13px] font-semibold transition-colors hover:bg-page ${
                        item.accent ? 'text-accent-deep' : 'text-ink'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                }
                const isOpen = open === item.id
                const small = item.kind === 'cat' || item.kind === 'recursos'
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => enter(item.id)}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : item.id)}
                      className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors ${
                        isOpen ? 'bg-page text-ink' : 'text-ink hover:bg-page'
                      }`}
                    >
                      {item.label}
                      <Chevron open={isOpen} />
                    </button>
                    {/* dropdown pequeno posicionado */}
                    {small && (
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.18, ease: EASE }}
                            onMouseEnter={cancelClose}
                            onMouseLeave={scheduleClose}
                            className="absolute top-[calc(100%+6px)] left-0 z-50 rounded-lg border border-line bg-white shadow-[0_24px_48px_-24px_rgba(9,11,12,0.25)]"
                          >
                            {item.kind === 'cat' ? (
                              <CatDropdown slug={item.slug} onNavigate={() => setOpen(null)} />
                            ) : (
                              <RecursosDropdown />
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* mega panels full-width */}
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
                  className="border-t border-line bg-white shadow-[0_24px_48px_-24px_rgba(9,11,12,0.18)]"
                >
                  {open === 'produtos' ? <MegaProdutos onNavigate={() => setOpen(null)} /> : <MegaSolucoes />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* dim page under open overlay */}
      <AnimatePresence>
        {anyOverlay && (
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
              className="fixed top-0 left-0 z-50 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-white p-6 pt-8"
            >
              <Link
                to="/categorias"
                onClick={() => setOpen(null)}
                className="mb-2 flex items-center justify-between border-b border-line py-4 text-sm font-semibold"
              >
                Todas as categorias
                <span aria-hidden="true">→</span>
              </Link>
              <a href="#" className="flex items-center justify-between border-b border-line py-4 text-sm font-semibold">
                <span className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2.5 6.5 4 2.5h8l1.5 4M2.5 6.5v6.5h11V6.5M2.5 6.5h11M6 13V9.5h4V13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Encontrar loja
                </span>
                <span className="rounded bg-accent-soft px-1.5 py-0.5 text-[10px] font-semibold text-accent-deep">14</span>
              </a>
              {shopCategories.map((c) => (
                <Link
                  key={c.slug}
                  to={`/categoria/${c.slug}`}
                  onClick={() => setOpen(null)}
                  className="flex items-center justify-between border-b border-line py-3.5 text-sm font-medium"
                >
                  {c.title}
                  <span className="text-[11px] text-muted">{countByCat(c.slug)}</span>
                </Link>
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
                {recursos.map((r) => (
                  <a key={r.label} href={r.href} className="block py-1.5 text-sm font-medium">
                    {r.label}
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
