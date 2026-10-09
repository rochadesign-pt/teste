// SERVIÇOS — adaptador sobre os produtos Shopify com productType 'Serviço'
// (ver shop.js). Um serviço é um produto normal, escondido da pesquisa e das
// coleções (`seo.hidden`), que só aparece agarrado a um equipamento:
//   · equipamento.metafields['servicos.incluidos'] → variantes já pagas no preço
//   · equipamento.metafields['servicos.opcionais'] → variantes que se juntam ao carrinho
// `servico.avulso` = pode ser pedido para um equipamento que o cliente já tem.

import { byType, mf, minPrice, bySku } from './shop'
import { equipmentItems, typeOf } from './equipmentCatalog'

export const serviceStages = [
  { id: 'antes', label: 'Antes da compra', text: 'Para escolheres o equipamento certo.' },
  { id: 'arranque', label: 'No arranque', text: 'Para o equipamento ficar a funcionar no próprio dia.' },
  { id: 'operacao', label: 'No dia a dia', text: 'Para continuar a funcionar como no primeiro dia.' },
]

const PRICE_MODE = { incluido: 'included', gratuito: 'free', fixo: 'fixed', desde: 'from', mensal: 'monthly', orcamento: 'quote' }

// Forma usada pelas páginas.
export const services = byType('Serviço').map((p) => ({
  id: p.handle,
  name: p.title,
  tag: mf(p, 'servico.selo') || null,
  stage: mf(p, 'servico.etapa'),
  short: mf(p, 'servico.resumo'),
  includes: mf(p, 'servico.inclui') || [],
  duration: mf(p, 'servico.duracao'),
  pricing: { mode: PRICE_MODE[mf(p, 'servico.preco_modo')] || 'quote', price: minPrice(p), unit: mf(p, 'servico.unidade') || null },
  appliesTo: mf(p, 'servico.aplica_a') || [],
  standalone: !!mf(p, 'servico.avulso'),
}))

const fmt = (n) => `${Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')} €`

export const getService = (id) => services.find((s) => s.id === id) || null

// `exact`: preço de uma variante concreta (sem "desde").
export const priceLabel = (pricing, exact) => {
  const price = exact ?? pricing.price
  const unit = pricing.unit ? ` ${pricing.unit}` : ''
  switch (pricing.mode) {
    case 'included': return 'Incluído'
    case 'free': return 'Gratuito'
    case 'monthly': return `${exact == null ? 'desde ' : ''}${fmt(price)}/mês`
    case 'quote': return 'Sob orçamento'
    case 'from': return exact == null ? `desde ${fmt(price)}${unit}` : `${fmt(price)}${unit}`
    default: return `${fmt(price)}${unit}`
  }
}

// Serviços resolvidos de um equipamento (com o modo incluído/opcional e o
// preço da variante referenciada).
export const servicesForItem = (item) =>
  (item?.services || [])
    .map((ref) => {
      const s = getService(ref.id)
      if (!s) return null
      const price = bySku(ref.sku)?.variant.price
      return { ...s, sku: ref.sku, mode: ref.mode, label: ref.mode === 'included' ? 'Incluído' : priceLabel(s.pricing, price) }
    })
    .filter(Boolean)

export const servicesForSlug = (slug) => servicesForItem(equipmentItems.find((e) => e.slug === slug))

// Equipamentos que trazem (incluído ou como opção) um serviço.
export const itemsForService = (serviceId) => equipmentItems.filter((e) => e.services.some((r) => r.id === serviceId))

export const typesForService = (s) => s.appliesTo.map(typeOf).filter(Boolean)
