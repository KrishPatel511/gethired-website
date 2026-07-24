import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from "motion/react";

// ============================================================
// AnimatedLogoMarquee
// Seamless infinite logo marquee (Motion).
//
// Two things make it gap-proof at EVERY screen width:
// 1. The number of logo-set copies is measured, not hardcoded:
//    copies = ceil(containerWidth / setWidth) + 1, so the track always
//    covers the container plus one spare set (ultra-wide / zoomed-out
//    screens included).
// 2. The x position wraps by exactly one measured set width, so the
//    loop restart is pixel-perfect and invisible.
//
// - `speed` = px/second (default 55)
// - pauses on hover (and for prefers-reduced-motion)
// - transform-only -> GPU-friendly, no layout thrashing
// ============================================================
const AnimatedLogoMarquee = ({ logos, speed = 55 }) => {
  const x = useMotionValue(0);
  const wrapperRef = useRef(null);
  const firstSetRef = useRef(null);
  const [copies, setCopies] = useState(2);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  // Measure how many set copies are needed to cover the container,
  // and re-measure on resize (zoom, rotation, window resize).
  useLayoutEffect(() => {
    const measure = () => {
      const wrapWidth = wrapperRef.current?.offsetWidth || 0;
      const setWidth = firstSetRef.current?.offsetWidth || 0;
      if (wrapWidth && setWidth) {
        setCopies(Math.max(2, Math.ceil(wrapWidth / setWidth) + 1));
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [logos]);

  useAnimationFrame((time, delta) => {
    if (paused || reduceMotion) return;

    const setWidth = firstSetRef.current?.offsetWidth;
    if (!setWidth) return;

    let next = x.get() - (speed * delta) / 1000;
    if (next <= -setWidth) next += setWidth; // seamless wrap
    x.set(next);
  });

  if (!Array.isArray(logos) || logos.length === 0) return null;

  const renderSet = (setIndex) => (
    <div
      key={setIndex}
      ref={setIndex === 0 ? firstSetRef : null}
      aria-hidden={setIndex > 0}
      className="flex items-center gap-6 pr-6"
    >
      {logos.map((logo, index) => (
        <div
          key={`${setIndex}-${index}`}
          className="
            w-32
            sm:w-36
            lg:w-40
            h-12
            flex-shrink-0
            flex
            items-center
            justify-center
            mix-blend-luminosity
          "
        >
          <img
            src={logo}
            alt="Brand Logo"
            draggable={false}
            loading="lazy"
            className="
              max-w-[130px]
              max-h-9
              object-contain
              grayscale
              opacity-70
              transition-all
              duration-300
              hover:grayscale-0
              hover:opacity-100
            "
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className="w-full overflow-hidden marquee-fade select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div style={{ x }} className="flex w-max items-center">
        {Array.from({ length: copies }, (_, i) => renderSet(i))}
      </motion.div>
    </div>
  );
};

export default AnimatedLogoMarquee;
