# RDS Design System

> **Base:** shadcn/ui (estilo *new-york*, base neutral) via **Chalk UI Kit**, rebrandizado para a
> **Rocha Design Studio (RDS)** com laranja de marca **`#FB5A24`**.
>
> **Figma (cópia RDS):** `86OLvevxPeWT11PFK51OsV` — *ZAPLYZE | Chalk UI ✦ (Copy Copy Copy)*
> **Namespace de tokens:** `RDS/*` (antes `ui.shadcn.com/*`)

Este documento é a fonte de verdade do design system. Serve tanto para **replicar no Figma**
como para **arrancar projetos em código** (o modelo de tokens é o do shadcn/ui, logo é
copy-paste direto para Tailwind v4 + CSS variables).

---

## 1. Princípios

- **Token-first.** Nada de valores hardcoded — cada superfície, texto, borda, raio e sombra
  aponta para um token semântico. Muda o token, muda o sistema inteiro.
- **Laranja = marca.** O `#FB5A24` é a cor **primária** (ações primárias, seleções, estados
  ativos, focus). Não é um "accent" subtil — é a identidade.
- **Neutros para estrutura.** Cinzas para superfícies, texto e bordas; o laranja destaca-se
  por ser a única cor quente.
- **Escala shadcn.** Radius `0.625rem`, tipografia Geist + Inter, tokens `primary/secondary/
  muted/accent/destructive/border/input/ring/...`.

---

## 2. Cores — tokens semânticos

> A collection `RDS` tem **dois modos: `Light` e `Dark`** (color scheme completo, estilo Untitled UI).
> A tabela abaixo mostra o modo **Light**; ver §2.2 para a escala primária e §2.3 para o **Dark**.
> Nomes de token = nomes das CSS variables do shadcn.

| Token | Valor | Uso |
|---|---|---|
| `background` | `#FFFFFF` | Fundo da app |
| `foreground` | `#000000` | Texto principal |
| `card` / `card-foreground` | `#FFFFFF` / `#000000` | Superfície de cards |
| `popover` / `popover-foreground` | `#FFFFFF` / `#000000` | Popovers, menus |
| **`primary`** | **`#FB5A24`** | **Ações primárias, marca** |
| `primary-foreground` | `#FAFAFA` | Texto/ícone sobre o laranja |
| `secondary` / `secondary-foreground` | `#F5F5F5` / `#171717` | Botões secundários |
| `muted` / `muted-foreground` | `#F5F5F5` / `#737373` | Fundos e texto discretos |
| `accent` / `accent-foreground` | `#F5F5F5` / `#171717` | Hover subtil |
| `destructive` / `destructive-foreground` | `#E40014` / `#FCF3F3` | Erros, ações destrutivas |
| `border` | `#E5E5E5` | Bordas |
| `input` | `#E5E5E5` | Bordas de inputs |
| **`ring`** | **`#FB5A24`** | **Focus ring (marca)** |
| `surface` / `surface-foreground` | `#F8F8F8` / `#000000` | Superfícies alternativas |
| `code` / `code-foreground` | `#F8F8F8` / `#000000` | Blocos de código |
| `code-highlight` / `code-number` | `#F2F2F2` / `#747474` | Realce e numeração |
| `selection` / `selection-foreground` | `#000000` / `#FFFFFF` | Seleção de texto |

### Sidebar

| Token | Valor |
|---|---|
| `sidebar` / `sidebar-foreground` | `#FAFAFA` / `#000000` |
| `sidebar-primary` / `sidebar-primary-foreground` | `#171717` / `#FAFAFA` |
| `sidebar-accent` / `sidebar-accent-foreground` | `#F5F5F5` / `#171717` |
| `sidebar-border` | `#E5E5E5` |
| **`sidebar-ring`** | **`#FB5A24`** |

> Nota: `sidebar-primary` (item de nav ativo) mantém-se **neutro** (`#171717`) por design.
> Se quiseres o item ativo em laranja, é uma alteração de 1 token.

### 2.2 Escala primária (tints + shades)

