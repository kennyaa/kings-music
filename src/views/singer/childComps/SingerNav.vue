<template>
  <div id="list-shortcut" @touchstart="onShortcutTouchStart" @touchMove="onShortcutTouchMove">
    <ul>
      <li class="shortcut-item" 
        v-for="(item,index) in  shortcutList" 
        :data-index="index" 
        :key="item.id"
        >
        {{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SingerNav",
  props: {
    song: {
      type: Array,
      default() {
        return [];
      }
    }
  },
   computed:{
   shortcutList() {
      return this.song.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  }
};
</script>

<style scoped>
#list-shortcut {
  position: absolute;
  z-index: 200;
  right: 0;
  bottom: 40%;
  width: 20px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
.shortcut-item {
  padding: 3px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  list-style-type:none;
}
</style>