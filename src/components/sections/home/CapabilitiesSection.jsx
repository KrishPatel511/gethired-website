import { useState } from "react";
import { useArrayTranslation } from "../../common/hooks/useArrayTranslation";
import SectionHeading from "../../ui/SectionHeading";
import TextLink from "../../ui/TextLink";
import CapabilityVideo from "../../animations/home/CapabilityVideo";
import Reveal from "../../animations/Reveal";
import { fadeLeft, fadeRight } from "../../animations/motionVariants";

const CapabilitiesSection = () => {
  const assetBaseUrl = import.meta.env.VITE_IMAGES;
  const capabilitiesSection = useArrayTranslation("capabilities_section");
  const capabilitiesItems = useArrayTranslation("capabilities_items");

  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="services"
      className=" w-full max-w-[1400px] mx-auto px-5 scroll-mt-20"
    >
      {/* Heading Row */}
    <div className="flex flex-col lg:flex-row items-end gap-8 self-stretch">

  {/* Left Side */}
  <Reveal variants={fadeLeft} className="flex-1">
    <SectionHeading
      label={capabilitiesSection?.label}
      title={capabilitiesSection?.title}
    />
  </Reveal>

  {/* Right Side */}
  <Reveal variants={fadeRight} className="flex-1">
    <p
      className="
        text-slate-600
        text-xl
        lg:text-xl
        font-medium
        font-display
        leading-8
      "
    >
      {capabilitiesSection?.description}
    </p>
  </Reveal>

    </div>

      {/* Accordion */}
      <Reveal className="mt-[72px] border-b border-slate-200">
        {Array.isArray(capabilitiesItems) &&
          capabilitiesItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.title} className="border-t border-black/10">
                {/* Header row */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between gap-4 py-10 px-4 text-left cursor-pointer group"
                >
                  <span
                    className={`flex items-baseline gap-2 text-2xl  font-medium leading-10 font-display transition-colors ${
                      isOpen
                        ? "text-primary"
                        : "text-navy group-hover:text-primary"
                    }`}
                  >
                    <span className="sm:text-2xl text-sm tracking-[0.25em] leading-5 font-bold uppercase text-primary">{index + 1}.</span>
                    {item.title}
                  </span>

                  {/* Plus / minus icon */}
                  <span className="relative w-11 h-11 shrink-0">
                    <span className="absolute top-1/2 left-0 w-5 h-[2.5px] -translate-y-1/2 bg-primary rounded" />
                    <span
                      className={`absolute top-1/2 left-0 w-5 h-[2.5px] -translate-y-1/2 bg-primary rounded
                      transition-all duration-300 ${isOpen ? "rotate-0 opacity-0" : "rotate-90 opacity-100"}`}
                    />
                  </span>
                </button>

                {/* Body (CSS grid-rows transition, see index.css) */}
                <div className={`accordion-body ${isOpen ? "open" : ""}`}>
                  <div>
                    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] items-stretch gap-6 pb-8 pr-1">
                     
 {/* Left Content For Video*/}
                     
                    <div
  className="
    w-full
    h-[260px]
    sm:h-[380px]
    lg:h-[485px]
    rounded-2xl
    overflow-hidden
  "
>
  {item.video ? (
    <CapabilityVideo
      src={`${assetBaseUrl}${item.video}`}
      poster={`${assetBaseUrl}${item.image}`}
      active={isOpen}
      alt={item.title}
      className="w-full h-full object-cover"
    />
  ) : (
    <img
      src={`${assetBaseUrl}${item.image}`}
      alt={item.title}
      className="w-full h-full object-cover"
    />
  )}
                    </div>

                      {/* Right Content */}
                     <div
                         className="
                         flex
                         flex-col
                         justify-between
                         gap-8
                         h-auto
                         lg:h-[485px]
                         p-2
                         sm:p-5
                          "
                      >
  {/* Description */}
  <div>
    <p
      className="
        text-slate-600
        text-xl
        sm:text-2xl
        font-medium
        font-display
        leading-8
        sm:leading-9
        tracking-[0.02em]
      "
    >
      {item.description}
    </p>

    {/* Bullets */}
    <ul className="mt-8 space-y-2">
      {item.bullets?.map((bullet) => (
        <li
          key={bullet}
          className="
            flex
            items-start
            gap-3
            text-slate-600
            text-base
            sm:text-xl
            font-medium
            font-display
            leading-7
            sm:leading-8
          "
        >
          <span className="mt-[12px] h-1.5 w-1.5 rounded-full bg-slate-600 shrink-0" />
          {bullet}
        </li>
      ))}
    </ul>
  </div>

  {/* CTA */}
  <div className="justify-between">
    <TextLink>{item.cta}</TextLink>
  </div>
                    </div>
                    </div>
                  </div>
                </div>

                
              </div>
            );
          })}
      </Reveal>
    </section>
  );
};

export default CapabilitiesSection;
