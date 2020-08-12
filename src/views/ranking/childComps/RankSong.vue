<template>
 <transition name="rangsong">
    <div id="rank-detail">
      <music-list 
        :singersong="ranksong" 
        :bg-image="bgImage" 
        :title="title" />
    </div>
  </transition>
</template>

<script>
 import MusicList from "../../singer-detail/childComps/MusicList"

 import Axios from "network/axios"
export default {
   name:"RankSong",
   components:{
     MusicList
   },
   data(){
     return{
        ranksong:[],
        bgImage:'',
        title: ''
     }
   },
   created(){
     this.getranksong()
   },
   methods:{
      getranksong(){
         if (!this.$route.params.id) {
        this.router.push("/ranking")
        return
      }
         return Axios('/playlist/detail',{id: this.$route.params.id}).then(res => {
             this.ranksong = res.playlist.tracks
             this.bgImage = res.playlist.coverImgUrl
             this.title = res.playlist.name
         })
      }
   }
}
</script>

<style scoped>
.rangsong-enter-active,.rangsong-leave-active {
  transition: all 1s;
}
.rangsong-enter,.rangsong-leave-to {
  transform: translate3d(100%, 100%, 0);
}
</style>