// Conteúdo editorial: manifesto, FAQ e blog/notícias.
// Copy original, escrita na voz da marca — fundamentada em informação pública
// sobre a Mistolin Solutions (criada em 2009, parte do MSTN Group, higiene e
// limpeza profissional fabricada em Portugal). Não copia o site oficial.

export const manifesto = {
  kicker: 'Manifesto',
  title: 'Na tua operação, a higiene não se improvisa.',
  lead: 'Existimos para simplificar o teu dia a dia. Sabemos que não abres mão do rigor — e nós também não. Somos especialistas em detergência profissional e tratamos a limpeza como aquilo que ela é: uma disciplina, não uma tarefa.',
  tenets: [
    { n: '01', title: 'O rigor não é opcional', text: 'A conformidade sanitária é a base de tudo. Cada fórmula, cada diluição e cada procedimento existe para que tu cumpras — sem margem para o improviso.' },
    { n: '02', title: 'Eficiência é resultado, não sorte', text: 'Produtos concentrados, planos de higiene claros e formação para a tua equipa. Limpas com menos esforço, menos produto e os mesmos resultados em todos os turnos.' },
    { n: '03', title: 'Fabricado em Portugal, pensado para o mundo', text: 'Desenvolvemos e produzimos em Portugal, e testamos tudo em operação real. Tenhas uma cozinha de bairro ou uma fábrica, a exigência que levamos até ti é a mesma.' },
    { n: '04', title: 'Uma rede, não uma prateleira', text: 'A maior rede nacional do setor, com milhares de referências e proximidade a sério. Estamos onde tu estás, quando precisas de nós.' },
    { n: '05', title: 'Conhecimento antes do produto', text: 'Vendemos menos “garrafas” e mais soluções. Aconselhamos-te, formamos a tua equipa e acompanhamos-te — porque o produto certo, mal usado, não resolve nada.' },
    { n: '06', title: 'Sustentabilidade concentrada', text: 'Fórmulas concentradas e recargas que reduzem plástico e transporte. Fazes melhor com menos — e isso também é rigor.' },
  ],
  story: {
    eyebrow: 'Desde 2009',
    title: 'De Portugal para ti, que não podes falhar na higiene',
    paras: [
      'A Mistolin Solutions nasceu em 2009, dedicada à higiene e limpeza profissional, e tornou-se a maior rede nacional do setor — com milhares de referências ao serviço de quem, como tu, trabalha todos os dias com margens apertadas e zero tolerância à falha.',
      'Fazemos parte do MSTN Group, um grupo familiar de capital 100% português fundado em 1992, que reúne hoje mais de 40 empresas em Portugal, Espanha, Cabo Verde e Moçambique. É essa escala que te garante fabrico próprio, I&D e uma rede de proximidade rara no setor.',
      'Presentes de norte a sul — e na Madeira desde 2020 — trabalhamos lado a lado contigo — na hotelaria, restauração, indústria, saúde, facilities ou economia social — e adaptamos cada solução à realidade da tua operação.',
    ],
  },
  stats: [
    { value: '2009', label: 'Desde' },
    { value: '5000+', label: 'Referências' },
    { value: '14', label: 'Unidades de negócio' },
    { value: '40+', label: 'Empresas no grupo' },
  ],
  sectors: ['Hotelaria', 'Restauração', 'Indústria alimentar', 'Saúde e cuidados', 'Facilities', 'Economia social'],
  closing: {
    title: 'Rigor, eficiência e proximidade — na tua operação.',
    text: 'Se levas a higiene a sério no teu negócio, falamos a mesma língua.',
    cta: 'Fala com a equipa',
  },
}

