<template>
    <h1>Sign In</h1>
    <form @submit.prevent="signin">
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
                <button type="submit" class="btn btn-primary me-2">Signin</button>
            </div>
        </form>
</template>

<script setup>
    import {onMounted, ref} from "vue"
    import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
    import { getDoc, doc } from "firebase/firestore"
    import {useRouter} from "vue-router"
    import db from "@/firebase"
    import { useStore} from 'vuex'

    const email = ref("")
    const password = ref("")
    const router = useRouter()
    const auth = getAuth()
    const store = useStore();
    const signin = () => {
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async (data) => {
            console.log("Firebase Signin Successful!")
            console.log(auth.currentUser.uid)
            const roleDoc = await getDoc(doc(db,'roles', auth.currentUser.uid));
            const userRole = roleDoc.data().role;
            store.commit('setAuthenticated', email.value, userRole );
            alert(`Logged in as ${userRole}`)
            router.push("/")
        }).catch((error) => {
            console.log(error);
        })
    }
</script>