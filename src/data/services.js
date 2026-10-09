// SERVIÇOS — nunca vendidos em vazio: cada serviço declara os tipos de
// equipamento a que se aplica (`appliesTo`) e cada equipamento declara se o
// traz incluído ou como opção (ver equipmentCatalog.js → services).
//
// pricing.mode:
//   'included' → sempre incluído no equipamento
//   'free'     → gratuito (ex.: visita técnica com proposta)
//   'fixed'    → preço fechado (price, unit opcional: "/unid.")
//   'from'     → "desde" price
//   'monthly'  → "desde" price/mês (contratos)
//   'quote'    → sob orçamento
// tag: selo curto quando vem incluído no equipamento ("Montagem incluída").
// standalone: pode ser pedido para um equipamento que já tens (manutenção,
// assistência). Os restantes só existem agregados à compra do equipamento.

import { equipmentItems, typeOf } from './equipmentCatalog'

export const serviceStages = [
  { id: 'antes', label: 'Antes da compra', text: 'Para escolheres o equipamento certo.' },
  { id: 'arranque', label: 'No arranque', text: 'Para o equipamento ficar a funcionar no próprio dia.' },
  { id: 'operacao', label: 'No dia a dia', text: 'Para continuar a funcionar como no primeiro dia.' },
]

export const services = [
  {
    id: 'visita-tecnica',
    tag: 'Visita técnica incluída',
    stage: 'antes',
    name: 'Visita técnica e diagnóstico',
    short: 'Vamos ao teu espaço, vemos a operação e dizemos-te o que faz sentido instalar — e onde.',
    includes: ['Levantamento de pontos de água e energia', 'Recomendação de equipamento', 'Proposta por escrito'],
    duration: '≈ 1 h',
    pricing: { mode: 'free' },
    appliesTo: ['doseamento', 'maquina', 'limpeza'],
    standalone: true,
  },
  {
    id: 'instalacao-doseamento',
    tag: 'Montagem incluída',
    stage: 'arranque',
    name: 'Montagem de central de doseamento',
    short: 'Fixamos a central, ligamos à rede de água e calibramos cada saída ao teu plano de higiene.',
    includes: ['Fixação em parede', 'Ligação à rede de água', 'Calibração por saída'],
    duration: '2 – 3 h',
    pricing: { mode: 'from', price: 120 },
    appliesTo: ['doseamento'],
  },
  {
    id: 'instalacao-maquina',
    tag: 'Instalação incluída',
    stage: 'arranque',
    name: 'Instalação de doseador em máquina',
    short: 'Ligamos as bombas à tua máquina de loiça ou de roupa e programamos a dose de cada ciclo.',
    includes: ['Ligação das bombas', 'Programação por ciclo', 'Teste de lavagem'],
    duration: '2 – 4 h',
    pricing: { mode: 'from', price: 150 },
    appliesTo: ['maquina'],
  },
  {
    id: 'montagem-dispensador',
    tag: 'Montagem incluída',
    stage: 'arranque',
    name: 'Montagem de dispensadores',
    short: 'Colocamos os dispensadores à altura certa e deixamo-los carregados e prontos a usar.',
    includes: ['Fixação e nivelamento', 'Primeira carga incluída'],
    duration: '≈ 15 min / unid.',
    pricing: { mode: 'fixed', price: 15, unit: '/ unid.' },
    appliesTo: ['dispensadores'],
  },
  {
    id: 'entrega-arranque',
    tag: 'Entrega e arranque incluídos',
    stage: 'arranque',
    name: 'Entrega e arranque',
    short: 'Entregamos, montamos, carregamos e fazemos a primeira utilização contigo.',
    includes: ['Entrega no local', 'Montagem e verificação', 'Recolha da embalagem'],
    duration: '≈ 1 h',
    pricing: { mode: 'included' },
    appliesTo: ['limpeza', 'mobilidade'],
  },
  {
    id: 'formacao-equipa',
    tag: 'Formação incluída',
    stage: 'arranque',
    name: 'Formação da equipa',
    short: 'Uma sessão prática para a tua equipa usar o equipamento com segurança desde o primeiro turno.',
    includes: ['Utilização e segurança', 'Boas práticas de diluição', 'Guia rápido impresso'],
    duration: '≈ 45 min',
    pricing: { mode: 'from', price: 90 },
    appliesTo: ['doseamento', 'maquina', 'limpeza'],
  },
  {
    id: 'manutencao-preventiva',
    stage: 'operacao',
    name: 'Plano de manutenção preventiva',
    short: 'Visitas periódicas para rever, limpar e recalibrar — antes de algo falhar.',
    includes: ['2 visitas por ano', 'Peças de desgaste incluídas', 'Prioridade na assistência'],
    duration: 'Contrato anual',
    pricing: { mode: 'monthly', price: 19 },
    appliesTo: ['doseamento', 'maquina', 'limpeza'],
    standalone: true,
  },
  {
    id: 'recalibracao',
    stage: 'operacao',
    name: 'Recalibração de diluições',
    short: 'Mudaste de produto ou de plano de higiene? Acertamos as doses no local.',
    includes: ['Medição de diluição', 'Ajuste por saída', 'Relatório de calibração'],
    duration: '≈ 1 h',
    pricing: { mode: 'fixed', price: 65 },
    appliesTo: ['doseamento', 'maquina'],
    standalone: true,
  },
  {
    id: 'assistencia-tecnica',
    stage: 'operacao',
    name: 'Assistência técnica',
    short: 'Algo parou? Um técnico da unidade mais próxima resolve no local.',
    includes: ['Diagnóstico no local', 'Reparação e peças', 'Resposta em 48 h úteis'],
    duration: 'Conforme avaria',
    pricing: { mode: 'quote' },
    appliesTo: ['doseamento', 'maquina', 'limpeza', 'mobilidade'],
    standalone: true,
  },
]

const fmt = (n) => `${Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')} €`

export const getService = (id) => services.find((s) => s.id === id) || null

export const priceLabel = (pricing, override) => {
  const price = override ?? pricing.price
  switch (pricing.mode) {
    case 'included': return 'Incluído'
    case 'free': return 'Gratuito'
    case 'fixed': return `${fmt(price)}${pricing.unit ? ` ${pricing.unit}` : ''}`
    case 'from': return `desde ${fmt(price)}`
    case 'monthly': return `desde ${fmt(price)}/mês`
    default: return 'Sob orçamento'
  }
}

// Serviços resolvidos de um equipamento (com o modo incluído/opcional).
export const servicesForItem = (item) =>
  (item?.services || [])
    .map((ref) => {
      const s = getService(ref.id)
      return s ? { ...s, mode: ref.mode, label: ref.mode === 'included' ? 'Incluído' : priceLabel(s.pricing, ref.price) } : null
    })
    .filter(Boolean)

export const servicesForSlug = (slug) => servicesForItem(equipmentItems.find((e) => e.slug === slug))

// Equipamentos que trazem (incluído ou como opção) um serviço.
export const itemsForService = (serviceId) => equipmentItems.filter((e) => e.services.some((r) => r.id === serviceId))

export const typesForService = (s) => s.appliesTo.map(typeOf).filter(Boolean)
