<template>
  <div id="player" v-show="playlist.length > 0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" 
            :src="(currentSong.al && currentSong.al.picUrl) || (currentSong.artists && currentSong.artists[0].img1v1Url)" />
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon icon-back">&#xe602;</i>
          </div>
          <div class="title" v-html="currentSong.name"></div>
          <div class="subtitle" 
             v-html="(currentSong.ar && currentSong.ar[0].name) || (currentSong.artists && currentSong.artists[0].name)">
          </div>
        </div>
        <div class="middle"
           @touchstart.prevent="middleTouchStart"
           @touchmove.prevent="middleTouchMove"
           @touchend="middleTouchEnd">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper">
              <div class="cd">
                <img :class="cdCls" class="image" 
                  :src="(currentSong.al && currentSong.al.picUrl) || (currentSong.artists && currentSong.artists[0].img1v1Url)" />
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <scroll class="middle-r" ref="lyricList" 
             :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  ref="lyricLine"
                  class="text"
                  :class="{'current': currentLineNum ===index}"
                  v-for="(line,index) in currentLyric.lines"
                  :key="index"
                >{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>
         </div> 
        <div class="collection">
          <div class="collection-item">
            <i class="icon">&#xe60b;</i>
          </div>
          <div class="collection-item">
            <i class="icon">&#xe608;</i>
          </div>
          <div class="collection-item">
            <i class="icon">&#xe610;</i>
          </div>
          <div class="collection-item">
            <i class="icon">&#xe607;</i>
          </div>
          <div class="collection-item">
            <i class="icon">&#xe60e;</i>
          </div>
        </div>
        <div class="time">
          <span class="time-l">{{format(currentTime)}}</span>
          <div class="progress-bar">
            <progress-bar :percent="percent" @percentChange="BtnChange"/>
          </div>
          <span class="time-r">{{format(duration)}}</span>
        </div>
        <div class="operators">
          <div class="i-left">
            <i class="icon play-icon">&#xe64b;</i>
          </div>
          <div class="i-left" :class="disableCls">
            <i @click="prev" class="icon play-icon">&#xe649;</i>
          </div>
          <div class="i-center" :class="disableCls">
            <i @click="togglePlaying" v-if="!playing" class="icon center-icon">&#xe647;</i>
            <i @click="togglePlaying" v-else class="icon center-icon">&#xe64a;</i>
          </div>
          <div class="i-right" :class="disableCls">
            <i @click="next" class="icon play-icon">&#xe648;</i>
          </div>
          <div class="i-right" @click="showPlaylist">
            <i class="icon right-icon">&#xe642;</i>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="mini-icon">
          <img width="40px" height="40px" :class="cdCls"
            :src="(currentSong.al && currentSong.al.picUrl) || (currentSong.artists && currentSong.artists[0].img1v1Url)" />
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="(currentSong.ar && currentSong.ar[0].name) || (currentSong.artists && currentSong.artists[0].name)"></p>
        </div>
        <div class="control">
          <i @click.stop="togglePlaying" v-if="playing" class="icon icon-playlist">&#xe64a;</i>
          <i @click.stop="togglePlaying" v-else class="icon icon-playlist">&#xe647;</i>
        </div>
        <div class="mini-playlist">
          <i class="icon" @click.stop="showPlaylist">&#xe642;</i>
        </div>
      </div>
    </transition>
    <playing-list ref="playlist" />
    <audio ref="audio" 
      @canplay="ready" 
      @timeupdate="updatetime"
      @ended="end"></audio>
  </div>
</template>

<script>
import ProgressBar from "./childCopms/ProgressBar";
import PlayingList from "./childCopms/PlayingList";
import Scroll from "common/scroll/Scroll";

import { mapGetters, mapMutations, mapActions, mapState } from "vuex";

import Axios from "network/axios";
import {prefixStyle} from "../../common/dom"

import Lyric from "lyric-parser"

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

export default {
  name: "Player",
  data() {
    return {
      currentTime: 0,   //播放歌曲的进度时间
      duration: 0,      //歌曲的总时间
      songReady: false,    //是否正在准备音乐
      currentLyric: null,  //保存歌曲的歌词
      currentLineNum: 0,   //保存歌词正在播放的第几行
      currentShow: 'cd',   
      playingLyric: ''
    };
  },
  created() {
    this.touch = {}
  },
  computed: {
    ...mapGetters([
      "playlist", //音乐列表
      "fullScreen", //是否全屏
      "currentSong", //正在播放的歌曲的数据
      "playing",      // 播放状态
      "currentIndex",   //播放歌曲的索引
    ]),
    //获取percent来计算进度条的width
    percent() {
      return this.currentTime / this.duration;
    },
    //通过计算方式，判断歌曲是否在播放状态，让图片跟着旋转
    cdCls(){
      return this.playing ? 'play' : 'play paused'
    },
    disableCls() {
      return this.songReady ? '' : 'disable'
    },
  },
  methods: {
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    //获取到音乐列表，调用PlayList里面的show方法
    showPlaylist() {
      this.$refs.playlist.show();
    },
    //判断现在歌曲是否处于播放状态
    togglePlaying(){
      if(!this.songReady){
        return
      }
      this.setPlaying(!this.playing)
      if(this.currentLyric){
        this.currentLyric.togglePlay()
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      this.setPlaying(true)
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    //切换上一首歌曲
    prev() {
       if(!this.songReady){
        return
      }
      if(this.playlist.length === 1){
        this.loop()
        return
      }else{
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playlist.length - 1;
      }
      this.setcurrentIndex(index);
      if(!this.playing){
        this.togglePlaying()
        }
      }
      this.songReady = false
    },
    //切换下一首歌曲
    next() {
      if(!this.songReady){
        return
      }
      if(this.playlist.length === 1){
        this.loop()
        return
      }
      else{
      let index = this.currentIndex + 1;
      if (index === this.playlist.length) {
        index = 0;
      }
      this.setcurrentIndex(index);
      if(!this.playing){
        this.togglePlaying()
      }
    }
    this.songReady = false
   },
    //通过audio来获取到正在播放的音乐的时间
    updatetime(e) {
      this.currentTime = e.target.currentTime;
    },
    //当音乐还在加载的时候
    ready(){
       this.songReady = true
       this.duration = this.$refs.audio.duration    
       if (this.currentLyric && this.currentTime > 0) {
        this.currentLyric.seek(this.currentTime * 1000)
      }  
    },
    //当歌曲结束后，会自动切换到下一首
    end(){
      this.next()
      if(this.playlist.length === 1){
        this.$refs.currentTime = 0
        this.$refs.audio.play()
        this.handleLyric(this.currentLyric)
      }
    },
    //异步请求歌词
    getLyric(id){
      return Axios('/lyric',{id: id}).then(res => {
        this.currentLyric = new Lyric(res.lrc.lyric,this.handleLyric)
        if(this.playing && this.currentLyric){
          //当歌词还没有请求到的时候，让歌曲和歌词同步
          this.currentLyric.seek(this.currentTime * 1000)
          this.currentLyric.play()
        }
      })
    },
    //处理拿到的歌词的回调函数，让歌词始终保持在第八行
    handleLyric({lineNum, txt}){
       this.currentLineNum = lineNum
       if(lineNum > 8){
         let line = this.$refs.lyricLine[lineNum - 8]
         this.$refs.lyricList.scrollToElement(line,1000)
       }else{
         this.$refs.lyricList.scrollTo(0,0,1000)
       }
       this.playingLyric = txt
    },
    //当手指开始移动的时候记录位置
    middleTouchStart(e){
      this.touch.initiated = true
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    //当手指离开的时候的位置
    middleTouchMove(e){
      if(!this.touch.initiated){
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageX - this.touch.startY
      if(Math.abs(deltaY) > Math.abs(deltaX)){
        return
      }
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      const offsetWidth = Math.min(0,Math.max(-window.innerWidth,left + deltaX))
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style[transitionDuration] = `0`
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.middleL.style[transitionDuration] = `0`
    },
    //当手指离开后需要做的操作
    middleTouchEnd(){
     let offsetWidth
     let opacity
     if(this.currentShow === 'cd'){
       if(this.touch.percent > 0.3){
         offsetWidth = -window.innerWidth
         this.currentShow = 'lyric'
         opacity = 0
       }else{
         offsetWidth = 0
         opacity = 1
       }
     }else{
       if(this.touch.percent < 0.5){
         offsetWidth = 0
         this.currentShow = 'cd'
         opacity = 1
       }else{
         offsetWidth = -window.innerWidth
         opacity = 0
       }
     }
     const time = 1000
     this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
     this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
     this.$refs.middleL.style[transitionDuration] = `opacity`
     this.$refs.middleL.style.opacity = opacity
    },
    //处理获取到音乐时间的数字
    format(interval) {
      interval = interval | 0;
      const min = (interval / 60) | 0;
      const secend = this._pad(interval % 60);
      return `${min}:${secend}`;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    showPlaylist() {
      this.$refs.playlist.show();
    },
    BtnChange(percent){
      const songTimer = this.duration * percent 
      this.$refs.audio.currentTime = songTimer
      if(!this.playing){
        this.togglePlaying()
      }
      if(this.currentLyric){
         this.currentLyric.seek(songTimer * 1000)
      }
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlaying: "SET_PLAYING_STATE",
      setcurrentIndex: "SET_CURRENT_INDEX"
    }),
    ...mapActions([
         'savePlayHistory',
         'setPlaying'
    ]),
  },
  watch: {
    async currentSong(newSong,oldSong) {
      console.log(this.currentSong.id);
      if(!newSong.url){  
      await Axios("/song/url", { id: this.currentSong.id }).then(res => {
        newSong = {...newSong, url: res.data[0].url}
      })
    }  
      if(!newSong.id && newSong.id === oldSong.id){
        return
      }
      this.$refs.audio.src = newSong.url    
      this.songReady = false
      if(this.currentLyric){
        this.currentLyric.stop()
        this.currentLyric = null
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLineNum = 0
      }
        this.$refs.audio.play()
        this.getLyric(newSong.id)
    },
    playing(newPlaying) {
      if(!this.songReady){
        return
      }
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      },1000)
    }
  },
  components: {
    ProgressBar,
    PlayingList,
    Scroll
  }
};
</script>

<style scoped>
#player{
  z-index: 150;
}
.normal-player {
  position: fixed;
  background: #8c8c8c;
  z-index: 150;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.6;
  filter: blur(5px);
}
.top {
  position: relative;
  margin: 0 auto;
  height: 10%;
  line-height: 40px;
}
.back {
  position: absolute;
  width: 30%;
  height: 20%;
  top: 0;
  left: 6px;
  z-index: 50;
}
.icon-back {
  padding: 9px;
  font-size: 30px;
}
.title {
  width: 70%;
  margin: 0 auto;
  height: 5%;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 20px;
  text-align: center;
  color: #FFFFFF;
}
.subtitle {
  height: 5%;
  margin: 20px;
  text-align: center;
  font-size: 15px;
  color: #FFFFFF;
}
.middle {
  position: fixed;
  width: 100%;
  height: 51%;
  top: 15%;
  bottom: 30%;
  white-space: nowrap;
}
.middle-l {
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 80%;
}
.cd-wrapper {
  position: absolute;
  left: 10%;
  top: 0;
  width: 80%;
  height: 100%;
}
.cd {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 10px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}
.image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.playing-lyric-wrapper {
  width: 80%;
  margin: 28px auto 0 auto;
  overflow: hidden;
  text-align: center;
}
.playing-lyric {
  height: 21px;
  line-height: 21px;
  font-size: 20px;
  color: #BFEFFF;
}
.middle-r {
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.lyric-wrapper {
  width: 80%;
  margin: 0 auto;
  padding: 2px;
  overflow: hidden;
  text-align: center;
  color: #FFFFFF;
}
.bottom {
  position: absolute;
  bottom: 27%;
  width: 100%;
}
.dot-wrapper {
  text-align: center;
  font-size: 0;
}
.dot {
  display: inline-block;
  vertical-align: middle;
  margin: 0 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: hsla(0, 0%, 100%, 0.5);
} 
.active {
  width: 20px;
  border-radius: 10px;
  background: hsla(0, 0%, 100%, 0.8);
}
.current {
   color: #add8e6;
}
.text {
  line-height: 32px;
  color: 15px;
  font-size: green;
}
.collection {
  display: flex;
  position: absolute;
  width: 80%;
  height: 5%;
  text-align: center;
  line-height: 5%;
  bottom: 20%;
  margin: 0 30px 0 30px;
}
.collection-item {
  width: 20%;
  padding: 10px;
  text-align: center;
}
.collection-item i {
  font-size: 20px;
}
.time {
  position: absolute;
  display: flex;
  width: 100%;
  height: 5%;
  bottom: 15%;
  color: #ffffff;
  margin: 0 auto;
  text-align: center;
}
.progress-bar {
  width: 90%;
  text-align: center;
  margin: 0 auto;
}
.time-l {
  float: left;
  width: 15%;
  text-align: center;
  margin: 5px 0 0 15px;
}
.time-r {
  float: right;
  width: 15%;
  text-align: center;
  margin: 5px 15px 0 0;
}
.operators {
  display: flex;
  position: absolute;
  align-items: center;
  height: 10%;
  bottom: 5%;
  left: 0;
  right: 0;
  text-align: center;
}
.play-icon {
  font-size: 40px;
}
.center-icon {
  font-size: 60px;
}
.right-icon {
  font-size: 25px;
}
.i-left {
  width: 19%;
  font-size: 40px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}
.i-center {
  width: 24%;
  padding: 0 5px 0 5px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}
.i-right {
  width: 19%;
  height: 70px;
  line-height: 70px;
  text-align: center;
}
.icon-favorite {
  width: 15%;
  height: 70px;
  line-height: 70px;
}
.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: #d1eeee;
}
.mini-icon {
  flex: 0 0 40px;
  width: 40px;
  padding: 0 10px 0 20px;
}
.mini-icon img {
  border-radius: 50%;
}
.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  line-height: 20px;
  overflow: hidden;
}
.name {
  margin-bottom: 2px;
  font-size: 15px;
  color: pink;
}
.desc {
  font-size: 10px;
  color: blue;
}
.control {
  flex: 0 0 30px;
  width: 30px;
  padding: 0 10px;
}
.icon-playlist {
  font-size: 30px;
  color: blue;
}
.icon-mini {
  font-size: 32px;
  position: absolute;
  left: 0;
  top: 0;
}
.normal-enter-active,.normal-leave-active {
  transition: all 1s;
}
.normal-enter,.normal-leave-to {
  transform: translate3d(0, 100%, 0);
}
.play {
   animation: rotate 20s linear infinite;
}
.paused {
   animation-play-state: paused;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}          
</style>