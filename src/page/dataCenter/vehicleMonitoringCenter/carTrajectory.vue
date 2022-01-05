<template>
  <div class="VMCenter">
    <el-container>
      <el-main class="VMC_main">
        <div class="VMC_bmap pr">
          <div id="map" style="width: 100%; height: 100%"></div>
        </div>
        <backToScreen></backToScreen>
        <div class="top_tips_part" :style="isDatascreen ? 'left:100px' : ''">
          <span><img src="@/assets/img/car/icon_tips_gray.png" />离线</span>
          <span><img src="@/assets/img/car/icon_tips_red.png" />报警</span>
          <span><img src="@/assets/img/car/icon_tips_blue.png" />不定位</span>
          <span><img src="@/assets/img/car/icon_tips_green.png" />行驶</span>
          <span><img src="@/assets/img/car/icon_tips_yellow.png" />停车</span>
        </div>
        <div class="right_part">
          <div class="part_title">车辆轨迹</div>
          <div class="main">
            <div class="car_no">
              <label>车牌号</label><span>{{ form.carNumber }}</span>
            </div>
            <div class="content">
              <div class="input_block">
                <label>开始时间</label>
                <el-date-picker
                  v-model="form.timeBegin"
                  type="datetime"
                  placeholder="开始时间"
                  align="right"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </div>
              <div class="input_block">
                <label>结束时间</label>
                <el-date-picker
                  v-model="form.timeEnd"
                  type="datetime"
                  placeholder="结速时间"
                  align="right"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </div>
              <div class="checkBox">
                <el-checkbox-group
                  v-model="formd.duoxuan"
                  @change="changeCheckBox"
                  size="small"
                >
                  <el-checkbox label="accStatus">过滤静止点</el-checkbox>
                  <el-checkbox label="showSpeed">显示速度时间</el-checkbox>
                </el-checkbox-group>
              </div>
              <el-button class="checkTrack_btn" @click="checkTrack"
                >查看路线</el-button
              >
              <div class="sliderBox">
                <div class="slider_item">
                  <label>播放速度</label>
                  <el-slider
                    v-model="formd.speed"
                    :format-tooltip="sliderFormatToolTip"
                    :min="1000"
                    :max="10000"
                    :step="500"
                    @change="changeSpeedRange"
                  ></el-slider>
                </div>
                <div class="slider_item" @mousedown="mousedown">
                  <label>播放进度</label>
                  <el-slider
                    v-model="formd.progress"
                    :max="maxIndex"
                    :min="0"
                    @change="changeProgressRange"
                  ></el-slider>
                </div>
              </div>
              <div class="bottomGroup">
                <el-button class="btn track_start" @click="getTrack"
                  ><img src="@/assets/img/btn_play.png" />播放</el-button
                >
                <el-button class="btn track_pause" @click="pause"
                  ><img src="@/assets/img/btn_pause.png" />暂停</el-button
                >
                <el-button class="btn track_stop" @click="stopRemove"
                  ><img src="@/assets/img/btn_stop.png" />停止</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import backToScreen from "./backToScreen";
