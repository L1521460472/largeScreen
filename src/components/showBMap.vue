<template>
  <div class="w100 h100">
    <div ref="container" class="allmap pr"></div>
  </div>
</template>
<script>
export default {
  props: {
    mapdata: {
      type: Array,
    },
    Zoom: {
      type: Number,
    },
  },
  data() {
    return {
      map: "",
      BMap: "",
    };
  },
  components: {},
  methods: {
    BMPGL(ak) {
      return new Promise(function (resolve, reject) {
        window.init = function () {
          resolve(BMap);
        };
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `//api.map.baidu.com/api?v=3.0&ak=${ak}&callback=init`;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
    init() {
      let res = {};
      res.map = this.map;
      res.BMap = this.BMap;
      this.$emit("init", res);
    },
  },
  mounted() {
    // 注意地图的初始化要写在mounted里面。
    this.$nextTick(function () {
      let _this = this;
      this.BMPGL("GFf2VlO85h9tRSNChNRMf7uy9L1zCwZh").then((BMap) => {
        this.BMap = BMap;
        var map = new BMap.Map(this.$refs.container);
        map.centerAndZoom(
          new BMap.Point(113.869117, 22.581735),
          this.Zoom || 12
        );
        map.enableScrollWheelZoom(true);
        map.addControl(new BMap.NavigationControl());
        this.map = map;
        this.init();
      });
    });
  },
};
</script>
<style scoped>
.w100.h100 {
  width: 100%;
  height: 100%;
}
.map,
.allmap {
  width: 100%;
  height: 100%;
}
</style>
