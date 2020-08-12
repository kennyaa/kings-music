<template>
  <div id="songlist">
    <div class="songitem" v-for="(item,index) in songlist" :key="index">
      <div class="song-img">
        <img v-lazy="item.coverImgUrl" />
      </div>
      <div class="song-tabber">
        <div class="song-tab">
          <span>{{item.name}}</span>
        </div>
        <div class="song-description">{{item.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongList",
  props: {
    songlist: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods:{
  }
};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
#songlist {
  display: flex;
  align-items: center; /*垂直*/
  flex-wrap: wrap; /*超出宽度强制换行*/
  width: 100%;
  height: 100%;
  position: relative;
}
.songitem {
  display: flex;
  width: 100%;
  height: 20%;
  margin: 10px 0 10px 0;
}
.song-img {
  width: 20%;
  height: 20%;
  margin: 0 10px 0 10px;
}
.song-img img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.song-tabber {
  width: 80%;
  height: 20%;
  float: right;
}
.song-tab {
  width: 100%;
  margin-bottom: 3px;
  font-size: 15px;
  height: 10%;
  font-weight: 900;
  color: #ffffff;
  overflow:hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.song-description {
  font-size: 10px;
  height: 10%;
  padding-top: 3px;
  width: 100%;
  line-height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>