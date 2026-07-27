import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Logo } from "@/components/Logo";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Início" },
  { to: "/clube", label: "O Clube" },
  { to: "/equipas", label: "Equipas" },
  { to: "/jogos", label: "Jogos" },
  { to: "/noticias", label: "Notícias" },
  { to: "/contactos", label: "Contactos" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  // Só a Home tem hero escuro full-bleed — nas outras páginas a navbar é sempre sólida.
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        overHero && !open
          ? "bg-transparent"
          : "border-b border-ink-950/10 bg-white/95 backdrop-blur",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between md:h-20">
        <Link to="/" aria-label="Illiabum Clube — Início">
          <Logo light={overHero && !open} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 font-display text-sm uppercase tracking-wide transition-colors",
                  overHero
                    ? "text-white/80 hover:text-gold-500"
                    : "text-ink-950/70 hover:text-bordeaux-800",
                  isActive && (overHero ? "text-gold-500" : "text-bordeaux-800"),
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Magnetic strength={0.25} className="ml-3">
            <Button asChild size="sm">
              <Link to="/contactos#socios">Torna-te Sócio</Link>
            </Button>
          </Magnetic>
        </nav>

        <button
          type="button"
          className={cn(
            "flex size-10 flex-col items-center justify-center gap-1.5 lg:hidden",
            overHero && !open ? "text-white" : "text-ink-950",
          )}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-6 bg-current"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-6 bg-current"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: reduce ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -12 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="border-b border-ink-950/10 bg-white lg:hidden"
            aria-label="Navegação principal (móvel)"
          >
            <div className="container-site flex flex-col gap-1 pb-6 pt-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "py-2.5 font-display text-2xl uppercase tracking-wide",
                      isActive ? "text-bordeaux-800" : "text-ink-950",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Button asChild className="mt-4 w-full">
                <Link to="/contactos#socios">Torna-te Sócio</Link>
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
