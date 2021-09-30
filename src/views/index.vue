<template>
    <div class="wrapper">
        <div class="title">Rick and Morty</div>
        <div class="cards">
            <div class="card_item" v-for="char in getCharacters" :key="char.id">
                <div class="card_inner">
                    <img  :src="char.image" alt="Avatar">
                    <div class="name">{{ char.name}}</div>
                    <div class="status">{{ char.status}}</div>
                    <div>
                        Episode :  
                        <p class="episode" v-for="(ep, i) in char.episode.slice(0, 5)" :key="i" >
                            {{getEpisod(ep)}}&nbsp;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
    name : "MainPage",

        computed : {
        ...mapGetters(["getCharacters"])
    },

    methods : {
        ...mapActions(["fetchCharacters", "fetchNewCharacters"]),

        getEpisod(url){
            let num = url.match(/\d+$/)[0]
            return num
        },

		getNextCharacters() {
            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    this.fetchNewCharacters()
                }
            }
        }

    },

    created(){
        this.fetchCharacters()
    },

	mounted(){
		this.getNextCharacters()
	},

}
</script>

<style scoped>

.wrapper .title{
	width: 100%;
	height: 50px;
	background: #e36686;
	color: #fff;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	text-transform: uppercase;
	letter-spacing: 5px;
	font-weight: 900;
}

.cards{
	padding: 20px;
	width: 100%;
	display: flex;
	justify-content: start;
	flex-wrap: wrap;
}

.cards .card_item{
	padding: 15px 25px;
	width: 33%;
}

.cards .card_inner{
	background: #fff;
	border-radius: 5px;
	/* padding: 35px 20px; */
	width: 100%;
}

.cards .card_item img{
	width: 80px;
	height: 80px;
	margin-bottom: 5px;
    border-radius: 50%;
}

.cards .card_item .status{
	color: #e36686;
	font-weight: 900;
	letter-spacing: 2px;
	text-transform: uppercase;
	font-size: 20px;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.cards .card_item .name{
	color: #b6c0c2;
	font-size: 12px;
	font-weight: 100;
	margin: 5px 0 10px;
}

.cards .card_item .episode{
    display: inline;    
	font-size: 14px;
	line-height: 24px;
	color: #7b8ca0;
}
</style>