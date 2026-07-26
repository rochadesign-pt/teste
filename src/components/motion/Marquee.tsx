import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
};

// Faixa contínua estilo ticker de pavilhão. O conteúdo é duplicado
// e animado -50% em loop para um scroll infinito sem costuras.
export function Marquee({ children, className, duration = 22 }: MarqueeProps) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!track.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(track.current, {
      xPercent: -50,
      duration,
      ease: "none",
      repeat: -1,
    });
  }, [duration]);

  return (
    <div className={className} aria-hidden="true">
      <div className="overflow-hidden">
        <div ref={track} className="flex w-max">
          <div className="flex shrink-0 items-center">{children}</div>
          <div className="flex shrink-0 items-center">{children}</div>
        </div>
      </div>
    </div>
  );
}
