/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface": "#051424",
        "surface-dim": "#051424",
        "surface-bright": "#2c3a4c",
        "surface-container-lowest": "#010f1f",
        "surface-container-low": "#0d1c2d",
        "surface-container": "#122131",
        "surface-container-high": "#1c2b3c",
        "surface-container-highest": "#273647",
        "on-surface": "#d4e4fa",
        "on-surface-variant": "#b9cacb",
        "inverse-surface": "#d4e4fa",
        "inverse-on-surface": "#233143",
        "outline": "#849495",
        "outline-variant": "#3b494b",
        "surface-tint": "#00dbe9",
        "primary": "#dbfcff",
        "on-primary": "#00363a",
        "primary-container": "#00f0ff",
        "on-primary-container": "#006970",
        "secondary": "#ffb4a7",
        "on-secondary": "#670500",
        "secondary-container": "#bd1100",
        "on-secondary-container": "#ffcdc4",
        "tertiary": "#f5f5ff",
        "on-tertiary": "#002a78",
        "tertiary-container": "#ced8ff",
        "on-tertiary-container": "#0053db",
        "error": "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
        "background": "#051424",
        "on-background": "#d4e4fa",
        "surface-variant": "#273647"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "9999px"
      },
      spacing: {
        "gutter": "1.5rem",
        "gutter-mobile": "0.75rem",
        "margin": "3rem",
        "margin-mobile": "1.25rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        "space-2xl": "4rem"
      },
      fontFamily: {
        "headline-xl": ["Space Grotesk", "sans-serif"],
        "headline-lg": ["Space Grotesk", "sans-serif"],
        "headline-md": ["Space Grotesk", "sans-serif"],
        "headline-sm": ["Space Grotesk", "sans-serif"],
        "display-hero": ["Space Grotesk", "sans-serif"],
        "metric-stat": ["Space Grotesk", "sans-serif"],
        "label-uppercase": ["Space Grotesk", "sans-serif"],
        "body-xl": ["Plus Jakarta Sans", "sans-serif"],
        "body-md": ["Plus Jakarta Sans", "sans-serif"],
        "body-sm": ["Plus Jakarta Sans", "sans-serif"],
        "label-md": ["Plus Jakarta Sans", "sans-serif"]
      }
    }
  },
  plugins: []
}
