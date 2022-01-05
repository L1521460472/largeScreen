<template>
  <div class="container-dashboard" :class="{ white: isWhite }">
    <div class="container-main">
      <EchartsMap ref="map" :map-data="mapData" :map.sync="map" />
      <div v-show="!isHide && !isVMode" class="layer-charts">
        <div class="charts-left">
          <Pie
            ref="pie"
            class="charts-container"
            :is-white="isWhite"
            :data-cfg="outWasteWeightList"
          />
          <BrokenLine
            ref="brokenLine"
            class="charts-container"
            :is-white="isWhite"
            :data-cfg="Rectangular[0]"
          />
          <Cylindrical
            ref="cylindrical"
            class="charts-container"
            :is-white="isWhite"
            :data-cfg="Rectangular[1]"
          />
        </div>
        <div class="charts-middle">
          <Summary
            class="charts-container"
            :is-mode-show="isModeShow"
            :map-data="mapData"
            :is-bubble-hide="isBubbleHide"
            @visibleClick="visibleClick"
            @bubbleVisibleClick="bubbleVisibleClick"
            @modeClick="modeClick"
            @whiteClick="whiteClick"
          />
        </div>
        <div class="charts-rigth">
          <Triangle
            ref="triangle"
            class="charts-container"
            :is-white="isWhite"
            :data-cfg="Rectangular[2]"
          />
          <Rotation class="charts-container" :data-cfg="wasteTransRecordResp" />
        </div>
      </div>
      <Vehicle
        v-show="!isHide && isVMode && map"
        ref="vehicle"
        :is-white="isWhite"
        :map-data="mapData"
        :map="map"
        :is-bubble-hide="isBubbleHide"
        @unitsCheck="unitsCheck"
      >
        <Summary
          class="charts-container"
          :is-mode-show="isModeShow"
          :map-data="mapData"
          :is-bubble-hide="isBubbleHide"
          @visibleClick="visibleClick"
          @bubbleVisibleClick="bubbleVisibleClick"
          @modeClick="modeClick"
          @whiteClick="whiteClick"
        />
      </Vehicle>
      <div v-if="isHide" class="layer-empty">
        <Icons
          :is-mode-show="isModeShow"
          :is-hide="isHide"
          :is-bubble-hide="isBubbleHide"
          @visibleClick="visibleClick"
          @bubbleVisibleClick="bubbleVisibleClick"
          @modeClick="modeClick"
          @whiteClick="whiteClick"
        />
      </div>
    </div>
    <waste-type-sum
      v-if="isWasteTypeSum"
      :id="wasteTypeId"
      @wastetype="wasteTypeFn"
    />
    <div id="get-size-box" />
  </div>
</template>

<script>
import mixins from "@/page/dataStands/mixins";
import "@/page/dataStands/css/skin.scss";
import baiduMapStyle from "./js/baiduMapStyle";
import baiduMapStyle2 from "./js/baiduMapStyle2";

