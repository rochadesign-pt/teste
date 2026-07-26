// Jogos de exemplo para demonstração do layout.
// Em produção, estes dados devem vir do calendário oficial (FPB) ou de um CMS.

export type Game = {
  id: string;
  competition: string;
  round: string;
  date: string;
  time?: string;
  home: string;
  away: string;
  venue: string;
  homeScore?: number;
  awayScore?: number;
};

export const upcomingGames: Game[] = [
  {
    id: "g1",
    competition: "Campeonato Nacional",
    round: "Jornada 5",
    date: "Sáb, 04 Out",
    time: "18:00",
    home: "Illiabum Clube",
    away: "[Adversário]",
    venue: "Pav. Capitão Adriano Nordeste, Ílhavo",
  },
  {
    id: "g2",
    competition: "Campeonato Nacional",
    round: "Jornada 6",
    date: "Sáb, 11 Out",
    time: "16:00",
    home: "[Adversário]",
    away: "Illiabum Clube",
    venue: "Pavilhão do adversário",
  },
  {
    id: "g3",
    competition: "Campeonato Nacional Sub-18",
    round: "Jornada 4",
    date: "Dom, 12 Out",
    time: "11:00",
    home: "Illiabum Clube",
    away: "[Adversário]",
    venue: "Pav. Capitão Adriano Nordeste, Ílhavo",
  },
];

export const results: Game[] = [
  {
    id: "r1",
    competition: "Campeonato Nacional",
    round: "Jornada 4",
    date: "Sáb, 27 Set",
    home: "Illiabum Clube",
    away: "[Adversário]",
    venue: "Pav. Capitão Adriano Nordeste, Ílhavo",
    homeScore: 84,
    awayScore: 71,
  },
  {
    id: "r2",
    competition: "Campeonato Nacional",
    round: "Jornada 3",
    date: "Sáb, 20 Set",
    home: "[Adversário]",
    away: "Illiabum Clube",
    venue: "Pavilhão do adversário",
    homeScore: 77,
    awayScore: 80,
  },
  {
    id: "r3",
    competition: "Campeonato Nacional Sub-16",
    round: "Jornada 3",
    date: "Dom, 21 Set",
    home: "Illiabum Clube",
    away: "[Adversário]",
    venue: "Pav. Capitão Adriano Nordeste, Ílhavo",
    homeScore: 65,
    awayScore: 58,
  },
];

export const nextGame = upcomingGames[0];

export const isIlliabum = (name: string) => name.toLowerCase().includes("illiabum");
