<template>
  <div class="wrapper">
    <div class="main">
      <div id="map"></div>

      <div class="left" v-show="!isFullscreen">
        <div class="left-top">
          <el-input
            v-model="searchUnitText"
            placeholder="单位搜索"
            clearable
          ></el-input>
        </div>

        <div class="left-content">
          <el-scrollbar>
            <el-tree
              show-checkbox
              class="filter-tree"
              node-key="sort"
              :data="treeData"
              :highlight-current="false"
              :props="defaultProps"
              :default-expanded-keys="defExtendkeys"
              :filter-node-method="filterNode"
              auto-expand-parent
              @check="treeCheck"
              ref="tree"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span v-if="node.level == 1">
                  {{ node.label + "(" + data.children.length + ")" }}
                </span>
                <span
                  v-else
                  :title="
                    node.label +
                      (data.carCount ? '(' + data.carCount + ')' : '')
                  "
                >
                  {{ data.abbr ? data.abbr : node.label
                  }}{{ data.carCount ? "(" + data.carCount + ")" : "" }}
                </span>
              </span>
            </el-tree>
          </el-scrollbar>
        </div>
      </div>

      <div class="right" v-show="!isFullscreen">
        <div class="right-top">车辆列表</div>
        <div class="right-content">
          <el-scrollbar v-if="carList.length">
            <div
              class="item"
              :class="[
                carColors[item.carMonitoringStatus],
                { focus: item.focus }
              ]"
              v-for="(item, index) in carList"
              :key="index"
              @click="selectCar(item)"
            >
              <div class="car-number">
                {{
                  item.carNumber
                    ? item.carNumber
                    : item.carMonitoringStatus == 3
                    ? "待派车"
                    : "-"
                }}
              </div>
              <div class="order-number">{{ item.dispatchOrder }}</div>
            </div>
          </el-scrollbar>
          <div class="empty" v-else>暂无数据</div>
        </div>
      </div>

      <div class="top" v-show="!isFullscreen">
        <div
          class="item-block"
          :class="item.class"
          v-for="(item, index) in statusBarList"
          :key="index"
        >
          <div class="state" @click="statusCheck(item)">
            <i :class="{ checked: item.checked }"></i
            ><span>{{ item.name }}</span>
          </div>
          <div class="num">{{ item.num }}</div>
        </div>
      </div>

      <div
        class="fullscreen"
        :class="{ focus: isFullscreen }"
        @click="fullscreen"
      ></div>
    </div>

    <div ref="carInfobox" class="carInfobox">
      <div class="content">
        <div class="block-wrap">
          <div class="title">车辆信息</div>
          <div class="table">
            <div class="row">
              <div class="cell">车牌号:</div>
              <div class="cell">{{ selectedCarInfo.carNumber }}</div>
            </div>
            <div class="row">
              <div class="cell">车辆类型:</div>
              <div class="cell">{{ selectedCarInfo.carTypeName }}</div>
            </div>
            <div class="row">
              <div class="cell">车辆状态:</div>
              <div class="cell">{{ selectedCarInfo.carState }}</div>
            </div>
            <div class="row">
              <div class="cell">异常类型:</div>
              <div class="cell">{{ selectedCarInfo.exceptionTypeName }}</div>
            </div>
            <div class="row">
              <div class="cell">速度:</div>
              <div class="cell">{{ selectedCarInfo.speed }}</div>
            </div>
            <div class="row">
              <div class="cell">位置:</div>
              <div class="cell address">{{ selectedCarInfo.address }}</div>
            </div>
            <div class="row">
              <div class="cell">定位时间:</div>
              <div class="cell">{{ selectedCarInfo.gpsTime }}</div>
            </div>
          </div>
        </div>
        <div class="block-wrap">
          <div class="title">其它信息</div>
          <div class="table">
            <div class="row">
              <div class="cell">司机:</div>
              <div class="cell">{{ selectedCarInfo.driverName }}</div>
            </div>
            <div class="row">
              <div class="cell">司机电话:</div>
              <div class="cell">{{ selectedCarInfo.driverPhone }}</div>
            </div>
            <div class="row">
              <div class="cell">单位负责人:</div>
              <div class="cell">{{ selectedCarInfo.transContactPerson }}</div>
            </div>
            <div class="row">
              <div class="cell">负责人电话:</div>
              <div class="cell">{{ selectedCarInfo.transPhone }}</div>
            </div>
            <div class="row">
              <div class="cell">所属单位:</div>
              <div class="cell">{{ selectedCarInfo.transAbbr }}</div>
            </div>
            <div class="row">
              <div class="cell">调度工单:</div>
              <div class="cell">{{ selectedCarInfo.dispatchOrder }}</div>
            </div>
            <div class="row">
              <div class="cell">承运单:</div>
              <div class="cell">{{ selectedCarInfo.carrierNo }}</div>
            </div>
            <!-- <div class="row">
              <div class="cell">起始单位:</div>
              <div class="cell">{{ selectedCarInfo.wasteAbbr }}</div>
            </div>
            <div class="row">
              <div class="cell">目的单位:</div>
              <div class="cell">{{ selectedCarInfo.dispositionUnitAbbr }}</div>
            </div> -->
          </div>
        </div>
      </div>

      <div class="miss-info">
        <template v-if="selectedCarInfo.carMonitoringStatus == 3">
          <span class="yellow">待派车</span>
        </template>
        <template v-else>
          <span v-if="selectedCarInfo.carGpsMiss">车辆gps信息获取失败</span>
          <span v-if="selectedCarInfo.carRecordMiss">车辆备案信息缺失</span>
        </template>
      </div>

      <div class="path-view">
        <div class="line"></div>
        <div class="point">
          <i></i>
          <div class="start">起始单位</div>
          <div class="end">{{ selectedCarInfo.wasteAbbr }}</div>
        </div>
        <div class="point">
          <i></i>
          <div class="start">目的单位</div>
          <div class="end">{{ selectedCarInfo.dispositionUnitAbbr }}</div>
        </div>
      </div>

      <div class="bottom">
        <div
          class="item"
          :class="{ disabled: selectedCarInfo.carGpsMiss }"
          @click="trackCar"
        >
          跟踪
        </div>
        <div
          class="item"
          :class="{ disabled: selectedCarInfo.carGpsMiss }"
          @click="trackCarLine"
        >
          轨迹
        </div>
        <div class="item" @click="orderDetails">工单详情</div>
      </div>
    </div>

    <el-dialog
      title="工单详情"
      :visible.sync="orderDialogVisible"
      :modal-append-to-body="false"
    >
      <el-row class="rowOrder">
        <el-col :span="12" class="colOrder">
          <el-row>
            <div class="title">调度工单:</div>
            <span>{{ orderObj.dispatchOrder }}</span>
          </el-row>
          <el-row>
            <div class="title">产废单位:</div>
            <span>{{ orderObj.portName }}</span>
          </el-row>
          <el-row>
            <div class="title">处置单位:</div>
            <span>{{ orderObj.destination }}</span>
          </el-row>
          <el-row>
            <div class="title">预计重量:</div>
            <span>{{ orderObj.estimateWeight }}</span>
          </el-row>
        </el-col>
        <el-col :span="12" class="colOrder">
          <el-row>
            <div class="title">发运日期:</div>
            <span> {{ orderObj.deliverTime }} </span>
          </el-row>
          <el-row>
            <div class="title">运输单位:</div>
            <span>{{ orderObj.transName }}</span>
          </el-row>
          <el-row>
            <div class="title">固废类型:</div>
            <span>{{ orderObj.solidWasteName }}</span>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="rowOrder mr20">
        <el-col :span="12" class="colOrder">
          <el-row>
            <div class="title">派车工单:</div>
            <span>{{ orderObj.carrierRecordCode }}</span>
          </el-row>
          <el-row>
            <div class="title">车牌号:</div>
            <span>{{ orderObj.vehicleNo }}</span>
          </el-row>
          <el-row>
            <div class="title">司机姓名:</div>
            <span>{{ orderObj.driverName }}</span>
          </el-row>
        </el-col>
        <el-col :span="12" class="colOrder">
          <el-row>
            <div class="title">空载重量:</div>
            <span>{{ orderObj.emptyLoadedWeight }}</span>
          </el-row>
          <el-row>
            <div class="title">满载重量:</div>
            <span> {{ orderObj.departWeight }} </span>
          </el-row>
          <el-row>
            <div class="title">车型:</div>
            <span>{{ orderObj.carTypeName }}</span>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAllUnit,
  getBaseInfo,
  queryCarStateDeatil,
  getTmDispatchOrder
} from "./api/index";
// import tmpData from './js/tmp'

