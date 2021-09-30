<template>
    <div class="wrapper">
        <div class="image">
            <img :src="getCurrentCharacter.image" alt="getCurrentCharacter.name">
        </div>
        <div class="info">
            <p>
               Имя: {{getCurrentCharacter.name }}
            </p>
            <p>
               Разновидность: {{getCurrentCharacter.species }}
            </p>
            <p>
               Локация: {{getCurrentCharacter.location.name }}
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name : "Character",
    props : ["id"],

    computed : {
        ...mapGetters(["getCurrentCharacter"])
    },

    mounted(){
        this.$store.dispatch("fetchCharacterDetail", {id : this.id})
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

img {
    display: block;
    border-radius: 25%;
}

.info {
    margin: 25px;
}

.info p {
    margin-top: 10px;
}
</style>