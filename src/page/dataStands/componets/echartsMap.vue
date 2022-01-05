<template>
  <div class="echarts-map-container">
    <div id="shenzhenMap" class="map-box" />

    <div v-show="globalPopup.show" class="global-popup">
      <div class="global-popup-cont">
        <span class="popup-close" @click="globalPopupClose" />
        <div class="global-popup-tit">
          <span class="color">{{ globalPopup.title }}</span>
        </div>
        <div class="global-popup-bd">
          <div class="data-item-wrap">
            <div v-for="(item, index) in globalPopup.data" :key="index" class="data-item">
              <div class="item-name">{{ item.name }}: </div>
              <div class="item-value">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import 'echarts/extension/bmap/bmap'
import geoJson from '../config/geoJson'
// import symbolIcons from '../config/symbol'
// import { getDisposalPlanReceive, getWasteData, getTransCarData } from '../api/index'
import baiduMapStyle from '../../js/baiduMapStyle'
import data from '@/data.json'
// import lines from '../../js/lines'

let charts = ''
export default {
  props: {
    mapData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      map: null,
      option: null,
      dataTypeItems: [
        { name: 'waste', title: '产废单位' },
        { name: 'disposition', title: '处置单位' }
      ],
      globalPopup: {
        show: false,
        title: '',
        data: [],
        dataDisposition: [
          { name: '单位简称', key: 'storeAbbr', value: '' },
          { name: '计划接收', key: 'planReception', value: '' },
          { name: '已接收', key: 'received', value: '' },
          { name: '联系人', key: 'contactPerson', value: '' },
          { name: '联系方式', key: 'telephone', value: '' },
          { name: '地址', key: 'address', value: '' }
        ],
        dataWaste: [
          { name: '单位简称', key: 'portAbbr', value: '' },
          { name: '外运计划', key: 'planWeight', value: '' },
          { name: '已完成', key: 'finishedWeight', value: '' },
          { name: '联系人', key: 'contact', value: '' },
          { name: '联系方式', key: 'telephone', value: '' },
          { name: '地址', key: 'address', value: '' }
        ]
      },
      polylines: [],

      iconDisposition: require('@/assets/img/icon-circle-disposition.png'),
      iconWaste: require('@/assets/img/icon-circle-waste.png')
    }
  },
  watch: {
    mapData: {
      handler(mapData) {
        this.mapData = mapData
        this.refreshMap()
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getTooltipContent(item) {
      const html = `<div style="position: absolute;top:20%;">
          <div style="padding:10px;width: 100%;border-radius: 6px;background: rgba(0, 0, 0, 0.4);border: 2px solid rgba(0, 187, 194, 0.36);">
          <div style="padding:4px;font-size: 14px;line-height: 14px;color: #fff;display: flex;">
            ${item.name}</div></div></div>`

      return html
    },
    init() {
      const that = this
      const echarts = require('echarts')
      echarts.registerMap('广东', geoJson)
      charts = echarts.init(document.getElementById('shenzhenMap'), 'walden')
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: that.getTooltipContent
        },
        bmap: {
          center: [114.018971, 22.53591],
          zoom: 12,
          roam: true
        }
        // series: [
        //   {
        //     name: "处置单位",
        //     type: "scatter",
        //     animation: false,
        //     coordinateSystem: "bmap",
        //     zlevel: 1,
        //     rippleEffect: {
        //       brushType: "stroke",
        //     },
        //     label: {
        //       normal: {
        //         show: false,
        //         position: "bottom",
        //         formatter: "{b}",
        //         textBorderColor: "#0a0c63",
        //         textBorderWidth: 2,
        //       },
        //     },
        //     symbol: symbolIcons.disposition,
        //     symbolSize: [30, 30],
        //     data: this.mapData.dispositionProductList,
        //   },
        //   {
        //     name: "产废单位",
        //     type: "scatter",
        //     animation: false,
        //     coordinateSystem: "bmap",
        //     zlevel: 1,
        //     rippleEffect: {
        //       brushType: "stroke",
        //     },
        //     label: {
        //       normal: {
        //         show: false,
        //         position: "bottom",
        //         formatter: "{b}",
        //         textBorderColor: "#0a0c63",
        //         textBorderWidth: 2,
        //       },
        //     },
        //     symbol: symbolIcons.wasteProduct,
        //     symbolSize: [30, 30],
        //     data: this.mapData.wasteProductList,
        //   }
        // ]
      }

      // charts.on("click", params => {
      //   if (params.data.dataType == 'disposition') {
      //     this.setPopupTitle(params.data.dataType)
      //     this.globalPopup.data = this.globalPopup.dataDisposition
      //     getDisposalPlanReceive(params.data.id).then(res => {
      //       if (res.code == 200 && res.obj) {
      //         this.globalPopup.dataDisposition.forEach(item => item.value = res.obj[item.key])
      //       }
      //     })
      //   } else if (params.data.dataType == 'waste') {
      //     this.setPopupTitle(params.data.dataType)
      //     this.globalPopup.data = this.globalPopup.dataWaste
      //     getWasteData(params.data.id).then(res => {
      //       if (res.code == 200 && res.obj) {
      //         this.globalPopup.dataWaste.forEach(item => item.value = res.obj[item.key])
      //       }
      //     })
      //   }
      // })
      charts.setOption(this.option)
      this.refreshMap()
    },
    setPopupTitle(dataType) {
      this.globalPopup.show = true
      const find = this.dataTypeItems.find(item => { return item.name == dataType })
      this.globalPopup.title = find.title
    },
    globalPopupClose() {
      this.globalPopup.show = false
      this.globalPopup.title = ''
      this.globalPopup.data = []
    },
    refreshMap() {
      if (!this.map) {
        charts.setOption(this.option, true)
        this.map = charts.getModel().getComponent('bmap').getBMap()
        this.$emit('update:map', this.map)
        this.map.setMapStyleV2({ styleJson: baiduMapStyle.baiduMapStyle })
        this.map.disableBizAuthLogo()
      }
      // else {
      //   let option = charts.getOption()
      //   option.series[0].data = this.mapData.dispositionProductList
      //   option.series[1].data = this.mapData.wasteProductList
      //   charts.setOption(option)
      // }

      const allOverlay = this.map.getOverlays()
      allOverlay.map(item => {
        if (item.dataType === 'line' || item.dataType === 'waste' || item.dataType === 'disposition') {
          this.map.removeOverlay(item)
        }
      })

      this.polylines = []
      this.mapData.lineList.forEach(item => {
        if (item.linePositionList && item.linePositionList.length) { this.showLine(item) }
      })
      this.mapData.wasteProductList.forEach(item => {
        this.showUnit(item, this.iconWaste)
        const html = this.getRichMarkerHtml(item)
        this.showRichMarker(item, html)
      })
      this.mapData.dispositionProductList.forEach(item => {
        this.showUnit(item, this.iconDisposition)
        const html = this.getRichMarkerHtml(item)
        this.showRichMarker(item, html)
      })
    },
    showUnit(item, icon) {
      const Icon = new BMap.Icon(icon, new BMap.Size(30, 30), {
        imageSize: new BMap.Size(30, 30)
      })
      const marker = new BMap.Marker(new BMap.Point(item.value[0], item.value[1]), { icon: Icon })
      marker.setZIndex(1)
      marker.dataType = item.dataType
      marker.addEventListener('click', e => {
        this.openInfo(item)
      })
      this.map.addOverlay(marker)
    },
    getDisposalPlanReceiveCopy(id) {
      return data.PopInfo[id]
    },
    openInfo(item) {
      if (item.dataType == 'disposition') {
        this.setPopupTitle(item.dataType)
        this.globalPopup.data = this.globalPopup.dataDisposition
        // getDisposalPlanReceive(item.id).then(res => {
        //   if (res.code == 200 && res.obj) {
        //     console.log(`disposition==${item.id}::`, JSON.stringify(res.obj))

        //     this.globalPopup.dataDisposition.forEach(item => item.value = res.obj[item.key])
        //   }
        // })
        const obj = this.getDisposalPlanReceiveCopy(item.id)
        this.globalPopup.dataDisposition.forEach(item => item.value = obj[item.key])
      } else if (item.dataType == 'waste') {
        this.setPopupTitle(item.dataType)
        this.globalPopup.data = this.globalPopup.dataWaste
        // getWasteData(item.id).then(res => {
        //   if (res.code == 200 && res.obj) {
        //     console.log(`waste==${item.id}::`, JSON.stringify(res.obj))
        //     this.globalPopup.dataWaste.forEach(item => item.value = res.obj[item.key])
        //   }
        // })

        const obj = this.getDisposalPlanReceiveCopy(item.id)
        this.globalPopup.dataWaste.forEach(item => item.value = obj[item.key])
      }
    },
    showLine(item) {
      const line = item.linePositionList
      const pointList = []
      line.forEach((item) => {
        pointList.push(new BMap.Point(item.blng, item.blat))
      })

      const polyline = new BMap.Polyline(pointList, {
        strokeColor: '#5298FF',
        strokeOpacity: 1,
        strokeWeight: 3,
        strokeOpacity: 1
      })
      polyline.dataType = 'line'

      let label
      const labelContent = this.getTooltipContent({ name: item.wasteProductName + ' - ' + item.dispositionName })
      polyline.addEventListener('mouseover', (e) => {
        label = new BMap.Label(labelContent, { position: e.point, offset: new BMap.Size(12, 12) })
        // label.setStyle({
        //   textBorderColor: "#0a0c63",
        //   textBorderWidth: 2
        // })
        label.setZIndex(99999)
        polyline.setStrokeColor('red')

        this.map.addOverlay(label)

        this.polylines.forEach(line => {
          if (line != polyline) {
            line.setStrokeOpacity(0.2)
          }
        })
      })
      polyline.addEventListener('mousemove', (e) => {
        label.setPosition(e.point)
      })
      polyline.addEventListener('mouseout', () => {
        polyline.setStrokeColor('#5298FF')
        this.map.removeOverlay(label)
        this.polylines.forEach(line => {
          line.setStrokeOpacity(1)
        })
      })

      this.map.addOverlay(polyline)
      this.polylines.push(polyline)
    },
    getRichMarkerHtml(item) {
      const color = item.dataType == 'waste' ? 'blue' : item.dataType == 'disposition' ? 'orange' : ''
      return '<div class="rich-marker-box ' + color + '">\
        <span>' + item.name + '</span><i class="triangle"></i>\
      </div>'
    },
    showRichMarker(item, html) {
      const obj = item.value
      const point = new BMap.Point(obj[0], obj[1])

      const richMarker = new BMapLib.RichMarker(html, point, {
        'anchor': new BMap.Size(0, 0),
        'enableDragging': false,
        'zIndex': 900
      })
      richMarker.dataType = item.dataType
      this.map.addOverlay(richMarker)
    }
  }
}
</script>

