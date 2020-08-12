<template>
  <div class="header">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  width: 100%;
  font-size: 20px;
  line-height: 40px;
  color: white;
  height: 40px;
  background: #8deeee;
  border-bottom: 2px solid #e3e3e3;
  text-align: center;
}
.left {
  width: 20%;
  text-align: center;
}
.right {
  width: 20%;
  text-align: center;
}
.center {
  width: 60%;
  text-align: center;
}
</style>