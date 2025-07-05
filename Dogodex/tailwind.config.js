/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FF7F50",
        "primary-foreground": "#FFFFFF",
        secondary: "#2A5DFF",
        "secondary-foreground": "#FFFFFF",
        success: "#34C759",
        warning: "#FFCC00",
        error: "#FF3B30",
        "neutral-100": "#FFFFFF",
        "neutral-900": "#0A0A0A",
      },
    },
  },
  plugins: [],
}; 