"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { fadeIn, fadeUp, staggerContainer, unveil, VIEWPORT } from "@/lib/motion";

const VARIANTS = { fadeUp, fadeIn, unveil };

type Variant = keyof typeof VARIANTS;
type Tag = "div" | "section" | "article" | "header" | "footer" | "li" | "ul" | "ol" | "p" | "span" | "h1" | "h2" | "h3" | "figure";

type BaseProps = Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "variants">;

type RevealProps = BaseProps & {
  as?: Tag;
  variant?: Variant;
  /** Seconds to wait after entering the viewport. */
  delay?: number;
};

/**
 * Fades its children in once, as they scroll into view.
 * Reduced motion is handled globally by <MotionProvider>.
 */
export function Reveal({ as = "div", variant = "fadeUp", delay = 0, ...props }: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={VARIANTS[variant]}
      custom={delay}
      {...props}
    />
  );
}

type StaggerProps = BaseProps & {
  as?: Tag;
  /** Seconds between each child. */
  stagger?: number;
  delay?: number;
};

/** Parent that reveals its <StaggerItem> children one after another. */
export function Stagger({ as = "div", stagger, delay, ...props }: StaggerProps) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={staggerContainer(stagger, delay)}
      {...props}
    />
  );
}

export function StaggerItem({ as = "div", variant = "fadeUp", ...props }: BaseProps & { as?: Tag; variant?: Variant }) {
  const MotionTag = motion[as] as typeof motion.div;
  return <MotionTag variants={VARIANTS[variant]} {...props} />;
}
