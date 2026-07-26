import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Base: Relume UI Badge, adaptado ao design system do Illiabum Clube
const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider2",
  {
    variants: {
      variant: {
        gold: "bg-gold-500 text-ink-950",
        bordeaux: "bg-bordeaux-900 text-white",
        outline: "border border-ink-950/20 text-ink-950",
        "outline-light": "border border-white/30 text-white",
      },
    },
    defaultVariants: { variant: "gold" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
