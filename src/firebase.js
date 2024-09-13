// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
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
const db = getFirestore();

export default db;