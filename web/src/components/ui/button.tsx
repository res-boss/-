import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap",
    "text-[0.8125rem] font-medium uppercase tracking-[0.18em]",
    "transition-[background-color,color,border-color,opacity] duration-500 ease-editorial",
    "outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[1.25]",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85",
        outline: "border border-foreground/25 bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
        ghost: "text-foreground hover:bg-secondary",
        link: "h-auto! px-0! tracking-[0.18em] text-foreground link-underline pb-1",
      },
      size: {
        sm: "h-10 px-5",
        default: "h-12 px-8",
        lg: "h-14 px-10",
        icon: "size-12",
      },
      shape: {
        square: "rounded-none",
        pill: "rounded-full",
      },
    },
    defaultVariants: { variant: "default", size: "default", shape: "square" },
  },
);

function Button({
  className,
  variant,
  size,
  shape,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, shape, className }))} {...props} />;
}

export { Button, buttonVariants };
