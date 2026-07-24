export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans"],
      },
      colors: {
        primary: "#C32F26",
        "primary-hover": "#B32920",
        "primary-active": "#9C231B",
        "primary-disabled": "#D9D9D9",
      },
    },
  },
  plugins: [],
};