export const faqGroups = [
  {
    id: 'encomendas',
    title: 'Encomendas & envios',
    items: [
      { q: 'Qual o prazo de entrega?', a: 'A expedição é feita em 24–48h para Portugal continental. Nas ilhas e para volumes industriais, o prazo é confirmado no momento da encomenda.' },
      { q: 'Existe envio grátis?', a: 'Sim, o envio é grátis para encomendas acima de 30 €. Abaixo desse valor aplica-se um custo de transporte calculado no checkout.' },
      { q: 'Posso seguir a minha encomenda?', a: 'Assim que a encomenda é expedida, enviamos por email o código de seguimento para acompanhar a entrega.' },
    ],
  },
  {
    id: 'produtos',
    title: 'Produtos & utilização',
    items: [
      { q: 'Os produtos são adequados a contacto alimentar?', a: 'Vários produtos da gama são formulados para ambientes alimentares. Enxague sempre abundantemente com água potável antes de a superfície voltar a contactar com alimentos e consulte a ficha técnica de cada produto.' },
      { q: 'Onde encontro as fichas técnicas e de segurança?', a: 'A ficha técnica e a ficha de dados de segurança (FDS) estão disponíveis para download na página de cada produto e podem ser solicitadas à equipa comercial.' },
      { q: 'Como sei qual a diluição correta?', a: 'Cada produto indica a diluição recomendada por aplicação. Para operações com volume, instalamos centrais de doseamento que garantem a diluição certa automaticamente.' },
    ],
  },
  {
    id: 'empresas',
    title: 'Empresas & faturação',
    items: [
      { q: 'Emitem fatura com NIF?', a: 'Sim. Todas as encomendas incluem fatura com NIF. Para faturação recorrente ou condições de revenda, contacte a equipa comercial.' },
      { q: 'Têm condições para volume?', a: 'Sim. Preparamos propostas dedicadas para volume, contratos de fornecimento recorrente e acordos de revenda. Peça uma proposta e a nossa equipa responde com condições ajustadas.' },
    ],
  },
  {
    id: 'equipamentos',
    title: 'Equipamentos & instalação',
    items: [
      { q: 'A instalação de equipamentos está incluída?', a: 'Nos kits de equipamento, sim: incluem deslocação, montagem, calibração e formação da equipa. O equipamento chega pronto a operar.' },
      { q: 'Dão assistência técnica depois da compra?', a: 'Sim. Os equipamentos têm garantia e assistência técnica, com contratos de manutenção preventiva disponíveis para operações com várias unidades.' },
    ],
  },
  {
    id: 'apoio',
    title: 'Devoluções & apoio',
    items: [
      { q: 'Posso devolver um produto?', a: 'Tem 14 dias para devolver produtos não abertos e em condições de revenda. Fale connosco e tratamos do processo sem complicações.' },
      { q: 'Como falo com o apoio ao cliente?', a: 'Pode contactar-nos por telefone ou email, ou visitar uma das nossas 14 unidades. A equipa técnica ajuda na escolha e na utilização dos produtos.' },
    ],
  },
]

