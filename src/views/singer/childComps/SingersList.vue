<template>
<div id="singers">
   <scroll class="content" ref="singerView" :data="singers">
      <ul>
        <li class="titleItem" v-for="title in singers" :key="title.index" ref="listGroup">
          <div class="title">
            <span>{{title.title}}</span>
          </div>
          <ul>
            <li @click="seleteItem(item)" class="singerItem" v-for="(item,index) in title.items" :key="index">
              <div class="items-img">
                <img v-lazy="item.avatar"/>
              </div>
              <div class="items-span">
                <span>{{item.name}}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
   </scroll>
  </div>
</template>

<script>
  import Scroll from "common/scroll/Scroll";
export default {
  name: "SingersList",
  components: {
  },
  props: {
    singers: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods:{
    seleteItem(item){
      this.$emit('select',item)
    },
    singerView() {
      this.$refs.singerView.refresh();
    },
  },
  components:{
    Scroll
  }
};
</script>

<style scoped>
#singers {
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center; /*垂直*/
  flex-wrap: wrap;     /*当宽度不够的时候自动换行*/ 
}
.titleItem {
  width: 100%;
}
.singerItem {
  display: flex;
  width: 100%;
  margin: 3px 0 0 3px;
}
.title {
  width: 100%;
  height: 30%;
  font-size: 20px;
  padding: 0 0 0 10px;
  color: #40e0d0;
  background: #bfefff;
}
.items-img {
  width: 20%;
  height: 10%;
  margin: 0 20px 0 0;
  padding: 0 0 0 10px;
}
.singerItem img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.items-span {
  width: 80%;
  height: 10%;
  line-height: 60px;
  color: #ffffff;
}
.content {
  height: calc(100% - 79px);
  overflow: hidden;
}
</style>