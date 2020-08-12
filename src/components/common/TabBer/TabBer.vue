<template>
  <div class="tab-ber">
    <router-link tag="div" class="tab-ber-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-ber-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-ber-item" to="/ranking">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-ber-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "TabBer",
    props:{
      to:{
        type:String
      }
    }
  }
</script>

<style scoped>
  .tab-ber{
    display: flex;
    height: 35px;
    line-height: 35px;
    border-bottom: 2px solid #E3E3E3; 
  }
  .tab-ber-item{
    flex: 1;
    text-align: center;
    background: #98FB98;
    color: red;
  }
  .router-link-exact-active span{
    border-bottom: 3px solid red;
    color: red;
    margin-top: 7px;
  }
</style>