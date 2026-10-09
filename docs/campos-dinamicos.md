# Campos dinâmicos — um só modelo de produto (Shopify)

Consumíveis, equipamentos e serviços são **todos produtos Shopify**, com a mesma
estrutura: produto → opções → variantes (SKU, preço) → metafields.
O que muda entre eles é só o `Type` (product type) e os metafields que cada um usa.

- Fonte de verdade: `src/data/shop.js`
- CSV de importação: `npm run export:shopify` → `docs/shopify-produtos.csv`
- Adaptadores para as páginas: `src/data/equipmentCatalog.js`, `src/data/services.js`

> Estado: **proposta para validação**. Produtos, preços e campos são de exemplo.

---

## 1. Estrutura comum (igual para os três)

| Campo Shopify | Consumível | Equipamento | Serviço |
|---|---|---|---|
| `Type` | `Consumível` | `Equipamento` | `Serviço` |
| Opções / variantes | Formato (750 mL, 5 LT…) | Kit, cor, bateria… | Escalão de preço (ex.: 1 saída / até 4 saídas) |
| `Variant SKU` | `HTG-30-5L` | `DS-4-INST` | `SRV-INST-DOS-4` |
| `Variant Requires Shipping` | sim | sim | **não** |
| Coleções | categoria | `equipamentos` + `equipamentos-<tipo>` | **nenhuma** |
| `seo.hidden` | — | — | **1** (fora da pesquisa e das coleções) |
| `custom.*` | código, nome curto, selo, modo de preço | idem | — |

Os serviços são produtos "discretos": existem e vendem-se como qualquer produto,
mas não aparecem no catálogo. Só são mostrados ligados a um equipamento.

## 2. Metafields partilhados — `custom`

| Metafield | Tipo Shopify | Exemplo |
|---|---|---|
| `custom.codigo` | single line text | `DS-4` |
| `custom.nome_curto` | single line text | `MixPro DS-4` |
| `custom.selo` | single line text | `Mais vendido`, `Novo` |
| `custom.preco_modo` | single line text (choices) | `fixo` · `desde` · `proposta` |
| `custom.pagina` | url | página de produto dedicada, se existir |

## 3. Equipamentos — `equipamento.*` e `instalacao.*`

**`equipamento.tipo`** (metaobject `tipo_equipamento`) define que campos se aplicam
e quais geram filtro (★) ou aparecem no card (◆). Cada chave é única no catálogo,
porque no Shopify um metafield tem um só tipo e uma só unidade.

| Tipo | Metafields `equipamento.*` |
|---|---|
| Doseamento | `saidas` ★◆ (integer) · `modo` ★◆ (list: Balde/Pulverizador/Recarga) · `caudal` (decimal, L/min) · `diluicao` (text) |
| Máquinas | `aplicacao` ★◆ (Lava-loiça/Lavandaria) · `bombas` ★◆ (integer) · `controlo` ★ · `maquinas` (integer) |
| Dispensadores | `produto` ★◆ · `acionamento` ★◆ · `capacidade` (decimal, L) · `material` ★ |
| Limpeza | `largura` ★◆ (cm) · `rendimento` ◆ (m²/h) · `deposito` (L) · `autonomia_min` (min) |
| Mobilidade | `autonomia_km` ★◆ (km) · `velocidade` ◆ (km/h) · `carga` (kg) |

**Necessidades de instalação** — comuns a todos os equipamentos, todas filtráveis:

| Metafield | Valores |
|---|---|
| `instalacao.energia` | Sem energia · 230 V · 400 V trifásico · Bateria · Pilhas |
| `instalacao.agua` | Não precisa · Água fria · Água quente e fria |
| `instalacao.montagem` | Parede · Chão · Na máquina · Móvel |
| `instalacao.espaco` | texto livre |

**Ligação aos serviços** — referências a *variantes* de serviço:

| Metafield | Tipo Shopify | Significado |
|---|---|---|
| `servicos.incluidos` | list.variant_reference | Já pagos no preço do equipamento (mostra "Incluído") |
| `servicos.opcionais` | list.variant_reference | Podem juntar-se ao carrinho, ao preço da variante |

Apontar para a **variante** (e não para o produto) permite preços diferentes do
mesmo serviço por equipamento: a montagem do DS-1 usa `SRV-INST-DOS-1` (79 €),
a do DS-4 usa `SRV-INST-DOS-4` (120 €).

## 4. Serviços — `servico.*`

| Metafield | Tipo Shopify | Exemplo |
|---|---|---|
| `servico.etapa` | text (choices) | `antes` · `arranque` · `operacao` |
| `servico.resumo` | multi-line text | descrição curta |
| `servico.inclui` | list.single_line_text | o que inclui |
| `servico.duracao` | single line text | `2 – 3 h` |
| `servico.preco_modo` | text (choices) | `incluido` · `gratuito` · `fixo` · `desde` · `mensal` · `orcamento` |
| `servico.unidade` | single line text | `/ unid.` |
| `servico.selo` | single line text | "Montagem incluída" (selo no card do equipamento) |
| `servico.aplica_a` | list.metaobject_reference → `tipo_equipamento` | `doseamento`, `maquina` |
| `servico.avulso` | boolean | pode ser pedido para equipamento que o cliente já tem |

Preço por modo: `gratuito`, `incluido` e `orcamento` têm variante a 0 €; `mensal`
precisa de um *selling plan* (app de subscrições) para cobrar todos os meses.

---

## 5. Importação no Shopify

1. Criar as definições de metafields acima (Settings → Custom data → Products)
   e o metaobject `tipo_equipamento`.
2. Importar `docs/shopify-produtos.csv` (Products → Import). Uma linha por
   variante; os metafields vão nas colunas `… (product.metafields.ns.key)`.
3. Ligar `servicos.incluidos` / `servicos.opcionais`: o CSV traz os SKUs numa
   coluna auxiliar; as referências precisam dos IDs das variantes, por isso
   ligam-se depois da importação (Matrixify ou Admin API).
4. Criar as coleções automáticas `equipamentos` (Type = Equipamento) e
   `equipamentos-<tipo>`; ativar como filtros (Search & Discovery) os metafields ★.

A confirmar no Shopify antes da importação real: o separador de listas nas
colunas de metafields (o script usa `; `).

## 6. No carrinho

- Equipamento com serviço **incluído** → uma linha (o equipamento); o serviço
  aparece como detalhe.
- Serviço **opcional** → linha própria (produto Serviço), com a propriedade
  `_equipamento: <handle>` para a equipa saber a que instalação pertence.

## 7. Decisões em aberto

1. Lista real de tipos de equipamento e respetivos campos.
2. Brio Ride-On fica neste catálogo ou numa linha à parte?
3. Serviços opcionais como linha própria (proposta acima) ou só propriedade da linha do equipamento?
4. Preço de serviços por zona (ilhas / deslocações longas): variantes por zona ou preço único?
5. Equipamentos em aluguer (renting) → `custom.preco_modo: aluguer` + selling plan?
