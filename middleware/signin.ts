
export default defineNuxtRouteMiddleware((to, _from) => {
    const user = useSupabaseUser();
  if(to.name==='SignIn' && user.value){
    return navigateTo("/profile");
  }
});
