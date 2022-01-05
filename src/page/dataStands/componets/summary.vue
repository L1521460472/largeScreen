<template>
  <div class="summary-wrap">
    <Icons :is-mode-show="isModeShow" :is-bubble-hide="isBubbleHide" @visibleClick="visibleClick" @modeClick="modeClick" @bubbleVisibleClick="bubbleVisibleClick" @aiClick="aiClick" @whiteClick="whiteClick" />
    <div class="summary-box">
      <div class="summary-block">
        <div class="sum-item">{{ mapData.dailyWastePro }}</div>
        <div class="title">今日产废(吨)</div>
      </div>
      <div class="summary-block">
        <div class="sum-item">{{ mapData.dailyDispositionPro }}</div>
        <div class="title">今日处置(吨)</div>
      </div>
      <div class="summary-block">
        <div class="sum-item">{{ mapData.runningCarNum }}</div>
        <div class="title">在运车辆(辆)</div>
      </div>
      <div class="summary-block">
        <div class="sum-item">{{ mapData.workloadNum }}</div>
        <div class="title">今日调度工单</div>
      </div>

    </div>
  </div>
</template>

<script>
import Icons from './icons'
export default {
  components: {
    Icons
  },
  props: {
    mapData: {
      type: Object,
      default: () => ({})
    },
    isBubbleHide: {
      type: Boolean,
      default: false
    },
    isModeShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
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
.summary-wrap{
    position: absolute;
    bottom: 0;
    left: 0;
    right:0;
    pointer-events: none !important;
}
.summary-box{
    display: flex;
    justify-content: space-between;
    // background: rgba(0, 0, 0, .2);
    z-index: 99;
    .summary-block{
        flex: 1;
        margin: 20px 0;
        padding: 16px;
        width: 160px;
        height: 160px;
        box-sizing: content-box;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        &::before{
            content: '';
            position: absolute;
            z-index: -1;
            width: 160px;
            height: 160px;
            background: url(~@/assets/img/circl-bg.png) no-repeat center;
            background-size: contain;
            animation: rotate 10s linear infinite;
            transform-origin: center;
        }
        .sum-item{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30px;
            color: #F9CA0BFF;
            font-weight: bold;
        }
        .title{
            display: flex;
            align-items: flex-end;
            justify-content: center;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
            font-weight: bold;
        }
    }
}
</style>

<style>
@keyframes rotate{
    0%{
        transform: rotateZ(0deg) scale(1);
        opacity: 1;
    }
    50%{
        transform: rotateZ(180deg) scale(.8);
        opacity: 0.5;
    }
    100%{
        transform: rotateZ(360deg) scale(1);
        opacity: 1;
    }
}
</style>
