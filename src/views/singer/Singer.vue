<template>
  <div id="singer"> 
      <singers-list @select="selete" :singers="singers" /> 
  <router-view/>
  </div>
</template>

<script>
import SingersList from "./childComps/SingersList";
import SingerNav from "./childComps/SingerNav";

import { getPinYinFirstCharacter } from "../../common/pinyin";
import singer from "../../common/singer";

import Axios from "network/axios";

const HOT_NAME = "热门";
const HOT_SINGER = 300;

export default {
  name: "Singer",
  components: {
    SingersList,
    SingerNav
  },
  data() {
    return {
      singers: []
    };
  },
  created() {
    this.getsingers(); 
    /* this.$bus.$on('ImagesLoad',() => {
      this.$refs.singerView.refresh()
    });*/
  },
  methods: {
    selete(singer){
      this.$router.push({
        path: `/singer/${singer.id}`
      })
    },
    getsingers() {
      return Axios("/artist/list", { limit: 80, area: 7}).then(res => {
        this.singers = this.gethotsinger(res.artists);
      });
    },
    gethotsinger(artists) {
      //创建map来接收热门的数据
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      //遍历artists，当item.misicSize超过300就是我们需要的热门数据
      artists.forEach((item, index) => {
        if (item.musicSize > HOT_SINGER) {
          map.hot.items.push(
            new singer({
              name: item.name,
              id: item.id,
              avatar: item.img1v1Url
            })
          );
        }
        //把item转化成拼音，方便以后做排序
        const key = getPinYinFirstCharacter(item.name.charAt(0), "", true);
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new singer({
            name: item.name,
            id: item.id,
            avatar: item.img1v1Url
          })
        );
      });
      // 为了得到有序列表，我们需要处理 map
      let ret = [];
      let hot = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    }
  }
};
</script>

<style scoped>
#singer {
  position: relative;
  background: #add8e6;
  height: 100vh;
}
</style>