// Blog / notícias. A primeira é a notícia "específica" em destaque.
export const articles = [
  {
    slug: 'mistolin-solutions-expomadeira-2026',
    category: 'Notícias',
    title: 'Mistolin Solutions leva a higiene profissional à Expomadeira 2026',
    excerpt: 'A marca marcou presença na maior feira de hotelaria e restauração da Madeira, com soluções de higiene e limpeza pensadas para a operação real.',
    date: '6 Jul 2026',
    read: '3 min',
    author: 'Redação Mistolin PRO',
    featured: true,
    body: [
      { p: 'A Mistolin Solutions esteve presente na Expomadeira 2026, a principal montra regional de hotelaria, restauração e serviços, para apresentar a sua gama de soluções de higiene e limpeza profissional a um setor que não abre mão do rigor.' },
      { h: 'Soluções pensadas para a operação' },
      { p: 'Mais do que produtos, o foco da presença foi mostrar como a diluição certa, o doseamento automático e a formação das equipas reduzem custos e elevam os padrões sanitários. Desde os desengordurantes de cozinha às centrais de doseamento, a proposta passou por simplificar o dia a dia de quem trabalha com margens apertadas.' },
      { h: 'Proximidade à ilha' },
      { p: 'Presente na Madeira desde 2020, a Mistolin Solutions reforçou o compromisso de proximidade com o mercado regional, com apoio técnico local e uma rede de distribuição que garante disponibilidade constante de produto.' },
      { quote: 'A higiene profissional faz-se com conhecimento, não só com produto. É isso que trazemos a cada operação.' },
      { p: 'A participação na Expomadeira insere-se na estratégia de crescimento da marca, que continua a apostar na produção nacional e na inovação como pilares de uma oferta “feita em Portugal para o mundo”.' },
    ],
  },
  {
    slug: 'desengordurar-forno-conveccao-5-minutos',
    category: 'Guia',
    title: 'Como desengordurar um forno de convecção em 5 minutos',
    excerpt: 'O passo a passo para dissolver gordura carbonizada sem horas de esfrega — mesmo com o forno ainda morno.',
    date: '12 Jul 2026',
    read: '4 min',
    author: 'Equipa técnica',
    body: [
      { p: 'Fornos de convecção acumulam gordura carbonizada que resiste à esfrega convencional. Com o produto e o método certos, a limpeza faz-se em minutos.' },
      { h: 'Passo a passo' },
      { p: 'Pulverize o desengordurante diretamente nas superfícies, mesmo mornas. Deixe atuar cerca de 5 minutos para a fórmula alcalina desagregar a gordura. Enxague abundantemente com água e deixe secar. O inox fica limpo e com o brilho realçado.' },
      { h: 'Segurança primeiro' },
      { p: 'Use luvas e proteção ocular e garanta ventilação. Consulte sempre a ficha de dados de segurança antes da utilização.' },
    ],
  },
  {
    slug: 'diluicoes-certas-quanto-produto-por-litro',
    category: 'Boas práticas',
    title: 'Diluições certas: quanto produto por litro de água?',
    excerpt: 'Doses a mais desperdiçam produto; a menos comprometem o resultado. Como acertar sempre.',
    date: '3 Jul 2026',
    read: '6 min',
    author: 'Equipa técnica',
    body: [
      { p: 'A diluição é o fator mais subestimado da limpeza profissional. A dose certa garante eficácia e poupança em simultâneo.' },
      { h: 'Leia sempre o rótulo' },
      { p: 'Cada produto indica a diluição recomendada por aplicação — de manutenção diária a sujidade intensa. Respeitar essa indicação é o primeiro passo para resultados consistentes.' },
      { h: 'Automatize com doseamento' },
      { p: 'Em operações com volume, uma central de doseamento elimina o erro humano: mistura o concentrado com água na proporção exata, em cada utilização.' },
    ],
  },
  {
    slug: 'plano-higienizacao-cozinhas-profissionais',
    category: 'HORECA',
    title: 'Plano de higienização para cozinhas profissionais',
    excerpt: 'Um modelo simples para organizar tarefas, produtos e frequências — e passar qualquer auditoria.',
    date: '28 Jun 2026',
    read: '8 min',
    author: 'Equipa técnica',
    body: [
      { p: 'Um plano de higienização claro é a diferença entre reagir e controlar. Define o quê, com quê e com que frequência.' },
      { h: 'Estrutura recomendada' },
      { p: 'Divida por zonas (cozinha, câmaras, pavimentos, casas de banho), atribua o produto certo a cada superfície e defina frequências diárias, semanais e mensais. Documente e forme a equipa.' },
      { h: 'Do papel à prática' },
      { p: 'A nossa equipa ajuda a desenhar o plano à medida da sua operação e a escolher os produtos e equipamentos que o tornam simples de cumprir.' },
    ],
  },
]

export const getArticle = (slug) => articles.find((a) => a.slug === slug) || null

// ——— Contactos ———
export const contact = {
  lead: 'Precisa de uma proposta, de apoio técnico ou de encontrar a loja mais próxima? Fale connosco — respondemos em dias úteis, normalmente no próprio dia.',
  channels: [
    { icon: 'phone', title: 'Apoio ao cliente', value: '+351 256 000 000', note: 'Dias úteis · 9h–18h' },
    { icon: 'mail', title: 'Comercial & propostas', value: 'comercial@mistolin.pt', note: 'Volume, revenda e contratos' },
    { icon: 'doc', title: 'Fichas técnicas & FDS', value: 'apoio@mistolin.pt', note: 'Pedidos e documentação' },
    { icon: 'pin', title: '14 unidades', value: 'Encontrar loja', note: 'De norte a sul e ilhas', to: '/lojas' },
  ],
  hq: { title: 'Sede', lines: ['Mistolin Solutions', 'Vagos · Aveiro, Portugal'] },
  hours: [
    { d: 'Segunda a sexta', h: '9h00 – 18h00' },
    { d: 'Sábado', h: '9h00 – 13h00' },
    { d: 'Domingo e feriados', h: 'Encerrado' },
  ],
  social: ['Instagram', 'LinkedIn', 'Facebook'],
  subjects: ['Pedido de proposta', 'Apoio técnico', 'Encomendas & envios', 'Revenda / parceria', 'Outro assunto'],
}

