/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      title: ["Plantagenet Cherokee"],
      sans: ["Helvetica Neue"],
      // body: [""],
    },
    boxShadow: {
      light: "black 4px 4px ", // stone-700, 1 spacing
    },
    extend: {},
  },
  plugins: [],
  safelist: [
    "border-red-400",
    "bg-red-400",
    "bg-red-50",
    "border-orange-400",
    "bg-orange-400",
    "bg-orange-50",
    "border-yellow-400",
    "bg-yellow-400",
    "bg-yellow-50",
    "border-lime-400",
    "bg-lime-400",
    "bg-lime-50",
    "border-green-400",
    "bg-green-400",
    "bg-green-50",
    "border-blue-400",
    "bg-blue-400",
    "bg-blue-50",
    "border-cyan-400",
    "bg-cyan-400",
    "bg-cyan-50",
    "border-purple-400",
    "bg-purple-400",
    "bg-purple-50",
    "border-pink-400",
    "bg-pink-400",
    "bg-pink-50",

    "border-gray-400",
    "bg-gray-400",
    "bg-gray-100",

    "border-amber-600",
    "bg-amber-600",
    "bg-amber-50",

    "border-stone-600",
    "bg-stone-600",
    "bg-stone-50",

    //TODO: eventually get rid of above?
    "text-sm",
    "text-md",

    "border-black",
    "bg-black",
    "hover:bg-black",
    "hover:border-black",

    "bg-white",
    "text-white",
    "hover:text-white",

    "bg-stone-500",

    "hover:text-red-500",
    "hover:text-orange-500",
  ],
};
