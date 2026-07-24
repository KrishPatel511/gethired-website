import { useArrayTranslation } from "../../common/hooks/useArrayTranslation";
import SectionHeading from "../../ui/SectionHeading";
import OutlineButton from "../../ui/OutlineButton";
import BlogCard from "../../ui/BlogCard";
import Reveal from "../../animations/Reveal";
import { motion } from "motion/react";
import { fadeLeft, fadeRight, staggerContainer, VIEWPORT_ONCE } from "../../animations/motionVariants";

const InsightsSection = () => {
  const insightsSection = useArrayTranslation("insights_section");
  const insightsPosts = useArrayTranslation("insights_posts");

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
      {/* Heading row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <Reveal variants={fadeLeft}>
          <SectionHeading
            label={insightsSection?.label}
            title={insightsSection?.title}
          />
        </Reveal>
        <Reveal variants={fadeRight}>
          <OutlineButton className="shrink-0">
            {insightsSection?.cta}
          </OutlineButton>
        </Reveal>
      </div>

      {/* Post cards — stagger in one by one */}
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {Array.isArray(insightsPosts) &&
          insightsPosts.map((post) => <BlogCard key={post.title} post={post} />)}
      </motion.div>
    </section>
  );
};

export default InsightsSection;
