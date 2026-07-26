// Informação institucional do Illiabum Clube.
// Fontes: zerozero.pt / fpb.pt / Wikipédia. Valores marcados com
// "[a confirmar]" devem ser validados com o clube antes de publicar.

export const club = {
  name: "Illiabum Clube",
  city: "Ílhavo",
  founded: 1943,
  foundedDate: "1 de dezembro de 1943",
  pavilion: "Pavilhão Municipal Capitão Adriano Nordeste",
  tagline: "Basquetebol em Ílhavo desde 1943",
};

export const stats = [
  { value: new Date().getFullYear() - club.founded, suffix: "", label: "Anos de história" },
  { value: 6, suffix: "", label: "Títulos nacionais" },
  { value: 10, suffix: "+", label: "Escalões de formação" },
  { value: 300, suffix: "+", label: "Atletas [a confirmar]" },
];

export const honours = [
  { title: "Campeonato Nacional", seasons: ["2008/09", "2015/16"] },
  { title: "Taça de Portugal", seasons: ["2017/18"] },
  { title: "Supertaça", seasons: ["2008/09", "2011/12", "2015/16"] },
];

export const timeline = [
  {
    year: "1943",
    title: "A fundação",
    text: "O Illiabum Clube nasce a 1 de dezembro de 1943, em Ílhavo. Torna-se rapidamente a instituição desportiva de referência da cidade e do concelho.",
  },
  {
    year: "2008/09",
    title: "Primeiro título nacional",
    text: "O clube conquista o primeiro campeonato nacional e a primeira Supertaça, colocando Ílhavo no mapa do basquetebol português.",
  },
  {
    year: "2015/16",
    title: "Bicampeões",
    text: "Novo campeonato nacional e nova Supertaça. A formação continua a alimentar a equipa sénior e os escalões jovens somam títulos distritais e nacionais.",
  },
  {
    year: "2017/18",
    title: "Taça de Portugal",
    text: "O Illiabum ergue a Taça de Portugal, juntando mais um troféu maior ao palmarés do clube.",
  },
  {
    year: "Hoje",
    title: "Uma cidade, um clube",
    text: "Do Baby Basket aos Seniores, o Illiabum forma centenas de atletas por época no Pavilhão Capitão Adriano Nordeste — e continua a fazer de Ílhavo terra de basquetebol.",
  },
];

export const contacts = {
  address: "Pavilhão Municipal Capitão Adriano Nordeste, Ílhavo [morada completa a confirmar]",
  email: "geral@illiabum.pt",
  phone: "+351 000 000 000",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/illiabumclube" },
    { label: "Facebook", href: "https://www.facebook.com/illiabumclube" },
    { label: "YouTube", href: "#" },
  ],
};
