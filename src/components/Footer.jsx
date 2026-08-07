import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Produtos',
    links: [
      { label: 'Cozinha', to: '/categoria/cozinha' },
      { label: 'Lavandaria', to: '/categoria/lavandaria' },
      { label: 'Superfícies', to: '/categoria/superficies' },
      { label: 'Desinfeção', to: '/categoria/desinfecao' },
    ],
  },
  {
    title: 'Soluções',
    links: [
      { label: 'HORECA' },
      { label: 'Indústria alimentar' },
      { label: 'Saúde' },
      { label: 'Equipamentos', to: '/equipamento/mixpro-ds4' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Manifesto', to: '/manifesto' },
      { label: 'Blog & notícias', to: '/blog' },
      { label: 'Sustentabilidade' },
      { label: 'Certificações' },
    ],
  },
  {
    title: 'Suporte',
    links: [
      { label: 'Perguntas frequentes', to: '/faq' },
      { label: 'Contactos', to: '/contactos' },
      { label: 'Fichas técnicas' },
      { label: 'Encontrar loja', to: '/lojas' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-8 lg:px-12">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <p className="font-display max-w-2xl text-4xl leading-[1.02] font-medium sm:text-5xl">
            Limpeza profissional,
            <br />
            <span className="text-accent">sem meias-medidas.</span>
          </p>
          <Link
            to="/contactos"
            className="flex h-14 items-center rounded-full border border-white/25 px-8 text-sm font-semibold transition-colors duration-200 hover:bg-white hover:text-ink"
          >
            Falar com a equipa comercial
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-white/10 py-10 text-sm sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-[11px] font-medium tracking-[0.16em] text-accent">
                {col.title.toUpperCase()}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} className="opacity-60 transition-opacity duration-200 hover:opacity-100">
                        {link.label}
                      </Link>
                    ) : (
                      <a href="#" className="opacity-60 transition-opacity duration-200 hover:opacity-100">
                        {link.label}
                      </a>
                    )}
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
