const SectionHeading = ({ label, title, description, center = false }) => {
  return (
    <div
      className={
        center
          ? "flex flex-col items-center text-center gap-5"
          : "flex flex-col items-start gap-5"
      }
    >
      {label && (
        <p
          className="
            text-primary
            text-sm
            font-bold
            font-display
            uppercase
            tracking-widest
            leading-5
          "
        >
          {label}
        </p>
      )}

      {title && (
        <h2
          className="
            text-slate-900
            text-4xl
            lg:text-5xl
            font-medium
            font-display
            leading-tight
            lg:leading-[57.6px]
          "
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={`
            text-slate-600
            text-base
            sm:text-[17px]
            font-medium
            font-display
            leading-relaxed
            max-w-2xl
            ${center ? "mx-auto" : ""}
          `}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
