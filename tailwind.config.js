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
      fontFamily: {
        sans: ["var(--font-sans)", "var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["var(--font-serif)", "Newsreader", "Georgia", "Cambria", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Menlo", "monospace"],
        cdielts: ["Arial", "Helvetica", "sans-serif"],
      },
      colors: {
        inspera: {
          bg: "#f3f4f6",
          header: "#1f2937",
          border: "#d1d5db",
          primary: "#0284c7",
          accent: "#2563eb",
          contrastYellow: "#ffe600",
        },
        paper: {
          DEFAULT: "#FAF8F5",
          subtle: "#F4F0E8",
          muted: "#EBE6DC",
          border: "#E4DEC8",
        },
        carbon: {
          DEFAULT: "#0C0C0E",
          subtle: "#141419",
          muted: "#1B1B22",
          border: "rgba(255, 255, 255, 0.08)",
        },
        vermilion: {
          DEFAULT: "#D93829",
          hover: "#C22E1F",
          subtle: "rgba(217, 56, 41, 0.08)",
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
