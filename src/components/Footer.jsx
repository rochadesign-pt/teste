export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-8 lg:px-12">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <p className="font-display max-w-2xl text-4xl leading-[1.02] font-black uppercase sm:text-5xl">
            Limpeza profissional,
            <br />
            <span className="text-accent">sem meias-medidas.</span>
          </p>
          <a
            href="#"
            className="flex h-14 items-center rounded-full border border-white/25 px-8 text-sm font-bold transition-colors duration-200 hover:bg-white hover:text-ink"
          >
            Falar com a equipa comercial
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-white/10 py-10 text-sm sm:grid-cols-4">
          {[
            { title: 'Produtos', links: ['Cozinha', 'Lavandaria', 'Superfícies', 'Desinfeção'] },
            { title: 'Soluções', links: ['HORECA', 'Indústria alimentar', 'Saúde', 'Facilities'] },
            { title: 'Empresa', links: ['Sobre nós', 'Sustentabilidade', 'Certificações', 'Carreiras'] },
            { title: 'Suporte', links: ['Contactos', 'Fichas técnicas', 'Fichas de segurança', 'FAQ'] },
          ].map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-bold tracking-[0.18em] text-accent">
                {col.title.toUpperCase()}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="opacity-60 transition-opacity duration-200 hover:opacity-100">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs opacity-50">
          <p>© {new Date().getFullYear()} Mistolin Solutions · Vale de Cambra, Portugal</p>
          <p>Conceito não-oficial — exercício de design</p>
        </div>
      </div>
    </footer>
  )
}
