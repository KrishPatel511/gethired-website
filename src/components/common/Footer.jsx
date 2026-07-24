import { motion } from "motion/react";
import { useArrayTranslation } from "./hooks/useArrayTranslation";
import Reveal from "../animations/Reveal";
import { staggerContainer, VIEWPORT_ONCE, EASE_OUT } from "../animations/motionVariants";

// Decorative growth bars rise from the baseline when the footer scrolls in
const growBar = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

const socials = [
  {
    label: "LinkedIn",
    path: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.5 17.5h-2.4V10h2.4v7.5zM7.3 8.9a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8zm10.2 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.5 1-1.5 2v3.8H10V10h2.3v1h.1c.3-.6 1.1-1.2 2.3-1.2 2.4 0 2.9 1.6 2.9 3.7v4z",
  },
  {
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.5a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z",
  },
  {
    label: "X",
    path: "M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L2.2 3h6.4l4.4 5.9L17.5 3zm-1.1 16.1h1.7L7.7 4.7H5.9l10.5 14.4z",
  },
  {
    label: "YouTube",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.2V8.8l5.2 3.2-5.2 3.2z",
  },
];

const Footer = () => {
  const footer = useArrayTranslation("footer");

  return (
    <section id="contact" className="px-3 sm:px-6 pb-4 pt-16 bg-cream">
      <Reveal className="relative max-w-7xl mx-auto bg-navy-deep rounded-[28px] overflow-hidden">
        {/* Decorative growth bars in the background — grow up on reveal */}
        <motion.div
          variants={staggerContainer(0.08, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="pointer-events-none absolute bottom-0 inset-x-0 h-64 flex items-end justify-center gap-10 opacity-[0.35]"
        >
          {[90, 140, 200, 250, 190, 130, 220, 170, 110].map((h, i) => (
            <motion.div key={i} variants={growBar} className="flex items-end gap-10 origin-bottom">
              <div
                className="w-24 rounded-t-md bg-gradient-to-t from-[#131c42] to-transparent"
                style={{ height: `${h}px` }}
              />
              <div
                className="border-l border-dashed border-[#2a3560]/60"
                style={{ height: `${h + 40}px` }}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="relative px-6 sm:px-12 pt-14 pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Brand blurb */}
            <div className="max-w-xs">
              <img src="/logo-white.svg" alt="Get-Hired" className="h-10 w-auto" />
              <p className="mt-6 text-sm leading-relaxed text-slate-400">
                {footer?.about}
              </p>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {footer?.columns?.map((col) => (
                <div key={col.heading}>
                  <p className="text-[11px] font-extrabold tracking-[0.2em] text-slate-500 uppercase">
                    {col.heading}
                  </p>
                  <ul className="mt-5 space-y-3.5">
                    {col.links?.map((link) => (
                      <li key={link}>
                        <a
                          href="#top"
                          className="text-[15px] font-display font-semibold text-slate-200 hover:text-white transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-slate-500">{footer?.copyright}</p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center
                    text-slate-400 hover:text-white hover:border-white/40 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Footer;
