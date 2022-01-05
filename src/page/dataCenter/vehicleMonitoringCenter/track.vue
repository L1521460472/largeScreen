<template>
  <div class="VMCenter">
    <el-container>
      <el-main class="VMC_main">
        <div class="VMC_bmap pr">
          <!-- <showBMap ref="mapseet" @init="init"></showBMap> -->
          <div id="map" style="width: 100%; height: 100%"></div>
        </div>
        <div class="right_part">
          <div class="main">
            <div class="content">
              <div class="block">
                <el-date-picker
                  v-model="czsd.timeBegin"
                  type="datetime"
                  placeholder="开始时间"
                  align="right"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </div>
              <div class="zhi">至</div>
              <div class="block">
                <el-date-picker
                  v-model="czsd.timeEnd"
                  type="datetime"
                  placeholder="结速时间"
                  align="right"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </div>
              <div class="checkBox">
                <div class="title">筛选条件</div>
                <div class="boxGroup">
                  <el-checkbox-group
                    v-model="formd.duoxuan"
                    @change="change"
                    size="small"
                  >
                    <el-checkbox label="locate"
                      >精准定位(GPS北斗定位)</el-checkbox
                    >
                    <el-checkbox label="accStatus">过滤静止点</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div class="sliderBox">
                <div class="title">播放速度</div>
                <div class="slider">
                  <el-slider v-model="formd.sudu"></el-slider>
                </div>
              </div>
              <div class="bottomGroup">
                <div class="imgB">
                  <div class="btn history" @click="checkTrack">查看路线</div>
                  <!-- <img
                    src="@/assets/img/checkRouter.png"
                    alt=""
                    @click="checkTrack"
                  /> -->
                </div>
                <div class="imgB" @click="getTrack">
                  <div class="btn start">开始</div>
                  <!-- <img src="@/assets/img/playTrack.png" alt="" /> -->
                </div>
                <div class="imgB" @click="pause">
                  <div class="btn pasue">暂停</div>
                </div>
                <div class="imgB" @click="stopRemove">
                  <div class="btn stop">停止</div>
                </div>
              </div>
              <div class="list">
                <ul class="ul">
                  <li v-for="(item, index) in list" :key="index" class="li">
                    <span class="item">2020-10-02 15:45:30</span>
                    <span class="item">停车时间</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="top_left"></div>
          <div class="top_right"></div>
          <div class="bottom_left"></div>
          <div class="bottom_right"></div>
        </div>
        <div class="bottom_part">
          <el-table
            :data="tableData"
            class="ElTable"
            style="background: rgba(17, 54, 73, 0.2)"
          >
            <el-table-column
              prop="locate"
              label="车辆状态"
              align="center"
              :formatter="locateFormatter"
            >
            </el-table-column>
            <el-table-column prop="speed" label="速度" align="center">
            </el-table-column>
            <el-table-column prop="angle" label="方向" align="center">
            </el-table-column>
            <el-table-column prop="time" label="定位时间" align="center">
            </el-table-column>
            <el-table-column
              prop="alarm"
              label="报警状态"
              align="center"
              :formatter="alarmFormatter"
            >
            </el-table-column>
            <el-table-column prop="mileage" label="里程" align="center">
            </el-table-column>
            <el-table-column prop="temperature" label="温度" align="center">
            </el-table-column>
            <el-table-column prop="" label="经纬度" align="center">
              <template slot-scope="scope">
                {{ scope.row.lat }}, {{ scope.row.lng }}
              </template>
            </el-table-column>
            <el-table-column prop="lW" label="位置" align="center">
            </el-table-column>
            <el-table-column prop="time" label="系统时间" align="center">
            </el-table-column>
          </el-table>
          <div class="top_left"></div>
          <div class="top_right"></div>
          <div class="bottom_left"></div>
          <div class="bottom_right"></div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import BMap from "BMap";
