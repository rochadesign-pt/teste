import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { Magnetic } from "@/components/motion/Magnetic";
import { useSiteReady } from "@/components/motion/Preloader";
import { Button } from "@/components/ui/button";
import { club } from "@/data/club";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Hero cinematográfico: entrada orquestrada por caracteres mascarados após o
// preloader, marquee outline gigante em fundo e parallax de saída no scroll.
// Base estrutural original: Relume Header 113.
export function Hero() {
  const container = useRef<HTMLElement>(null);
  const ready = useSiteReady();

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!reduce) {
        // Marquee de fundo em loop contínuo
        gsap.to(".hero-marquee-track", {
          xPercent: -50,
          duration: 40,
          ease: "none",
          repeat: -1,
        });

        // Parallax de saída: o título afunda mais devagar do que o scroll
        gsap.to(".hero-title", {
          yPercent: 22,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-circle", {
          yPercent: -14,
          rotate: 20,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: container },
  );

  useGSAP(
    () => {
      if (!ready) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(".hero-fade, .hero-title", { autoAlpha: 1 });
        return;
      }

      gsap.set(".hero-title", { autoAlpha: 1 });
      const tl = gsap.timeline();

      SplitText.create(".hero-title", {
        type: "chars",
        mask: "chars",
        onSplit: (self) => {
          tl.from(self.chars, {
            yPercent: 115,
            duration: 1,
            ease: "power4.out",
            stagger: 0.032,
          });
        },
      });

      tl.fromTo(
        ".hero-fade",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
        "-=0.55",
      ).fromTo(
        ".hero-scroll-hint",
        { scaleY: 0 },
        { scaleY: 1, duration: 0.6, ease: "power3.out", transformOrigin: "top" },
        "-=0.4",
      );
    },
    { scope: container, dependencies: [ready] },
  );

  return (
    <section
      ref={container}
      className="relative overflow-hidden bg-bordeaux-900 text-white"
    >
      <div className="court-lines halftone absolute inset-0" />

      {/* Marquee outline gigante atrás do título */}
      <div
        aria-hidden="true"
        className="absolute top-24 w-full overflow-hidden opacity-90 md:top-28"
      >
        <div className="hero-marquee-track flex w-max whitespace-nowrap">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="text-outline pr-8 font-display text-[8rem] uppercase leading-none md:text-[13rem]"
            >
              Basquetebol · Ílhavo · Desde 1943 ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Círculo central do campo, como elemento gráfico */}
      <div
        aria-hidden="true"
        className="hero-circle absolute -right-40 top-1/2 hidden size-[44rem] -translate-y-1/2 rounded-full border-[3px] border-white/10 lg:block"
      >
        <div className="absolute inset-24 rounded-full border-[3px] border-gold-500/20" />
      </div>

      <div className="container-site relative flex min-h-svh max-h-[70rem] flex-col justify-end pb-20 pt-32 md:pb-24">
        <p className="hero-fade eyebrow-light mb-6 opacity-0">
          {club.city} · Desde {club.founded}
        </p>

        <h1 className="hero-title display-title invisible text-[19vw] leading-[0.85] sm:text-8xl md:text-9xl lg:text-[11rem]">
          Illiabum
          <span className="block text-gold-500">Clube</span>
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:items-end md:gap-20">
          <div className="hero-fade flex flex-wrap gap-4 opacity-0">
            <Magnetic>
              <Button asChild size="lg">
                <Link to="/jogos">Ver Jogos</Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="outline-light" size="lg">
                <Link to="/clube">O Clube</Link>
              </Button>
            </Magnetic>
          </div>

          <p className="hero-fade max-w-md text-base text-white/70 opacity-0 md:text-lg">
            Mais de {new Date().getFullYear() - club.founded} anos de basquetebol, dois
            títulos de campeão nacional e uma formação que faz de Ílhavo terra de
            basquetebol. Isto é o Illiabum.
          </p>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="hero-scroll-hint block h-14 w-px bg-gold-500" />
      </div>
    </section>
  );
}
