export const product = {
  brand: 'MISTOLIN PRO',
  line: 'Linha Cozinha',
  code: 'HTG-30',
  name: 'Tiragorduras HTG-30',
  tagline: 'O fim das gorduras difíceis.',
  description:
    'Poderoso desengordurante com elevada alcalinidade, ideal para garantir o desagregamento das gorduras. Remove gorduras acumuladas, óleos, sujidades orgânicas e manchas de todas as superfícies laváveis e equipamentos.',
  price: 4.35,
  rating: 4.8,
  reviews: 132,
  checklist: [
    'Desagrega gorduras carbonizadas e óleos acumulados',
    'Realça o brilho de superfícies em aço inoxidável',
    'Aplicável a quente — fornos, grelhadores e chapas',
    'Diluível até 10% para pavimentos e manutenção',
    'Compatível com madeira, plástico, vidro e pintados',
  ],
  formats: [
    { id: '750ml', label: '750 mL', detail: 'Pulverizador', price: 4.35, liters: 0.75, tag: 'Mais vendido' },
    { id: '5lt', label: '5 LT', detail: 'Recarga', price: 15.9, liters: 5 },
    { id: '10lt', label: '10 LT', detail: 'Recarga', price: 28.5, liters: 10 },
    { id: '20lt', label: '20 LT', detail: 'Recarga', price: 52.0, liters: 20, tag: 'Melhor €/L' },
  ],
  freeShippingFrom: 30,
  payments: ['Visa', 'Mastercard', 'MB Way', 'Multibanco', 'PayPal', 'Apple Pay'],
  guarantees: [
    { icon: 'shield', title: 'Pagamento seguro', text: 'Transações encriptadas SSL' },
    { icon: 'truck', title: 'Expedição 24–48h', text: 'Portugal continental' },
    { icon: 'return', title: 'Devoluções em 14 dias', text: 'Sem complicações' },
  ],
  benefits: [
    {
      title: 'Poder desengordurante extremo',
      text: 'Elevada alcalinidade que desagrega gorduras carbonizadas, óleos e sujidades orgânicas — mesmo as mais antigas.',
    },
    {
      title: 'Brilho no aço inoxidável',
      text: 'Limpa e realça o brilho de bancadas, fogões e equipamentos em inox, sem esforço extra.',
    },
    {
      title: 'Atua mesmo a quente',
      text: 'Pode ser aplicado em fornos, grelhadores e chapas ainda quentes, para uma limpeza mais rápida no serviço.',
    },
    {
      title: 'Versátil na aplicação',
      text: 'Manual, imersão ou pulverização. Compatível com madeira, plástico, vidro e superfícies pintadas resistentes a alcalinos.',
    },
  ],
  steps: [
    {
      n: '01',
      title: 'Pulverizar',
      text: 'Aplicar o produto diretamente sobre a superfície — fogões, fornos, grelhadores ou filtros de exaustão, mesmo a quente.',
    },
    {
      n: '02',
      title: 'Deixar atuar 5 min',
      text: 'A fórmula alcalina desagrega a gordura sem ação mecânica intensiva. Em pavimentos, aplicar numa diluição até 10%, com mopa ou máquina de lavar.',
    },
    {
      n: '03',
      title: 'Enxaguar',
      text: 'Enxaguar abundantemente com água e deixar secar. Superfícies limpas, desengorduradas e com o brilho do inox realçado.',
    },
  ],
  stats: [
    { value: 13, suffix: '–14', label: 'pH — alcalinidade máxima' },
    { value: 5, suffix: ' min', label: 'tempo de atuação' },
    { value: 30, suffix: '%', label: 'matéria ativa total' },
    { value: 10, suffix: '%', label: 'diluição em pavimentos' },
  ],
  combos: [
    {
      code: 'DDA-90',
      name: 'Desinfetante Alimentar DDA-90',
      detail: 'Desinfeção de superfícies em contacto com alimentos',
      price: 5.2,
    },
    {
      code: 'INX-25',
      name: 'Brilha Inox INX-25',
      detail: 'Acabamento e proteção de bancadas em aço inoxidável',
      price: 6.1,
    },
    {
      code: 'LTP-40',
      name: 'Lava-Tudo Pavimentos LTP-40',
      detail: 'Manutenção diária de pavimentos de cozinha',
      price: 3.8,
    },
  ],
  // Kits: conjuntos funcionais onde o HTG-30 está incluído.
  // `image`: caminho para a foto do conjunto (ex.: '/kits/cozinha.jpg').
  // Enquanto for null, o tile mostra um fallback ilustrado.
  kits: [
    {
      name: 'Kit Cozinha Profissional',
      role: 'Desengordurar, desinfetar e dar brilho',
      items: ['HTG-30 750 mL', 'Desinfetante DDA-90', 'Brilha Inox INX-25'],
      price: 13.9,
      full: 15.65,
      image: null,
    },
    {
      name: 'Kit Arranque HORECA',
      role: 'Equipar um espaço de raiz',
      items: ['HTG-30 5 LT', 'Lava-Tudo LTP-40 5 LT', '2 pulverizadores doseadores'],
      price: 34.5,
      full: 40.4,
      image: null,
    },
  ],
  // Bundles: conjuntos promocionais do próprio HTG-30
  bundles: [
    {
      name: 'Pack Tiragorduras',
      role: 'Poupança no formato do dia a dia',
      items: ['2× HTG-30 750 mL', '1× recarga HTG-30 5 LT'],
      price: 21.9,
      full: 24.6,
      image: null,
    },
    {
      name: 'Fornecimento Trimestral',
      role: 'Stock para 3 meses de operação',
      items: ['4× HTG-30 5 LT', 'Envio prioritário incluído'],
      price: 56.9,
      full: 63.6,
      image: null,
    },
  ],
  reviewSummary: {
    average: 4.8,
    total: 132,
    distribution: [
      { stars: 5, count: 108 },
      { stars: 4, count: 17 },
      { stars: 3, count: 5 },
      { stars: 2, count: 1 },
      { stars: 1, count: 1 },
    ],
  },
  reviews: [
    {
      name: 'Ricardo M.',
      role: 'Chef executivo · Restaurante, Braga',
      rating: 5,
      date: 'há 2 semanas',
      title: 'Insubstituível na nossa cozinha',
      body: 'Usamos em fritadeiras e grelhadores todos os dias. Dissolve gordura carbonizada que antes exigia horas de esfrega. A diluição a 10% chega e sobra para os pavimentos.',
      verified: true,
    },
    {
      name: 'Sónia P.',
      role: 'Governanta · Hotel 4*, Albufeira',
      rating: 5,
      date: 'há 1 mês',
      title: 'Rendimento e poupança',
      body: 'Passámos para a recarga de 20 LT e o custo por litro compensa muito. O acabamento no inox fica impecável, sem marcas nem película.',
      verified: true,
    },
    {
      name: 'António F.',
      role: 'Responsável de compras · Cozinha industrial',
      rating: 4,
      date: 'há 1 mês',
      title: 'Muito eficaz, cuidado com o cheiro',
      body: 'Poder desengordurante excelente e entrega rápida com fatura. Deixo 4 estrelas apenas porque o odor alcalino é intenso — usar sempre com ventilação e proteção.',
      verified: true,
    },
    {
      name: 'Marta L.',
      role: 'Proprietária · Pastelaria',
      rating: 5,
      date: 'há 2 meses',
      title: 'Resolveu o problema dos fornos',
      body: 'Os fornos de convecção estavam impossíveis. Pulverizei a quente, deixei atuar e saiu tudo. Recomendo a qualquer estabelecimento com produção intensiva.',
      verified: true,
    },
  ],
  faqs: [
    {
      q: 'Posso aplicar o HTG-30 com o equipamento ainda quente?',
      a: 'Sim. O HTG-30 foi formulado para atuar em superfícies quentes como fornos, grelhadores e chapas, o que acelera a limpeza durante o serviço. Pulverize diretamente, deixe atuar cerca de 5 minutos e enxague abundantemente.',
    },
    {
      q: 'Qual a diluição recomendada para pavimentos?',
      a: 'Para pavimentos e limpezas de manutenção, recomenda-se uma diluição até 10% (1 parte de produto para 9 de água), aplicada com mopa ou máquina de lavar. Em gordura muito incrustada, pode usar-se puro sobre a zona afetada.',
    },
    {
      q: 'É compatível com superfícies em contacto com alimentos?',
      a: 'O HTG-30 é um desengordurante alcalino de uso profissional. Após a aplicação, enxague sempre abundantemente com água potável antes de a superfície voltar a contactar com alimentos. Para desinfeção específica, complemente com o DDA-90.',
    },
    {
      q: 'Que materiais posso limpar em segurança?',
      a: 'É compatível com aço inoxidável, madeira, plástico, vidro e superfícies pintadas resistentes a produtos alcalinos. Em materiais sensíveis (alumínio, superfícies delicadas), teste previamente numa zona discreta.',
    },
    {
      q: 'Emitem fatura com NIF para empresas?',
      a: 'Sim. Todas as encomendas incluem fatura com NIF. Para volumes industriais, contratos de fornecimento recorrente ou condições de revenda, contacte a nossa equipa comercial para uma proposta dedicada.',
    },
    {
      q: 'Onde encontro a ficha de dados de segurança?',
      a: 'A ficha técnica e a ficha de dados de segurança (FDS) estão disponíveis para download na secção de detalhes do produto, e podem ser solicitadas à equipa comercial a qualquer momento.',
    },
  ],
  specs: [
    {
      title: 'Aplicações',
      body: 'Limpeza de fogões, fornos, grelhadores, filtros de exaustores e outros equipamentos de cozinha. Ideal também para superfícies duras laváveis: bancadas, pavimentos, paredes e utensílios.',
    },
    {
      title: 'Características técnicas',
      body: 'Líquido alaranjado não viscoso. pH 13.0–14.0. Matéria ativa total 25–30%. Densidade 1.06 ± 0.01. Contém tensioativos aniónicos e não iónicos (5–15%), fosfatos (<5%) e hidróxido de potássio.',
    },
    {
      title: 'Modo de utilização',
      body: 'Equipamentos: pulverizar diretamente (mesmo a quente), deixar atuar 5 minutos e enxaguar abundantemente. Pavimentos: utilizar numa diluição até 10%. Testar previamente em materiais sensíveis a produtos alcalinos.',
    },
    {
      title: 'Segurança',
      body: 'Produto de uso profissional. Provoca queimaduras na pele e lesões oculares graves — usar luvas e proteção ocular. Manter fora do alcance das crianças. Ficha de dados de segurança disponível a pedido.',
    },
  ],
}

export const catalog = Object.fromEntries([
  ...product.formats.map((f) => [
    f.id,
    { id: f.id, name: `Tiragorduras HTG-30 · ${f.label}`, detail: f.detail, price: f.price, kind: 'format' },
  ]),
  ...product.combos.map((c) => [
    c.code,
    { id: c.code, name: c.name, detail: c.detail, price: c.price, kind: 'combo' },
  ]),
  ...product.kits.map((k) => [
    k.name,
    { id: k.name, name: k.name, detail: k.items.join(' + '), price: k.price, full: k.full, kind: 'kit' },
  ]),
  ...product.bundles.map((b) => [
    b.name,
    { id: b.name, name: b.name, detail: b.items.join(' + '), price: b.price, full: b.full, kind: 'bundle' },
  ]),
])
