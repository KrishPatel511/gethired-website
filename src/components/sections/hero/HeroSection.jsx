import { useArrayTranslation } from "../../common/hooks/useArrayTranslation";
import SectionBadge from "../../ui/SectionBadge";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import HeroClouds from "./HeroClouds";

const HeroSection = () => {
  const heroSection = useArrayTranslation("hero_section");
  // const phoneJobs = useArrayTranslation("hero_phone_jobs");
  // const avatars = useArrayTranslation("hero_avatars");

  // const badgeIcon = (
  //   <svg viewBox="0 0 24 24" className="w-4 h-4 fill-primary">
  //     <path d="M12.1 8.6 9.2 11.5a1.4 1.4 0 0 1-2-2l3.6-3.6c.5-.5 1.3-.8 2-.8l3.4.1c.6 0 1.2.3 1.7.7l4.1 4-3 3.1-2.7-2.6-1.4 1.4a2.9 2.9 0 0 1-2.8-3.2zM2 9.9l4.4-4.4 1 1L3 10.9l-1-1zm14.9 8.2-5.5-5.4 1.1-1 5.4 5.4-1 1zm3.1-2-5.4-5.4 1-1.1 5.5 5.4-1.1 1.1z" />
  //   </svg>
  // );

  // const avatarColors = [
  //   "from-rose-400 to-orange-300",
  //   "from-indigo-400 to-sky-300",
  //   "from-emerald-400 to-teal-300",
  // ];

  return (
    <section
      id="top"
      className="
        relative
        mx-4 lg:mx-5
        mt-4
        max-w-[1400px]
        lg:mx-auto
        pt-6 sm:pt-8
        pb-10
        rounded-[20px]
        overflow-hidden
        bg-gradient-to-b
        from-white
        to-indigo-200
        dark:from-dark-bg
        dark:to-[#161b3d]
        flex flex-col items-center text-center
        px-5
      "
    >
      {/* Cloud decoration — bottom corners, behind content */}
      <HeroClouds />

      {/* HERO CONTENT */}
      <div className="relative z-10">
        <HeroContent heroSection={heroSection}  />
        <HeroVisual
          heroSection={heroSection}
          // phoneJobs={phoneJobs}

          // avatarColors={avatarColors}
        />
      </div>
    </section>
  );
};

export default HeroSection;