// ——— Rede de lojas (14 unidades) ———
export const stores = [
  { id: 'porto', name: 'Porto · Matosinhos', region: 'Norte', address: 'Rua da Indústria 120, 4450-001 Matosinhos', phone: '+351 220 000 001', email: 'porto@mistolin.pt', hours: 'Seg–Sex 9h–18h · Sáb 9h–13h' },
  { id: 'braga', name: 'Braga', region: 'Norte', address: 'Av. da Liberdade 210, 4710-249 Braga', phone: '+351 253 000 002', email: 'braga@mistolin.pt', hours: 'Seg–Sex 9h–18h · Sáb 9h–13h' },
  { id: 'vagos', name: 'Aveiro · Vagos', region: 'Centro', address: 'Zona Industrial de Vagos, 3840-385 Vagos', phone: '+351 234 000 003', email: 'aveiro@mistolin.pt', hours: 'Seg–Sex 8h30–18h30', hq: true },
  { id: 'viseu', name: 'Viseu', region: 'Centro', address: 'Rua do Comércio 45, 3500-106 Viseu', phone: '+351 232 000 004', email: 'viseu@mistolin.pt', hours: 'Seg–Sex 9h–18h' },
  { id: 'coimbra', name: 'Coimbra', region: 'Centro', address: 'Av. Fernão de Magalhães 300, 3000-177 Coimbra', phone: '+351 239 000 005', email: 'coimbra@mistolin.pt', hours: 'Seg–Sex 9h–18h · Sáb 9h–13h' },
  { id: 'leiria', name: 'Leiria', region: 'Centro', address: 'Rua Capitão Mouzinho 18, 2400-159 Leiria', phone: '+351 244 000 006', email: 'leiria@mistolin.pt', hours: 'Seg–Sex 9h–18h' },
  { id: 'loures', name: 'Lisboa · Loures', region: 'Lisboa e Vale do Tejo', address: 'Estrada Nacional 8, 2670-000 Loures', phone: '+351 210 000 007', email: 'lisboa@mistolin.pt', hours: 'Seg–Sex 8h30–18h30 · Sáb 9h–13h' },
  { id: 'sintra', name: 'Sintra', region: 'Lisboa e Vale do Tejo', address: 'Rua das Oliveiras 5, 2710-000 Sintra', phone: '+351 219 000 008', email: 'sintra@mistolin.pt', hours: 'Seg–Sex 9h–18h' },
  { id: 'setubal', name: 'Setúbal', region: 'Lisboa e Vale do Tejo', address: 'Av. Luísa Todi 88, 2900-461 Setúbal', phone: '+351 265 000 009', email: 'setubal@mistolin.pt', hours: 'Seg–Sex 9h–18h' },
  { id: 'evora', name: 'Évora', region: 'Alentejo', address: 'Rua de Aviz 33, 7000-591 Évora', phone: '+351 266 000 010', email: 'evora@mistolin.pt', hours: 'Seg–Sex 9h–18h' },
  { id: 'faro', name: 'Faro', region: 'Algarve', address: 'Rua de Portugal 76, 8000-281 Faro', phone: '+351 289 000 011', email: 'faro@mistolin.pt', hours: 'Seg–Sex 9h–18h · Sáb 9h–13h' },
  { id: 'portimao', name: 'Portimão', region: 'Algarve', address: 'Av. São João de Deus 12, 8500-000 Portimão', phone: '+351 282 000 012', email: 'portimao@mistolin.pt', hours: 'Seg–Sex 9h–18h' },
  { id: 'funchal', name: 'Funchal · Madeira', region: 'Ilhas', address: 'Rua do Ribeirinho 40, 9000-000 Funchal', phone: '+351 291 000 013', email: 'madeira@mistolin.pt', hours: 'Seg–Sex 9h–18h' },
  { id: 'acores', name: 'Ponta Delgada · Açores', region: 'Ilhas', address: 'Av. Infante D. Henrique 22, 9500-150 Ponta Delgada', phone: '+351 296 000 014', email: 'acores@mistolin.pt', hours: 'Seg–Sex 9h–18h' },
]

export const storeRegions = [...new Set(stores.map((s) => s.region))]

