import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn/ui Button adaptado ao design system do Illiabum Clube:
// tipografia display uppercase, cantos retos (--radius: 0) e variantes
// extra para os fundos escuros das secções gráficas.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-display uppercase tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-gold-400",
        secondary: "bg-secondary text-secondary-foreground hover:bg-bordeaux-800",
        dark: "bg-ink-950 text-white hover:bg-bordeaux-900",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background",
        "outline-light":
          "border-2 border-white text-white hover:bg-white hover:text-ink-950",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "gap-2 p-0 text-secondary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-7 py-3.5 text-base",
        sm: "px-5 py-2.5 text-sm",
        lg: "px-9 py-4 text-lg",
        icon: "size-10",
        link: "p-0",
      },
    },
    defaultVariants: {
      variant: "default",
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
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {iconLeft}
      <Slottable>{children}</Slottable>
      {iconRight}
    </Comp>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
