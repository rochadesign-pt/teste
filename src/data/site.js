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
        slug: 'cozinha',
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
        slug: 'lavandaria',
        links: [
          'Detergentes de roupa',
          'Amaciadores',
          'Tira-nódoas e branqueadores',
          'Roupa profissional',
        ],
      },
      {
        title: 'Superfícies',
        slug: 'superficies',
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
        slug: 'desinfecao',
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
  // ——— Hero: slideshow full-width de novidades (3–4 banners) ———
  slides: [
    {
      id: 'htg30',
      eyebrow: 'LINHA COZINHA · MAIS VENDIDO',
      title: 'O fim das gorduras difíceis.',
      text: 'Tiragorduras HTG-30 — o desengordurante alcalino de eleição das cozinhas profissionais. Atua em 5 minutos, mesmo a quente.',
      cta: 'Comprar HTG-30',
      href: '/produto/htg-30',
      scene: 'kitchen',
      subject: 'mist',
      price: '4,35 €',
    },
    {
      id: 'bundles',
      eyebrow: 'OPORTUNIDADES · TEMPO LIMITADO',
      title: 'Bundles com até 15% de poupança.',
      text: 'Packs promocionais — do pack do dia a dia ao fornecimento trimestral da sua operação.',
      cta: 'Ver oportunidades',
      href: '/produto/htg-30',
      scene: 'green',
      subject: 'set',
      badge: '−15%',
    },
    {
      id: 'agro',
      eyebrow: 'NOVIDADE',
      title: 'Nova linha agroalimentar certificada.',
      text: 'Higienização aprovada para a indústria de transformação — HACCP e notificação DGS.',
      cta: 'Descobrir a linha',
      href: '#',
      scene: 'steel',
      subject: 'bottle',
    },
    {
      id: 'pro',
      eyebrow: 'PARA EMPRESAS',
      title: 'Condições dedicadas para volume.',
      text: 'Faturação com NIF, fichas técnicas e de segurança, apoio técnico especializado e propostas para revenda.',
      cta: 'Pedir proposta',
      href: '#',
      scene: 'green',
      subject: 'bottle',
    },
  ],
  // ——— Deal of the day ———
  deal: {
    eyebrow: 'OFERTA DO DIA',
    key: 'pack',
    stock: { sold: 68, total: 100 },
    endsInHours: 8,
  },
  // ——— Logos / certificações ———
  brands: ['HACCP', 'ISO 9001', 'Fabricado em Portugal', 'Biodegradável', 'Notificado DGS', 'Vegan OK'],
  // ——— Blog / conteúdo ———
  articles: [
    { category: 'Guia', title: 'Como desengordurar um forno de convecção em 5 minutos', date: '12 Jul 2026', read: '4 min', scene: 'kitchen' },
    { category: 'Boas práticas', title: 'Diluições certas: quanto produto por litro de água?', date: '3 Jul 2026', read: '6 min', scene: 'steel' },
    { category: 'HORECA', title: 'Plano de higienização para cozinhas profissionais', date: '28 Jun 2026', read: '8 min', scene: 'green' },
  ],
  categories: [
    { title: 'Cozinha', text: 'Desengordurantes, loiça e fornos', count: 42, scene: 'kitchen', subject: 'bottle' },
    { title: 'Lavandaria', text: 'Detergentes e amaciadores', count: 28, scene: 'cream', subject: 'bottle' },
    { title: 'Superfícies', text: 'Multiusos, pavimentos e inox', count: 35, scene: 'steel', subject: 'bottle' },
    { title: 'Desinfeção', text: 'Alimentar, virucida e WC', count: 31, scene: 'green', subject: 'bottle' },
    { title: 'Mãos & Pele', text: 'Sabonetes e gel desinfetante', count: 18, scene: 'cream', subject: 'mist' },
    { title: 'Auto & Detailing', text: 'Lavagem e acabamento', count: 22, scene: 'steel', subject: 'bottle' },
  ],
  // ——— Catálogo para as tabs (Novidades / Mais vendidos / Promoções) ———
  productTabs: [
    { id: 'mais-vendidos', label: 'Mais vendidos' },
    { id: 'novidades', label: 'Novidades' },
    { id: 'promocoes', label: 'Promoções' },
  ],
  products: [
    { key: 'htg750', id: '750ml', name: 'Tiragorduras HTG-30', detail: '750 mL · Pulverizador', price: 4.35, tag: 'Mais vendido', scene: 'kitchen', href: '/produto/htg-30', tabs: ['mais-vendidos'] },
    { key: 'dda90', id: 'DDA-90', name: 'Desinfetante Alimentar DDA-90', detail: '750 mL · Pulverizador', price: 5.2, tag: 'Novo', scene: 'green', href: '#', tabs: ['novidades', 'mais-vendidos'] },
    { key: 'inx25', id: 'INX-25', name: 'Brilha Inox INX-25', detail: '750 mL · Pulverizador', price: 6.1, scene: 'steel', href: '#', tabs: ['mais-vendidos'] },
    { key: 'mup10', id: null, name: 'Multiusos Perfumado MUP-10', detail: '1 LT · Concentrado', price: 2.95, scene: 'cream', href: '#', tabs: ['mais-vendidos', 'novidades'] },
    { key: 'htg5', id: '5lt', name: 'Tiragorduras HTG-30', detail: '5 LT · Recarga', price: 15.9, tag: 'Melhor €/L', scene: 'kitchen', href: '/produto/htg-30', tabs: ['mais-vendidos'] },
    { key: 'dlm15', id: null, name: 'Detergente Loiça Manual DLM-15', detail: '1 LT · Concentrado', price: 3.2, tag: 'Novo', scene: 'cream', href: '#', tabs: ['novidades'] },
    { key: 'amt50', id: null, name: 'Amaciador Têxtil AMT-50', detail: '5 LT · Recarga', price: 4.9, tag: 'Novo', scene: 'cream', href: '#', tabs: ['novidades'] },
    { key: 'agro', id: null, name: 'Higienizante Agroalimentar AGH-12', detail: '5 LT · Recarga', price: 12.4, tag: 'Novo', scene: 'steel', href: '#', tabs: ['novidades'] },
    { key: 'pack', id: 'Pack Tiragorduras', name: 'Pack Tiragorduras', detail: '2× 750 mL + recarga 5 LT', price: 21.9, full: 24.6, tag: '−11%', scene: 'green', href: '/produto/htg-30', tabs: ['promocoes'] },
    { key: 'trim', id: 'Fornecimento Trimestral', name: 'Fornecimento Trimestral', detail: '4× HTG-30 5 LT', price: 56.9, full: 63.6, tag: '−11%', scene: 'green', href: '/produto/htg-30', tabs: ['promocoes'] },
    { key: 'gdm70', id: null, name: 'Gel Desinfetante Mãos GDM-70', detail: '500 mL · 70% álcool', price: 3.6, full: 4.5, tag: '−20%', scene: 'green', href: '#', tabs: ['promocoes'] },
    { key: 'ltp40', id: 'LTP-40', name: 'Lava-Tudo Pavimentos LTP-40', detail: '5 LT · Recarga', price: 3.8, full: 4.6, tag: '−17%', scene: 'steel', href: '#', tabs: ['promocoes'] },
  ],
  // ——— Grid banners promocionais ———
  banners: [
    {
      eyebrow: 'RECARGAS',
      title: 'Poupe até 40% por litro',
      text: 'Formatos de 5, 10 e 20 LT para reabastecer a operação.',
      cta: 'Ver recargas',
      href: '/produto/htg-30',
      scene: 'steel',
      subject: 'set',
    },
    {
      eyebrow: 'NOVIDADE',
      title: 'Linha agroalimentar certificada',
      text: 'Higienização aprovada para indústria de transformação.',
      cta: 'Descobrir',
      href: '#',
      scene: 'green',
      subject: 'bottle',
    },
  ],
  // ——— Coleção em destaque ———
  showcase: {
    eyebrow: 'EM FOCO',
    title: 'Linha Cozinha',
    text: 'Do fogão ao pavimento — tudo o que uma cozinha profissional precisa.',
    href: '#',
    keys: ['htg750', 'dda90', 'inx25', 'dlm15'],
  },
  // ——— Strip de ícones de categoria (sob o header) ———
  iconCategories: [
    { title: 'Cozinha', slug: 'cozinha', icon: 'flame' },
    { title: 'Lavandaria', slug: 'lavandaria', icon: 'drop' },
    { title: 'Superfícies', slug: 'superficies', icon: 'sparkle' },
    { title: 'Desinfeção', slug: 'desinfecao', icon: 'shield' },
    { title: 'Mãos & Pele', slug: 'maos-pele', icon: 'hand' },
    { title: 'Auto', slug: 'auto', icon: 'car' },
    { title: 'Agroalimentar', slug: 'agroalimentar', icon: 'leaf' },
    { title: 'Acessórios', slug: 'acessorios', icon: 'tool' },
    { title: 'Fornos', slug: 'cozinha', icon: 'flame' },
    { title: 'Pavimentos', slug: 'superficies', icon: 'sparkle' },
  ],
  // ——— New Arrivals (promo lateral + carrossel) ———
  newArrivals: {
    promo: { eyebrow: 'DESTAQUE', title: 'Linha Cozinha profissional', text: 'A gama que resolve as gorduras mais difíceis.', cta: 'Comprar', href: '/categoria/cozinha' },
    tabs: [
      { id: 'novidades', label: 'Novidades' },
      { id: 'mais-vendidos', label: 'Mais vendidos' },
    ],
  },
  // ——— Grelha de coleções (banners de imagem) ———
  collectionTiles: [
    { title: 'Concentrados de alto rendimento', slug: 'cozinha', scene: 'kitchen', subject: 'bottle', span: false },
    { title: 'Certificado para agroalimentar', slug: 'agroalimentar', scene: 'green', subject: 'mist', span: false },
    { title: 'Recargas económicas até 20 LT', slug: 'superficies', scene: 'steel', subject: 'set', span: false },
    { title: 'Higiene de mãos e pele', slug: 'maos-pele', scene: 'cream', subject: 'mist', span: false },
  ],
  lifestyleSplit: {
    small: [
      { title: 'Cozinha', slug: 'cozinha', scene: 'kitchen' },
      { title: 'Desinfeção', slug: 'desinfecao', scene: 'green' },
    ],
    big: { title: 'Cozinhas profissionais impecáveis, turno após turno.', cta: 'Ver soluções HORECA', href: '#', scene: 'kitchen' },
  },
  // ——— Feature de testemunho (produto + citação) ———
  feature: {
    productKey: 'htg750',
    quote: 'Todos os produtos são desenvolvidos e fabricados em Portugal, testados em operação real.',
    name: 'Equipa Mistolin PRO',
    role: 'Vale de Cambra',
  },
  // ——— Inspiração por espaços ———
  spaces: [
    { title: 'Restaurantes & bares', scene: 'kitchen', count: 42 },
    { title: 'Hotelaria', scene: 'cream', count: 35 },
    { title: 'Indústria alimentar', scene: 'steel', count: 28 },
  ],
  // ——— Dois promo banners lado a lado ———
  twoPromos: [
    { title: 'Tiragorduras', discount: '−40% €/L', text: 'Nas recargas de 20 LT', cta: 'Comprar', href: '/produto/htg-30', scene: 'kitchen' },
    { title: 'Desinfeção', discount: '−30%', text: 'Gama alimentar e virucida', cta: 'Comprar', href: '/categoria/desinfecao', scene: 'green' },
  ],
  // ——— Shop Our Offers (chips + grelha) ———
  offersChips: ['Cozinha', 'Pavimentos', 'Inox', 'Loiça', 'Recargas', 'Desinfeção', 'Mãos', 'Agroalimentar'],
  // ——— Sobre a Mistolin (studio) ———
  studio: {
    eyebrow: 'DESDE 2009',
    title: 'A equipa por trás da Mistolin',
    text: 'A Mistolin Solutions nasceu em 2009 em Vale de Cambra, dedicada à higiene e limpeza profissional. Representa marcas nacionais e internacionais, com a Mistolin PRO no centro da oferta.',
    points: ['Higiene profissional desde 2009', 'Fabrico e I&D em Portugal', 'Mais de 200 produtos em catálogo'],
    cta: 'Falar com a equipa',
    href: '#',
  },
  // ——— Barra de citação ———
  quoteBar: {
    main: 'Produtos com resultados que se veem — feitos por quem conhece a operação por dentro.',
    author: 'Mistolin PRO',
    left: 'Higiene profissional',
    right: 'Fabricado em Portugal',
  },
  // ——— Difference in the Details ———
  details: {
    eyebrow: 'NA PRÁTICA',
    title: 'A diferença está nos detalhes',
    text: 'Da diluição certa ao formato ideal — cada produto pensado para render mais e trabalhar menos.',
    cta: 'Ver guias',
    href: '#',
    selects: [
      { label: 'Escolher volumetria', key: 'htg5' },
      { label: 'Escolher desinfetante', key: 'dda90k' },
      { label: 'Escolher acessórios', key: 'inx25' },
    ],
  },
  // ——— Marquee de palavras-chave ———
  keywords: ['Tiragorduras', 'Desinfetantes', 'Loiça', 'Pavimentos', 'Inox', 'Recargas', 'Agroalimentar', 'Mãos & Pele'],
  // ——— Approach (4 features) ———
  approach: {
    title: 'Uma abordagem pensada para profissionais',
    chips: ['Certificado HACCP', 'Fabricado em PT', 'Apoio técnico', 'Stock garantido'],
    features: [
      { title: 'Eficaz', text: 'Fórmulas concentradas de elevado rendimento.', scene: 'kitchen' },
      { title: 'Transparente', text: 'Fichas técnicas e de segurança em todos os produtos.', scene: 'steel' },
      { title: 'Certificado', text: 'Aprovado para contacto alimentar e uso profissional.', scene: 'green' },
      { title: 'Sustentável', text: 'Formulações biodegradáveis e recargas que reduzem plástico.', scene: 'cream' },
    ],
  },
  // ——— We're on Gram ———
  gram: [
    { scene: 'kitchen', subject: 'bottle', handle: '@cozinha.doporto' },
    { scene: 'steel', subject: 'mist', handle: '@hotelmar.algarve' },
    { scene: 'green', subject: 'set', handle: '@grupohoreca.pt' },
    { scene: 'cream', subject: 'bottle', handle: '@pastelaria.central' },
    { scene: 'kitchen', subject: 'mist', handle: '@churrasqueira.lx' },
    { scene: 'steel', subject: 'bottle', handle: '@limpeza.pro.pt' },
  ],
  // ——— Serviços (rodapé superior) ———
  services: [
    { icon: 'headset', title: 'Apoio ao cliente', text: '+351 256 000 000' },
    { icon: 'chat', title: 'Dúvidas & FDS', text: 'apoio@mistolin.pt' },
    { icon: 'truck', title: 'Expedição', text: '24–48h · Portugal' },
    { icon: 'pin', title: 'Sede', text: 'Vale de Cambra, PT' },
  ],
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
  usps: [
    { icon: 'truck', title: 'Expedição 24–48h', text: 'Portugal continental' },
    { icon: 'shield', title: 'Pagamento seguro', text: 'SSL, MB Way, Multibanco' },
    { icon: 'return', title: 'Devoluções em 14 dias', text: 'Sem complicações' },
    { icon: 'shield', title: 'Apoio técnico', text: 'Equipa especializada' },
  ],
}
