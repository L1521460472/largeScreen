<template>
  <div class="triangle-container">
    <div class="panel-tit">昨日固废外运排行(吨)</div>
    <div id="triangle" ref="triangle" />
    <div v-show="!dataCfg.length" class="emptyTip">暂无数据</div>
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
      default: () => []
    }
  },
  data() {
    return {
      option: {},
      charts: null,
      xAxisData: [],
      seriesData: []
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
        // dataCfg = [
        //   ["鹏翔运输", 117.94],
        //   ["深投环保", 107.77],
        //   ["绿盾", 29.7],
        //   ["宏阳环保", 28.15],
        // ]
        if (this.charts) {
          this.xAxisData = dataCfg.map(item => item[0])
          this.seriesData = dataCfg.map(item => item[1])
          this.option.xAxis.data = this.xAxisData
          this.option.series[0].data = this.seriesData
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
        // backgroundColor: '#031245',
        grid: {
          top: '30px',
          bottom: '50px',
          left: '40px',
          right: '20px'
        },
        xAxis: {
          data: this.xAxisData || [],
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 18,
            align: 'center',
            verticalAlign: 'top',
            textStyle: {
              color: 'rgba(255,255,255,.8)',
              fontSize: 12
            },
            rotate: +30 // -15度角倾斜显示
            // interval:0,//横轴信息全部显示
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
        yAxis: [{
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,.8)'
            }
          },
          splitArea: {
            areaStyle: {
              color: 'rgba(255,255,255,.5)'
            }
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
        }
        ],
        series: [{
          type: 'pictorialBar',
          barCategoryGap: '10%',
          barMaxWidth: '15%',
          // symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          symbol: 'triangle',
          label: {
            show: true,
            position: 'top',
            distance: 15,
            color: 'rgba(255,255,255,.8)',
            fontWeight: 'bolder',
            fontSize: 12
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
                  offset: 0,
                  color: '#56F0FF'
                },
                {
                  offset: 1,
                  color: '#01AEEF'
                }
                ],
                global: false //  缺省为  false
              }
            },
            emphasis: {
              opacity: 1
            }
          },
          data: this.seriesData || []
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
      this.charts = echarts.init(document.getElementById('triangle'))
      if (this.dataCfg.length > 0) {
        this.charts.setOption(this.option)
      }
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
.triangle-container{
  width: 100%;
  height: 100%;
  flex: 1;
  margin-bottom: 20px /* 20/80 */;
  position: relative;
  background: rgba(0,0,0,.2);
  display: flex;
  flex-direction: column;
  #triangle{
    flex: 1;
  }
}
.panel-tit {
  padding: 10px;
  width: 100%;
  color: #37ffd7;
  font-weight: 700;
  font-size: 18px;
  position: relative;
  text-align: center;
  z-index: 100;
}
.emptyTip{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  color: #37ffd7;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#00f260), to(#0575e6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  font-size: 18px;
}
</style>
