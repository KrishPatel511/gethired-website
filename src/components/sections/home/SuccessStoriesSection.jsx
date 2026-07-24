import { useArrayTranslation } from "../../common/hooks/useArrayTranslation";
import SectionHeading from "../../ui/SectionHeading";
import OutlineButton from "../../ui/OutlineButton";
import StoryCard from "../../ui/StoryCard";
import Reveal from "../../animations/Reveal";
import StatCounter from "../../animations/home/StatCounter";
import { motion } from "motion/react";
import { fadeLeft, fadeRight, fadeUp, staggerContainer, VIEWPORT_ONCE } from "../../animations/motionVariants";

const SuccessStoriesSection = () => {
  const storiesSection = useArrayTranslation("success_stories_section");
  const successStats = useArrayTranslation("success_stats");
  const successStories = useArrayTranslation("success_stories");

  return (
    <section
      id="results"
      className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 scroll-mt-20"
    >
      {/* Heading */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <Reveal variants={fadeLeft}>
          <SectionHeading
            label={storiesSection?.label}
            title={storiesSection?.title}
            description={storiesSection?.description}
          />
        </Reveal>
        <Reveal variants={fadeRight}>
          <OutlineButton className="shrink-0">
            {storiesSection?.cta}
          </OutlineButton>
        </Reveal>
      </div>

      {/* Stats — counters animate 0 -> value on scroll */}
      <motion.div
        variants={staggerContainer(0.19)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="mt-12 py-10 border-y border-slate-100 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center"
      >
        {Array.isArray(successStats) &&
          successStats.map((stat) => (
            <motion.div variants={fadeUp} key={stat.label} className="flex flex-col items-center">
              <p className="text-6xl sm:text-7xl font-bold font-display text-navy dark:text-white tracking-tight">
                <StatCounter value={stat.value} />
              </p>
              <p className="mt-3 text-base font-display font-semibold text-[#4d5b7c] dark:text-slate-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
      </motion.div>

      {/* Story rows */}
      <div className="mt-6">
        {Array.isArray(successStories) &&
          successStories.map((story) => (
            <StoryCard key={story.company} story={story} />
          ))}
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
