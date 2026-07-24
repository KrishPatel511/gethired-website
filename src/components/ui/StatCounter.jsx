import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

// Parses "3.8k", "$388M", "92%", "437" → { prefix, number, decimals, suffix }
const parseValue = (raw) => {
  const str = String(raw).trim();
  const match = str.match(/^([^\d.-]*)([\d,]*\.?\d*)([^\d]*)$/);
  if (!match) return { prefix: "", number: 0, decimals: 0, suffix: str };

  const [, prefix, numStr, suffix] = match;
  const cleanNum = numStr.replace(/,/g, "");
  const decimals = cleanNum.includes(".") ? cleanNum.split(".")[1].length : 0;

  return {
    prefix,
    number: parseFloat(cleanNum) || 0,
    decimals,
    suffix,
  };
};

const StatCounter = ({ value, duration = 1.8 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");

  const { prefix, number, decimals, suffix } = parseValue(value);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, number, {
      duration,
      // Slow, decelerating finish — matches the reference: fast climb,
      // gentle settle into the final number instead of a hard stop.
      ease: [0.16, 1, 0.3, 1], // custom easeOutExpo-style curve
      onUpdate: (latest) => {
        setDisplay(
          decimals > 0
            ? latest.toFixed(decimals)
            : Math.round(latest).toLocaleString("en-US")
        );
      },
    });

    return () => controls.stop();
  }, [isInView, number, decimals, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

export default StatCounter;