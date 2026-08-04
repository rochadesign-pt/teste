// Registo de EQUIPAMENTOS — um template, vários produtos indexados por slug.
// Cada produto declara `optionGroups` (kit / swatch / radio / addon), o que
// permite modelos de venda diferentes no mesmo layout:
//  · MixPro DS-4 → kits com instalação-serviço integrada
//  · Brio Ride-On → variantes configuráveis (cor, bateria, assento, acessórios)

export const equipmentProducts = {
  'mixpro-ds4': {
    slug: 'mixpro-ds4',
    cartId: 'ds4',
    brand: 'MISTOLIN PRO',
    line: 'Equipamentos & Sistemas',
    eyebrow: 'Central de doseamento',
    code: 'DS-4',
    name: 'Central de Doseamento MixPro DS-4',
    tagline: 'Diluição exata, sem desperdício.',
    description:
      'Central de doseamento automático de parede que mistura os concentrados com água na diluição certa, em quatro saídas. Padroniza a limpeza, reduz o consumo de produto e torna a operação mais segura para a equipa.',
    rating: 4.9,
    reviewSummary: { average: 4.9, total: 41 },
    basePrice: 890,
    financing: null,
    priceNote: 'instalação e IVA incluídos',
    statusLabel: 'Instalação incluída',
    gallery: { badgeTop: 'MixPro DS-4', badgeBottom: '4 saídas · doseamento' },

    checklist: [
      'Diluição automática e constante em 4 produtos',
      'Até 40% menos consumo de concentrado',
      'Montagem em parede · ligação à rede de água',
      'Instalação e calibração por técnico certificado',
      'Compatível com os concentrados Mistolin PRO',
    ],

    optionGroups: [
      {
        id: 'kit',
        kind: 'kit',
        pricing: 'absolute',
        label: 'Escolha o kit',
        hint: 'Instalação incluída nos dois',
        choices: [
          {
            id: 'ds4-instalacao',
            name: 'Kit Equipamento + Instalação',
            role: 'Entregue e instalado, pronto a operar',
            price: 890,
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
      },
    ],

    service: {
      eyebrow: 'INSTALAÇÃO CHAVE-NA-MÃO',
      title: 'Instalação incluída, não é um extra',
      text: 'Ao contrário de comprar só o equipamento, cada kit inclui a deslocação, montagem, ligação à rede de água, calibração das diluições e formação da equipa. Recebe a central pronta a usar.',
      points: ['Agendamento em 3–5 dias úteis', 'Montagem e ligação à rede de água', 'Calibração das diluições por saída', 'Formação de utilização e segurança'],
    },

    benefitsTitle: 'Porquê uma central de doseamento',
    benefits: [
      { title: 'Diluição sempre certa', text: 'A dosagem é automática e constante — acaba o produto a mais “a olho” e os resultados irregulares entre turnos.' },
      { title: 'Poupança real', text: 'Ao doear na medida exata, o consumo de concentrado cai até 40%, com retorno rápido do investimento.' },
      { title: 'Mais segurança', text: 'A equipa deixa de manipular concentrados puros: menos risco químico e menos contacto direto.' },
      { title: 'Quatro produtos numa central', text: 'Desengordurante, desinfetante, multiusos e pavimentos, prontos a debitar diluídos ou em pulverizador.' },
    ],

    stepsTitle: 'Como funciona a instalação',
    stepsHint: 'Tratamos de tudo — do agendamento ao arranque — para a central ficar operacional no mesmo dia.',
    steps: [
      { n: '01', title: 'Agendamento', text: 'Depois da encomenda, a nossa equipa técnica contacta para agendar a instalação na data que der jeito à operação.' },
      { n: '02', title: 'Instalação & calibração', text: 'O técnico monta a central na parede, liga-a à rede de água e calibra a diluição de cada saída ao seu plano de higiene.' },
      { n: '03', title: 'Formação & arranque', text: 'A equipa recebe formação de utilização e segurança. A central fica pronta a operar no mesmo dia.' },
    ],

    specHighlights: [
      { value: '4', unit: 'saídas', label: 'Doseamento' },
      { value: '−40', unit: '%', label: 'Consumo' },
      { value: '24', unit: 'meses', label: 'Garantia' },
      { value: '3–5', unit: 'dias', label: 'Instalação' },
    ],
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

    accessoriesTitle: 'Recargas para a central',
    accessoriesEyebrow: 'CONSUMÍVEIS COMPATÍVEIS',
    accessories: [
      { name: 'Tiragorduras HTG-30 · 5 LT', detail: 'Concentrado desengordurante', price: 15.9 },
      { name: 'Desinfetante DDA-90 · 5 LT', detail: 'Desinfeção alimentar', price: 18.9 },
      { name: 'Lava-Tudo LTP-40 · 5 LT', detail: 'Pavimentos', price: 3.8 },
    ],

    reviews: [
      { name: 'Nuno R.', role: 'Diretor de operações · Grupo de restauração', rating: 5, date: 'há 3 semanas', title: 'Standardizou a limpeza em 6 lojas', body: 'Instalámos a DS-4 em todas as unidades. As diluições passaram a ser iguais em todo o lado e o consumo de produto desceu logo no primeiro mês. A instalação foi rápida e a formação muito clara.', verified: true },
      { name: 'Cláudia S.', role: 'Governanta executiva · Hotel 5★', rating: 5, date: 'há 1 mês', title: 'A equipa deixou de mexer em concentrado', body: 'A grande vantagem para nós foi a segurança. Ninguém manuseia produto puro e as auxiliares aprenderam a usar em minutos. Recomendo o kit com os concentrados incluídos.', verified: true },
      { name: 'Jorge M.', role: 'Chef · Cozinha industrial', rating: 4, date: 'há 2 meses', title: 'Ótimo, exige planear a instalação', body: 'Funciona muito bem e poupa mesmo produto. Só é preciso pensar onde fica a ligação à água — a equipa deles ajudou a definir o sítio.', verified: true },
    ],

    faqs: [
      { q: 'A instalação está mesmo incluída no preço?', a: 'Sim. Ambos os kits incluem a deslocação, a montagem em parede, a ligação à rede de água, a calibração das diluições e a formação da equipa. Não é um serviço vendido à parte — o equipamento chega pronto a operar.' },
      { q: 'Qual a diferença entre os dois kits?', a: 'O “Kit Equipamento + Instalação” inclui a central instalada e a formação. O “Kit Completo + Produto” é exatamente o mesmo, mas com um kit de concentrados 4× 5 LT já incluído, para começar a trabalhar no dia da instalação.' },
      { q: 'Que consumíveis usa a central?', a: 'A DS-4 é compatível com toda a gama de concentrados Mistolin PRO. Pode encomendar recargas a qualquer momento na loja, ou optar pelo kit completo que já traz os quatro concentrados de arranque.' },
      { q: 'Preciso de instalação elétrica?', a: 'Não para o doseamento base — a central funciona pela pressão da rede de água. Só precisa de um ponto de água potável próximo do local de montagem, que o técnico ajuda a definir.' },
      { q: 'Emitem fatura com NIF e dão apoio a empresas?', a: 'Sim. Todas as encomendas incluem fatura com NIF. Para vários equipamentos, contratos de manutenção ou fornecimento recorrente de consumíveis, a equipa comercial prepara uma proposta dedicada.' },
    ],
  },

  'brio-ride-on-75-550': {
    slug: 'brio-ride-on-75-550',
    cartId: 'brio-75-550',
    brand: 'RIDE-ON',
    line: 'Equipamentos de Mobilidade',
    eyebrow: 'Scooter de mobilidade',
    code: '75-550',
    name: 'Scooter Brio Ride-On 75-550',
    tagline: 'Mais autonomia para o dia a dia.',
    description:
      'Scooter de mobilidade elétrica de 4 rodas, estável e confortável, pensada para o uso urbano e passeios. Desmontável sem ferramentas para caber na bagageira do carro, com entrega, montagem e demonstração ao domicílio.',
    rating: 4.8,
    reviewSummary: { average: 4.8, total: 57 },
    basePrice: 2190,
    financing: { months: 24 },
    priceNote: 'IVA incluído · entrega e demonstração incluídas',
    statusLabel: 'Entrega e demonstração',
    gallery: { badgeTop: 'Brio Ride-On 75-550', badgeBottom: '4 rodas · desmontável' },

    checklist: [
      'Autonomia até 45 km por carga',
      'Velocidade regulável até 15 km/h',
      'Suporta utilizadores até 160 kg',
      'Desmontável em 5 peças para transporte',
      'Entrega, montagem e demonstração ao domicílio',
    ],

    optionGroups: [
      {
        id: 'cor',
        kind: 'swatch',
        label: 'Cor',
        choices: [
          { id: 'vermelho', label: 'Vermelho', hex: '#b42318' },
          { id: 'azul', label: 'Azul', hex: '#1d4ed8' },
          { id: 'grafite', label: 'Grafite', hex: '#3f4448' },
        ],
      },
      {
        id: 'bateria',
        kind: 'radio',
        pricing: 'delta',
        label: 'Autonomia / bateria',
        choices: [
          { id: 'std', label: 'Standard — 45 km', note: 'Bateria 20 Ah', priceDelta: 0, tag: 'Incluída' },
          { id: 'plus', label: 'Plus — 60 km', note: 'Bateria 32 Ah', priceDelta: 290 },
        ],
      },
      {
        id: 'assento',
        kind: 'radio',
        pricing: 'delta',
        label: 'Assento',
        choices: [
          { id: 'standard', label: 'Standard estofado', note: 'Giratório com apoios de braço', priceDelta: 0 },
          { id: 'capitao', label: 'Capitão', note: 'Apoios reguláveis e mais encosto', priceDelta: 180 },
        ],
      },
      {
        id: 'acessorios',
        kind: 'addon',
        label: 'Acessórios',
        hint: 'Opcionais',
        choices: [
          { id: 'capa', label: 'Capa de chuva integral', note: 'Proteção do condutor', priceDelta: 59 },
          { id: 'cesto', label: 'Cesto frontal XL', note: 'Compras e transporte', priceDelta: 35 },
          { id: 'bengaleiro', label: 'Suporte de bengala/canadiana', note: 'Fixação lateral', priceDelta: 29 },
          { id: 'garantia', label: 'Garantia estendida 3 anos', note: 'Peças e mão de obra', priceDelta: 149 },
        ],
      },
    ],

    service: {
      eyebrow: 'ENTREGA CHAVE-NA-MÃO',
      title: 'Entrega, montagem e demonstração',
      text: 'Não é só enviar a scooter. Levamos ao domicílio, montamos, explicamos o funcionamento e fazemos uma demonstração para garantir que se sente seguro a conduzir antes de ficarmos por lá.',
      points: ['Entrega ao domicílio em Portugal continental', 'Montagem e verificação no local', 'Demonstração e formação de utilização', 'Recolha de toda a embalagem'],
    },

    benefitsTitle: 'Feita para o dia a dia',
    benefits: [
      { title: 'Estável e segura', text: 'Quatro rodas, suspensão dianteira e traseira e travagem eletromagnética automática para paragens suaves.' },
      { title: 'Autonomia a sério', text: 'Até 45 km por carga (60 km na versão Plus) — suficiente para uma semana de recados sem preocupações.' },
      { title: 'Vai consigo de carro', text: 'Desmonta em 5 peças sem ferramentas e cabe na bagageira da maioria dos automóveis.' },
      { title: 'Conforto no comando', text: 'Assento giratório estofado, coluna de direção ajustável e painel simples e legível.' },
    ],

    stepsTitle: 'Da encomenda ao primeiro passeio',
    stepsHint: 'Tratamos da entrega e da demonstração para arrancar com confiança — sem surpresas.',
    steps: [
      { n: '01', title: 'Aconselhamento', text: 'Ajudamos a escolher a versão e os acessórios certos para as suas necessidades e o seu dia a dia.' },
      { n: '02', title: 'Entrega & montagem', text: 'Entregamos ao domicílio, montamos, carregamos e verificamos tudo antes da primeira utilização.' },
      { n: '03', title: 'Demonstração', text: 'Fazemos uma demonstração de condução e segurança até se sentir totalmente à vontade.' },
    ],

    specHighlights: [
      { value: '45', unit: 'km', label: 'Autonomia' },
      { value: '15', unit: 'km/h', label: 'Velocidade máx' },
      { value: '160', unit: 'kg', label: 'Peso máx utilizador' },
      { value: '≈50', unit: 'kg', label: 'Peso (desmontável)' },
    ],
    specs: [
      { title: 'Desempenho', body: 'Autonomia até 45 km (60 km na versão Plus). Velocidade regulável até 15 km/h. Inclinação máxima aprox. 12%. Travagem eletromagnética automática.' },
      { title: 'Bateria e carga', body: 'Bateria 20 Ah (32 Ah na versão Plus), removível para carregar em casa. Carregador incluído. Carga completa em cerca de 6–8 horas.' },
      { title: 'Conforto e dimensões', body: '4 rodas para maior estabilidade, suspensão dianteira e traseira. Assento estofado giratório com apoios de braço reguláveis. Coluna de direção ajustável.' },
      { title: 'Transporte', body: 'Desmontável em 5 peças sem ferramentas; a peça mais pesada ronda os 15 kg. Cabe na bagageira da maioria dos automóveis.' },
      { title: 'Segurança e certificação', body: 'Conforme a norma EN 12184 (dispositivos elétricos para pessoas com mobilidade reduzida). Iluminação LED dianteira e traseira, buzina e refletores. Marcação CE.' },
    ],

    guarantees: [
      { icon: 'shield', title: 'Dispositivo certificado', text: 'Norma EN 12184 · CE' },
      { icon: 'truck', title: 'Entrega e demonstração', text: 'Ao domicílio · Portugal' },
      { icon: 'return', title: 'Garantia 24 meses', text: 'Assistência técnica' },
    ],

    accessoriesTitle: 'Acessórios e peças',
    accessoriesEyebrow: 'COMPATÍVEIS',
    accessories: [
      { name: 'Bateria adicional 20 Ah', detail: 'Autonomia extra ou substituição', price: 239 },
      { name: 'Capa de proteção exterior', detail: 'Para arrumação ao ar livre', price: 45 },
      { name: 'Rampa dobrável de acesso', detail: 'Alumínio · 2 m', price: 129 },
    ],

    reviews: [
      { name: 'Fernanda C.', role: 'Utilizadora · Cascais', rating: 5, date: 'há 2 semanas', title: 'Devolveu-me a independência', body: 'Volto a ir às compras e à missa sozinha. É estável, fácil de conduzir e a demonstração em casa deu-me toda a confiança para começar.', verified: true },
      { name: 'José A.', role: 'Comprou para o pai · Braga', rating: 5, date: 'há 1 mês', title: 'Entrega e montagem impecáveis', body: 'Trouxeram a casa, montaram e ensinaram o meu pai a usar com toda a paciência. Desmonta mesmo bem para levar no carro ao fim de semana.', verified: true },
      { name: 'Alice M.', role: 'Utilizadora · Aveiro', rating: 4, date: 'há 2 meses', title: 'Ótima autonomia', body: 'A bateria dura muito mais do que eu esperava. Só recomendo pedir a capa de chuva desde logo, que no inverno faz falta.', verified: true },
    ],

    faqs: [
      { q: 'Preciso de carta de condução ou seguro?', a: 'Não é exigida carta de condução. A circulação faz-se em espaços pedonais e à velocidade de peão. Recomendamos, ainda assim, informar-se sobre seguros de responsabilidade civil opcionais para maior tranquilidade.' },
      { q: 'A scooter cabe no meu carro?', a: 'Sim. A Brio Ride-On desmonta-se em 5 peças sem ferramentas, sendo a mais pesada cerca de 15 kg. Cabe na bagageira da generalidade dos automóveis, o que facilita passeios e viagens.' },
      { q: 'A entrega e a demonstração estão incluídas?', a: 'Estão. Entregamos ao domicílio em Portugal continental, montamos, carregamos e fazemos uma demonstração de condução e segurança. Não é um custo à parte.' },
      { q: 'Qual a diferença entre a bateria Standard e Plus?', a: 'A versão Standard (20 Ah) oferece até 45 km de autonomia; a versão Plus (32 Ah) chega aos 60 km. Ambas são removíveis para carregar em casa. Pode acrescentar uma bateria adicional a qualquer momento.' },
      { q: 'Há apoio e assistência técnica depois da compra?', a: 'Sim. A scooter tem garantia de 24 meses (estendível a 3 anos) com assistência técnica. Disponibilizamos peças, baterias e manutenção, e dá para agendar revisões.' },
      { q: 'Posso experimentar antes de decidir?', a: 'A demonstração ao domicílio serve exatamente para isso. Aconselhe-se connosco sobre a versão e os acessórios certos para as suas necessidades antes da encomenda.' },
    ],
  },
}

export const getEquipment = (slug) => equipmentProducts[slug] || null
export const equipmentList = Object.values(equipmentProducts)

// ——— helpers de configuração (partilhados entre painel e barra fixa) ———
const choiceOf = (group, id) => group.choices.find((c) => c.id === id)
export const absGroupOf = (p) => p.optionGroups.find((g) => g.kind === 'kit' || g.pricing === 'absolute') || null

export const initSelection = (p) => {
  const sel = {}
  p.optionGroups.forEach((g) => {
    sel[g.id] = g.kind === 'addon' ? [] : g.choices[0].id
  })
  return sel
}

export const computeTotal = (p, sel) => {
  const abs = absGroupOf(p)
  let total = abs ? choiceOf(abs, sel[abs.id]).price : p.basePrice
  p.optionGroups.forEach((g) => {
    if (g === abs) return
    if (g.kind === 'addon') (sel[g.id] || []).forEach((cid) => { total += choiceOf(g, cid)?.priceDelta || 0 })
    else if (g.pricing === 'delta') total += choiceOf(g, sel[g.id])?.priceDelta || 0
  })
  return total
}

export const mainIdOf = (p, sel) => {
  const abs = absGroupOf(p)
  return abs ? sel[abs.id] : p.cartId
}

export const configSummary = (p, sel) => {
  const parts = []
  p.optionGroups.forEach((g) => {
    if (g.kind === 'addon') {
      (sel[g.id] || []).forEach((cid) => parts.push(choiceOf(g, cid)?.label))
    } else {
      const c = choiceOf(g, sel[g.id])
      if (c) parts.push(c.name || c.label)
    }
  })
  return parts.filter(Boolean).join(' · ')
}

// Catálogo para o carrinho (fallback; o painel envia sempre o preço configurado).
export const equipmentCatalog = {}
equipmentList.forEach((p) => {
  const abs = absGroupOf(p)
  if (abs) {
    abs.choices.forEach((c) => {
      equipmentCatalog[c.id] = { id: c.id, name: `${p.name} · ${c.name || c.label}`, detail: c.role || p.tagline, price: c.price, full: c.full, kind: 'equip-kit' }
    })
  }
  equipmentCatalog[p.cartId] = { id: p.cartId, name: p.name, detail: p.tagline, price: p.basePrice, kind: 'equip-config' }
})