export default {
  name: "DataStands",
  components: {},
  mixins: [mixins],
  data() {
    return {
      isHide: false,
      isBubbleHide: false,
      isVMode: false,
      isWhite: false,
      map: null,
      isWasteTypeSum: false,
      wasteTypeId: "",
      isActivated: false,

      interval: null,
      isResizeInHide: false
    };
  },
  watch: {
    isHide: {
      handler: function(val) {
        this.resizeHandle();
      }
    },
    isVMode: {
      handler: function(val) {
        this.resizeHandle();
      }
    }
  },
  mounted() {
    this.interval = setInterval(this.refreshCall, 15000);
    window.addEventListener("resize", this.resizeEvent);
  },
  beforeDestroy() {
    clearInterval(this.interval);
    window.removeEventListener("resize", this.resizeEvent);
  },
  activated() {
    if (this.isActivated) {
      this.refreshCall();
      this.interval = setInterval(this.refreshCall, 15000);
      this.isActivated = false;
    }
  },
  deactivated() {
    clearInterval(this.interval);
    this.isActivated = true;
  },
  methods: {
    resizeEvent() {
      if (this.isHide || this.isVMode) {
        this.isResizeInHide = true;
      }
    },
    resizeHandle() {
      if (this.isResizeInHide && !this.isHide && !this.isVMode) {
        this.$nextTick(() => {
          this.$refs.pie.$__resizeChartMethod();
          this.$refs.brokenLine.$__resizeChartMethod();
          this.$refs.cylindrical.$__resizeChartMethod();
          this.$refs.triangle.$__resizeChartMethod();
        });
        this.isResizeInHide = false;
      }
    },
    visibleClick() {
      this.isHide = !this.isHide;
    },
    bubbleVisibleClick() {
      if (this.$refs.vehicle) {
        this.$refs.vehicle.toggleCarBubble(this.isBubbleHide);
      }
      this.isBubbleHide = !this.isBubbleHide;
    },
    modeClick() {
      if (this.isHide) {
        this.visibleClick();
        return;
      }
      this.isVMode = !this.isVMode;
    },
    whiteClick() {
      this.$showLoading();
      if (!this.isWhite) {
        this.$refs.map.map.setMapStyleV2({ styleJson: baiduMapStyle2 });
      } else {
        this.$refs.map.map.setMapStyleV2({
          styleJson: baiduMapStyle.baiduMapStyle
        });
      }
      setTimeout(() => {
        this.isWhite = !this.isWhite;
        this.$hideLoading();
      }, 800);
    },
    unitsCheck(data) {
      this.mapDataFilter = data;
      this.setMapData();
    },
    wasteTypeFn() {
      this.isWasteTypeSum = false;
    },
    refreshCall() {
      this.init().then(() => {
        this.$nextTick(() => {
          if (this.$refs.vehicle) {
            this.$refs.vehicle.getCarList();
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.container-dashboard {
  position: relative;
  width: 100%;
  height: calc(100vh - 85px);
  .container-main {
    height: 100%;
    padding: 0;
    display: flex;
    position: relative;
    .layer-charts {
      padding: 12px;
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      pointer-events: none;
    }
    .charts-left {
      /* QQ浏览器兼容 */
      .pie-container {
        height: 0;
      }
      .brokenLine-container {
        height: 0;
      }
      .cylindrical-container {
        height: 0;
      }
    }
    .charts-rigth {
      /* QQ浏览器兼容 */
      .triangle-container {
        height: 0;
        flex-basis: 40%;
      }
      .rotation-container {
        height: 0;
        flex-basis: 60%;
      }
    }
    .charts-left {
      flex-basis: 20%;
    }
    .charts-rigth {
      flex-basis: 24%;
    }
    .charts-middle {
      flex: 1;
      margin: 0 12px;
      position: relative;
    }
    .charts-container {
      flex: 1;
      pointer-events: all;
      user-select: none;
      border-radius: 4px;
      opacity: 0.8;
    }
    .charts-left,
    .charts-rigth {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .charts-container {
        margin-bottom: 12px;
        position: relative;
        background: #042242;
      }
      .charts-container:last-child {
        margin-bottom: 0;
      }
    }
    .charts-middle {
      .charts-container {
        position: absolute;
        background: transparent;
      }
    }

    .layer-empty {
      margin: 12px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      pointer-events: none;
    }
  }
}
</style>
<style lang="scss">
.container-dashboard {
  .charts-left,
  .charts-rigth {
    .charts-container {
      .panel-tit {
        position: relative;
        height: 32px;
        line-height: 32px;
        padding: 0 14px;
        font-size: 15px;
        background: url(~@/assets/img/dataScreen/title-bg-left.png) no-repeat
          left center;
        background-size: contain;
        color: #fff;
        text-align: left;
        // margin-bottom: 10px;
        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          height: 32px;
          width: 100px;
          background: url(~@/assets/img/dataScreen/title-bg-right.png) no-repeat
            right center;
          background-size: contain;
        }
      }
    }
  }
}
</style>
