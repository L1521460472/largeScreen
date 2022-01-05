<template>
  <el-popover
    placement="right"
    title=""
    trigger="hover">
    <el-image slot="reference" :src="imageUrl" :alt="imageUrl" style="height: 55px;width: 60px"></el-image>
    <el-image :src="imageUrl" ></el-image>
  </el-popover>
</template>

<script>
    export default {
        name: "imgAlart",
      props:{
        imageUrl:{
            type:String
          }
      }
    }
</script>

<style scoped>

</style>
