// Estrutura de navegação e conteúdo da homepage.
// Categorias reorganizadas a partir de mistolinsolutions.com
// (Cozinha, Lavandaria, Superfícies, Desinfetantes + setores HORECA,
// Indústria, Facilities, Auto), agrupadas para um mega menu limpo.

export const nav = {
  produtos: {
    label: 'Produtos',
    columns: [
      {
        title: 'Cozinha',
        href: '#',
        links: [
          'Desengordurantes',
          'Loiça manual',
          'Loiça máquina',
          'Fornos e grelhadores',
          'Higienização de alimentos',
        ],
      },
      {
        title: 'Lavandaria',
        href: '#',
        links: [
          'Detergentes de roupa',
          'Amaciadores',
          'Tira-nódoas e branqueadores',
          'Roupa profissional',
        ],
      },
      {
        title: 'Superfícies',
        href: '#',
        links: [
          'Multiusos',
          'Pavimentos',
          'Vidros e inox',
          'Madeiras',
          'Ambientadores',
        ],
      },
      {
        title: 'Desinfeção',
        href: '#',
        links: [
          'Desinfetantes alimentares',
          'Virucidas e bactericidas',
          'Gel desinfetante',
          'Casa de banho e WC',
        ],
      },
    ],
    highlights: ['Novidades', 'Promoções e bundles', 'Mais vendidos', 'Todos os produtos'],
    featured: {
      eyebrow: 'EM DESTAQUE',
      title: 'Tiragorduras HTG-30',
      text: 'O desengordurante nº1 para cozinhas profissionais.',
      cta: 'Ver produto',
      href: '/produto/htg-30',
    },
  },
  solucoes: {
    label: 'Soluções',
    sectors: [
      { title: 'HORECA', text: 'Restaurantes, hotéis e cafés' },
      { title: 'Indústria alimentar', text: 'Higienização agroalimentar' },
      { title: 'Saúde e cuidados', text: 'Clínicas, lares e IPSS' },
      { title: 'Facilities', text: 'Escritórios e grandes espaços' },
      { title: 'Automóvel', text: 'Lavagem e detailing' },
      { title: 'Economia social', text: 'Condições dedicadas' },
    ],
  },
  simple: [
    { label: 'Sustentabilidade', href: '#' },
    { label: 'Contactos', href: '#' },
  ],
}

export const home = {
  slides: [
    {
      id: 'htg30',
      eyebrow: 'LINHA COZINHA',
      title: 'O fim das gorduras difíceis.',
      text: 'Tiragorduras HTG-30 — o desengordurante alcalino de eleição das cozinhas profissionais. Atua em 5 minutos, mesmo a quente.',
      cta: 'Comprar HTG-30',
      href: '/produto/htg-30',
      tone: 'light',
      price: '4,35 €',
    },
    {
      id: 'bundles',
      eyebrow: 'OPORTUNIDADES',
      title: 'Bundles com até 15% de poupança.',
      text: 'Packs promocionais por tempo limitado — do pack do dia a dia ao fornecimento trimestral da sua operação.',
      cta: 'Ver bundles',
      href: '/produto/htg-30',
      tone: 'dark',
      badge: '−15%',
    },
    {
      id: 'pro',
      eyebrow: 'PARA EMPRESAS',
      title: 'Condições dedicadas para volume.',
      text: 'Faturação com NIF, fichas técnicas e de segurança, apoio técnico especializado e propostas para revenda.',
      cta: 'Pedir proposta',
      href: '#',
      tone: 'accent',
    },
  ],
  categories: [
    { title: 'Cozinha', text: 'Desengordurantes, loiça e fornos', count: 42 },
    { title: 'Lavandaria', text: 'Detergentes e amaciadores', count: 28 },
    { title: 'Superfícies', text: 'Multiusos, pavimentos e inox', count: 35 },
    { title: 'Desinfeção', text: 'Alimentar, virucida e WC', count: 31 },
  ],
  featured: [
    { id: '750ml', name: 'Tiragorduras HTG-30', detail: '750 mL · Pulverizador', price: 4.35, tag: 'Mais vendido', href: '/produto/htg-30' },
    { id: 'DDA-90', name: 'Desinfetante Alimentar DDA-90', detail: '750 mL · Pulverizador', price: 5.2, href: '#' },
    { id: 'INX-25', name: 'Brilha Inox INX-25', detail: '750 mL · Pulverizador', price: 6.1, href: '#' },
    { id: 'LTP-40', name: 'Lava-Tudo Pavimentos LTP-40', detail: '5 LT · Recarga', price: 3.8, href: '#' },
    { id: '5lt', name: 'Tiragorduras HTG-30', detail: '5 LT · Recarga', price: 15.9, tag: 'Melhor €/L', href: '/produto/htg-30' },
    { id: 'Pack Tiragorduras', name: 'Pack Tiragorduras', detail: '2× 750 mL + 5 LT', price: 21.9, full: 24.6, tag: 'Bundle', href: '/produto/htg-30' },
  ],
  sectors: [
    { title: 'HORECA', text: 'Cozinhas, salas e quartos impecáveis, turno após turno.' },
    { title: 'Indústria alimentar', text: 'Higienização certificada para linhas de produção.' },
    { title: 'Saúde e cuidados', text: 'Desinfeção rigorosa para espaços sensíveis.' },
    { title: 'Facilities', text: 'Grandes áreas, consumos otimizados.' },
  ],
  usps: [
    { icon: 'truck', title: 'Expedição 24–48h', text: 'Portugal continental' },
    { icon: 'shield', title: 'Pagamento seguro', text: 'SSL, MB Way, Multibanco' },
    { icon: 'return', title: 'Devoluções em 14 dias', text: 'Sem complicações' },
    { icon: 'shield', title: 'Apoio técnico', text: 'Equipa especializada' },
  ],
}
