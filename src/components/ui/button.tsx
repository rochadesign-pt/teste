import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Base: Relume UI Button, adaptado ao design system do Illiabum Clube
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display uppercase tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gold-500 text-ink-950 hover:bg-gold-400",
        dark: "bg-ink-950 text-white hover:bg-bordeaux-900",
        bordeaux: "bg-bordeaux-900 text-white hover:bg-bordeaux-800",
        outline:
          "border-2 border-ink-950 text-ink-950 hover:bg-ink-950 hover:text-white",
        "outline-light":
          "border-2 border-white text-white hover:bg-white hover:text-ink-950",
        link: "gap-2 p-0 text-bordeaux-800 underline-offset-4 hover:underline",
      },
      size: {
        default: "px-7 py-3.5 text-base",
        sm: "px-5 py-2.5 text-sm",
        lg: "px-9 py-4 text-lg",
        link: "p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  iconLeft,
  iconRight,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {iconLeft}
      <Slottable>{children}</Slottable>
      {iconRight}
    </Comp>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
