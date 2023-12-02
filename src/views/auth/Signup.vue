<template>
    <form @submit.prevent="handleSubmit">
        <img class="logo" src="../../assets/login-icon.png" style="align-items: center;">
        <h1 class="topic">Sign Up</h1>
        <div>
            <div class="register">
                <input type="text" v-model="displayName" placeholder="Display Name">
                <input type="email" placeholder="Email" v-model="email" required />
                <input type="password" placeholder="Password" v-model="password" required />
                <div v-if="error" class="error"> {{ error }} </div>
                <button class="button" v-if="!isPending">SignUp</button>
                <button class="button" v-if="isPending" disabled>Loading</button>
            </div>
        </div>
    </form>
</template>


<script>
import useSignup from "@/composable/useSignup";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
    setup() {
        const { error, signup, isPending} = useSignup()
        const router = useRouter();

        const displayName = ref('');
        const email = ref('');
        const password = ref('');

        const handleSubmit = async () => {
            const res = await signup(email.value, password.value, displayName.value)
            if(!error.value){
                console.log('User signed up!');
                router.push("/");

                
            }
        }

        return{email,password,displayName,isPending, error,handleSubmit}
    }
}
</script>

<style></style>
