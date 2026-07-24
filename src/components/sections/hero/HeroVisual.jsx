import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { floatLoop } from "../../animations/motionVariants";

// Phone mockup + floating chips/job-card/avatars — enters as a staggered
// "pop" cascade matching the reference video, cycling through PNG card images.
// 1. Phone slides up.
// 2. Card 1 slides out of the phone to the left.
// 3. Simultaneously, Card 2 slides up inside the phone.
// 4. Staggered side chips pop into view.
// 5. Every 3.8s, the cycle repeats to slide out the next image.
const HeroVisual = ({ heroSection }) => {
  const assetBaseUrl = import.meta.env.VITE_IMAGES;

  // Array of image paths to loop through.
  // Add more images here as you place them in public/images/hero/ (e.g. Software_Eng_2.png, Software_Eng_3.png)
  const jobImages = [
    `${assetBaseUrl}/images/hero/Software_Eng.png`,
    // `${assetBaseUrl}/images/hero/Software_Eng_2.png`,
    // `${assetBaseUrl}/images/hero/Software_Eng_3.png`,
  ];

  const [animStep, setAnimStep] = useState("hidden");
  const [isMobile, setIsMobile] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [isSlidOut, setIsSlidOut] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    // Detect viewport size for precise card offsets
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Timeline trigger:
    // 1. Mount -> visible (phone enters)
    setAnimStep("visible");

    // 2. After 1s (phone settles) -> slideOut (card slides out, card 2 slides up, chips pop)
    const startTimer = setTimeout(() => {
      setAnimStep("slideOut");
      setIsSlidOut(true);

      // Start the infinite looping card process
      intervalRef.current = setInterval(() => {
        setCycle((prev) => prev + 1);
      }, 3800);
    }, 1000);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(startTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const isSettled = animStep === "slideOut";

  // Card 1 (Job Card) slide-out parameters:
  // Starts centered exactly over the baked-in phone card, then slides out to the left and grows to full size.
  const card1Variants = {
    hidden: {
      opacity: 0,
      x: isMobile ? "18%" : "23%",
      y: isMobile ? "1.5%" : "2%",
      scale: isMobile ? 0.78 : 0.72,
    },
    visible: {
      opacity: 1,
      x: isMobile ? "18%" : "23%",
      y: isMobile ? "1.5%" : "2%",
      scale: isMobile ? 0.78 : 0.72,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    slideOut: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const activeImage = jobImages[cycle % jobImages.length];
  const nextImage = jobImages[(cycle + 1) % jobImages.length];

  return (
    <div className="relative w-full max-w-3xl mt-14 sm:mt-16 mx-auto aspect-[16/10]">
      {/* Phone — center pe, base layer */}
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={animStep !== "hidden" ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[62%] sm:w-[46%] z-10"
      >
        <motion.div
          animate={isSettled ? floatLoop(0, 6, 4.2).animate : {}}
          transition={isSettled ? floatLoop(0, 6, 4.2).transition : {}}
          className="relative [mask-image:linear-gradient(to_bottom,black_62%,transparent_96%)]"
        >
          {/* Phone Mockup Frame */}
          <img
            src={`${assetBaseUrl}/images/hero/Mobile.png`}
            alt="Get Hired mobile app"
            className="w-full h-auto drop-shadow-[10px_4px_10px_rgba(10,0,0,0.10)]"
            draggable={false}
          />

          {/* Screen Overlay (Covers the baked Adobe & Discord cards, rendering the slide-up replacement instead) */}
          {/* <div className="absolute top-[41.8%] left-[5%] right-[5%] bottom-[4%] overflow-hidden bg-[#F8F9FC] rounded-b-[22px] z-15"> */}
            <div className="relative w-[90%] mx-auto mt-2 h-[80%] overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`inside-${cycle}`}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 top-0"
                >
                  <img
                    src={nextImage}
                    alt="Job Card inside"
                    className="w-full h-auto drop-shadow-sm"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          {/* </div> */}
        </motion.div>
      </motion.div>

      {/* Card 1 — Slides out of the phone to the left (Looping Anim) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`float-${cycle}`}
          variants={card1Variants}
          initial={cycle === 0 ? "hidden" : { opacity: 0.5, x: isMobile ? "18%" : "23%", y: isMobile ? "1.5%" : "2%", scale: isMobile ? 0.78 : 0.72 }}
          animate={isSlidOut ? "slideOut" : "visible"}
          exit={{ opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.45 } }}
          className="absolute left-[8%] sm:left-[14%] top-[42%] z-30 w-[62%] sm:w-[50%] max-w-[380px] text-left"
        >
          <motion.div
            animate={isSettled ? floatLoop(0.75, 7, 3.8).animate : {}}
            transition={isSettled ? floatLoop(0.75, 7, 3.8).transition : {}}
          >
            <img
              src={activeImage}
              alt="Job Card"
              className="w-full h-auto drop-shadow-xl"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Companies Chip — phone ke upar-left, floating */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 15 }}
        animate={animStep === "slideOut" ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 15 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.24, 1.3, 0.35, 1] }}
        className="absolute left-[2%] sm:left-[6%] top-[20%] z-20 hidden sm:block w-[20%] max-w-[160px]"
      >
        <motion.div
          animate={isSettled ? floatLoop(0.2, 9, 3.4).animate : {}}
          transition={isSettled ? floatLoop(0.2, 9, 3.4).transition : {}}
        >
          <img
            src={`${assetBaseUrl}/images/hero/Companies01.png`}
            alt="Companies"
            className="w-full h-auto drop-shadow-lg"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      {/* Success Rate Chip — phone ke upar-right, floating */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 15 }}
        animate={animStep === "slideOut" ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 15 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.24, 1.3, 0.35, 1] }}
        className="absolute right-[2%] sm:right-[6%] top-[20%] z-20 hidden sm:block w-[20%] max-w-[160px]"
      >
        <motion.div
          animate={isSettled ? floatLoop(0.4, 9, 3.6).animate : {}}
          transition={isSettled ? floatLoop(0.4, 9, 3.6).transition : {}}
        >
          <img
            src={`${assetBaseUrl}/images/hero/HeroCounterIMG.png`}
            alt="Success Rate"
            className="w-full h-auto drop-shadow-lg"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      {/* Avatar Strip — phone ke niche-right corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 15 }}
        animate={animStep === "slideOut" ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 15 }}
        transition={{ delay: 0.45, duration: 0.6, ease: [0.24, 1.3, 0.35, 1] }}
        className="absolute right-[8%] sm:right-[12%] top-[62%] z-30 hidden sm:block w-[16%] max-w-[110px]"
      >
        <motion.div
          animate={isSettled ? floatLoop(0.55, 8, 3.3).animate : {}}
          transition={isSettled ? floatLoop(0.55, 8, 3.3).transition : {}}
        >
          <img
            src={`${assetBaseUrl}/images/hero/Profiles_img.png`}
            alt="Profiles"
            className="w-full h-auto drop-shadow-lg"
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroVisual;

