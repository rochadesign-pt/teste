import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { contact } from '../data/content'

const EASE = [0.32, 0.72, 0, 1]
const WRAP = 'mx-auto max-w-[1100px] px-6 lg:px-10'

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 0.5, ease: EASE },
}

const ICONS = {
  phone: 'M3 3.5c0 5 4.5 9.5 9.5 9.5l-.2-2.4-2.6-.6-1 1.2A8 8 0 0 1 5.3 6.3l1.2-1-.6-2.6L3.5 2.5C3.5 2.8 3 3 3 3.5z',
  mail: 'M1.5 4h13v8h-13zM1.5 4.5 8 9l6.5-4.5',
  doc: 'M4 1.5h5l3 3v9.5H4zM9 1.5V5h3',
  pin: 'M8 14.5s5-4.5 5-8.5A5 5 0 0 0 3 6c0 4 5 8.5 5 8.5z M8 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
}

function ChannelIcon({ name }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d={ICONS[name] || ICONS.pin} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const field = 'h-11 rounded-full border border-line bg-white px-4 text-sm outline-none transition-colors focus:border-accent'

export function Contacts() {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)

  return (
    <main className="pt-[140px]">
      {/* hero */}
      <section className="border-b border-line bg-white">
        <div className={`${WRAP} py-12`}>
          <nav className="mb-4 flex items-center gap-1.5 text-[12px] text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-ink">Início</Link>
            <span>/</span>
            <span className="text-ink">Contactos</span>
          </nav>
          <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-accent-deep uppercase">Fale connosco</p>
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">Contactos</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{contact.lead}</p>
        </div>
      </section>

      {/* channels */}
      <section className={`${WRAP} py-12`}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contact.channels.map((c, i) => {
            const inner = (
              <>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
                  <ChannelIcon name={c.icon} />
                </span>
                <p className="mt-4 text-[11px] font-medium tracking-[0.12em] text-muted uppercase">{c.title}</p>
                <p className="mt-1 text-sm font-semibold text-ink">{c.value}</p>
                <p className="mt-0.5 text-[12px] text-muted">{c.note}</p>
              </>
            )
            const cls = 'block rounded-2xl border border-line bg-white p-5 transition-colors hover:border-ink/25'
            return (
              <motion.div key={c.title} {...reveal} transition={{ ...reveal.transition, delay: (i % 4) * 0.05 }}>
                {c.to ? <Link to={c.to} className={cls}>{inner}</Link> : <div className={cls}>{inner}</div>}
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* form + info */}
      <section className={`${WRAP} pb-20`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          {/* form */}
          <motion.div {...reveal}>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Envie-nos uma mensagem</h2>
            <p className="mt-2 text-sm text-muted">Preencha o formulário e a equipa certa entra em contacto consigo.</p>
            <form onSubmit={(e) => { e.preventDefault(); setDone(true) }} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input required placeholder="Nome" aria-label="Nome" className={field} />
              <input placeholder="Empresa" aria-label="Empresa" className={field} />
              <input required type="email" placeholder="Email profissional" aria-label="Email" className={field} />
              <input placeholder="Telefone" aria-label="Telefone" className={field} />
              <select aria-label="Assunto" className={`${field} sm:col-span-2 appearance-none`} defaultValue="">
                <option value="" disabled>Assunto</option>
                {contact.subjects.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <textarea required rows={5} placeholder="Mensagem" aria-label="Mensagem" className="rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-accent sm:col-span-2" />
              <div className="sm:col-span-2">
                <motion.button
                  type="submit"
                  whileTap={reduce ? {} : { scale: 0.98 }}
                  className="inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
                >
                  {done ? 'Mensagem enviada ✓' : 'Enviar mensagem'}
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                </motion.button>
                <p className="mt-3 text-[11px] text-muted">Ao enviar, aceita ser contactado pela nossa equipa. Não partilhamos os seus dados.</p>
              </div>
            </form>
          </motion.div>

          {/* info */}
          <motion.aside {...reveal} transition={{ ...reveal.transition, delay: 0.08 }} className="space-y-8">
            <div>
              <p className="text-[11px] font-medium tracking-[0.12em] text-muted uppercase">{contact.hq.title}</p>
              {contact.hq.lines.map((l, i) => (
                <p key={i} className={i === 0 ? 'mt-2 text-sm font-semibold' : 'text-sm text-muted'}>{l}</p>
              ))}
              <Link to="/lojas" className="mt-3 inline-block text-[13px] font-medium text-accent-deep hover:underline">Ver as 14 unidades →</Link>
            </div>
            <div>
              <p className="text-[11px] font-medium tracking-[0.12em] text-muted uppercase">Horário</p>
              <ul className="mt-2 space-y-1.5">
                {contact.hours.map((h) => (
                  <li key={h.d} className="flex justify-between gap-4 text-sm">
                    <span className="text-muted">{h.d}</span>
                    <span className="font-medium">{h.h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-medium tracking-[0.12em] text-muted uppercase">Siga-nos</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {contact.social.map((s) => (
                  <a key={s} href="#" className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[12px] font-medium transition-colors hover:border-ink">{s}</a>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  )
}
