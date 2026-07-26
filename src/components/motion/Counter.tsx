import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type CounterProps = {
  value: number;
  suffix?: string;
  className?: string;
};

export function Counter({ value, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current.innerText = String(value);
      return;
    }
    gsap.fromTo(
      ref.current,
      { innerText: 0 },
      {
        innerText: value,
        duration: 1.2,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      },
    );
  }, [value]);

  return (
    <span className={className}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
