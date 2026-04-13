"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sectionTransition } from "./transitions";

type MotionSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Scroll-reveal wrapper for homepage sections and similar marketing blocks.
 */
export function MotionSection({
  children,
  className = "",
  delay = 0,
}: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{
        duration: sectionTransition.duration,
        ease: [...sectionTransition.ease],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
