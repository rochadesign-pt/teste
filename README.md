# Mistolin PRO — Página de Produto (HTG-30)

Reconstrução from-the-ground-up da página de produto do **Tiragorduras HTG-30 750mL**
da Mistolin Solutions, com direção gráfica inspirada em mishmash.pt, Hey Harper e
Coffee Kings (Significa).

> Conceito não-oficial — exercício de design. Não afiliado à Mistolin Solutions.

## Direção gráfica

- Accent único: `#64A70B` (verde Mistolin)
- Fundo `#F5F5F5`, cards a branco
- Tipografia: **Karla** (display) + **Inter** (corpo)

## Stack

- **Vite + React**
- **Tailwind CSS v4**
- **Framer Motion** — reveals, stagger, hover/tap, accordion, sticky bar
- **GSAP + @gsap/react** — timeline do "modo de utilização", counters, marquee
- **Lenis** — smooth scroll global

## Correr localmente

```bash
npm install
npm run dev
```

## Estrutura

```
src/
  data/product.js        # todo o conteúdo do produto (copy, formatos, specs)
  components/
    SmoothScroll.jsx     # Lenis + sync com ScrollTrigger
    Nav.jsx              # header fixo com carrinho
    Hero.jsx             # split hero: info + palco do produto (SVG)
    Bottle.jsx           # ilustração SVG da embalagem
    Marquee.jsx          # faixa de claims em loop (GSAP)
    Benefits.jsx         # grelha "porquê o HTG-30"
    Steps.jsx            # modo de utilização em 3 passos (timeline GSAP)
    Stats.jsx            # counters técnicos (pH, tempo, diluição)
    Specs.jsx            # accordion de detalhes técnicos
    Options.jsx          # opções de compra: volumetrias / combinações / bundles
    StickyBar.jsx        # barra de compra persistente on-scroll
    Footer.jsx
```

Todo o copy do produto é baseado na informação pública do HTG-30
(descrição, modo de utilização, características técnicas), reescrito
para o tom da nova direção gráfica. Acessibilidade: `prefers-reduced-motion`
respeitado em todas as animações.