import BMap from "BMap";
import {
  gpsHistory,
  getTimeRangeHistoryData,
  getCarParkingInfo
} from "./api/trackGL";
export default {
  name: "trackCarL",
  components: { backToScreen },
  data() {
    return {
      pickerOptions: {},
      list: [1, 2, 3, 4],
      carData: [],
      tableData: [],
      formd: {
        dataTime: "",
        duoxuan: ["accStatus"],
        speed: 1000,
        progress: 1
      },
      form: {
        timeBegin: "2020-12-10 00:00:00",
        timeEnd: "2020-12-10 06:30:00",
        carNumber: "",
        limit: "500"
      },
      pointList: [],
      lushu: {},
      data: [],
      byPassPoints: [], //
      updateRangeTimer: null,
      redPolyline: null,
      maxIndex: 0,
      // BMap: "",
      map: "",
      center: { lng: 113.869117, lat: 22.581735 },
      zoom: 15,

      isDatascreen: window.localStorage.getItem("Datascreen") == "Datascreen"
    };
  },
  watch: {
    "lushu.i"(index) {
      this.map.removeOverlay(this.redPolyline);
      this.formd.progress = index;
      this.playTrackLine(index);
    }
  },
  methods: {
    //路书暂停
    mousedown() {
      this.lushu.pause();
    },
    //启动路书
    getTrack() {
      if (this.lushu) {
        this.lushu.start();
      }
    },
    stopRemove() {
      if (!this.lushu) return;
      this.lushu.stop();
      this.byPassPoints = [];
      this.map.clearOverlays();
      this.map.removeOverlay(this.redPolyline);
    },
    //路书暂停
    pause() {
      if (!this.lushu) return;
      this.lushu.pause();
    },
    //画小车运动轨迹
    playTrackLine(index) {
      this.byPassPoints.push(this.pointList[index]); //画红线的点
      this.redPolyline = new BMap.Polyline(this.byPassPoints, {
        //红线
        strokeColor: "#FE0104",
        strokeWeight: 4,
        strokeOpacity: 1
      });
      this.map.addOverlay(this.redPolyline); //覆盖物红线
    },
    // 滑动播放进度 滑块时 触发事件
    changeProgressRange(val) {
      this.updateRangeTimer = null;
      this.byPassPoints = []; //红线的点
      this.map.removeOverlay(this.redPolyline); //删除红线
      this.lushu.i = val;
      this.redPolyline = new BMap.Polyline(
        this.pointList.slice(0, this.formd.progress),
        {
          strokeColor: "#FE0104",
          strokeWeight: 4,
          strokeOpacity: 1
        }
      ); //红线对象
      this.map.addOverlay(this.redPolyline);
      this.byPassPoints.push(...this.pointList.slice(0, this.formd.progress));
      this.lushu.start();
    },
    // 滑动播放速度 滑块时 触发事件
    changeSpeedRange() {
      this.lushu._opts.speed = this.formd.speed;
    },
    //速度进度条
    sliderFormatToolTip(val) {
      return val + "km/h";
    },
    //地图初始化
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
      // this.map.setMapStyleV2({ styleJson: myStyle });
    },
    //请求小车历史轨迹点，初始化路书
    async checkTrack() {
      let that = this;
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      try {
        this.form.carNumber = this.$route.query.carNumber;
        let res = await getTimeRangeHistoryData({
          beginDateTime: this.form.timeBegin,
          endDateTime: this.form.timeEnd,
          carNumber: this.form.carNumber
        });
        if (res.code === 200) {
          this.loading.close();
          this.formd.progress = 1;
          this.map.clearOverlays();
          let stopList = [];
          this.byPassPoints = [];

          this.pointList = [];
          this.landmarkPois = [];

          res.obj.forEach(item => {
            this.pointList.push(new BMap.Point(item.blng, item.blat));
          });
          this.maxIndex = this.pointList.length;
          this.map.setViewport(this.pointList);
          this.createMaker(this.pointList, stopList);
          this.lushu = new BMapLib.LuShu(that.map, this.pointList, {
            defaultContent: this.form.carNumber,
            speed: this.formd.speed,
            icon: new BMap.Icon(
              require("@/assets/img/car-yellow.png"),
              new BMap.Size(32, 14),
              { imageSize: new BMap.Size(32, 14) }
            ),
            autoView: true,
            enableRotation: true,
            rotation: true,
            landmarkPois: this.landmarkPois
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    //经纬度生成图标
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
        stopMarker = new BMap.Marker(item, {
          icon: stopIcon
        });
        this.map.addOverlay(stopMarker);
      });
      this.map.addOverlay(
        new BMap.Polyline(this.pointList, {
          strokeColor: "#5298FF",
          strokeOpacity: 1,
          strokeWeight: 4
        })
      );
    },
    //checkbox选中事件
    changeCheckBox(v) {
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
    //默认时间
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
    //时间
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
    //百度地址解析
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
    //页面跳转
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
    this.initMap();
    this.form.timeBegin = new Date(new Date().setHours(0, 0, 0, 0));
    let end = new Date(
      new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1
    ).getTime();
    let now = new Date();
    if (now - end < 0) {
      this.form.timeEnd = now;
    } else {
      this.form.timeEnd = end;
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
      .right_part {
        width: 290px;
        background: #fff;
        height: 100%;
        z-index: 999;
        .part_title {
          width: 100%;
          height: 34px;
          line-height: 34px;
          text-align: center;
          background: linear-gradient(270deg, #12c2c2 0%, #2fdea2 100%);
          color: #fff;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: bold;
        }
        .main {
          overflow: auto;
          color: #002222;
          font-size: 12px;
          .car_no {
            width: 100%;
            height: 43px;
            line-height: 43px;
            padding: 0 10px;
            border-bottom: 1px solid #eeeeee;
            span {
              margin-left: 15px;
              font-size: 16px;
              font-weight: bold;
            }
          }
          .content {
            padding: 10px;
            .input_block {
              width: 100%;
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              label {
                display: inline-block;
                width: 5em;
              }
            }
            .checkBox {
              display: flex;
              .el-checkbox-group {
                display: flex;
                flex-direction: column;
                .el-checkbox {
                  margin-top: 10px;
                  font-size: 12px;
                  color: #002222;
                  /deep/.el-checkbox__label {
                    font-size: 12px;
                  }
                }
              }
            }
            .checkTrack_btn {
              display: block;
              width: 188px;
              height: 36px;
              text-align: center;
              color: #fff;
              font-size: 15px;
              background: linear-gradient(90deg, #00d4d8 0%, #009396 100%);
              opacity: 1;
              border-radius: 18px;
              margin: 25px auto;
            }
            .sliderBox {
              display: flex;
              flex-direction: column;
              .slider_item {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding-right: 10px;
                label {
                  display: inline-block;
                  width: 5.5em;
                }
                .el-slider {
                  flex: 1;
                  /deep/.el-slider__runway {
                    margin: 10px 0;
                    .el-slider__bar {
                      background: #00cfd3;
                    }
                    .el-slider__button {
                      border-color: #00cfd3;
                    }
                  }
                }
              }
            }
            .bottomGroup {
              display: flex;
              justify-content: space-between;
              margin-top: 20px;
              .btn {
                width: 76px;
                height: 29px;
                opacity: 1;
                border-radius: 4px;
                color: #fff;
                font-size: 13px;
                border: 0;
                span {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                img {
                  height: 13px;
                  margin-right: 5px;
                }
              }
              .track_start {
                background: linear-gradient(270deg, #12c2c2 0%, #2fdea2 100%);
              }
              .track_pause {
                background: linear-gradient(270deg, #ffa100 0%, #ffbd4a 100%);
              }
              .track_stop {
                background: linear-gradient(270deg, #ff5454 0%, #ffa467 100%);
              }
            }
          }
        }
      }
    }
  }
}
</style>
