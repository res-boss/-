import * as React from "react";

import { cn } from "@/lib/utils";

/** Underline-only field — reads like a line in a printed form. */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 border-0 border-b border-input bg-transparent px-0 text-body tracking-[0.02em]",
        "placeholder:text-subtle transition-colors duration-500 ease-editorial",
        "outline-none focus-visible:border-foreground",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
