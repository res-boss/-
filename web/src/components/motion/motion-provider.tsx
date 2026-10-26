"use client";

import { MotionConfig } from "framer-motion";

/**
 * reducedMotion="user": for visitors with "reduce motion" turned on, framer-motion
 * drops transform and layout animation and keeps only the opacity fade.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
