<template>
    <div id="singer-detail">
      <music-list 
        :singersong="singersong" 
        :bg-image="bgImage" 
        :title="title" />
    </div>
</template>

<script>
import MusicList from "./childComps/MusicList";

import song from "../../common/song";

import Axios from "network/axios";
export default {
  name: "SingerDetail",
  data() {
    return {
      singersong: [],
      bgImage: "",
      title: ""
    };
  },
  components: {
    MusicList
  },
  created() {
    this.getsingerlist();
  },
  methods: {
    getsingerlist() {
      if (!this.$route.params.id) {
        this.router.push("/singer")
        return
      }
      return Axios("/artists", { id: this.$route.params.id }).then(res => {
        this.singersong = res.hotSongs
        this.bgImage = res.artist.img1v1Url
        this.title = res.artist.name
      });
    }
  }
};
</script>

<style scoped>
</style>