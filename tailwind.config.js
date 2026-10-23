/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sora: ["var(--font-sora)", "Sora", "sans-serif"],
        russo: ["var(--font-russo)", "Russo One", "sans-serif"],
      },
      colors: {
        primary: "var(--primary)",
        "primary-2": "var(--primary-2)",
        "primary-3": "var(--primary-3)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        "bg-3": "var(--bg-3)",
        "bg-4": "var(--bg-4)",
        "bg-card": "var(--bg-card)",
        border: "var(--border)",
        "border-2": "var(--border-2)",
        "text-body": "var(--text-body)",
        "text-muted": "var(--text-muted)",
        "text-heading": "var(--text-heading)",
      },
    },
  },
  plugins: [],
}
