import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { careers, jobAreas, jobLocations } from '../data/content'
import { Placeholder } from '../components/Placeholder'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1100px] px-6 lg:px-10'

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 0.5, ease: EASE },
}

const ICONS = {
  learn: 'M1.5 6 8 3l6.5 3L8 9zM4 7.5v3.5c1 1 2.5 1.5 4 1.5s3-.5 4-1.5V7.5',
  grow: 'M2 13.5h12M3.5 11l3-3 2.5 2 4-5M10 5h3v3',
  health: 'M8 13.5S2 10 2 6a3 3 0 0 1 6-1 3 3 0 0 1 6 1c0 4-6 7.5-6 7.5z',
  car: 'M2.5 10.5V8l1.5-3.5h8L13.5 8v2.5zM2.5 10.5v2h2v-2M11.5 10.5v2h2v-2M5 8h6',
  gift: 'M2.5 6h11v2.5h-11zM3.5 8.5h9v5h-9zM8 6v7.5M8 6S6.5 2.5 5 3.5 6 6 8 6zm0 0s1.5-3.5 3-2.5S10 6 8 6z',
  pin: 'M8 14.5s5-4.5 5-8.5A5 5 0 0 0 3 6c0 4 5 8.5 5 8.5z M8 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
}

function Icon({ name }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d={ICONS[name] || ICONS.pin} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 150, behavior: 'smooth' })
}

const SPONTANEOUS = 'Candidatura espontânea'
const field = 'h-11 rounded-full border border-line bg-white px-4 text-sm outline-none transition-colors focus:border-accent'

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-9 rounded-full border px-4 text-[13px] font-medium transition-colors ${active ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink/30'}`}
    >
      {children}
    </button>
  )
}

