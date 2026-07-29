import { Link } from 'react-router-dom'
import { catalog } from '../data/product'
import { FauxPhoto } from './FauxPhoto'
import { Bottle } from './Bottle'

const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`

export function ProductCard({ p, addItem }) {
  const addable = p.id && catalog[p.id]
  return (
    <article className="group flex flex-col">
      <Link to={p.href} className="block">
        <FauxPhoto scene={p.scene} zoom className="relative aspect-square rounded-lg border border-line shadow-xs">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[36%] drop-shadow-[0_16px_24px_rgba(0,0,0,0.28)]">
              <Bottle className="w-full" />
            </div>
          </div>
          {p.tag && (
            <span
              className={`absolute top-2.5 left-2.5 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                /−|%/.test(p.tag)
                  ? 'bg-accent text-white'
                  : p.tag === 'Novo'
                    ? 'bg-ink text-white'
                    : 'bg-white/95 text-ink shadow-xs'
              }`}
            >
              {p.tag}
            </span>
          )}
          {addable && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                addItem(p.id)
              }}
              aria-label={`Adicionar ${p.name} ao carrinho`}
              className="absolute right-2.5 bottom-2.5 flex h-9 items-center gap-1.5 rounded-md bg-white/95 px-2.5 text-[12px] font-semibold text-ink opacity-0 shadow-xs transition-all duration-200 group-hover:opacity-100 hover:bg-ink hover:text-white"
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Add
            </button>
          )}
        </FauxPhoto>
      </Link>
      <div className="flex flex-1 flex-col px-0.5 pt-3">
        <p className="truncate text-[13px] font-medium">{p.name}</p>
        <p className="text-[11px] text-muted">{p.detail}</p>
        <p className="mt-1.5 text-sm font-semibold tabular-nums">
          {p.full && (
            <span className="mr-1.5 text-[11px] font-normal text-muted/60 line-through">{fmt(p.full)}</span>
          )}
          {fmt(p.price)}
        </p>
      </div>
    </article>
  )
}
