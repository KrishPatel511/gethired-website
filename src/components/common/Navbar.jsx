import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useArrayTranslation } from "./hooks/useArrayTranslation";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { ArrowUpRight } from "../ui/Icons";
// import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const navLinks = useArrayTranslation("nav_links");
  const getConsultation = useArrayTranslation("get_consultation");
  const reduceMotion = useReducedMotion();

  // const { dark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Scroll spy — highlights the section currently in view
  const sectionHashes = Array.isArray(navLinks)
    ? navLinks.map((link) => link.path)
    : [];
  const activeSection = useScrollSpy(sectionHashes);

  // Scroll Effect — background blur/shadow once scrolled, plus
  // hide-on-scroll-down / reveal-on-scroll-up for the whole bar.
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      const scrolledDown = currentY > lastY;
      const pastThreshold = currentY > 120; // don't hide near the very top

      if (mobileOpen) {
        setHidden(false); // never hide while the mobile menu is open
      } else if (scrolledDown && pastThreshold) {
        setHidden(true);
      } else if (!scrolledDown) {
        setHidden(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileOpen]);

  return (
    <motion.nav
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
      }
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-dark-bg/85 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          : "bg-cream/60 dark:bg-dark-bg/60"
      } backdrop-blur-md`}
    >
      <div className="w-full mx-auto px-5 sm:px-[40px] py-[9px] flex items-center justify-between">
        {/* Logo + Mobile hamburger (left side) */}
        <div className="flex items-center gap-6">
          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-end gap-1.5 w-10 h-10 cursor-pointer"
          >
            <span className="block h-0.5 w-6 bg-navy dark:bg-cream rounded" />
            <span className="block h-0.5 w-4 bg-navy dark:bg-cream rounded" />
            <span className="block h-0.5 w-6 bg-navy dark:bg-cream rounded" />
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center shrink-0 h-[42px]"
          >
            <img
              src="/logo.svg"
              alt="Get-Hired"
              className="w-20 h-10 object-contain"
            />
          </Link>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex flex-1 justify-center items-center gap-6">
          {Array.isArray(navLinks) &&
            navLinks.map((link) => {
              const isActive = activeSection === link.path;

              return (
                <li key={link.label} className="relative">
                  <a
                    href={link.path}
                    aria-current={isActive ? "true" : undefined}
                    className={`px-3 py-3 text-xs font-bold uppercase tracking-[0.16em] leading-4 transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-slate-900 dark:text-slate-200 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </a>

                  {/* Active indicator — one shared dot slides between links */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    />
                  )}
                </li>
              );
            })}
        </ul>

        {/* Theme Toggle + CTA */}
        <div className="flex items-center gap-3">
          
          <button
            type="button"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="hidden md:inline-flex items-center justify-center gap-2 h-10 px-4 py-2.5 bg-primary hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-disabled rounded-xl text-white text-sm font-bold font-display whitespace-nowrap transition-colors shadow-[0_8px_20px_rgba(195,47,38,0.25)]"
          >
            {getConsultation}
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

      </div>

      {/* Mobile menu — smooth open/close */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-dark-bg/97 backdrop-blur-md border-t border-slate-100 dark:border-white/10"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {Array.isArray(navLinks) &&
                navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 font-bold font-display text-base border-b border-slate-100 dark:border-white/10 ${
                        activeSection === link.path
                          ? "text-primary"
                          : "text-navy dark:text-slate-100"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              <li className="pt-4 pb-2">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 bg-primary text-white font-bold font-display rounded-lg px-5 py-3"
                >
                  {getConsultation}
                  <ArrowUpRight />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;