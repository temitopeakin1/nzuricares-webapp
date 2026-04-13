/** Shared easing / timing for homepage + section motion */

export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const sectionTransition = {
  duration: 0.45,
  ease: easeOutExpo,
} as const;