Escala de marca ao estilo Untitled UI (`primary/50…900`), usada para superfícies soft,
hovers, focus tints e texto sobre fundos claros. `primary/500` = `primary` = a marca.

| Step | Light | Dark | Uso típico |
|---|---|---|---|
| `primary/50` | `#FFF3EE` | `#2E1207` | Fundo soft (ex.: alerta primário) |
| `primary/100` | `#FFE3D6` | `#3D1808` | Hover/tint subtil |
| `primary/200` | `#FFC3A8` | `#5A240C` | Borda soft |
| `primary/300` | `#FD9E77` | `#7A3210` | — |
| `primary/400` | `#FC7A47` | `#C13A10` | — |
| **`primary/500`** | **`#FB5A24`** | **`#FB5A24`** | **Marca / `primary`** |
| `primary/600` | `#E84A16` | `#FC7A47` | Hover do primary |
| `primary/700` | `#C13A10` | `#FD9E77` | Pressed |
| `primary/800` | `#952D0E` | `#FFC3A8` | — |
| `primary/900` | `#5E1D0A` | `#FFE3D6` | Texto sobre fundo soft |

> No **Dark** a escala inverte-se: os tints claros passam a laranjas escuros e os shades
> escuros passam a laranjas claros — por isso um alerta soft fica *fundo laranja-escuro +
> texto laranja-claro* automaticamente ao mudar o modo.

### 2.3 Dark mode — tokens semânticos

| Token | Dark |
|---|---|
| `background` / `foreground` | `#0A0A0A` / `#FAFAFA` |
| `card` / `card-foreground` | `#171717` / `#FAFAFA` |
| `popover` / `popover-foreground` | `#171717` / `#FAFAFA` |
| `primary` / `primary-foreground` | `#FB5A24` / `#FAFAFA` |
| `secondary` / `secondary-foreground` | `#262626` / `#FAFAFA` |
| `muted` / `muted-foreground` | `#262626` / `#A1A1A1` |
| `accent` / `accent-foreground` | `#262626` / `#FAFAFA` |
| `destructive` / `destructive-foreground` | `#FF5C5C` / `#2A0A0A` |
| `border` / `input` / `ring` | `#2A2A2A` / `#2A2A2A` / `#FB5A24` |
| `surface` / `surface-foreground` | `#171717` / `#FAFAFA` |
| `code` / `code-foreground` | `#171717` / `#FAFAFA` |
| `selection` / `selection-foreground` | `#FFFFFF` / `#0A0A0A` |
| sidebar (`sidebar`/`fg`/`primary`/`primary-fg`/`accent`/`accent-fg`/`border`/`ring`) | `#171717` / `#FAFAFA` / `#FAFAFA` / `#171717` / `#262626` / `#FAFAFA` / `#2A2A2A` / `#FB5A24` |

> ✅ **Rendering:** o Dark **renderiza em toda a biblioteca Elements**. Os neutros do Chalk já
> estavam tokenizados; foram religadas as superfícies hardcoded que faltavam (fundos brancos →
> `card`/`muted`, bordas cinza → `border`) em Inputs, Search, Menu, Pagination, Tabs, Shortcuts,
> Alert, Badges, Avatars, etc. Basta trocar o modo da collection RDS de `Light` para `Dark`
> num frame para ver o scheme escuro.

### ⚠️ Acessibilidade do laranja

`primary-foreground` (`#FAFAFA`, ~branco) sobre `primary` (`#FB5A24`) dá **~3.2:1** de contraste.
Passa **AA para texto grande / UI** (≥3:1) mas **falha AA para texto normal** (≥4.5:1). Aceitável
para labels de botões e ícones (é a escolha estética do sistema). Para blocos de texto corrido
sobre laranja, usar `foreground` (`#000000`) ou escurecer o laranja.

---

## 3. Primitivos de cor

O sistema mantém rampas completas (50→950) como paint styles, para derivar tokens:
`Gray`, `Purple`, `Blue`, `Cyan`, `Green`, `Yellow`, `Orange`, `Red`, `Pink`.

