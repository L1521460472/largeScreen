<template>
  <div id="sevenBar" class="btmLeft" />
</template>

<script>
import echarts from 'echarts'
let charts=''
export default {
  props:{
    dataCfg:{
      type: Object,
      default: ()=>({})
    }
  },
  data(){
    return{
      option:{}
    }
  },
  mounted(){
    this.init()
  },
  watch: {
    dataCfg: {
      handler (dataCfg) {
        // 设置true清空echart缓存
        this.option.xAxis[0].data = dataCfg.weekTimes
        this.option.series[0].data = dataCfg.outTrendWeights
        charts.setOption(this.option,true)
      },
      deep: true
    }
  },
  methods:{
    init(){
      this.option = {
        title: {
          text: '近七日趋势图',
          textStyle: {
            color: 'rgba(255, 255, 255, .8)'
          },
          left: 'center'
        },
        textStyle: {
          color: 'rgba(255, 255, 255, .8)'
        },
        legend: {
          top: '10%',
          textStyle: {
            color: 'rgba(255, 255, 255, .8)'
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return params.data
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, .2)'
              }
            },
            data: this.dataCfg.weekTimes
          }
        ],
        yAxis: [
          {
            axisTick: { show: false },
            name: '吨(t)',
            type: 'value',
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, .2)'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1)',
              },
            }
          }
        ],
        series: [
          {
            type: 'bar',
            barGap: 0,
            barWidth : 30,
            itemStyle: {
              emphasis: {
                barBorderRadius: 8
              },
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#56f0ff' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#01AEEF' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                },
                // label : {show: true}
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: this.dataCfg.outTrendWeights
          },
        ]
      },
      charts=echarts.init(document.getElementById("sevenBar"))
      charts.setOption(this.option)
    },
  },
}
</script>

<style lang='scss' scoped>
</style>
