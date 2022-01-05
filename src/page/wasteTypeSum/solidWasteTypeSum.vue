<template>
  <div class="waste_wrap">
    <div class="btn_select">
      <el-select v-model="solidWasteId" placeholder="请选择" @change="handlsChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <hour-line :data-cfg="dataCfgs" />
    <div class="bottom">
      <div class="btm">
        <week-bar :data-cfg="dataCfgs" />
        <compare-bar :data-cfg="dataCfgs" />
      </div>
    </div>
    <div class="bottom_close">
      <img class="btn_close" src="@/assets/img/icon_close.png" @click="colseBtn"></img>
    </div>
  </div>
</template>

<script>
import HourLine from '@/page/wasteTypeSum/componets/hourLine.vue'
import WeekBar from '@/page/wasteTypeSum/componets/weekBar.vue'
import CompareBar from '@/page/wasteTypeSum/componets/compareBar.vue'
import { getCompareByWaste, getWasteHourWeight, getWasteTypeList, getWeekWeightByWaste } from '@/page/wasteTypeSum/api'
import data from '@/data.json'
export default {
  name: 'SolidWasteTypeSum',
  components: {
    HourLine,
    WeekBar,
    CompareBar
  },
  props: ['id'],
  data() {
    return {
      solidWasteId: '',
      options: [],
      dataCfgs: {
        hourTimes: [],
        shipNetWeights: [],
        weekTimes: [],
        outTrendWeights: [],
        monthWeights: [],
        lastWeights: []
      }
    }
  },
  mounted() {
    this.getWasteType()
    if (this.id) {
      this.solidWasteId = this.id
      this.initWastePage(this.id)
      // this.initWastePage(this.$route.query.id)
    }
  },
  methods: {
    getWasteType() {
      // getWasteTypeList().then((res) => {
      //   if (res.code === 200) {
      //     console.log('WasteTypeList', JSON.stringify(res.obj))
      //     this.options = res.obj.map(item => {
      //       return {
      //         value: item.value,
      //         label: item.desc
      //       }
      //     })
      //   }
      // })
      const obj = data['WasteTypeList']
      this.options = obj.map(item => {
        return {
          value: item.value,
          label: item.desc
        }
      })
    },
    initWastePage(wasteId) {
      if (!wasteId) {
        return
      }
      const WasteHourWeightobj = this.getData('WasteHourWeight', wasteId)
      this.dataCfgs.hourTimes = WasteHourWeightobj.map(item => item.hourTime)
      this.dataCfgs.shipNetWeights = WasteHourWeightobj.map(item => item.shipNetWeight)

      // getWasteHourWeight(wasteId).then((res) => {
      //   if (res.code === 200) {
      //     console.log(`WasteHourWeight==${wasteId}`, JSON.stringify(res.obj))
      //     this.dataCfgs.hourTimes = res.obj.map(item => item.hourTime)
      //     this.dataCfgs.shipNetWeights = res.obj.map(item => item.shipNetWeight)
      //   }
      // })
      // getWeekWeightByWaste(wasteId).then((res) => {
      //   if (res.code === 200) {
      //     console.log(`WeekWeightByWaste==${wasteId}`, JSON.stringify(res.obj))
      //     this.dataCfgs.weekTimes = res.obj.map(item => item.weekTime)
      //     this.dataCfgs.outTrendWeights = res.obj.map(item => item.outTrendWeight)
      //   }
      // })
      const WeekWeightByWasteobj = this.getData('WeekWeightByWaste', wasteId)
      this.dataCfgs.weekTimes = WeekWeightByWasteobj.map(item => item.weekTime)
      this.dataCfgs.outTrendWeights = WeekWeightByWasteobj.map(item => item.outTrendWeight)
      // getCompareByWaste(wasteId).then((res) => {
      //   if (res.code === 200) {
      //     console.log(`CompareByWaste==${wasteId}`, JSON.stringify(res.obj))
      //     this.dataCfgs.monthWeights = [res.obj.monthWeight, res.obj.monthWeight]
      //     this.dataCfgs.lastWeights = [res.obj.lastYearWeight, res.obj.lastMonthWeight]
      //   }
      // })
      const CompareByWasteobj = this.getData('CompareByWaste', wasteId)
      this.dataCfgs.monthWeights = [CompareByWasteobj.monthWeight, CompareByWasteobj.monthWeight]
      this.dataCfgs.lastWeights = [CompareByWasteobj.lastYearWeight, CompareByWasteobj.lastMonthWeight]
    },
    getData(type, id) {
      return data[type][id]
    },
    handlsChange() {
      if (!this.solidWasteId) {
        return
      }
      this.initWastePage(this.solidWasteId)
    },
    colseBtn() {
      this.$emit('wastetype')
    }
  }
}
</script>

<style lang="scss" scoped>
.waste_wrap{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1999;
  background-color: #062b52;
  // background-image: url('../../../assets/img/bg_img.jpg');
  // background-repeat: no-repeat;   //不重复
  // background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  .btn_select{
    position: absolute;
    width: 100px;
    height: 116px;
    top: 27px;
    right: 200px;
    z-index: 999;
    /deep/.el-select{
      .el-input{
        .el-input__inner{
          border-radius: 36px;
          color: #052242;
        }
      }
    }
  }
  .topPanel{
    flex: 1;
    padding: 15px;
    background: #052242;
    margin-bottom: 15px;
  }
  .bottom{
    width: 100%;
    flex: 1;
    .btm{
      // width: 100%;
      height: 100%;
      display: flex;
      margin-left: -15px;
      .btmLeft,.btmRight{
        padding: 15px;
        height: 100%;
        width: 50%;
        background: #052242;
        margin-left: 15px;
      }
    }
  }
}
.bottom_close{
  position: absolute;
  top: 27px;
  right: 30px;
  cursor: pointer;
  .btn_close{
    width: 26px;
    height: 26px;
  }
}
</style>
