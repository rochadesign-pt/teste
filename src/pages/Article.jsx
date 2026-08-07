import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getArticle, articles } from '../data/content'
import { Placeholder } from '../components/Placeholder'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[760px] px-6'

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 0.5, ease: EASE },
}

export function Article() {
  const { slug } = useParams()
  const a = getArticle(slug)

  if (!a) {
    return (
      <main className="pt-[140px] pb-24 text-center">
        <p className="text-sm text-muted">Artigo não encontrado.</p>
        <Link to="/blog" className="mt-4 inline-block text-sm font-medium text-accent-deep hover:underline">Ver o blog →</Link>
      </main>
    )
  }

  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3)

  return (
    <main className="pt-[140px]">
      {/* header */}
      <article>
        <header className={`${WRAP} pt-8`}>
          <nav className="mb-6 flex items-center gap-1.5 text-[12px] text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-ink">Início</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-ink">Blog</Link>
            <span>/</span>
            <span className="text-ink">{a.category}</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE }}>
            <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold text-accent-deep">{a.category}</span>
            <h1 className="font-display mt-4 text-3xl leading-[1.08] font-semibold sm:text-[2.6rem]">{a.title}</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{a.excerpt}</p>
            <div className="mt-6 flex items-center gap-3 border-y border-line py-4 text-[13px]">
              <span className="font-medium">{a.author}</span>
              <span className="text-muted">·</span>
              <span className="text-muted">{a.date}</span>
              <span className="text-muted">·</span>
              <span className="text-muted">{a.read} de leitura</span>
            </div>
          </motion.div>
        </header>

        {/* cover */}
        <div className="mx-auto mt-8 max-w-[980px] px-6">
          <motion.div {...reveal}>
            <Placeholder className="aspect-[16/8] border border-line shadow-xs" rounded="rounded-2xl" />
          </motion.div>
        </div>

        {/* body */}
        <div className={`${WRAP} py-12`}>
          <div className="space-y-6">
            {a.body.map((block, i) => {
              if (block.h) return <h2 key={i} className="font-display pt-2 text-xl font-semibold sm:text-2xl">{block.h}</h2>
              if (block.quote)
                return (
                  <blockquote key={i} className="border-l-2 border-accent pl-5 font-display text-xl leading-snug font-medium text-ink sm:text-2xl">
                    “{block.quote}”
                  </blockquote>
                )
              return <p key={i} className="text-[15.5px] leading-[1.75] text-ink/80">{block.p}</p>
            })}
          </div>

          {/* share / back */}
          <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
            <Link to="/blog" className="text-sm font-medium text-accent-deep hover:underline">← Voltar ao blog</Link>
            <span className="text-[12px] text-muted">Mistolin PRO</span>
          </div>
        </div>
      </article>

      {/* related */}
      <section className="border-t border-line bg-page">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10">
          <h2 className="font-display mb-6 text-2xl font-semibold">Continuar a ler</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} to={`/blog/${r.slug}`} className="group block">
                <Placeholder zoom className="aspect-[16/10] border border-line" rounded="rounded-xl">
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-ink backdrop-blur">{r.category}</span>
                </Placeholder>
                <div className="pt-3.5">
                  <span className="text-[12px] text-muted">{r.date}</span>
                  <h3 className="font-display mt-1 text-base leading-snug font-semibold group-hover:text-accent-deep">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
