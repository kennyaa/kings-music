<template>
  <transition name="list-fade">
    <div class="play-list" @click="hide" v-show="showFlag">
      <div class="play-wraper">
        <div class="num">
          <i class="icon">&#xe64b;</i>
          循环播放({{playlist.length}}首)
          <span @click.stop="AllSong">
            <i class="icon">&#xe699;</i>
          </span>
        </div>
        <scroll :data="playlist" ref="listContent" class="list">
          <transition-group name="slide" tag="div">
            <div class="item" v-for="(item, index) in playlist" :key="item.id">
              <p :class="{'current': currentIndex == index}" @click.stop="_play(item,index)">
                {{item.name}}
                <span
                  class="span"
                  :class="{'current': currentIndex == index}"
                  v-if="item.ar"
                >· {{item.ar[0].name}}</span>
                <span
                  class="span"
                  :class="{'current': currentIndex == index}"
                  v-else
                >· {{item.artists[0].name}}</span>
                <i class="icon" v-show="currentIndex == index"></i>
              </p>
              <div class="delete" @click.stop="deleteSong(index)">
                <i class="icon">&#xe60c;</i>
              </div>
            </div>
          </transition-group>
        </scroll>
        <div class="close" @click="hide">关闭</div>
      </div>
      <confirm ref="confirm" @confirm="clear_song" text="是否清空所有音乐" />
    </div>
  </transition>
</template>

<script>
import Scroll from "common/scroll/Scroll";
import Confirm from "common/confirm/Confirm";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "PlayingList",
  components: {
    Scroll,
    Confirm
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      setTimeout(() => {
        this.$refs.listContent.refresh();
      }, 20);
    },
    hide() {
      this.showFlag = false;
    },
    deleteSong(index) {
      this.removeSong(index)
      if(!this.playlist.length){
        this.hide()
      }
    },
    AllSong() {
      this.$refs.confirm.show();
    },
    clear_song(){
      this.$store.dispatch("removeAll")
      this.$store.dispatch("setPlaying",false)
      this.hide()
    },
    _play(song, index) {
      if (this.currentIndex === index) {
        return;
      }
      this.$store.dispatch("selectPlay", song);
    },
    ...mapActions([
      "removeSong", 
      "removeAll", 
      "selectPlay",
      "setPlaying"
      ])
  },
  computed: {
    ...mapGetters([
      "playlist", 
      "currentIndex"
      ])
  }
};
</script>

<style scoped>
.play-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 350;
  background-color: rgba(0, 0, 0, 0.5);
}
.list-fade-enter-active,
.list-fade-leave-active {
  transition: opacity 0.3s;
}
.play-wraper {
  transition: all 0.3s;
}
.list-fade-enter,
.list-fade-leave-to {
  opacity: 0;
}
.play-wraper {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #add8e6;
}
.num {
  display: flex;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  color: #ffffff;
}
.span {
  padding: 0 5px;
  font-size: 14px;
}
.list {
  max-height: 300px;
  overflow: hidden;
}
.item {
  display: flex;
  justify-content: space-between;
  height: 35px;
  line-height: 35px;
  margin: 0 10px;
  padding-left: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 17px;
  color: #fff;
  cursor: pointer;
}
p {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.current {
  color: #1874cd;
}
.icon {
  color: #1874cd;
  font-size: 30px;
  padding-right: 10px;
}
.delete {
  width: 100px;
  text-align: right;
  box-sizing: border-box;
  padding-right: 20px;
}
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 2s;
}
.list-fade-enter,
.list-fade-leave-to {
  transform: (0, 100%, 0);
}
.close {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  color: #ffffff;
}
</style>