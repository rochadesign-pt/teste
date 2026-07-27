import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Ilha standalone (persistente entre view transitions do Astro).
// Lenis + ScrollTrigger em sincronia: o ticker do GSAP conduz o raf do Lenis
// e cada scroll do Lenis atualiza os triggers — essencial para secções pinned.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    const onSwap = () => lenis.scrollTo(0, { immediate: true, force: true });
    window.addEventListener("load", onLoad);
    document.addEventListener("astro:after-swap", onSwap);

    return () => {
      window.removeEventListener("load", onLoad);
      document.removeEventListener("astro:after-swap", onSwap);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
