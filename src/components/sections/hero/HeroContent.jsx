import { motion } from "motion/react";
import SectionBadge from "../../ui/SectionBadge";
import Button from "../../ui/Button";
import { fadeUp, staggerContainer } from "../../animations/motionVariants";

// Hero copy block — badge, heading, description and CTA enter with a
// staggered fade-up on page load (matches the reference video).
const HeroContent = ({ heroSection, badgeIcon }) => {
  return (
    <motion.div
      variants={staggerContainer(0.12, 0.1)}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[850px] mx-auto inline-flex flex-col justify-start items-center gap-10 pt-16 sm:pt-20"
    >
      {/* Badge + Heading + Description */}
      <div className="w-full flex flex-col justify-start items-center gap-6">
        {/* Badge + Heading */}
        <div className="w-full flex flex-col justify-start items-center gap-4">
          <motion.div variants={fadeUp}>
            <SectionBadge title={heroSection?.badge} icon={badgeIcon} />
          </motion.div>

          <h1
            className="
              w-full
              text-center
              text-slate-900
              dark:text-white
              font-semibold
              font-display
              text-5xl
              sm:text-6xl
              lg:text-8xl
              leading-tight
              lg:leading-[96.8px]
              tracking-normal
            "
          >
            <motion.span variants={fadeUp} className="block">
              {heroSection?.title_line1}
            </motion.span>
            <motion.span variants={fadeUp} className="block">
              {heroSection?.title_line2}
            </motion.span>
          </h1>
        </div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="
            w-full
            max-w-[760px]
            text-center
            text-slate-600
            dark:text-slate-300
            text-xl
            font-medium
            font-display
            leading-8
          "
        >
          {heroSection?.description}
        </motion.p>
      </div>

      {/* CTA Button */}
      <motion.div variants={fadeUp} className="inline-flex justify-center items-center">
        <Button
          onClick={() =>
            document
              .querySelector("#contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {heroSection?.cta}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
