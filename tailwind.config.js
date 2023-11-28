/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      title: ["Plantagenet Cherokee"],
      // body: [""],
    },
    boxShadow: {
      light: "#404040 4px 4px ", // stone-700, 1 spacing
    },
    extend: {},
  },
  plugins: [],
};
