/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      title: ["Plantagenet Cherokee"],
      // body: [""],
    },
    boxShadow: {
      light: "#404040 7px 7px ", // stone-700
    },
    extend: {},
  },
  plugins: [],
};
