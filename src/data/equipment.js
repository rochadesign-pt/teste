// Página de EQUIPAMENTO — modelo diferente do produto de consumo:
// em vez de volumetrias, vendem-se KITS onde a instalação é um serviço
// integrado. Há um kit com o equipamento + instalação e um kit igual
// mas com o produto (consumíveis) já incluído.

export const equipment = {
  brand: 'MISTOLIN PRO',
  line: 'Equipamentos & Sistemas',
  code: 'DS-4',
  name: 'Central de Doseamento MixPro DS-4',
  tagline: 'Diluição exata, sem desperdício.',
  description:
    'Central de doseamento automático de parede que mistura os concentrados com água na diluição certa, em quatro saídas. Padroniza a limpeza, reduz o consumo de produto e torna a operação mais segura para a equipa.',
  rating: 4.9,
  gallery: { main: null, details: [null, null], lifestyle: null },
  freeShippingFrom: 30,

  // ——— Argumentos de venda rápidos (checklist do painel) ———
  checklist: [
    'Diluição automática e constante em 4 produtos',
    'Até 40% menos consumo de concentrado',
    'Montagem em parede · ligação à rede de água',
    'Instalação e calibração por técnico certificado',
    'Compatível com os concentrados Mistolin PRO',
  ],

  // ——— KITS (substituem as volumetrias) ———
  // Cada kit lista o que inclui, com o tipo de cada item para a UI
  // distinguir equipamento, serviço (instalação/formação) e produto.
  kits: [
    {
      id: 'ds4-instalacao',
      name: 'Kit Equipamento + Instalação',
      role: 'Entregue e instalado, pronto a operar',
      price: 890,
      badge: null,
      includes: [
        { type: 'equipment', label: 'Central MixPro DS-4', note: '4 saídas · montagem em parede' },
        { type: 'service', label: 'Instalação e calibração no local', note: 'Técnico certificado · data agendada' },
        { type: 'service', label: 'Formação da equipa', note: 'Sessão de arranque incluída' },
        { type: 'warranty', label: 'Garantia 24 meses', note: 'Peças e assistência técnica' },
      ],
    },
    {
      id: 'ds4-completo',
      name: 'Kit Completo + Produto',
      role: 'O kit instalação com os consumíveis para arrancar',
      price: 1190,
      full: 1290,
      badge: 'Mais completo',
      includes: [
        { type: 'equipment', label: 'Central MixPro DS-4', note: '4 saídas · montagem em parede' },
        { type: 'service', label: 'Instalação e calibração no local', note: 'Técnico certificado · data agendada' },
        { type: 'service', label: 'Formação da equipa', note: 'Sessão de arranque incluída' },
        { type: 'product', label: 'Kit de concentrados 4× 5 LT', note: 'HTG-30 · DDA-90 · Multiusos · Pavimentos' },
        { type: 'warranty', label: 'Garantia 24 meses', note: 'Peças e assistência técnica' },
      ],
    },
  ],

  // ——— Serviço de instalação (destaque) ———
  service: {
    title: 'Instalação incluída, não é um extra',
    text: 'Ao contrário de comprar só o equipamento, cada kit inclui a deslocação, montagem, ligação à rede de água, calibração das diluições e formação da equipa. Recebe a central pronta a usar.',
    points: [
      'Agendamento em 3–5 dias úteis',
      'Montagem e ligação à rede de água',
      'Calibração das diluições por saída',
      'Formação de utilização e segurança',
    ],
  },

  // ——— Porquê (features) ———
  benefits: [
    { title: 'Diluição sempre certa', text: 'A dosagem é automática e constante — acaba o produto a mais “a olho” e os resultados irregulares entre turnos.' },
    { title: 'Poupança real', text: 'Ao doear na medida exata, o consumo de concentrado cai até 40%, com retorno rápido do investimento.' },
    { title: 'Mais segurança', text: 'A equipa deixa de manipular concentrados puros: menos risco químico e menos contacto direto.' },
    { title: 'Quatro produtos numa central', text: 'Desengordurante, desinfetante, multiusos e pavimentos, prontos a debitar diluídos ou em pulverizador.' },
  ],

  // ——— Como funciona a instalação (passos) ———
  steps: [
    { n: '01', title: 'Agendamento', text: 'Depois da encomenda, a nossa equipa técnica contacta para agendar a instalação na data que der jeito à operação.' },
    { n: '02', title: 'Instalação & calibração', text: 'O técnico monta a central na parede, liga-a à rede de água e calibra a diluição de cada saída ao seu plano de higiene.' },
    { n: '03', title: 'Formação & arranque', text: 'A equipa recebe formação de utilização e segurança. A central fica pronta a operar no mesmo dia.' },
  ],

  // ——— Especificações técnicas ———
  specs: [
    { title: 'Saídas e produtos', body: '4 saídas independentes de doseamento. Compatível com toda a gama de concentrados Mistolin PRO (desengordurante, desinfetante, multiusos, pavimentos).' },
    { title: 'Instalação', body: 'Montagem em parede com fixações incluídas. Ligação à rede de água potável (3/4"). Alimentação por pressão de rede — não necessita de energia elétrica para o doseamento base.' },
    { title: 'Dimensões e materiais', body: 'Corpo em ABS resistente a produtos químicos. Aprox. 40 × 30 × 15 cm. Debita em modo diluído para balde/pulverizador ou enchimento de recargas.' },
    { title: 'Manutenção e garantia', body: 'Manutenção mínima com kit de limpeza anual recomendado. Garantia de 24 meses em peças e assistência técnica. Contratos de manutenção disponíveis.' },
  ],

  guarantees: [
    { icon: 'shield', title: 'Instalação certificada', text: 'Técnico Mistolin PRO' },
    { icon: 'truck', title: 'Entrega e montagem', text: 'Portugal continental' },
    { icon: 'return', title: 'Garantia 24 meses', text: 'Peças e assistência' },
  ],

  // ——— Consumíveis compatíveis (cross-sell) ———
  consumables: [
    { code: 'htg5', name: 'Tiragorduras HTG-30 · 5 LT', detail: 'Concentrado desengordurante', price: 15.9 },
    { code: 'dda90d', name: 'Desinfetante DDA-90 · 5 LT', detail: 'Desinfeção alimentar', price: 18.9 },
    { code: 'ltp40', name: 'Lava-Tudo LTP-40 · 5 LT', detail: 'Pavimentos', price: 3.8 },
  ],

  reviewSummary: { average: 4.9, total: 41 },
  reviews: [
    { name: 'Nuno R.', role: 'Diretor de operações · Grupo de restauração', rating: 5, date: 'há 3 semanas', title: 'Standardizou a limpeza em 6 lojas', body: 'Instalámos a DS-4 em todas as unidades. As diluições passaram a ser iguais em todo o lado e o consumo de produto desceu logo no primeiro mês. A instalação foi rápida e a formação muito clara.', verified: true },
    { name: 'Cláudia S.', role: 'Governanta executiva · Hotel 5★', rating: 5, date: 'há 1 mês', title: 'A equipa deixou de mexer em concentrado', body: 'A grande vantagem para nós foi a segurança. Ninguém manuseia produto puro e as auxiliares aprenderam a usar em minutos. Recomendo o kit com os concentrados incluídos para arrancar sem falhas.', verified: true },
    { name: 'Jorge M.', role: 'Chef · Cozinha industrial', rating: 4, date: 'há 2 meses', title: 'Ótimo, exige planear a instalação', body: 'Funciona muito bem e poupa mesmo produto. Só é preciso pensar onde fica a ligação à água — a equipa deles ajudou a definir o sítio. Ao fim de umas semanas o retorno já se nota.', verified: true },
  ],

  faqs: [
    { q: 'A instalação está mesmo incluída no preço?', a: 'Sim. Ambos os kits incluem a deslocação, a montagem em parede, a ligação à rede de água, a calibração das diluições e a formação da equipa. Não é um serviço vendido à parte — o equipamento chega pronto a operar.' },
    { q: 'Qual a diferença entre os dois kits?', a: 'O “Kit Equipamento + Instalação” inclui a central instalada e a formação. O “Kit Completo + Produto” é exatamente o mesmo, mas com um kit de concentrados 4× 5 LT já incluído, para começar a trabalhar no dia da instalação sem encomendar produto à parte.' },
    { q: 'Que consumíveis usa a central?', a: 'A DS-4 é compatível com toda a gama de concentrados Mistolin PRO. Pode encomendar recargas a qualquer momento na loja, ou optar pelo kit completo que já traz os quatro concentrados de arranque.' },
    { q: 'Preciso de instalação elétrica?', a: 'Não para o doseamento base — a central funciona pela pressão da rede de água. Só precisa de um ponto de água potável próximo do local de montagem, que o técnico ajuda a definir.' },
    { q: 'Emitem fatura com NIF e dão apoio a empresas?', a: 'Sim. Todas as encomendas incluem fatura com NIF. Para vários equipamentos, contratos de manutenção ou fornecimento recorrente de consumíveis, a equipa comercial prepara uma proposta dedicada.' },
    { q: 'Existe garantia e manutenção?', a: 'A central tem garantia de 24 meses em peças e assistência técnica. Recomendamos um kit de manutenção anual e disponibilizamos contratos de manutenção preventiva para operações com várias unidades.' },
  ],
}

const fmtName = (k) => `${equipment.name} · ${k.name}`

// Entradas para o carrinho (mesma estrutura do catálogo de produto).
export const equipmentCatalog = Object.fromEntries(
  equipment.kits.map((k) => [
    k.id,
    { id: k.id, name: fmtName(k), detail: k.role, price: k.price, full: k.full, kind: 'equip-kit' },
  ]),
)