function JobRow({ job, open, onToggle, onApply }) {
  const reduce = useReducedMotion()
  return (
    <div className="rounded-2xl border border-line bg-white transition-colors hover:border-ink/20">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div>
          <p className="text-[11px] font-medium tracking-[0.12em] text-accent-deep uppercase">{job.area}</p>
          <h3 className="mt-1 text-base font-semibold sm:text-lg">{job.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-page px-3 py-1 text-[12px] font-medium">{job.location}</span>
          <span className="rounded-full bg-page px-3 py-1 text-[12px] font-medium">{job.type}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25, ease: EASE }} className="ml-2 text-lg opacity-40" aria-hidden="true">+</motion.span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0.1 : 0.35, ease: EASE }} className="overflow-hidden">
            <div className="border-t border-line px-5 pt-5 pb-6">
              <p className="max-w-2xl text-sm leading-relaxed text-muted">{job.summary}</p>
              <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[['O que vais fazer', job.tasks], ['O que procuramos', job.profile]].map(([title, list]) => (
                  <div key={title}>
                    <p className="text-[11px] font-medium tracking-[0.12em] text-muted uppercase">{title}</p>
                    <ul className="mt-2 space-y-1.5">
                      {list.map((t) => (
                        <li key={t} className="flex gap-2.5 text-sm">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onApply(job)}
                className="mt-6 inline-flex h-11 items-center gap-2.5 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
              >
                Candidatar-me
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FaqItem({ q, a, open, onToggle }) {
  const reduce = useReducedMotion()
  return (
    <div className="border-b border-line">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-start justify-between gap-4 py-5 text-left">
        <span className="text-[15px] font-medium">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25, ease: EASE }} className="mt-0.5 text-lg opacity-40" aria-hidden="true">+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0.1 : 0.35, ease: EASE }} className="overflow-hidden">
            <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Careers() {
  const c = careers
  const reduce = useReducedMotion()
  const [area, setArea] = useState('Todas')
  const [location, setLocation] = useState('Todas')
  const [openJob, setOpenJob] = useState(null)
  const [openFaq, setOpenFaq] = useState(0)
  const [role, setRole] = useState(SPONTANEOUS)
  const [done, setDone] = useState(false)
  const [cv, setCv] = useState('')

  const jobs = useMemo(
    () => c.jobs.filter((j) => (area === 'Todas' || j.area === area) && (location === 'Todas' || j.location === location)),
    [c.jobs, area, location],
  )

  const apply = (job) => {
    setRole(job.title + ' · ' + job.location)
    setDone(false)
    scrollToId('candidatura')
  }

  return (
    <main className="pt-[140px]">
      {/* hero */}
      <section className={`${WRAP} pt-8 pb-14`}>
        <nav className="mb-6 flex items-center gap-1.5 text-[12px] text-muted" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink">Início</Link>
          <span>/</span>
          <span className="text-ink">Recrutamento</span>
        </nav>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="text-[11px] font-medium tracking-[0.18em] text-accent-deep uppercase">
              {c.kicker}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              className="font-display mt-4 max-w-[18ch] text-[2.6rem] leading-[1.02] font-semibold sm:text-6xl"
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
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.24 }} className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => scrollToId('vagas')} className="inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-accent-deep">
                Ver {c.jobs.length} vagas abertas
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              </button>
              <Link to="/cultura" className="inline-flex h-12 items-center rounded-full border border-line bg-white px-7 text-sm font-semibold transition-colors hover:border-ink">
                Conhecer a cultura
              </Link>
            </motion.div>
          </div>
          <motion.div {...reveal}>
            <Placeholder className="aspect-[4/5] border border-line shadow-xs" rounded="rounded-2xl">
              <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-medium text-ink backdrop-blur">
                14 unidades · de norte a sul e ilhas
              </span>
            </Placeholder>
          </motion.div>
        </div>
      </section>

      {/* perks */}
      <section className="border-y border-line bg-white">
        <div className={`${WRAP} py-16`}>
          <motion.h2 {...reveal} className="font-display mb-10 max-w-lg text-2xl font-semibold sm:text-3xl">
            O que oferecemos
          </motion.h2>
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.perks.map((p, i) => (
              <motion.div key={p.title} {...reveal} transition={{ ...reveal.transition, delay: (i % 3) * 0.05 }} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
                  <Icon name={p.icon} />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* open roles */}
      <section id="vagas" className={`${WRAP} py-20`}>
        <motion.div {...reveal} className="mb-8">
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep uppercase">Vagas abertas</p>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Encontra o teu lugar na equipa</h2>
        </motion.div>

        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 w-16 text-[11px] font-medium tracking-[0.12em] text-muted uppercase">Área</span>
            {['Todas', ...jobAreas].map((a) => (
              <Chip key={a} active={area === a} onClick={() => { setArea(a); setOpenJob(null) }}>{a}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 w-16 text-[11px] font-medium tracking-[0.12em] text-muted uppercase">Local</span>
            {['Todas', ...jobLocations].map((l) => (
              <Chip key={l} active={location === l} onClick={() => { setLocation(l); setOpenJob(null) }}>{l}</Chip>
            ))}
          </div>
        </div>

        <p className="mb-3 text-[13px] text-muted" aria-live="polite">
          {jobs.length} {jobs.length === 1 ? 'vaga' : 'vagas'}
        </p>
        <div className="space-y-3">
          {jobs.map((j) => (
            <JobRow key={j.id} job={j} open={openJob === j.id} onToggle={() => setOpenJob(openJob === j.id ? null : j.id)} onApply={apply} />
          ))}
          {jobs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-line bg-white p-8 text-center">
              <p className="text-sm font-medium">Sem vagas para esta combinação, por agora.</p>
              <p className="mt-1 text-sm text-muted">Envia uma candidatura espontânea — guardamos o teu CV para a próxima oportunidade.</p>
              <button type="button" onClick={() => { setRole(SPONTANEOUS); scrollToId('candidatura') }} className="mt-4 text-[13px] font-medium text-accent-deep hover:underline">
                Candidatura espontânea →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* process */}
      <section className="bg-ink text-white">
        <div className={`${WRAP} py-20`}>
          <motion.div {...reveal} className="mb-12">
            <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent uppercase">O processo</p>
            <h2 className="font-display max-w-xl text-3xl leading-tight font-semibold sm:text-4xl">Simples, transparente e com resposta garantida</h2>
          </motion.div>
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.process.map((s, i) => (
              <motion.li key={s.n} {...reveal} transition={{ ...reveal.transition, delay: i * 0.06 }} className="border-t border-white/15 pt-5">
                <p className="font-display text-sm font-semibold text-accent tabular-nums">{s.n}</p>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* application form + faq */}
      <section className={`${WRAP} py-20`}>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <motion.div {...reveal} id="candidatura">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Enviar candidatura</h2>
            <p className="mt-2 text-sm text-muted">Escolhe uma vaga ou deixa o teu CV para futuras oportunidades.</p>
            <form onSubmit={(e) => { e.preventDefault(); setDone(true) }} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <select
                aria-label="Vaga"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`${field} appearance-none sm:col-span-2`}
              >
                <option value={SPONTANEOUS}>{SPONTANEOUS}</option>
                {c.jobs.map((j) => {
                  const v = j.title + ' · ' + j.location
                  return <option key={j.id} value={v}>{v}</option>
                })}
              </select>
              <input required placeholder="Nome completo" aria-label="Nome completo" className={field} />
              <input required type="email" placeholder="Email" aria-label="Email" className={field} />
              <input placeholder="Telefone" aria-label="Telefone" className={field} />
              <select aria-label="Região preferida" defaultValue="" className={`${field} appearance-none`}>
                <option value="" disabled>Região preferida</option>
                {['Norte', 'Centro', 'Lisboa e Vale do Tejo', 'Alentejo', 'Algarve', 'Ilhas', 'Indiferente'].map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-line bg-white px-4 py-4 text-sm transition-colors hover:border-accent sm:col-span-2">
                <span>
                  <span className="font-medium">{cv ? 'CV anexado' : 'Anexar CV'}</span>
                  <span className="block text-[12px] text-muted">{cv || 'PDF ou DOCX, até 5 MB'}</span>
                </span>
                <span className="shrink-0 rounded-full bg-page px-3.5 py-1.5 text-[12px] font-medium">{cv ? 'Trocar' : 'Escolher ficheiro'}</span>
                <input required type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCv(e.target.files?.[0]?.name || '')} className="sr-only" />
              </label>
              <textarea rows={4} placeholder="Conta-nos, em poucas linhas, porque queres juntar-te à equipa (opcional)" aria-label="Mensagem" className="rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-accent sm:col-span-2" />
              <div className="sm:col-span-2">
                <motion.button
                  type="submit"
                  whileTap={reduce ? {} : { scale: 0.98 }}
                  className="inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
                >
                  {done ? 'Candidatura enviada ✓' : 'Enviar candidatura'}
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                </motion.button>
                <p className="mt-3 text-[11px] text-muted">Os teus dados são usados apenas neste processo de recrutamento e guardados por um máximo de 2 anos.</p>
              </div>
            </form>
          </motion.div>

          <motion.aside {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
            <h2 className="font-display text-xl font-semibold">Perguntas de candidatos</h2>
            <div className="mt-3 border-t border-line">
              {c.faq.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">
              Outra dúvida?{' '}
              <Link to="/contactos" className="font-medium text-accent-deep hover:underline">Fala connosco</Link>
            </p>
          </motion.aside>
        </div>
      </section>
    </main>
  )
}
