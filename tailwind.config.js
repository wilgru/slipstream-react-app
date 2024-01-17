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
  safelist: [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-300",
    "bg-lime-300",
    "bg-green-500",
    "bg-blue-500",
    "bg-cyan-300",
    "bg-purple-500",
    "bg-pink-300",
    "bg-amber-700",
    "bg-gray-500",
    "bg-stone-700",
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
