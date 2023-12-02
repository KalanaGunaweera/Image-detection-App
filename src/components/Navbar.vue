<template>
    <div class="navbar">
        <nav>
            <img class="img" src="@/assets/promiseQ_image.jpg" alt="" />
            <h1><router-link :to="{ name: 'home' }">PromiseQ</router-link></h1>
            <div class="links">
                <div v-if="user">
                    <button class="btn" @click="handleSubmit">Logout</button>
                </div>
                <div v-else>
                    <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
                    <router-link class="btn" :to="{ name: 'Login' }">Log in</router-link>

                </div>
            </div>
        </nav>
    </div>
</template>


<script>

import useLogout from "../composable/useLogout";
import getUser from "../composable/getUser";
import { useRouter } from "vue-router";
export default {
    setup() {
        const { user } = getUser();
        const { logout } = useLogout();
        const router = useRouter();
        

        const handleSubmit = async () => {
            await logout();
            console.log("User Logged out");
            router.push({ name: "Login" });
        };
        return { handleSubmit, user };
    },
};


</script>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
}

nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

nav h1 {
    margin-left: 20px;
}

nav .links {
    margin-left: auto;
}

nav .links a,
btn {
    margin-left: 16px;
    font-size: 14px;
}

nav img {
    max-height: 60px;
}

nav .btn {
    color: rgb(24, 22, 22);
    /* background-color: rgb(116, 116, 204); */
    margin-right: 10px;
    height: 100%;
    width: 80px;
    border-radius: 5px;
    background: var(--secondary);
    border-radius: 8px;
    border: 0;
    padding: 8px 12px;
    font-weight: 600;
    cursor: pointer;
    display: inline-block;
    background-color: rgb(212, 212, 221);
    text-align: center;
}

nav .button:hover,
.btn:hover {
    background: var(--primary);
    color: rgb(107, 107, 175);
    background-color: rgb(152, 190, 190);
}

nav .button:disabled {
    opacity: 0.5;
    color: var(--primary);
    background: var(--secondary);
    cursor: not-allowed;
}

span{
    font-size: 14px;
    display: inline-block;
    margin-left: -160px;
    padding-left: -160px;
    border-left: 1px solid #eee;
}
</style>