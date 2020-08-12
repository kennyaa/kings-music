import * as types from "./mutations-type"
import {findIndex} from "../common/util"

const actions = {
  //播放全部
  allPlay:({commit,state},{list,index}) => {
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },
  //选择播放
  selectPlay({ commit, state }, song) {
    let playlist = state.playlist.slice()
    let currentIndex = state.currentIndex
    // 查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findIndex(playlist, song)
    // 如果已经包含了这首歌
    if (fpIndex > -1) {
      currentIndex = fpIndex
    } else {
      playlist = [...playlist, song]
      currentIndex = playlist.length - 1
    }
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },
  savePlayHistory({ commit, state }, song) {
    let playHistory = state.playHistory.slice()
    playHistory = [...playHistory, song]
    commit(types.SAVE_PLAY_HISTORY, playHistory)
  },
  //删除列表音乐
  removeSong({commit,state},song){
     let playlist = state.playlist.slice()
     let currentIndex = state.currentIndex
     let pIndex = findIndex(playlist,song)
     playlist.splice(pIndex,1)
     if(currentIndex > pIndex && currentIndex === playlist.length){
       currentIndex--
     }
     commit(types.SET_PLAYLIST,playlist)
     commit(types.SET_CURRENT_INDEX,currentIndex)
     if(!playlist.length){
       commit(types.SET_PLAYING_STATE, false)
       commit(types.SET_CURRENT_INDEX, -1)
     }else{
      commit(types.SET_PLAYING_STATE, true)
     }
  },
  //清空列表音乐
  removeAll({commit,state}){
    commit(types.SET_PLAYLIST,[])
    commit(types.SET_CURRENT_INDEX,-1)
    commit(types.SET_PLAYING_STATE,false)
  },
  //播放，暂停
   setPlaying({commit,state},flag){
     commit(types.SET_PLAYING_STATE,flag)
   }
}

export default actions