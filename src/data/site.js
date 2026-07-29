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
  // Slides do hero — imagem full-bleed com texto sobreposto.
  // `image`: caminho para a fotografia real; enquanto null usa a cena.
  slides: [
    {
      id: 'htg30',
      eyebrow: 'LINHA COZINHA',
      title: 'O fim das gorduras difíceis.',
      text: 'Tiragorduras HTG-30 — o desengordurante alcalino de eleição das cozinhas profissionais. Atua em 5 minutos, mesmo a quente.',
      cta: 'Comprar HTG-30',
      href: '/produto/htg-30',
      scene: 'kitchen',
      image: null,
      card: { name: 'Tiragorduras HTG-30', detail: '750 mL', price: '4,35 €' },
    },
    {
      id: 'bundles',
      eyebrow: 'OPORTUNIDADES · TEMPO LIMITADO',
      title: 'Bundles com até 15% de poupança.',
      text: 'Packs promocionais — do pack do dia a dia ao fornecimento trimestral da sua operação.',
      cta: 'Ver bundles',
      href: '/produto/htg-30',
      scene: 'green',
      image: null,
      badge: '−15%',
    },
    {
      id: 'pro',
      eyebrow: 'PARA EMPRESAS',
      title: 'Condições dedicadas para volume.',
      text: 'Faturação com NIF, fichas técnicas e FDS, apoio técnico especializado e propostas para revenda.',
      cta: 'Pedir proposta',
      href: '#',
      scene: 'steel',
      image: null,
    },
  ],
  categories: [
    { title: 'Cozinha', text: 'Desengordurantes, loiça e fornos', count: 42, scene: 'kitchen', subject: 'bottle' },
    { title: 'Lavandaria', text: 'Detergentes e amaciadores', count: 28, scene: 'cream', subject: 'bottle' },
    { title: 'Superfícies', text: 'Multiusos, pavimentos e inox', count: 35, scene: 'steel', subject: 'bottle' },
    { title: 'Desinfeção', text: 'Alimentar, virucida e WC', count: 31, scene: 'green', subject: 'bottle' },
  ],
  science: {
    eyebrow: 'PORQUÊ MISTOLIN PRO',
    title: 'Química profissional, resultados visíveis.',
    text: 'Formulações desenvolvidas com equipas técnicas e testadas em operação real — não em laboratório apenas.',
    points: [
      'Fórmulas de elevada concentração — rendem mais por litro',
      'Fichas técnicas e de segurança para todos os produtos',
      'Compatibilidade testada com os materiais da sua cozinha',
      'Fabricado em Portugal, stock e entrega garantidos',
    ],
    stats: [
      { value: '2.400+', label: 'operações servidas' },
      { value: '35 anos', label: 'de indústria' },
      { value: '98%', label: 'entregas em 48h' },
    ],
  },
  beforeAfter: {
    eyebrow: 'RESULTADOS REAIS',
    title: 'Da gordura carbonizada ao brilho, em 5 minutos.',
    before: { label: 'Antes', text: 'Gordura acumulada de semanas de serviço' },
    after: { label: 'Depois', text: 'Uma aplicação de HTG-30, sem esfregar' },
  },
  testimonials: [
    {
      quote: 'Dissolve gordura carbonizada que antes exigia horas de esfrega. Insubstituível.',
      name: 'Ricardo M.',
      role: 'Chef executivo · Braga',
      rating: 5,
    },
    {
      quote: 'Passámos para as recargas de 20 LT e o custo por litro compensa muito.',
      name: 'Sónia P.',
      role: 'Governanta · Hotel 4★, Albufeira',
      rating: 5,
    },
    {
      quote: 'Entrega rápida, fatura certa e apoio técnico que responde. Raro.',
      name: 'António F.',
      role: 'Compras · Cozinha industrial',
      rating: 4,
    },
    {
      quote: 'Os fornos de convecção estavam impossíveis. Uma aplicação e saiu tudo.',
      name: 'Marta L.',
      role: 'Proprietária · Pastelaria',
      rating: 5,
    },
  ],
  gallery: [
    { scene: 'kitchen', subject: 'bottle', label: '@cozinha.doporto' },
    { scene: 'steel', subject: 'mist', label: '@hotelmar.algarve' },
    { scene: 'green', subject: 'set', label: '@grupohoreca.pt' },
    { scene: 'cream', subject: 'bottle', label: '@pastelaria.central' },
    { scene: 'kitchen', subject: 'mist', label: '@churrasqueira.lx' },
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
