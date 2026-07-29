// Catálogo da loja — categorias e produtos para as páginas de coleção.
// Estrutura pensada para mapear diretamente para coleções Shopify.

export const shopCategories = [
  {
    slug: 'cozinha',
    title: 'Cozinha',
    text: 'Desengordurantes, loiça, fornos e higienização de alimentos.',
    scene: 'kitchen',
    subject: 'bottle',
    subcats: ['Desengordurantes', 'Loiça manual', 'Loiça máquina', 'Fornos e grelhadores', 'Higiene alimentar'],
  },
  {
    slug: 'lavandaria',
    title: 'Lavandaria',
    text: 'Detergentes de roupa, amaciadores, tira-nódoas e branqueadores.',
    scene: 'cream',
    subject: 'bottle',
    subcats: ['Detergentes de roupa', 'Amaciadores', 'Tira-nódoas', 'Branqueadores'],
  },
  {
    slug: 'superficies',
    title: 'Superfícies',
    text: 'Multiusos, pavimentos, vidros, inox, madeiras e ambientadores.',
    scene: 'steel',
    subject: 'bottle',
    subcats: ['Multiusos', 'Pavimentos', 'Vidros e inox', 'Madeiras', 'Ambientadores'],
  },
  {
    slug: 'desinfecao',
    title: 'Desinfeção',
    text: 'Desinfetantes alimentares, virucidas, bactericidas e WC.',
    scene: 'green',
    subject: 'bottle',
    subcats: ['Alimentar', 'Virucidas', 'Bactericidas', 'Casa de banho'],
  },
  {
    slug: 'maos-pele',
    title: 'Mãos & Pele',
    text: 'Sabonetes, gel desinfetante e cuidado de mãos.',
    scene: 'cream',
    subject: 'mist',
    subcats: ['Sabonetes', 'Gel desinfetante', 'Cremes'],
  },
  {
    slug: 'auto',
    title: 'Auto & Detailing',
    text: 'Lavagem, desengorduramento e acabamento automóvel.',
    scene: 'steel',
    subject: 'bottle',
    subcats: ['Lavagem', 'Interiores', 'Acabamento'],
  },
  {
    slug: 'agroalimentar',
    title: 'Agroalimentar',
    text: 'Higienização certificada para indústria de transformação.',
    scene: 'green',
    subject: 'bottle',
    subcats: ['Superfícies', 'Equipamentos', 'CIP'],
  },
  {
    slug: 'acessorios',
    title: 'Acessórios & Doseadores',
    text: 'Pulverizadores, doseadores, panos e utensílios.',
    scene: 'steel',
    subject: 'bottle',
    subcats: ['Pulverizadores', 'Doseadores', 'Panos e esfregões'],
  },
]

