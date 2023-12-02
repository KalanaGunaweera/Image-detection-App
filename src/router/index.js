import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import image from '../views/ImageUploading/image.vue';
import imageBB from '../views/ImageRendering/image-boundary-boxing.vue';

// import ImageUploading from '../views/ImageUploading/imageUploading.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: "/image",
    name:'image',
    component: image,
    meta: { requiresAuth: true }, // Add this meta field to check authentication
  },
  {
    path: "/imageBB",
    name:'imageBB',
    component: imageBB,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
