import { createStore } from 'vuex'

const store = createStore({
    state:{
        isAuthenticated: false,
        currentUser: '',
        role: ''
    },
    mutations:{
        setAuthenticated(state, currentUser, role){
            state.isAuthenticated = true;
            state.currentUser = currentUser;
            state.role = role;
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userEmail", currentUser);
            localStorage.setItem("userRole", role);
        },
        logout(state){
            console.log("Logout: "+state.currentUser)
            state.isAuthenticated = false;
            state.currentUser = '';
            state.role = '';
            localStorage.setItem("isLoggedIn", false);
            localStorage.setItem("userEmail", state.currentUser);
            localStorage.setItem("userRole", state.role);
        }
    },
    getters:{
        isAuthenticated: state => state.isAuthenticated,
        currentUser: state => state.currentUser,
        role: state => state.role
    }
});

export default store;