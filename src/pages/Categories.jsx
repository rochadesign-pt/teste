import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { shopCategories, countByCat } from '../data/catalog'
import { FauxPhoto } from '../components/FauxPhoto'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1600px] px-6 lg:px-10'

export function Categories() {
  return (
    <main className="pt-[140px]">
      {/* header */}
      <section className="border-b border-line bg-white">
        <div className={`${WRAP} py-10`}>
          <nav className="mb-4 flex items-center gap-1.5 text-[12px] text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-ink">Início</Link>
            <span>/</span>
            <span className="text-ink">Categorias</span>
          </nav>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">Todas as categorias</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            O catálogo completo de higiene e limpeza profissional, organizado por
            área de utilização. {shopCategories.length} categorias.
          </p>
        </div>
      </section>

      {/* grid */}
      <section className={`${WRAP} py-12`}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {shopCategories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.5, ease: EASE, delay: (i % 4) * 0.05 }}
            >
              <Link to={`/categoria/${c.slug}`} className="group block">
                <FauxPhoto scene={c.scene} subject={c.subject} zoom className="aspect-[4/3] rounded-xl shadow-xs">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
                    <div>
                      <p className="text-base font-semibold">{c.title}</p>
                      <p className="text-[11px] text-white/70">{countByCat(c.slug)} produtos</p>
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15 backdrop-blur transition-colors duration-200 group-hover:bg-accent">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </FauxPhoto>
                <div className="px-1 pt-3">
                  <p className="text-[13px] leading-snug text-muted">{c.text}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
