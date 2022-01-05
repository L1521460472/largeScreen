<template>
  <div class="layer-vehicle">
    <div class="main">

      <Topbar
        :option-lists="optionLists"
        :option-check="optionCheck"
        :status-bar-list="statusBarList"
        @statusCheck="statusCheck"
        @typesCheck="getCarList"
        @unitsCheck="unitsCheck"
        @emptyCarsCheck="emptyCarsCheck"
      />

      <div v-if="optionCheck.order" class="left">
        <div class="left-top">
          <el-input v-model="searchUnitText" placeholder="单位搜索" clearable size="medium" />
        </div>

        <div class="left-content">
          <el-scrollbar>
            <el-tree
              ref="tree"
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
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <span v-if="node.level == 1">
                  {{ node.label + "(" + data.children.length + ")" }}
                </span>
                <span v-else :title="node.label + (data.carCount ? '(' + data.carCount + ')' : '')">
                  {{ data.abbr ? data.abbr : node.label }}{{ data.carCount ? '(' + data.carCount + ')' : '' }}
                </span>
              </span>
            </el-tree>
          </el-scrollbar>
        </div>
      </div>

      <div class="right">
        <div v-if="optionCheck.order" class="right-block" :class="{half: optionCheck.order && optionCheck.emptyCar}">
          <div class="right-block-title">车辆列表</div>
          <div class="right-block-content">
            <el-scrollbar v-if="carList.length">
              <div v-for="(item, index) in carList" :key="index" class="item" :class="[carColors[item.carMonitoringStatus], {focus: item.focus}]" @click="selectCar(item)">
                <div class="car-number">{{ item.carNumber ? item.carNumber : item.carMonitoringStatus == 3 ? '待派车' : '-' }}</div>
                <div class="car-type">
                  <span class="text">{{ item.carTypeName }}</span>
                </div>
                <div class="order-number">{{ item.dispatchOrder }}</div>
              </div>
            </el-scrollbar>
            <div v-else class="empty">暂无数据</div>
          </div>
        </div>

        <div v-if="optionCheck.emptyCar" class="right-block" :class="{half: optionCheck.order && optionCheck.emptyCar}">
          <div class="right-block-title">空闲车辆列表</div>
          <div class="right-block-content">
            <el-scrollbar v-if="idleCarList.length">
              <div v-for="(item, index) in idleCarList" :key="index" class="item" :class="['gray', {focus: item.focus}]" @click="selectEmptyCar(item)">
                <div class="car-number">{{ item.carHeadNumber }}</div>
                <div class="car-type">
                  <span class="text">{{ item.carTypeName }}</span>
                </div>
              </div>
            </el-scrollbar>
            <div v-else class="empty">暂无数据</div>
          </div>
        </div>
      </div>

      <div class="bottom" :class="{wide: !optionCheck.order && !optionCheck.emptyCar, leftWide: !optionCheck.order && optionCheck.emptyCar}"><slot /></div>
    </div>

    <div style="display: none">
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
          <div class="line">
            <div v-if="selectedCarInfo.distanceInfo" class="rate" :style="{width: selectedCarInfo.distanceInfo.rate + '%'}" />
          </div>
          <div v-if="selectedCarInfo.distanceInfo" class="distance">运距：<span class="ran">{{ selectedCarInfo.distanceInfo.distanceRan }}</span> / <span class="all">{{ selectedCarInfo.distanceInfo.distance }}</span> km</div>
          <div v-else class="distance">运距：<span class="all">{{ selectedCarInfo.distances }}</span> km</div>
          <div class="point">
            <i />
            <div class="start">起始单位</div>
            <div class="end">{{ selectedCarInfo.wasteAbbr }}</div>
            <div class="time">{{ selectedCarInfo.deliverTime }}</div>
          </div>
          <div class="point">
            <i />
            <div class="start">目的单位</div>
            <div class="end">{{ selectedCarInfo.dispositionUnitAbbr }}</div>
            <div class="time">{{ selectedCarInfo.workOrderFinishDateTime || '-' }}</div>
          </div>
        </div>

        <div class="bottom">
          <div class="item" :class="{disabled: selectedCarInfo.carGpsMiss}" @click="trackCar">跟踪</div>
          <div class="item" :class="{disabled: selectedCarInfo.carGpsMiss}" @click="trackCarLine">轨迹</div>
          <div class="item" @click="orderDetails">工单详情</div>
        </div>
      </div>

      <div ref="emptyCarInfobox" class="carInfobox">
        <div class="content">
          <div class="block-wrap">
            <div class="title">车辆信息</div>
            <div class="table">
              <div class="row">
                <div class="cell">车牌号:</div>
                <div class="cell">{{ selectedEmptyCarInfo.carNumber }}</div>
              </div>
              <div class="row">
                <div class="cell">车辆类型:</div>
                <div class="cell">{{ selectedEmptyCarInfo.carTypeName }}</div>
              </div>
              <div class="row">
                <div class="cell">车辆状态:</div>
                <div class="cell">{{ selectedEmptyCarInfo.statusDesc }}</div>
              </div>
              <div class="row">
                <div class="cell">速度:</div>
                <div class="cell">{{ selectedEmptyCarInfo.speed }}</div>
              </div>
              <div class="row">
                <div class="cell">位置:</div>
                <div class="cell address">{{ selectedEmptyCarInfo.address }}</div>
              </div>
              <div class="row">
                <div class="cell">定位时间:</div>
                <div class="cell">{{ selectedEmptyCarInfo.gpsTime }}</div>
              </div>
            </div>
          </div><div class="block-wrap">
            <div class="title">其它信息</div>
            <div class="table">
              <div class="row">
                <div class="cell">单位负责人:</div>
                <div class="cell">{{ selectedEmptyCarInfo.transContactPerson }}</div>
              </div>
              <div class="row">
                <div class="cell">负责人电话:</div>
                <div class="cell">{{ selectedEmptyCarInfo.transPhone }}</div>
              </div>
              <div class="row">
                <div class="cell">所属单位:</div>
                <div class="cell">{{ selectedEmptyCarInfo.transAbbr }}</div>
              </div>
              <div class="row">
                <div class="cell">单位全称:</div>
                <div class="cell">{{ selectedEmptyCarInfo.transName }}</div>
              </div>
              <!-- <div class="row">
                <div class="cell">调度工单:</div>
                <div class="cell">{{ selectedCarInfo.dispatchOrder }}</div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      class="vehicle-gd-detail"
      :class="{white: isWhite}"
      title="工单详情"
      :visible.sync="orderDialogVisible"
      :modal="false"
      :append-to-body="true"
    >
      <el-row class="rowOrder">
        <el-col :span="12" class="colOrder">
          <el-row>
            <span class="title">调度工单:</span>
            <span>{{ orderObj.dispatchOrder }}</span>
          </el-row>
          <el-row>
            <span class="title">产废单位:</span>
            <span>{{ orderObj.portName }}</span>
          </el-row>
          <el-row>
            <span class="title">处置单位:</span>
            <span>{{ orderObj.destination }}</span>
          </el-row>
          <el-row>
            <span class="title">预计重量:</span>
            <span>{{ orderObj.estimateWeight }}</span>
          </el-row>
          <el-row>
            <span class="title">发运日期:</span>
            <span> {{ orderObj.deliverTime }} </span>
          </el-row>
          <el-row>
            <span class="title">运输单位:</span>
            <span>{{ orderObj.transName }}</span>
          </el-row>
          <el-row>
            <span class="title">固废类型:</span>
            <span>{{ orderObj.solidWasteName }}</span>
          </el-row>
        </el-col>
        <el-col :span="12" class="colOrder">
          <el-row>
            <span class="title">派车工单:</span>
            <span>{{ orderObj.carrierRecordCode }}</span>
          </el-row>
          <el-row>
            <span class="title">车牌号:</span>
            <span>{{ orderObj.vehicleNo }}</span>
          </el-row>
          <el-row>
            <span class="title">司机姓名:</span>
            <span>{{ orderObj.driverName }}</span>
          </el-row>
          <el-row>
            <span class="title">空载重量:</span>
            <span>{{ orderObj.emptyLoadedWeight }}</span>
          </el-row>
          <el-row>
            <span class="title">满载重量:</span>
            <span> {{ orderObj.departWeight }} </span>
          </el-row>
          <el-row>
            <span class="title">车型:</span>
            <span>{{ orderObj.carTypeName }}</span>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  initInfo,
  getAllUnit,
  getBaseInfo,
  queryCarStateDeatil,
  getTmDispatchOrder,
  getIdleCars,
  getIdleCarDetail,
  getGpsHistoryBatch
} from '../api/vehicleApi'
import Topbar from './vehicle/topbar'
import { getDistance } from '@/utils/mapUtil'
import data from '@/data.json'

