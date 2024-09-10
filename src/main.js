// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import store from './store'
const app = createApp(App);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjS_azKf8GzxF0cnfYvvH0e3X7KpKGifk",
  authDomain: "vue-firebase-auth-w7.firebaseapp.com",
  projectId: "vue-firebase-auth-w7",
  storageBucket: "vue-firebase-auth-w7.appspot.com",
  messagingSenderId: "72882488667",
  appId: "1:72882488667:web:4e2b8f96976f1a88f9c67e"
};

// Initialize Firebase
initializeApp(firebaseConfig);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(router)
app.use(store)
app.mount('#app')
