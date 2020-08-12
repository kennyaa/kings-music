<template>
  <div id="suggest">
    <scroll
      :data="searchItem"
      ref="suggest"
      class="suggest-scroll"
      :pullup="pullup"
      :beforeScroll="beforeScroll"
      @scrollToEnd="searchMore"
      @beforeScroll="listScroll"
    >
      <ul class="suggest-list">
        <li class="suggest-item" 
          @click="selete(item)"
          v-for="(item,index) in searchItem" :key="index">
          <div class="icon">
            <i class="icon">&#xe734;</i>
          </div>
          <div class="name">
            <p class="text">{{item.artists[0].name}}-{{item.name}}</p>
          </div>
        </li>
        <load v-show="hasMore"></load>
      </ul>
      <div class="no-result-wrapper" v-show="!searchItem">
        <span>抱歉，暂无搜索结果</span>
      </div>
    </scroll>
    <router-view />
  </div>
</template>

<script>
import Scroll from "common/scroll/Scroll";
import Load from "common/load/Load";

import Axios from "network/axios";

import { mapMutations } from "vuex"
export default {
  name: "Suggest",
  components: {
    Scroll,
    Load
  },
  props: {
    query: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchItem: [],
      limit: 20,
      pullup: true,
      hasMore: true,
      beforeScroll:true
    };
  },
  methods: {
    search() {
      this.hasMore = true;
      return Axios("/search", {
        keywords: this.query,
        limit: this.limit,
      }).then(res => {
        this.searchItem = res.result.songs;
        this._check(res.result);
      });
    },
    selete(item) {
      this.$emit('select',item)
    },
    searchMore() {
      if (!this.hasMore) {
        return;
      }
      this.page++;
      return Axios("/search", {
        keywords: this.query,
        limit: this.limit + 20,
      }).then(res => {
        this.searchItem = this.searchItem.concat(res.result.songs);
        this._check(res.result);
      });
    },
    _check(data) {
      if (data.songs.length < 19) {
        this.hasMore = false;
      }
    },
    listScroll(){
      this.$emit('listScroll')
    },
    ...mapMutations({
      setSearch: 'SET_SEARCH_HISTORY'
    })
  },
  watch: {
    query(newQuery) {
      this.search();
    }
  }
};
</script>

<style scoped>
#suggest {
  height: 100vh;
  overflow: hidden;
}
.suggest-item {
  display: flex;
  align-items: center;
  width: 100%;
  line-height: 40px;
  color: #5cacee;
  border-bottom: 1px solid #969696;
  margin: 5px;
}
.icon {
  width: 30px;
  font-size: 18px;
  color: #48d1cc;
}
.name {
  flex: 1;
  font-size: 16px;
  overflow: hidden;
}
.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.no-result-wrapper {
  position: absolute;
  width: 100%;
  top: 40%;
  transform: translateY(-50%);
  color: #ffffff;
  text-align: center;
}
.suggest-scroll {
  height: calc(100% - 100px);
  overflow: hidden;
}
</style>