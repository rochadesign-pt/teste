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
  bundles: [
    {
      name: 'Pack Tiragorduras',
      items: '2× HTG-30 750 mL + recarga 5 LT',
      price: 21.9,
      full: 24.6,
    },
    {
      name: 'Kit Cozinha Profissional',
      items: 'HTG-30 750 mL + DDA-90 + INX-25',
      price: 13.9,
      full: 15.65,
    },
    {
      name: 'Kit Arranque HORECA',
      items: 'HTG-30 5 LT + LTP-40 5 LT + 2 pulverizadores doseadores',
      price: 34.5,
      full: 40.4,
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
  ...product.bundles.map((b) => [
    b.name,
    { id: b.name, name: b.name, detail: b.items, price: b.price, full: b.full, kind: 'bundle' },
  ]),
])
