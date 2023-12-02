<template>
    <form @submit.prevent="handleSubmit">
        <img class="logo" src="../../assets/login-icon.png" style="align-items: center;">
        <h1 class="topic">Log In</h1>
        <div>
            <div class="register">
                <input type="email" placeholder="Email" v-model="email" required />
                <input type="password" placeholder="Password" v-model="password" required />
                <div v-if="error" class="error"> {{ error }} </div>
                <button class="button" v-if="!isPending">Login</button>
                <button class="button" v-if="isPending" disabled>Loading</button>
            </div>
        </div>
    </form>
</template>
  
<script>
import useLogin from "@/composable/useLogin";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
    setup() {
        const { login, error, isPending } = useLogin();
        const router = useRouter();

        const email = ref("");
        const password = ref("");

        const handleSubmit = async () => {
            let res = await login(email.value, password.value);
            if (!error.value) {
                console.log("User Logged in");
                // Navigate to the test.vue page
                router.push("/image");
            }
        };
        return { email, password, handleSubmit, error, isPending };
    },
};
</script>
  
<style>

.logo {
    width: 100px;
    padding-left: 550px;
}

.topic {
    padding-left: 550px;
}

.error{
    color: red;
    padding-left: 450px;
}

.register input {
    width: 300px;
    height: 30px;
    padding-left: 20px;
    display: block;
    margin-bottom: 25px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue;
}

.register button {
    width: 100px;
    height: 30px;
    border: 1px solid skyblue;
    background: rgb(117, 221, 178);
    color: #1f0202;
    cursor: pointer;
    margin-left: 440px;
}

</style>