<template>
  <transition name="user">
    <div id="user">
      <div class="back" @click="back">
        <i class="icon">&#xe603;</i>
      </div>
      <switches @switch="switchItem" :currentIndex="currentIndex" :switches="switches" />
      <div ref="playBtn" class="play">
        <i class="icon user-icon">&#xe647;</i>
        <span class="text">播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
      <scroll  
        ref="favoriteList"
        class="list-scroll"
        v-if="currentIndex === 0"
        :data="favoriteList">
         <div class="list-inner">
          <song-list :song="favoriteList"/>
         </div>
      </scroll>
       <scroll
          ref="playlist"
          class="list-scroll"
          v-if="currentIndex === 1"
          :data="playlist">
          <div class="list-inner">
            <song-list :song="playlist"/>
          </div>
       </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <span v-if="currentIndex === 0">{{favorite}}</span>
        <span v-else v-show="!playlist.length"> {{history}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
  import Switches from "./childComps/Switches";
  import Scroll from "common/scroll/Scroll";
  import SongList from "../singer-detail/childComps/SongList"

  import { mapGetters } from "vuex"
export default {
  name: "User",
  data() {
    return {
      currentIndex: 0,
      switches: [
        {
          name: "我喜欢的"
        },
        {
          name: "最近听的"
        }
      ],
      favorite: '暂无收藏歌曲哦',
      history: '你还没有收听歌曲哦'
    };
  },
  methods: {
    switchItem(index){
      this.currentIndex = index
    },
    back() {
      this.$router.push('/recommend')
    },
    noResult(){
      if(this.currentIndex === 0){
        return !this.favoriteList.length
      }else{
        return !this.playHistory.length
      }
    },
    noResultDesc(){
      if(this.currentIndex === 0){
        return favorite
      }else{
        return history
      }
    }
  },
  computed:{
    ...mapGetters([
      'playlist',
      'favoriteList'
   ])
  },
  components: {
    Switches,
    Scroll,
    SongList
  }
};
</script>

<style scoped>
#user {
  position: fixed;
  background: #add8e6;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
}
.back {
  position: absolute;
  top: 0;
  line-height: 30px;
  margin-top: 10px;
  margin-left: 5px;
}
.play {
  box-sizing: border-box;
  width: 100px;
  padding: 3px 0;
  margin: 0 auto;
  margin-top: 10px;
  text-align: center;
  border: 1px solid #ffffff;
  color: #ffffff;
  border-radius: 20px;
}
.user-icon {
  display: inline-block;
  vertical-align: middle;
  font-size: 20px;
  margin-right: 5px;
  color: #ffffff;
}
.text {
  display: inline-block;
  vertical-align: middle;
  font-size: 15px;
}
.user-enter-active{
  transition: all 1s;
}
.user-enter{
  transform: translate3d(100%, 0, 0);
}
.list-wrapper{
  position: absolute;
  top: 90px;
  bottom: 0;
  width: 100%;
}
.no-result-wrapper {
  position: absolute;
  width: 100%;
  top: 50%;
  text-align: center;
  font-size: 14px;
  color: hsla(0,0%,100%,.3);
}
.list-scroll{
  height: 100%;
  overflow: hidden;
}
</style>