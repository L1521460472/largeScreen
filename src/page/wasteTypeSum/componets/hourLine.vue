<template>
  <div id="line" class="topPanel" />
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
        this.option.xAxis.data = dataCfg.hourTimes
        this.option.series[0].data=dataCfg.shipNetWeights
        charts.setOption(this.option,true)
      },
      deep: true
    }
  },
  methods:{
    init(){
      this.option = {
        textStyle: {
          color: 'rgba(255, 255, 255, .8)'
        },
        title: {
          text: '今日固废外运时间轴',
          textStyle: {
            color: 'rgba(255, 255, 255, .8)'
          },
          left: 'center'
        },
        xAxis: {
          axisTick: {
            show: false
          },
          axisLabel: {
            rotate: 45,
            color: 'rgba(255,255,255,.8)'
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.3)',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
            },
          },
          boundaryGap: false,
          type: 'category',
          data: this.dataCfg.hourTimes
        },
        yAxis: {
          name: '吨(t)',
          axisTick: {
            show: false
          },
          type: 'value',
          axisLabel: {
            color: 'rgba(255,255,255,.8)'
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.3)',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
            },
          }
        },
        series: [{
          type: 'line',
          lineStyle: {
            color: 'rgba(29, 255, 232, .2)'
          },
          coordinateSystem: 'cartesian2d',
          areaStyle: {},
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#56F0FF' // 0% 处的颜色
                }, {
                  offset: 1, color: '#01AEEF' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
              label: { show: true }
            }
          },
          data: this.dataCfg.shipNetWeights
        }
        ]
      }
      charts=echarts.init(document.getElementById("line"))
      charts.setOption(this.option)
    },
  },
}
</script>

<style lang='scss' scoped>
</style>
