import type { Config } from "tailwindcss";
//import defaultTheme from "@tailwindcss/defaultTheme";
export default <Partial<Config>>{
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
  content: ["content/**/*.md"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        recoleta: ["Recoleta", "sans-serif"],
      },
    },
  },
};
