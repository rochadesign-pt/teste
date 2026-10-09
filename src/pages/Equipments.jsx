import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { equipmentTypes, equipmentItems, requirementFields, typeOf, countByType, formatField, valuesOf, matches } from '../data/equipmentCatalog'
import { servicesForItem } from '../data/services'
import { Placeholder } from '../components/Placeholder'
import { FilterGroup, Check, Radio } from '../components/Filters'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1600px] px-6 lg:px-10'
const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`

const SORTS = [
  { id: 'destaque', label: 'Em destaque' },
  { id: 'preco-asc', label: 'Preço: baixo → alto' },
  { id: 'preco-desc', label: 'Preço: alto → baixo' },
]

const PRICES = [
  { id: 'all', label: 'Todos os preços', test: () => true },
  { id: 'lt100', label: 'Até 100 €', test: (e) => e.price != null && e.price < 100 },
  { id: '100-1000', label: '100 € – 1000 €', test: (e) => e.price != null && e.price >= 100 && e.price <= 1000 },
  { id: 'gt1000', label: 'Mais de 1000 €', test: (e) => e.price != null && e.price > 1000 },
  { id: 'quote', label: 'Sob proposta', test: (e) => e.price == null },
]

const PROMISES = ['Instalação por técnicos da rede', 'Formação da equipa', 'Assistência em 48 h', 'Faturação com NIF']

const REQ_ICONS = {
  energia: 'M9 1.5 3.5 9H8l-1 5.5L12.5 7H8z',
  agua: 'M8 2s-4.5 5-4.5 8a4.5 4.5 0 0 0 9 0C12.5 7 8 2 8 2z',
  montagem: 'M2.5 2.5v11M2.5 5h6v6h-6M8.5 8h5',
}

function ReqIcon({ k }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3 shrink-0" aria-hidden="true">
      <path d={REQ_ICONS[k]} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const priceText = (e) => (e.price == null ? 'Sob proposta' : `${e.priceMode === 'from' ? 'desde ' : ''}${fmt(e.price)}`)

function EquipmentCard({ e }) {
  const type = typeOf(e.type)
  const specs = type.fields.filter((f) => f.card).map((f) => formatField(f, e.attrs[f.key])).filter(Boolean)
  const svc = servicesForItem(e)
  const included = svc.filter((s) => s.mode === 'included')
  const optional = svc.filter((s) => s.mode === 'optional')
  const seal = (included.find((s) => s.stage === 'arranque') || included[0])?.tag
  const to = e.href || '/contactos'

  return (
    <article className="group flex flex-col">
      <Link to={to} className="relative block" aria-label={e.name}>
        <Placeholder zoom className="aspect-[4/3] border border-line shadow-xs" rounded="rounded-xl" />
        {e.badge && (
          <span className={`pointer-events-none absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${e.badge === 'Novo' ? 'bg-ink text-white' : 'bg-white text-ink shadow-xs'}`}>
            {e.badge}
          </span>
        )}
        {seal && (
          <span className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-ink backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {seal}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-3.5">
        <p className="text-[10px] font-medium tracking-[0.12em] text-muted uppercase">{type.short} · {e.code}</p>
        <Link to={to} className="mt-1 line-clamp-2 text-[14px] font-medium leading-snug hover:text-accent-deep">{e.name}</Link>

        {/* campos dinâmicos do tipo */}
        {specs.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {specs.map((s) => (
              <span key={s} className="rounded-full bg-page px-2.5 py-1 text-[11px] font-medium">{s}</span>
            ))}
          </div>
        )}

        {/* necessidades de instalação */}
        <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted">
          {['energia', 'agua', 'montagem'].map((k) => (
            <span key={k} className="flex items-center gap-1">
              <ReqIcon k={k} />
              {e.requires[k]}
            </span>
          ))}
        </div>

        {/* serviços — discretos, agarrados ao equipamento */}
        <div className="mt-3 border-t border-line pt-2.5 text-[11px] leading-relaxed">
          {included.map((s) => (
            <p key={s.id} className="flex items-center gap-1.5 text-accent-deep">
              <svg width="9" height="7" viewBox="0 0 12 10" fill="none" aria-hidden="true"><path d="M1 5l3.4 3.4L11 1.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {s.name}
            </p>
          ))}
          {optional.slice(0, 1).map((s) => (
            <p key={s.id} className="text-muted">+ {s.name} · {s.label}</p>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <p className="text-[15px] font-semibold tabular-nums">{priceText(e)}</p>
          <Link to={to} className="text-[12px] font-semibold text-accent-deep hover:underline">
            {e.href ? 'Ver equipamento →' : 'Pedir proposta →'}
          </Link>
        </div>
      </div>
    </article>
  )
}

export function Equipments() {
  const reduce = useReducedMotion()
  const [params, setParams] = useSearchParams()
  const typeParam = params.get('tipo')
  const type = equipmentTypes.some((t) => t.id === typeParam) ? typeParam : 'all'

  const [attrFilters, setAttrFilters] = useState({})
  const [reqFilters, setReqFilters] = useState({})
  const [price, setPrice] = useState('all')
  const [withService, setWithService] = useState(false)
  const [sort, setSort] = useState('destaque')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const currentType = type === 'all' ? null : typeOf(type)

  const setType = (id) => {
    setAttrFilters({})
    setParams(id === 'all' ? {} : { tipo: id }, { replace: true })
  }

  const toggleIn = (setter, key, value) =>
    setter((prev) => {
      const cur = prev[key] || []
      return { ...prev, [key]: cur.includes(value) ? cur.filter((x) => x !== value) : [...cur, value] }
    })

  const base = useMemo(() => (type === 'all' ? equipmentItems : equipmentItems.filter((e) => e.type === type)), [type])

  const filtered = useMemo(() => {
    let r = base
    Object.entries(attrFilters).forEach(([k, vals]) => {
      if (vals.length) r = r.filter((e) => matches(e.attrs[k], vals))
    })
    Object.entries(reqFilters).forEach(([k, vals]) => {
      if (vals.length) r = r.filter((e) => matches(e.requires[k], vals))
    })
    r = r.filter(PRICES.find((x) => x.id === price).test)
    if (withService) r = r.filter((e) => e.services.some((s) => s.mode === 'included'))
    const s = [...r]
    const val = (e) => (e.price == null ? Infinity : e.price)
    if (sort === 'preco-asc') s.sort((a, b) => val(a) - val(b))
    else if (sort === 'preco-desc') s.sort((a, b) => (b.price ?? -1) - (a.price ?? -1))
    return s
  }, [base, attrFilters, reqFilters, price, withService, sort])

  const resetFilters = () => {
    setAttrFilters({})
    setReqFilters({})
    setPrice('all')
    setWithService(false)
  }

  // chips de filtros ativos
  const chips = []
  if (currentType) chips.push({ label: currentType.label, clear: () => setType('all') })
  Object.entries(attrFilters).forEach(([k, vals]) => {
    const f = currentType?.fields.find((x) => x.key === k)
    vals.forEach((v) => chips.push({ label: f ? formatField(f, f.type === 'multi' ? [v] : v) : v, clear: () => toggleIn(setAttrFilters, k, v) }))
  })
  Object.entries(reqFilters).forEach(([k, vals]) => vals.forEach((v) => chips.push({ label: v, clear: () => toggleIn(setReqFilters, k, v) })))
  if (price !== 'all') chips.push({ label: PRICES.find((p) => p.id === price).label, clear: () => setPrice('all') })
  if (withService) chips.push({ label: 'Instalação incluída', clear: () => setWithService(false) })

  const countWith = (source, key, v) => base.filter((e) => matches(e[source][key], [v])).length

  const sidebar = (
    <div>
      <div className="hidden items-center justify-between pb-1 lg:flex">
        <p className="text-sm font-semibold">Filtros</p>
        {chips.length > 0 && (
          <button type="button" onClick={() => { resetFilters(); setType('all') }} className="text-[12px] text-accent-deep hover:underline">
            Limpar tudo
          </button>
        )}
      </div>

      <FilterGroup title="Tipo de equipamento">
        <Radio checked={type === 'all'} onChange={() => setType('all')} count={equipmentItems.length}>Todos</Radio>
        {equipmentTypes.map((t) => (
          <Radio key={t.id} checked={type === t.id} onChange={() => setType(t.id)} count={countByType(t.id)}>{t.label}</Radio>
        ))}
      </FilterGroup>

      {/* filtros gerados a partir do esquema do tipo escolhido */}
      {currentType?.fields.filter((f) => f.filter).map((f) => {
        const values = valuesOf(base, f.key)
        if (values.length < 2) return null
        return (
          <FilterGroup key={`${type}-${f.key}`} title={f.label}>
            {values.map((v) => (
              <Check key={v} checked={(attrFilters[f.key] || []).includes(v)} onChange={() => toggleIn(setAttrFilters, f.key, v)} count={countWith('attrs', f.key, v)}>
                {formatField(f, f.type === 'multi' ? [v] : v)}
              </Check>
            ))}
          </FilterGroup>
        )
      })}

      {/* necessidades de instalação — comuns a todos os tipos */}
      {requirementFields.filter((f) => f.filter).map((f) => {
        const values = valuesOf(base, f.key, 'requires')
        if (values.length < 2) return null
        return (
          <FilterGroup key={`req-${f.key}`} title={f.label} defaultOpen={f.key === 'energia'}>
            {values.map((v) => (
              <Check key={v} checked={(reqFilters[f.key] || []).includes(v)} onChange={() => toggleIn(setReqFilters, f.key, v)} count={countWith('requires', f.key, v)}>
                {v}
              </Check>
            ))}
          </FilterGroup>
        )
      })}

      <FilterGroup title="Preço" defaultOpen={false}>
        {PRICES.map((p) => (
          <Radio key={p.id} checked={price === p.id} onChange={() => setPrice(p.id)}>{p.label}</Radio>
        ))}
      </FilterGroup>
      <FilterGroup title="Serviço" defaultOpen={false}>
        <Check checked={withService} onChange={() => setWithService(!withService)}>Instalação ou arranque incluído</Check>
      </FilterGroup>

      <div className="mt-6 rounded-xl border border-line bg-accent-soft/60 p-5">
        <p className="text-[13px] font-semibold">Não sabes qual escolher?</p>
        <p className="mt-1 text-[12px] leading-relaxed text-muted">
          Marcamos uma visita técnica gratuita: vemos o teu espaço e dizemos-te o que faz sentido instalar.
        </p>
        <Link to="/servicos" className="mt-3 inline-flex h-9 items-center justify-center rounded-full bg-ink px-5 text-[12px] font-semibold text-white transition-colors hover:bg-accent-deep">
          Pedir visita técnica
        </Link>
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
              <span className="text-ink">Equipamentos</span>
            </nav>
            <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep">EQUIPAMENTOS & SISTEMAS</p>
            <h1 className="font-display text-4xl font-semibold sm:text-5xl">{currentType ? currentType.label : 'Equipamentos'}</h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              {currentType
                ? currentType.text
                : 'Doseamento, dispensadores e máquinas de limpeza — escolhidos pelas características de que a tua operação precisa e entregues prontos a funcionar.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {PROMISES.map((c) => (
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
                {base.length} equipamentos{currentType ? ` · ${currentType.short}` : ''}
              </span>
            </Placeholder>
          </motion.div>
        </div>
      </section>

      {/* ——— tipo ——— */}
      <section className="border-b border-line bg-white">
        <div className={`${WRAP} flex items-center gap-2 overflow-x-auto py-4 [scrollbar-width:none]`}>
          <span className="mr-1 shrink-0 text-[12px] font-medium text-muted">Comprar por tipo:</span>
          {[{ id: 'all', label: 'Todos' }, ...equipmentTypes].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-medium whitespace-nowrap transition-colors ${type === t.id ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink/30'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <div className={`${WRAP} py-10`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">{sidebar}</div>
          </aside>

          <div>
            {/* toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <p className="text-[13px] text-muted">
                <span className="font-semibold text-ink">{filtered.length}</span> {filtered.length === 1 ? 'equipamento' : 'equipamentos'}
              </p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setFiltersOpen(true)} className="flex h-9 items-center gap-2 rounded-full border border-line bg-white px-4 text-[13px] font-medium lg:hidden">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  Filtros{chips.length > 0 && ` (${chips.length})`}
                </button>
                <label className="flex items-center gap-2 text-[13px]">
                  <span className="hidden text-muted sm:inline">Ordenar:</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-9 rounded-full border border-line bg-white px-4 text-[13px] font-medium outline-none focus:border-accent">
                    {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </label>
              </div>
            </div>

            {chips.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {chips.map((c) => (
                  <button key={c.label} type="button" onClick={c.clear} className="flex items-center gap-1.5 rounded-full bg-page px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-line">
                    {c.label}
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </button>
                ))}
              </div>
            )}

            {filtered.length ? (
              <motion.div layout className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((e, i) => (
                  <motion.div key={e.slug} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.4, ease: EASE, delay: reduce ? 0 : (i % 3) * 0.04 }}>
                    <EquipmentCard e={e} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-sm text-muted">Nenhum equipamento corresponde aos filtros.</p>
                <button type="button" onClick={resetFilters} className="mt-3 text-sm font-medium text-accent-deep hover:underline">Limpar filtros</button>
              </div>
            )}

            {/* ponte discreta para os serviços */}
            <div className="mt-14 flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold">Cada equipamento chega com quem o instale.</p>
                <p className="mt-1 text-[13px] text-muted">Montagem, calibração, formação e manutenção — feitas por técnicos da rede, perto de ti.</p>
              </div>
              <Link to={currentType ? `/servicos?tipo=${currentType.id}` : '/servicos'} className="shrink-0 text-[13px] font-semibold text-accent-deep hover:underline">
                Ver serviços{currentType ? ` para ${currentType.short.toLowerCase()}` : ''} →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* mobile filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFiltersOpen(false)} className="fixed inset-0 z-[60] bg-ink/30 lg:hidden" aria-hidden="true" />
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
              <button type="button" onClick={() => setFiltersOpen(false)} className="mt-6 h-11 shrink-0 rounded-full bg-ink text-sm font-semibold text-white">
                Ver {filtered.length} equipamentos
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
