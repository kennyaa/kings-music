<template>
  <div class="search-box">
    <i class="icon icon-search">&#xe63c;</i>
    <input ref="query" class="box" v-model="query" :placeholder="placeholder"/>
    <i v-show="query" @click="clear" class="icon icon-search">&#xe651;</i>
  </div>
</template>

<script>
  import {debounce} from "../../../common/util"
export default {
  name: "SearchBox",
  props:{
    placeholder:{
      type: String,
      default: '搜索歌曲,歌手.....'
    }
  },
  data(){
    return{
      query: ''
    }
  },
  methods:{
    clear(){
      this.query = ''
    },
    setQuery(query){
       this.query = query
    },
    blur(){
      this.$refs.query.blur()
    }
  },
  created(){
    this.$watch('query',debounce(newquery => {
      this.$emit('query',newquery)
    },400))
  }
};
</script>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 8px;
  height: 35px;
  background: #add8e6;
}
.icon-search {
  font-size: 24px;
  color: #FFFFFF;
}
.box {
  flex: 1;
  margin: 0 5px;
  line-height: 25px;
  background: #add8e6;
  box-sizing: border-box;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  outline: 0;
}
</style>