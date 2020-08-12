import Vue from 'vue'
import VueRouter from 'vue-router'

const Ranking = () => import('../views/ranking/Ranking.vue')
const Recommend = () => import('../views/recommend/Recommend.vue')
const Search = () => import('../views/search/Search.vue')
const Singer = () => import('../views/singer/Singer.vue')
const SingerDetail = () => import('../views/singer-detail/SingerDetail.vue')
const RankSong = () => import('../views/ranking/childComps/RankSong.vue')
const User = () => import('../views/user/User.vue')
const Login = () => import('../views/login/Login.vue')

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      redirect: '/recommend'
   },
   {
      path: '/recommend',
      component: Recommend
   },
   {
      path: '/ranking',
      component: Ranking,
      children:[
         {
            path: ':id',
            component: RankSong
         }
      ]
   },
   {
      path: '/search',
      component: Search
   },
   {
      path: '/singer',
      component: Singer,
      children:[
         {
            path: ':id',
            component: SingerDetail
         }
      ]
   },
   {
      path:'/user',
      component: User
   },
   {
      path: '/login',
      component: Login
   }
]

const router = new VueRouter({
   routes,
})

export default router
