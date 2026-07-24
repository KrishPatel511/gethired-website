import { motion } from "motion/react";
import { fadeUp, VIEWPORT_ONCE } from "../animations/motionVariants";

// One success-story row (image + text + quote) — fades up on scroll
const StoryCard = ({ story }) => {
  const assetBaseUrl = import.meta.env.VITE_IMAGES;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="group flex flex-col lg:flex-row gap-8 py-10 border-t border-slate-200 first:border-t-0"
    >
      {/* Image (path comes from en.json — replace file in public/images/stories) */}
      <div className="w-full lg:w-[340px] h-56 sm:h-60 shrink-0 rounded-2xl overflow-hidden">
        <img
          src={`${assetBaseUrl}${story?.image}`}
          alt={story?.company}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-primary text-xs font-extrabold tracking-[0.14em] uppercase">
          {story?.company} · {story?.role}
        </p>

        <h3 className="mt-3 text-2xl sm:text-[26px] font-bold text-navy">
          {story?.title}
        </h3>

        <p className="mt-3 text-[15px] leading-relaxed text-[#4d5b7c] max-w-2xl">
          {story?.description}
        </p>

        {/* Quote box */}
        <div className="mt-3 bg-lilac rounded-xl p-3 sm:p-3 max-w-1xl">
          <p className="text-sm sm:text-[15px] leading-relaxed text-navy/90">
            "{story?.quote}"
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-slate-400 text-white text-[11px] font-extrabold flex items-center justify-center">
              {story?.initials}
            </span>
            <div>
              <p className="text-sm font-bold text-navy leading-tight">
                {story?.person}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{story?.placement}</p>
            </div>
          </div>    
        </div>
      </div>
    </motion.div>
  );
};

export default StoryCard;
