/**
 * Created by HIAPAD on 2020/5/24.
 */
const state = {
    token: '11111111111'
}
const mutations = {
    setToken: (state, token) => {
        state.token = token
    }
}
const getters = {
    getToken: (state) => {
        return state.token
    }
}
export default {
    state, mutations, getters
}
