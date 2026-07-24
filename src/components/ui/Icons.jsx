// Small inline SVG icons used across the site
// (keeps the project free of icon library dependencies)

export const ArrowUpRight = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const MapPin = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-navy shrink-0`}>
    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

export const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    className={`${className} stroke-slate-400`}
    fill="none"
    strokeWidth="2.4"
    strokeLinecap="round"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const CheckIcon = ({ className = "w-3 h-3" }) => (
  <svg
    viewBox="0 0 24 24"
    className={`${className} stroke-emerald-500`}
    fill="none"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);