// ——— Cultura ———
// Copy de conceito: retrata a forma de trabalhar de uma equipa de higiene
// profissional. Citações atribuídas a funções (não a pessoas reais).
export const culture = {
  kicker: 'Cultura',
  title: 'Gente que leva a limpeza a sério — e o trabalho em equipa ainda mais.',
  lead: 'Por trás de cada fórmula, cada entrega e cada instalação há uma equipa que conhece a operação por dentro. É assim que trabalhamos — e é isto que podes esperar de nós, e nós de ti.',
  values: [
    { n: '01', title: 'Vais ao terreno', text: 'Aqui vais às cozinhas, às lavandarias e às fábricas. Decides com base no que vês na operação real, não no que imaginas a partir de um escritório.' },
    { n: '02', title: 'Dizes as coisas como são', text: 'Dás feedback direto, sem rodeios e com respeito — e recebes o mesmo. Um problema identificado cedo é um problema que já não chega ao cliente.' },
    { n: '03', title: 'Aprendes todos os dias', text: 'Formação técnica contínua, do laboratório ao comercial. Se sabes mais, ensinas — e quando chegas, aprendes depressa.' },
    { n: '04', title: 'Nunca ficas sozinho', text: '14 unidades, uma só equipa. Quando precisas, a rede responde: partilhamos stock, conhecimento e mãos.' },
  ],
  rituals: [
    { title: 'Formação no terreno', text: 'Quando chegas, passas pelas lojas, pelo armazém e por instalações com a equipa técnica antes de assumires funções.' },
    { title: 'Academia técnica', text: 'Sessões regulares sobre química de limpeza, segurança, doseamento e normas sanitárias — abertas a ti, seja qual for a tua área.' },
    { title: 'Encontro anual da rede', text: 'Uma vez por ano, as 14 unidades juntam-se em Vagos para partilhar resultados, ideias e o que correu menos bem. Também tens lugar à mesa.' },
    { title: 'Portas abertas', text: 'A direção está a uma conversa de distância. As tuas sugestões chegam a quem decide — e têm sempre resposta.' },
  ],
  quotes: [
    { text: 'Aqui aprendes a perceber o problema antes de vender o produto. Foi isso que me ensinaram no primeiro mês e continua a ser o meu trabalho todos os dias.', role: 'Técnica comercial · Porto' },
    { text: 'Quando uma instalação corre mal num sábado, não há “isso não é comigo”. Ligas a quem sabe e resolves.', role: 'Técnico de equipamentos · Lisboa' },
    { text: 'Se estás no terreno, a tua opinião chega ao laboratório: testamos cada fórmula com quem a vai usar. Ouvir-te mudou a forma como formulamos.', role: 'Responsável de I&D · Vagos' },
  ],
  stats: [
    { value: '14', label: 'Unidades de norte a sul e ilhas' },
    { value: '40+', label: 'Empresas no MSTN Group' },
    { value: '100%', label: 'Capital português' },
    { value: '2009', label: 'A crescer desde' },
  ],
  closing: {
    title: 'Revês-te nesta forma de trabalhar?',
    text: 'Estamos sempre à procura de pessoas com rigor, curiosidade e vontade de resolver. Pode ser que sejas tu.',
    cta: 'Ver vagas abertas',
  },
}

