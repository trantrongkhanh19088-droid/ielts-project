/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        inspera: {
          bg: "#f3f4f6",
          header: "#1f2937",
          border: "#d1d5db",
          primary: "#0284c7",
          accent: "#2563eb",
          contrastYellow: "#ffe600",
        },
      },
      fontFamily: {
        cdielts: ["Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
