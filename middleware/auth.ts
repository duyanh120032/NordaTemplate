import { useToast } from "vue-toastification";

const toast = useToast();
export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()
  if (!user.value) {
    return navigateTo('/signIn')
  }
})