Cores de marca nomeadas (paint styles `RDS/*`):

| Nome | Valor | Papel |
|---|---|---|
| `RDS/Grenadier` | `#FB5A24` | Laranja de marca (= `primary`) |
| `RDS/Cod Gray` | `#0A0A0A` | Quase-preto |
| `RDS/Dove Gray` | `#737373` | `muted-foreground` |
| `RDS/Wild Sand` | `#F5F5F5` | `muted` / `secondary` |
| `RDS/Mercury` | `#E5E5E5` | `border` |
| `RDS/Serenade` | `#FFF7ED` | Tint laranja claro |
| `RDS/Red` | `#E7000B` | Destructive |
| `RDS/Jade` | `#00BC7D` | Success (chart) |
| `RDS/Selective Yellow` | `#F0B100` | Warning (chart) |

> As cores literais de status (`Color=Purple`, `Blue`, `Green`, `Pink`… em Badges/Tags/Avatars)
> são **decorativas** e mantêm-se — não fazem parte da identidade de marca.

---

## 4. Tipografia

Duas famílias:

- **Geist** — display, headings e UI (números, botões).
- **Inter** — texto corrido, labels, parágrafos.

### Escala (text styles)

| Grupo | Estilos |
|---|---|
| **Heading** | H1→H6 × Regular / Medium / Semibold / Bold |
| **Subheading** | XL→XS × Medium / Semibold |
| **Paragraph** | 2XL→XS × Regular / Medium / Semibold |
| **Label** | L→XS × Regular / Medium / Semibold |
| **Extra** | Caption, Overline, Footnote |
| **Semânticos** (`RDS/Semantic/*`) | Button, Label, Input, Textarea, Link, Legend, Data, Cell, Options |

Referências de tamanho: `12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48`;
line-heights `16 / 20 / 21 / 28 / 32 / 36`; letter-spacing `-0.45` (headings) a `+0.6` (uppercase/overline).

---

## 5. Espaçamento, raio e sombras

**Espaçamento** (collection `Primitives`, escala `Size/*`):
`2 · 4 · 6 · 8 · 12 · 14 · 16 · 18 · 20 · 22 · 24 · 26 · 28 · 32 · 40 · 48 · 52 · 56 · 64 · 72 · 80 · 88 · 96` px

**Raio:** `radius = 10px` (`0.625rem`) — base. Derivados usados: `5 · 8 · 18 · 22` e `full` (pill).

**Sombras** (effect styles):

| Família | Níveis |
|---|---|
| `Shadows/Soft` | X-Small · Small · Medium · Large · X-Large |
| `Shadows/Hard` | X-Small · Small · Medium · Large · X-Large |
| `Element` | Active · Error · Inner (estados de foco/erro/inset) |

---

## 6. Componentes

### Elements (biblioteca interativa) — rebrandizados para RDS
Buttons · Button Group · Checkbox / Radio / Toggle · Input Fields · Search · Dropdown ·
Menu · Tabs · Pagination · Breadcrumb · Badges & Tags · Alert & Toast · Avatars ·
Progress · Table · Shortcuts

**Como o laranja se aplica:**
- **Primary / ativo / selecionado / checked / on** → `primary` (laranja)
- **Focus** → `ring` (laranja) — borda + glow
- **Ênfase neutra** (tab ativo, barra de progresso, segmento pressionado) → mantém-se neutro
- **Cores de status/decorativas** (info/success/warning/error + paletas literais) → intactas

### Components (blocos de marketing) — *fora do âmbito desta sessão*
Account · Banner · Blog · CTA · Contact · Content · FAQs · Feature · Footer · Gallery ·
Headers · Navigation · Logo · Mega-Navigation · Pricing · Team · Testimonials
*(têm pretos hardcoded próprios; podem ser rebrandizados num passo seguinte.)*

---

## 7. Usar em código (Tailwind v4 + CSS variables)

Modelo de tokens idêntico ao shadcn/ui. Bloco `:root` pronto a colar:

