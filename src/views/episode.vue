<template>
    <div class="wrapper">
        <div class="info">
            <h2>Название:{{getCurrentEpisode.name}}</h2>
            <p>Дата премьеры:{{getCurrentEpisode.air_date}}</p>
            <div v-for="(charImg, i) in getCurrentEpisodImages" :key="i">
                <img :src="charImg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    name : "episode",
    props : ["id"],

    computed : {
        ...mapGetters(["getCurrentEpisode", "getCurrentEpisodImages"])
    },

    methods : {
            

    },

    async mounted(){
        await this.$store.dispatch("fetchEpisode", {id : this.id})
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
}
</style>