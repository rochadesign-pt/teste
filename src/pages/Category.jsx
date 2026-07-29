import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { shopCategories, shopProducts, formatOf } from '../data/catalog'
import { ProductCard } from '../components/ProductCard'
import { FauxPhoto } from '../components/FauxPhoto'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1600px] px-6 lg:px-10'
const PAGE = 8

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

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-line py-5">
      <p className="mb-3 text-[11px] font-semibold tracking-[0.12em] text-muted">{title.toUpperCase()}</p>
      {children}
    </div>
  )
}

function Check({ checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1 text-[13px]">
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
          checked ? 'border-accent bg-accent' : 'border-ink/25 bg-white'
        }`}
      >
        {checked && (
          <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l2.8 2.8L9 1.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  )
}

function Radio({ checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1 text-[13px]">
      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${checked ? 'border-accent' : 'border-ink/25'}`}>
        <span className={`h-2 w-2 rounded-full bg-accent transition-transform ${checked ? 'scale-100' : 'scale-0'}`} />
      </span>
      <input type="radio" checked={checked} onChange={onChange} className="sr-only" />
      {children}
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

  const base = useMemo(() => shopProducts.filter((p) => p.cat === slug), [slug])
  const allFormats = useMemo(() => [...new Set(base.map((p) => formatOf(p.detail)))], [base])

  const toggleFormat = (f) =>
    setFormats((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))

  const filtered = useMemo(() => {
    let r = base
    if (sub !== 'all') r = r.filter((p) => p.sub === sub)
    if (formats.length) r = r.filter((p) => formats.includes(formatOf(p.detail)))
    r = r.filter(PRICES.find((x) => x.id === price).test)
    if (inStock) r = r // demo: tudo em stock
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
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Filtros</p>
        <button type="button" onClick={resetFilters} className="text-[12px] text-accent-deep hover:underline">
          Limpar
        </button>
      </div>
      <FilterGroup title="Subcategoria">
        <Radio checked={sub === 'all'} onChange={() => setSub('all')}>Todas</Radio>
        {category.subcats.map((sc) => (
          <Radio key={sc} checked={sub === sc} onChange={() => setSub(sc)}>{sc}</Radio>
        ))}
      </FilterGroup>
      <FilterGroup title="Formato">
        {allFormats.map((f) => (
          <Check key={f} checked={formats.includes(f)} onChange={() => toggleFormat(f)}>{f}</Check>
        ))}
      </FilterGroup>
      <FilterGroup title="Preço">
        {PRICES.map((p) => (
          <Radio key={p.id} checked={price === p.id} onChange={() => setPrice(p.id)}>{p.label}</Radio>
        ))}
      </FilterGroup>
      <FilterGroup title="Disponibilidade">
        <Check checked={inStock} onChange={() => setInStock(!inStock)}>Apenas em stock</Check>
      </FilterGroup>
    </div>
  )

  return (
    <main className="pt-[92px]">
      {/* category banner */}
      <section className="relative">
        <FauxPhoto scene={category.scene} subject={category.subject} className="min-h-[220px] lg:min-h-[260px]">
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.32)_55%,transparent_82%)]" />
          <div className={`${WRAP} relative flex h-full min-h-[220px] flex-col justify-center py-8 text-white lg:min-h-[260px]`}>
            <nav className="mb-3 flex items-center gap-1.5 text-[12px] text-white/70" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white">Início</Link>
              <span>/</span>
              <Link to="/categorias" className="hover:text-white">Categorias</Link>
              <span>/</span>
              <span className="text-white">{category.title}</span>
            </nav>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">{category.title}</h1>
            <p className="mt-2 max-w-md text-sm text-white/80">{category.text}</p>
          </div>
        </FauxPhoto>
      </section>

      <div className={`${WRAP} py-10`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          {/* sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">{sidebar}</div>
          </aside>

          {/* main */}
          <div>
            {/* toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <p className="text-[13px] text-muted">
                <span className="font-semibold text-ink">{filtered.length}</span> produtos
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="flex h-9 items-center gap-2 rounded-md border border-line bg-white px-3 text-[13px] font-medium lg:hidden"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  Filtros
                </button>
                <label className="flex items-center gap-2 text-[13px]">
                  <span className="hidden text-muted sm:inline">Ordenar:</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="h-9 rounded-md border border-line bg-white px-3 text-[13px] font-medium outline-none focus:border-accent"
                  >
                    {SORTS.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {/* grid */}
            {shown.length ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 xl:grid-cols-4">
                {shown.map((p) => (
                  <ProductCard key={p.key} p={p} addItem={addItem} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-sm text-muted">Nenhum produto corresponde aos filtros.</p>
                <button type="button" onClick={resetFilters} className="mt-3 text-sm font-medium text-accent-deep hover:underline">
                  Limpar filtros
                </button>
              </div>
            )}

            {visible < filtered.length && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE)}
                  className="rounded-lg border border-line bg-white px-6 py-3 text-sm font-medium transition-colors duration-200 hover:border-ink"
                >
                  Carregar mais ({filtered.length - visible})
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
                className="mt-6 h-11 rounded-lg bg-ink text-sm font-semibold text-white"
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
