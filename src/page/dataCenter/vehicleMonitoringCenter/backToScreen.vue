<!--
 * @Description: 
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2022-01-05 14:30:49
 * @LastEditors: lijiancong
 * @LastEditTime: 2022-01-05 16:18:40
-->
<template>
  <div
    class="back-to-screen el-icon-back"
    v-if="isDatascreen"
    @click="back"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      isDatascreen: window.localStorage.getItem("Datascreen") == "Datascreen"
    };
  },
  methods: {
    back() {
      this.$router.push("/Datascreen");
    }
  }
};
</script>

<style scoped>
.back-to-screen {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 100;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #002222;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  cursor: pointer;
  opacity: 0.8;
}
</style>
