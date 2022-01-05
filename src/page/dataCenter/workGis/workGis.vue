<template>
  <div class="wrapper">
    <div id="map" style="width: 100%; height: 100%"></div>
    <BDialog :visible.sync="wcvisible" :title="title">
      <div>
        <img src="@/assets/img/warnMessage.png"  style="width: 100%"/>
      </div>
    </BDialog>
    <BDialog :visible.sync="cvisible" :title="title1">
      <div>
        <video-player
          ref="videoPlayer"
          class="video-player vjs-custom-skin"
          :playsinline="true"
          :options="playerOptions"
        >
        </video-player>
      </div>
    </BDialog>

    <!-- 车辆列表 -->
    <div class="left_part">
      <div class="top_left"></div>
      <div class="top_right"></div>
      <div class="bottom_left"></div>
      <div class="bottom_right"></div>
      <div class="part_content">
        <div class="panel-tit">车辆列表</div>
        <el-tree
          :data="carList"
          :props="defaultProps"
          @node-click="handleNodeClick"
          ref="tree"
        >
        </el-tree>
      </div>
    </div>

    <!-- 故障列表 -->
    <div class="left_part right_part">
      <div class="top_left"></div>
      <div class="top_right"></div>
      <div class="bottom_left"></div>
      <div class="bottom_right"></div>
      <div class="part_content">
        <div class="panel-tit">故障列表</div>
        <el-tree
          :data="badGisList"
          :props="defaultProps"
          @node-click="handleGisNodeClick"
          ref="tree"
        >
        </el-tree>
      </div>
    </div>

    <!-- 底部故障报修记录 -->
    <div class="bottom-contain">
      <div class="bottom-contain-left">
        <div class="l-inner-cont">
          <div class="panel-tit">故障报修记录</div>
          <div class="bottom-cont">
            <div class="bottom-cont-tit">
              <div class="tit-number">序号</div>
              <div class="tit-produce">报障单号</div>
              <div class="tit-date">报障日期</div>
              <div class="tit-handle">故障类型</div>
              <div class="tit-handle">报修类型</div>
              <div class="tit-handle">地址定位</div>
            </div>
            <vue-seamless-scroll
              :data="listData"
              class="bottom-cont-bd"
              :class-option="classOption"
            >
              <ul ref="rampageChild">
                <li class="roll-item" v-for="(item,index) in recordList" :key="index">
                  <div class="item-number">{{index}}</div>
                  <div class="item-produce">{{item.repairOrder}}</div>
                  <div class="item-date">{{item.createTime}}</div>
                  <div class="item-handle">{{item.failureType}}</div>
                  <div class="item-handle">{{item.repairType}}</div>
                  <div class="item-handle">{{item.address}}</div>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
        </div>
        <!-- 边框样式 -->
        <div class="border-style">
          <div class="style-item style-item-topleft"></div>
          <div class="style-item style-item-topright"></div>
          <div class="style-item style-item-bottomleft"></div>
          <div class="style-item style-item-bottomright"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import BDialog from "@/Subassembly/common/formDialog";
