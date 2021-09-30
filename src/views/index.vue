<template>
	<div>
		<div class="search">
			<input type="text" placeholder="Введите имя" v-model="searchName">
			<div class="custom-select">
				<select v-model="searchStatus">
					<option>Статус:</option>
					<option value="alive">Жив</option>
					<option value="dead">Мёртв</option>
					<option value="unknown">Неизвестно</option>
				</select>
			</div>
			<button @click="searchCharacters">Поиск</button>
		</div>
		<div class="wrapper">
			<div class="cards">
				<div class="card_item" v-for="char in getCharacters" :key="char.id">
					<div class="card_inner">
						<img  :src="char.image" alt="Avatar">
						<router-link 
							style="text-decoration: none; color: inherit;"
							:to="{ name : 'CharacterPage', params : { id : char.id }}">
							<div class="name">{{ char.name}}</div>
						</router-link>
						<div class="status">{{ char.species}}</div>
						<div class="status">{{ char.status}}</div>
						<div>
							Episode :  
							<router-link
								style="text-decoration: none; color: inherit;"
								class="episode" v-for="(ep, i) in char.episode.slice(0, 5)" :key="i" 
								:to="{ name : 'EpisodeDetail', params : {id : ep.match(/\d+$/)[0] }}">
								{{getEpisodId(ep)}}&nbsp;
							</router-link>
						</div>
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
        ...mapGetters(["getCharacters", "getSearchStatus"])
    },

	data(){
		return {
			searchName : "",
			searchStatus : "",
		}
	},

    methods : {
        ...mapActions(["fetchCharacters", "fetchNewCharacters", "fetchSearchCaracters"]),

        getEpisodId(url){
            let num = url.match(/\d+$/)[0]
            return num
        },

		searchCharacters(){
			let query = {"name": this.searchName, "status" : this.searchStatus}
			this.fetchSearchCaracters(query)
		},

		getNextCharacters() {
            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow && !this.searchStatus ) {
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

.cards{
	padding: 20px;
	width: 100%;
	display: flex;
	justify-content: start;
	flex-wrap: wrap;
}

.cards .card_item{
	/* border: 1px solid black; */
	padding: 15px 25px;
	margin: 10px 10px;
	width: 30%;
	display: flex;
	text-align: center;
}

.cards .card_inner{
	background: #fff;
	border-radius: 5px;
	/* padding: 35px 20px; */
	width: 100%;
}

.cards .card_item img{
	width: 120px;
	height: 120px;
	margin-bottom: 5px;
    border-radius: 25%;
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

.search {
	display: flex;
}

.search input {
	margin-left: 30px;
	width: 60%;
	display: block;

}

</style>