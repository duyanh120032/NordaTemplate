<script setup lang="ts">
import { tryOnBeforeMount } from "@vueuse/shared";
import { useToast } from "vue-toastification";

// tryOnBeforeMount(() => {
//     const router = useRouter();
//     const user = useSupabaseUser();
//     if (user.value) {
//         router.push("/profile");
//     }
// });
definePageMeta({
    middleware: ['signin']
})


const toast = useToast();
const isActive = ref('login');
const client = useSupabaseClient()
const router = useRouter()
const isPending = ref(false)
const newUser = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    error: ''
});
const loginUser = reactive({
    email: '',
    password: '',
    error: ''
});


const handleRegister = async () => {
    isPending.value = true;
    if (newUser.password !== newUser.confirmPassword) {
        newUser.error = 'Passwords do not match';
        return;
        isPending.value = false;
    }
    newUser.error = '';
    const data = await client.auth.signUp({ email: newUser.email, password: newUser.password });

    if (data.error) {
        newUser.error = data.error.message;
        isPending.value = false;
        return;
    }
    toast.success('Please check your email to verify your account');
    isActive.value = 'login';
    isPending.value = false;

}
const resetUser = reactive({
    email: '',
    error: ''
});
const handleLogin = async () => {
    isPending.value = true;
    loginUser.error = '';
    const data = await client.auth.signIn({ email: loginUser.email, password: loginUser.password });
    if (data.error) {
        loginUser.error = data.error.message;
        isPending.value = false;
        return;
    }

    toast.success('Login successful');
    isPending.value = false;
    router.push('/')
}
const handleSendLinkReset = async () => {
    const data = await client.auth.api.resetPasswordForEmail(resetUser.email);
    if (data.error) {
        resetUser.error = 'Something went wrong';
        return;
    }
    toast.success('Reset link sent');
}

</script>

<template>
    <div>
        <layouts-breadcrumb />
        <div class="login-register-area pt-115 pb-120">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 col-md-12 ml-auto mr-auto">
                        <div class="login-register-wrapper">
                            <div class="login-register-tab-list nav">
                                <span :class="{ 'active': isActive === 'login' }" @click="isActive = 'login'">
                                    <h4> login </h4>
                                </span>
                                <span :class="{ 'active': isActive === 'register' }" @click="isActive = 'register'">
                                    <h4> Register </h4>
                                </span>

                            </div>
                            <div class="tab-content">
                                <div id="lg1" class="tab-pane " :class="{ 'active': isActive === 'login' }">
                                    <div class="login-form-container">
                                        <div class="login-register-form">
                                            <form @submit.prevent="handleLogin">
                                                <input type="email" name="email" placeholder="Email"
                                                    autocomplete="email" v-model="loginUser.email">
                                                <input type="password" name="user-password" placeholder="Password"
                                                    v-model="loginUser.password" autocomplete="current password">
                                                <span class="text-danger" v-if="loginUser.error">{{ loginUser.error
                                                }}</span>
                                                <div class="button-box">
                                                    <div class="login-toggle-btn">
                                                        <input type="checkbox">
                                                        <label>Remember me</label>
                                                        <span @click="isActive = 'reset'">Forgot Password?</span>
                                                    </div>
                                                    <button type="submit">Login
                                                        <div class="spinner-border" role="status" v-if="isPending">
                                                            <span class="visually-hidden"></span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div id="lg2" class="tab-pane" :class="{ 'active': isActive === 'register' }">
                                    <div class="login-form-container">
                                        <div class="login-register-form">
                                            <form action="#" method="post" @submit.prevent="handleRegister">
                                                <input type="email" name="email" placeholder="Email"
                                                    v-model="newUser.email" autocomplete="additional-email">
                                                <span v-if="newUser.error" class="text-danger">{{ newUser.error
                                                }}</span>
                                                <input type="password" name="user-password" placeholder="Password"
                                                    v-model="newUser.password" autocomplete="bday-month">
                                                <input name="confirmPassword" placeholder="confirmPassword"
                                                    type="password" v-model="newUser.confirmPassword"
                                                    autocomplete="current-password">
                                                <div class="button-box">
                                                    <button type="submit">Register
                                                        <div class="spinner-border" role="status" v-if="isPending">
                                                            <span class="visually-hidden"></span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div id="lg1" class="tab-pane " :class="{ 'active': isActive === 'reset' }">
                                    <div class="login-form-container">
                                        <div class="login-register-form">
                                            <form action="#" method="post" @submit.prevent="handleSendLinkReset">
                                                <input type="email" name="email" placeholder="Email"
                                                    v-model="resetUser.email">
                                                <span class="text-danger" v-if="loginUser.error">{{ loginUser.error
                                                }}</span>
                                                <div class="button-box">
                                                    <button type="submit">Send Link</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.loading {}
</style>

