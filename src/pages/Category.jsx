import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { shopCategories, shopProducts, formatOf, countByCat } from '../data/catalog'
import { ProductCard } from '../components/ProductCard'
import { Placeholder } from '../components/Placeholder'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1600px] px-6 lg:px-10'
const PAGE = 12

const SORTS = [
  { id: 'destaque', label: 'Em destaque' },
  { id: 'novidade', label: 'Novidades primeiro' },
  { id: 'preco-asc', label: 'Preço: baixo → alto' },
  { id: 'preco-desc', label: 'Preço: alto → baixo' },
]

const PRICES = [
  { id: 'all', label: 'Todos os preços', test: () => true },
  { id: 'lt5', label: 'Até 5 €', test: (p) => p.price < 5 },
  { id: '5-15', label: '5 € – 15 €', test: (p) => p.price >= 5 && p.price <= 15 },
  { id: 'gt15', label: 'Mais de 15 €', test: (p) => p.price > 15 },
]

const CERTS = ['Certificado HACCP', 'Fabricado em Portugal', 'Apoio técnico', 'Expedição 24–48h']

function Chevron({ open }) {
  return (
    <motion.svg width="10" height="6" viewBox="0 0 10 6" fill="none" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2, ease: EASE }} aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-line">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-4 text-left text-[13px] font-semibold">
        {title}
        <Chevron open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Check({ checked, onChange, children, count }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-[13px]">
      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${checked ? 'border-accent bg-accent' : 'border-ink/25 bg-white'}`}>
        {checked && (
          <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l2.8 2.8L9 1.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="flex-1">{children}</span>
      {count != null && <span className="text-[11px] text-muted/70">{count}</span>}
    </label>
  )
}

function Radio({ checked, onChange, children, count }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-[13px]">
      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${checked ? 'border-accent' : 'border-ink/25'}`}>
        <span className={`h-2 w-2 rounded-full bg-accent transition-transform ${checked ? 'scale-100' : 'scale-0'}`} />
      </span>
      <input type="radio" checked={checked} onChange={onChange} className="sr-only" />
      <span className="flex-1">{children}</span>
      {count != null && <span className="text-[11px] text-muted/70">{count}</span>}
    </label>
  )
}

