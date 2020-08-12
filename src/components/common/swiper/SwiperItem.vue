<template>
    <div class="slide">
      <slot></slot>
    </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;
  }

  .slide img {
    margin-top: 2px;
    width: 100%;
    border-radius: 20px;
    height: 190px;
    text-align: center;
  }
</style>
