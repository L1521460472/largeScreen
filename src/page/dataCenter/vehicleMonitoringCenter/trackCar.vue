<template>
  <div class="VMCenter">
    <el-container>
      <el-main class="VMC_main">
        <div class="VMC_bmap pr">
          <!-- <showBMap ref="mapseet" @init="init"></showBMap> -->
          <div id="map" style="width: 100%; height: 100%" />
          <div class="top_title">
            <p>跟踪监控</p>
          </div>
          <div class="right_part">
            <div class="main">
              <div class="content">
                <div class="checkBox">
                  <div class="title">跟踪配置</div>
                  <div class="boxGroup">
                    <el-checkbox
                      v-model="checkMsg"
                      label="checkMsg"
                      @click="handleMsgChange"
                      >显示信息</el-checkbox
                    >
                    <el-checkbox
                      label="checkRoute"
                      @change="handleCheckedChange"
                      >显示路线</el-checkbox
                    >
                  </div>
                </div>

                <div class="list">
                  <div class="title">定位信息</div>
                  <ul v-if="checkMsg" class="ul">
                    <li
                      v-for="(item, index) in carData"
                      :key="index"
                      class="li"
                    >
                      <span class="item">{{ item.carNumber }}</span>
                      <span class="item">2020-10-02 15:45:30</span>
                      <span class="item">停车时间</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="top_left" />
            <div class="top_right" />
            <div class="bottom_left" />
            <div class="bottom_right" />
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import BMap from "BMap";
import lvhdsd from "@/assets/img/lvhdsd.png?v=5";
import { gpsCarStateQueryFirst } from "./api/index";
import myStyle from "../custom_map_config/custom_map_config";
export default {
  name: "TrackCar",
  data() {
    return {
      map: "",
      center: { lng: 113.869117, lat: 22.581735 },
      zoom: 15,
      list: [1, 2, 3, 4],
      icon: new BMap.Icon(lvhdsd, new BMap.Size(32, 33), {
        imageSize: new BMap.Size(32, 33)
      }),
      form: {
        checkList: []
      },
      checkMsg: true,
      carData: [],
      currentCount: 0,
      nowPoint: undefined,
      nowMarker: undefined,
      timer: 10,
      PolyLine: []
    };
  },
  computed: {
    step() {
      // 速度
      return 400 / (1000 / this.timer);
    }
  },

  mounted() {
    this.initMap();
  },
  beforeDestroy() {
    this.map = {};
    window.removeEventListener(
      "mousewheel",
      function(e) {
        that.scrollFunc(e, that);
      },
      true
    );
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
      // this.map.setMapStyleV2({ styleJson: myStyle });
      this.map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
          offset: new BMap.Size(10, 50),
          anchor: BMAP_ANCHOR_TOP_LEFT
        })
      );
      this.map.setMapStyleV2({ styleJson: myStyle });
      this.getCarStatus();
      this.getMapCenter();
    },
    // 获取车辆经纬度画小车，设置地图中心
    getCarStatus() {
      const str = this.$route.query.carNumber;
      gpsCarStateQueryFirst({}).then(res => {
        if (res.code === 200) {
          let rs;
          rs = res.obj.find(item => {
            return item.carNumber === str;
          });
          this.nowPoint = new BMap.Point(rs.blng, rs.blat);
          this.nowMarker = new BMap.Marker(this.nowPoint, { icon: this.icon });
          this.map.addOverlay(this.nowMarker);
          this.map.setCenter(this.nowPoint);
          this.PolyLine.push(this.nowPoint);
        }
      });

      if (res.code === 200) {
        let rs;
        rs = res.obj.find(item => {
          return item.carNumber === str;
        });
        this.nowPoint = new BMap.Point(rs.blng, rs.blat);
        this.nowMarker = new BMap.Marker(this.nowPoint, { icon: this.icon });
        this.map.addOverlay(this.nowMarker);
        this.map.setCenter(this.nowPoint);
        this.PolyLine.push(this.nowPoint);
      }
      this.getData();
    },
    // checkbox选中
    handleMsgChange(value) {
      this.checkMsg = !this.checkMsg;
    },
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
    getData() {
      const that = this;
      const str = that.$route.query.carNumber;
      //   console.log(str);
      const ws = new WebSocket("ws://192.168.10.97:8331/imserver/123456");
      // let ws = new WebSocket("ws://o.zhihuiqice.com:7944/imserver/123456");
      let wsData = [];
      // 连接成功就会执行回调函数
      ws.onopen = function(params) {
        console.log("客户端连接成功");
        // 向服务器发送消息
        ws.send("hello");
      };
      let obj;
      // 必须用属性的方式监听事件，监听函数的参数是事件对象
      ws.onmessage = function(e) {
        wsData = JSON.parse(e.data);
        // console.log(e.data);
        const rs = wsData.find(item => {
          return item.carNumber === str;
        });
        // console.log(rs);
        that.next(rs);
      };
    },
    next(obj) {
      // this.point起点,point下一点，this.nowMarker图标
      const angle = obj.angle;
      const point = new BMap.Point(obj.blng, obj.blat);
      this.move(this.nowPoint, point, this.nowMarker, angle);
      this.nowPoint = point;
    },
    move(initPos, targetPos, nowMarker, angle) {
      // let _this = this;
      // console.log(targetPos);
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
      if (that.PolyLine.length === 0) {
        return;
      } else {
        e = e || window.event;
        that.map.setCenter(that.PolyLine[that.PolyLine.length - 1]);
      }
    },
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
    },
    getDistance(pxA, pxB) {
      return Math.sqrt(Math.pow(pxA.x - pxB.x, 2) + Math.pow(pxA.y - pxB.y, 2));
    },
    tweenLinear(initPos, targetPos, currentCount, count) {
      const b = initPos;
      const c = targetPos - initPos;
      const t = currentCount;
      const d = count;
      return (c * t) / d + b;
    },
    setRotation(prePos, curPos, targetPos, nowMarker) {
      // 三角函数tan
      let deg = 0;
      // start!
      curPos = this.map.pointToPixel(curPos);
      targetPos = this.map.pointToPixel(targetPos);

      if (targetPos.x != curPos.x) {
        const tan = (targetPos.y - curPos.y) / (targetPos.x - curPos.x);
        const atan = Math.atan(tan);
        deg = (atan * 360) / (2 * Math.PI);
        // degree  correction;
        if (targetPos.x < curPos.x) {
          deg = -deg + 90 + 90;
        } else {
          deg = -deg;
        }

        nowMarker.setRotation(-deg);
      } else {
        var disy = targetPos.y - curPos.y;
        var bias = 0;
        if (disy > 0) bias = -1;
        else bias = 1; /*  */
        nowMarker.setRotation(-bias * 90);
      }
      return;
    }
  }
};
</script>
<style lang="scss" scoped>
.VMCenter {
  position: relative;
  left: 0;
  top: 0;
  background: #fff;
  z-index: 100;
  width: 100%;
  height: 100%;
  border: 1px solid #e0e0e0;
  /deep/.el-container {
    height: 100%;
    // display: flex;
    .VMC_main {
      position: relative;
      padding: 0;
      flex-basis: auto;
      background: rgb(17, 54, 73);
      .VMC_bmap {
        height: 100%;
        position: relative;
      }
      .top_title {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 30px;
        background: rgba(41, 245, 255, 0.6);
        display: flex;
        align-items: center;
        p {
          color: white;
          font-size: 16px;
          margin-left: 30px;
        }
      }
      .right_part {
        position: absolute;
        width: 300px;
        background: rgba(0, 0, 0, 0.2);
        right: 15px;
        top: 0;
        height: calc(100% - 60px);

        z-index: 999;
        margin: 40px 0px 15px 0px;
        .main {
          //   margin: 0 18px;
          overflow: auto;
          .content {
            margin: 36px 18px 0px 18px;
            .checkBox {
              display: flex;
              flex-direction: column;
              .title {
                color: white;
                font-size: 15px;
                line-height: 18px;
                margin-top: 20px;
              }
              .boxGroup {
                display: flex;
                flex-direction: column;
                margin-top: 11px;
                // .group {
                //   display: flex;
                //   flex-direction: column;
                //   .el-checkbox {
                //     margin-top: 11px;
                //     color: #00d4d8;
                //   }
                // }
              }
            }
            .list {
              margin-top: 47px;
              .title {
                color: white;
                font-size: 15px;
                line-height: 18px;
                margin-top: 20px;
                margin-bottom: 20px;
              }
              .ul {
                background: rgba(0, 14, 15, 0.19);
                height: calc(100vh - 410px);
                overflow-y: auto;
                &::-webkit-scrollbar {
                  width: 6px;
                  z-index: 999;
                }

                &::-webkit-scrollbar-track {
                  background: rgba(0, 0, 0, 0.2);
                }

                &::-webkit-scrollbar-thumb {
                  background: #02a6b5;
                  border-radius: 10px;
                }

                &::-webkit-scrollbar-thumb:window-inactive {
                  background: #02a6b5;
                }

                &::-webkit-scrollbar-thumb:vertical:hover {
                  background: #02a6b5;
                }
                .li {
                  display: flex;
                  flex-direction: column;
                  margin-bottom: 28px;
                  .item {
                    font-size: 14px;
                    line-height: 20px;
                    color: white;
                  }
                }
              }
            }
          }
        }
        .top_left {
          position: absolute;
          width: 13px;
          height: 13px;
          border-top: 2px solid #02a6b5;
          border-left: 2px solid #02a6b5;
          top: 0;
          left: 0;
        }
        .top_right {
          position: absolute;
          width: 13px;
          height: 13px;
          border-top: 2px solid #02a6b5;
          border-right: 2px solid #02a6b5;
          top: 0;
          right: 0;
        }
        .bottom_left {
          position: absolute;
          width: 13px;
          height: 13px;
          border-bottom: 2px solid #02a6b5;
          border-left: 2px solid #02a6b5;
          bottom: 0;
          left: 0;
        }
        .bottom_right {
          position: absolute;
          width: 13px;
          height: 13px;
          border-bottom: 2px solid #02a6b5;
          border-right: 2px solid #02a6b5;
          bottom: 0;
          right: 0;
        }
      }
    }
  }
}
</style>