// id: quando existe no catálogo do carrinho (product.js), permite add-to-cart.
export const shopProducts = [
  // Cozinha
  { key: 'htg750', id: '750ml', cat: 'cozinha', sub: 'Desengordurantes', name: 'Tiragorduras HTG-30', detail: '750 mL · Pulverizador', price: 4.35, tag: 'Mais vendido', scene: 'kitchen', href: '/produto/htg-30', new: false },
  { key: 'htg5', id: '5lt', cat: 'cozinha', sub: 'Desengordurantes', name: 'Tiragorduras HTG-30', detail: '5 LT · Recarga', price: 15.9, tag: 'Melhor €/L', scene: 'kitchen', href: '/produto/htg-30' },
  { key: 'htg20', id: '20lt', cat: 'cozinha', sub: 'Desengordurantes', name: 'Tiragorduras HTG-30', detail: '20 LT · Recarga', price: 52.0, scene: 'kitchen', href: '/produto/htg-30' },
  { key: 'dlm15', id: null, cat: 'cozinha', sub: 'Loiça manual', name: 'Detergente Loiça DLM-15', detail: '1 LT · Concentrado', price: 3.2, tag: 'Novo', scene: 'cream', href: '#', new: true },
  { key: 'lmq30', id: null, cat: 'cozinha', sub: 'Loiça máquina', name: 'Loiça Máquina LMQ-30', detail: '5 LT · Recarga', price: 11.5, scene: 'steel', href: '#' },
  { key: 'frn20', id: null, cat: 'cozinha', sub: 'Fornos e grelhadores', name: 'Limpa-Fornos FRN-20', detail: '750 mL · Gel', price: 5.8, scene: 'kitchen', href: '#', new: true },
  { key: 'dda90k', id: 'DDA-90', cat: 'cozinha', sub: 'Higiene alimentar', name: 'Desinfetante Alimentar DDA-90', detail: '750 mL · Pulverizador', price: 5.2, scene: 'green', href: '#' },
  // Superfícies
  { key: 'mup10', id: null, cat: 'superficies', sub: 'Multiusos', name: 'Multiusos Perfumado MUP-10', detail: '1 LT · Concentrado', price: 2.95, tag: 'Mais vendido', scene: 'cream', href: '#' },
  { key: 'ltp40', id: 'LTP-40', cat: 'superficies', sub: 'Pavimentos', name: 'Lava-Tudo Pavimentos LTP-40', detail: '5 LT · Recarga', price: 3.8, full: 4.6, tag: '−17%', scene: 'steel', href: '#' },
  { key: 'inx25', id: 'INX-25', cat: 'superficies', sub: 'Vidros e inox', name: 'Brilha Inox INX-25', detail: '750 mL · Pulverizador', price: 6.1, scene: 'steel', href: '#' },
  { key: 'vdr08', id: null, cat: 'superficies', sub: 'Vidros e inox', name: 'Limpa-Vidros VDR-08', detail: '750 mL · Pulverizador', price: 2.6, scene: 'steel', href: '#' },
  { key: 'mad30', id: null, cat: 'superficies', sub: 'Madeiras', name: 'Cuida-Madeiras MAD-30', detail: '750 mL · Emulsão', price: 4.4, tag: 'Novo', scene: 'cream', href: '#', new: true },
  { key: 'amb05', id: null, cat: 'superficies', sub: 'Ambientadores', name: 'Ambientador Concentrado AMB-05', detail: '1 LT · Concentrado', price: 5.5, scene: 'green', href: '#' },
  // Desinfeção
  { key: 'dda90d', id: 'DDA-90', cat: 'desinfecao', sub: 'Alimentar', name: 'Desinfetante Alimentar DDA-90', detail: '750 mL · Pulverizador', price: 5.2, tag: 'Mais vendido', scene: 'green', href: '#' },
  { key: 'vir99', id: null, cat: 'desinfecao', sub: 'Virucidas', name: 'Virucida VIR-99', detail: '5 LT · Recarga', price: 18.9, scene: 'green', href: '#', new: true },
  { key: 'gdm70', id: null, cat: 'desinfecao', sub: 'Bactericidas', name: 'Gel Desinfetante Mãos GDM-70', detail: '500 mL · 70% álcool', price: 3.6, full: 4.5, tag: '−20%', scene: 'green', href: '#' },
  { key: 'wc12', id: null, cat: 'desinfecao', sub: 'Casa de banho', name: 'Desinfetante WC WC-12', detail: '750 mL · Gel', price: 2.9, scene: 'steel', href: '#' },
  // Lavandaria
  { key: 'dtr25', id: null, cat: 'lavandaria', sub: 'Detergentes de roupa', name: 'Detergente Roupa DTR-25', detail: '5 LT · Líquido', price: 9.9, tag: 'Mais vendido', scene: 'cream', href: '#' },
  { key: 'amt50', id: null, cat: 'lavandaria', sub: 'Amaciadores', name: 'Amaciador Têxtil AMT-50', detail: '5 LT · Recarga', price: 4.9, tag: 'Novo', scene: 'cream', href: '#', new: true },
  { key: 'brq40', id: null, cat: 'lavandaria', sub: 'Branqueadores', name: 'Branqueador Oxi BRQ-40', detail: '5 LT · Líquido', price: 7.2, scene: 'cream', href: '#' },
  // Mãos & Pele
  { key: 'sab15', id: null, cat: 'maos-pele', sub: 'Sabonetes', name: 'Sabonete Líquido SAB-15', detail: '5 LT · Recarga', price: 6.4, scene: 'cream', href: '#' },
  { key: 'gdm70m', id: null, cat: 'maos-pele', sub: 'Gel desinfetante', name: 'Gel Desinfetante Mãos GDM-70', detail: '500 mL · 70% álcool', price: 3.6, scene: 'green', href: '#' },
  // Auto
  { key: 'aut30', id: null, cat: 'auto', sub: 'Lavagem', name: 'Champô Auto AUT-30', detail: '5 LT · Concentrado', price: 8.9, tag: 'Novo', scene: 'steel', href: '#', new: true },
  // Agroalimentar
  { key: 'agh12', id: null, cat: 'agroalimentar', sub: 'Superfícies', name: 'Higienizante Agroalimentar AGH-12', detail: '5 LT · Recarga', price: 12.4, tag: 'Novo', scene: 'steel', href: '#', new: true },
  { key: 'cip20', id: null, cat: 'agroalimentar', sub: 'CIP', name: 'Detergente CIP-20', detail: '20 LT · Recarga', price: 44.0, scene: 'green', href: '#' },
  // Acessórios
  { key: 'pulv', id: null, cat: 'acessorios', sub: 'Pulverizadores', name: 'Pulverizador Doseador 750 mL', detail: 'Unidade · Reutilizável', price: 1.9, scene: 'steel', href: '#' },
  { key: 'dos', id: null, cat: 'acessorios', sub: 'Doseadores', name: 'Bomba Doseadora 5 LT', detail: 'Unidade · Ajustável', price: 4.5, scene: 'steel', href: '#' },
]

export const formatOf = (detail) => {
  const d = detail.toLowerCase()
  if (d.includes('pulverizador')) return 'Pulverizador'
  if (d.includes('recarga')) return 'Recarga'
  if (d.includes('concentrado')) return 'Concentrado'
  if (d.includes('gel')) return 'Gel'
  return 'Outro'
}

export const countByCat = (slug) => shopProducts.filter((p) => p.cat === slug).length
