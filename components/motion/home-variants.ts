import type { Variants } from "framer-motion";
import { sectionTransition } from "./transitions";

/** Staggered children (e.g. service cards) */
export function serviceGridVariants(reduceMotion: boolean | null): {
  container: Variants;
  item: Variants;
} {
  const off = Boolean(reduceMotion);
  return {
    container: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: off ? 0 : 0.11,
          delayChildren: off ? 0 : 0.06,
        },
      },
    },
    item: {
      hidden: { opacity: off ? 1 : 0, y: off ? 0 : 22 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: off ? 0 : sectionTransition.duration,
          ease: [...sectionTransition.ease],
        },
      },
    },
  };
}
