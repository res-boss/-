import type { Transition, Variants } from "framer-motion";

/**
 * Motion tokens. Everything on the site moves with the same slow,
 * decelerating curve so nothing ever feels busy.
 */
export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.6,
  base: 1.0,
  slow: 1.4,
} as const;

/** Distance (px) an element travels while fading in. Kept small on purpose. */
export const RISE = 24;

export const STAGGER = 0.12;

export const transition: Transition = {
  duration: DURATION.base,
  ease: EASE_EDITORIAL,
};

/* `visible` variants take the delay (seconds) through framer-motion's `custom` prop. */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: RISE },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { ...transition, delay } }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({ opacity: 1, transition: { ...transition, duration: DURATION.slow, delay } }),
};

/** Image reveal: a clip that opens upward, with a gentle settle in scale. */
export const unveil: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.06 },
  visible: (delay = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE_EDITORIAL, delay },
  }),
};

export const staggerContainer = (stagger = STAGGER, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Trigger when ~15% of the element is on screen; play once only. */
export const VIEWPORT = { once: true, amount: 0.15 } as const;
