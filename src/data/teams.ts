// Escalões do clube (fonte: zerozero.pt / fpb.pt).
// Treinadores e horários são placeholders — confirmar com o clube.

export type Team = {
  slug: string;
  name: string;
  short: string;
  competition: string;
  description: string;
  featured?: boolean;
};

export const teams: Team[] = [
  {
    slug: "seniores",
    name: "Seniores Masculinos",
    short: "SEN",
    competition: "Campeonato Nacional",
    description:
      "A equipa principal do clube. Duas vezes campeã nacional, joga em casa no Pavilhão Capitão Adriano Nordeste.",
    featured: true,
  },
  {
    slug: "sub-18",
    name: "Sub-18",
    short: "U18",
    competition: "Campeonato Nacional Sub-18",
    description: "A última etapa da formação antes do salto para os Seniores.",
  },
  {
    slug: "sub-16",
    name: "Sub-16",
    short: "U16",
    competition: "Campeonato Nacional Sub-16",
    description: "Competição nacional e desenvolvimento técnico e tático.",
  },
  {
    slug: "sub-14",
    name: "Sub-14",
    short: "U14",
    competition: "Campeonato Regional Sub-14",
    description: "O início da competição federada a sério.",
  },
  {
    slug: "mini-12",
    name: "Mini 12",
    short: "M12",
    competition: "Minibasquete",
    description: "Minibasquete: jogo, técnica individual e muita diversão.",
  },
  {
    slug: "mini-10",
    name: "Mini 10",
    short: "M10",
    competition: "Minibasquete",
    description: "Primeiros torneios e primeiros cestos em competição.",
  },
  {
    slug: "mini-8",
    name: "Mini 8",
    short: "M8",
    competition: "Minibasquete",
    description: "A bola laranja como brincadeira — a base de tudo.",
  },
  {
    slug: "baby-basket",
    name: "Baby Basket",
    short: "BB",
    competition: "Formação",
    description: "Para os mais pequenos darem os primeiros dribles.",
  },
];
