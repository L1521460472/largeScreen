<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="formVisible"
      :width="width"
      :modal="true"
      center
      :show-close="false"
      :append-to-body="true"
    >
      <el-form
        ref="form"
        @submit.native.prevent="submitForm"
        :labelPosition="'center'"
        :labelWidth="labelWidth"
        :model="form"
        :rules="rules"
      >
        <slot></slot>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm"
          ><i class="el-icon-check"></i>确定</el-button
        >
        <el-button @click="$emit('update:visible', false)"
          ><i class="el-icon-close"></i>关闭</el-button
        >
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
      default: "500px",
    },
    labelWidth: {
      type: String,
      default: "120px",
    },
    // values: {
    //   type: Object,
    //   default: () => ({}),
    // },
    form: {
      type: Object,
    },
    rules: {
      type: Object,
    },
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
  created() {
    console.log(this.rules);
  },
  methods: {
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log("------------------------------", valid);
          this.$emit("submitFomn");
        }
      });
    },
  },
};
</script>