export default {
  name: 'Vehicle',
  components: {
    Topbar
  },
  props: {
    map: {
      type: Object,
      default: null
    },
    mapData: {
      type: Object,
      default: () => ({})
    },
    isBubbleHide: {
      type: Boolean,
      default: false
    },
    isWhite: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      optionLists: {
        waste: [
          { key: '有工单', value: 3, checked: true },
          { key: '无工单', value: 2, checked: false },
          { key: '启用', value: 1, checked: false },
          { key: '停用', value: 0, checked: false }
        ],
        disposition: [
          { key: '有工单', value: 3, checked: true },
          { key: '无工单', value: 2, checked: false },
          { key: '启用', value: 1, checked: false },
          { key: '停用', value: 0, checked: false }
        ],
        wasteType: [],
        carType: []
      },
      optionCheck: {
        order: true,
        emptyCar: false
      },
      units: {
        dispositionUnits: [],
        wasteUnits: [],
        transUnits: []
      },

      lastInfoBox: null,

      searchUnitText: '',
      treeData: [],
      defExtendkeys: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        abbr: 'abbr'
      },
      statusBarList: [
        { key: 0, name: '异常', class: 'red', checked: true, num: 0 },
        { key: 1, name: '运输中', class: 'green', checked: true, num: 0 },
        { key: 2, name: '待运输', class: 'blue', checked: false, num: 0 },
        { key: 3, name: '待派车', class: 'yellow', checked: false, num: 0 },
        { key: 4, name: '已完成', class: 'lightGreen', checked: false, num: 0 }
      ],
      carColors: ['red', 'green', 'blue', 'yellow', 'lightGreen'],
      carList: [
        // {carNumber: '粤BFD646', focus: false, carState: '行驶'},
      ],
      selectedCarInfo: {},

      blue: require('@/assets/img/car_blue.png'),
      gray: require('@/assets/img/car_gray.png'),
      red: require('@/assets/img/car_red.png'),
      green: require('@/assets/img/car_green.png'),
      yellow: require('@/assets/img/car_yellow.png'),
      lightGreen: require('@/assets/img/car_light_green.png'),

      orderObj: {}, // 工单详情对象
      orderDialogVisible: false,

      zIndexNum: 1900,

      idleCarList: [],
      selectedEmptyCarInfo: {},

      isDatascreen: window.localStorage.getItem('Datascreen') == 'Datascreen'
    }
  },
  watch: {
    searchUnitText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getinitInfo()
    this.getAllUnits()
    // initInfo().then(res => {
    //   if (res.code === 200) {
    //     this.optionLists.carType = res.obj.carTypeSelect.map(item => {
    //       item.checked = false
    //       item.key += item.effective ? '' : ' (已禁用)'
    //       return item
    //     })
    //     this.optionLists.wasteType = res.obj.solidWasteTypeSelect.map(item => {
    //       item.checked = false
    //       item.key += item.effective ? '' : ' (已禁用)'
    //       return item
    //     })
    //   }
    // })
    // getAllUnit().then(res => {
    //   if (res.code == 200) {
    //     this.units.dispositionUnits = JSON.parse(JSON.stringify(res.obj.dispositionUnits))
    //     this.units.wasteUnits = JSON.parse(JSON.stringify(res.obj.wasteUnits))
    //     this.units.transUnits = JSON.parse(JSON.stringify(res.obj.transUnits))

    //     this.treeData = [{
    //       name: '处置单位',
    //       children: res.obj.dispositionUnits.map(item => {
    //         item.key = 'disposalUnits'
    //         return item
    //       })
    //     },
    //     {
    //       name: '产废单位',
    //       children: res.obj.wasteUnits.map(item => {
    //         item.key = 'wasteUnits'
    //         return item
    //       })
    //     },
    //     {
    //       name: '运输单位',
    //       children: res.obj.transUnits.map(item => {
    //         item.key = 'transportUnits'
    //         return item
    //       })
    //     }]

    //     this.getCarList()
    //   }
    // })
  },
  mounted() {

  },
  methods: {
    getinitInfo() {
      const res = data['initInfo']
      this.optionLists.carType = res.obj.carTypeSelect.map(item => {
        item.checked = false
        item.key += item.effective ? '' : ' (已禁用)'
        return item
      })
      this.optionLists.wasteType = res.obj.solidWasteTypeSelect.map(item => {
        item.checked = false
        item.key += item.effective ? '' : ' (已禁用)'
        return item
      })
    },
    getAllUnits() {
      const res = data['AllUnits']

      if (res.code == 200) {
        this.units.dispositionUnits = JSON.parse(JSON.stringify(res.obj.dispositionUnits))
        this.units.wasteUnits = JSON.parse(JSON.stringify(res.obj.wasteUnits))
        this.units.transUnits = JSON.parse(JSON.stringify(res.obj.transUnits))

        this.treeData = [{
          name: '处置单位',
          children: res.obj.dispositionUnits.map(item => {
            item.key = 'disposalUnits'
            return item
          })
        },
        {
          name: '产废单位',
          children: res.obj.wasteUnits.map(item => {
            item.key = 'wasteUnits'
            return item
          })
        },
        {
          name: '运输单位',
          children: res.obj.transUnits.map(item => {
            item.key = 'transportUnits'
            return item
          })
        }]

        // this.getCarList()
      }
    },
    // 页面跳转
    trackCar() {
      if (this.selectedCarInfo.carGpsMiss) return
      let path = '/vehicleTrack'
      this.isDatascreen && (path = '/Datascreen/vehicleTrack')
      this.$router.push({
        path,
        query: { carNumber: this.selectedCarInfo.carNumber, statuFlag: this.selectedCarInfo.carState }
      })
    },
    // 页面跳转
    trackCarLine() {
      if (this.selectedCarInfo.carGpsMiss) return
      let path = '/carTrajectory'
      this.isDatascreen && (path = '/Datascreen/carTrajectory')
      this.$router.push({
        path,
        query: { carNumber: this.selectedCarInfo.carNumber }
      })
    },
    // 工单详情
    orderDetails() {
      const obj = data['orderDetails']
      this.orderObj = obj
      this.orderDialogVisible = true

      // getTmDispatchOrder({ vehicleNo: this.selectedCarInfo.carNumber, carrierNo: this.selectedCarInfo.carrierNo }).then((res) => {
      //   debugger
      //   if (res.code === 200) {
      //     console.log('orderDetails', JSON.stringify(res.obj))
      //     this.orderObj = res.obj
      //     this.orderDialogVisible = true
      //   }
      // })
    },
    treeCheck(val) {
      this.getCarList()
    },
    statusCheck(item) {
      item.checked = !item.checked
      this.getCarList()
    },
    unitsCheck() {
      const filterWaste = this.optionLists.waste.filter(item => item.checked).map(item => item.value)
      const filterDisposition = this.optionLists.disposition.filter(item => item.checked).map(item => item.value)
      const emitData = {
        waste: filterWaste,
        disposition: filterDisposition
      }
      this.$emit('unitsCheck', emitData)
    },
    emptyCarsCheck(isChecked) {
      if (isChecked) {
        getIdleCars().then(res => {
          if (res.code == 200) {
            this.idleCarList = res.obj.map(item => {
              item.focus = false
              return item
            }) || []
            this.showEmptyCarListOnMap()
          }
        })
      } else {
        this.removeOverlayByDatatype('emptyCar')
      }
    },
    removeOverlayByDatatype(dataType) {
      const allOverlay = this.map.getOverlays()
      allOverlay.map(item => {
        if (item.dataType === dataType) {
          this.map.removeOverlay(item)
        }
      })
    },
    showEmptyCarListOnMap() {
      this.removeOverlayByDatatype('emptyCar')

      const Icon = new BMap.Icon(this.gray, new BMap.Size(15, 50), {
        imageSize: new BMap.Size(15, 50)
      })

      const validList = this.idleCarList.filter(item => {
        return item.blng && item.blat
      })

      validList.forEach(item => {
        const marker = new BMap.Marker(new BMap.Point(item.blng, item.blat), { icon: Icon, rotation: item.angle })
        marker.dataType = 'emptyCar'
        marker.carInfo = item
        marker.addEventListener('click', e => {
          this.openIdleInfo(item, marker)
        })
        this.map.addOverlay(marker)
      })

      if (!this.isBubbleHide) {
        validList.forEach(item => {
          const html = this.getEmptyCarRichMarkerHtml(item)
          this.showRichMarker(item, html, 'emptyCar')
        })
      }
    },
    getEmptyCarRichMarkerHtml(item) {
      return '<div class="rich-marker-empty-car-box car-box">\
        <div class="top">' + item.carHeadNumber + '</div>\
        <i class="triangle"></i>\
      </div>'
    },
    selectEmptyCar(obj) {
      const arr1 = this.map.getOverlays()
      const marker = arr1.find((item) => {
        return item.dataType == 'emptyCar' && item.carInfo && item.carInfo.carHeadNumber == obj.carHeadNumber
      })
      this.openIdleInfo(obj, marker)
    },
    openIdleInfo(obj, marker) {
      this.idleCarList.forEach(item => item.focus = false)
      obj.focus = true
      this.selectedEmptyCarInfo = {}
      const point = new BMap.Point(obj.blng, obj.blat)
      const opts = {
        boxStyle: {
          zIndex: '1000'
        },
        offset: new BMap.Size(10, 30),
        closeIconMargin: '-20px -20px 0 0',
        closeIconUrl: require('@/assets/img/delete.png'),
        align: INFOBOX_AT_TOP
      }

      getIdleCarDetail(obj.carHeadNumber).then(res => {
        if (res.code == 200) {
          this.selectedEmptyCarInfo = res.obj || {}
          if (obj.blng && obj.blat) {
            this.getBaiduAddressFromBaidu(point, this.selectedEmptyCarInfo)
          }
          const infoBox = new BMapLib.InfoBox(this.map, this.$refs.emptyCarInfobox, opts)
          infoBox.addEventListener('close', function(e) {
            const label = marker.getLabel()
            if (label) {
              label.setStyle({
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              })
            }
          })
          if (this.lastInfoBox) {
            this.lastInfoBox.close()
          }
          this.lastInfoBox = infoBox

          const pixel = this.map.pointToPixel(marker.getPosition())
          const nPixel = new BMap.Pixel(pixel.x, pixel.y - 150)
          const nPoint = this.map.pixelToPoint(nPixel)

          this.map.panTo(nPoint)
          infoBox.open(marker)
        }
      })
    },
    getCarList() {
      const that = this
      // const nodes = (this.$refs.tree && this.$refs.tree.getCheckedNodes(true)) || []
      // const params = {
      //   'disposalUnits': nodes.filter(item => item.key == 'disposalUnits').map(item => item.id),
      //   'wasteUnits': nodes.filter(item => item.key == 'wasteUnits').map(item => item.id),
      //   'transportUnits': nodes.filter(item => item.key == 'transportUnits').map(item => item.id),
      //   'homeMonitoringStatusList': this.statusBarList.filter(item => item.checked).map(item => item.key),
      //   'solidWasteIds': this.optionLists.wasteType.filter(item => item.checked).map(item => item.value),
      //   'carTypeIds': this.optionLists.carType.filter(item => item.checked).map(item => item.value)
      // }
      // getBaseInfo(params).then(res => {
      // if (res.code === 200) {
      // debugger
      // console.log('BaseInfo', JSON.stringify(res.obj))
      const res = { obj: {}}
      res.obj = data['BaseInfo']
      this.statusBarList[0].num = res.obj.execptionCount || 0
      this.statusBarList[1].num = res.obj.transportingCount || 0
      this.statusBarList[2].num = res.obj.waitTransportCount || 0
      this.statusBarList[3].num = res.obj.waitDispatchCount || 0
      this.statusBarList[4].num = res.obj.finishCount || 0

      if (res.obj.gpsCarStateDtoList) {
        res.obj.gpsCarStateDtoList.forEach(item => {
          item.wasteProductionName = item.wasteProductionId
          const find = that.units.wasteUnits.find(unit => item.wasteProductionId == unit.id)
          if (find) {
            item.wasteProductionName = find.abbr
          }

          item.dispositionName = item.dispositionId
          const find2 = that.units.dispositionUnits.find(unit => item.dispositionId == unit.id)
          if (find2) {
            item.dispositionName = find2.abbr
          }
        })
      }
      this.carList = res.obj.gpsCarStateDtoList || []
      this.showCarListOnMap()
      this.getCarLinesByCalc()
      // this.getCarLines()
      // }
      // })
    },
    getCarLines() {
      const params = this.carList.filter(item => {
        item.carMonitoringStatus == 1
      }).map(item => {
        return { carNumber: item.carNumber, beginDateTime: item.deliverTime }
      })
      getGpsHistoryBatch(params).then(res => {
        if (res.code == 200) {
          res.obj.forEach(item => {
            if (item.gpsHistorys && item.gpsHistorys.length) { this.showLine(item) }
          })
        }
      })
    },
    getCarLinesByCalc() {
      this.removeOverlayByDatatype('carLine')
      const todayTime = new Date().setHours(0, 0, 0, 0)
      const cars = this.carList.filter(item => {
        if (item.carMonitoringStatus == 1) {
          return true
        }
        return false
      })
      cars.forEach(car => {
        const line = this.mapData.lineList.find(line => {
          if (line.linePositionList && line.linePositionList.length) {
            return line.carTypeId == car.carTypeId && line.wasteProductionId == car.wasteProductionId && line.dispositionId == car.dispositionId
          }
          return false
        })
        if (line) {
          const ranLine = this.getRanLine(line.linePositionList, car)
          this.showLine(ranLine, car.carNumber)
        }
      })
    },
    getRanLine(line, car) {
      let distance = null; const blng = car.blng; const blat = car.blat
      let index = 0
      line.forEach((item, itemIndex) => {
        const sqrtDis = Math.sqrt(Math.pow(Math.abs(blng - item.blng), 2) + Math.pow(Math.abs(blat - item.blat), 2))
        if (sqrtDis < distance || distance === null) {
          distance = sqrtDis
          index = itemIndex
        }
      })
      this.getDistanceRate(line, index, car)
      return line.slice(0, index + 1).concat([{ blng, blat }])
    },
    getDistanceRate(line, ranLineIndex, car) {
      let distance = 0; let distanceRan = 0; let rate = 0
      let preItem = line[0]
      line.forEach((item, itemIndex) => {
        if (preItem.blng != item.blng || preItem.blat != item.blat) {
          distance += getDistance(preItem, item)
        }
        if (ranLineIndex == itemIndex) {
          distanceRan = distance
        }
        preItem = item
      })

      distance = (distance / 1000).toFixed(2)
      distanceRan = (distanceRan / 1000).toFixed(2)
      rate = (distanceRan / distance * 100).toFixed(2)
      car.distanceInfo = {
        distance,
        distanceRan,
        rate
      }
    },
    getTooltipContent(item) {
      const html = `<div style="position: absolute;top:20%;">
          <div style="padding:10px;width: 100%;border-radius: 6px;background: rgba(0, 0, 0, 0.4);border: 2px solid rgba(0, 187, 194, 0.36);">
          <div style="padding:4px;font-size: 14px;line-height: 14px;color: #fff;display: flex;">
            ${item.name}</div></div></div>`

      return html
    },
    showLine(linePList, carNumber) {
      const pointList = []
      linePList.forEach((line) => {
        pointList.push(new BMap.Point(line.blng, line.blat))
      })

      const polyline = new BMap.Polyline(pointList, {
        strokeColor: 'yellow',
        strokeOpacity: 1,
        strokeWeight: 3,
        strokeOpacity: 1
        // strokeStyle: 'dashed'
      })
      polyline.dataType = 'carLine'

      // let label
      // let labelContent = this.getTooltipContent({name: carNumber})
      // polyline.addEventListener("mouseover",(e) => {
      //   label = new BMap.Label(labelContent, {position: e.point})
      //   label.setStyle({
      //     textBorderColor: "#0a0c63",
      //     textBorderWidth: 2
      //   })
      //   label.setZIndex(99999)
      //   // polyline.setStrokeColor('brown')

      //   this.map.addOverlay(label)

      //   // this.polylines.forEach(line => {
      //   //   if (line != polyline) {
      //   //     line.setStrokeOpacity(0.2)
      //   //   }
      //   // })
      // })
      // polyline.addEventListener("mouseout",() => {
      //   // polyline.setStrokeColor('#5298FF')
      //   this.map.removeOverlay(label)
      //   // this.polylines.forEach(line => {
      //   //   line.setStrokeOpacity(1)
      //   // })
      // })

      this.map.addOverlay(polyline)
      // this.polylines.push(polyline)
    },
    showCarListOnMap() {
      this.removeOverlayByDatatype('car')

      this.carList.forEach(item => {
        let Icon = null
        switch (item.carMonitoringStatus) {
          case 0:
            Icon = new BMap.Icon(this.red, new BMap.Size(15, 50), {
              imageSize: new BMap.Size(15, 50)
            })
            break
          case 1:
            Icon = new BMap.Icon(this.green, new BMap.Size(15, 50), {
              imageSize: new BMap.Size(15, 50)
            })
            break
          case 2:
            Icon = new BMap.Icon(this.blue, new BMap.Size(15, 50), {
              imageSize: new BMap.Size(15, 50)
            })
            break
          case 3:
            Icon = new BMap.Icon(this.yellow, new BMap.Size(15, 50), {
              imageSize: new BMap.Size(15, 50)
            })
            break
          case 4:
            Icon = new BMap.Icon(this.lightGreen, new BMap.Size(15, 50), {
              imageSize: new BMap.Size(15, 50)
            })
            break
        }
        if (item.carGpsMiss) {
          Icon = new BMap.Icon(this.gray, new BMap.Size(15, 50), {
            imageSize: new BMap.Size(15, 50)
          })
          item.blng = 114.02039
          item.blat = 22.538718
        }

        const marker = new BMap.Marker(new BMap.Point(item.blng, item.blat), { icon: Icon, rotation: item.angle })
        marker.setZIndex(1000)
        marker.dataType = 'car'
        marker.carInfo = item
        marker.addEventListener('click', e => {
          this.openInfo(item, marker)
        })
        this.map.addOverlay(marker)
      })

      if (!this.isBubbleHide) {
        this.carList.forEach(item => {
          const html = this.getCarRichMarkerHtml(item)
          this.showRichMarker(item, html, 'car')
        })
      }
    },
    getCarRichMarkerHtml(item) {
      return '<div class="rich-marker-car-box car-box color' + item.carMonitoringStatus + '">\
        <div class="top">' + item.carNumber + '</div>\
        <div class="body">\
          <div class="route"><span>' + item.wasteProductionName + '</span><i></i><span>' + item.dispositionName + '</span></div>\
          <div class="weight"><span>净重: ' + (parseFloat(item.productionWasteSuttle / 1000).toFixed(2) || 0) + 'T</span></div>\
        </div>\
        <i class="triangle"></i>\
      </div>'
    },
    showRichMarker(item, html, dataType) {
      const point = new BMap.Point(item.blng, item.blat)

      const box = document.getElementById('get-size-box')
      if (!box) return
      box.innerHTML = html
      const carBox = box.querySelector('.car-box')
      const width = window.getComputedStyle(carBox, null).width
      const leftOffset = -parseInt(width) / 2; const topOffset = (dataType == 'emptyCar' ? -60 : -120)

      const richMarker = new BMapLib.RichMarker(html, point, {
        'anchor': new BMap.Size(leftOffset, topOffset),
        'enableDragging': false,
        'zIndex': 1900
      })
      richMarker.dataType = dataType
      richMarker.bubble = 'car'

      // richMarker.addEventListener("onmouseover", (e) => {
      //   e.target.setZIndex(++this.zIndexNum)
      // })
      richMarker.addEventListener('onclick', (e) => {
        e.target.setZIndex(++this.zIndexNum)
      })

      this.map.addOverlay(richMarker)
    },
    toggleCarBubble(isShow) {
      const allOverlay = this.map.getOverlays()
      allOverlay.map(item => {
        if (item.bubble === 'car') {
          this.map.removeOverlay(item)
        }
      })
      if (isShow) {
        this.carList.forEach(item => {
          const html = this.getCarRichMarkerHtml(item)
          this.showRichMarker(item, html, 'car')
        })

        this.idleCarList.filter(item => {
          return item.blng && item.blat
        }).forEach(item => {
          const html = this.getEmptyCarRichMarkerHtml(item)
          this.showRichMarker(item, html, 'emptyCar')
        })
      }
    },
    selectCar(obj) {
      const arr1 = this.map.getOverlays()
      const marker = arr1.find((item) => {
        return item.carInfo && item.carInfo.carNumber == obj.carNumber
      })
      this.openInfo(obj, marker)
    },
    // 点击显示弹窗
    openInfo(obj, marker) {
      this.carList.forEach(item => item.focus = false)
      obj.focus = true
      this.selectedCarInfo = {}
      const point = new BMap.Point(obj.blng, obj.blat)
      const opts = {
        boxStyle: {
          // width: "600px",
          zIndex: '1000'
        },
        offset: new BMap.Size(10, 30),
        closeIconMargin: '-20px -20px 0 0',
        closeIconUrl: require('@/assets/img/delete.png'),
        // enableAutoPan: true,
        align: INFOBOX_AT_TOP
      }

      // queryCarStateDeatil({ carNumber: obj.carNumber, dispatchOrder: obj.dispatchOrder, dispatchCode: obj.dispatchCode })
      //   .then(res => {
      // if (res.code == 200) {
      // console.log('CarStateDeatil', res.obj)
      // console.log('CarStateDeatil', JSON.stringify(res.obj))

      data['CarStateDeatil']
      // const tempObj = res.obj || {}
      const tempObj = data['CarStateDeatil']
      tempObj.carGpsMiss = obj.carGpsMiss
      // 屏蔽跟踪和轨迹
      // tempObj.carGpsMiss = true
      tempObj.carRecordMiss = obj.carRecordMiss
      tempObj.exceptionTypeName = obj.exceptionTypeName
      tempObj.carrierNo = obj.carrierNo
      tempObj.carMonitoringStatus = obj.carMonitoringStatus
      tempObj.distanceInfo = obj.distanceInfo ? Object.assign({}, obj.distanceInfo, { rate: 0 }) : null
      this.selectedCarInfo = tempObj
      if (obj.carMonitoringStatus != 3 && !obj.carGpsMiss) {
        this.getBaiduAddressFromBaidu(point, this.selectedCarInfo)
      }
      const infoBox = new BMapLib.InfoBox(this.map, this.$refs.carInfobox, opts)
      infoBox.addEventListener('close', function(e) {
        const label = marker.getLabel()
        if (label) {
          label.setStyle({
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          })
        }
      })
      if (this.lastInfoBox) {
        this.lastInfoBox.close()
      }
      this.lastInfoBox = infoBox

      const pixel = this.map.pointToPixel(marker.getPosition())
      const nPixel = new BMap.Pixel(pixel.x, pixel.y - 250)
      const nPoint = this.map.pixelToPoint(nPixel)

      this.map.panTo(nPoint)
      infoBox.open(marker)

      if (obj.distanceInfo) {
        setTimeout(() => {
          const dom = document.querySelector('.carInfobox .path-view .rate')
          dom.style.width = obj.distanceInfo ? obj.distanceInfo.rate + '%' : 0
        }, 10)
      }
      // }
      // })
    },
    // 百度地址解析
    getBaiduAddressFromBaidu(point, obj) {
      const geoc = new BMap.Geocoder()
      geoc.getLocation(point, function(rs) {
        if (rs) {
          var addComp = rs.addressComponents
          var surroundingPois = rs.surroundingPois
          var finaladdress =
            addComp.province +
            addComp.city +
            addComp.district +
            addComp.street +
            addComp.streetNumber
          var buildingAddress = ''
          if (surroundingPois && surroundingPois.length > 0) {
            // get max 3 size
            var realSize = Math.min(3, surroundingPois.length)
            for (var i = 0; i < realSize; ++i) {
              var singleAddress = surroundingPois[i].title
              buildingAddress += singleAddress
              if (i < realSize - 1) {
                buildingAddress += ','
              }
            }
          }
          if (buildingAddress.length > 0) {
            finaladdress += ';' + buildingAddress
          }
          obj.address = finaladdress
          document.querySelector('.carInfobox .cell.address').innerText = finaladdress
        }
      })
    },
    // 单位搜索过滤
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1 || (data.abbr && data.abbr.indexOf(value) !== -1)
    }
  }
}
</script>

