import axios from "axios"

export default {
    state: {
        characters: [],
        page: 0,
        currentCharacter : {}
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
        },

        setCurrentCharacter(state, data) {
            state.currentCharacter = data
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
            console.log(
                res.data.results
            );
            context.commit("addNewChars", res.data.results)
        },

        async fetchCharacterDetail(context, id) {
            let { data } = await axios.get(`character/${id.id}`)
            console.log(data);
            context.commit("setCurrentCharacter", data)
        }
    },

    getters: {
        getCharacters: state => state.characters,
        getCurrentCharacter : state => state.currentCharacter
    }
}