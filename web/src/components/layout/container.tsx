import * as React from "react";

import { cn } from "@/lib/utils";

/** Max 1440px, fluid side gutter (20px on phones → 64px on desktop). */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("container-editorial", className)} {...props} />;
}
