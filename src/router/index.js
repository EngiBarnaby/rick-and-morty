import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import character from '../views/character.vue'
import episode from '../views/episode.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Index,
  },
  {
    path: '/character/:id',
    name: "CharacterPage",
    props : true,
    component : character,
  },

  {
    path: '/episode/:id',
    name: "Episodedetail",
    props : true,
    component : episode,
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
