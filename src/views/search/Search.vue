<template>
  <div id="search">
    <div class="search-box">
      <search-box @query="search" ref="searchBox"/>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll>
          <div class="hot-key">
            <span class="title">热门搜索</span>
            <ul>
              <li
                class="item"
                v-for="(item, index) in hots"
                :key="index"
                @click="addQuery(item.first)"
              >
                <span>{{item.first}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history">
              <span class="text">搜索历史</span> 
               <i class="icon clearicon">&#xe699;</i>
          </div>
          <div class="search-list" v-show="searchHistory.length > 0">
             <div class="list-item" v-for="(item,index) in searchHistory" :key="index">
                <div>
                    <span>{{item}}</span>
                </div>
                <div>
                   <i class="icon">&#xe60c;</i>
                </div>
             </div>
          </div>
      </scroll>
    </div>
    <div v-show="query">
    <suggest @select="searchSong" @listScroll="blurInput" :query="query"/>
    </div>
  </div>
</template>

<script>
  import SearchBox from "./childComps/SearchBox"
  import Scroll from "common/scroll/Scroll"
  import Suggest from "./childComps/Suggest"

  import Axios from "network/axios";

  import { mapActions, mapGetters } from "vuex"
export default {
  name: "Search",
  data() {
    return {
      hots: [],
      query: ''
    };
  },
  components: {
    SearchBox,
    Scroll,
    Suggest
  },
  methods: {
    search(query) {
      this.query = query
    },
    addQuery(query){
      this.$refs.searchBox.setQuery(query)
    },
    getHots() {
      return Axios("/search/hot").then(res => {
        this.hots = res.result.hots;
      })
    },
    searchSong(song){
       this.$store.dispatch('selectPlay', song)
    },
    blurInput(){
        this.$refs.searchBox.blur()
    },
    ...mapActions([
      "selectPlay"
    ]),
    ...mapGetters([
      "searchHistory"
    ])
  },
  created() {
    this.getHots();
  },
  watch: {
          
  }
};
</script>

<style scoped>
#search {
  background: #add8e6;
  height: 100vh;
  overflow: hidden;
}
.shortcut-wrapper {
  position: fixed;
  top: 100px;
  width: 100%;
}
.shortcut {
  height: calc(100% - 80px);
  overflow: hidden;
}
.hot-key {
  margin: 0 auto;
}
.item {
  display: inline-block;
  align-items: center;
  margin: 5px 5px 5px 10px;
  padding: 5px;
  border-radius: 6px;
  background: #607B8B;
  font-size: 14px;
  color: hsla(0, 0%, 100%, 0.3);
}
.search-history {
  position: relative;
  margin: 5px;
}
.title {
  display: flex;
  align-items: center;
  height: 35px;
  font-size: 18px;
  color: #FFFFFF;
  margin: 10px 0 0 10px;
}
.clearicon{
  float: right;
  font-size: 25px;
  line-height: 25px;
}
.search-result {
  position: fixed;
  width: 100%;
  top: 360px;
  bottom: 0;
}
.text{
  height: 35px;
  font-size: 18px;
  color: #FFFFFF;
  margin: 5px;
}
.search-list{
  position: relative;
  margin: 5px;
}
</style>