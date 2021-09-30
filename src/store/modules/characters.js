import axios from "axios"

export default {
    state: {
        characters: [],
        page: 0,
        currentCharacter: {},
        currentEpisode: {},
        currentEpisodImages: []
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
        },

        setCurrentEpisode(state, data) {
            state.currentEpisode = data
        },
        
        setCurrentEpisodeImages(state, data) {
            state.currentEpisodImages.push(data)
        }

    },

    actions: {
        async fetchCharacters(context) {
            context.commit("setPage")
            let res = await axios.get(`https://rickandmortyapi.com/api/character/?page=1`)
            context.commit("setCharacters", res.data.results)
        },

        async fetchNewCharacters(context) {
            context.commit("setPage")
            let res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${context.state.page}`)
            console.log(
                res.data.results
            );
            context.commit("addNewChars", res.data.results)
        },

        async fetchCharacterDetail(context, id) {
            let { data } = await axios.get(`https://rickandmortyapi.com/api/character/${id.id}`)
            console.log(data);
            context.commit("setCurrentCharacter", data)
        },

        async fetchEpisode(context, id) {
            let { data } = await axios.get(`https://rickandmortyapi.com/api/episode/${id.id}`)
            context.commit("setCurrentEpisode", data)
        },

        async fetchCharactersImg(context, url) {
            let { data } = await axios.get(url.url)
            context.commit("setCurrentEpisodeImages", data.image)
        },
    },

    getters: {
        getCharacters: state => state.characters,
        getCurrentCharacter: state => state.currentCharacter,
        getCurrentEpisode: state => state.currentEpisode,
        getCurrentEpisodImages: state => state.currentEpisodImages
    }
}