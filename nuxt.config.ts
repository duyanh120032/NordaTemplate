import { defineNuxtConfig } from "nuxt";
import svgLoader from "vite-svg-loader";

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
    // link:[
    //   { rel: "stylesheet", href: "assets/css/vendor/bootstrap.min.css" },
    //   { rel: "stylesheet", href: "assets/scss/style.scss" },   
    // ]
  },
  modules: ["@nuxtjs/supabase"],
  buildModules: ["@pinia/nuxt"],
  build: {
    transpile: process.env.NODE_ENV === "development" ? [] : ["element-plus"],
  },
  vite: {
    plugins: [svgLoader()],
  },
});
