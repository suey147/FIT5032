import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '@/views/LoginView.vue';
import store from '@/store';
// create routes
const routes = [
    
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: {requiresAuth: true}
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView,
        meta: {requiresAuth: true}
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    }
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated){
        return {
            path: '/login',
            query: { redirect: to.fullPath },
        }
    }
})

export default router