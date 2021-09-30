import axios from "axios"

export default {
    state: {
        characters: [],
        page : 0
    },

    mutations: {
        setCharacters(state, data) {
            state.characters.push(data)
            console.log(state.characters);
        },

        setPage(state) {
            state.page += 1
        },

    },

    actions: {
        async fetchCharacters(context) {
            context.commit("setPage")
            console.log(context.state.page);
            let res = await axios.get(`character/?page=1`)
            context.commit("setCharacters", res.data.results)
        },
    },

    getters: {
        getCharacters : state => state.characters
    }
}