// ——— Recrutamento ———
export const careers = {
  kicker: 'Recrutamento',
  title: 'Junta-te à maior rede de higiene profissional do país.',
  lead: 'Se gostas de resolver problemas reais — no laboratório, no armazém, na estrada ou ao balcão — há lugar para ti. Aqui o teu trabalho vê-se: em cada cozinha limpa, em cada auditoria passada.',
  perks: [
    { icon: 'learn', title: 'Formação contínua', text: 'Academia técnica interna e formação certificada ao longo de todo o teu percurso.' },
    { icon: 'grow', title: 'Progressão real', text: 'Planos de carreira claros — e, nas novas vagas, a prioridade é de quem já está cá dentro.' },
    { icon: 'health', title: 'Seguro de saúde', text: 'Seguro de saúde para ti, extensível ao teu agregado familiar.' },
    { icon: 'car', title: 'Viatura e equipamento', text: 'Viatura, telemóvel e portátil, se estiveres numa função comercial ou técnica.' },
    { icon: 'gift', title: 'Desconto em produto', text: 'Condições especiais em toda a gama, só para quem é da equipa.' },
    { icon: 'pin', title: 'Perto de casa', text: '14 unidades no país — trabalha na região onde vives.' },
  ],
  process: [
    { n: '01', title: 'Candidatura', text: 'Envia o teu CV para uma vaga ou faz uma candidatura espontânea. Respondemos-te sempre, em até 10 dias úteis.' },
    { n: '02', title: 'Primeira conversa', text: 'Uma chamada de 20–30 minutos com recursos humanos para nos conhecermos melhor.' },
    { n: '03', title: 'Entrevista com a equipa', text: 'Conheces a tua chefia direta e, quando faz sentido, visitas a unidade onde vais trabalhar.' },
    { n: '04', title: 'Proposta e integração', text: 'Recebes uma proposta clara por escrito e um plano de integração no terreno para as primeiras semanas.' },
  ],
  jobs: [
    {
      id: 'tecnico-comercial-norte',
      title: 'Técnico/a Comercial HORECA',
      area: 'Comercial',
      location: 'Porto',
      type: 'Tempo inteiro',
      summary: 'Acompanhar uma carteira de clientes de hotelaria e restauração, do diagnóstico ao plano de higiene.',
      tasks: ['Visitar clientes e identificar necessidades de higiene', 'Preparar propostas e planos de higienização', 'Formar as equipas dos clientes na utilização dos produtos'],
      profile: ['Experiência comercial B2B (preferencialmente HORECA)', 'Carta de condução', 'Facilidade de comunicação e organização'],
    },
    {
      id: 'tecnico-equipamentos-lisboa',
      title: 'Técnico/a de Equipamentos',
      area: 'Técnica',
      location: 'Lisboa',
      type: 'Tempo inteiro',
      summary: 'Instalar, calibrar e manter centrais de doseamento e equipamentos de lavagem nos clientes.',
      tasks: ['Instalação e calibração de centrais de doseamento', 'Manutenção preventiva e corretiva', 'Formação das equipas no arranque dos equipamentos'],
      profile: ['Formação em eletricidade, eletromecânica ou similar', 'Carta de condução', 'Disponibilidade para deslocações na região'],
    },
    {
      id: 'quimico-id-vagos',
      title: 'Químico/a de I&D',
      area: 'Produção & I&D',
      location: 'Vagos',
      type: 'Tempo inteiro',
      summary: 'Desenvolver e otimizar fórmulas de detergência profissional, do laboratório à produção.',
      tasks: ['Desenvolvimento e reformulação de produtos', 'Ensaios de eficácia e estabilidade', 'Elaboração de fichas técnicas e FDS'],
      profile: ['Licenciatura em Química, Eng. Química ou similar', 'Conhecimento de regulamentação CLP/REACH (valorizado)', 'Rigor e espírito de equipa'],
    },
    {
      id: 'operador-producao-vagos',
      title: 'Operador/a de Produção',
      area: 'Produção & I&D',
      location: 'Vagos',
      type: 'Turnos',
      summary: 'Preparar, encher e controlar lotes de produto na unidade fabril.',
      tasks: ['Preparação de lotes segundo procedimento', 'Operação de linhas de enchimento', 'Registos de controlo de qualidade'],
      profile: ['Experiência em ambiente industrial (valorizada)', 'Disponibilidade para turnos', 'Cumprimento rigoroso de normas de segurança'],
    },
    {
      id: 'conselheiro-loja-faro',
      title: 'Conselheiro/a de Loja',
      area: 'Lojas',
      location: 'Faro',
      type: 'Tempo inteiro',
      summary: 'Atender e aconselhar clientes profissionais ao balcão e gerir a reposição da loja.',
      tasks: ['Aconselhamento técnico ao balcão', 'Gestão de stock e reposição', 'Apoio a encomendas e faturação'],
      profile: ['Experiência em atendimento ou retalho', 'Orientação para o cliente', 'Gosto por aprender sobre produto técnico'],
    },
    {
      id: 'logistica-madeira',
      title: 'Assistente de Logística',
      area: 'Logística',
      location: 'Funchal',
      type: 'Tempo inteiro',
      summary: 'Garantir a receção, armazenagem e expedição de encomendas na unidade da Madeira.',
      tasks: ['Receção e conferência de mercadoria', 'Preparação e expedição de encomendas', 'Organização do armazém'],
      profile: ['Experiência em armazém (valorizada)', 'Carta de empilhador (valorizada)', 'Organização e sentido de responsabilidade'],
    },
  ],
  faq: [
    { q: 'Posso candidatar-me a mais do que uma vaga?', a: 'Sim. Indica na candidatura as vagas que te interessam — avaliamos o teu perfil para todas.' },
    { q: 'Não encontro uma vaga para mim. E agora?', a: 'Envia uma candidatura espontânea. Guardamos o teu CV e contactamos-te quando surgir uma oportunidade compatível na tua região.' },
    { q: 'Quanto tempo demora o processo?', a: 'Em média, entre duas e quatro semanas desde a candidatura até à proposta. Damos-te sempre resposta, mesmo quando não avançamos.' },
    { q: 'Têm estágios?', a: 'Sim, sobretudo nas áreas de I&D, produção e marketing. As vagas de estágio são publicadas aqui — e também podes enviar uma candidatura espontânea.' },
  ],
}

export const jobAreas = [...new Set(careers.jobs.map((j) => j.area))]
export const jobLocations = [...new Set(careers.jobs.map((j) => j.location))]
