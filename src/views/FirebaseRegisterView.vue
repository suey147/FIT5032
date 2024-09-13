<template>
    <h1>Register</h1>
    <form @submit.prevent="register">
            <!-- Username -->
            <div class="row mb-3">
                <div class="col-md-12 col-sm-12 col-12">
                    <label for="Email" class="form-label">Email</label>
                    <input type="text" class="form-control" id="Email" 
                        v-model="email">
                    <!-- <div v-if="errors.username" class="text-danger">{{ errors.username }}</div> -->
                </div>
            </div>
            <!-- password -->
            <div class="row mb-3">
                <div class="col-md-12 col-sm-12 col-12">
                    <label for="password" class="form-label">password</label>
                    <input type="password" class="form-control" id="password" 
                        v-model="password">
                    <!-- <div v-if="errors.password" class="text-danger">{{ errors.password }}</div> -->
                </div>
            </div>

            <!-- submit -->
            <div class="text-center">
                <button type="submit" class="btn btn-primary me-2">Save to Firebase</button>
            </div>
        </form>
</template>

<script setup>
    import {ref} from "vue"
    import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
    import {useRouter} from "vue-router"
    import { setDoc, doc } from "firebase/firestore"
    import db from "@/firebase"
    const email = ref("")
    const password = ref("")
    const router = useRouter()
    const auth = getAuth()
    
    const register = () => {
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (data) => {
            await setDoc(doc(db, 'roles', data.user.uid), {
                role: "user"
            })
            alert("Firebase Register Successful!")
            router.push("/FireLogin")
        }).catch((error) => {
            console.log(error);
        })
    }
</script>