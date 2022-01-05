<template>
  <div class="dialog">
    <el-dialog
      :title="title"
      :visible.sync="formVisible"
      :width="width"
      :modal="false"
    >
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    width: {
      type: String,
      default: "800px",
    },
    // customWidth:{
    //   type: String,
    //   default: "",
    // },
    labelWidth: {
      type: String,
      default: "80px",
    },
    // values: {
    //   type: Object,
    //   default: () => ({}),
    // },
    // rules: {
    //   type: Object,
    // },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formVisible: {
      get() {
        return !!this.visible;
      },
      set(v) {
        this.$emit("update:visible", v);
      },
    },
  },
  methods: {},
};
</script>

<style>
  .customWidth{
    width:80%;
  }
</style>
