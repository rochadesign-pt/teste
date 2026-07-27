import { Link } from "react-router-dom";

import { Crest } from "@/components/Logo";
import { Marquee } from "@/components/motion/Marquee";
import { club, contacts } from "@/data/club";

const nav = [
  { to: "/clube", label: "O Clube" },
  { to: "/equipas", label: "Equipas" },
  { to: "/jogos", label: "Jogos" },
  { to: "/noticias", label: "Notícias" },
  { to: "/contactos", label: "Contactos" },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink-950 text-white">
      {/* Wordmark gigante em marquee no topo do footer */}
      <Marquee className="border-b border-white/10 py-6" duration={38}>
        <span className="text-outline pr-10 font-display text-7xl uppercase leading-none md:text-9xl">
          Illiabum Clube · Illiabum Clube ·&nbsp;
        </span>
      </Marquee>

      <div className="container-site pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Crest className="size-12" />
            <p className="display-title mt-6 text-4xl text-white md:text-5xl">
              Illiabum <span className="text-gold-500">Clube</span>
            </p>
            <p className="mt-3 max-w-sm text-sm text-white/60">
              {club.tagline}. Fundado a {club.foundedDate}, em {club.city}.
            </p>
          </div>

          <div>
            <p className="eyebrow-light mb-4">Navegação</p>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/70 transition-colors hover:text-gold-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow-light mb-4">Contactos</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>{club.pavilion}</li>
              <li>
                <a href={`mailto:${contacts.email}`} className="hover:text-gold-500">
                  {contacts.email}
                </a>
              </li>
            </ul>
            <p className="eyebrow-light mb-3 mt-8">Segue-nos</p>
            <ul className="flex gap-4">
              {contacts.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-gold-500"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {club.name}. Todos os direitos reservados.
          </p>
          <p>Desde 1943 a fazer de Ílhavo terra de basquetebol.</p>
        </div>
      </div>
    </footer>
  );
}
