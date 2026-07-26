import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

// Cabeçalho institucional das páginas interiores: bordô escuro,
// tipografia display gigante, linha amarela de assinatura.
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="court-lines bg-bordeaux-900 pb-16 pt-32 text-white md:pb-20 md:pt-44">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow-light mb-4">{eyebrow}</p>
          <h1 className="display-title max-w-4xl text-5xl md:text-7xl">{title}</h1>
          {description && (
            <p className="mt-6 max-w-2xl text-base text-white/70 md:text-lg">
              {description}
            </p>
          )}
          <div className="mt-8 h-1.5 w-24 bg-gold-500" />
        </Reveal>
      </div>
    </section>
  );
}
