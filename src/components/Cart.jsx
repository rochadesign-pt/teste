import { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { product, catalog } from '../data/product'
import { equipmentCatalog } from '../data/equipment'
import { PayIcons } from './PayIcons'

const EASE = [0.32, 0.72, 0, 1]

// merged lookup: consumables (formats/kits/bundles/combos) + equipment kits
const CATALOG = { ...catalog, ...equipmentCatalog }

const fmt = (n) => `${n.toFixed(2).replace('.', ',')} €`

function Thumb({ dark, equip }) {
  if (equip) {
    return (
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-page text-ink/40">
        <svg viewBox="0 0 16 16" fill="none" className="h-8 w-8" aria-hidden="true">
          <path d="M2.5 5.5 8 2.5l5.5 3v5L8 13.5 2.5 10.5v-5z M2.5 5.5 8 8.5l5.5-3 M8 8.5v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#e7eaea] text-[#c3cbcb]">
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden="true">
        <rect x="6" y="8" width="36" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="19" r="3.5" stroke="currentColor" strokeWidth="2" />
        <path d="M9 34l9-9 7 7 5-5 9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export function Cart({ open, onClose, items, setQty, removeItem, addItem, swapItem }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const count = items.reduce((s, it) => s + it.qty, 0)
  const subtotal = items.reduce((s, it) => s + (it.price ?? CATALOG[it.id]?.price ?? 0) * it.qty, 0)
  const missing = Math.max(0, product.freeShippingFrom - subtotal)
  const progress = Math.min(1, subtotal / product.freeShippingFrom)

  // upsell: nudge single 750ml buyers towards the pack
  const has750 = items.some((it) => it.id === '750ml')
  const hasPack = items.some((it) => it.id === 'Pack Tiragorduras')
  const pack = catalog['Pack Tiragorduras']
  const showUpsell = has750 && !hasPack

  // cross-sell: complementary products not yet in cart
  const crossSell = product.combos.filter((c) => !items.some((it) => it.id === c.code))

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/35 backdrop-blur-[2px]"
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: reduce ? 0 : '100%', opacity: reduce ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: reduce ? 0 : '100%', opacity: reduce ? 0 : 1 }}
            transition={{ duration: 0.45, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Carrinho de compras"
            className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl sm:rounded-l-3xl"
          >
            {/* header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <h2 className="font-display text-2xl font-medium">
                Carrinho
                <sup className="ml-1 text-xs font-normal opacity-50">{count}</sup>
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar carrinho"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 hover:bg-page"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* secure payment strip */}
            <div className="flex items-center justify-between gap-3 border-y border-line px-6 py-3">
              <div>
                <p className="text-[10px] font-medium tracking-[0.14em]">PAGAMENTO SEGURO</p>
                <p className="mt-0.5 text-[11px] opacity-50">
                  Visa, Mastercard, MB Way, Multibanco, PayPal
                </p>
              </div>
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true" className="shrink-0 text-accent-deep">
                <path d="M8 1l6 2.2v4.6c0 4-2.6 6.8-6 8-3.4-1.2-6-4-6-8V3.2L8 1z" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5.5 8.8l1.8 1.8 3.4-3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <p className="text-sm opacity-60">O seu carrinho está vazio.</p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-deep"
                  >
                    Explorar produtos
                  </button>
                </div>
              ) : (
                <>
                  {/* free shipping progress */}
                  <div className="pt-4">
                    <p className="text-xs">
                      {missing > 0 ? (
                        <>
                          Faltam <strong className="font-semibold text-accent-deep">{fmt(missing)}</strong> para{' '}
                          <strong className="font-semibold">envio grátis</strong>
                        </>
                      ) : (
                        <strong className="font-semibold text-accent-deep">✓ Envio grátis desbloqueado</strong>
                      )}
                    </p>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-page">
                      <motion.div
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                  </div>

                  {/* line items */}
                  <ul className="divide-y divide-line">
                    {items.map((it) => {
                      const base = CATALOG[it.id]
                      const p = {
                        name: it.name ?? base?.name,
                        detail: it.detail ?? base?.detail,
                        price: it.price ?? base?.price,
                        kind: it.kind ?? base?.kind,
                      }
                      if (p.name == null || p.price == null) return null
                      return (
                        <motion.li
                          key={it.id}
                          layout={reduce ? false : true}
                          initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="flex gap-4 py-5"
                        >
                          <Thumb dark={p.kind === 'bundle'} equip={typeof p.kind === 'string' && p.kind.startsWith('equip')} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm leading-snug font-medium">{p.name}</p>
                              <p className="text-sm font-medium tabular-nums">{fmt(p.price * it.qty)}</p>
                            </div>
                            <p className="mt-0.5 truncate text-xs opacity-50">{p.detail}</p>
                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center rounded-full border border-line">
                                <button
                                  type="button"
                                  aria-label="Diminuir quantidade"
                                  onClick={() => setQty(it.id, it.qty - 1)}
                                  className="flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-60"
                                >
                                  −
                                </button>
                                <span className="w-6 text-center text-sm tabular-nums">{it.qty}</span>
                                <button
                                  type="button"
                                  aria-label="Aumentar quantidade"
                                  onClick={() => setQty(it.id, it.qty + 1)}
                                  className="flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-60"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(it.id)}
                                className="text-[11px] font-medium tracking-[0.08em] opacity-40 transition-opacity duration-200 hover:opacity-100"
                              >
                                REMOVER
                              </button>
                            </div>
                          </div>
                        </motion.li>
                      )
                    })}
                  </ul>

                  {/* upsell */}
                  <AnimatePresence>
                    {showUpsell && (
                      <motion.div
                        initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="rounded-2xl bg-accent-soft/70 p-4"
                      >
                        <p className="text-xs font-semibold text-accent-deep">
                          Poupe {fmt(pack.full - pack.price)} com o Pack Tiragorduras
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed opacity-60">
                          {pack.detail} por {fmt(pack.price)} em vez de{' '}
                          <s>{fmt(pack.full)}</s>.
                        </p>
                        <button
                          type="button"
                          onClick={() => swapItem('750ml', 'Pack Tiragorduras')}
                          className="mt-2.5 rounded-full bg-accent px-4 py-2 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-accent-deep"
                        >
                          Trocar pelo pack
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* cross-sell */}
                  {crossSell.length > 0 && (
                    <div className="pt-6 pb-4">
                      <p className="font-display text-lg font-medium">Complete a rotina</p>
                      <ul className="mt-3 space-y-2">
                        {crossSell.map((c) => (
                          <li
                            key={c.code}
                            className="flex items-center gap-3 rounded-2xl border border-line p-3"
                          >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e7eaea] text-[#c3cbcb]">
                              <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none" aria-hidden="true">
                                <rect x="6" y="8" width="36" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                                <circle cx="17" cy="19" r="3.5" stroke="currentColor" strokeWidth="2" />
                                <path d="M9 34l9-9 7 7 5-5 9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[13px] font-medium">{c.name}</p>
                              <p className="truncate text-[11px] opacity-50">{c.detail}</p>
                            </div>
                            <div className="shrink-0 text-right">
                              <p className="text-[13px] font-medium tabular-nums">{fmt(c.price)}</p>
                              <button
                                type="button"
                                onClick={() => addItem(c.code, 1, false)}
                                className="group mt-0.5 flex items-center gap-1 text-[11px] font-semibold tracking-[0.06em] text-accent-deep"
                              >
                                ADICIONAR
                                <span className="h-1 w-1 rounded-full bg-accent transition-transform duration-200 group-hover:scale-125" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* footer */}
            {items.length > 0 && (
              <div className="border-t border-line px-6 pt-4 pb-6">
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-lg font-medium">Total</p>
                  <p className="text-lg font-medium tabular-nums">{fmt(subtotal)}</p>
                </div>
                <p className="mt-0.5 text-[11px] opacity-50">
                  IVA incluído · Códigos de desconto aplicados no checkout
                </p>
                <motion.button
                  type="button"
                  whileHover={reduce ? {} : { scale: 1.01 }}
                  whileTap={reduce ? {} : { scale: 0.985 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="mt-4 flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-ink py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-deep"
                >
                  Finalizar compra em segurança
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                </motion.button>
                <div className="mt-4 flex items-center justify-center">
                  <PayIcons />
                </div>
                <p className="mt-3 text-center text-[10px] opacity-40">
                  Satisfação garantida · Devoluções em 14 dias · Apoio técnico dedicado
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
