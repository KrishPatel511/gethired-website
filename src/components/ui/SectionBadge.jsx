const SectionBadge = ({ title, icon }) => {
  return (
    <span
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        px-4
        py-2
        bg-slate-50
        rounded-[10px]
        shadow-[0px_2px_16px_0px_rgba(113,123,174,0.10)]
        outline
        outline-1
        outline-offset-[-1px]
        outline-slate-200
        whitespace-nowrap
      "
    >
      {/* <span className="w-5 h-5 flex items-center justify-center shrink-0">
        {icon}
      </span> */}

      <img
        src="/icons/HandIcon.svg"
        alt="Hand Icon"
        className="w-5 h-5 shrink-0"
      />

      <span
        className="
          text-center
          text-slate-900
          text-sm
          font-bold
          font-display
          uppercase
          leading-5
          tracking-[0.16em]
          whitespace-nowrap
        "
      >
        {title}
      </span>
    </span>
  );
};

export default SectionBadge;