<script setup lang="ts">
import { useToast } from 'vue-toastification';

const user = useSupabaseUser()
const client = useSupabaseClient()
const toast = useToast()
const userData = reactive({
    FirstName: '',
    LastName: '',
    DisplayName: '',
    Email: '',
    error: '',
    isPending: false,
})
const passwordState = reactive({
    newPassword: '',
    confirmPassword: '',
    isPending: false,
})



const handleUpdate = async () => {
    userData.isPending = true
    const { user, error } = await client.auth.update({
        data: { firstname: userData.FirstName, lastname: userData.LastName, displayname: userData.DisplayName },
    })
    console.log("🚀 ~ file: AcccountDetail.vue ~ line 10 ~ handleUpdatePhoneNum ~ user", user)
    if (error) {
        userData.isPending = false
        toast.error(error.message)
        console.log(error)
        return
    }
    toast.success('Profile updated successfully')

    userData.isPending = false
}
if (user.value) {
    console.log("🚀 ~ file: AcccountDetail.vue ~ line 15 ~ user.value", user.value.app_metadata)
    userData.FirstName = user.value.user_metadata.firstname
    userData.LastName = user.value.user_metadata.lastname
    userData.DisplayName = user.value.user_metadata.displayname
    userData.Email = user.value.email
}
const handleChangePassword = async () => {
    passwordState.isPending = true
    // validate password
    if (passwordState.newPassword !== passwordState.confirmPassword) {
        toast.error('Passwords do not match')
        passwordState.isPending = false
        return
    }
    const { user, error } = await client.auth.update({ password: passwordState.newPassword })
    if (error) {
        passwordState.isPending = false
        toast.error(error.message)
        console.log(error)
    }
    passwordState.isPending = false
    toast.success('Password updated')
    // reset password state
    passwordState.newPassword = ''
    passwordState.confirmPassword = ''


}
</script>

<template>
    <div>
        <div class="account-details-form">
            <form class="mb-5" @submit.prevent="handleUpdate">

                <div class="row">
                    <div class="col-lg-6">
                        <div class="single-input-item">
                            <label for="first-name" class="required">First
                                Name</label>
                            <input type="text" id="first-name" v-model="userData.FirstName" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="single-input-item">
                            <label for="last-name" class="required">Last
                                Name</label>
                            <input type="text" id="last-name" v-model="userData.LastName" />
                        </div>
                    </div>
                </div>
                <div class="single-input-item">
                    <label for="display-name" class="required">Display
                        Name</label>
                    <input type="text" id="display-name" v-model="userData.DisplayName" />
                </div>
                <div class="single-input-item">
                    <label for="email" class="required">Email Addres</label>
                    <input type="email" id="email" readonly :value="userData.Email" />
                </div>
                <div class="single-input-item ">
                    <button class="check-btn sqr-btn " type="submit">Save Changes</button>
                </div>
            </form>
            <form action="" @submit.prevent="handleChangePassword">
                <fieldset>
                    <legend>Password change</legend>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="single-input-item">
                                <label for="new-pwd" class="required">New
                                    Password</label>
                                <input type="password" id="new-pwd" v-model="passwordState.newPassword" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="single-input-item">
                                <label for="confirm-pwd" class="required">Confirm Password</label>
                                <input type="password" id="confirm-pwd" v-model="passwordState.confirmPassword" />
                            </div>
                        </div>
                    </div>
                    <div class="single-input-item ">
                        <button class="check-btn sqr-btn " type="submit">Change Password</button>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</template>



<style scoped>
</style>