export function Category({ addItem }) {
  const reduce = useReducedMotion()
  const { slug } = useParams()
  const category = shopCategories.find((c) => c.slug === slug)

  const [sub, setSub] = useState('all')
  const [formats, setFormats] = useState([])
  const [price, setPrice] = useState('all')
  const [inStock, setInStock] = useState(false)
  const [sort, setSort] = useState('destaque')
  const [visible, setVisible] = useState(PAGE)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [cols, setCols] = useState(4)

  const base = useMemo(() => shopProducts.filter((p) => p.cat === slug), [slug])
  const allFormats = useMemo(() => [...new Set(base.map((p) => formatOf(p.detail)))], [base])
  const countSub = (sc) => base.filter((p) => p.sub === sc).length
  const countFormat = (f) => base.filter((p) => formatOf(p.detail) === f).length

  const toggleFormat = (f) => setFormats((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))

  const filtered = useMemo(() => {
    let r = base
    if (sub !== 'all') r = r.filter((p) => p.sub === sub)
    if (formats.length) r = r.filter((p) => formats.includes(formatOf(p.detail)))
    r = r.filter(PRICES.find((x) => x.id === price).test)
    if (inStock) r = r
    const s = [...r]
    if (sort === 'preco-asc') s.sort((a, b) => a.price - b.price)
    else if (sort === 'preco-desc') s.sort((a, b) => b.price - a.price)
    else if (sort === 'novidade') s.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
    return s
  }, [base, sub, formats, price, inStock, sort])

  const shown = filtered.slice(0, visible)
  const resetFilters = () => {
    setSub('all')
    setFormats([])
    setPrice('all')
    setInStock(false)
  }

  // active filter chips
  const chips = []
  if (sub !== 'all') chips.push({ label: sub, clear: () => setSub('all') })
  formats.forEach((f) => chips.push({ label: f, clear: () => toggleFormat(f) }))
  if (price !== 'all') chips.push({ label: PRICES.find((p) => p.id === price).label, clear: () => setPrice('all') })
  if (inStock) chips.push({ label: 'Em stock', clear: () => setInStock(false) })

  if (!category) {
    return (
      <main className="pt-[140px] pb-24 text-center">
        <p className="text-sm text-muted">Categoria não encontrada.</p>
        <Link to="/categorias" className="mt-4 inline-block text-sm font-medium text-accent-deep hover:underline">
          Ver todas as categorias →
        </Link>
      </main>
    )
  }

  const sidebar = (
    <div>
      <div className="hidden items-center justify-between pb-1 lg:flex">
        <p className="text-sm font-semibold">Filtros</p>
        {chips.length > 0 && (
          <button type="button" onClick={resetFilters} className="text-[12px] text-accent-deep hover:underline">
            Limpar tudo
          </button>
        )}
      </div>
      <FilterGroup title="Tipo de produto">
        <Radio checked={sub === 'all'} onChange={() => setSub('all')} count={base.length}>Todos</Radio>
        {category.subcats.map((sc) => (
          <Radio key={sc} checked={sub === sc} onChange={() => setSub(sc)} count={countSub(sc)}>{sc}</Radio>
        ))}
      </FilterGroup>
      <FilterGroup title="Formato">
        {allFormats.map((f) => (
          <Check key={f} checked={formats.includes(f)} onChange={() => toggleFormat(f)} count={countFormat(f)}>{f}</Check>
        ))}
      </FilterGroup>
      <FilterGroup title="Preço">
        {PRICES.map((p) => (
          <Radio key={p.id} checked={price === p.id} onChange={() => setPrice(p.id)}>{p.label}</Radio>
        ))}
      </FilterGroup>
      <FilterGroup title="Disponibilidade" defaultOpen={false}>
        <Check checked={inStock} onChange={() => setInStock(!inStock)}>Apenas em stock</Check>
      </FilterGroup>

      {/* B2B card */}
      <div className="mt-6 rounded-xl border border-line bg-accent-soft/60 p-5">
        <p className="text-[13px] font-semibold">Compra para empresa?</p>
        <p className="mt-1 text-[12px] leading-relaxed text-muted">
          Condições dedicadas para volume, faturação com NIF e apoio técnico especializado.
        </p>
        <a href="#" className="mt-3 inline-flex h-9 items-center justify-center rounded-full bg-ink px-5 text-[12px] font-semibold text-white transition-colors hover:bg-accent-deep">
          Pedir proposta
        </a>
      </div>
    </div>
  )

  return (
    <main className="pt-[140px]">
      {/* ——— header ——— */}
      <section className="border-b border-line bg-white">
        <div className={`${WRAP} grid grid-cols-1 gap-8 py-10 lg:grid-cols-[1fr_420px] lg:items-center lg:py-12`}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <nav className="mb-4 flex items-center gap-1.5 text-[12px] text-muted" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-ink">Início</Link>
              <span>/</span>
              <Link to="/categorias" className="hover:text-ink">Categorias</Link>
              <span>/</span>
              <span className="text-ink">{category.title}</span>
            </nav>
            <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep">CATÁLOGO PROFISSIONAL</p>
            <h1 className="font-display text-4xl font-semibold sm:text-5xl">{category.title}</h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{category.text}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {CERTS.map((c) => (
                <span key={c} className="flex items-center gap-1.5 text-[12px] text-muted">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1 6l3 3 7-7" stroke="#518708" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE, delay: 0.08 }} className="hidden lg:block">
            <Placeholder className="aspect-[4/3]" rounded="rounded-2xl">
              <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-ink">
                {countByCat(slug)} produtos · {category.title}
              </span>
            </Placeholder>
          </motion.div>
        </div>
      </section>

      {/* ——— shop by type pills ——— */}
      <section className="border-b border-line bg-white">
        <div className={`${WRAP} flex items-center gap-2 overflow-x-auto py-4 [scrollbar-width:none]`}>
          <span className="mr-1 shrink-0 text-[12px] font-medium text-muted">Comprar por tipo:</span>
          <button
            type="button"
            onClick={() => setSub('all')}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors ${sub === 'all' ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink/30'}`}
          >
            Todos
          </button>
          {category.subcats.map((sc) => (
            <button
              key={sc}
              type="button"
              onClick={() => setSub(sc)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-medium whitespace-nowrap transition-colors ${sub === sc ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink/30'}`}
            >
              {sc}
            </button>
          ))}
        </div>
      </section>

      <div className={`${WRAP} py-10`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
          {/* sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">{sidebar}</div>
          </aside>

          {/* main */}
          <div>
            {/* toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <p className="text-[13px] text-muted">
                A mostrar <span className="font-semibold text-ink">{shown.length}</span> de{' '}
                <span className="font-semibold text-ink">{filtered.length}</span> produtos
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="flex h-9 items-center gap-2 rounded-full border border-line bg-white px-4 text-[13px] font-medium lg:hidden"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  Filtros{chips.length > 0 && ` (${chips.length})`}
                </button>

                {/* column density */}
                <div className="hidden items-center gap-1 rounded-full border border-line bg-white p-1 xl:flex">
                  {[3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      aria-label={`${n} colunas`}
                      onClick={() => setCols(n)}
                      className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${cols === n ? 'bg-ink text-white' : 'text-muted hover:bg-page'}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        {Array.from({ length: n }).map((_, i) => (
                          <rect key={i} x={1 + i * (13 / n)} y="2" width={13 / n - 1.2} height="10" rx="0.6" fill="currentColor" />
                        ))}
                      </svg>
                    </button>
                  ))}
                </div>

                <label className="flex items-center gap-2 text-[13px]">
                  <span className="hidden text-muted sm:inline">Ordenar:</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="h-9 rounded-full border border-line bg-white px-4 text-[13px] font-medium outline-none focus:border-accent"
                  >
                    {SORTS.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {/* active filter chips */}
            {chips.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {chips.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={c.clear}
                    className="flex items-center gap-1.5 rounded-full bg-page px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-line"
                  >
                    {c.label}
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </button>
                ))}
                <button type="button" onClick={resetFilters} className="text-[12px] font-medium text-accent-deep hover:underline">
                  Limpar tudo
                </button>
              </div>
            )}

            {/* grid */}
            {shown.length ? (
              <motion.div
                layout
                className={`grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 ${cols === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-4'}`}
              >
                {shown.map((p, i) => (
                  <motion.div
                    key={p.key}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduce ? 0 : 0.4, ease: EASE, delay: reduce ? 0 : (i % 4) * 0.04 }}
                  >
                    <ProductCard p={p} addItem={addItem} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-sm text-muted">Nenhum produto corresponde aos filtros.</p>
                <button type="button" onClick={resetFilters} className="mt-3 text-sm font-medium text-accent-deep hover:underline">
                  Limpar filtros
                </button>
              </div>
            )}

            {visible < filtered.length && (
              <div className="mt-12 flex flex-col items-center gap-3">
                <p className="text-[12px] text-muted">
                  {shown.length} de {filtered.length} produtos
                </p>
                <div className="h-1 w-40 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${(shown.length / filtered.length) * 100}%` }} />
                </div>
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE)}
                  className="mt-1 rounded-full border border-line bg-white px-8 py-3 text-sm font-semibold transition-colors duration-200 hover:border-ink"
                >
                  Carregar mais
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
              className="fixed inset-0 z-[60] bg-ink/30 lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: reduce ? 0 : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: reduce ? 0 : '-100%' }}
              transition={{ duration: 0.35, ease: EASE }}
              className="fixed top-0 left-0 z-[70] flex h-full w-[85%] max-w-xs flex-col overflow-y-auto bg-white p-6 lg:hidden"
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="font-display text-lg font-semibold">Filtros</p>
                <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Fechar" className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-page">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {sidebar}
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="mt-6 h-11 shrink-0 rounded-full bg-ink text-sm font-semibold text-white"
              >
                Ver {filtered.length} produtos
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
