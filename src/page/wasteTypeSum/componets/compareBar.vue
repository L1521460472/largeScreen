<template>
  <div id="compareBar" class="btmRight" />
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
      option:{},
    }
  },
  mounted(){
    this.init()
  },
  watch: {
    dataCfg: {
      handler (dataCfg) {
        // 设置true清空echart缓存
        this.option.series[0].data = dataCfg.monthWeights
        this.option.series[1].data = dataCfg.lastWeights
        charts.setOption(this.option,true)
      },
      deep: true
    }
  },
  methods:{
    init(){
      this.option = {
        title: {
          text: '月同比/环比',
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
            if(params.name === '同比' && params.componentIndex ===0 ){
              return `今年此月${params.data}`
            }
            if(params.name === '同比' && params.componentIndex ===1 ){
              return `去年此月${params.data}`
            }
            if(params.name === '环比' && params.componentIndex ===0 ){
              return `今年此月${params.data}`
            }
            if(params.name === '环比' && params.componentIndex ===1 ){
              return `今年上个月${params.data}`
            }
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
            data: ['同比', '环比']
          }
        ],
        yAxis: [
          {
            name: '吨(t)',
            axisTick: { show: false },
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
            name: `${new Date().getMonth() + 1}月`,
            type: 'bar',
            // barGap: 0,
            barWidth : 56 ,
            emphasis: {
              focus: 'series'
            },
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
                }
                // label : {show: true}
              }
            },
            data: this.dataCfg.monthWeights
          },
          {
            name: '往期对比',
            type: 'bar',
            barWidth : 56 ,
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#00A2FF' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#775DFF' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
                // label : {show: true}
              }
            },
            data:this.dataCfg.lastWeights
          },
        ]
      },
      charts=echarts.init(document.getElementById("compareBar"))
      charts.setOption(this.option)
    },
  },
}
</script>

<style lang='scss' scoped>
</style>
