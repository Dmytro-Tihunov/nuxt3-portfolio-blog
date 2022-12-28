import { defineTheme } from "pinceau";

export default defineTheme({
  typography: {
    color: {
      blue: "#171C34",
      white: "#ffffff",
      whitec: "#ffffff",
      borderb: "#475584",
      borderw: "#c7c7c7",
    },
  },
  prose: {
    code: {
      block: {
        borderColor: {
          light: "{typography.color.borderw}",
          dark: "{typography.color.borderb}",
        },
        backgroundColor: {
          light: "{typography.color.white}",
          dark: "{typography.color.blue}",
        },
      },
      inline: {
        backgroundColor: {
          light: "{typography.color.whitec}",
          dark: "{typography.color.blue}",
        },
      },
    },
  },
});
