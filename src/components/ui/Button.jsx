import { motion } from "motion/react";
import { ArrowUpRight } from "./Icons";

// Figma: h-16 px-7 py-4 rounded-xl bg-red-700 (=#C32F26 -> bg-primary)
// Text: text-white text-lg font-bold, icon size ~20px
// Motion: subtle lift on hover, press-down on tap (GPU transform only)
const Button = ({ children, className = "", onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className={`px-7 py-4
      bg-primary text-white text-lg font-bold
      rounded-xl
      shadow-[0px_10px_24px_rgba(195,47,38,0.30)]
      inline-flex justify-center items-center gap-2 overflow-hidden
      transition-colors duration-300 hover:bg-primary-dark cursor-pointer
      ${className}`}
    >
      {children}
      <ArrowUpRight className="w-4 h-4" />
    </motion.button>
  );
};

export default Button;
