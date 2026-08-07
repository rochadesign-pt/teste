import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { stores, storeRegions } from '../data/content'
import { Placeholder } from '../components/Placeholder'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1280px] px-6 lg:px-10'

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 0.45, ease: EASE },
}

function StoreCard({ s }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium tracking-[0.12em] text-accent-deep uppercase">{s.region}</p>
          <h3 className="mt-1 text-base font-semibold">{s.name}</h3>
        </div>
        {s.hq && <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[10px] font-semibold text-accent-deep">Sede</span>}
      </div>
      <p className="mt-3 flex items-start gap-2 text-[13px] leading-snug text-muted">
        <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true">
          <path d="M8 14.5s5-4.5 5-8.5A5 5 0 0 0 3 6c0 4 5 8.5 5 8.5z M8 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {s.address}
      </p>
      <div className="mt-4 flex flex-1 flex-col justify-end gap-1.5 border-t border-line pt-4 text-[13px]">
        <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="font-medium hover:text-accent-deep">{s.phone}</a>
        <a href={`mailto:${s.email}`} className="text-muted hover:text-ink">{s.email}</a>
        <p className="mt-1 text-[12px] text-muted">{s.hours}</p>
      </div>
    </div>
  )
}

export function Stores() {
  const [region, setRegion] = useState('Todas')
  const list = useMemo(() => (region === 'Todas' ? stores : stores.filter((s) => s.region === region)), [region])

  return (
    <main className="pt-[140px]">
      {/* hero */}
      <section className="border-b border-line bg-white">
        <div className={`${WRAP} py-12`}>
          <nav className="mb-4 flex items-center gap-1.5 text-[12px] text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-ink">Início</Link>
            <span>/</span>
            <span className="text-ink">Encontrar loja</span>
          </nav>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep uppercase">Rede nacional</p>
              <h1 className="font-display text-4xl font-semibold sm:text-5xl">Encontrar loja</h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                {stores.length} unidades de norte a sul e ilhas, com apoio técnico local e disponibilidade constante de produto.
              </p>
            </div>
            <div className="flex shrink-0 gap-8">
              <div>
                <p className="font-display text-3xl font-semibold">{stores.length}</p>
                <p className="text-[12px] text-muted">unidades</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold">{storeRegions.length}</p>
                <p className="text-[12px] text-muted">regiões</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* map placeholder */}
      <section className={`${WRAP} pt-10`}>
        <motion.div {...reveal}>
          <Placeholder className="aspect-[21/7] border border-line" rounded="rounded-2xl">
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-medium text-ink backdrop-blur">
              Mapa da rede · {stores.length} unidades
            </span>
          </Placeholder>
        </motion.div>
      </section>

      {/* filter + grid */}
      <section className={`${WRAP} py-10 pb-24`}>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[12px] font-medium text-muted">Região:</span>
          {['Todas', ...storeRegions].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
                region === r ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink/30'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <motion.div key={s.id} {...reveal} transition={{ ...reveal.transition, delay: (i % 3) * 0.04 }}>
              <StoreCard s={s} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  )
}