import videos from "@/assets/video/myVideo.mp4";
import {jsonData,recordList} from "./json";
import vueSeamlessScroll from "vue-seamless-scroll";
import {baiduMapStyle} from "./baiduMapStyle";
import {
  gpsCarState,
  bdStructuresPoint,
  gpsCarStateQueryFirst,
  getTmDispatchOrder,
} from "./api/index";
export default {
  components: { BDialog, videoPlayer,vueSeamlessScroll },
  data() {
    return {
      title1: "现场作业监管",
      title: "报警信息",
      map: "",
      center: { lng: 113.869117, lat: 22.581735 },
      zoom: 15,
      cvisible: false,
      wcvisible: false,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        controls: true, //控制条
        preload: "auto", //视频预加载
        muted: false, //默认情况下将会消除任何音频。
        loop: false, //导致视频一结束就重新开始。
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: videos, //你所放置的视频的地址，最好是放在服务器上
          },
        ],
        poster: "", //你的封面地址（覆盖在视频上面的图片）
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      listData: [1, 2, 3, 4, 5, 6, 7, 8],

      defaultProps: {
        children: "children",
        label: "label",
      },
      carList: [],
      gisList: [],
      badGisList: [],
      wsData: [],
      recordList: recordList,
      flag: false,
      mapZoom: "",
    };
  },
  mounted() {
    this.initMap();
    this.getLeftData();

    if(this.gisList.length == 0){
      this.getGisData();
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    classOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
    getMapZoom(){
      return this.map ? this.map.getZoom() : 0
    }
  },
  watch: {
    cvisible(v) {
      if (!v) {
        this.$nextTick(() => {
          this.$refs.videoPlayer.player.pause();
        });
      } else {
        this.$nextTick(() => {
          this.$refs.videoPlayer.player.load();
        });
      }
    },
    getMapZoom(v){
      if(v){
        console.log("---------------",v)
        this.mapZoom = v;
        if(v > 15 && !this.flag){
          this.setGismarker(this.gisList);
          this.flag = true;
        }
        if(v < 16){
          this.flag = false;
          this.markerAll(this.wsData);
        }
      }
    }
  },
  methods: {
    //获取左边车辆列表数据
    async getLeftData() {
      try {
        let res = await gpsCarState({});
        if (res.code === 200) {
          // console.log(res.obj);
          res.obj.map((item, index) => {
            let company = {
              label: item.key,
              flag: index,
              children: [],
            };
            item.value.map((i, childrenIndex) => {
              let child = {
                label: i.carNumber,
                flag: index + "-" + childrenIndex,
                zb: true,
              };
              company.children.push(child);
            });
            this.carList.push(company);
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    //获取井盖列表数据
    async getGisData() {
      try {
        let res = await bdStructuresPoint({});
        if (res.code === 200) {
          console.log(res.obj)
          this.badGisList = [{
              label: "福田分公司",
              flag: 0,
              children: res.obj.filter(i => {return !i.status}).map((item,index) => {
                return {
                    label: item.subclassType + index,
                    flag: index,
                    locationLong: item.locationLong,
                    locationLat: item.locationLat,
                  }
              }),
            }]
          this.gisList = res.obj;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async handleNodeClick(obj, node, self) {
      console.log(obj);
      if (!obj.zb) return;
      try {
        console.log("请请请");
        // this.map.clearOverlays();
        let res = await gpsCarStateQueryFirst({ carNumber: obj.label });
        if (res.code === 200) {
          let TBdata = res.obj[0];
          this.setSelectMarker(this.wsData,TBdata)
          console.log(TBdata.blng, TBdata.blat);
          let pointse = new BMap.Point(TBdata.blng, TBdata.blat);
          this.map.setCenter(pointse);
        }
      } catch (error) {}
    },
    handleGisNodeClick(obj, node, self){
      if(this.mapZoom < 16) return;
      console.log(obj)
      // this.setSelectMarker(this.wsData,{blng:obj.locationLong,blat:obj.locationLat})
      this.map.setCenter(new BMap.Point(obj.locationLong, obj.locationLat));
    },
    //气泡点击事件
    async addClickHandler(marker, tableObj) {
      let that = this;
      marker.addEventListener("click", function (e) {
        that.cvisible = true;
      });
    },
    //气泡点击事件
    async addGisClickHandler(marker, tableObj) {
      let that = this;
      marker.addEventListener("click", function (e) {
        that.wcvisible = true;
      });
    },
    initMap() {
      var map = new BMap.Map("map");
      this.map = map;
      this.map.centerAndZoom(
        new BMap.Point(this.center.lng, this.center.lat),
        this.Zoom || 12
      );
      this.map.enableScrollWheelZoom(true);
      this.map.setMapStyle({
        styleJson: baiduMapStyle,
      });
      this.createMaker(jsonData);

      this.WebSk();
    },
    setLabelStyle(content) {
      //左偏移  右偏移
      var offsetSize = new BMap.Size(0, 0);
      var labelStyle = {
        color: "#fff",
        backgroundColor: "rgba(0,41,101,0.74)",
        border: "1px solid rgba(187,187,187,0.18)",
        fontSize : "12px",
        width:"86px",
        opacity:"1",
        verticalAlign:"center",
        borderRadius: "2px",
        whiteSpace:"normal",
        wordWrap:"break-word",
        padding:"3px",
        marginTop:'24px',
        marginLeft:'-20px',
        textAlign: 'center'
      };
      //用于设置样式
      var spanA="<span class='angle'><span>"
      //不同数字长度需要设置不同的样式。
      // var num=parseInt(content.length/10)
      // switch(num) {
      //   case 0:
      //     offsetSize = new BMap.Size(-20, -40);
      //     break;
      //   case 1:
      //     offsetSize = new BMap.Size(-20, -40);
      //     break;
      //   case 2:
      //     offsetSize = new BMap.Size(-20, -60);
      //     break;
      //   case 3:
      //     offsetSize = new BMap.Size(-20, -80);
      //     break;
      //   default:
      //     break;
      // }

      var label = new BMap.Label(content+spanA, {
        offset: offsetSize
      });
      label.setStyle(labelStyle);
      return label;
    },
    setSelectLabelStyle(content) {
      //左偏移  右偏移
      var offsetSize = new BMap.Size(0, 0);
      var labelStyle = {
        color: "#fff",
        backgroundColor: "#00d4d8",
        border: "1px solid #00d4d8",
        fontSize : "12px",
        width:"90px",
        opacity:"1",
        verticalAlign:"center",
        borderRadius: "2px",
        whiteSpace:"normal",
        wordWrap:"break-word",
        padding:"3px",
        marginTop:'24px',
        marginLeft:'-20px',
        textAlign: 'center'
      };
      var label = new BMap.Label(content, {
        offset: offsetSize
      });
      label.setStyle(labelStyle);
      return label;
    },
    createMaker(arr) {
      let that = this;
      let point = null;
      let marker = null;
      let icon = null;
      arr.forEach((item) => {
        point = new BMap.Point(item.lng, item.lat);
        switch (item.status) {
          case "warning":
            icon = new BMap.Icon(
              require("@/assets/img/icon_jg_red.png"),
              new BMap.Size(21, 25),
              { imageSize: new BMap.Size(21, 25) }
            );
            marker = new BMap.Marker(point, { icon: icon });
            marker.addEventListener("click", function (e) {
              that.wcvisible = true;
            });

            marker.setLabel(that.setLabelStyle(item.carNum));
            break;
          case "normal":
            icon = new BMap.Icon(
              require("@/assets/img/icon_jg_green.png"),
              new BMap.Size(21, 25),
              { imageSize: new BMap.Size(21, 25) }
            );
            marker = new BMap.Marker(point, { icon: icon });
            marker.setLabel(that.setLabelStyle(item.carNum));
            break;
          case "car":
            icon = new BMap.Icon(
              require("@/assets/img/icon-car-blue.png"),
              new BMap.Size(21, 25),
              { imageSize: new BMap.Size(21, 25) }
            );
            marker = new BMap.Marker(point, { icon: icon });
            marker.addEventListener("click", function (e) {
              that.cvisible = true;
            });
            marker.setLabel(that.setLabelStyle(item.carNum));
            break;
        }
        this.map.addOverlay(marker);
        // if (item.status) {
        //   ponit = new BMap.Icon(
        //     require("@/assets/img/icon_jg_red.png"),
        //     new BMap.Size(21, 25),
        //     { imageSize: new BMap.Size(21, 25) }
        //   );
        // }
      });
    },
    markerAll(wsData) {
      let $this = this;
      this.map.clearOverlays();
      let myIcon = new BMap.Icon(
        require("@/assets/img/icon-car-blue.png?v=1"),
        new BMap.Size(21, 25),
        { imageSize: new BMap.Size(21, 25) }
      );
      let iconCarGray = new BMap.Icon(
        require("@/assets/img/icon-car-gray.png?v=1"),
        new BMap.Size(21, 25),
        { imageSize: new BMap.Size(21, 25) }
      );
      wsData.forEach((item) => {
        // debugger;
        let point = new BMap.Point(item.blng, item.blat);
        let icon = myIcon;
        if(item.online){ // 为true时 车辆在线，false是不在线
          icon = myIcon;
        } else {
          icon = iconCarGray;
        }
        let carMarker = new BMap.Marker(point, {
          icon: icon,
          enableClicking: true, //是否响应点击事件
        });
        // 显示车牌
        if ("" != item.carNumber) {
          // console.log($this.map, $this.BMap);
          carMarker.setLabel($this.setLabelStyle(item.carNumber));
        }
        // 获取地理位置
        var gc = new BMap.Geocoder();
        gc.getLocation(point, function (rs) {
          item.address = rs.address;
        });
        // $this.pupdata.carNumber = item.carNumber;
        $this.addClickHandler(carMarker, item);
        $this.map.addOverlay(carMarker);
      });

      // 设置处置单位marker
      this.setDisposalMarker();

      if(this.mapZoom > 15){
        this.setGismarker(this.gisList);
      }
    },
    setGismarker(wsData) {
      let $this = this;
      let iconGreenG = new BMap.Icon(
        require("@/assets/img/icon_jg_green_G.png?v=1"),
        new BMap.Size(21, 25),
        { imageSize: new BMap.Size(21, 25) }
      );
      let iconGreenH = new BMap.Icon(
        require("@/assets/img/icon_jg_green_H.png?v=1"),
        new BMap.Size(21, 25),
        { imageSize: new BMap.Size(21, 25) }
      );
      let iconGreenL = new BMap.Icon(
        require("@/assets/img/icon_jg_green_L.png?v=1"),
        new BMap.Size(21, 25),
        { imageSize: new BMap.Size(21, 25) }
      );
      let iconRedG = new BMap.Icon(
        require("@/assets/img/icon_jg_red_G.png?v=1"),
        new BMap.Size(21, 25),
        { imageSize: new BMap.Size(21, 25) }
      );
      let iconRedH = new BMap.Icon(
        require("@/assets/img/icon_jg_red_H.png?v=1"),
        new BMap.Size(21, 25),
        { imageSize: new BMap.Size(21, 25) }
      );
      let iconRedL = new BMap.Icon(
        require("@/assets/img/icon_jg_red_L.png?v=1"),
        new BMap.Size(21, 25),
        { imageSize: new BMap.Size(21, 25) }
      );
      wsData.forEach((item) => {
        // debugger;
        let point = new BMap.Point(item.locationLong, item.locationLat);
        let icon = iconGreenG;
        switch(item.subclassType){
          case "隔油池":
            if(!item.status){
              icon = iconRedG;
            } else {
              icon = iconGreenG;
            }
            break;
          case "化粪池":
            if(!item.status){
              icon = iconRedH;
            } else {
              icon = iconGreenH;
            }
            break;
          case "垃圾池":
            if(!item.status){
              icon = iconRedL;
            } else {
              icon = iconGreenL;
            }
            break;
        }
        let gisMarker = new BMap.Marker(point, {
          icon: icon,
          enableClicking: true, //是否响应点击事件
        });
        if(!item.status){
          $this.addGisClickHandler(gisMarker, item);
        }
        $this.map.addOverlay(gisMarker);
      });

      // this.map.setCenter(new BMap.Point("114.066176", "22.547174"));
      this.map.setCenter(new BMap.Point(wsData[0].locationLong, wsData[0].locationLat));

      // 设置处置单位marker
      // this.setDisposalMarker();
    },
    setSelectMarker(wsData,node){
      let $this = this;
      this.map.clearOverlays();
      let myIcon = new BMap.Icon(
        require("@/assets/img/icon-car-blue.png?v=1"),
        new BMap.Size(21, 25),
        { imageSize: new BMap.Size(21, 25) }
      );
      let iconCarGray = new BMap.Icon(
        require("@/assets/img/icon-car-gray.png?v=1"),
        new BMap.Size(21, 25),
        { imageSize: new BMap.Size(21, 25) }
      );
      wsData.forEach((item) => {
        // debugger;
        let point = new BMap.Point(item.blng, item.blat);
        let icon = myIcon;
        if(item.online){ // 为true时 车辆在线，false是不在线
          icon = myIcon;
        } else {
          icon = iconCarGray;
        }
        let carMarker = new BMap.Marker(point, {
          icon: icon,
          enableClicking: true, //是否响应点击事件
        });
        // 显示车牌
        if(node.blng == item.blng && node.blat == item.blat){
          carMarker.setZIndex(100);
          if ("" != item.carNumber) {
            carMarker.setLabel($this.setSelectLabelStyle(item.carNumber));
          }
        } else {
          carMarker.setZIndex(8);
          if ("" != item.carNumber) {
            carMarker.setLabel($this.setLabelStyle(item.carNumber));
          }
        }
        // 获取地理位置
        var gc = new BMap.Geocoder();
        gc.getLocation(point, function (rs) {
          item.address = rs.address;
        });
        // $this.pupdata.carNumber = item.carNumber;
        $this.addClickHandler(carMarker, item);
        $this.map.addOverlay(carMarker);
      });

      // 设置处置单位marker
      this.setDisposalMarker();
    },
    setDisposalMarker(){
      let disposalMarker = new BMap.Marker(new BMap.Point("114.155173", "22.547402"), {
        icon: new BMap.Icon(
        require("@/assets/img/local1.png?v=1"),
          new BMap.Size(48, 50),
          { imageSize: new BMap.Size(48, 50) }
        ),
        enableClicking: false, //是否响应点击事件
      });
      disposalMarker.setZIndex(99);
      let Label = new BMap.Label("罗芳水质净化厂", {
        offset: new BMap.Size(0, 25)
      });
      Label.setStyle({
        color: "#fff",
        backgroundColor: "rgb(251,142,0)",
        border: "1px solid rgb(251,142,0)",
        fontSize : "12px",
        width:"100px",
        opacity:"1",
        verticalAlign:"center",
        borderRadius: "2px",
        whiteSpace:"normal",
        wordWrap:"break-word",
        padding:"3px",
        marginTop:'24px',
        marginLeft:'-20px',
        textAlign: 'center'
      })
      disposalMarker.setLabel(Label);
      this.map.addOverlay(disposalMarker);
    },
    WebSk() {
      let $this = this;
      // 协议为ws，和http配合 wws，和HTTPS配合使用
      let ws = new WebSocket("ws://o.zhihuiqice.com:7944/imserver/123456"),
        wsData = [];
      // 连接成功就会执行回调函数
      ws.onopen = function (params) {
        console.log("客户端连接成功");
        // 向服务器发送消息
        ws.send("hello");
      };
      // 必须用属性的方式监听事件，监听函数的参数是事件对象
      ws.onmessage = function (e) {
        wsData = JSON.parse(e.data);
        // store.state.wsData = wsData;
        // $this.$store.commit("setWsData", wsData);
        $this.wsData = wsData;
        $this.markerAll($this.wsData);
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
img {
  max-width: 100%;
}
/*滚动条*/
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #000;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
  background-color: #101445;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #049dbc;
  border-radius: 10px;
}
</style>
<style lang="scss" scoped>
/deep/.left_part {
  position: absolute;
  width: 275px;
  background: rgba(0, 0, 0, 0.2);
  left: 10px;
  top: 0;
  height: calc(100% - 210px);
  // border: 1px solid pink;
  z-index: 999;
  margin: 10px 0px 10px 0px;
  padding-top: 10px;
  .part_content{
    height: 100%;
    overflow-y: auto;
  }
  .el-tree .el-icon-caret-right:before {
    background: url("../../../assets/img/add.png") no-repeat 0 0;
    content: "";
    display: block;
    width: 17px;
    height: 17px;
    font-size: 17px;
    background-size: 17px;
    margin-left: 5px;
  }
  .el-tree-node__expand-icon.is-leaf::before {
    // background: url("../../../assets/img/jian.png") no-repeat 0 3px;
    background: transparent;
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
    height: 40px;
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
      // margin: 0 auto;
      padding: 5px 10px;
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
    .is-current,
    .is-checked {
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
  .top_left {
    position: absolute;
    width: 20px;
    height: 20px;
    border-top: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
    top: 0;
    left: 0;
  }
  .top_right {
    position: absolute;
    width: 20px;
    height: 20px;
    border-top: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
    top: 0;
    right: 0;
  }
  .bottom_left {
    position: absolute;
    width: 20px;
    height: 20px;
    border-bottom: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
    bottom: 0;
    left: 0;
  }
  .bottom_right {
    position: absolute;
    width: 20px;
    height: 20px;
    border-bottom: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
    bottom: 0;
    right: 0;
  }
}
.right_part{
  left: unset;
  right: 10px;
}
</style>

<style scoped>
  .customWidth{
    width:60%;
  }
  .angle{
  }

  
.bottom-contain {
  position: absolute;
  z-index: 100;
  bottom: 10px;
  width: 100%;
  height: 180px;
  color: #fff;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  overflow: hidden;
}
.bottom-contain .bottom-contain-left {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  position: relative;
  margin: 0 10px;
}
.bottom-contain .bottom-contain-right {
  width: 28%;
  margin-left: 60px;
}
.bottom-contain .bottom-cont-bd {
  position: relative;
  height: 130px;
  overflow: hidden;
}
.bottom-cont-tit,
.bottom-cont-bd .roll-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.bottom-cont-tit > div.tit-unit,
.bottom-cont-tit > div.tit-produce,
.bottom-cont-tit > div.tit-handle,
.bottom-cont-bd .roll-item > div.item-unit,
.bottom-cont-bd .roll-item > div.item-produce,
.bottom-cont-bd .roll-item > div.item-handle {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.bottom-cont-tit > div {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 4px 4px;
  font-size: 14px;
  font-weight: 600;
}

.bottom-cont-bd .roll-item > div {
  margin: 8px 0;
  padding: 0 4px;
  font-size: 14px;
}
.bottom-cont-tit .tit-type,
.bottom-cont-bd .item-type {
  width: 140px;
}
.bottom-cont-tit .tit-number,
.bottom-cont-bd .item-number {
  width: 120px;
}

.bottom-cont-tit .tit-kg,
.bottom-cont-bd .item-kg {
  width: 120px;
}
.bottom-cont-tit .tit-date,
.bottom-cont-bd .item-date {
  width: 180px;
}

.panel-tit {
  color: #02be99;
  font-weight: 700;
  font-size: 18px;
  position: relative;
  background-image: -webkit-gradient(linear,0 0,0 bottom,from(#00f260),to(#0575e6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /*text-shadow:0 0 4px rgba(0,0,0,0.3);*/
  text-align: center;
  z-index: 100;
  margin-bottom: 6px;
}
.l-inner-cont {
  padding: 10px;
  width: 100%;
  height: 100%;
  /* border-top:2px solid rgba(5,117,230,0.2); */
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 200;
}
.panel-data-cont {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 200;
}

/*图标说明*/
.map-info-tip {
  position: absolute;
  left: 20px;
  width: 180px;
  top: 84px;
  z-index: 200;
  padding: 15px;
  background-color: rgba(0, 77, 107, 0.9);
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  color: #fff;
}
.map-info-tip li {
  margin-bottom: 18px;
}
.map-info-tip li strong {
  display: inline-block;
  padding: 0 2px;
  color: #ff4b4b;
}
.map-info-tip li:last-child {
  margin-bottom: 0;
}
.map-info-tip li img {
  width: 34px;
  vertical-align: middle;
  margin-right: 6px;
}
.map-info-tip li img.local-img {
  width: 16px;
  margin-left: 8px;
}

@media screen and (max-width: 1440px) {
  .panel-tit {
    font-size: 15px;
    margin-bottom: 4px;
  }
}


.border-style {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(2, 166, 181, 0.1);
}
.border-style .style-item {
  width: 100%;
  height: 100%;
  position: absolute;
}
.border-style .style-item-topleft:before {
  content: "";
  width: 20px;
  height: 20px;
  border-top: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
}
.border-style .style-item-topleft:after {
  content: "";
  width: 20px;
  height: 20px;
  border-left: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
}
.border-style .style-item-topright:before {
  content: "";
  width: 20px;
  height: 20px;
  border-top: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  right: 0;
  top: 0;
}
.border-style .style-item-topright:after {
  content: "";
  width: 20px;
  height: 20px;
  border-right: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  right: 0;
  top: 0;
}
.border-style .style-item-bottomleft:before {
  content: "";
  width: 20px;
  height: 20px;
  border-left: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  left: 0;
  bottom: 0;
}
.border-style .style-item-bottomleft:after {
  content: "";
  width: 20px;
  height: 20px;
  border-bottom: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  left: 0;
  bottom: 0;
}
.border-style .style-item-bottomright:before {
  content: "";
  width: 20px;
  height: 20px;
  border-right: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  right: 0;
  bottom: 0;
}
.border-style .style-item-bottomright:after {
  content: "";
  width: 20px;
  height: 20px;
  border-bottom: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  right: 0;
  bottom: 0;
}
</style>
