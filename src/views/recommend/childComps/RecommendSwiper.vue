<template>
  <swiper>
    <swiper-item v-for="(item,index) in bananer" :key="index">
      <div><img v-lazy="item.imageUrl"></div>
    </swiper-item>
  </swiper>
</template>

<script>
  import Swiper from "common/swiper/Swiper"
  import SwiperItem from "common/swiper/SwiperItem"

export default {
    name:"RecommendSwiper",
    components:{
       Swiper,
       SwiperItem
    },
    props:{
      bananer:{
        type: Array,
        default(){
          return []
        }
      }
    },
    methods:{
    }
}
</script>

<style scoped>

</style>