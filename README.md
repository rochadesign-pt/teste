# Illiabum Clube — Website Institucional

Website institucional do Illiabum Clube (basquetebol, Ílhavo, fundado em 1943).
Design system: bordô `#5c0e1e` · amarelo `#ffc72c` · preto `#0c0a0c` · cinza · branco.
Direção de arte inspirada em sites da NBA e de clubes de futebol: **Overused Grotesk**
(OFL) como única família tipográfica — Black para display, Roman/Medium para corpo —
blocos de cor, texturas de campo e halftone, ritmo de cartaz desportivo.

## Stack

- **Astro 7 + ilhas React 18 + TypeScript** — páginas estáticas em `src/pages/*.astro`,
  views/secções interativas em React (`src/views`, `src/sections`), View Transitions
  nativas com cortina GSAP entre páginas (`src/layouts/Layout.astro`)
- **Design system estilo shadcn/ui** — tokens em CSS variables (`src/styles/index.css`),
  `components.json` compatível com o CLI, primitivos vendored em `src/components/ui/`
  (Button, Badge, Card, Input, Label, Textarea, Select, Tabs) sobre Radix + CVA.
  `primary` = amarelo (ação) · `secondary` = bordô (marca) · `--radius: 0` (cantos retos)
- **Tailwind CSS 3** — tokens shadcn + escalas gráficas da marca (`bordeaux`, `gold`, `ink`)
- **Framer Motion** — reveals, stagger, cursor, transições de página, menu mobile
- **GSAP + @gsap/react (SplitText, ScrollTrigger)** — preloader, hero por caracteres,
  scroll horizontal pinned, parallax, contadores e marquees
- **Lenis** — smooth scroll sincronizado com o ScrollTrigger
- **Radix UI + lucide-react** — primitivos acessíveis e ícones
- Secções base a partir do **Relume** (Header 113 → hero; Event 5 → jogos com tabs),
  adaptadas ao design system do clube

Para adicionar mais componentes shadcn: `npx shadcn@latest add <componente>` —
o `components.json` já aponta para os aliases e tokens certos.

## Correr o projeto

```bash
npm install
npm run dev             # desenvolvimento (astro dev)
npm run build           # build de produção estática (dist/)
npm run preview         # servir a build
npm run build:artifact  # preview single-file (dist-artifact/) para partilha
```

## Estrutura

```
src/
  pages/          # Rotas Astro (index, clube, equipas, jogos, noticias, contactos)
  layouts/        # Layout.astro — head/SEO, ilhas globais, cortina de transição
  views/          # Páginas React montadas como ilhas (uma por rota)
  sections/home/  # Secções da homepage (hero, ticker, próximo jogo, stats…)
  components/     # UI shadcn, layout (navbar/footer), motion, cartões
  data/           # Conteúdo editável (clube, equipas, jogos, notícias)
  assets/fonts/   # Overused Grotesk (woff2, self-hosted)
  preview/        # Harness Vite para o build single-file de partilha
```

Todo o conteúdo vive em `src/data/` — é aí que se editam jogos, notícias e escalões.

## A confirmar com o clube antes de publicar

- Designações exatas dos títulos no palmarés (fonte: zerozero.pt/Wikipédia)
- Número de atletas, morada completa, email, telefone e quotas de sócio
- Logótipo oficial (o emblema atual é um placeholder SVG)
- Fotografias reais (pavilhão, equipas, jogos) — os cartões usam capas gráficas geradas
- Jogos e resultados são dados de exemplo; em produção, ligar ao calendário FPB ou CMS
- Formulário de contacto não tem backend — ligar a um serviço de email/formulários
