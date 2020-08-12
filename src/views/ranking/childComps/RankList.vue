<template>
  <div id="ranklist">
    <scroll class="rank-list" ref="RankList" :data="ranking">
      <ul>
        <li class="rang-item" @click="rankItem(item)" 
        v-for="(item,index) in ranking" 
        :key="index"
        :class="itemClass(index)">
          <div class="rang-item" v-if="item.tracks.length > 0">
            <div class="rang-img">
              <img v-lazy="item.coverImgUrl" />
            </div>
            <div class="rang-song">
              <span
                v-for="(song,index) in item.tracks"
                :key="index"
              >{{index + 1}}.{{song.first}}-{{song.second}}</span>
            </div>
            <div class="rang-right">
              <span>></span>
            </div>
          </div>
          <div class="rang-item" v-else>
            <div class="rang-img">
              <img v-lazy="item.coverImgUrl" />
            </div>
            <div class="rang-song">
              <span>{{item.name}}</span>
              <span>{{item.updateFrequency}}</span>
            </div>
            <div class="rang-right">
              <span>></span>
            </div>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from "common/scroll/Scroll";

export default {
  name: "RankList",
  props: {
    ranking: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Scroll
  },
  methods: {
    rankItem(item) {
      this.$emit("select", item);
    },
    itemClass(index) {
      const random = Math.floor(Math.random() * 4 + 1)
      const obj = {
        '1': 'red',
        '2': 'green',
        '3': 'purple',
        '4': 'blue'
      }
      return obj[random]
    },
    RankList() {
      this.$refs.RankList.refresh();
    }
  }
};
</script>

<style scoped>
#ranklist {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #add8e6;
}
.rang-item {
  position: relative;
  display: flex;
  width: 100%;
  height: 10%;
  margin-top: 3px;
}
.rang-img {
  width: 27%;
  height: 10%;
  margin: 0 10px 0 10px;
}
.rang-item img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.rang-song {
  width: 63%;
  height: 10%;
  font-size: 15px;
  margin-top: 5px;
  color: #ffffff;
}
.rang-song span {
  margin: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.rang-right {
  width: 10%;
  height: 10%;
  font-size: 25px;
  color: #ffffff;
  margin: 20px 5px 0 0;
  text-align: center;
}
.rank-list {
  height: calc(100% - 75px);
  overflow: hidden;
}
</style>