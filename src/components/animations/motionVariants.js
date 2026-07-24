// ============================================================
// Reusable Motion variants (Kadders pattern: define once, reuse everywhere)
//
// Usage with <Reveal>:            <Reveal variants={fadeLeft}>...</Reveal>
// Usage with stagger containers:  parent gets staggerContainer(), children
//                                 get fadeUp/scaleIn and inherit the trigger.
// ============================================================

export const EASE_OUT = [0.22, 1, 0.36, 1]; // smooth deceleration
export const EASE_POP = [0.24, 1.3, 0.35, 1]; // slight overshoot (hero chips)

// whileInView trigger: run once, slightly before the element is fully visible
export const VIEWPORT_ONCE = { once: true, margin: "0px 0px -60px 0px" };

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

// Text drops in FROM ABOVE — opposite of fadeUp. Used where a heading
// should feel like it's descending into place rather than rising.
export const fadeDown = {
  hidden: { opacity: 0, y: -28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

// Hero chip entrance — pop with overshoot. Per-element delay via `custom`:
//   <motion.div variants={pop} custom={0.55} />
export const pop = {
  hidden: { opacity: 0, y: 22, scale: 0.86 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, delay, ease: EASE_POP },
  }),
};

// Parent orchestrator — staggers all direct motion children
export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// Gentle infinite up/down drift for settled hero elements (phone chips,
// job card, avatar strip). Each element gets a slightly different
// duration/delay so they float out of sync — feels organic, not robotic.
// Usage: <motion.div animate={floatLoop(0.3)} /> — spread the returned
// object directly onto the motion component (it contains animate + transition).
export const floatLoop = (delay = 0, distance = 8, duration = 3.2) => ({
  animate: {
    y: [0, -distance, 0],
  },
  transition: {
    duration,
    delay,
    repeat: Infinity,
    ease: "easeInOut",
  },
});

// Hero floating cards slide IN from outside the frame, converging toward
// the phone at center — not just fading in place. Pass the horizontal
// distance the element should travel from (positive = starts to the
// right and slides left/"inward"; negative = starts left and slides
// right/"inward"), plus how far below it starts.
export const slideInward = (fromX = 0, fromY = 24) => ({
  hidden: { opacity: 0, x: fromX, y: fromY, scale: 0.88 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE_POP },
  },
});

// "Flower opening" card entrance — each card rises from below while
// scaling up from small, and un-rotates from a slight tilt back to
// straight. Alternating the tilt direction by index (even cards lean
// left, odd cards lean right) is what gives the "petals unfolding
// outward" feel instead of every card just moving identically.
// Usage: <motion.div variants={petalUp} custom={index} />
export const petalUp = {
  hidden: (index = 0) => ({
    opacity: 0,
    y: 70,
    scale: 0.8,
    rotate: index % 2 === 0 ? -10 : 10,
  }),
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: EASE_POP },
  },
};