<template>
  <section class="screen-main">
    <keep-alive>
      <router-view />
    </keep-alive>
  </section>
</template>

<script>
export default {
  name: "ScreenMain",
};
</script>

<style scoped>
.screen-main {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>

