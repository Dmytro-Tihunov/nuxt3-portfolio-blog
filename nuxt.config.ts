export default defineNuxtConfig({
  runtimeConfig: {
    public: {},
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/content",
    "@nuxtjs/web-vitals",
    "@nuxtjs/robots",
  ],

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

  webVitals: {
    provider: "log",
    debug: true, // debug enable metrics reporting on dev environments
    disabled: false,
  },

  nitro: {
    prerender: {
      routes: ["/sitemap.xml", "/rss.xml"],
    },
  },

  compatibilityDate: "2024-12-31",
});