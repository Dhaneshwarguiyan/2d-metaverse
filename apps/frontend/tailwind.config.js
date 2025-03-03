/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        all: "1px 1px 4px 4px rgba(0,0,0,0.1), -1px -1px 4px 4px rgba(0,0,0,0.1)",
        deep: "1px 1px 4px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
