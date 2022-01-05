<template>
  <div class="brokenLine-container">
    <div class="panel-tit">七日固废外运趋势(吨)</div>
    <div id="brokenLine" ref="brokenLine" />
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
        this.option.series[0].data = dataCfg
        this.charts.setOption(this.option, true)
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
        grid: {
          top: '30px',
          bottom: '40px',
          left: '40px',
          right: '20px'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: 'rgba(255,255,255,.8)'
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.3)'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: 'rgba(255,255,255,.8)'
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.3)'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          }
        },
        tooltip: {
          trigger: 'item',
          textStyle: {
            color: '#fff'
          },
          backgroundColor: 'rgba(50,50,50,0.7)',
          formatter: function(params) {
            return params.data[1]
          }
        },
        series: [{
          data: this.dataCfg,
          type: 'line',
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(38, 183, 154, 1)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(255, 255, 255, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }

            }
          },
          itemStyle: {
            normal: {
              color: '#26B79A'
            }
          }
        }]
      }
      if (this.isWhite) {
        const wOptions = {
          xAxis: {
            axisLabel: {
              color: '#333'
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(51,51,51,.3)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(51,51,51,.1)'
              }
            }
          },
          yAxis: {
            axisLabel: {
              color: '#333'
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(51,51,51,.3)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(51,51,51,.1)'
              }
            }
          },
          tooltip: {
            textStyle: {
              color: 'rgba(50,50,50,0.7)'
            },
            backgroundColor: '#eee'
          }
        }
        Object.assign(options, wOptions)
      }
      return options
    },
    init() {
      this.option = this.getOptions()
      this.charts = echarts.init(document.getElementById('brokenLine'))
      this.charts.setOption(this.option)
    },
    // 防抖函数来控制 resize 的频率
    $__resizeChartMethod: debounce(function() {
      if (this.charts) {
        this.charts.resize()
      }
    }, 300)
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
.brokenLine-container{
  width: 100%;
  height: 100%;
  flex: 1;
  margin-bottom: 20px; /* 20/80 */;
  position: relative;
  background: rgba(0,0,0,.2);
  display: flex;
  flex-direction: column;
  #brokenLine{
    flex: 1;
  }
}
.panel-tit {
  flex-shrink: 0;
  height: 48px;
  line-height: 28px;
  width: 100%;
  padding: 10px;
  color: #37ffd7;
  font-weight: 700;
  font-size: 18px;
  position: absolute;
  text-align: center;
  z-index: 100;
}
</style>
