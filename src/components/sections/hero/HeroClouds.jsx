const HeroClouds = () => {
  const assetBaseUrl = import.meta.env.VITE_IMAGES;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Bottom-left cloud — bigger, extends higher up */}
      <img
        src={`${assetBaseUrl}/images/hero/Cloud01.png`}
        alt=""
        className="absolute left-0 bottom-0 w-[70%] max-w-[850px] h-auto object-contain opacity-90"
        draggable={false}
      />

      {/* Bottom-right cloud — bigger, extends higher up */}
      <img
        src={`${assetBaseUrl}/images/hero/cloud02.png`}
        alt=""
        className="absolute right-0 bottom-0 w-[70%] max-w-[850px] h-auto object-contain opacity-90"
        draggable={false}
      />
    </div>
  );
};

export default HeroClouds;