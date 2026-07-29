import { useCallback, useState } from 'react'
import { Hero } from '../components/Hero'
import { Marquee } from '../components/Marquee'
import { Benefits } from '../components/Benefits'
import { Steps } from '../components/Steps'
import { Reviews } from '../components/Reviews'
import { Faq } from '../components/Faq'
import { StickyBar } from '../components/StickyBar'
import { LayoutToggle } from '../components/LayoutToggle'

export function Product({ addItem }) {
  const [format, setFormat] = useState('750ml')
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

  return (
    <main>
      <Hero format={format} setFormat={setFormat} onAdd={(id, qty) => addItem(id, qty)} variant={variant} />
      <Marquee />
      <Benefits />
      <Steps />
      <Reviews />
      <Faq />
      <StickyBar format={format} onAdd={() => addItem(format)} />
      <LayoutToggle variant={variant} onChange={changeVariant} />
    </main>
  )
}
