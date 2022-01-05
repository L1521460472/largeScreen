<template>
  <div class="VMCenter">
    <el-container>
      <el-main class="VMC_main">
        <div class="VMC_bmap pr">
          <div id="map" style="width: 100%; height: 100%" />
        </div>
        <backToScreen />
        <!-- <div class="top_tips_part">
          <span><img src="@/assets/img/car/icon_tips_gray.png" />离线</span>
          <span><img src="@/assets/img/car/icon_tips_red.png" />报警</span>
          <span><img src="@/assets/img/car/icon_tips_blue.png" />不定位</span>
          <span><img src="@/assets/img/car/icon_tips_green.png" />行驶</span>
          <span><img src="@/assets/img/car/icon_tips_yellow.png" />停车</span>
        </div> -->
        <div class="tb">
          <div class="tb_title">
            <span>车辆跟踪</span>
            <div class="checkBox">
              <el-checkbox label="checkRoute" @change="handleCheckedChange"
                >显示路线</el-checkbox
              >
            </div>
          </div>
          <el-table :data="TBData" style="width: 100%">
            <el-table-column prop="carNumber" label="车牌号" />
            <!-- <el-table-column
              prop="dispatchOrder"
              label="调度工单号"
              width="220"
            >
            </el-table-column> -->
            <el-table-column label="车辆状态">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{
                  scope.row.drivingStatus ? "行驶" : "熄火"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="speed" label="速度" />
            <el-table-column prop="angle" label="方向" />
            <el-table-column prop="mileage" label="里程" />
            <el-table-column prop="gpsTime" label="定位时间" />
            <el-table-column prop="address" label="地址" width="330" />
            <el-table-column label="是否报警">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{
                  scope.row.alarm ? "报警" : "不报警"
                }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import backToScreen from "./backToScreen";
import BMap from "BMap";
// import lvhdsd from '@/assets/img/lvhdsd.png?v=5'
// import { gpsCarStateQueryFirst, trackCar } from './api/index'
import data from "@/data.json";
export default {
  name: "TrackCarL",
  components: { backToScreen },
  data() {
    return {
      map: "",
      center: { lng: 113.869117, lat: 22.581735 },
      zoom: 15,
      list: [1, 2, 3, 4],
      icon: new BMap.Icon(
        require("@/assets/img/genzong.png"),
        new BMap.Size(16, 38),
        {
          imageSize: new BMap.Size(16, 38)
          // anchor: new BMap.Size(38, 18),
        }
      ),
      form: {
        checkList: []
      },
      checkMsg: true,
      carData: [],
      TBData: [],
      currentCount: 0,
      nowPoint: undefined,
      nowMarker: undefined,
      timer: 10,
      PolyLine: [],
      ws: null,
      blue: require("@/assets/img/car/local_blue.png"),
      gray: require("@/assets/img/car/gray.png"),
      red: require("@/assets/img/car/red.png"),
      green: require("@/assets/img/car/green.png"),
      yellow: require("@/assets/img/car/yellow.png")
    };
  },
  computed: {
    step() {
      // 速度
      return 400 / (1000 / this.timer);
    }
  },
  beforeDestroy() {
    // alert(123);
    this.ws.close();
    this.map = {};
    window.removeEventListener(
      "mousewheel",
      function(e) {
        that.scrollFunc(e, that);
      },
      true
    );
  },
  mounted() {
    this.initMap();
  },

  methods: {
    // 地图初始化
    initMap() {
      var map = new BMap.Map("map");
      this.map = map;
      this.map.centerAndZoom(
        new BMap.Point(this.center.lng, this.center.lat),
        this.Zoom || 12
      );
      this.map.enableScrollWheelZoom(true);
      this.map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      );
      this.getCarStatus();
      this.getMapCenter();
    },
    // 获取小车状态显示不同颜色小车
    getCarStatus() {
      const str = this.$route.query.carNumber;
      const res = data["gpsCarState"];
      // gpsCarStateQueryFirst({}).then((res) => {

      if (res.code === 200) {
        let rs;
        rs = res.obj.find(item => {
          return item.carNumber === str;
        });
        console.log(rs);
        let Icon = null;
        this.nowPoint = new BMap.Point(rs.blng, rs.blat);
        switch (this.$route.query.statuFlag) {
          case "离线":
            Icon = new BMap.Icon(this.gray, new BMap.Size(21, 49), {
              imageSize: new BMap.Size(21, 49)
            });
            break;
          case "报警":
            Icon = new BMap.Icon(this.red, new BMap.Size(21, 49), {
              imageSize: new BMap.Size(21, 49)
            });
            break;
          case "不定位":
            Icon = new BMap.Icon(this.blue, new BMap.Size(21, 49), {
              imageSize: new BMap.Size(21, 49)
            });
            break;
          case "行驶":
            Icon = new BMap.Icon(this.green, new BMap.Size(21, 49), {
              imageSize: new BMap.Size(21, 49)
            });
            break;
          case "停车":
            Icon = new BMap.Icon(this.yellow, new BMap.Size(21, 49), {
              imageSize: new BMap.Size(21, 49)
            });
            break;
        }
        this.nowMarker = new BMap.Marker(this.nowPoint, { icon: Icon });
        // console.log(this.nowMarker);
        this.map.addOverlay(this.nowMarker);
        this.map.setCenter(this.nowPoint);
        this.PolyLine.push(this.nowPoint);
        // trackCar({ carNumber: this.$route.query.carNumber }).then((res) => {
        //   console.log(res)
        // })
        this.getData();
      }
      // })
    },
    // webSoket动态获取数据
    getData() {
      const skUrl = process.env.VUE_APP_WEBSOCKET_URL;
      const that = this;
      const str = that.$route.query.carNumber;
      // this.ws = new WebSocket("ws://14.23.63.204:8098/imserver/" + str);
      this.ws = new WebSocket(skUrl + str);
      let wsData = [];
      // 连接成功就会执行回调函数
      this.ws.onopen = function(params) {
        // console.log(params);
        // console.log("客户端连接成功");
        // 向服务器发送消息
        // that.ws.send("hello");
      };
      let obj;
      // 必须用属性的方式监听事件，监听函数的参数是事件对象
      this.ws.onmessage = function(e) {
        try {
          wsData = JSON.parse(e.data);
          that.getBaiduAddressFromBaidu((addr, wsData) => {
            wsData.address = addr;
            that.$set(that.TBData, 0, wsData);
          }, wsData);
          that.next(wsData);
        } catch (e) {
          //
        }
      };
    },
    // 百度地址解析
    getBaiduAddressFromBaidu(callback, wsData) {
      const that = this;
      const point = new BMap.Point(wsData.blng, wsData.blat);
      const geoc = new BMap.Geocoder();
      geoc.getLocation(point, function(rs) {
        if (rs) {
          var addComp = rs.addressComponents;
          var surroundingPois = rs.surroundingPois;
          var finaladdress =
            addComp.province +
            addComp.city +
            addComp.district +
            addComp.street +
            addComp.streetNumber;
          var buildingAddress = "";
          if (surroundingPois && surroundingPois.length > 0) {
            // get max 3 size
            var realSize = Math.min(3, surroundingPois.length);
            for (var i = 0; i < realSize; ++i) {
              var singleAddress = surroundingPois[i].title;
              buildingAddress += singleAddress;
              if (i < realSize - 1) {
                buildingAddress += ",";
              }
            }
          }

          if (buildingAddress.length > 0) {
            finaladdress += ";" + buildingAddress;
          }

          if (callback) {
            // callback(finaladdress, data);
            callback.call(that, finaladdress, wsData);
          }
          // that.tbData.address = finaladdress;
          // if (boolen) {
          //   that.TBData.push(that.tbData);
          // }
        }
      });
    },
    // 是否显示路线
    handleCheckedChange(value) {
      if (value) {
        const polyline = new BMap.Polyline(this.PolyLine);
        this.map.addOverlay(polyline);
      } else {
        const pl = this.map.getOverlays().find(item => {
          return item.toString() === "[object Polyline]";
        });
        this.map.removeOverlay(pl);
      }
    },
    // 跳到下一个点
    next(obj) {
      const angle = obj.angle;
      const point = new BMap.Point(obj.blng, obj.blat);
      this.move(this.nowPoint, point, this.nowMarker, angle);
      this.nowPoint = point;
    },
    // 设置图标移动到下一个点
    move(initPos, targetPos, nowMarker, angle) {
      nowMarker.setRotation(angle);
      this.PolyLine.push(targetPos);
      const pl = this.map.getOverlays().find(item => {
        return item.toString() === "[object Polyline]";
      });
      if (pl) {
        nowMarker.setPosition(targetPos);
        pl.setPath(this.PolyLine);
      } else {
        nowMarker.setPosition(targetPos);
      }
    },
    // 设置地图中心
    scrollFunc(e, that) {
      // console.log(that.map);
      if (that.PolyLine.length === 0) {
        return;
      } else {
        e = e || window.event;
        that.map.setCenter(that.PolyLine[that.PolyLine.length - 1]);
      }
    },
    // 设置地图中心
    getMapCenter() {
      const that = this;
      if (document.addEventListener) {
        document.addEventListener(
          "mousewheel",
          function(e) {
            that.scrollFunc(e, that);
          },
          false
        );
      } // W3C
    }
  }
};
</script>
<style lang="scss" scoped>
/*滚动条*/
::-webkit-scrollbar {
  width: 6px;
  z-index: 999;
}

::-webkit-scrollbar-track {
  background: #fcfcfc;
}

::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:window-inactive {
  background: #999;
}

::-webkit-scrollbar-thumb:vertical:hover {
  background: #999;
}
.VMCenter {
  position: relative;
  left: 0;
  top: 0;
  background: #fff;
  z-index: 100;
  width: 100%;
  height: 100%;
  /deep/.el-container {
    height: 100%;
    .VMC_main {
      padding: 0;
      flex-basis: auto;
      background: #fff;
      display: flex;
      justify-content: center;
      .VMC_bmap {
        width: 100%;
        flex: 1;
        height: 100%;
        position: relative;
      }
      .top_tips_part {
        position: absolute;
        top: 15px;
        left: 15px;
        width: auto;
        height: 38px;
        background: #fff;
        border-radius: 19px;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        padding-left: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 20px;
          img {
            width: auto;
            height: 16px;
            margin-right: 5px;
          }
        }
      }
      .tb {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        .tb_title {
          height: 35px;
          display: flex;
          align-items: center;
          padding: 0 15px;
          width: 100%;
          font-size: 14px;
          background-color: white;
          .checkBox {
            display: inline-block;
            margin-left: 20px;
            /deep/.el-checkbox__label {
              padding-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
