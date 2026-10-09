// Catálogo de EQUIPAMENTOS com campos dinâmicos.
//
// Cada equipamento pertence a um TIPO. O tipo define o seu próprio esquema de
// campos (`fields`) — as características que fazem sentido para aquele tipo
// (saídas de um doseador ≠ largura de trabalho de uma lavadora). A página de
// listagem gera filtros, chips dos cards e comparações a partir deste esquema,
// sem código específico por tipo.
//
// As NECESSIDADES de instalação (energia, água, montagem…) são transversais a
// todos os tipos e vivem em `requirementFields`, para poderem ser filtradas no
// catálogo inteiro.
//
// Mapeamento Shopify sugerido (ver docs/campos-dinamicos.md):
//   tipo de equipamento → metaobject `equipment_type`
//   fields              → metafields `equipment.<key>` no produto
//   services            → metafield `equipment.services` (lista de referências
//                          a metaobjects `service`) + modo incluído/opcional

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
      { key: 'autonomia', label: 'Autonomia', type: 'number', unit: 'min' },
    ],
  },
  {
    id: 'mobilidade',
    label: 'Mobilidade',
    short: 'Mobilidade',
    text: 'Scooters elétricas para o dia a dia.',
    fields: [
      { key: 'autonomia', label: 'Autonomia', type: 'number', unit: 'km', filter: true, card: true },
      { key: 'velocidade', label: 'Velocidade máx.', type: 'number', unit: 'km/h', card: true },
      { key: 'carga', label: 'Peso máx. utilizador', type: 'number', unit: 'kg' },
    ],
  },
]

