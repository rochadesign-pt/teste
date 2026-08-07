import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { SmoothScroll } from './components/SmoothScroll'
import { Nav } from './components/Nav'
import { Cart } from './components/Cart'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Product } from './pages/Product'
import { Categories } from './pages/Categories'
import { Category } from './pages/Category'
import { Equipment } from './pages/Equipment'
import { Manifesto } from './pages/Manifesto'
import { Faq } from './pages/Faq'
import { Blog } from './pages/Blog'
import { Article } from './pages/Article'
import { Contacts } from './pages/Contacts'
import { Stores } from './pages/Stores'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const [items, setItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const addItem = useCallback((id, qty = 1, open = true, meta = null) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.id === id)
      if (existing) {
        return prev.map((it) => (it.id === id ? { ...it, qty: it.qty + qty } : it))
      }
      return [...prev, { id, qty, ...(meta || {}) }]
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
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SmoothScroll>
        <ScrollToTop />
        <Nav cartCount={count} onCartOpen={() => setCartOpen(true)} />
        <Routes>
          <Route path="/" element={<Home addItem={addItem} />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/categoria/:slug" element={<Category addItem={addItem} />} />
          <Route path="/produto/htg-30" element={<Product addItem={addItem} />} />
          <Route path="/equipamento/:slug" element={<Equipment addItem={addItem} />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/contactos" element={<Contacts />} />
          <Route path="/lojas" element={<Stores />} />
        </Routes>
        <Footer />
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
    </BrowserRouter>
  )
}

export default App
