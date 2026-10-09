// Gera o CSV de importação de produtos do Shopify a partir de src/data/shop.js.
// Uso: npm run export:shopify  →  docs/shopify-produtos.csv
//
// Uma linha por variante (formato oficial do Shopify): a primeira linha de cada
// produto leva os dados do produto e os metafields; as seguintes só a variante.
// Metafields em colunas "Nome (product.metafields.namespace.key)".
//
// Nota: `servicos.incluidos` / `servicos.opcionais` são referências a variantes.
// O CSV do Shopify não resolve SKUs em referências, por isso saem numa coluna
// auxiliar (SKUs) para ligar depois da importação (Matrixify ou Admin API).

import { writeFileSync } from 'node:fs'
import { products } from '../src/data/shop.js'

const REFERENCE_KEYS = ['servicos.incluidos', 'servicos.opcionais']

const metafieldKeys = [...new Set(products.flatMap((p) => Object.keys(p.metafields)))]
  .filter((k) => !REFERENCE_KEYS.includes(k) && k !== 'seo.hidden')
  .sort()

const label = (key) => key.split('.')[1].replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())

const header = [
  'Handle', 'Title', 'Vendor', 'Type', 'Tags', 'Published', 'Status',
  'Option1 Name', 'Option1 Value', 'Option2 Name', 'Option2 Value',
  'Variant SKU', 'Variant Price', 'Variant Compare At Price', 'Variant Requires Shipping', 'Variant Taxable',
  'Variant Inventory Policy', 'Variant Fulfillment Service',
  'SEO hidden (product.metafields.seo.hidden)',
  ...metafieldKeys.map((k) => `${label(k)} (product.metafields.${k})`),
  'Coleções (manual)',
  ...REFERENCE_KEYS.map((k) => `${label(k)} — SKUs (ligar após importação)`),
]

const cell = (v) => {
  if (v == null) return ''
  if (Array.isArray(v)) v = v.join('; ')
  if (typeof v === 'boolean') v = v ? 'true' : 'false'
  const s = String(v)
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

const rows = [header]
products.forEach((p) => {
  p.variants.forEach((v, i) => {
    const first = i === 0
    const opts = p.options.map((o) => [o.name, v.options?.[o.name] ?? ''])
    const isService = p.productType === 'Serviço'
    rows.push([
      p.handle,
      first ? p.title : '',
      first ? p.vendor : '',
      first ? p.productType : '',
      first ? p.tags : '',
      first ? 'true' : '',
      first ? 'active' : '',
      opts[0]?.[0] ?? (first ? 'Title' : ''), opts[0]?.[1] ?? 'Default Title',
      opts[1]?.[0] ?? '', opts[1]?.[1] ?? '',
      v.sku, v.price.toFixed(2), v.compareAtPrice ? v.compareAtPrice.toFixed(2) : '',
      v.requiresShipping ? 'true' : 'false', v.taxable ? 'true' : 'false',
      isService ? 'continue' : 'deny', 'manual',
      first && p.metafields['seo.hidden'] ? '1' : '',
      ...metafieldKeys.map((k) => (first ? p.metafields[k] : '')),
      first ? p.collections : '',
      ...REFERENCE_KEYS.map((k) => (first ? p.metafields[k] : '')),
    ])
  })
})

const csv = rows.map((r) => r.map(cell).join(',')).join('\n') + '\n'
const out = new URL('../docs/shopify-produtos.csv', import.meta.url)
writeFileSync(out, csv)
console.log(`${products.length} produtos · ${rows.length - 1} variantes → docs/shopify-produtos.csv`)
