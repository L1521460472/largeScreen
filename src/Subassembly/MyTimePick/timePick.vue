<template>
  <div
    class="wrap"
    ref="wrap"
    :style="{
      width: width + paddingWidth + 'px',
      paddingLeft: paddingWidth + 'px',
      paddingRight: paddingWidth + 'px',
    }"
  >
    <i
      class="left"
      :class="iconLeft"
      @click="clickIcon"
      :style="{ width: paddingWidth + 'px', fontSize: iconWidth + 'px' }"
    ></i>
    <div
      :class="scrollShow ? 'contannerScroll' : 'container'"
      :style="{ width: width + 'px' }"
    >
      <ul class="list_container" ref="content" id="content">
        <li
          v-for="(item, index) in List"
          :key="Math.round(Math.random() * 10) + '' + index"
          @click.stop="handleClickLi(item, index)"
          class="item"
        >
          <slot v-bind="item"></slot>
          <i
            class="el-icon-circle-close"
            @click.stop="handleDelete(item, index)"
          ></i>
        </li>
      </ul>
    </div>
    <i
      class="right"
      :class="iconRight"
      @click.stop="clickIcon"
      :style="{ width: paddingWidth + 'px', fontSize: iconWidth + 'px' }"
    ></i>
  </div>
</template>
<script>
export default {
  props: {
    List: {
      type: Array,
      default: () => {
        return [];
      },
    },
    width: {
      type: Number,
      default: 200,
    },
    paddingWidth: {
      type: Number,
      default: 34,
    },
    iconWidth: {
      type: Number,
      default: 16,
    },
    iconRight: {
      type: String,
      default: "el-icon-arrow-down",
    },
    iconLeft: {
      type: String,
      default: "el-icon-time",
    },
  },
  data() {
    return {
      swipperWidth: 0,
    };
  },
  mounted() {},
  computed: {
    scrollShow() {
      return this.List.length > 2 ? true : false;
    },
  },
  methods: {
    handleClick() {
      this.$emit("handleClick");
    },
    handleClickLi(item, index) {
      console.log("moto~ moto~ kimoji!");
      this.$emit("handleClickLi", { item, index });
    },
    clickIcon() {
      let arrs = document.getElementsByClassName("el-time-panel");
      arrs.forEach((element) => {
        element.removeAttribute("style");
        element.style.display = "none";
      });
      this.$emit("clickIcon");
      console.log("你不要过来呀!");
    },
    handleDelete(item, index) {
      console.log("恩~~,雅蠛蝶!");
      this.$emit("handleDelete", { item, index });
    },
  },
};
</script>   
<style lang="scss" scoped>
/*滚动条*/
::-webkit-scrollbar {
  width: 4px;
  height: 5px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  background-color: #acacac;
  border-radius: 8px;
}
.wrap {
  position: relative;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-sizing: border-box;
  color: #606266;
  height: 28px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  .left {
    position: absolute;
    left: 0;
    color: #dcdfe6;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  .right {
    position: absolute;
    right: 0;
    color: #dcdfe6;
    display: flex;
    background: white;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  .contannerScroll {
    position: relative;
    display: inline-block;
    font-size: inherit;
    height: 28px;
    line-height: 41px;
    outline: 0;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    border-right: 1px solid #dcdfe6;
    border-left: 1px solid #dcdfe6;
    overflow-x: scroll;
    overflow-y: hidden;
    .list_container {
      position: absolute;
      height: 100%;
      left: 0;
      display: flex;
      margin: 0;
      padding: 0;
      align-items: center;
      margin: 0 5px;
      li {
        // width: 50px;
        height: 16px;
        border: 1px solid #dcdfe6;
        margin-right: 5px;
        list-style: none;
        border-radius: 5px;
      }
      .item {
        display: flex;
        align-items: center;
      }
      i {
        display: inline-block;
        margin: 0 5px;
      }
    }
  }
  .container {
    position: relative;
    display: inline-block;
    font-size: inherit;
    height: 28px;
    line-height: 41px;
    outline: 0;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    border-right: 1px solid #dcdfe6;
    border-left: 1px solid #dcdfe6;
    .list_container {
      position: absolute;
      height: 100%;
      left: 0;
      display: flex;
      margin: 0;
      padding: 0;
      align-items: center;
      margin: 0 5px;
      li {
        // width: 50px;
        height: 16px;
        border: 1px solid #dcdfe6;
        margin-right: 5px;
        list-style: none;
        border-radius: 5px;
      }
      .item {
        display: flex;
        align-items: center;
      }
      i {
        display: inline-block;
        margin: 0 5px;
      }
    }
  }
}
</style>