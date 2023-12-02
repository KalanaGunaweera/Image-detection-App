<template>
    <form @submit.prevent="handleSubmit">
        <h1>Select Your Image</h1>
        <input type="file" @change="handleChange" />
        <div class="error">{{ fileError }}</div>
        <div class="error"></div>
        <div class="sandbox" v-if="loading">
            <div class="spinner"></div>
            <div>Please wait...</div>
        </div>
        <button>Submit</button>
    </form>
</template>

<script>
import useStorage from "@/composable/useStorage";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
    setup() {
        const detectedObjects = ref([]);
        const apiError = ref(null);
        const { filePath, url, uploadImage } = useStorage();
        const router = useRouter();
        const loading = ref(false);

        const file = ref(null);
        const fileError = ref(null);

        const handleSubmit = async () => {
            if (file.value) {
                await uploadImage(file.value);
                loading.value = true;
                console.log("image uploaded, url: ", url.value);

                try {
                    const response = await axios.post("https://us-central1-web-challenge-a0d9c.cloudfunctions.net/api/proxy", {
                        image: url.value
                    });
                    console.log("API response:", response.data);

                    detectedObjects.value = response.data.metadata;
                } catch (error) {
                    console.error("API error:", error);
                    apiError.value = error.message;

                }finally {
                    loading.value = false;
                }
                router.push({
                    path: '/imageBB',
                    query: { image: url.value,
                      detectedObjects :JSON.stringify(detectedObjects)}
                });


            }

        }

        // allowed file types
        const fileType = ["image/png", "image/jpeg"];

        const handleChange = (e) => {
            const selected = e.target.files[0];
            console.log(selected)

            if (selected && fileType.includes(selected.type)) {
                file.value = selected
                fileError.value = null;
            } else {
                file.value = null
                fileError.value = "Please select an image file (png or jpeg)";
            }
        }
        return { handleSubmit, handleChange, fileError, detectedObjects, apiError,loading }
    }
}

</script>
  


<style>
/* custom font */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap');

/* variables */
:root {
    --primary: #4f515a;
    --secondary: #ebebeb;
    --warning: #da0f41;
}

/* base styles  */
* {
    margin: 0;
    padding: 0;
    font-family: 'Nunito', sans-serif;
    color: var(--primary);
}

body {
    background: #fafafa;
}

a {
    text-decoration: none;
}

/* buttons */
button,
.btn {
    background: var(--secondary);
    border-radius: 8px;
    border: 0;
    padding: 8px 12px;
    font-weight: 600;
    cursor: pointer;
    display: inline-block;
}

button:hover,
.btn:hover {
    background: var(--primary);
    color: white;
}

button:disabled {
    opacity: 0.5;
    color: var(--primary);
    background: var(--secondary);
    cursor: not-allowed;
}

form {
    margin: 0 auto;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
    border: 1px solid var(--secondary);
    background: white;
}

input,
textarea {
    border: 0;
    border-bottom: 1px solid var(--secondary);
    padding: 10px;
    outline: none;
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin: 20px auto;
}

/* error text */
.error {
    color: var(--warning);
    font-size: 14px;
    margin: 16px 0;
}
</style>
