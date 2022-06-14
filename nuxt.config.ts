import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
  meta: {
    script: [{ src: "./fontawesome.js" }],
  },
  modules: ["@nuxtjs/supabase"],
  build: {
    transpile: process.env.NODE_ENV === "development" ? [] : ["element-plus"],
  },
  buildModules: ['@pinia/nuxt'],
  
});
