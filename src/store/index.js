/**
 * Created by HIAPAD on 2020/5/24.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import createPersistedState from 'vuex-persistedstate'
import user from './user'
import common from './common'

const store = new Vuex.Store({
    modules: {
        user,
        common
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer(val) {
            return {
                // 只储存state中的user
                user: val.user
            }
        }
    })]
})
export default store
