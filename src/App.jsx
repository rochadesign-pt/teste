import { useCallback, useState } from 'react'
import { SmoothScroll } from './components/SmoothScroll'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Benefits } from './components/Benefits'
import { Steps } from './components/Steps'
import { Stats } from './components/Stats'
import { Options } from './components/Options'
import { StickyBar } from './components/StickyBar'
import { Cart } from './components/Cart'
import { Footer } from './components/Footer'

function App() {
  const [format, setFormat] = useState('750ml')
  const [items, setItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

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

  // Options module: add the whole configured selection at once
  const addSelection = useCallback(
    (picked) => {
      addItem(format, 1, false)
      picked.combos.forEach((code) => addItem(code, 1, false))
      if (picked.bundle) addItem(picked.bundle, 1, false)
      setCartOpen(true)
    },
    [addItem, format],
  )

  const count = items.reduce((s, it) => s + it.qty, 0)

  return (
    <SmoothScroll>
      <Nav cartCount={count} onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero format={format} setFormat={setFormat} onAdd={(id, qty) => addItem(id, qty)} />
        <Marquee />
        <Benefits />
        <Steps />
        <Stats />
        <Options format={format} setFormat={setFormat} onAdd={addSelection} />
      </main>
      <Footer />
      <StickyBar format={format} onAdd={() => addItem(format)} />
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
