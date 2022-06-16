import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  timeout: 3000,
  pauseOnHover: false,
  closeOnClick: true,
  // You can set your default options here
};
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options);
});
