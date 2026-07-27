import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { teams } from "@/data/teams";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Secção pinned com scroll horizontal (desktop): a página "prende" e o scroll
// arrasta a fila de escalões na horizontal. Em mobile é scroll nativo.
export function TeamsPreview() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const amount = () =>
            (track.current?.scrollWidth ?? 0) - window.innerWidth;
          gsap.to(track.current, {
            x: () => -amount(),
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => `+=${amount()}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          gsap.to(".teams-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => `+=${amount()}`,
              scrub: 1,
            },
          });
        },
      );
    },
    { scope: section },
  );

  return (
    <section ref={section} className="overflow-hidden bg-ink-950 text-white">
      <div className="flex min-h-svh flex-col justify-center py-16 lg:py-0">
        <div className="container-site mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <p className="eyebrow-light mb-3">Equipas</p>
            <SplitReveal className="display-title text-4xl text-white md:text-6xl">
              Do Baby Basket <span className="text-gold-500">aos Seniores</span>
            </SplitReveal>
          </div>
          <Reveal delay={0.1}>
            <Button asChild variant="outline-light">
              <Link to="/equipas">Todas as equipas</Link>
            </Button>
          </Reveal>
        </div>

        <div className="overflow-x-auto pb-4 lg:overflow-visible lg:pb-0">
          <div
            ref={track}
            className="flex w-max gap-4 px-5 md:px-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]"
          >
            {teams.map((team, index) => (
              <Link
                key={team.slug}
                to="/equipas"
                className={cn(
                  "group relative flex h-[26rem] w-72 shrink-0 flex-col justify-between overflow-hidden p-6 transition-colors duration-300 md:w-80",
                  index % 3 === 0
                    ? "bg-bordeaux-900 hover:bg-bordeaux-800"
                    : "border-2 border-white/10 bg-transparent hover:border-gold-500",
                )}
              >
                <span
                  className={cn(
                    "font-display text-8xl leading-none transition-colors duration-300",
                    index % 3 === 0
                      ? "text-gold-500"
                      : "text-outline group-hover:text-gold-500",
                  )}
                >
                  {team.short}
                </span>
                <span>
                  <span className="display-title block text-3xl text-white">
                    {team.name}
                  </span>
                  <span className="mt-2 block text-xs uppercase tracking-wider2 text-white/50">
                    {team.competition}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-6 right-6 font-display text-xl text-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold-500"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Barra de progresso do scroll horizontal */}
        <div className="container-site mt-10 hidden lg:block">
          <div className="h-px w-full bg-white/10">
            <div className="teams-progress h-px w-full origin-left scale-x-0 bg-gold-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
