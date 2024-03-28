/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      title: ["Plantagenet Cherokee"],
      // sans: ["Arial"],
      // body: [""],
    },
    boxShadow: {
      light: "black 4px 4px ", // stone-700, 1 spacing
    },
    extend: {},
  },
  plugins: [],
  safelist: [
    "border-red-500",
    "bg-red-500",
    "bg-red-50",
    "border-orange-500",
    "bg-orange-500",
    "bg-orange-50",
    "border-yellow-500",
    "bg-yellow-500",
    "bg-yellow-50",
    "border-lime-500",
    "bg-lime-500",
    "bg-lime-50",
    "border-green-500",
    "bg-green-500",
    "bg-green-50",
    "border-blue-500",
    "bg-blue-500",
    "bg-blue-50",
    "border-cyan-500",
    "bg-cyan-500",
    "bg-cyan-50",
    "border-purple-500",
    "bg-purple-500",
    "bg-purple-50",
    "border-pink-500",
    "bg-pink-500",
    "bg-pink-50",

    "border-gray-500",
    "bg-gray-500",
    "bg-gray-100",

    "border-amber-700",
    "bg-amber-700",
    "bg-amber-50",

    "border-stone-700",
    "bg-stone-700",
    "bg-stone-100",

    "text-sm",
    "text-md",
    "fill-stone-100",
    "fill-stone-500",
    "fill-orange-500",
    "fill-red-500",
    "hover:fill-stone-500",
    "hover:fill-stone-800",
    "hover:fill-orange-500",
    "hover:fill-red-500",
  ],
};
