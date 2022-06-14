<script setup lang="ts">
const isActive = ref('login');
const client = useSupabaseClient()
const router = useRouter()
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
definePageMeta({
    middleware: 'auth'
})

const handleRegister = async () => {
    if (newUser.password !== newUser.confirmPassword) {
        newUser.error = 'Passwords do not match';
        return;
    }
    newUser.error = '';
    const data = await client.auth.signUp({ email: newUser.email, password: newUser.password });

    if (data.error) {
        newUser.error = 'Something went wrong';
        return;
    }
    isActive.value = 'login';


}
const resetUser = reactive({
    email: '',
    error: ''
});
const handleLogin = async () => {
    loginUser.error = '';
    const data = await client.auth.signIn({ email: loginUser.email, password: loginUser.password });
    if (data.error) {
        loginUser.error = 'Something went wrong';
        return;
    }
    alert('Login successful');
    router.push('/')
}
const handleSendLinkReset = async () => {
    const data = await client.auth.api.resetPasswordForEmail(resetUser.email);
    if (data.error) {
        resetUser.error = 'Something went wrong';
        return;
    }
    alert('Email sent');
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
                                            <form action="#" method="post" @click="handleLogin">
                                                <input type="email" name="email" placeholder="Email"
                                                    v-model="loginUser.email">
                                                <input type="password" name="user-password" placeholder="Password"
                                                    v-model="loginUser.password">
                                                <span class="text-danger" v-if="loginUser.error">{{ loginUser.error
                                                }}</span>
                                                <div class="button-box">
                                                    <div class="login-toggle-btn">
                                                        <input type="checkbox">
                                                        <label>Remember me</label>
                                                        <span @click="isActive = 'reset'">Forgot Password?</span>
                                                    </div>
                                                    <button type="submit">Login</button>
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
                                                    v-model="newUser.email">
                                                <span v-if="newUser.error" class="text-danger">{{ newUser.error
                                                }}</span>
                                                <input type="password" name="user-password" placeholder="Password"
                                                    v-model="newUser.password">
                                                <input name="confirmPassword" placeholder="confirmPassword"
                                                    type="password" v-model="newUser.confirmPassword">
                                                <div class="button-box">
                                                    <button type="submit">Register</button>
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


