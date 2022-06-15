import { useToast } from "vue-toastification";

const toast = useToast();
export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser();
  if (!user.value) {
    toast.error("You must be logged in to access this page");
    return navigateTo("/signIn");
  }
  if (user.value && to.name === "signIn") {
    toast.success("You are now logged in");
    return navigateTo("/shop");
  }
});
