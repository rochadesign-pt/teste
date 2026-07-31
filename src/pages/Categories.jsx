import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { shopCategories, countByCat, shopProducts } from '../data/catalog'
import { Placeholder } from '../components/Placeholder'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1600px] px-6 lg:px-10'

export function Categories() {
  const total = shopProducts.length
  return (
    <main className="pt-[140px]">
      {/* header */}
      <section className="border-b border-line bg-white">
        <div className={`${WRAP} py-12`}>
          <nav className="mb-4 flex items-center gap-1.5 text-[12px] text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-ink">Início</Link>
            <span>/</span>
            <span className="text-ink">Categorias</span>
          </nav>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep">CATÁLOGO COMPLETO</p>
              <h1 className="font-display text-4xl font-semibold sm:text-5xl">Todas as categorias</h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                Higiene e limpeza profissional organizada por área de utilização. Mais de {total}
                {' '}referências em stock, com apoio técnico especializado e 14 unidades em Portugal.
              </p>
            </div>
            <div className="flex shrink-0 gap-8">
              <div>
                <p className="font-display text-3xl font-semibold">{shopCategories.length}</p>
                <p className="text-[12px] text-muted">categorias</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold">14</p>
                <p className="text-[12px] text-muted">lojas em PT</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold">24–48h</p>
                <p className="text-[12px] text-muted">expedição</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* grid */}
      <section className={`${WRAP} py-12`}>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {shopCategories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.5, ease: EASE, delay: (i % 4) * 0.05 }}
            >
              <Link to={`/categoria/${c.slug}`} className="group block">
                <Placeholder zoom className="aspect-[4/3] border border-line shadow-xs">
                  <span className="absolute top-3 left-3 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-medium text-ink backdrop-blur">
                    {countByCat(c.slug)} produtos
                  </span>
                  <span className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-xs transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                    <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Placeholder>
                <div className="pt-3.5">
                  <p className="text-base font-semibold group-hover:text-accent-deep">{c.title}</p>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-muted">{c.text}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