```css
:root {
  --radius: 0.625rem;

  --background: #ffffff;
  --foreground: #000000;
  --card: #ffffff;
  --card-foreground: #000000;
  --popover: #ffffff;
  --popover-foreground: #000000;

  --primary: #fb5a24;          /* marca */
  --primary-foreground: #fafafa;
  --secondary: #f5f5f5;
  --secondary-foreground: #171717;
  --muted: #f5f5f5;
  --muted-foreground: #737373;
  --accent: #f5f5f5;
  --accent-foreground: #171717;
  --destructive: #e40014;
  --destructive-foreground: #fcf3f3;

  --border: #e5e5e5;
  --input: #e5e5e5;
  --ring: #fb5a24;             /* focus na marca */

  /* sidebar */
  --sidebar: #fafafa;
  --sidebar-foreground: #000000;
  --sidebar-primary: #171717;
  --sidebar-primary-foreground: #fafafa;
  --sidebar-accent: #f5f5f5;
  --sidebar-accent-foreground: #171717;
  --sidebar-border: #e5e5e5;
  --sidebar-ring: #fb5a24;
}
```

Tipografia: `font-sans` → Inter, `font-display` → Geist.

---

## 8. Changelog do rework

**v1.0 — Rebrand RDS (sessão inicial)**
- `primary`, `ring`, `sidebar/ring` ligados a **#FB5A24** (antes o `primary` era preto `#000000`).
- Namespace renomeada: collection `ui.shadcn.com` → **`RDS`**; **35** paint styles e **50** text
  styles `ui.shadcn.com/*` → `RDS/*`.
- Componentes Elements: superfícies primárias/ativas e focus rings religados aos tokens
  semânticos (laranja). Focus roxo (`#924FF8` / `#E1D5FF`) → laranja (`ring` + glow).
- Correção: roxo decorativo em Badges/Tags/Avatars (`Color=Purple`) restaurado — não é a marca.

**v1.1 — Escala primária + Dark mode**
- Criada a **escala `primary/50…900`** (tints + shades de laranja) como tokens, com scopes e
  code syntax.
- **Remapeados por luminância** todos os roxos-tint restantes nos Elements (fundos soft,
  hovers, focus, texto escuro) → step correspondente da escala. Preservadas as cores
  decorativas literais (`Color=Purple/Pink/…`).
- Adicionado **Dark mode**: modos `Light` + `Dark` na collection `RDS`, com 45 valores
  (semânticos + escala primária invertida). Validado em componentes tokenizados.

**v1.2 — Tokenização de neutros (Dark real)**
- Descoberto que o Chalk já tinha os neutros de texto/bordas tokenizados na maioria dos
  componentes (só o `primary` e os roxos estavam hardcoded).
- Religadas as **superfícies brancas hardcoded** que faltavam → `card`/`muted` e bordas cinza
  → `border`, em Inputs, Search, Menu, Pagination, Tabs, Button Group, Shortcuts, Progress,
  Alert, Badges, Avatars, Checkbox. **Dark mode passa a renderizar em toda a biblioteca Elements.**

**v1.3 — Limpeza**
- Apagados **149 tokens-lixo** auto-gerados da collection RDS (`item spacing/*`, `stroke weight/*`,
  `color/grey/*`, `width/*`, `height/*`, `font */*`, `line height/*`…). RDS passa de ~195 → **46
  tokens limpos** (só semânticos + escala `primary/*` + `radius`).
- Apagadas 2 collections mortas: `Component` (vazia) e `Variable collection` (`Primary/Blue`,
  `Secondary/Gray`). Ficam só **Primitives** (23) e **RDS** (46, Light+Dark).

### Follow-ups (ordem sugerida)
- [ ] **Associar estilos às pre-made sections** — bind dos blocos de marketing (Blog, CTA,
  Footer, Pricing…) aos tokens/estilos RDS.
- [ ] **Páginas soltas** — `Econano`, `Teste`, `Page 56`, `Backgrounds` (mantidas por agora).
- [ ] **Opcionais de marca** — tab ativo, barra de progresso e `sidebar-primary` em laranja.
