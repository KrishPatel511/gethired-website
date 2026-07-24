import { useArrayTranslation } from "../../common/hooks/useArrayTranslation";
import Button from "../../ui/Button";
import Reveal from "../../animations/Reveal";
import { motion } from "motion/react";
import { fadeUp, scaleIn, staggerContainer, VIEWPORT_ONCE } from "../../animations/motionVariants";

const GetStartedSection = () => {
  const getStartedSection = useArrayTranslation("get_started_section");

  return (
    <section className="px-3 sm:px-6 py-6">
      <Reveal
        variants={scaleIn}
        className="relative max-w-7xl mx-auto rounded-[28px] overflow-hidden
        bg-gradient-to-b from-sky-deep via-[#dbe6fc] to-white"
      >
        <motion.div
          variants={staggerContainer(0.12, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="relative px-6 py-24 sm:py-32 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[34px] sm:text-5xl lg:text-[56px] leading-[1.15] font-bold text-navy tracking-tight"
          >
            {getStartedSection?.title_line1}
            <br className="hidden sm:block" /> {getStartedSection?.title_line2}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl mx-auto text-[15px] sm:text-lg font-display font-medium text-[#4d5b7c]"
          >
            {getStartedSection?.description}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Button
              className="mt-10"
              onClick={() => document.querySelector("#contact")?.scrollIntoView()}
            >
              {getStartedSection?.cta}
            </Button>
          </motion.div>
        </motion.div>
      </Reveal>
    </section>
  );
};

export default GetStartedSection;
