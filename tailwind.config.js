/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          background: "#21222c",
          primary: "#4CAF50",
          secondary: "#FF5722",
          highlight: "#00BCD4",
          text: "#FFFFFF",
          sidebar: "#282a36",
        },
        light: {
          background: "#F5F5F5",
          primary: "#4CAF50",
          secondary: "#408042",
          highlight: "#3F51B5",
          text: "#333333",
          sidebar: "#282a36",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
