<template>
  <div id="song-list">
    <div class="item" @click="seleteItem(song,index)" 
       v-for="(item,index) in song" :key="index">
      <div class="content" @click="_play(item)">
        <span class="name">{{item.name}}</span>
        <span>{{getDesc(item)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex"
export default {
  name: "SongList",
  props: {
    song: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    seleteItem(item,index){
      this.$emit('select',item,index)
    },
    getDesc(song) {
      const singer = song.ar && song.ar[0].name;
      const album = song.al && song.al.name;
      return `${singer}·${album}`;
    },
     _play(song) {
      this.$store.dispatch('selectPlay', song)
    },
    ...mapActions([
        'selectPlay'
    ])
  }
};
</script>

<style scoped>
#song-list {
  position: relative;
}
.item {
  height: 50px;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: 	#FFFFFF;
  margin: 0 0 0 10px;
  line-height: 14px;
}
.content {
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 5px;
}
.content span{
  display:block;
  margin: 4px;
}
.name{
  font-size: 17px;
  padding-bottom: 5px;
  color: #7EC0EE;
}
</style>