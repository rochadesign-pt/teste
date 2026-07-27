import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

// Cursor personalizado: ponto que segue o rato com mola e cresce sobre
// elementos interativos. Só em pointers precisos e sem reduced-motion.
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setHovering(
        Boolean(target?.closest?.("a, button, select, input, textarea, [data-cursor]")),
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[110] size-4 rounded-full bg-white mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ scale: hovering ? 3 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    />
  );
}
