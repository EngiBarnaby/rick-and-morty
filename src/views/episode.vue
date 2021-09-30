<template>
    <div class="episode">
        <div class="wrapper">
            <div class="info">
                <h2>Название:{{getCurrentEpisode.name}}</h2>
                <p>Дата премьеры:{{getCurrentEpisode.air_date}}</p>
                <h1>Участники</h1>
            </div>
        </div>
        <div class="images-wrapper">
            <div v-for="(char, i) in getCurrentEpisodImages" :key="i">
                <router-link
                :to="{ name : 'CharacterPage', params : { id : char.id }}">
                    <img :src="char.image">
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
export default {
    name : "episode",
    props : ["id"],

    computed : {
        ...mapGetters(["getCurrentEpisode", "getCurrentEpisodImages"])
    },

    methods : {
        ...mapMutations(["removeOldImages"])
    },

    async mounted(){
        await this.$store.dispatch("fetchEpisode", {id : this.id})
        this.removeOldImages()
        for(let i = 0; i < this.getCurrentEpisode.characters.length; i++){
            this.$store.dispatch("fetchCharactersImg", {url : this.getCurrentEpisode.characters[i]})
        }
    }
}
</script>

<style scoped>



.wrapper {
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.images-wrapper {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.images-wrapper img {
    display : block;
    width: 120px;
	height: 120px;
    border-radius: 50%;
    padding: 10px;
}

.info h1 {
    margin-top: 25px;
}

</style>