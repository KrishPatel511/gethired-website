import HeroSection from "../components/sections/hero/HeroSection";
import BrandsSection from "../components/sections/home/BrandsSection";
import CapabilitiesSection from "../components/sections/home/CapabilitiesSection";
import WhyGetHiredSection from "../components/sections/home/WhyGetHiredSection";
import SuccessStoriesSection from "../components/sections/home/SuccessStoriesSection";
import ConsultingEcosystemSection from "../components/sections/home/ConsultingEcosystemSection";
import InsightsSection from "../components/sections/home/InsightsSection";
import GetStartedSection from "../components/sections/home/GetStartedSection";
import SEO from "../components/common/SEO";

const Home = () => {
  return (
    <div className="w-full overflow-x-clip">
      <SEO
        seo={{
          metaTitle: "Get-Hired | Master the US Career Arena",
          metaDescription:
            "Don't just apply, Get-Hired through professional branding engineered for candidates who refuse to blend into the noise.",
          canonicalURL: `${import.meta.env.VITE_SITE_URL || window.location.origin}/`,
        }}
      />
      <HeroSection />
      <BrandsSection />
      <CapabilitiesSection />
      <WhyGetHiredSection />
      <SuccessStoriesSection />
      <ConsultingEcosystemSection />
      <InsightsSection />
      <GetStartedSection />
    </div>
  );
};

export default Home;
