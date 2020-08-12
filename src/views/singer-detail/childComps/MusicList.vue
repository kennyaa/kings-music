<template>
 <transition name="singer">
  <div id="music-list" v-show="singersong.length > 0">
    <div class="back" @click="iconback">
      <i class="icon icon-back">&#xe603;</i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bgImage" :style="bgStyle" ref="bgimage">
      <div class="filter" @click="seleteItem">
         <i class="icon music-icon">&#xe647;</i>
        <span class="text">播放全部</span>
      </div>
    </div>
    <scroll :data="singersong" class="song-list" ref="singerSong">
      <song-list :song="singersong" v-show="singersong.length > 0"/>
    </scroll>
  </div>
 </transition>
</template>

<script>
  import Scroll from "common/scroll/Scroll"
  import SongList from "./SongList"

  import {mapActions} from "vuex"
export default {
  name: "MusicList",
  components:{
    Scroll,
    SongList
  },
  props: {
    singersong: {
      type: Array,
      default() {
        return [];
      }
    },
    bgImage: {
      type: String,
      default() {
        return "";
      }
    },
    title: {
      type: String,
      default() {
        return "";
      }
    }
  },
  mounted(){
    this.$refs.singerSong.$el.style.top = `${this.$refs.bgimage.clientHeight}px`
  },
  methods:{
    seleteItem(list,index){
       this.allPlay({
         list: this.singersong,
       })
    },
    ...mapActions([
      'allPlay',
    ]),
    iconback(){
        this.$router.back()
    },
    singerSong(){
        this.$refs.singerSong.refresh();
    }
  },
  computed:{
      bgStyle(){
        return `background-image:url(${this.bgImage})`
      }
  }
};
</script>

<style scoped>
#music-list {
  position: fixed;
  background: #98FB98;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.back{
    position: absolute;
    top: 0;
    line-height: 50px;
    z-index: 50;
}
.icon-back{
  display: block;
  padding: 0 30px 0 10px;
  font-size: 30px;
}
.title{
    position: absolute;
    top: 0;
    z-index: 40;
    left: 35px;
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    font-size: 18px;
    color: #fff;
}
.bgImage{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
}
.song-list{
  height: 60%;
  overflow: hidden;
}
.filter{
  position: absolute;
  top: 85%;
  left: 33%;
  border: 2px solid #FFFFFF;
  color: #fff;
  width: 100px;
  text-align: center;
  border-radius: 20px;
}
.music-icon{
   display: inline-block;
   vertical-align: middle;
   font-size: 20px;
   margin-right: 5px;
   color: #FFFFFF;
}
.text{
  display: inline-block;
  vertical-align: middle;
  font-size: 15px;
}
.singer-enter-active,.singer-leave-active {
  transition: all 1s;
}
.singer-enter,.singer-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>