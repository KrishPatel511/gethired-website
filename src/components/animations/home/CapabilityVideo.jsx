import { useEffect, useRef, useState } from "react";

// ============================================================
// CapabilityVideo
// Video animation for a capability accordion panel.
//   - autoplay + loop + muted + playsInline (mobile-safe autoplay)
//   - `active` prop = accordion open/closed:
//       open  -> restart from 0 and play
//       close -> pause (saves CPU/battery)
//   - `poster` (image) shows while the video loads
//   - onError -> falls back to the poster image, never a broken box
//
// Why a separate <img> instead of the native `poster` attribute:
// the video source and its poster image don't share the same aspect
// ratio. Most browsers apply `object-fit: cover` to the poster frame
// correctly, but some (notably Safari) don't — the poster ignores
// object-fit and letterboxes at its own intrinsic ratio, which shows
// up as a visible border/edge until the real video frame paints over
// it. Rendering the poster as a plain <img> with the same object-cover
// class sidesteps that inconsistency entirely (plain <img> object-fit
// support is universal), and we just fade it out once the video is
// actually ready to play.
// ============================================================
const CapabilityVideo = ({ src, poster, active = true, alt = "" }) => {
  const videoRef = useRef(null);
  const hasError = useRef(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError.current) return;

    if (active) {
      video.currentTime = 0;
      // play() returns a promise; catch avoids console noise if blocked
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  const handleError = () => {
    hasError.current = true;
    setVideoReady(false); // keep showing the poster <img>, never a broken box
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setVideoReady(true)}
        onError={handleError}
        aria-label={alt}
        className="w-full h-full object-cover"
      />
      {/* Poster overlay — plain <img> so object-cover is guaranteed to
          apply consistently, unlike the native video poster attribute.
          Fades out as soon as the video has a frame ready to show. */}
      <img
        src={poster}
        alt={alt}
        aria-hidden={videoReady}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          videoReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default CapabilityVideo;