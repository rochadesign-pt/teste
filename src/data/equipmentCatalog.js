// DEFINIÇÕES dos campos dinâmicos dos EQUIPAMENTOS + adaptador para as páginas.
//
// Os equipamentos em si são produtos Shopify normais (ver shop.js). Aqui ficam
// apenas as DEFINIÇÕES de metafields:
//   · equipmentTypes[].fields → metafields `equipamento.<key>` — cada tipo
//     (metaobject `tipo_equipamento`) diz quais se aplicam e quais filtram.
//   · requirementFields       → metafields `instalacao.<key>`, comuns a todos.
// As chaves são únicas no catálogo inteiro (ex.: `autonomia_min` vs
// `autonomia_km`), porque no Shopify cada metafield tem um só tipo e unidade.

import { products, mf, minPrice, bySku } from './shop'

// ——— definição de campo ———
// { key, label, type: 'number' | 'enum' | 'multi' | 'boolean' | 'text',
//   unit?, unitOne? (singular), options?, filter?: true, card?: true, help? }

export const requirementFields = [
  { key: 'energia', label: 'Energia', type: 'enum', options: ['Sem energia', '230 V', '400 V trifásico', 'Bateria', 'Pilhas'], filter: true },
  { key: 'agua', label: 'Ponto de água', type: 'enum', options: ['Não precisa', 'Água fria', 'Água quente e fria'], filter: true },
  { key: 'montagem', label: 'Montagem', type: 'enum', options: ['Parede', 'Chão', 'Na máquina', 'Móvel'], filter: true },
  { key: 'espaco', label: 'Espaço necessário', type: 'text' },
]

export const equipmentTypes = [
  {
    id: 'doseamento',
    label: 'Centrais de doseamento',
    short: 'Doseamento',
    text: 'Diluem os concentrados na medida certa, sem desperdício.',
    fields: [
      { key: 'saidas', label: 'Saídas', type: 'number', unit: 'saídas', unitOne: 'saída', filter: true, card: true },
      { key: 'modo', label: 'Modo de enchimento', type: 'multi', options: ['Balde', 'Pulverizador', 'Recarga'], filter: true, card: true },
      { key: 'caudal', label: 'Caudal', type: 'number', unit: 'L/min' },
      { key: 'diluicao', label: 'Gama de diluição', type: 'text' },
    ],
  },
  {
    id: 'maquina',
    label: 'Doseadores para máquinas',
    short: 'Máquinas',
    text: 'Dosagem automática para máquinas de loiça e de roupa.',
    fields: [
      { key: 'aplicacao', label: 'Aplicação', type: 'enum', options: ['Lava-loiça', 'Lavandaria'], filter: true, card: true },
      { key: 'bombas', label: 'Bombas', type: 'number', unit: 'bombas', unitOne: 'bomba', filter: true, card: true },
      { key: 'controlo', label: 'Controlo', type: 'enum', options: ['Temporizado', 'Sinal da máquina', 'Condutividade'], filter: true },
      { key: 'maquinas', label: 'Máquinas servidas', type: 'number', unit: 'máq.' },
    ],
  },
  {
    id: 'dispensadores',
    label: 'Dispensadores',
    short: 'Dispensadores',
    text: 'Sabonete, gel e papel — à mão de quem precisa.',
    fields: [
      { key: 'produto', label: 'Produto', type: 'enum', options: ['Sabonete', 'Gel desinfetante', 'Papel'], filter: true, card: true },
      { key: 'acionamento', label: 'Acionamento', type: 'enum', options: ['Manual', 'Automático'], filter: true, card: true },
      { key: 'capacidade', label: 'Capacidade', type: 'number', unit: 'L' },
      { key: 'material', label: 'Material', type: 'enum', options: ['ABS', 'Inox'], filter: true },
    ],
  },
  {
    id: 'limpeza',
    label: 'Máquinas de limpeza',
    short: 'Limpeza',
    text: 'Lavadoras de pavimento para grandes áreas.',
    fields: [
      { key: 'largura', label: 'Largura de trabalho', type: 'number', unit: 'cm', filter: true, card: true },
      { key: 'rendimento', label: 'Rendimento', type: 'number', unit: 'm²/h', card: true },
      { key: 'deposito', label: 'Depósito', type: 'number', unit: 'L' },
      { key: 'autonomia_min', label: 'Autonomia', type: 'number', unit: 'min' },
    ],
  },
  {
    id: 'mobilidade',
    label: 'Mobilidade',
    short: 'Mobilidade',
    text: 'Scooters elétricas para o dia a dia.',
    fields: [
      { key: 'autonomia_km', label: 'Autonomia', type: 'number', unit: 'km', filter: true, card: true },
      { key: 'velocidade', label: 'Velocidade máx.', type: 'number', unit: 'km/h', card: true },
      { key: 'carga', label: 'Peso máx. utilizador', type: 'number', unit: 'kg' },
    ],
  },
]

