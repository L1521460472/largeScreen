<template>
  <div class="cylindrical-container">
    <div class="panel-tit">昨日处理处置排行(吨)</div>
    <div id="cylindrical" ref="cylindrical" />
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
          // dataCfg = [
          //   ["鹏翔运输", 117.94],
          //   ["深投环保", 107.77],
          //   ["绿盾", 29.7],
          //   ["宏阳环保", 28.15],
          // ]
          this.option.series[0].data = dataCfg
          this.charts.setOption(this.option)
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
        grid: {
          top: '30px',
          bottom: '50px',
          left: '40px',
          right: '20px'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            margin: 18,
            align: 'center',
            verticalAlign: 'top',
            color: 'rgba(255,255,255,.8)',
            interval: 0, // 横轴信息全部显示
            rotate: +30 // -15度角倾斜显示
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
        series: [{
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            // borderColor:'#F9CA0B',
            // borderRadius: [50, 50, 0, 0],
            // shadowColor: "rgba(249, 202, 11, 0.18)",
            emphasis: {
              barBorderRadius: 8
            },
            normal: {
              // barBorderRadius:[8, 8, 0, 0],
              label: {
                position: 'top',
                show: true, // 是否展示
                textStyle: {
                  fontSize: '12',
                  color: 'rgba(255,255,255,.8)'
                }
              },
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(249, 202, 11, 0.8)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(249, 202, 11, 0.18)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }

            }
          },
          data: this.dataCfg
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
      this.charts = echarts.init(document.getElementById('cylindrical'))
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
.cylindrical-container{
  width: 100%;
  height: 100%;
  flex: 1;
  /* margin-bottom: .25rem  20/80 */;
  position: relative;
  background: rgba(0,0,0,.2);
  display: flex;
  flex-direction: column;
  #cylindrical{
    flex: 1;
  }
}
.panel-tit {
  padding: 10px;
  width: 100%;
  color: #37ffd7;
  font-weight: 700;
  font-size: 18px;
  position: absolute;
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
