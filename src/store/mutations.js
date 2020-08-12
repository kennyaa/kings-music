import * as types from "./mutations-type"

const mutations = {
  [types.SET_SINGER](state,singer){
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state,flag){
    state.playing = flag
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
  },
  [types.SAVE_PLAY_HISTORY](state,song){
    state.playHistory = song
  },
  [types.SAVE_FAVORITE_LIST](state,song){
    state.favoriteList = song
  },
  [types.SET_SEARCH_HISTORY](state,list){
    state.searchHistory = list
  }
}

export default mutations