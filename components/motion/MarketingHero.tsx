"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "./transitions";

export type MarketingHeroProps = {
  children: React.ReactNode;
  /** Path for CSS `url()`, e.g. `/images/nurse.jpg` */
  backgroundImage: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  /** Full-bleed overlay (Tailwind classes) */
  overlayClassName?: string;
  /** Positioning wrapper for hero copy (Tailwind classes) */
  contentClassName?: string;
  /** Outer hero shell (min-height, bg-cover, etc.) */
  shellClassName?: string;
};

const defaultShell =
  "relative w-full min-h-[50vh] bg-cover bg-center sm:min-h-[55vh] md:min-h-[70vh] lg:min-h-[78vh]";

const defaultOverlay =
  "absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10";

const defaultContent =
  "absolute inset-0 flex items-center justify-start";

/**
 * Shared hero for company / service marketing pages — background + overlay +
 * Framer Motion entrance on the children block.
 */
export function MarketingHero({
  children,
  backgroundImage,
  backgroundPosition = "center top",
  backgroundSize = "cover",
  overlayClassName = defaultOverlay,
  contentClassName = defaultContent,
  shellClassName = defaultShell,
}: MarketingHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={shellClassName}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition,
        backgroundSize,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={overlayClassName} aria-hidden />
      <div className={contentClassName}>
        <motion.div
          className="w-full"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: easeOutExpo }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
