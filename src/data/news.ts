// Notícias de exemplo para demonstração do layout.
// Em produção, ligar a um CMS ou às redes sociais do clube.

export type Article = {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  tone: "bordeaux" | "gold" | "ink";
};

export const articles: Article[] = [
  {
    id: "n1",
    category: "Seniores",
    date: "28 Set 2026",
    title: "Vitória em casa lança arranque de época",
    excerpt:
      "O pavilhão voltou a encher e a equipa respondeu dentro de campo com uma exibição sólida nos dois lados do campo.",
    tone: "bordeaux",
  },
  {
    id: "n2",
    category: "Formação",
    date: "22 Set 2026",
    title: "Mais de 300 atletas iniciam a nova época",
    excerpt:
      "Do Baby Basket aos Sub-18, os escalões de formação do Illiabum voltaram ao trabalho no Capitão Adriano Nordeste.",
    tone: "gold",
  },
  {
    id: "n3",
    category: "Clube",
    date: "15 Set 2026",
    title: "Campanha de sócios 2026/27 já está na rua",
    excerpt:
      "Ser sócio é a forma mais direta de apoiar o clube. Conhece as novas modalidades de quota e os benefícios para associados.",
    tone: "ink",
  },
  {
    id: "n4",
    category: "Seniores",
    date: "08 Set 2026",
    title: "Plantel apresentado aos sócios",
    excerpt:
      "Noite de apresentação no pavilhão, com casa cheia para conhecer as caras novas da equipa principal.",
    tone: "ink",
  },
  {
    id: "n5",
    category: "Formação",
    date: "01 Set 2026",
    title: "Captações abertas para todos os escalões",
    excerpt:
      "Tens entre 4 e 18 anos e queres experimentar basquetebol? As portas do Illiabum estão abertas — aparece.",
    tone: "bordeaux",
  },
  {
    id: "n6",
    category: "Clube",
    date: "25 Ago 2026",
    title: "Illiabum e escolas do concelho renovam parceria",
    excerpt:
      "O basquetebol continua a entrar nas escolas de Ílhavo através do projeto de promoção da modalidade.",
    tone: "gold",
  },
];
