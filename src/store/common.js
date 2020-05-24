/**
 * Created by HIAPAD on 2020/5/24.
 */
const state = {
    loading: false
}
const mutations = {
    setLoading: (state, type = false) => {
        state.loading = type
    }
}
const getters = {
    getLoading: (state) => {
        return state.loading
    }
}
export default {
    state, mutations, getters
}
