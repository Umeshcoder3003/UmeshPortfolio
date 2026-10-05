import type { Config } from "tailwindcss";

// Colours are CSS variables (see globals.css) so light/dark themes swap cleanly.
const c = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: c("bg"),
        surface: c("surface"),
        surface2: c("surface-2"),
        line: c("line"),
        ink: c("text"),
        muted: c("muted"),
        accent: c("accent"),
        "accent-ink": c("accent-ink"),
        bronze: c("bronze"),
        silver: c("silver"),
        gold: c("gold"),
        warn: c("warn"),
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
