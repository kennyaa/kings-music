const getters = {
  singer: state => state.singer,
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  playlist: state => state.playlist,
  sequencelist: state => state.sequencelist,
  currentIndex: state => state.currentIndex,
  currentSong: state => {
    return state.playlist[state.currentIndex] || {}
  },
  favoriteList: state => state.favoriteList,
  playHistory: state => state.playHistory,
  searchHistory: state => state.searchHistory
}

export default getters