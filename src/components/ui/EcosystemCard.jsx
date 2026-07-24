import { motion } from "motion/react";
import { ArrowUpRight } from "./Icons";
import { fadeUp } from "../animations/motionVariants";

// Inherits the stagger trigger from the parent grid (variants only),
// lifts slightly on hover.
const EcosystemCard = ({ card }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 320, damping: 26 }}
    className="bg-white rounded-2xl p-10 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)] hover:shadow-[0px_20px_40px_0px_rgba(30,43,105,0.12)] transition-shadow duration-300 flex flex-col gap-6"
  >
    <p className="text-red-700 text-sm font-normal font-display leading-5">{card?.number}</p>
    <h3 className="text-slate-900 text-3xl font-medium font-display leading-9">{card?.title}</h3>
    <p className="text-slate-600 text-base font-normal font-display leading-6 flex-1">{card?.description}</p>
    <div className="pb-2 border-b border-red-700 inline-flex items-center gap-2 w-fit">
      <span className="text-red-700 text-base font-bold font-display leading-5">{card?.cta}</span>
      <ArrowUpRight className="w-4 h-4 text-red-700" />
    </div>
  </motion.div>
);

export default EcosystemCard;
