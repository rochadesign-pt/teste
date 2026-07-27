import { useCallback, useState } from 'react'
import { SmoothScroll } from './components/SmoothScroll'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Benefits } from './components/Benefits'
import { Steps } from './components/Steps'
import { Stats } from './components/Stats'
import { Reviews } from './components/Reviews'
import { Faq } from './components/Faq'
import { StickyBar } from './components/StickyBar'
import { Cart } from './components/Cart'
import { Footer } from './components/Footer'
import { LayoutToggle } from './components/LayoutToggle'

function App() {
  const [format, setFormat] = useState('750ml')
  const [items, setItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [variant, setVariant] = useState(() => {
    try {
      return localStorage.getItem('mistolin-buy-variant') || 'open'
    } catch {
      return 'open'
    }
  })

  const changeVariant = useCallback((v) => {
    setVariant(v)
    try {
      localStorage.setItem('mistolin-buy-variant', v)
    } catch {
      /* ignore */
    }
  }, [])

  const addItem = useCallback((id, qty = 1, open = true) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.id === id)
      if (existing) {
        return prev.map((it) => (it.id === id ? { ...it, qty: it.qty + qty } : it))
      }
      return [...prev, { id, qty }]
    })
    if (open) setCartOpen(true)
  }, [])

  const setQty = useCallback((id, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((it) => it.id !== id)
        : prev.map((it) => (it.id === id ? { ...it, qty } : it)),
    )
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }, [])

  const swapItem = useCallback((fromId, toId) => {
    setItems((prev) => {
      const rest = prev.filter((it) => it.id !== fromId && it.id !== toId)
      return [...rest, { id: toId, qty: 1 }]
    })
  }, [])

  const count = items.reduce((s, it) => s + it.qty, 0)

  return (
    <SmoothScroll>
      <Nav cartCount={count} onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero format={format} setFormat={setFormat} onAdd={(id, qty) => addItem(id, qty)} variant={variant} />
        <Marquee />
        <Benefits />
        <Steps />
        <Stats />
        <Reviews />
        <Faq />
      </main>
      <Footer />
      <StickyBar format={format} onAdd={() => addItem(format)} />
      <LayoutToggle variant={variant} onChange={changeVariant} />
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        setQty={setQty}
        removeItem={removeItem}
        addItem={addItem}
        swapItem={swapItem}
      />
    </SmoothScroll>
  )
}

export default App
