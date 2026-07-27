import * as React from "react";

import { cn } from "@/lib/utils";

// shadcn/ui Textarea com a borda 2px da identidade.
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[8rem] w-full rounded-md border-2 border-input bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-secondary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
