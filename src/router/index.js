import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '@/views/LoginView.vue';
import AccessDenied from '@/views/AccessDenied.vue';
import store from '@/store';
import FirebaseSignInView from '@/views/FirebaseSignInView.vue';
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue';
import AddBookView from '@/views/AddBookView.vue';
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
    },
    {
        path: '/denied',
        name: 'Denied',
        component: AccessDenied
    },
    {
        path: '/logout',
        name: 'Logout',
        component: LoginView,
        meta: {requiresAuth: false}
    },
    {
        path: '/FireLogin',
        name: 'FireLogin',
        component: FirebaseSignInView
    },
    {
        path: '/FireRegister',
        name: 'FireRegister',
        component: FirebaseRegisterView
    },
    {
        path: '/addBook',
        name: 'AddBook',
        component: AddBookView
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