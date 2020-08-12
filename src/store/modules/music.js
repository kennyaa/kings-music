import * as types from "../mutations-type"
import {playMode} from "../../common/config"

const state = {
   count: 1111,
   singer: {},
   playing: false,     //是否正在播放
   fullScreen: false, //全屏
   playlist: [],      //播放列表
   sequencelist: [],  //播放模式 
   mode: playMode.sequence,
   currentIndex: -1,   //当前播放歌曲的索引
}

const mutations = {
   [types.SET_SINGER](state,singer){
     state.singer = singer
   },
   [types.SET_PLAYING_STATE](state,flag){
     state.flag = flag
   },
   [types.SET_FULL_SCREEN](state,flag){
     state.fullScreen = flag
   },
   [types.SET_PLAYLIST](state,list){
     state.playlist = list
   },
   [types.SET_SEQUENCE_LIST](state,list){
     state.sequencelist = list
   },
   [types.SET_PLAY_MODE](state,mode){
     state.mode = mode
   },
   [types.SET_CURRENT_INDEX](state,index){
     state.currentIndex = index
   }
}

const getters = {
    singer: state => state.singer,
    playing: state => state.playing,
    fullScreen: state => state.fullScreen,
    playlist: state => state.playlist,
    sequencelist: state => state.sequencelist,
    currentIndex: state => state.currentIndex,
    currentSong: state => {
      return state.playList[state.currentIndex] || {}
    }
}

const actions = {
   selectPlay:({commit,state},{list,index}) => {
     commit(types.SET_SEQUENCE_LIST, list)
     commit(types.SET_PLAYLIST, list)
     commit(types.SET_CURRENT_INDEX, index)
     commit(types.SET_FULL_SCREEN,true)
     commit(types.SET_PLAYING_STATE, true)
   }
}

export default {
  state,
  mutations,
  getters,
  actions
}