<style lang="scss" scoped>
  .echarts-map-container{
    width: 100%;
    height: 100%;
    position: relative;
    /*   margin-bottom: .25rem 20/80 */;
    .map-box{
      width: 100%;
      height: 100%;
    }
    /*弹窗*/
    .global-popup {
      position: fixed;
      z-index: 10000;
      background-color: rgba(0, 0, 0, 0.6);
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      color: #fff;
    }
    .global-popup .global-popup-cont {
      background-color: rgba(0, 29, 38, 0.9);
      width: 700px;
      min-height: 320px;
      border-radius: 12px;
      box-shadow: 0 0 18px rgba(0, 0, 0, 0.8);
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .global-popup-cont .popup-close {
      width: 24px;
      height: 24px;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
      z-index: 999;
    }
    .global-popup-cont .popup-close:hover {
      opacity: 0.8;
    }
    .global-popup-cont .popup-close:after,
    .global-popup-cont .popup-close:before {
      height: 2px;
      width: 20px;
      background-color: #fff;
      content: "";
      display: block;
      position: absolute;
      border-radius: 4px;
      transform-origin: center;
      top: 11px;
      left: 2px;
    }
    .global-popup-cont .popup-close:before {
      -webkit-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
    .global-popup-cont .popup-close:after {
      -webkit-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    .global-popup .global-popup-tit {
      border-top-right-radius: 12px;
      border-top-left-radius: 12px;
      background: #00141a;
      background-image: -webkit-linear-gradient(45deg, #003b4d, #00141a);
      background-image: linear-gradient(45deg, #003b4d, #00141a);
      text-align: center;
      line-height: 42px;
    }
    .global-popup .global-popup-tit .color {
      color: #02be99;
      font-weight: 700;
      font-size: 22px;
      position: relative;
      background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#00f260), to(#0575e6));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    }
    .global-popup .global-popup-bd {
      position: relative;
      padding: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .data-item-wrap{
        width: 600px;
        .data-item{
          display: flex;
          font-size: 14px;
          margin: 10px;
          .item-name{
            flex-shrink: 0;
            padding-right: 10px;
            width: 120px;
            text-align: right;
            font-weight: bold;
          }
        }
      }
    }
  }
  .map-dialog{
    position: absolute;
    top:20%;
  }
  .box{
    padding:15px;
    width: 315px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.4);
    border: 2px solid rgba(0, 187, 194, 0.36);
  }
  .box .item{
    padding:4px;
    font-size: 14px;
    line-height: 14px;
    text-align: left;
    color: #fff;
    display: flex;
  }
  .item span{
    display: inline-block;
    flex:1;
    width: 50%;
  }
</style>
<style lang="scss">
.anchorBL{
  display: none !important;
}
.rich-marker-box{
  position: relative;
  left: -50%;
  bottom: -20px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  padding: 0 10px;
  word-break: keep-all;
  white-space: nowrap;
  height: 24px;
  line-height: 24px;
  border-radius: 4px;
  background: #1ac168;
  opacity: 0.8;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  // .triangle{
  //   width: 0;
  //   height: 0;
  //   border-width: 8px 6px 0;
  //   border-style: solid;
  //   border-color: #1ac168 transparent transparent;
  //   position: absolute;
  //   bottom: -8px;
  //   left: calc(50% - 6px);
  // }
  &.blue{
    background: #2387fa;
    // .triangle{
    //   border-color: #2387fa transparent transparent;
    // }
  }
  &.orange{
    background: #fb8e00;
    // .triangle{
    //   border-color: #fb8e00 transparent transparent;
    // }
  }
}
</style>
