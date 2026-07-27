import { useEffect, useState } from "react";
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

const isActive = (current: string, to: string) =>
  to === "/" ? current === "/" : current.startsWith(to);

export function Navbar({ currentPath = "/" }: { currentPath?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Só a Home tem hero escuro full-bleed — nas outras páginas a navbar é sempre sólida.
  const overHero = currentPath === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        overHero && !open
          ? "bg-transparent"
          : "border-b border-border bg-background/95 backdrop-blur",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between md:h-20">
        <a href="/" aria-label="Illiabum Clube — Início">
          <Logo light={overHero && !open} />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {links.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className={cn(
                "px-3 py-2 font-display text-sm uppercase tracking-wide transition-colors",
                overHero
                  ? "text-white/80 hover:text-gold-500"
                  : "text-foreground/70 hover:text-bordeaux-800",
                isActive(currentPath, link.to) &&
                  (overHero ? "text-gold-500" : "text-bordeaux-800"),
              )}
            >
              {link.label}
            </a>
          ))}
          <Magnetic strength={0.25} className="ml-3">
            <Button asChild size="sm">
              <a href="/contactos#socios">Torna-te Sócio</a>
            </Button>
          </Magnetic>
        </nav>

        <button
          type="button"
          className={cn(
            "flex size-10 flex-col items-center justify-center gap-1.5 lg:hidden",
            overHero && !open ? "text-white" : "text-foreground",
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
            className="border-b border-border bg-background lg:hidden"
            aria-label="Navegação principal (móvel)"
          >
            <div className="container-site flex flex-col gap-1 pb-6 pt-2">
              {links.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "py-2.5 font-display text-2xl uppercase tracking-wide",
                    isActive(currentPath, link.to)
                      ? "text-bordeaux-800"
                      : "text-foreground",
                  )}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-4 w-full">
                <a href="/contactos#socios">Torna-te Sócio</a>
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
