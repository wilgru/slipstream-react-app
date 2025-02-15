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
    // hover textPill
    "hover:text-orange-500",
    "hover:text-red-500",
    "hover:text-yellow-500",
    "hover:text-lime-500",
    "hover:text-green-500",
    "hover:text-blue-500",
    "hover:text-cyan-500",
    "hover:text-purple-500",
    "hover:text-pink-500",
    "hover:text-amber-700",
    "hover:text-gray-500",

    // hover backgroundPill
    "hover:bg-orange-100",
    "hover:bg-red-100",
    "hover:bg-yellow-100",
    "hover:bg-lime-100",
    "hover:bg-green-100",
    "hover:bg-blue-100",
    "hover:bg-cyan-100",
    "hover:bg-purple-100",
    "hover:bg-pink-100",
    "hover:bg-amber-200",
    "hover:bg-gray-200",

    // data highlighted backgroundPill
    "data-[highlighted]:bg-orange-100",
    "data-[highlighted]:bg-red-100",
    "data-[highlighted]:bg-yellow-100",
    "data-[highlighted]:bg-lime-100",
    "data-[highlighted]:bg-green-100",
    "data-[highlighted]:bg-blue-100",
    "data-[highlighted]:bg-cyan-100",
    "data-[highlighted]:bg-purple-100",
    "data-[highlighted]:bg-pink-100",
    "data-[highlighted]:bg-amber-200",
    "data-[highlighted]:bg-gray-200",

    // data highlighted textPill
    "data-[highlighted]:text-orange-500",
    "data-[highlighted]:text-red-500",
    "data-[highlighted]:text-yellow-500",
    "data-[highlighted]:text-lime-500",
    "data-[highlighted]:text-green-500",
    "data-[highlighted]:text-blue-500",
    "data-[highlighted]:text-cyan-500",
    "data-[highlighted]:text-purple-500",
    "data-[highlighted]:text-pink-500",
    "data-[highlighted]:text-amber-700",
    "data-[highlighted]:text-gray-500",
  ],
};
