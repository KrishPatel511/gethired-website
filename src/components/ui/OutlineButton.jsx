import { motion } from "motion/react";
import { ArrowUpRight } from "./Icons";

// Figma: compact white pill, thin red (primary) outline, red text,
// single line ("View all stories" never wraps), small up-right arrow.
// Motion: subtle lift on hover, press-down on tap (GPU transform only)
const OutlineButton = ({ children, className = "", onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className={`px-4 py-2.5
      bg-white text-primary text-[13px] font-bold font-display
      whitespace-nowrap
      rounded-lg
      border border-primary/45
      inline-flex justify-center items-center gap-2
      transition-colors duration-300 hover:border-primary hover:bg-primary/5 cursor-pointer
      ${className}`}
    >
      {children}
      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
    </motion.button>
  );
};

export default OutlineButton;
