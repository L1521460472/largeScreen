<template>
  <div class="wrap">
    <div class="map_wrap">
      <div class="input_wrap">
        <span>搜索地址:</span>
        <el-input id="search" v-model="myValue"></el-input>
      </div>
      <div id="map" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>
<script>
import BMap from "BMap";
export default {
  props: {
    addressObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
    flag: {
      type: String,
      default: "add",
    },
  },
  data() {
    return {
      myValue: "",
      emitValue: { address: "", BPoint: "" },
      // 地图对象
      map: "",
      // 地图中心
      center: { lng: 113.869117, lat: 22.581735 },
      // 放大
      zoom: 18,
    };
  },
  // watch: {
  //   emitValue: {
  //     handler(val) {
  //       this.$emit("searchAdrr", this.emitValue);
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  watch: {
    addressObj: {
      handler(val) {
        if (val) {
          this.isFlag();
        }
      },
      deep: true,
    }
  },
  mounted() {
    this.initMap();
    this.init();
    this.$nextTick(() => {
      this.isFlag();
    });
  },
  methods: {
    isFlag() {
      if (this.flag == "editor") {
        this.map.clearOverlays(); //清除地图上所有覆盖物
        let marker = new BMap.Marker(
          new BMap.Point(this.addressObj.lng, this.addressObj.lat)
        );
        this.map.setCenter(
          new BMap.Point(this.addressObj.lng, this.addressObj.lat)
        );
        console.log(this.addressObj);
        this.map.addOverlay(marker); //添加标注
        this.moveMarker(marker);
      }
      if (this.flag == "search") {
        this.map.clearOverlays(); //清除地图上所有覆盖物
        let marker = new BMap.Marker(
          new BMap.Point(this.addressObj.lng, this.addressObj.lat)
        );
        this.map.addOverlay(marker); //添加标注
        this.map.setCenter(
          new BMap.Point(this.addressObj.lng, this.addressObj.lat)
        );
      }
    },
    initMap() {
      var map = new BMap.Map("map");
      this.map = map;
      this.map.centerAndZoom(
        new BMap.Point(this.center.lng, this.center.lat),
        this.zoom || 18
      );
      this.map.enableScrollWheelZoom(true);
      // this.map.setMapStyleV2({ styleJson: myStyle });
      this.map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
        })
      );
    },
    init() {
      let that = this;
      var ac = new BMap.Autocomplete({ input: "search", location: this.map }); //建立一个自动完成的对象
      var myValue;
      ac.addEventListener("onconfirm", function (e) {
        //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;

        that.setPlace(myValue);
      });
    },
    setPlace(myValue) {
      let th = this;
      this.map.clearOverlays(); //清除地图上所有覆盖物
      function myFun() {
        var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
        console.log(pp.lng, pp.lng);
        th.emitValue.BPoint = { lng: pp.lng, lat: pp.lat };
        let marker = new BMap.Marker(pp);
        th.map.centerAndZoom(pp, 18);
        th.map.addOverlay(marker); //添加标注
        var geoc = new BMap.Geocoder();
        geoc.getLocation(pp, function (rs) {
          var addComp = rs.addressComponents;
          th.emitValue.address =
            addComp.province +
            "" +
            addComp.city +
            "" +
            addComp.district +
            "" +
            addComp.street +
            "" +
            addComp.streetNumber;
          th.emitValue.BPoint.province = addComp.province;
          th.emitValue.BPoint.city = addComp.city;
          th.emitValue.BPoint.district = addComp.district;
          th.emitValue.BPoint.street = addComp.street;
          console.log(th.emitValue.BPoint);
          th.$emit("searchAdrr", th.emitValue);
        });
        th.moveMarker(marker);
      }
      var local = new BMap.LocalSearch(this.map, {
        //智能搜索
        onSearchComplete: myFun,
      });
      local.search(myValue);
    },
    moveMarker(marker) {
      let th = this;
      marker.enableDragging();
      var pointNew;
      marker.addEventListener("dragend", function (e) {
        pointNew = e.point;
        // var pp = local.getResults().getPoi(0).point;
        th.emitValue.BPoint = { lng: pointNew.lng, lat: pointNew.lat };
        console.log(th.emitValue.BPoint);
        var geoc = new BMap.Geocoder();
        geoc.getLocation(pointNew, function (rs) {
          var addComp = rs.addressComponents;

          th.emitValue.address =
            addComp.province +
            "" +
            addComp.city +
            "" +
            addComp.district +
            "" +
            addComp.street +
            "" +
            addComp.streetNumber;
          th.emitValue.BPoint.province = addComp.province;
          th.emitValue.BPoint.city = addComp.city;
          th.emitValue.BPoint.district = addComp.district;
          th.emitValue.BPoint.street = addComp.street;
          th.$emit("searchAdrr", th.emitValue);
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  height: 100%;
  width: 100%;
  padding-top: 20px;
  padding-left: 60px;
  .map_wrap {
    position: relative;
    height: 100%;
    .input_wrap {
      position: absolute;
      left: 0;
      top: 20px;
      z-index: 300;
      display: flex;
      span {
        width: 120px;
        text-align: right;
        display: inline-block;
      }
      .el-input {
        display: inline-block;
      }
    }
  }
}
</style>
