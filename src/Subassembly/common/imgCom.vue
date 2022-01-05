<template>
  <div style="height:40px">
    <div class="image_list" v-if="true">
      <el-image
        style="width: 100px; height: 100px"
        :src="item"
        :preview-src-list="list"
      >
      </el-image>
    </div>
    <!-- <el-image v-else class="image_list">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image> -->
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    item: {
      type: String,
      default: "",
    },
  },
  mounted() {
    console.log(this.list, this.item);
  },
};
</script>