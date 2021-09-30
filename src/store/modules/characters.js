import axios from "axios"

export default {
    state: {
        characters: [],
        page : 0
    },

    mutations: {
        setCharacters(state, data) {
            state.characters = data
        },

        setPage(state) {
            state.page += 1
        },

        addNewChars(state, data) {
            state.characters.push(...data)
        }

    },

    actions: {
        async fetchCharacters(context) {
            context.commit("setPage")
            let res = await axios.get(`character/?page=1`)
            context.commit("setCharacters", res.data.results)
        },

        async fetchNewCharacters(context) {
            context.commit("setPage")
            let res = await axios.get(`character/?page=${context.state.page}`)
            context.commit("addNewChars", res.data.results)
        },
    },

    getters: {
        getCharacters : state => state.characters
    }
}