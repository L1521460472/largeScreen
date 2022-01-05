<template>
    <div class="icons">
        <div class="icon-item icon-ai" v-if="isDataScreen" @click="aiClick"></div>
        <div class="icon-item icon-visible" :class="{hide: isHide}" @click="visibleClick"></div>
        <div class="icon-item icon-bubble" :class="{hide: isBubbleHide}" @click="bubbleVisibleClick"></div>
        <div class="icon-item icon-mode" v-if="isModeShow" @click="modeClick"></div>
        <div class="icon-item icon-skin" @click="whiteClick"></div>
    </div>
</template>

<script>
export default {
  props:{
    isHide:{
      type: Boolean,
      default: false
    },
    isBubbleHide:{
      type: Boolean,
      default: false
    },
    isModeShow:{
      type: Boolean,
      default: false
    }
  },
  data() {
      return {
          isDataScreen: this.$route.path == '/Datascreen'
      }
  },
  methods:{
    visibleClick() {
        this.$emit('visibleClick')
    },
    bubbleVisibleClick() {
        this.$emit('bubbleVisibleClick')
    },
    modeClick() {
        this.$emit('modeClick')
    },
    aiClick() {
        this.$emit('aiClick')
    },
    whiteClick() {
        this.$emit('whiteClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.icons{
    position: absolute;
    bottom: 212px;
    right: 0;
    .icon-item{
        margin-top: 8px;
        width: 34px;
        height: 34px;
        border-radius: 4px;
        background: #042242;
        border: 1px dashed rgba(94, 110, 128, 0.9);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        pointer-events: all;
        cursor: pointer;
    }
    .icon-ai{
        background-image: url(~@/assets/img/icon-ai.png);
    }
    .icon-visible{
        background-image: url(~@/assets/img/icon-hide.png);
    }
    .icon-visible.hide{
        background-image: url(~@/assets/img/icon-visible.png);
    }
    .icon-skin{
        background-image: url(~@/assets/img/icon-skin.png);
    }
    .icon-bubble{
        background-image: url(~@/assets/img/icon-bubble-hide.png);
    }
    .icon-bubble.hide{
        background-image: url(~@/assets/img/icon-bubble-visible.png);
    }
    .icon-mode{
        background-image: url(~@/assets/img/icon-mode.png);
    }
}
</style>