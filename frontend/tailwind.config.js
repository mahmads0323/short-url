/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightPurple: "#C3ACD0",
        lightGreyishOrange: "#F7EFE5",
        basePurple: "#9D78D6",
        purple: "#7743DB",
        textColor: "#5C6370",
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
