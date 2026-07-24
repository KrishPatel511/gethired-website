import { useEffect, useState } from "react";

// ============================================================
// useScrollSpy
// Returns the hash ("#about", "#services", ...) of the section the
// user is currently scrolled to, for the active navbar state.
//
//   const active = useScrollSpy(["#about", "#services", "#results", "#contact"]);
//
// Works regardless of section order on the page and stays cheap:
// positions are read only inside a passive scroll listener.
// ============================================================
export const useScrollSpy = (hashes = [], offset = 96) => {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!Array.isArray(hashes) || hashes.length === 0) return undefined;

    const handleScroll = () => {
      const line = window.scrollY + offset + 1;

      // Bottom of page: the last section may be shorter than the viewport
      // and can never cross the line — force-activate the lowest section.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      let current = "";
      let currentTop = -Infinity;

      for (const hash of hashes) {
        const el = document.querySelector(hash);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        // pick the section closest above the scroll line
        // (or simply the lowest one when the page is fully scrolled)
        if ((atBottom || top <= line) && top > currentTop) {
          current = hash;
          currentTop = top;
        }
      }

      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashes.join(","), offset]);

  return active;
};
