import Pie from '@/page/dataStands/componets/pie.vue'
import Cylindrical from '@/page/dataStands/componets/cylindrical.vue'
import BrokenLine from '@/page/dataStands/componets/brokenLine.vue'
import Triangle from '@/page/dataStands/componets/triangle.vue'
import Rotation from '@/page/dataStands/componets/rotation.vue'
import Summary from '@/page/dataStands/componets/summary.vue'
import EchartsMap from '@/page/dataStands/componets/echartsMap.vue'
import Vehicle from '@/page/dataStands/componets/vehicle.vue'
import Icons from '@/page/dataStands/componets/icons.vue'
import WasteTypeSum from '@/page/wasteTypeSum/solidWasteTypeSum.vue'
import { findWasteTransSort, getDisposalRankWeight, getWeekTrendWeight, getMapInfo, getVehicleMonitor } from '@/page/dataStands/api'
import data from '@/data.json'
export default {
  components: {
    Pie,
    Cylindrical,
    BrokenLine,
    Triangle,
    Rotation,
    Summary,
    Vehicle,
    Icons,
    EchartsMap,
    WasteTypeSum
  },
  data() {
    return {
      store: 'dataStands/',
      modName: 'dataStands',
      successCode: 200,
      outWasteWeightResp: null,
      wasteTransSortResp: null,
      wasteTransRecordResp: [],
      weekTrendWeightResp: null,
      disposalRankWeightResp: null,
      outWasteWeightList: [],
      weekTrendWeightList: [],
      Rectangular: [],
      mapData: {
        lineList: [],
        wasteProductList: [],
        dispositionProductList: [],

        runningCarNum: 0,
        dailyWastePro: 0,
        dailyDispositionPro: 0
      },
      mapDataOrigin: null,
      mapDataFilter: {
        waste: [3],
        disposition: [3]
      },
      isModeShow: false,

      ws: null,
      lockReconnect: false,
      reConnectTT: null,

      dateOfToday: 0
    }
  },
  created() {
    // getVehicleMonitor().then(res => {
    //   debugger
    //   if (res.code == 200) {
    //     this.isModeShow = res.obj
    //   }
    // })
    this.isModeShow = true
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        this.getDailyData()

        // const originData = await getMapInfo()
        // console.log('originData', JSON.stringify(originData))
        const originData = await data['originData']
        if (originData.code === 200) {
          this.mapDataOrigin = originData
          this.setMapData()
        }
        const date = new Date().getDate()
        if (date === this.dateOfToday) {
          return
        } else {
          this.dateOfToday = date
        }

        // this.Rectangular = await Promise.all(
        //   [getWeekTrendWeight, getDisposalRankWeight, findWasteTransSort].map(async(m) => {
        //     let result = {}
        //     const temp = await m()

        //     if (temp.code === 200) {
        //       result = temp.obj.reduce((arr, cur) => {
        //         arr.push([cur.valueName, cur.valueWeight])
        //         return arr
        //       }, [])
        //     }
        //     return result
        //   }
        //   ))
        this.Rectangular = data['Rectangular']
        // console.log('Rectangular', JSON.stringify(this.Rectangular))

        this.getOutWasteWeight()
      } catch (error) {
        this.$message({
          type: 'error',
          message: error.message
        })
      }
    },
    setMapData() {
      const originData = this.mapDataOrigin

      this.mapData.wasteProductList = this.convertData(originData.obj.wasteProductList, 'waste')
      this.mapData.dispositionProductList = this.convertData(originData.obj.dispositionProductList, 'disposition')
      this.mapData.lineList = originData.obj.lineList || []
    },
    convertData(data, dataType) {
      // 3: 有工单， 2：无工单， 1：启用， 0：停用
      const filterData = new Set()
      this.mapDataFilter[dataType].forEach(fItem => {
        data.forEach(item => {
          if (fItem == 3 && item.orderStatus == 1) {
            filterData.add(item)
          } else if (fItem == 2 && item.status == 1 && item.orderStatus == 0) {
            filterData.add(item)
          } else if (fItem == 1 && item.status == 1) {
            filterData.add(item)
          } else if (fItem == 0 && item.status == 0) {
            filterData.add(item)
          }
        })
      })

      var res = []
      filterData.forEach(item => {
        res.push({
          dataType,
          id: item.id,
          name: item.productName,
          value: [item.lon, item.lat],
          type: 'ponit'
        })
      })
      return res
    },
    getDailyData() {
      if (this.ws) return
      this.createWebSocket()
    },
    getEmptyRotationData() {
      const data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          wasteProductionName: '',
          dispositionName: '',
          deliverTimeStr: ''
        })
      }
      return data
    },
    createWebSocket() {
      const wsData = data['wsData']
      // console.log('wsData')
      // console.log('wsData', JSON.stringify(wsData))
      this.mapData.runningCarNum = wsData.runningCarNum
      this.mapData.dailyWastePro = wsData.dailyWastePro
      this.mapData.dailyDispositionPro = wsData.dailyDispositionPro
      this.mapData.workloadNum = wsData.workloadNum
      this.wasteTransRecordResp = wsData.transportRecordList.concat(this.getEmptyRotationData())
      // const wsUrl = process.env.VUE_APP_WEBSOCKET_URL + 'DAILY_DATA' + new Date().getTime()
      // try {
      //   window.ws = this.ws = new WebSocket(wsUrl)
      //   ws.onopen = params => {
      //     // ws.send("hello")
      //   }
      //   ws.onmessage = e => {
      //     // const wsData = JSON.parse(e.data)
      //     const wsData = data['wsData']
      //     // console.log('wsData')
      //     // console.log('wsData', JSON.stringify(wsData))
      //     this.mapData.runningCarNum = wsData.runningCarNum
      //     this.mapData.dailyWastePro = wsData.dailyWastePro
      //     this.mapData.dailyDispositionPro = wsData.dailyDispositionPro
      //     this.mapData.workloadNum = wsData.workloadNum
      //     this.wasteTransRecordResp = wsData.transportRecordList.concat(this.getEmptyRotationData())
      //   }
      //   ws.onclose = () => {
      //     console.log('duan le')
      //     this.reConnect(wsUrl)
      //   }
      //   ws.onerror = () => {
      //     console.log('error le')
      //     this.reConnect(wsUrl)
      //   }
      // } catch (e) {
      //   this.reConnect(wsUrl)
      // }
    },
    reConnect(url) {
      if (this.lockReconnect) {
        return
      }
      this.lockReconnect = true
      this.reConnectTT = this.reConnectTT && clearTimeout(this.reConnectTT)
      this.reConnectTT = setTimeout(() => {
        this.createWebSocket(url)
        this.lockReconnect = false
      }, 3000)
    },
    // 查询昨日固废外运总量
    getOutWasteWeight() {
      this.$showLoading()
      this.$store.dispatch(this.store + 'getOutWasteWeight').then(() => {
        if (this.$store.state[this.modName].outWasteWeightResp.code == this.successCode) {
          this.outWasteWeightResp = this.$store.state[this.modName].outWasteWeightResp.obj
          this.outWasteWeightList = []
          this.outWasteWeightResp.forEach((item, index) => {
            this.outWasteWeightList.push({
              value: item.outWasteWeight,
              name: item.solidWasteName,
              id: item.solidWasteId
            })
          })
        }
      }).finally(() => {
        this.$hideLoading()
      })
    },

    getTransLines() {

    }

    // //七日外运趋势
    // getWeekTrendWeight() {
    //   this.$showLoading();
    //   this.$store.dispatch(this.store + 'getWeekTrendWeight').then(() => {
    //     if(this.$store.state[this.modName].weekTrendWeightResp.code == this.successCode){
    //       this.weekTrendWeightResp = this.$store.state[this.modName].weekTrendWeightResp.obj;
    //       this.weekTrendWeightResp.forEach((item)=>{
    //         this.weekTrendWeightList.push({
    //           value:item.valueWeight,
    //           name:item.valueName
    //         })
    //       })
    //     }
    //   }).finally(() => {
    //     this.$hideLoading();
    //   });
    // },
    // //昨日處置排行
    // getDisposalRankWeight() {
    //   this.$showLoading();
    //   this.$store.dispatch(this.store + 'getDisposalRankWeight').then(() => {
    //     if(this.$store.state[this.modName].disposalRankWeightResp.code == this.successCode){
    //       this.disposalRankWeightResp = this.$store.state[this.modName].disposalRankWeightResp.obj;
    //     }
    //   }).finally(() => {
    //     this.$hideLoading();
    //   });
    // },
    // //昨日固废外运排行
    // findWasteTransSort() {
    //   this.$showLoading();
    //   this.$store.dispatch(this.store + 'findWasteTransSort').then(() => {
    //     if(this.$store.state[this.modName].wasteTransSortResp.code == this.successCode){
    //       this.wasteTransSortResp = this.$store.state[this.modName].wasteTransSortResp.obj;

    //       this.wasteTransSortResp.forEach((item,index)=>{
    //         this.xAxisData.push(item.transName)
    //         this.seriesData.push(item.netWeight)
    //       })
    //     }
    //   }).finally(() => {
    //     this.$hideLoading();
    //   });
    // },
    // 固废实时记录
    // findWasteTransRecord() {
    //   this.$showLoading();
    //   this.$store.dispatch(this.store + 'findWasteTransRecord').then(() => {
    //     if(this.$store.state[this.modName].wasteTransRecordResp.code == this.successCode){
    //       this.wasteTransRecordResp = this.$store.state[this.modName].wasteTransRecordResp.obj;
    //     }
    //   }).finally(() => {
    //     this.$hideLoading();
    //   });
    // },
  },
  beforeDestroy() {
    this.ws && this.ws.close()
  }
}
