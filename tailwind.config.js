/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./SignUP.html",
    "./SignIN.html",
    "./DOOM.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        opensans: ["var(--font-opensans)", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        oswald: ["var(--font-oswald)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
        custom: ["var(--font-orbitron)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