import baiduMapStyle from "@/page/js/baiduMapStyle2";

export default {
  name: "vehicleMonitoringCenter",
  data() {
    return {
      map: "",
      center: { lng: 114.064552, lat: 22.548456 },
      zoom: 15,
      lastInfoBox: null,

      searchUnitText: "",
      treeData: [],
      defExtendkeys: [],
      defaultProps: {
        children: "children",
        label: "name",
        abbr: "abbr"
      },
      statusBarList: [
        { key: 0, name: "异常", class: "red", checked: true, num: 0 },
        { key: 1, name: "运输中", class: "green", checked: true, num: 0 },
        { key: 2, name: "待运输", class: "blue", checked: false, num: 0 },
        { key: 3, name: "待派车", class: "yellow", checked: false, num: 0 }
      ],
      carColors: ["red", "green", "blue", "yellow"],
      carList: [
        // {carNumber: '粤BFD646', focus: false, carState: '行驶'},
      ],
      selectedCarInfo: {},
      isFullscreen: false,

      blue: require("@/assets/img/iocn_blue_car.png"),
      gray: require("@/assets/img/iocn_tips_gray.png"),
      red: require("@/assets/img/iocn_tips_red.png"),
      green: require("@/assets/img/iocn_tips_green.png"),
      yellow: require("@/assets/img/iocn_tips_yellow.png"),

      orderObj: {}, // 工单详情对象
      orderDialogVisible: false,

      zIndexNum: 99
    };
  },
  watch: {
    searchUnitText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    getAllUnit().then(res => {
      if (res.code == 200) {
        this.treeData = [
          {
            name: "处置单位",
            children: res.obj.dispositionUnits.map(item => {
              item.key = "disposalUnits";
              return item;
            })
          },
          {
            name: "产废单位",
            children: res.obj.wasteUnits.map(item => {
              item.key = "wasteUnits";
              return item;
            })
          },
          {
            name: "运输单位",
            children: res.obj.transUnits.map(item => {
              item.key = "transportUnits";
              return item;
            })
          }
        ];
      }
    });
  },
  mounted() {
    this.initMap();
    this.getCarList();
  },
  methods: {
    //地图初始化
    initMap() {
      var map = new BMap.Map("map");
      this.map = map;
      // this.map.enableAutoResize();
      this.map.centerAndZoom(
        new BMap.Point(this.center.lng, this.center.lat),
        this.Zoom || 12
      );
      this.map.enableScrollWheelZoom(true);
      this.map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
          offset: new BMap.Size(60, 10),
          anchor: BMAP_ANCHOR_TOP_RIGHT
        })
      );
      this.map.setMapStyleV2({ styleJson: baiduMapStyle });
    },
    fullscreen() {
      this.isFullscreen = !this.isFullscreen;
    },
    //页面跳转
    trackCar() {
      if (this.selectedCarInfo.carGpsMiss) return;
      this.$router.push({
        path: "/vehicleTrack",
        query: {
          carNumber: this.selectedCarInfo.carNumber,
          statuFlag: this.selectedCarInfo.carState
        }
      });
    },
    //页面跳转
    trackCarLine() {
      if (this.selectedCarInfo.carGpsMiss) return;
      this.$router.push({
        path: "/carTrajectory",
        query: { carNumber: this.selectedCarInfo.carNumber }
      });
    },
    //工单详情
    orderDetails() {
      getTmDispatchOrder({
        vehicleNo: this.selectedCarInfo.carNumber,
        carrierNo: this.selectedCarInfo.carrierNo
      }).then(res => {
        if (res.code == 200) {
          this.orderObj = res.obj;
          this.orderDialogVisible = true;
        }
      });
    },
    treeCheck(val) {
      this.getCarList();
    },
    statusCheck(item) {
      item.checked = !item.checked;
      this.getCarList();
    },
    getCarList() {
      let nodes = this.$refs.tree.getCheckedNodes(true);
      let params = {
        disposalUnits: nodes
          .filter(item => item.key == "disposalUnits")
          .map(item => item.id),
        wasteUnits: nodes
          .filter(item => item.key == "wasteUnits")
          .map(item => item.id),
        transportUnits: nodes
          .filter(item => item.key == "transportUnits")
          .map(item => item.id),
        carMonitoringStatusList: this.statusBarList
          .filter(item => item.checked)
          .map(item => item.key)
      };
      getBaseInfo(params).then(res => {
        if (res.code == 200) {
          this.statusBarList[0].num = res.obj.execptionCount || 0;
          this.statusBarList[1].num = res.obj.transportingCount || 0;
          this.statusBarList[2].num = res.obj.waitTransportCount || 0;
          this.statusBarList[3].num = res.obj.waitDispatchCount || 0;
          this.carList = res.obj.gpsCarStateDtoList || [];
          this.showCarListOnMap();
        }
      });
    },
    showCarListOnMap() {
      this.map.clearOverlays();
      this.carList.forEach(item => {
        let Icon = null;
        switch (item.carMonitoringStatus) {
          case 0:
            Icon = new BMap.Icon(this.red, new BMap.Size(38, 16), {
              imageSize: new BMap.Size(38, 16)
            });
            break;
          case 1:
            Icon = new BMap.Icon(this.green, new BMap.Size(38, 16), {
              imageSize: new BMap.Size(38, 16)
            });
            break;
          case 2:
            Icon = new BMap.Icon(this.blue, new BMap.Size(38, 16), {
              imageSize: new BMap.Size(38, 16)
            });
            break;
          case 3:
            Icon = new BMap.Icon(this.yellow, new BMap.Size(38, 16), {
              imageSize: new BMap.Size(38, 16)
            });
            break;
        }
        if (item.carGpsMiss) {
          Icon = new BMap.Icon(this.gray, new BMap.Size(38, 16), {
            imageSize: new BMap.Size(38, 16)
          });
          item.blng = 114.064552;
          item.blat = 22.548456;
        }

        let marker = new BMap.Marker(new BMap.Point(item.blng, item.blat), {
          icon: Icon
        });
        marker.carInfo = item;
        if (item.carNumber) {
          let label = new BMap.Label(item.carNumber, {
            offset: new BMap.Size(-24, 18)
          });
          label.setStyle({
            border: "0",
            borderRadius: "4px",
            width: "86px",
            padding: "5px",
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            textAlign: "center",
            cursor: "pointer"
          });
          marker.setLabel(label);
          label.addEventListener("click", e => {
            this.openInfo(item, marker);
          });
        }
        marker.addEventListener("click", e => {
          this.openInfo(item, marker);
        });
        // let point = new BMap.Point(item.blng, item.blat);
        // this.map.setCenter(point);
        this.map.addOverlay(marker);
      });
    },
    selectCar(obj) {
      let arr1 = this.map.getOverlays();
      let marker = arr1.find(item => {
        return item.carInfo.carNumber == obj.carNumber;
      });
      this.openInfo(obj, marker);
    },
    setCarLabelStyle(marker) {
      let label = marker.getLabel();
      if (label) {
        let status = marker.carInfo.carMonitoringStatus;
        let colorList = [
          "rgb(254 68 11)",
          "rgb(155 220 65)",
          "rgb(129 221 236)"
        ];
        label.setStyle({
          backgroundColor: colorList[status]
        });
        marker.setZIndex(this.zIndexNum++);
      }
    },
    //点击显示弹窗
    openInfo(obj, marker) {
      this.carList.forEach(item => (item.focus = false));
      obj.focus = true;
      this.selectedCarInfo = {};
      let point = new BMap.Point(obj.blng, obj.blat);
      let opts = {
        boxStyle: {
          // width: "600px",
          zIndex: "1000"
        },
        offset: new BMap.Size(10, 30),
        closeIconMargin: "-20px -20px 0 0",
        closeIconUrl: require("@/assets/img/delete.png"),
        // enableAutoPan: true,
        align: INFOBOX_AT_TOP
      };

      queryCarStateDeatil({
        carNumber: obj.carNumber,
        dispatchOrder: obj.dispatchOrder,
        dispatchCode: obj.dispatchCode
      }).then(res => {
        if (res.code == 200) {
          let tempObj = res.obj || {};
          tempObj.carGpsMiss = obj.carGpsMiss;
          tempObj.carRecordMiss = obj.carRecordMiss;
          tempObj.exceptionTypeName = obj.exceptionTypeName;
          tempObj.carrierNo = obj.carrierNo;
          tempObj.carMonitoringStatus = obj.carMonitoringStatus;
          this.selectedCarInfo = tempObj;
          if (obj.carMonitoringStatus != 3 && !obj.carGpsMiss) {
            this.getBaiduAddressFromBaidu(point, this.selectedCarInfo);
          }
          let infoBox = new BMapLib.InfoBox(
            this.map,
            this.$refs.carInfobox,
            opts
          );
          infoBox.addEventListener("close", function(e) {
            let label = marker.getLabel();
            if (label) {
              label.setStyle({
                backgroundColor: "rgba(0, 0, 0, 0.5)"
              });
            }
          });
          if (this.lastInfoBox) {
            this.lastInfoBox.close();
          }
          this.lastInfoBox = infoBox;
          this.setCarLabelStyle(marker);

          let pixel = this.map.pointToPixel(marker.getPosition());
          let nPixel = new BMap.Pixel(pixel.x, pixel.y - 250);
          let nPoint = this.map.pixelToPoint(nPixel);

          this.map.panTo(nPoint);
          infoBox.open(marker);
        }
      });
    },
    //百度地址解析
    getBaiduAddressFromBaidu(point, obj) {
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
          obj.address = finaladdress;
          document.querySelector(
            ".carInfobox .cell.address"
          ).innerText = finaladdress;
        }
      });
    },
    //单位搜索过滤
    filterNode(value, data) {
      if (!value) return true;
      return (
        data.name.indexOf(value) !== -1 ||
        (data.abbr && data.abbr.indexOf(value) !== -1)
      );
    }
  }
};
</script>

