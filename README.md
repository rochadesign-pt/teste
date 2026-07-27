# Illiabum Clube — Website Institucional

Website institucional do Illiabum Clube (basquetebol, Ílhavo, fundado em 1943).
Design system: bordô `#5c0e1e` · amarelo `#ffc72c` · preto `#0c0a0c` · cinza · branco.
Direção de arte inspirada em sites da NBA e de clubes de futebol: tipografia display
condensada (Anton), blocos de cor, texturas de campo e halftone, ritmo de cartaz desportivo.

## Stack

- **Vite + React 18 + TypeScript**
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
npm run dev      # desenvolvimento
npm run build    # build de produção (dist/)
```

## Estrutura

```
src/
  components/     # UI primitivos, layout (navbar/footer), motion, cartões
  sections/home/  # Secções da homepage (hero, ticker, próximo jogo, stats…)
  pages/          # Home, Clube, Equipas, Jogos, Notícias, Contactos
  data/           # Conteúdo editável (clube, equipas, jogos, notícias)
```

Todo o conteúdo vive em `src/data/` — é aí que se editam jogos, notícias e escalões.

## A confirmar com o clube antes de publicar

- Designações exatas dos títulos no palmarés (fonte: zerozero.pt/Wikipédia)
- Número de atletas, morada completa, email, telefone e quotas de sócio
- Logótipo oficial (o emblema atual é um placeholder SVG)
- Fotografias reais (pavilhão, equipas, jogos) — os cartões usam capas gráficas geradas
- Jogos e resultados são dados de exemplo; em produção, ligar ao calendário FPB ou CMS
- Formulário de contacto não tem backend — ligar a um serviço de email/formulários