// ——— equipamentos ———
// short: nome curto para chips e referências cruzadas (ex.: página de serviços).
// price: null + priceMode 'quote' → "Sob proposta".
// services: [{ id, mode: 'included' | 'optional', price? }] — `price` substitui
// o preço base do serviço para este equipamento.
// href: página de produto, quando existe (template /equipamento/:slug).
export const equipmentItems = [
  {
    slug: 'mixpro-ds4',
    short: 'MixPro DS-4',
    type: 'doseamento',
    name: 'Central de Doseamento MixPro DS-4',
    code: 'DS-4',
    price: 890,
    priceMode: 'from',
    badge: 'Mais vendido',
    href: '/equipamento/mixpro-ds4',
    attrs: { saidas: 4, modo: ['Balde', 'Pulverizador', 'Recarga'], caudal: 8, diluicao: '0,1 – 10 %' },
    requires: { energia: 'Sem energia', agua: 'Água fria', montagem: 'Parede', espaco: '40 × 30 × 15 cm' },
    services: [
      { id: 'instalacao-doseamento', mode: 'included' },
      { id: 'formacao-equipa', mode: 'included' },
      { id: 'manutencao-preventiva', mode: 'optional' },
    ],
  },
  {
    slug: 'mixpro-ds2',
    short: 'MixPro DS-2',
    type: 'doseamento',
    name: 'Central de Doseamento MixPro DS-2',
    code: 'DS-2',
    price: 590,
    priceMode: 'from',
    attrs: { saidas: 2, modo: ['Balde', 'Pulverizador'], caudal: 8, diluicao: '0,1 – 10 %' },
    requires: { energia: 'Sem energia', agua: 'Água fria', montagem: 'Parede', espaco: '25 × 30 × 15 cm' },
    services: [
      { id: 'instalacao-doseamento', mode: 'included' },
      { id: 'formacao-equipa', mode: 'included' },
      { id: 'manutencao-preventiva', mode: 'optional' },
    ],
  },
  {
    slug: 'mixpro-ds1',
    short: 'MixPro DS-1',
    type: 'doseamento',
    name: 'Doseador de Parede MixPro DS-1',
    code: 'DS-1',
    price: 249,
    priceMode: 'fixed',
    badge: 'Novo',
    attrs: { saidas: 1, modo: ['Pulverizador'], caudal: 4, diluicao: '0,5 – 5 %' },
    requires: { energia: 'Sem energia', agua: 'Água fria', montagem: 'Parede', espaco: '15 × 25 × 12 cm' },
    services: [
      { id: 'instalacao-doseamento', mode: 'optional', price: 79 },
      { id: 'recalibracao', mode: 'optional' },
    ],
  },
  {
    slug: 'dosematic-l3',
    short: 'Dosematic L3',
    type: 'maquina',
    name: 'Doseador Dosematic L3 Lava-Loiça',
    code: 'L3',
    price: 690,
    priceMode: 'from',
    attrs: { aplicacao: 'Lava-loiça', bombas: 3, controlo: 'Sinal da máquina', maquinas: 1 },
    requires: { energia: '230 V', agua: 'Não precisa', montagem: 'Na máquina', espaco: 'Junto à máquina' },
    services: [
      { id: 'instalacao-maquina', mode: 'included' },
      { id: 'formacao-equipa', mode: 'included' },
      { id: 'manutencao-preventiva', mode: 'optional' },
    ],
  },
  {
    slug: 'dosematic-w5',
    short: 'Dosematic W5',
    type: 'maquina',
    name: 'Doseador Dosematic W5 Lavandaria',
    code: 'W5',
    price: null,
    priceMode: 'quote',
    attrs: { aplicacao: 'Lavandaria', bombas: 5, controlo: 'Condutividade', maquinas: 3 },
    requires: { energia: '230 V', agua: 'Não precisa', montagem: 'Parede', espaco: '60 × 40 × 20 cm' },
    services: [
      { id: 'visita-tecnica', mode: 'included' },
      { id: 'instalacao-maquina', mode: 'included' },
      { id: 'formacao-equipa', mode: 'included' },
      { id: 'manutencao-preventiva', mode: 'optional' },
    ],
  },
  {
    slug: 'dispensador-sab-auto',
    short: 'Sabonete automático',
    type: 'dispensadores',
    name: 'Dispensador Automático de Sabonete',
    code: 'DSP-A1',
    price: 39.9,
    priceMode: 'fixed',
    attrs: { produto: 'Sabonete', acionamento: 'Automático', capacidade: 1, material: 'ABS' },
    requires: { energia: 'Pilhas', agua: 'Não precisa', montagem: 'Parede', espaco: '12 × 25 × 11 cm' },
    services: [{ id: 'montagem-dispensador', mode: 'optional' }],
  },
  {
    slug: 'dispensador-gel-inox',
    short: 'Gel em inox',
    type: 'dispensadores',
    name: 'Dispensador de Gel em Inox',
    code: 'DSP-M2',
    price: 54.5,
    priceMode: 'fixed',
    attrs: { produto: 'Gel desinfetante', acionamento: 'Manual', capacidade: 0.9, material: 'Inox' },
    requires: { energia: 'Sem energia', agua: 'Não precisa', montagem: 'Parede', espaco: '11 × 22 × 10 cm' },
    services: [{ id: 'montagem-dispensador', mode: 'optional' }],
  },
  {
    slug: 'lavadora-ls45',
    short: 'Lavadora LS-45',
    type: 'limpeza',
    name: 'Lavadora de Pavimentos LS-45',
    code: 'LS-45',
    price: 3490,
    priceMode: 'from',
    attrs: { largura: 45, rendimento: 1800, deposito: 40, autonomia: 120 },
    requires: { energia: 'Bateria', agua: 'Água fria', montagem: 'Móvel', espaco: 'Arrumação com tomada' },
    services: [
      { id: 'entrega-arranque', mode: 'included' },
      { id: 'formacao-equipa', mode: 'included' },
      { id: 'manutencao-preventiva', mode: 'optional', price: 39 },
    ],
  },
  {
    slug: 'lavadora-ls30',
    short: 'Lavadora LS-30',
    type: 'limpeza',
    name: 'Lavadora Compacta LS-30',
    code: 'LS-30',
    price: 1690,
    priceMode: 'from',
    attrs: { largura: 30, rendimento: 900, deposito: 15, autonomia: 0 },
    requires: { energia: '230 V', agua: 'Água fria', montagem: 'Móvel', espaco: 'Arrumação com tomada' },
    services: [
      { id: 'entrega-arranque', mode: 'included' },
      { id: 'formacao-equipa', mode: 'optional' },
      { id: 'manutencao-preventiva', mode: 'optional' },
    ],
  },
  {
    slug: 'brio-ride-on-75-550',
    short: 'Brio Ride-On',
    type: 'mobilidade',
    name: 'Scooter Brio Ride-On 75-550',
    code: '75-550',
    price: 2190,
    priceMode: 'from',
    href: '/equipamento/brio-ride-on-75-550',
    attrs: { autonomia: 45, velocidade: 15, carga: 160 },
    requires: { energia: 'Bateria', agua: 'Não precisa', montagem: 'Móvel', espaco: 'Desmontável · cabe na bagageira' },
    services: [{ id: 'entrega-arranque', mode: 'included' }],
  },
]

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
