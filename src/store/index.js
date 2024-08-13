import { createStore } from 'vuex'

const store = createStore({
    state:{
        isAuthenticated: false,
    },
    mutations:{
        setAuthenticated(state, isAuthenticated){
            state.isAuthenticated = isAuthenticated;
        }
    },
    getters:{
        isAuthenticated: state => state.isAuthenticated,
    }
});

export default store;