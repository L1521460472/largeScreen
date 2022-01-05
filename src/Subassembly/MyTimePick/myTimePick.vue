<template>
  <div class="myWrap" :style="{ width: width + 'px' }">
    <el-time-picker
      v-model="value1"
      :style="{ width: width + paddingWidth + 'px' }"
      ref="time"
      :picker-options="{
        format: 'HH:mm:ss',
      }"
      :default-value="defaultValue"
      @change="handleConfirm"
    ></el-time-picker>
    <timepick
      :List="List"
      @clickIcon="clickIcon"
      @handleDelete="handleDelete"
      @handleClickLi="handleClickLi"
      :width="width"
      :paddingWidth="paddingWidth"
      v-bind="$attrs"
    >
      <template v-slot="scope">
        <span class="time">{{ scope.time }}</span>
      </template>
    </timepick>
  </div>
</template>
<script>
import timepick from "./timePick";
export default {
  //参数：width 宽度;paddingWidth：左右图标快占位大小;
  props: {
    width: {
      type: Number,
      default: 200,
    },
    paddingWidth: {
      type: Number,
      default: 34,
    },
    timeList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isClear: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    timepick,
  },
  data() {
    return {
      value1: "",
      defaultValue: new Date(new Date().toLocaleDateString()).getTime(),
      List: JSON.parse(JSON.stringify(this.timeList)) || [],
      str: "",
      index: "",
      length: 0,
      popper: {
        zIndex: 2017,
        width: this.width + this.paddingWidth + "px",
        position: "absolute",
        top: 486 + "px",
        left: 8 + "px",
      },
    };
  },
  created() {
    console.log(this.width);
  },
  watch: {
    isClear(v) {
      if (!v) {
        this.List = [];
        this.value1 = "";
      }
    },
    length: {
      handler(v) {
        console.log(v);
        if (v === 0) {
          this.defaultValue = new Date(
            new Date(new Date().toLocaleDateString()).getTime()
          );
          this.$emit("getLength", { length: v, list: this.List });
        } else {
          this.$emit("getLength", { length: v, list: this.List });
          // this.length = 0;
        }
      },
      deep: true,
      immediate: true,
    },
    timeList: {
      handler(v) {
        // console.log(v);
        this.list = v;
        this.$set(this, "List", v);
        this.length = this.List.length;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    //点击图标弹出时间弹窗
    clickIcon(v) {
      this.$refs.time.focus();
      let arrs = document.getElementsByClassName("el-time-panel");
      arrs.forEach((element) => {
        // element.removeAttribute("style");
        // element.style.display = "none";
        element.style.width = this.popper.width;
        element.style.zIndex = this.popper.zIndex;
        element.style.position = this.popper.position;
        element.style.top = this.popper.top;
        element.style.left = this.popper.left;
      });
    },
    //删除时间
    handleDelete(v) {
      this.List.splice(v.index, 1);
      this.length = this.List.length;
    },
    //点击LI修改时间方法
    handleClickLi(v) {
      this.$refs.time.focus();
      this.str = "change";
      this.index = v.index;
    },
    //自定义时间格式化
    formatDate(v) {
      if (v) {
        let myDate = new Date(v);
        const hour = myDate.getHours();
        const minute = myDate.getMinutes();
        const second = myDate.getSeconds();
        // console.log(hour, minute, second);
        return [hour, minute, second]
          .map((v) => {
            v = v.toString();
            return v[1] ? v : "0" + v;
          })
          .join(":");
      }
    },
    //时间弹窗确定回调
    handleConfirm(v) {
      if (this.str === "change") {
        let value = this.List.find((item, index) => {
          return index === this.index;
        });
        value.time = this.formatDate(v);
        this.index = "";
        this.str = "";
      } else {
        let time = this.formatDate(v);
        this.List.push({ time });
        this.length = this.List.length;
      }
      // this.$emit("getLength", { length: v, list: this.List });
      this.$nextTick(() => {
        let arrs = document.getElementsByClassName("el-time-panel");
        arrs.forEach((element) => {
          element.removeAttribute("style");
          element.style.display = "none";
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.myWrap {
  position: relative;
  height: 38px;
  /deep/.el-date-editor {
    position: absolute;
    left: 0;
    top: -1px;
    height: 38px;
    .el-input__inner {
      border: 0;
    }
  }
}
.time {
  white-space: nowrap;
}
</style>