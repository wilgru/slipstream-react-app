/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      title: ["Plantagenet Cherokee"],
      sans: ["Helvetica Neue"],
      // body: [""],
    },
    extend: {},
  },
  plugins: [],
  safelist: [
    "hover:bg-orange-50",
    "hover:bg-orange-100",
    "hover:bg-red-50",
    "hover:bg-red-100",
    "hover:bg-yellow-50",
    "hover:bg-yellow-100",
    "hover:bg-lime-50",
    "hover:bg-lime-100",
    "hover:bg-green-50",
    "hover:bg-green-100",
    "hover:bg-blue-50",
    "hover:bg-blue-100",
    "hover:bg-cyan-50",
    "hover:bg-cyan-100",
    "hover:bg-purple-50",
    "hover:bg-purple-100",
    "hover:bg-pink-50",
    "hover:bg-pink-100",
    "hover:bg-amber-50",
    "hover:bg-amber-200",
    "hover:bg-gray-100",
    "hover:bg-gray-200",
  ],
};