// ——— equipamentos (derivados dos produtos Shopify) ———
// Forma usada pelas páginas: { slug, short, type, name, code, price, priceMode,
// badge, href, attrs, requires, services: [{ id, sku, mode }] }
const PRICE_MODE = { fixo: 'fixed', desde: 'from', proposta: 'quote' }
const fieldsOf = (p, ns) => Object.fromEntries(Object.entries(p.metafields).filter(([k]) => k.startsWith(ns + '.')).map(([k, v]) => [k.slice(ns.length + 1), v]))

export const toEquipmentItem = (p) => {
  const mode = PRICE_MODE[mf(p, 'custom.preco_modo')] || 'fixed'
  return {
    slug: p.handle,
    short: mf(p, 'custom.nome_curto') || p.title,
    type: mf(p, 'equipamento.tipo'),
    name: p.title,
    code: mf(p, 'custom.codigo'),
    price: mode === 'quote' ? null : minPrice(p),
    priceMode: mode,
    badge: mf(p, 'custom.selo') || null,
    href: mf(p, 'custom.pagina') || null,
    attrs: fieldsOf(p, 'equipamento'),
    requires: fieldsOf(p, 'instalacao'),
    // referências a variantes de serviço (SKU) → { id: handle do serviço, sku, mode }
    services: [
      ...(mf(p, 'servicos.incluidos') || []).map((sku) => ({ sku, mode: 'included' })),
      ...(mf(p, 'servicos.opcionais') || []).map((sku) => ({ sku, mode: 'optional' })),
    ]
      .map((r) => ({ ...r, id: bySku(r.sku)?.product.handle }))
      .filter((r) => r.id),
  }
}

export const equipmentItems = products.filter((p) => p.productType === 'Equipamento').map(toEquipmentItem)

// ——— helpers ———
export const typeOf = (id) => equipmentTypes.find((t) => t.id === id) || null
export const countByType = (id) => equipmentItems.filter((e) => e.type === id).length

// Formata o valor de um campo dinâmico para leitura humana.
export const formatField = (field, value) => {
  if (value == null || value === '' || (Array.isArray(value) && !value.length)) return null
  if (field.type === 'boolean') return value ? field.label : null
  if (field.type === 'multi') return value.join(' · ')
  if (field.type === 'number') {
    if (value === 0) return null
    const n = String(value).replace('.', ',')
    const unit = value === 1 && field.unitOne ? field.unitOne : field.unit
    return unit ? `${n} ${unit}` : n
  }
  return String(value)
}

// Valores distintos de um campo num conjunto de equipamentos (para filtros).
export const valuesOf = (items, key, source = 'attrs') => {
  const set = new Set()
  items.forEach((e) => {
    const v = e[source]?.[key]
    if (Array.isArray(v)) v.forEach((x) => set.add(x))
    else if (v != null && v !== 0) set.add(v)
  })
  return [...set].sort((a, b) => (typeof a === 'number' ? a - b : String(a).localeCompare(String(b))))
}

// O equipamento tem o valor pedido? (lida com campos multi)
export const matches = (value, wanted) => (Array.isArray(value) ? value.some((v) => wanted.includes(v)) : wanted.includes(value))
