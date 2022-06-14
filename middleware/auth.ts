export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser();
  if (user.value) {
    alert("You are already logged in");
    return navigateTo("/");
  }
});
