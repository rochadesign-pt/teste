import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { articles } from '../data/content'
import { Placeholder } from '../components/Placeholder'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1280px] px-6 lg:px-10'

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 0.5, ease: EASE },
}

function Meta({ a }) {
  return (
    <span className="text-[12px] text-muted">
      {a.date} · {a.read} de leitura
    </span>
  )
}

export function Blog() {
  const featured = articles.find((a) => a.featured) || articles[0]
  const rest = articles.filter((a) => a.slug !== featured.slug)
  return (
    <main className="pt-[140px]">
      {/* hero */}
      <section className="border-b border-line bg-white">
        <div className={`${WRAP} py-12`}>
          <nav className="mb-4 flex items-center gap-1.5 text-[12px] text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-ink">Início</Link>
            <span>/</span>
            <span className="text-ink">Blog</span>
          </nav>
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep uppercase">Blog &amp; notícias</p>
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">Higiene profissional, na prática</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Guias, boas práticas e novidades de quem conhece a operação por dentro.
          </p>
        </div>
      </section>

      {/* featured */}
      <section className={`${WRAP} py-12`}>
        <motion.div {...reveal}>
          <Link to={`/blog/${featured.slug}`} className="group grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
            <Placeholder zoom className="aspect-[16/10] border border-line shadow-xs" rounded="rounded-2xl">
              <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white">{featured.category}</span>
            </Placeholder>
            <div className="flex flex-col justify-center">
              <Meta a={featured} />
              <h2 className="font-display mt-2 text-2xl leading-tight font-semibold sm:text-4xl group-hover:text-accent-deep">{featured.title}</h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">{featured.excerpt}</p>
              <span className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent-deep">
                Ler artigo
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* grid */}
      <section className={`${WRAP} pb-24`}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <motion.article key={a.slug} {...reveal} transition={{ ...reveal.transition, delay: (i % 3) * 0.06 }}>
              <Link to={`/blog/${a.slug}`} className="group block">
                <Placeholder zoom className="aspect-[16/10] border border-line" rounded="rounded-xl">
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-ink backdrop-blur">{a.category}</span>
                </Placeholder>
                <div className="pt-4">
                  <Meta a={a} />
                  <h3 className="font-display mt-1.5 text-lg leading-snug font-semibold group-hover:text-accent-deep">{a.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">{a.excerpt}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  )
}