<style lang="scss" >
.left-content,
.right-block-content{
  .el-scrollbar{
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      &::-webkit-scrollbar-track{
        background-color: transparent;
      }
      &::-webkit-scrollbar{
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: transparent;
      }
    }
  }
}
.left-top{
  .el-input--medium .el-input__inner{
    background: #26B79A33;
    border: 1px solid #26b79a33;
    color: #fff;
  }
}
.left-content{
  .el-scrollbar{
    padding: 10px 0;
  }
  .el-tree-node__content{
    height: 32px;
  }
  .el-tree-node__content:hover{
    background: rgba(22, 124, 114, .3);
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background: rgba(22, 124, 114, .2);
  }
  .el-tree-node:focus>.el-tree-node__content {
    background-color: #007d85;
  }
  .el-icon-caret-right:not(.is-leaf):before {
    color: #fff;
  }
  .el-tree__empty-text{
    color: #fff;
  }
}
#map {
  .infoBox{
    background: none !important;
  }
}

.carInfobox {
  background: #042242CC;
  overflow: auto;
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  cursor: default;
  .content{
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 20px 0;
    .block-wrap{
      color: #333;
      margin: 0 20px;
      width: 300px;
      .title{
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
      .cell{
        display: table-cell;
        padding: 5px 0;
        font-size: 13px;
        color: #fff;
      }
      .cell:first-child{
        font-weight: 500;
        padding-right: 10px;
        width: 90px;
        color: #eee;
      }
    }
  }
  .path-view{
    margin: 10px 0 20px;
    position: relative;
    padding: 20px 20% 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .line{
      position: absolute;
      top: 27px;
      left: 22%;
      right: 22%;
      height: 6px;
      background: #5dbd5d;
      .rate{
        width: 0;
        height: 100%;
        background: yellow;
        border-radius: 3px;
        transition: width 2s;
      }
    }
    .distance{
      position: absolute;
      top: 0;
      left: 22%;
      right: 22%;
      color: #fff;
      font-size: 14px;
      text-align: center;
      .ran{
        color: yellow;
      }
      .all{
        color: #5dbd5d;
      }
    }
    .point{
      position: inherit;
      i{
        display: block;
        box-sizing: content-box;
        width: 12px;
        height: 12px;
        background-color: #5dbd5d;
        border: 4px solid #fff;
        border-radius: 50%;
      }
      .start,
      .end,
      .time{
        position: absolute;
        left: -90px;
        width: 200px;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden
      }
      .start{
        color: #eee;
        top: -20px;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
      }
      .end{
        color: #fff;
        top: 20px;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
      }
      .time{
        color: #fff;
        top: 40px;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .miss-info{
    font-size: 14px;
    text-align: center;
    color:#ff5656;
    span{
      margin: 0 10px;
    }
    .yellow{
      color: #ffb860
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
      &.disabled{
        background: #ddd;
        cursor: not-allowed;
      }
    }
  }
}
.vehicle-gd-detail{
  color: #fff;
  .el-dialog{
    background-color: rgba(0, 29, 38, 0.9);
    width: 700px;
    min-height: 320px;
    border-radius: 12px;
    .el-dialog__header{
      border-top-right-radius: 12px;
      border-top-left-radius: 12px;
      background: #00141a;
      background-image: linear-gradient(45deg, #003b4d, #00141a);
      text-align: center;
      .el-dialog__title{
        color: #02be99;
        font-weight: 700;
        font-size: 22px;
      }
    }
    .el-dialog__body{
      color: #fff;
    }
    .rowOrder{
      .colOrder{
        .title{
          display: inline-block;
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
#get-size-box{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  visibility: hidden;
}
.rich-marker-car-box{
  display: inline-block;
  position: relative;
  // left: -50%;
  // top: -120px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  word-break: keep-all;
  white-space: nowrap;
  border-radius: 4px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  // opacity: 0.8;
  &.color0{
    .top::before{
      background: #FF793EFF;
    }
  }
  &.color1{
    .top::before{
      background: #2BC472FF;
    }
  }
  &.color2{
    .top::before{
      background: #00C7F1FF;
    }
  }
  &.color3{
    .top::before{
      background: #F8A500FF;
    }
  }
  &.color4{
    .top::before{
      background: #00EEBEFF;
    }
  }
  .top{
    position: relative;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    // color: #333;
    // background: #ffbb35;
    background: #005485;
    color: #fff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    word-break: keep-all;
    &::before{
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      top: 11px;
      left: 11px;
      // opacity: .5;
    }
  }
  .body{
    padding: 0 8px;
    font-size: 12px;
    // color: #333;
    // background: #FFDF61;
    background: #007AC1;
    color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    .route{
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      i{
        width: 26px;
        height: 7px;
        margin: 0 20px;
        background: url(~@/assets/img/arrow-route-white.png) no-repeat center;
        background-size: contain;
      }
    }
    .weight{
      height: 28px;
    }
  }
  .triangle{
    width: 0;
    height: 0;
    border-width: 8px 6px 0;
    border-style: solid;
    // border-color: #FFDF61 transparent transparent;
    border-color: #007AC1 transparent transparent;
    position: absolute;
    bottom: -8px;
    left: calc(50% - 6px);
  }
}
.rich-marker-empty-car-box{
  display: inline-block;
  position: relative;
  // left: -50%;
  // top: -60px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  padding: 0 20px;
  word-break: keep-all;
  white-space: nowrap;
  height: 28px;
  line-height: 28px;
  border-radius: 4px;
  background: #C1C1C1;
  opacity: 0.8;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  .triangle{
    width: 0;
    height: 0;
    border-width: 8px 6px 0;
    border-style: solid;
    border-color: #C1C1C1 transparent transparent;
    position: absolute;
    bottom: -8px;
    left: calc(50% - 6px);
  }
}
</style>

<style lang="scss" scoped>
.layer-vehicle {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  .main {
    position: relative;
    width: 100%;
    height: 100%;
    .left{
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 58px;
      bottom: 12px;
      left: 12px;
      width: 264px;
      background: #042242;
      opacity: 0.8;
      border-radius: 4px;
      pointer-events: all;
      user-select: none;
      .left-top{
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        padding: 12px;
        border-bottom: 1px solid #103b55;
      }
      .left-content{
        flex: 1;
        padding: 0;
        overflow: hidden;
        .el-tree{
          background: transparent;
          color: #fff;
          font-size: 14px;
        }
      }
    }
    .right{
      position: absolute;
      top: 58px;
      bottom: 12px;
      right: 12px;
    }
    .right-block{
      height: 100%;
      display: flex;
      flex-direction: column;
      width: 182px;
      color: #fff;
      font-size: 14px;
      background: #042242;
      opacity: 0.8;
      border-radius: 4px;
      pointer-events: all;
      user-select: none;
      &.half{
        height: calc(50% - 6px);
      }
      &:not(:first-child){
        margin-top: 12px;
      }
      .right-block-title{
        flex-shrink: 0;
        display: flex;
        align-items: center;
        padding-left: 15px;
        height: 42px;
        font-size: 15px;
        font-weight: bold;
        background: linear-gradient(#37ffd7 0%, #26b79a 100%);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      .right-block-content{
        flex: 1;
        padding: 0;
        overflow: hidden;
        .empty{
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          font-size: 12px;
        }
        .item{
          position: relative;
          padding: 12px 12px 12px 18px;
          border-bottom: 1px solid #103b55;
          cursor: pointer;
          .car-number{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 20px;
            color: #37FFD7;
            font-size: 16px;
            font-weight: bold;
          }
          .car-type{
            margin: 2px 0;
            .text{
              display: inline-block;
              height: 22px;
              line-height: 22px;
              text-align: center;
              padding: 0 10px;
              border-radius: 4px;
              color: #005746;
              background: #b4ffd9;
              word-break: keep-all;
              white-space: nowrap;
              max-width: 100%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden
            }
          }
          .order-number{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 20px;
            color: #37FFD7;
            font-size: 14px;
          }
          &.focus{
            background: #000 url(~@/assets/img/icon-check.png) no-repeat top right !important;
            background-size: 14px 14px !important;
          }
          &:hover{
            background: rgba(22, 124, 114, .3);
          }
          // &:last-child{
          //   border-bottom: none;
          // }
          &.red::before,
          &.green::before,
          &.blue::before,
          &.yellow::before,
          &.lightGreen::before,
          &.gray::before{
            position: absolute;
            top: 12px;
            bottom: 12px;
            left: 0;
            content: '';
            width: 6px;
            border-radius: 0 4px 4px 0;
          }
          &.red::before{
            background-color: #FF793EFF;
          }
          &.green::before{
            background-color: #2BC472FF;
          }
          &.blue::before{
            background-color: #00C7F1FF;
          }
          &.yellow::before{
            background-color: #F8A500FF;
          }
          &.lightGreen::before{
            background-color: #00EEBEFF;
          }
          &.gray::before{
            background-color: #C1C1C1;
          }
        }
      }
    }
    .bottom{
      position: absolute;
      left: 288px;
      right: 206px;
      bottom: 12px;
      &.wide{
        left: 12px;
        right: 12px;
      }
      &.leftWide{
        left: 12px;
        right: 206px;
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
