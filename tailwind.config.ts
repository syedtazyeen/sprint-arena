import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        border: "hsl(var(--border))",
        popover: "hsl(var(--popover))",
        card: "hsl(var(--card))",
        accent: "hsl(var(--accent))",
      },
    },
  },
  plugins: [],
} satisfies Config;
