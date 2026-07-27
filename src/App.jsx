import { useState } from 'react'
import { SmoothScroll } from './components/SmoothScroll'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Benefits } from './components/Benefits'
import { Steps } from './components/Steps'
import { Stats } from './components/Stats'
import { Specs } from './components/Specs'
import { Formats } from './components/Formats'
import { StickyBar } from './components/StickyBar'
import { Footer } from './components/Footer'

function App() {
  const [format, setFormat] = useState('750ml')
  const [cart, setCart] = useState(0)

  const addToCart = () => setCart((c) => c + 1)

  return (
    <SmoothScroll>
      <Nav cartCount={cart} />
      <main>
        <Hero format={format} setFormat={setFormat} onAdd={addToCart} />
        <Marquee />
        <Benefits />
        <Steps />
        <Stats />
        <Specs />
        <Formats setFormat={setFormat} />
      </main>
      <Footer />
      <StickyBar format={format} onAdd={addToCart} />
    </SmoothScroll>
  )
}

export default App
