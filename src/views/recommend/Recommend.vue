<template>
  <div id="recommend" ref="recommend">
    <scroll class="content" ref="scroll" :data="songlist">
      <recommend-swiper :bananer="bananer"></recommend-swiper>
        <div class="singrec">热门歌单推荐</div>
      <song-list ref="songlist" :songlist="songlist"></song-list>
    </scroll>
  </div>
</template>

<script>
import RecommendSwiper from "./childComps/RecommendSwiper";
import SongList from "./childComps/SongList";

import Axios from "network/axios";
import {playlistMixin} from "../../common/mixin"

import Scroll from "common/scroll/Scroll";

import{ mapGetters } from "vuex"
export default {
  name: "Recommend",
  mixins:[playlistMixin],
  components: {
    RecommendSwiper,
    SongList,
    Scroll
  },
  data() {
    return {
      pullup: true,
      bananer: [],
      songlist: []
    };
  },
  created() {
    this.limit = 10;
    this.getbananer(), 
    this.getsonglist()
  },
  methods: {
    handlePlaylist(playlist){
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    scroll(){
      this.$refs.scroll.refresh()
    },
    getbananer() {
      return Axios("/banner").then(res => {
        this.bananer = res.banners;
      });
    },
    getsonglist() {
      return Axios("/top/playlist", { limit: this.limit }).then(res => {
        this.songlist = res.playlists;
      });
    },
    scrollEnd() {
      this.limit += 10;
      return Axios("/top/playlist", { limit: this.limit }).then(res => {
        this.songlist = res.playlists;
      });
    }
  },
  computed:{
    ...mapGetters([
      'playlist'
    ])
  }
};
</script>

<style scoped>
#recommend {
  position: fixed;
  background: #add8e6;
  width: 100%;
  top: 80px;
  bottom: 0;
} 
.singrec {
  width: 100%;
  text-align: center;
  height: 40px;
  color: red;
  margin: 0 auto;
  line-height: 40px;
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>