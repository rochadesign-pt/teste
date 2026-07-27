import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type SplitRevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
};

// Título com reveal por linhas mascaradas (SplitText + autoSplit para
// re-calcular quando as fontes carregam ou a janela redimensiona).
export function SplitReveal({
  as: Tag = "h2",
  children,
  className,
  delay = 0,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 115,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.09,
            delay,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }),
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
