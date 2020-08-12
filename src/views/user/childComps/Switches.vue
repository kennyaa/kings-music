<template>
  <ul class="switches">
    <li
      class="switch-item"
      v-for="(item,index) in switches"
      :key="index"
      :class="{'active': currentIndex === index}"
      @click="switchItem(index)"
    >
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Switches",
  props: {
    switches: {
      type: Array,
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem(index) {
      this.$emit("switch", index);
    }
  }
};
</script>

<style scoped>
.switches {
  display: flex;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid #2f3054;
  border-radius: 5px;
  margin-top: 10px;
}
.switch-item {
  flex: 1;
  padding: 8px;
  text-align: center;
  font-size: 14px;
  color: hsla(0, 0%, 100%, 0.3);
}
.active {
  background: #2f3054;
  color: #fff;
}
</style>