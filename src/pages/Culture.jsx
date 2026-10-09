import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { culture } from '../data/content'
import { Placeholder } from '../components/Placeholder'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1100px] px-6 lg:px-10'

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 0.55, ease: EASE },
}

export function Culture() {
  const c = culture
  return (
    <main className="pt-[140px]">
      {/* hero */}
      <section className={`${WRAP} pt-8 pb-14`}>
        <nav className="mb-6 flex items-center gap-1.5 text-[12px] text-muted" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink">Início</Link>
          <span>/</span>
          <span className="text-ink">Cultura</span>
        </nav>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="text-[11px] font-medium tracking-[0.18em] text-accent-deep uppercase">
          {c.kicker}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="font-display mt-4 max-w-[20ch] text-[2.6rem] leading-[1.02] font-semibold sm:text-6xl"
        >
          {c.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.16 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted"
        >
          {c.lead}
        </motion.p>
      </section>

      {/* photo mosaic */}
      <section className={WRAP}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2">
          <motion.div {...reveal} className="col-span-2 sm:row-span-2">
            <Placeholder className="aspect-[4/3] h-full border border-line shadow-xs sm:aspect-auto" rounded="rounded-2xl">
              <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-medium text-ink backdrop-blur">
                Encontro anual da rede · Vagos
              </span>
            </Placeholder>
          </motion.div>
          {['Laboratório de I&D', 'Formação no terreno', 'Armazém', 'Loja · Porto'].map((label, i) => (
            <motion.div key={label} {...reveal} transition={{ ...reveal.transition, delay: 0.05 * (i + 1) }}>
              <Placeholder className="aspect-square border border-line" rounded="rounded-2xl">
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-ink backdrop-blur">{label}</span>
              </Placeholder>
            </motion.div>
          ))}
        </div>
      </section>

      {/* values */}
      <section className={`${WRAP} py-20`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div {...reveal}>
            <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep uppercase">Como trabalhamos</p>
            <h2 className="font-display max-w-sm text-2xl leading-tight font-semibold sm:text-3xl">Quatro coisas que esperamos de ti — e que podes esperar de nós</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Não são frases para a parede. São os critérios com que contratamos, avaliamos e decidimos — e que também podes exigir-nos.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {c.values.map((v, i) => (
              <motion.div key={v.n} {...reveal} transition={{ ...reveal.transition, delay: (i % 2) * 0.06 }} className="border-t border-line pt-5">
                <p className="font-display text-sm font-semibold text-accent-deep tabular-nums">{v.n}</p>
                <h3 className="mt-2 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* voices */}
      <section className="bg-ink text-white">
        <div className={`${WRAP} py-20`}>
          <motion.div {...reveal} className="mb-12">
            <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent uppercase">Na primeira pessoa</p>
            <h2 className="font-display max-w-xl text-3xl leading-tight font-semibold sm:text-4xl">Como é, de facto, trabalhar aqui</h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {c.quotes.map((q, i) => (
              <motion.figure key={q.role} {...reveal} transition={{ ...reveal.transition, delay: i * 0.06 }} className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <blockquote className="text-[15px] leading-relaxed text-white/85">“{q.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Placeholder className="h-9 w-9 shrink-0" rounded="rounded-full" />
                  <span className="text-[12px] text-white/55">{q.role}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4">
            {c.stats.map((s) => (
              <motion.div key={s.label} {...reveal}>
                <p className="font-display text-3xl font-semibold sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-[12px] text-white/50">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* rituals */}
      <section className={`${WRAP} py-20`}>
        <motion.div {...reveal} className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep uppercase">No dia a dia</p>
            <h2 className="font-display max-w-lg text-2xl font-semibold sm:text-3xl">Os rituais que nos mantêm próximos</h2>
          </div>
          <Link to="/manifesto" className="text-[13px] font-medium text-accent-deep hover:underline">Ler o manifesto →</Link>
        </motion.div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {c.rituals.map((r, i) => (
            <motion.div key={r.title} {...reveal} transition={{ ...reveal.transition, delay: (i % 2) * 0.05 }} className="flex gap-5 rounded-2xl border border-line bg-white p-5">
              <Placeholder className="aspect-square w-24 shrink-0 sm:w-28" rounded="rounded-xl" />
              <div>
                <h3 className="text-base font-semibold">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* closing */}
      <section className={`${WRAP} pb-24`}>
        <motion.div {...reveal} className="rounded-2xl bg-accent-soft/70 p-10 text-center sm:p-14">
          <h2 className="font-display mx-auto max-w-2xl text-2xl leading-tight font-semibold sm:text-4xl">{c.closing.title}</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted">{c.closing.text}</p>
          <Link to="/recrutamento" className="mt-7 inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-accent-deep">
            {c.closing.cta}
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
