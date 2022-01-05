<template>
  <div class="pie-container">
    <div class="panel-tit">昨日固废外运总量(吨)</div>
    <div id="pie" ref="pie" />
  </div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
import resizeMixins from '../mixins/resizeMixins'

export default {
  mixins: [resizeMixins],
  props: {
    isWhite: {
      type: Boolean,
      default: false
    },
    dataCfg: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      option: {},
      charts: null
    }
  },
  watch: {
    isWhite: {
      handler() {
        if (this.charts) {
          this.option = this.getOptions()
          this.charts.setOption(this.option)
        }
      },
      deep: true
    },
    dataCfg: {
      handler(dataCfg) {
        if (this.charts) {
          this.charts.clear()
          this.option.series[0].data = this.getData()
          this.charts.setOption(this.option, true)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getOptions() {
      const options = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          itemHeight: 12,
          itemWidth: 6,
          top: 10,
          left: 'center',
          textStyle: {
            color: '#fft',
            fontSize: 13
          }
        },
        series: [
          {
            top: 30,
            type: 'pie',
            radius: ['35%', '60%'],
            startAngle: 180,
            avoidLabelOverlap: true,
            showEmptyCircle: true,
            emptyCircleStyle: {
              color: '#fff'
            },
            itemStyle: {
              // borderRadius: 10,
              // borderColor: '#ffffcc',
              // borderWidth: 2,
              color: function(params) {
                const colorlist = [
                  new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: '#56F0FF'
                    },
                    {
                      offset: 1,
                      color: '#01AEEF'
                    }
                  ]),
                  new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: '#39DED5'
                    },
                    {
                      offset: 1,
                      color: '#11C8A0'
                    }
                  ]),
                  new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: '#5B60FF'
                    },
                    {
                      offset: 1,
                      color: '#702AFF'
                    }
                  ]),
                  new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: '#00A2FF'
                    },
                    {
                      offset: 1,
                      color: '#775DFF'
                    }
                  ]),
                  new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: '#FFD200'
                    },
                    {
                      offset: 1,
                      color: '#F8AE63'
                    }
                  ]),
                  new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: '#00D3FF'
                    },
                    {
                      offset: 1,
                      color: '#006AA1'
                    }
                  ]),
                  new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: '#00FFA8'
                    },
                    {
                      offset: 1,
                      color: '#0087CC'
                    }
                  ]),
                  new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: '#00E975'
                    },
                    {
                      offset: 1,
                      color: '#00AA39'
                    }
                  ])
                ]
                return colorlist[params.dataIndex]
              }
            },
            label: {
              show: true,
              // position: 'inside',
              fontSize: '16',
              fontWeight: 'bold',
              formatter: function(p) {
                return !p.value ? '' : p.value
              },
              color: '#fff',
              textShadow: '0px 3px 6px rgba(0, 0, 0, 0.3)'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true,
              width: 2,
              lineStyle: {
                color: '#fff'
              }
              // minTurnAngle: 30,
              // maxSurfaceAngle: 30,
            },
            data: this.getData()
          }
        ]
      }
      if (this.isWhite) {
        options.series[0].label.color = '#333'
        options.series[0].labelLine.lineStyle.color = '#333'
      }
      return options
    },
    init() {
      const that = this
      this.option = this.getOptions()
      this.charts = echarts.init(document.getElementById('pie'))
      this.charts.setOption(this.option)
      this.charts.on('click', function(params) {
        that.$parent.isWasteTypeSum = true
        that.$parent.wasteTypeId = params.data.id
        // that.$router.push({ path: 'dataStands_solidWasteTypeSum',query:{'id':params.data.id} })
      })
    },
    // 防抖函数来控制 resize 的频率
    $__resizeChartMethod: debounce(function() {
      if (this.charts) {
        this.charts.resize()
      }
    }, 300),
    getData() {
      return this.dataCfg.map(item => {
        item.labelLine = {
          show: item.value != 0
        }
        return item
      })
    }
  },
  beforeDestroy() {
    this.charts && this.charts.clear() && this.charts.dispose()
    this.charts = null
  },
  activated() {
    // 防止 keep-alive 之后图表变形
    if (this.charts) {
      this.charts.resize()
    }
  }
}
</script>

<style lang='scss' scoped>
.pie-container{
  width: 100%;
  height: 100%;
  flex: 1;
  margin-bottom: 20px /* 20/80 */;
  position: relative;
  background: rgba(0,0,0,.2);
  display: flex;
  flex-direction: column;
  #pie{
    flex: 1;
  }
}
.panel-tit {
  padding: 10px 10px 0;
  width: 100%;
  color: #37ffd7;
  font-weight: 700;
  font-size: 18px;
  position: relative;
  text-align: center;
  z-index: 100;
}
</style>
