import { useEffect, useRef } from "react";
import { useInView, useReducedMotion, animate } from "motion/react";

// ============================================================
// StatCounter
// Animated statistics counter (0 -> target) triggered on scroll.
//
// Parses display values straight from en.json so translations stay
// untouched: "1000+" -> counts to 1000 and keeps the "+",
//            "05+"   -> keeps the leading-zero padding ("00" ... "05").
// Falls back to plain text for non-numeric values / reduced motion.
//
// The number is rendered in a fixed-width box (sized to the final
// digit count, tabular-nums so every digit takes equal space) so the
// prefix/suffix ("$", "+", "%") never shifts while digits are counting.
// ============================================================
// Total time for the count-up, in seconds. Reference animation takes
// ~2s — noticeably slower than a snappy 1s counter.
const DURATION = 2;

// Gentle deceleration curve (not a raw exponential, which reaches ~90%
// in the first few frames and feels like an instant jump). This bezier
// climbs steadily through the middle and only eases off right at the
// end, matching the reference's "creeps into the final number" feel.
const EASE_COUNT = [0.16, 1, 0.3, 1];

const StatCounter = ({ value, className = "" }) => {
  const ref = useRef(null);
  const numRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  const match = String(value ?? "").match(/^([^0-9]*)(\d+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const digits = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = digits ? parseInt(digits, 10) : 0;
  const pad = digits.startsWith("0") ? digits.length : 0;
  const format = (n) => (pad ? String(n).padStart(pad, "0") : String(n));

  useEffect(() => {
    const el = numRef.current;
    if (!el || !inView || !match) return;

    if (reduceMotion) {
      el.textContent = digits;
      return;
    }

    const controls = animate(0, target, {
      duration: DURATION,
      ease: EASE_COUNT,
      onUpdate: (latest) => {
        el.textContent = format(Math.round(latest));
      },
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion, value]);

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span
        ref={numRef}
        style={{
          display: "inline-block",
          width: `${digits.length}ch`,
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {format(0)}
      </span>
      {suffix}
    </span>
  );
};

export default StatCounter;