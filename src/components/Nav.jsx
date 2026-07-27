import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Nav({ cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-cream/85 shadow-[0_1px_0_rgba(22,36,28,0.08)] backdrop-blur-md' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-12">
        <a href="#" className="flex items-baseline gap-2 text-ink">
          <span className="font-display text-xl font-black tracking-tight">
            MISTOLIN
          </span>
          <span className="rounded-full bg-orange px-2 py-0.5 text-[11px] font-bold text-cream">
            PRO
          </span>
        </a>

        <ul className="hidden items-center gap-8 text-sm font-semibold text-ink md:flex">
          {['Produtos', 'Soluções', 'Sustentabilidade', 'Contactos'].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="opacity-70 transition-opacity duration-200 hover:opacity-100"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Pesquisar"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-cream/60 text-ink transition-colors duration-200 hover:bg-ink hover:text-cream md:flex"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M11.5 11.5 15 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-green"
          >
            Carrinho
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange text-[11px] font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </nav>
    </motion.header>
  )
}
