import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// `ready` fica true quando o preloader levanta — o hero espera por isto
// para disparar a sua sequência de entrada.
const ReadyContext = createContext(false);
export const useSiteReady = () => useContext(ReadyContext);

export function Preloader({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // Uma vez por sessão de navegação — em revisitas o preloader não repete.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      sessionStorage.getItem("illiabum-preloaded")
    ) {
      setReady(true);
      setDone(true);
      return;
    }
    sessionStorage.setItem("illiabum-preloaded", "1");

    const tl = gsap.timeline({ onComplete: () => setDone(true) });
    tl.from(".preloader-word", {
      yPercent: 115,
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.09,
      delay: 0.15,
    })
      .fromTo(
        counter.current,
        { innerText: 0 },
        {
          innerText: 100,
          duration: 1.5,
          ease: "power2.inOut",
          snap: { innerText: 1 },
        },
        0.2,
      )
      .to(".preloader-word", {
        yPercent: -115,
        duration: 0.6,
        ease: "power3.in",
        stagger: 0.06,
      })
      .to(
        overlay.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onStart: () => setReady(true),
        },
        "-=0.25",
      );
  }, []);

  return (
    <ReadyContext.Provider value={ready}>
      {!done && (
        <div
          ref={overlay}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink-950 p-6 md:p-10"
          aria-hidden="true"
        >
          <div />
          <div className="overflow-hidden">
            <p className="font-display text-5xl uppercase leading-none text-white md:text-8xl">
              <span className="preloader-word inline-block">Illiabum&nbsp;</span>
              <span className="preloader-word inline-block text-gold-500">Clube</span>
            </p>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-xs uppercase tracking-wider2 text-white/40">
              Ílhavo · Desde 1943
            </p>
            <p className="font-display text-6xl leading-none text-bordeaux-600 md:text-8xl">
              <span ref={counter}>0</span>
              <span className="text-2xl text-white/30 md:text-4xl">%</span>
            </p>
          </div>
        </div>
      )}
      {children}
    </ReadyContext.Provider>
  );
}