<style lang="scss">
.left-content,
.right-content {
  .el-scrollbar {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      &::-webkit-scrollbar {
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: transparent;
      }
    }
  }
}
.left-content {
  .el-scrollbar {
    padding: 10px 0;
  }
  .el-tree-node__content {
    height: 32px;
  }
  .el-tree-node__content:hover {
    background: rgba(22, 124, 114, 0.3);
  }
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background: rgba(22, 124, 114, 0.2);
  }
  .el-tree-node:focus > .el-tree-node__content {
    background-color: #007d85;
  }
  .el-icon-caret-right:not(.is-leaf):before {
    color: #fff;
  }
  .el-tree__empty-text {
    color: #fff;
  }
}
#map {
  .infoBox {
    background: none !important;
  }
}
</style>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  .main {
    position: relative;
    width: 100%;
    height: 100%;
    .left {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: 10px;
      width: 200px;
      .left-top {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        padding: 10px;
        background: rgba(0, 187, 194, 0.6);
        margin-bottom: 1px;
      }
      .left-content {
        flex: 1;
        background: rgba(0, 187, 194, 0.6);
        padding: 0;
        overflow: hidden;
        .el-tree {
          background: transparent;
          color: #fff;
          font-size: 14px;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 50px;
      bottom: 50px;
      right: 10px;
      width: 130px;
      color: #fff;
      font-size: 14px;
      .right-top {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        background: rgba(0, 187, 194, 0.6);
        margin-bottom: 1px;
      }
      .right-content {
        flex: 1;
        background: rgba(0, 187, 194, 0.6);
        padding: 0;
        overflow: hidden;
        .empty {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          font-size: 12px;
        }
        .item {
          position: relative;
          padding: 5px 10px;
          border-bottom: 1px dashed #fff;
          cursor: pointer;
          .car-number {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 20px;
          }
          .order-number {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 20px;
            font-size: 12px;
          }
          &.focus {
            background: #007d85 !important;
          }
          &:hover {
            background: rgba(22, 124, 114, 0.3);
          }
          // &:last-child{
          //   border-bottom: none;
          // }
          &.red::before,
          &.green::before,
          &.blue::before,
          &.yellow::before {
            position: absolute;
            top: 0;
            left: 0;
            content: "";
            width: 5px;
            height: 100%;
          }
          &.red::before {
            background-color: #ff5656;
          }
          &.green::before {
            background-color: #5dbd5d;
          }
          &.blue::before {
            background-color: #509eff;
          }
          &.yellow::before {
            background-color: #ffb860;
          }
        }
      }
    }
    .top {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      .item-block {
        width: 66px;
        margin: 0 5px;
        .state {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 12px;
          height: 26px;
          border-radius: 8px;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          i {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 10px;
            height: 10px;
            border: 1px solid #fff;
            border-radius: 50%;
            margin-right: 5px;
            &.checked::before {
              content: "";
              width: 6px;
              height: 6px;
              background-color: #fff;
              border-radius: 50%;
            }
          }
        }
        .num {
          margin-top: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          font-size: 12px;
          height: 16px;
          border-radius: 4px;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
        }
        &.red {
          .state {
            background-color: #ff5656;
          }
          .num {
            color: #ff5656;
          }
        }
        &.green {
          .state {
            background-color: #5dbd5d;
          }
          .num {
            color: #5dbd5d;
          }
        }
        &.blue {
          .state {
            background-color: #509eff;
          }
          .num {
            color: #509eff;
          }
        }
        &.yellow {
          .state {
            background-color: #ffb860;
          }
          .num {
            color: #ffb860;
          }
        }
      }
    }
    .fullscreen {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 22px;
      height: 22px;
      border: 2px solid #fff;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
      background-color: rgba(0, 0, 0, 0.2);
      cursor: pointer;
      &.focus {
        border: 2px solid rgba(0, 187, 194, 0.6);
        background-color: rgba(0, 187, 194, 0.2);
      }
    }
    #map {
      width: 100%;
      height: 100%;
    }
  }
  .carInfobox {
    background: rgba(0, 0, 0, 0.6);
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    cursor: default;
    .content {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 20px 0;
      .block-wrap {
        color: #333;
        margin: 0 20px;
        width: 300px;
        .title {
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px dashed #ddd;
          color: #fff;
        }
      }
    }
    .table {
      display: table;
      .row {
        display: table-row;
        .cell {
          display: table-cell;
          padding: 5px 0;
          font-size: 13px;
          color: #fff;
        }
        .cell:first-child {
          font-weight: 500;
          padding-right: 10px;
          width: 90px;
          color: #eee;
        }
      }
    }
    .path-view {
      margin: 10px 0 20px;
      position: relative;
      padding: 20px 20% 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .line {
        position: absolute;
        top: 27px;
        left: 22%;
        right: 22%;
        height: 6px;
        background: #5dbd5d;
      }
      .point {
        position: inherit;
        i {
          display: block;
          box-sizing: content-box;
          width: 12px;
          height: 12px;
          background-color: #5dbd5d;
          border: 4px solid #fff;
          border-radius: 50%;
        }
        .start,
        .end {
          position: absolute;
          left: -90px;
          width: 200px;
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .start {
          color: #eee;
          top: -20px;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
        }
        .end {
          color: #fff;
          top: 20px;
          font-size: 14px;
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .miss-info {
      font-size: 14px;
      text-align: center;
      color: #ff5656;
      span {
        margin: 0 10px;
      }
      .yellow {
        color: #ffb860;
      }
    }
    .bottom {
      padding: 10px 0;
      border-top: 1px solid #ddd;
      text-align: center;
      .item {
        display: inline-block;
        width: 66px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        border-radius: 15px;
        background-image: linear-gradient(to right, #00d4d8, #009396);
        text-decoration: none;
        text-align: center;
        color: white;
        margin: 0 10px;
        cursor: pointer;
        &.disabled {
          background: #ddd;
          cursor: not-allowed;
        }
      }
    }
  }
  .rowOrder {
    margin-bottom: 10px;
    .colOrder {
      /deep/.el-row {
        display: flex;
        .title {
          width: 60px;
          margin-right: 10px;
          text-align: right;
        }
      }
    }
  }
}
</style>