import myStyle from "../custom_map_config/custom_map_config";
// import lvhdsd from "@/assets/img/lvhdsd.png?v=5";
import {
  gpsHistory,
  getTimeRangeHistoryData,
  getCarParkingInfo
} from "./api/trackGL";
import axios from "axios";
export default {
  name: "trackCarL",
  components: {
    // showBMap,
  },
  data() {
    return {
      pickerOptions: {},
      list: [1, 2, 3, 4],
      carData: [],
      tableData: [],
      formd: {
        dataTime: "",
        duoxuan: [],
        sudu: 100
      },
      czsd: {
        timeBegin: "2020-12-10 00:00:00",
        timeEnd: "2020-12-10 06:30:00",
        carNumber: "",
        limit: "500"
      },
      pointList: null,
      lushu: null,
      data: [],
      // BMap: "",
      map: "",
      center: { lng: 113.869117, lat: 22.581735 },
      zoom: 15
    };
  },

  methods: {
    getTrack() {
      this.lushu.start();
    },
    stopRemove() {
      this.lushu.stop();
    },
    pause() {
      this.lushu.pause();
    },
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
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      );
      this.map.setMapStyleV2({ styleJson: myStyle });
    },
    async checkTrack() {
      let that = this;
      try {
        this.czsd.carNumber = this.$route.query.carNumber;
        console.log(this.$route.query.carNumber);
        let res = await getTimeRangeHistoryData({
          beginDateTime: this.czsd.timeBegin,
          endDateTime: this.czsd.timeEnd,
          carNumber: this.czsd.carNumber
        });
        if (res.code === 200) {
          console.log(res.obj);
          this.czsd.carNumber = this.$route.query.carNumber;
          let result = await getCarParkingInfo(this.czsd);
          let stopList = [];
          if (result.code === 200) {
            let st = result.obj;
            stopList = st.reduce((arr, current) => {
              let point = new BMap.Point(current.blng, current.blat);
              arr.push(point);
              return arr;
            }, stopList);
          }

          this.pointList = [];
          let list = res.obj;
          // console.log(list);
          this.pointList = list.reduce((arr, current) => {
            let point = new BMap.Point(current.blng, current.blat);
            arr.push(point);
            return arr;
          }, this.pointList);
          this.map.setViewport(this.pointList);
          this.createMaker(this.pointList, stopList);
          this.lushu = new BMapLib.LuShu(that.map, this.pointList, {
            defaultContent: "",
            speed: this.formd.sudu * 20,
            icon: new BMap.Icon(
              require("@/assets/img/car-yellow.png"),
              new BMap.Size(32, 14)
              // { anchor: new BMap.Size(20, 24) }
            ),
            autoView: true,
            enableRotation: true,
            rotation: true,
            landmarkPois: []
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    createMaker(pl, st) {
      this.map.clearOverlays();
      let stopIcon = new BMap.Icon(
        require("@/assets/img/stop_icon.png"),
        new BMap.Size(18, 18)
      );
      let stopMarker;
      for (let i = 0; i < pl.length; i++) {
        let point = new BMap.Point(pl[i].lng, pl[i].lat);
        let marker1;
        let marker2;
        if (i == 0) {
          let startIcon = new BMap.Icon(
            require("@/assets/img/icon-start.png"),
            new BMap.Size(42, 51)
          );
          let pointIcon = new BMap.Icon(
            require("@/assets/img/start_green.png"),
            new BMap.Size(42, 42)
          );
          marker1 = new BMap.Marker(point, {
            icon: startIcon,
            offset: new BMap.Size(0, -43)
          });
          marker2 = new BMap.Marker(point, {
            icon: pointIcon
          });
          this.map.addOverlay(marker1);
          this.map.addOverlay(marker2);
        } else if (i == pl.length - 1) {
          let endIcon = new BMap.Icon(
            require("@/assets/img/icon-end.png"),
            new BMap.Size(42, 51)
          );
          let pointIcon = new BMap.Icon(
            require("@/assets/img/end_orange.png"),
            new BMap.Size(42, 42)
          );
          marker1 = new BMap.Marker(point, {
            icon: endIcon,
            offset: new BMap.Size(0, -43)
          });
          marker2 = new BMap.Marker(point, {
            icon: pointIcon
          });
          this.map.addOverlay(marker1);
          this.map.addOverlay(marker2);
        }
      }
      st.forEach(item => {
        console.log(item);
        stopMarker = new BMap.Marker(item, {
          icon: stopIcon
        });
        this.map.addOverlay(stopMarker);
      });
      this.map.addOverlay(
        new BMap.Polyline(this.pointList, {
          strokeColor: "blue",
          strokeOpacity: 0.5,
          strokeWeight: 3
        })
      );
    },
    alarmFormatter(data) {
      if (data.alarm) {
        return "报警";
      } else {
        return "未报警";
      }
    },
    locateFormatter(data) {
      let title;
      title = data.locate ? "定位" : "未定位";
      if (data.accStatus) {
        return title + ",行驶";
      } else {
        return title + ",熄火";
      }
    },
    async initTB() {
      try {
        this.czsd.carNumber = this.$route.query.carNumber;
        let res = await gpsHistory(this.czsd);
        if (res.code === 200) {
          this.tableData = res.obj;
          this.carData = JSON.parse(JSON.stringify(res.obj));
          this.tableData.forEach(item => {
            this.$set(item, "lW", item.blng + "" + item.blat);
          });
        }
        // console.log(res);
      } catch (e) {}
    },
    change(v) {
      if (v.length > 0) {
        this.formd.duoxuan.forEach(item => {
          this.tableData = this.carData.filter(i => {
            return i[item];
          });
        });
      } else {
        this.tableData = this.carData;
      }
      console.log(v);
    },
    premou() {
      // var time = date.getTime();//当前的毫秒数
      var oneDay = 1000 * 60 * 60 * 24; //一天的毫秒数

      var date = new Date();
      var date1 = new Date().getTime(); // 获取当前时间戳
      var time = date1;
      var before = time - oneDay;
      // 当前时间戳+3600s（一小时，其他时间通过计算时间戳进行相应加减），重新设置 Date 对象
      date.setTime(date1 - 3600000 * 6);
      // if(before > date){
      //     alert('昨天了')
      //     console.log(this.dateTest().substring(0,11)+ "00:00:00")
      // }

      if (this.isToday(date) === "昨天") {
        //
        let date = this.dateTest().substring(0, 11) + "00:00:00";
        return date;
      } else {
        return this.dateTest(date);
      }
    },
    dateTest(data) {
      let date = new Date();
      if (data) {
        date = data;
      } else {
        date = new Date();
      }

      let seperator1 = "-"; //年月日之间的分隔

      let seperator2 = ":"; //时分秒之间的分隔

      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1; //获取月,如果小于10,前面补个0

      let strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //获取日,如果小于10,前面补个0

      let strHours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //获取小时,如果小于10,前面补个0

      let strMinutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //获取分,如果小于10,前面补个0

      let strSeconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //获取秒,如果小于10,前面补个0

      let currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        strHours +
        seperator2 +
        strMinutes +
        seperator2 +
        strSeconds; //拼接一下

      return currentdate; //返回
    },
    isToday(str) {
      let d = new Date(str).setHours(0, 0, 0, 0);
      let today = new Date().setHours(0, 0, 0, 0);

      let obj = {
        "-86400000": "昨天",
        0: "今天",
        86400000: "明天"
      };

      return obj[d - today] || "啥也不是";
    },

    getBaiduAddressFromBaidu(point, callback) {
      let that = this;
      let geoc = new BMap.Geocoder();
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
            //get max 3 size
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
            callback(finaladdress);
          }
          that.newAddress = finaladdress;
        }
      });
    },
    //获取右边数据

    trackCarLine() {
      this.$router.push({
        path: "/trackCarL",
        query: {
          carNumber: this.pupdata.carNumber
        }
      });
    }
  },
  mounted() {
    // alert(3333);
    this.initMap();
    this.czsd.timeBegin = this.premou();
    this.czsd.timeEnd = this.dateTest();
    this.initTB();
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
  background: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-thumb {
  background: #02a6b5;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:window-inactive {
  background: #02a6b5;
}

::-webkit-scrollbar-thumb:vertical:hover {
  background: #02a6b5;
}
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
      padding: 0;
      flex-basis: auto;
      background: rgb(17, 54, 73);
      .VMC_bmap {
        height: 100%;
        position: relative;
      }
      .right_part {
        position: absolute;
        width: 300px;
        background: rgba(0, 0, 0, 0.2);
        right: 15px;
        top: 0;
        height: calc(100% - 30px);

        z-index: 999;
        margin: 15px 0px 15px 0px;
        /deep/.el-tree .el-icon-caret-right:before {
          background: url("../../../assets/img/add.png") no-repeat 0 0;
          content: "";
          display: block;
          width: 17px;
          height: 17px;
          font-size: 17px;
          background-size: 17px;
          margin-left: 25px;
        }
        .el-tree-node__expand-icon.is-leaf::before {
          background: url("../../../assets/img/jian.png") no-repeat 0 3px;
          content: "";
          display: block;
          width: 16px;
          height: 16px;
          font-size: 16px;
          background-size: 16px;
        }
        .el-tree {
          background: transparent;
        }
        .el-tree > .is-expanded > .el-tree-node__content {
          background: rgba(5, 140, 206, 0.4);
        }
        .el-tree .el-tree-node .el-tree-node__content {
          height: 37px;
          background: transparent;
          &:hover {
            background: rgba(5, 140, 206, 0.4);
          }
          .el-tree-node__expand-icon {
            transform: rotate(0deg);
          }
          .el-tree-node__label {
            color: #ffff;
            width: 225px;
            background: rgba(5, 140, 206, 0.4);
            margin: 0 auto;
          }
        }
        .el-tree .el-tree-node .el-tree-node__children {
          .el-tree-node {
            margin: 7px 0;
            .el-tree-node__content {
              &:hover {
                background: rgba(5, 140, 206, 0.4);
              }
              .el-tree-node__label {
                color: #ffff;
                height: 37px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 20px 0px 23px 0px;
                background: rgba(5, 140, 206, 0.4);
              }
            }
          }
          .is-current {
            .el-tree-node__content {
              .el-tree-node__label {
                height: 37px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 20px 0px 23px 0px;
                background: #00d4d8;
              }
            }
          }
        }
        .main {
          //   margin: 0 18px;
          overflow: auto;
          .content {
            margin: 36px 18px 0px 18px;
            .block {
              width: 100%;
              display: flex;
              .el-date-editor {
                // width: 116px;
                .el-input__inner {
                  background: transparent;
                  border: 1px solid #00d4d8;
                }
              }
            }
            .zhi {
              display: flex;
              justify-content: center;
              align-items: center;
              color: white;
              font-size: 15px;
              line-height: 40px;
            }
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
                .el-checkbox {
                  margin-top: 11px;
                  color: #00d4d8;
                }
              }
            }
            .sliderBox {
              display: flex;
              flex-direction: column;
              .title {
                color: white;
                font-size: 15px;
                line-height: 18px;
                margin-top: 20px;
              }
            }
            .bottomGroup {
              display: flex;
              justify-content: space-between;
              .imgB {
                width: 62px;
                height: 31px;
                .btn {
                  width: 62px;
                  height: 31px;
                  background-image: linear-gradient(to right, #00d4d8, #009396);
                  color: white;
                  border-radius: 31px;
                  font-size: 12px;
                  text-align: center;
                  line-height: 31px;
                  cursor: pointer;
                }
                .stop {
                  background-image: linear-gradient(to right, #f97676, #fe4242);
                }
              }
            }
            .list {
              .ul {
                padding-top: 47px;
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
      .bottom_part {
        position: absolute;
        width: calc(100% - 345px);
        height: 246px;
        background: rgba(0, 0, 0, 0.2);
        left: 15px;
        bottom: 15px;
        z-index: 999;
        // padding-right: 12px;
        /deep/.el-table {
          th,
          tr {
            background: transparent !important;
          }
          tr,
          th {
            &:hover > td {
              background: transparent !important;
            }
          }
          th.is-leaf {
            border-bottom: none;
          }
          .el-table__body-wrapper {
            height: 100%;
            overflow-y: auto;
            /*滚动条*/
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
          }
        }

        .ElTable {
          height: 100%;
          //   overflow-y: auto;
          position: relative;
          &::before {
            height: 0;
          }
        }
        /deep/.el-tabs {
          overflow: hidden;
          margin-bottom: 1px;
          .el-tabs__header {
            margin-bottom: 0;
            .el-tabs__nav-wrap {
              &::after {
                content: "";
                height: 0;
              }
              .el-tabs__nav-scroll {
                .el-tabs__nav {
                  display: flex;
                  .el-tabs__item {
                    height: 41px;
                    width: 122px;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: bold;
                  }
                  .is-active {
                    height: 41px;
                    width: 122px;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-image: linear-gradient(
                      to right,
                      #00d4d8,
                      #009396
                    );
                    border-radius: 16px 16px 0px 0px;
                    color: white;
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: bold;
                  }
                  .el-tabs__active-bar {
                    height: 0;
                    background: none;
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
