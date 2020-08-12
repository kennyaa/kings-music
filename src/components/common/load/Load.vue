<template>
  <div class="loading-container">
    <img src="../../../assets/img/load.gif">
  </div>
</template>
<script>
const COMPONENT_NAME = 'loading'
export default {
  name: COMPONENT_NAME
}
</script>
<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 20px;
  height: 20px;
  display: block;
}
</style>