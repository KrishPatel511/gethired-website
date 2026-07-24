import { useArrayTranslation } from "../../common/hooks/useArrayTranslation";
import AnimatedLogoMarquee from "../../animations/home/AnimatedLogoMarquee";
import Reveal from "../../animations/Reveal";

const BrandsSection = () => {
  const assetBaseUrl = import.meta.env.VITE_IMAGES;
  const brandsSection = useArrayTranslation("brands_section");
  const brandLogos = useArrayTranslation("brand_logos");

  const logos = Array.isArray(brandLogos)
    ? brandLogos.map((logo) => `${assetBaseUrl}${logo.image}`)
    : [];

  return (
    <section className="w-full py-10 px-6" id="brands-section">
      <Reveal>
        <h2 className="text-center text-neutral-500 text-sm font-bold font-display uppercase leading-5 tracking-widest mb-6">
          {brandsSection?.heading}
        </h2>
      </Reveal>
      <Reveal delay={0.1} className="max-w-[1200px] mx-auto">
        <AnimatedLogoMarquee logos={logos} />
      </Reveal>
    </section>
  );
};

export default BrandsSection;
