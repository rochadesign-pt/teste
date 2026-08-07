import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { manifesto } from '../data/content'
import { Placeholder } from '../components/Placeholder'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1100px] px-6 lg:px-10'

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 0.55, ease: EASE },
}

export function Manifesto() {
  const m = manifesto
  return (
    <main className="pt-[140px]">
      {/* hero */}
      <section className={`${WRAP} pt-8 pb-14`}>
        <nav className="mb-6 flex items-center gap-1.5 text-[12px] text-muted" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink">Início</Link>
          <span>/</span>
          <span className="text-ink">Manifesto</span>
        </nav>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="text-[11px] font-medium tracking-[0.18em] text-accent-deep uppercase">
          {m.kicker}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="font-display mt-4 max-w-[16ch] text-[2.6rem] leading-[1.02] font-semibold sm:text-6xl"
        >
          {m.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.16 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted"
        >
          {m.lead}
        </motion.p>
      </section>

      {/* atmosphere band */}
      <section className={WRAP}>
        <motion.div {...reveal}>
          <Placeholder className="aspect-[21/9] border border-line shadow-xs" rounded="rounded-2xl">
            <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-medium text-ink backdrop-blur">
              Fabricado em Portugal · testado em operação real
            </span>
          </Placeholder>
        </motion.div>
      </section>

      {/* tenets */}
      <section className={`${WRAP} py-20`}>
        <motion.h2 {...reveal} className="font-display mb-10 max-w-lg text-2xl font-semibold sm:text-3xl">
          Aquilo em que acreditamos
        </motion.h2>
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
          {m.tenets.map((t, i) => (
            <motion.div key={t.n} {...reveal} transition={{ ...reveal.transition, delay: (i % 2) * 0.06 }} className="border-t border-line pt-5">
              <p className="font-display text-sm font-semibold text-accent-deep tabular-nums">{t.n}</p>
              <h3 className="mt-2 text-lg font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* story band */}
      <section className="bg-ink text-white">
        <div className={`${WRAP} py-20`}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <motion.div {...reveal}>
              <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent uppercase">{m.story.eyebrow}</p>
              <h2 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">{m.story.title}</h2>
            </motion.div>
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }} className="space-y-4">
              {m.story.paras.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-white/70">{p}</p>
              ))}
            </motion.div>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4">
            {m.stats.map((s) => (
              <motion.div key={s.label} {...reveal}>
                <p className="font-display text-3xl font-semibold sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-[12px] text-white/50">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* sectors */}
      <section className={`${WRAP} py-16`}>
        <motion.div {...reveal} className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">Ao lado de</span>
          {m.sectors.map((s) => (
            <span key={s} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium">{s}</span>
          ))}
        </motion.div>
      </section>

      {/* closing */}
      <section className={`${WRAP} pb-24`}>
        <motion.div {...reveal} className="rounded-2xl bg-accent-soft/70 p-10 text-center sm:p-14">
          <h2 className="font-display mx-auto max-w-2xl text-2xl leading-tight font-semibold sm:text-4xl">{m.closing.title}</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted">{m.closing.text}</p>
          <Link to="/contactos" className="mt-7 inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-accent-deep">
            {m.closing.cta}
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
