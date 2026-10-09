# Campos dinâmicos — Equipamentos & Serviços

Proposta de modelo de dados para as páginas **/equipamentos** (catálogo) e
**/servicos**, e para a página de produto **/equipamento/:slug**.
Implementação de referência: `src/data/equipmentCatalog.js` e `src/data/services.js`.

> Estado: **proposta para validação**. Os valores atuais são de exemplo — a
> lista de tipos, campos e serviços deve ser fechada com a equipa comercial e técnica.

---

## 1. Modelo em três camadas

```
Tipo de equipamento ──define──▶ campos (características) + filtros
        │
Equipamento ──tem──▶ valores dos campos (attrs)
        │         ──tem──▶ necessidades de instalação (requires)
        │         ──tem──▶ serviços [incluído | opcional]
        ▼
Serviço ──aplica-se a──▶ tipos de equipamento
```

- **Os equipamentos têm características diferentes** → cada *tipo* declara o
  seu próprio esquema de campos. A listagem gera filtros e chips a partir dele;
  acrescentar um tipo novo não exige código.
- **Os equipamentos têm necessidades diferentes** → as necessidades de
  instalação são um conjunto **comum** a todos os tipos, para se poder filtrar o
  catálogo inteiro ("sem eletricidade", "não precisa de água").
- **Os serviços não se vendem soltos** → um serviço só aparece ligado a um
  equipamento (incluído ou opcional). Só os marcados `standalone` podem ser
  pedidos para equipamento que o cliente já tem (manutenção, assistência…).

---

## 2. Tipo de equipamento (`equipment_type`)

| Campo    | Tipo           | Obrig. | Descrição                                   |
|----------|----------------|:------:|---------------------------------------------|
| `id`     | handle         | ✓ | `doseamento`, `maquina`, `dispensadores`…        |
| `label`  | texto          | ✓ | Nome no catálogo ("Centrais de doseamento")      |
| `short`  | texto          | ✓ | Nome curto ("Doseamento") para chips             |
| `text`   | texto          |   | Descrição no cabeçalho da listagem               |
| `fields` | lista de campos| ✓ | Esquema das características (ver §3)             |

## 3. Definição de campo (característica)

| Propriedade | Valores                                         | Para quê |
|-------------|--------------------------------------------------|----------|
| `key`       | handle                                           | Chave do valor no equipamento |
| `label`     | texto                                            | Etiqueta visível |
| `type`      | `number` · `enum` · `multi` · `boolean` · `text` | Como se guarda e formata |
| `unit` / `unitOne` | texto                                     | "saídas" / "saída" |
| `options`   | lista                                            | Valores permitidos (`enum`, `multi`) |
| `filter`    | bool                                             | Gera filtro na listagem |
| `card`      | bool                                             | Aparece como chip no card (máx. 2–3) |

### Campos propostos por tipo

| Tipo | Campos (★ = filtro, ◆ = no card) |
|------|----------------------------------|
| Centrais de doseamento | Saídas ★◆ · Modo de enchimento (Balde/Pulverizador/Recarga) ★◆ · Caudal L/min · Gama de diluição |
| Doseadores para máquinas | Aplicação (Lava-loiça/Lavandaria) ★◆ · Bombas ★◆ · Controlo (Temporizado/Sinal/Condutividade) ★ · Máquinas servidas |
| Dispensadores | Produto (Sabonete/Gel/Papel) ★◆ · Acionamento (Manual/Automático) ★◆ · Capacidade L · Material (ABS/Inox) ★ |
| Máquinas de limpeza | Largura de trabalho cm ★◆ · Rendimento m²/h ◆ · Depósito L · Autonomia min |
| Mobilidade | Autonomia km ★◆ · Velocidade km/h ◆ · Peso máx. utilizador kg |

## 4. Necessidades de instalação (comuns a todos)

| Campo      | Opções                                                  | Filtro |
|------------|----------------------------------------------------------|:-----:|
| `energia`  | Sem energia · 230 V · 400 V trifásico · Bateria · Pilhas | ✓ |
| `agua`     | Não precisa · Água fria · Água quente e fria             | ✓ |
| `montagem` | Parede · Chão · Na máquina · Móvel                       | ✓ |
| `espaco`   | texto livre ("40 × 30 × 15 cm")                          |   |

## 5. Equipamento

| Campo       | Tipo | Descrição |
|-------------|------|-----------|
| `slug`, `name`, `short`, `code` | texto | Identificação |
| `type`      | ref → tipo | Define que campos se aplicam |
| `price`     | número \| vazio | Vazio = "Sob proposta" |
| `priceMode` | `fixed` · `from` · `quote` | "249 €", "desde 890 €", "Sob proposta" |
| `badge`     | texto | "Mais vendido", "Novo" |
| `href`      | url | Página de produto, se existir |
| `attrs`     | objeto | Valores dos campos do tipo |
| `requires`  | objeto | Necessidades de instalação (§4) |
| `services`  | lista `{ id, mode, price? }` | `mode`: `included` \| `optional`; `price` sobrepõe o preço base do serviço |

## 6. Serviço (`service`)

| Campo        | Tipo | Descrição |
|--------------|------|-----------|
| `id`, `name`, `short` | texto | Identificação e descrição curta |
| `tag`        | texto | Selo no card do equipamento quando incluído ("Montagem incluída") |
| `stage`      | `antes` · `arranque` · `operacao` | Agrupa a página de serviços |
| `includes`   | lista | O que o serviço inclui |
| `duration`   | texto | "2 – 3 h", "Contrato anual" |
| `pricing.mode` | `included` · `free` · `fixed` · `from` · `monthly` · `quote` | Como se mostra o preço |
| `pricing.price` / `unit` | número / texto | "15 € / unid." |
| `appliesTo`  | lista de tipos | Tipos de equipamento compatíveis |
| `standalone` | bool | Pode ser pedido sem comprar equipamento |

---

## 7. Mapeamento Shopify sugerido

| Modelo | Shopify |
|--------|---------|
| Tipo de equipamento | Metaobject `equipment_type` (com `fields` como JSON ou metaobjects `equipment_field`) |
| Características (`attrs`) | Metafields de produto `equipment.<key>` (tipados: número, lista, texto) |
| Necessidades (`requires`) | Metafields `installation.energia`, `.agua`, `.montagem`, `.espaco` |
| Serviço | Metaobject `service` |
| Serviços do equipamento | Metafield `equipment.services` (lista de refs a `service`) + `equipment.services_mode` (JSON) — ou serviços opcionais como **produtos ocultos** adicionados por line item property no carrinho |
| Filtros | Search & Discovery: ativar os metafields marcados com ★ |

---

## 8. Decisões em aberto

1. **Tipos de equipamento finais** — a lista acima é de exemplo. Quais existem de facto no catálogo?
2. **Mobilidade (Brio Ride-On)** fica neste catálogo ou passa a uma loja/linha à parte?
3. **Serviços opcionais no carrinho**: linha própria (produto oculto) ou propriedade da linha do equipamento?
4. **Preços de serviço por região** (ilhas, deslocações longas): preço fixo nacional ou acréscimo por zona?
5. **Aluguer / financiamento**: algum equipamento será vendido em renting? (Implica um `priceMode: 'rent'`.)
6. **Ficha técnica e FDS**: ficam como ficheiros por equipamento (metafield `file_reference`)?
