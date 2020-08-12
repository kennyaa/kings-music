import {playMode} from "../common/config"

const state = {
  singer: {},
  playing: false,       //是否正在播放
  fullScreen: false,    //全屏
  playlist: [],         //播放列表
  sequencelist: [],     //播放模式 
  mode: playMode.sequence,   //列表播放
  currentIndex: -1,     //当前播放歌曲的索引
  favoriteList: [],      //我喜欢的歌曲
  playHistory: [],       //播放历史
  searchHistory: []      //搜索历史
}

export default state