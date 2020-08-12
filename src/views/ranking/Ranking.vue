<template>
  <div id="ranking">
      <rank-list :ranking="ranking" @select="ranksong" />
        <router-view />
  </div>
</template>

<script>
import RankList from "./childComps/RankList";

import Axios from "network/axios";

export default {
  name: "Ranking",
  data() {
    return {
      ranking: []
    };
  },
  components: {
    RankList
  },
  created() {
    this.getranking();
  },
  methods: {
    getranking() {
      return Axios("/toplist/detail").then(res => {
        this.ranking = res.list;
        res.list.length = 10;
      });
    },
    ranksong(rank) {
      this.$router.push({
        path: `/ranking/${rank.id}`
      });
    }
  }
};
</script>

<style scoped>
#ranking {
  position: relative;
  background: #add8e6;
}
</style>