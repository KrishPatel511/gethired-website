import { useEffect, useRef } from "react";

// Same marquee implementation used in the Kadders project:
// auto-scrolls with requestAnimationFrame, pauses on hover/touch.
const LogoMarquee = ({ logos }) => {
  const marqueeRef = useRef(null);
  const requestRef = useRef(null);
  const scrollPos = useRef(0);
  const isPaused = useRef(false);

  // We repeat the logos multiple times to ensure the scrollbar never hits the end
  const repeatedLogos = Array(20).fill(logos).flat();

  const animate = () => {
    const el = marqueeRef.current;
    if (!el) return;

    if (!isPaused.current) {
      scrollPos.current += 1;

      const innerDiv = el.children[0];
      if (innerDiv && innerDiv.children.length > 0) {
        const singleSetLength = innerDiv.children.length / 20;
        const firstElem = innerDiv.children[0];
        const dupElem = innerDiv.children[singleSetLength];

        if (firstElem && dupElem) {
          const resetPoint = dupElem.offsetLeft - firstElem.offsetLeft;
          if (resetPoint > 0 && scrollPos.current >= resetPoint) {
            scrollPos.current -= resetPoint;
          }
        }
      }

      el.scrollLeft = scrollPos.current;
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      ref={marqueeRef}
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
      onTouchStart={() => (isPaused.current = true)}
      onTouchEnd={() => (isPaused.current = false)}
      className="overflow-hidden w-full cursor-pointer scrollbar-hide"
    >
      <div className="inline-flex items-center gap-10 md:gap-14 whitespace-nowrap">
        {repeatedLogos.map((logo, i) => (
          <div key={i} className="flex-shrink-0">
            <img
              src={logo}
              alt="brand logo"
              className="h-6 md:h-7 object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;
