// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  runtimeConfig: {
    public: {},
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxt/content"],
  extends: "@nuxt-themes/typography",
  colorMode: {
    preference: "dark",
    classSuffix: "",
  },
  content: {
    markdown: {
      remarkPlugins: ["remark-reading-time"],
    },
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
      },
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
});
