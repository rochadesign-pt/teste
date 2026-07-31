import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { catalog } from '../data/product'
import { Placeholder } from './Placeholder'

const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`

// deterministic pseudo-rating so cards feel populated without real data
const ratingOf = (key) => {
  let h = 0
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) % 1000
  return 4 + (h % 10) / 10 // 4.0 – 4.9
}
const reviewsOf = (key) => 8 + (key.length * 7) % 120

function Stars({ value }) {
  return (
    <span className="flex items-center gap-[3px]" aria-label={`${value.toFixed(1)} em 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M6 1l1.5 3.1 3.4.5-2.5 2.4.6 3.4L6 9.3 2.9 10.9l.6-3.4L1 5.1l3.4-.5L6 1z"
            fill={i < Math.round(value) ? '#64a70b' : '#d7dcdc'}
          />
        </svg>
      ))}
    </span>
  )
}

export function ProductCard({ p, addItem }) {
  const addable = p.id && catalog[p.id]
  const rating = ratingOf(p.key)
  const onSale = /−|%/.test(p.tag || '')

  return (
    <article className="group flex flex-col">
      <div className="relative">
        <Link to={p.href} className="block" aria-label={p.name}>
          <Placeholder zoom className="aspect-square border border-line shadow-xs" rounded="rounded-xl" />
        </Link>

        {/* badges */}
        {p.tag && (
          <span
            className={`pointer-events-none absolute top-3 left-3 rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wide ${
              onSale ? 'bg-accent text-white' : p.tag === 'Novo' ? 'bg-ink text-white' : 'bg-white text-ink shadow-xs'
            }`}
          >
            {p.tag}
          </span>
        )}

        {/* wishlist */}
        <button
          type="button"
          aria-label="Adicionar aos favoritos"
          className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-xs backdrop-blur transition-all duration-200 hover:text-accent-deep group-hover:opacity-100"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 14S1.5 10 1.5 5.5A3.5 3.5 0 0 1 8 3.8a3.5 3.5 0 0 1 6.5 1.7C14.5 10 8 14 8 14z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </button>

        {/* quick add */}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          {addable ? (
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => addItem(p.id)}
              className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-ink text-[13px] font-semibold text-white shadow-xs transition-colors hover:bg-accent-deep"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Adicionar
            </motion.button>
          ) : (
            <Link
              to={p.href}
              className="flex h-10 w-full items-center justify-center rounded-lg bg-white text-[13px] font-semibold text-ink shadow-xs transition-colors hover:bg-ink hover:text-white"
            >
              Ver produto
            </Link>
          )}
        </div>
      </div>

      {/* meta */}
      <div className="flex flex-1 flex-col pt-3.5">
        <p className="text-[10px] font-medium tracking-[0.12em] text-muted uppercase">{p.sub || 'Mistolin PRO'}</p>
        <Link to={p.href} className="mt-1 line-clamp-2 text-[13.5px] font-medium leading-snug hover:text-accent-deep">
          {p.name}
        </Link>
        <div className="mt-1.5 flex items-center gap-1.5">
          <Stars value={rating} />
          <span className="text-[11px] text-muted">({reviewsOf(p.key)})</span>
        </div>
        <p className="mt-2 flex items-baseline gap-1.5 text-[15px] font-semibold tabular-nums">
          <span className={onSale ? 'text-accent-deep' : ''}>{fmt(p.price)}</span>
          {p.full && <span className="text-[12px] font-normal text-muted/60 line-through">{fmt(p.full)}</span>}
        </p>
      </div>
    </article>
  )
}
