import { motion, useReducedMotion } from "motion/react";
import { fadeUp, VIEWPORT_ONCE, EASE_OUT } from "./motionVariants";

// ============================================================
// Reveal
// Reusable scroll-triggered reveal wrapper (animates ONCE on enter).
//
//   <Reveal>...</Reveal>                          -> fade up
//   <Reveal variants={fadeLeft} delay={0.1}>...   -> fade left, delayed
//
// - GPU-friendly: animates transform + opacity only
// - Respects prefers-reduced-motion (renders static)
// ============================================================
const Reveal = ({
  children,
  variants = fadeUp,
  delay = 0,
  className = "",
  viewport = VIEWPORT_ONCE,
}) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={delay ? { duration: 0.7, ease: EASE_OUT, delay } : undefined}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
