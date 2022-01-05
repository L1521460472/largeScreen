<template>
  <div>
    <div class="wrap-contain">
      <ul class="map-info-tip">
        <li>
          <img src="./../../../assets/local-2.png" />产废单位<strong
            id="car-order"
            >7</strong
          >家
        </li>
        <li>
          <img src="./../../../assets/local-1.png" />处置单位<strong
            id="car-order"
            >7</strong
          >家
        </li>
        <!--                <li><img src="./../../../assets/local-3.png">运输单位<strong id="car-order">5</strong>家</li>-->
      </ul>
      <div style="width: 100%; height: 100%; z-index: 10" id="todayEnter"></div>

      <div class="right-contain">
        <div class="right-block-item">
          <div class="l-inner-cont">
            <div class="panel-tit">昨日固废外运总量(吨)</div>
            <div class="panel-data-cont">
              <div id="billStock1" style="width: 100%; height: 100%"></div>
            </div>
          </div>

          <!-- 边框样式 -->
          <div class="border-style">
            <div class="style-item style-item-topleft"></div>
            <div class="style-item style-item-topright"></div>
            <div class="style-item style-item-bottomleft"></div>
            <div class="style-item style-item-bottomright"></div>
          </div>
        </div>
        <div class="right-block-item">
          <div class="l-inner-cont">
            <div class="panel-tit">七日固废外运趋势(吨)</div>
            <div class="panel-data-cont">
              <div id="billStock2" style="width: 100%; height: 100%"></div>
            </div>
          </div>

          <!-- 边框样式 -->
          <div class="border-style">
            <div class="style-item style-item-topleft"></div>
            <div class="style-item style-item-topright"></div>
            <div class="style-item style-item-bottomleft"></div>
            <div class="style-item style-item-bottomright"></div>
          </div>
        </div>
      </div>

      <div class="left-contain">
        <div class="left-block-item">
          <div class="l-inner-cont">
            <div class="panel-tit">昨日固废外运排行(吨)</div>
            <div class="panel-data-cont">
              <div id="billStock3" style="width: 100%; height: 100%"></div>
            </div>
          </div>

          <!-- 边框样式 -->
          <div class="border-style">
            <div class="style-item style-item-topleft"></div>
            <div class="style-item style-item-topright"></div>
            <div class="style-item style-item-bottomleft"></div>
            <div class="style-item style-item-bottomright"></div>
          </div>
        </div>

        <div class="left-block-item">
          <div class="l-inner-cont">
            <div class="panel-tit">昨日固废处置排行(吨)</div>
            <div class="panel-data-cont">
              <div id="billStock4" style="width: 100%; height: 100%"></div>
            </div>
          </div>

          <!-- 边框样式 -->
          <div class="border-style">
            <div class="style-item style-item-topleft"></div>
            <div class="style-item style-item-topright"></div>
            <div class="style-item style-item-bottomleft"></div>
            <div class="style-item style-item-bottomright"></div>
          </div>
        </div>
      </div>

      <div class="bottom-contain">
        <div class="bottom-contain-left">
          <div class="l-inner-cont">
            <div class="panel-tit">固废实时运输记录</div>
            <div class="bottom-cont">
              <div class="bottom-cont-tit">
                <div class="tit-produce">产废单位</div>
                <div class="tit-handle">处置单位</div>
                <div class="tit-unit">运输单位</div>
                <div class="tit-number">车牌号</div>
                <div class="tit-type">固废类型</div>
                <div class="tit-kg">发运净重(吨)</div>
                <div class="tit-date">发运时间</div>
              </div>
              <!--                            <div class="bottom-cont-bd">-->
              <vue-seamless-scroll
                :data="listData"
                class="bottom-cont-bd"
                :class-option="classOption"
              >
                <ul ref="rampageChild">
                  <!--                                        <li class="roll-item" v-for="item in listData">{{item}}</li>-->
                  <li class="roll-item">
                    <div class="item-produce">罗芳水质净化厂</div>
                    <div class="item-handle">深圳妈湾电力有限公司</div>
                    <div class="item-unit fn-text-ellipsis">
                      深国际飞驰物流有限公司
                    </div>
                    <div class="item-number">粤BGL357</div>
                    <div class="item-type">40%污泥</div>
                    <div class="item-kg">30.55</div>
                    <div class="item-date">2020/12/14 9:00:12</div>
                  </li>
                  <li class="roll-item">
                    <div class="item-produce">福田水质净化厂</div>
                    <div class="item-handle">罗芳水质净化厂</div>
                    <div class="item-unit fn-text-ellipsis">
                      深国际飞驰物流有限公司
                    </div>
                    <div class="item-number">粤BFD646</div>
                    <div class="item-type">60%污泥</div>
                    <div class="item-kg">26.89</div>
                    <div class="item-date">2020/12/14 10:12:12</div>
                  </li>
                  <li class="roll-item">
                    <div class="item-produce">滨河水质净化厂</div>
                    <div class="item-handle">东莞市圣茵生物有机肥有限公司</div>
                    <div class="item-unit fn-text-ellipsis">
                      深圳市深水生态环境技术有限公司
                    </div>
                    <div class="item-number">粤BGL332</div>
                    <div class="item-type">80%污泥</div>
                    <div class="item-kg">15.52</div>
                    <div class="item-date">2020/12/14 11:26:12</div>
                  </li>
                  <li class="roll-item">
                    <div class="item-produce">南山水质净化厂</div>
                    <div class="item-handle">华润电力（海丰）有限公司</div>
                    <div class="item-unit fn-text-ellipsis">
                      深圳市鹏翔联合运输有限公司
                    </div>
                    <div class="item-number">粤BLT353</div>
                    <div class="item-type">40%污泥</div>
                    <div class="item-kg">18.26</div>
                    <div class="item-date">2020/12/14 11:35:12</div>
                  </li>
                  <li class="roll-item">
                    <div class="item-produce">布吉水质净化厂</div>
                    <div class="item-handle">华润电力（海丰）有限公司</div>
                    <div class="item-unit fn-text-ellipsis">
                      深国际飞驰物流有限公司
                    </div>
                    <div class="item-number">粤BGW017</div>
                    <div class="item-type">60%污泥</div>
                    <div class="item-kg">25.52</div>
                    <div class="item-date">2020/12/14 12:18:12</div>
                  </li>
                  <li class="roll-item">
                    <div class="item-produce">西丽再生水厂</div>
                    <div class="item-handle">
                      广宁县奥茵环境工程科技有限公司
                    </div>
                    <div class="item-unit fn-text-ellipsis">
                      深圳市鹏翔联合运输有限公司
                    </div>
                    <div class="item-number">粤BKJ861</div>
                    <div class="item-type">60%污泥</div>
                    <div class="item-kg">31.24</div>
                    <div class="item-date">2020/12/14 14:03:12</div>
                  </li>
                  <li class="roll-item">
                    <div class="item-produce">光明水质净化厂</div>
                    <div class="item-handle">深圳深南电环保有限公司</div>
                    <div class="item-unit fn-text-ellipsis">
                      深圳市广合安运输有限公司
                    </div>
                    <div class="item-number">粤BJR626</div>
                    <div class="item-type">40%污泥</div>
                    <div class="item-kg">19.66</div>
                    <div class="item-date">2020/12/14 15:00:12</div>
                  </li>
                  <li class="roll-item">
                    <div class="item-produce">坂雪岗水质净化厂</div>
                    <div class="item-handle">深圳妈湾电力有限公司</div>
                    <div class="item-unit fn-text-ellipsis">
                      深国际飞驰物流有限公司
                    </div>
                    <div class="item-number">粤BGW075</div>
                    <div class="item-type">80%污泥</div>
                    <div class="item-kg">24.18</div>
                    <div class="item-date">2020/12/14 19:32:12</div>
                  </li>
                </ul>
              </vue-seamless-scroll>
              <!--                            </div>-->
            </div>
          </div>
          <!-- 边框样式 -->
          <div class="border-style">
            <div class="style-item style-item-topleft"></div>
            <div class="style-item style-item-topright"></div>
            <div class="style-item style-item-bottomleft"></div>
            <div class="style-item style-item-bottomright"></div>
          </div>
        </div>
      </div>
    </div>
    <!--        -->
    <div class="global-popup" id="popUpfirst" v-show="piePopup">
      <div class="global-popup-cont">
        <span class="popup-close" @click="piePopupClose"></span>
        <div class="global-popup-tit">
          <span class="color">{{ pieTitle }}</span>
        </div>
        <div class="global-popup-bd">
          <div id="billStock5" style="width: 860px; height: 400px"></div>
        </div>
      </div>
    </div>

    <div class="global-popup" id="popUptwo" v-show="barPopup">
      <div class="global-popup-cont">
        <span class="popup-close" @click="barPopupClose"></span>
        <div class="global-popup-tit">
          <span class="color">{{ barPopupTitle }}</span>
        </div>
        <div class="global-popup-bd">
          <div id="billStock6" style="width: 860px; height: 400px"></div>
        </div>
      </div>
    </div>
    <!--        -->
  </div>
</template>
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import dataBeforeAddWh from "./js/routeDataBeforeAddWh";
import baiduMapStyle from "./js/baiduMapStyle";

import tubiao from "@/Subassembly/Chart/tubiao";
import showBMap from "@/components/showBMap";
import local2 from "@/assets/img/local2.png";
import local1 from "@/assets/img/local1.png";
export default {
  components: {
    vueSeamlessScroll
  },
  computed: {
    classOption() {
      return {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  },
  data() {
    return {
      baryAxisTitle: null,
      bartotalTitle: null,
      legendArr: null,
      baryAxis: null,
      bartotal: null,
      pieTitle: "",
      piexAxis: [],
      pieyAxis: [],
      pietotal: [],
      lineColor: ["#50a3ba", "#eac736"],
      color: ["#fdc830", "#3ed4ff", "#fff000", "#ffffff"],
      newColor: ["#ff700b", "#eb6100"],
      seriesArray: [],
      mapStock: null,
      scroll: null,
      listData: [1, 2, 3, 4, 5, 6, 7, 8],
      piePopup: false,
      barPopup: false,
      barPopupTitle: null
    };
  },
  methods: {
    //
    convertData(data) {
      var res = [];
      if (data.details) {
        for (var i = 0; i < data.details.length; i++) {
          var recItem = data.details[i];
          var fromCoord = [data.lon, data.lat];
          var toCoord = [recItem.lon, recItem.lat];
          if (fromCoord && toCoord) {
            res.push({
              fromName: data.whName,
              toName: recItem.city + "--" + recItem.county,
              coords: [fromCoord, toCoord],
              value: recItem.totalCus
            });
          }
        }
      }
      return res;
    },
    //
    refreshChart(orderData) {
      console.log(orderData);
      let that = this;
      var myChart = echarts.init(
        document.getElementById("todayEnter"),
        "walden"
      );
      if (!orderData) return;
      var series = [];
      let whArray = [];

      // 产废单位
      var chanfei = [
        {
          name: "罗芳水质净化厂",
          value: [114.155173, 22.547402, 280],
          address: "深圳市罗湖区延芳路98号",
          dun: 68
        },
        {
          name: "福田水质净化厂",
          value: [114.018971, 22.53591, 280],
          address: "深圳市福田区沙头街道白石路5号",
          dun: 100
        },
        {
          name: "滨河水质净化厂",
          value: [114.108583, 22.541277, 320],
          address: "深圳市福田区滨河大道二号大院",
          dun: 150
        },
        {
          name: "南山水质净化厂",
          value: [113.907371, 22.518654, 320],
          address: "深圳市南山区月亮湾大道2099号",
          dun: 90
        },
        {
          name: "布吉水质净化厂",
          value: [114.120213, 22.59737, 320],
          address: "深圳市龙岗区粤宝路2号-13",
          dun: 190
        },
        {
          name: "西丽再生水厂",
          value: [113.966946, 22.593232, 320],
          address: "深圳市南山区西丽街道沿河路19号",
          dun: 150
        },
        {
          name: "光明水质净化厂",
          value: [113.921324, 22.778184, 320],
          address: "广东省深圳市光明区马田街道将石社区河堤路东50米",
          dun: 200
        }
      ];

      // 处置单位
      // var chuzhi = [
      //   {
      //     name: "华润电力（海丰）有限公司",
      //     value: [115.052142, 22.758183],
      //     address: "广东省汕尾市海丰县小漠镇",
      //   },
      //   {
      //     name: "深圳妈湾电力有限公司",
      //     value: [113.884722, 22.482546],
      //     address: "深圳市南山区妈湾大道3号",
      //   },
      //   {
      //     name: "广宁县奥茵环境工程科技有限公司",
      //     value: [112.472638, 23.510013],
      //     address: "肇庆市广宁县石涧镇大塘垌石涧工业园",
      //   },
      //   {
      //     name: "恩平市华新环境工程有限公司",
      //     value: [112.369658, 22.029445],
      //     address: "江门市恩平市276省道西50米",
      //   },
      //   {
      //     name: "河源市固体废弃物集中处置中心有限公司",
      //     value: [114.724072, 23.809322],
      //     address: "河源市源城区高塘陶瓷工业园",
      //   },
      //   {
      //     name: "深圳市利赛环保科技有限公司",
      //     value: [114.101755, 22.61751],
      //     address: "深圳市龙岗区郁环路2号",
      //   },

      //   {
      //     name: "罗芳水质净化厂",
      //     value: [114.155173, 22.547402],
      //     address: "深圳市罗湖区延芳路98号",
      //   },
      // ];

      // 运输单位
      // var yunshu = [
      //     {
      //         name: '深国际飞驰物流有限公司',
      //         abbreviation:'深国际飞驰',
      //         value: [114.545257,22.745915],
      //         address:'惠州市大亚湾区石化大道中兴五路103号南山国际大厦1401'
      //     },
      //     {
      //         name: '深圳市鹏翔联合运输有限公司',
      //         abbreviation:'鹏翔运输',
      //         value: [114.267245,22.591153],
      //         address:'深圳市盐田区盐田街道东海社区洪安路1号泊郡雅苑B座13E'
      //     },
      //     {
      //         name: '深圳市宏信物流有限公司',
      //         abbreviation:'宏信物流',
      //         value: [114.249032,22.719911],
      //         address:'深圳市龙岗区龙城街道万科大厦15楼1510'
      //     },
      //     {
      //         name: '深圳市广合安运输有限公司',
      //         abbreviation:'广合安运输',
      //         value: [114.271584,22.715902],
      //         address:'深圳市龙岗区龙岗街道南联社区刘屋路(南段)58 号南联第五工业区第三栋 101'
      //     },
      //     {
      //         name: '深圳市深水生态环境技术有限公司',
      //         abbreviation:'水务罐车',
      //         value: [114.109429,22.546349],
      //         address:'深圳市深南中路1019号万德大厦2202室'
      //     }
      // ];

      let whNameArray = [
        "西丽再生水厂",
        "南山水质净化厂",
        "罗芳水质净化厂",
        "光明水质净化厂",
        "福田水质净化厂",
        "布吉水质净化厂",
        "滨河水质净化厂",
        "坂雪岗水质净化厂"
      ];
      // let whNameArray = [
      //     '南京仓','合肥仓','深圳仓',
      //     '南昌仓','武汉仓','长沙仓',
      // ];
      let newWhArray = [];
      // whAddressArray = orderData;
      orderData.forEach((item, i) => {
        let flag = false;
        whNameArray.forEach(index => {
          if (item.whName === index) {
            flag = true;
            return false;
          }
        });
        if (!flag) {
          return;
        }
        var scatterArray = [];
        if (item.details && item.details.length > 0) {
          item.details.forEach(function(recItem) {
            var data = {
              name: recItem.county,
              value: [
                recItem.lon,
                recItem.lat,
                0,
                recItem.totalWt,
                recItem.totalCus,
                recItem.totalOrder
              ],
              info: recItem
            };
            scatterArray.push(data);
          });
        }
        // if(item.whName === '长沙仓'){
        //     newWhArray.push({
        //         name: item.whName,
        //         value: [item.lon, item.lat,1, item.totalWt,item.details.length],
        //         info:item
        //     });
        // }else{
        //     whArray.push({
        //         name: item.whName,
        //         value: [item.lon, item.lat,1, item.totalWt,item.details.length],
        //         info:item
        //     });
        // }

        //添加线路
        series.push({
          type: "lines",
          coordinateSystem: "bmap",
          polyline: false, //多点线
          silent: false, //不响应鼠标和点击事件
          zlevel: 1,
          symbol: ["none", "arrow"],
          symbolSize: 6,
          effect: {
            show: true,
            constantSpeed: 30,
            symbol: "pin",
            symbolSize: 5,
            trailLength: 0
          },
          lineStyle: {
            normal: {
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              //     offset: 0,
              //     color: 'white'
              // }, {
              //     offset: 1,
              //     color: '#ffbf31'
              // }], false),
              color: params => {
                console.log(params.data.value);
                return params.data.value > 50
                  ? this.lineColor[1]
                  : this.lineColor[0];
              },
              width: 2,
              opacity: 0.3,
              curveness: 0.1
            }
          },
          data: that.convertData(item)
        });
        //添加目的地
        series.push({
          name: "endAddress",
          type: "scatter",
          coordinateSystem: "bmap",
          zlevel: 2,
          rippleEffect: {
            brushType: "stroke"
          },
          label: {
            normal: {
              show: false,
              position: [20, 0],
              formatter: "{b}"
            }
          },
          symbolSize: function(val) {
            return val[4] + 3;
          },
          symbol:
            "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAtFBMVEUAAAD///////////////////////////////////////////////////////////////80rPYun/Uwo/U3s/YqlvUxpvYzqfYtnfUsmvU5t/cokvQ2r/Y2sPbz+v7y+v5exPnm9v7l8/7B5/yE1PqBy/p4uvlSqfc3nfba8f3Y6/2+4fy83Puc2/ub1/qVyvqIxPpry/l9xPl8wvlmvvljufhYtvhFufdFuPdLsPddq/dCnfa7B85EAAAAEHRSTlMAEMCAYCDQ8O8wv39w4JBvU97wUgAAAbtJREFUSMeVlul2gjAQhQ2roNZUa6ulDags7rvV6vu/V+k5ThIgGY6ff0DuPZkZJhMaFYjV8v0OpY7vtyzSqMHu+rSA37UROWlRBS2ilTepkqbaYjtUi6OIy2tShKZX1lu0BgvT1zs8KhGu0ts9CO63dBVSCU/KV4p/kgYS6UTKg2dORH3CXVBiK1ZxoLqm0GdBhUw4zMcCPKDFbKBgtuBBkeICIejLjrCwhA13LBtoyBho/vNuw81upGULmnZuMKCeIwSorpGnDObjEOEIKsKbgg1RGG+Ql8fVsoeyhDrxFA644QBJcMM5/7ev/fXO3NB5XP32UX6gnxqQfr8G0HHDew2gEyHhehESJH36QDlVqpTghgQM/MVNX1Gm8OJ4a4S4IYTWEM2XYPpENB9PYvyFMIYU5A20+daykTeQzbd09KYhCkFjF4YAu6r1V1acM8SF+/lFpb/M4blLyoOMRZ8VIkYBszoq2bqsXwu9I4axSznjWJbHUE8ISDXu2TTeR3ko+3jKNOP++QOl3uGCnuO5qN578tglyoPd1CziQv0VFpXeJNjHSdsoqo223aiBWKZhOHnchmEqPn/+AKrFijy0ke0FAAAAAElFTkSuQmCC",
          symbolSize: [6, 6],

          itemStyle: {
            normal: {
              color: that.color[i]
            }
          },
          data: scatterArray
        });
      });
      //------------------------------------------------------------------------------------
      //产废单位
      series.push({
        name: "产废单位",
        type: "scatter",
        coordinateSystem: "bmap",
        zlevel: 6,
        rippleEffect: {
          brushType: "stroke"
        },
        label: {
          normal: {
            show: false,
            position: "bottom",
            formatter: "{b}",
            textBorderColor: "#0a0c63",
            textBorderWidth: 2
          }
        },
        symbolSize: function(val) {
          return val[4] / 8 + 8;
        },
        // 产废单位
        symbol:
          "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABlCAMAAACFixa5AAABj1BMVEUAAAAAAAAAAADw8PD////////////7+/v7+/v+/v7////+/v7////9/f3////////+/v7////////////9/f37+/v////8/Pz8/Pz39/f////+/v78/Pz///8jh/sjif39/v4ihfYjhvkhge8kiv4ihPQigvIhgO0hf+v4+PgfeuL8/Pwgfun7+/sgfecge+WRw/36+vrH4f5ZpfwfeeDy+P8xkf4wjvovi/UfeN5LnfvV6P50s/ys0v272/6t0/6fy/2myvTk8f/X6f/T5vxnrPvP4ff5/P/f7Pypz/v3+/9ap/9Amf611/0+lvrQ4/mz1PmCu/yozfd3tv9NoP7B3fy/2fa10/Xz+f/J4v/k8PyMwPpkoumgzP7G3/yXxvzI4PtBl/sqivk3kfieyPdvr/c9lPaKu/MohOtDkOc5iucnf+Pr9P9pr/+ax/nq8fiCufdXovZImfYyh+cwg+L0+v+Evv+Dvf52tf5iqfmvz/RSnvSpy/KXwfJfo/CUv+9tqu9vqel2r+5NlOVKk+Wo2LTNAAAAHXRSTlMAAQIQ0KDAodBA4DDv0FCAsCBwkKCBX2DwIPDwwO6seiMAAAeWSURBVGjetZlnW9pQGIalVFq1KtbWzmgAtxYiGEAEtFbq3qu1du+99x4/vE/OOclLBiSp5fkU8LruO+84QbHOY4INHa2t4VBIko6EQvWtrS0Ndf8xTUcPSvaEO9r+C72lvVGqlIPtTfukB1uPSNXT2LEffgfd/IUJRXm6sNDdnV5Y2FCU4hSV0fDPzdHxanFjsduaxXeXdUXonxQNIUG/+rS7QtIbE0JR73/eRwVeSTNWly2iDqE40uKTXy+xTCxa4HbJpujUUV/Lw/e+uEj0TkvKHAtcUe/jYLHpqlgZgjvFULzj6xT0uj1H2F4uAk/0ag4UobIz0eRt+Xl70mZ8tHS9UJyemp+fmi4WrpeiFsXmBTZqL4Ymxr9KeMAz+aW3kilvl/KZaLkifZkZ3LvUxvqzUY7PbUmO2dosV3RfZXNw3x8LP3pzSaqYpZtRs8F9l8ISohB+eW5GqpKZuduk6C66n4dWdrp0fjT68ZLkkkulaFQ3pNmkW6otqISMpw2+InnIFTIsqtVXKagdMBV8jr+1JHnKxC0ouGFTQkJVG6Ru6vzb45LHjN82DBsS0lCpAG1DFeP+wfdsoBouV9nVdtYgwY8suVKXO5HUONvXCDeIJnU4HzH8RH6v869Ibil1suT5pA1DQXsoVfoIkKd0/l3ZVZDhghR7IX/UDYsyHQZ7AR+6OD/7RHJNJwmQJ9mIKGGSnkm2CYzzAiKR6x4GKwQ58fp6RBjSqvNpa0QBT0WD7s24C5KdIuL1/G3RJFZCvVOHZDnN+ZGC5FeAzEW4oWtBRo+cfouQi6JBr+R/Eciv9CZpPbI9L8Io4D0voGdL8hCFBCJbPaKEAm6w3XqKtQ7d5AVkZ3wJjBM/kxUlfJDtp7kF/ClRwF3JS9Z0QVLSc1eUkNZa3GZZUggmeQE9q54EKbug0MNL6ErKtrMWgiDFC+i1f8hMKZPGtTqZVysInvSKEhQIWi0CGQJewGcbfxJPhaK4LuJ6TUJyuqBspz+jBC6QrYJGCG7yAl5Yb5/dq8Jvv2Q8HRicfsLyQpSQgiBkFkgQ8AJ671hvnzDJ5c6qgmcQRNwEsVXz7RNGxeIYgiknwVyMC3IQmPe0CfxxCFBA7Eb5smcIgw8YEtBBxkSM3Ij18iHIMJgEDXgnyUcQm6WFwSANaJ6ulxWlQIIUCWZjfAjOgmt8BDFV0kN8W1KTTgI1JoawC0Gbu6CzikCpKlAhCDoLYn2zPgW5shb18SnbW9SGd2Y1QW+s74YnQYmuy4bcx6ecAe50nSl4Z4gvUR+tKTVBdHzSGEsu5yRYhaAHghRw5nMQKBPcsQkUfSmTEnXGSXCnsqAZghwX3PcroG8V7gtBHoJjZkEIghQXfLMJ8iQoOQjocfpNCBQIjtsFeS54oJJANyyLE5Yv4+YVJFcuUB8IwZwuoByFYIkL+lddt4hanywXrPYLwSwEDWZBEwTn+Jr2//AmWEsmk8Uc2y2RH/18TXNDsnymzpxAIwQldtD6H8xYBDlVrGnB4elBj9OZB/38oF2BIGwVtEPwjD0q+oe3/GwRCbaG+/mjYhqCE1ZBCwSzTNA3/NCDIJNkyZcJHg73MUHmHARBqyCAIYzk+JTjqy5rSo+4Il2uxsWM8+A3B2yCsNYjLhh+JJOA0TJiTVPUmJKCrGUMwfyjYSG4BsFxCCyGExCM3MOUMYT4eRK4RgjuxDECbcYprUNNQFpLaIRgXfTo9bw3AZ0I9bXoUGQWgnDAQYASRgbu8R7Ff/kV7MVFh/IjKOCUkyDQjBK2+R7FE1/9Cb4m4sNUwLEABHZDAwQDL3kJicSOhJ30lDVJ2kkkRAFXRiBAAU6CA2eHzg2s6CU8npY8Z/qxXkD2OfjHA44CUcK6mELi0a5X/u6jhJhAdgUFnAxC4FxCGCUM3BVNGnz8yRv/0+NBvUHrA1SAUwnBwyhh4GVvjDVpcPC+F/79wUHWIAheDKCAcIAEthKaTsLw/B5vEgx78254dQ980aCXGr+ZGmQTwHBcK+Fi1jC8Pl/9K7Xzb4j/6rkmaKECnErgTdruMQyjD3cq83cejhI/e1HjHzqg8V0N53tjhmH097YzfvvPqM7HADzwIWAGCMigKcbe/Ny5ZIZf2vn5ZkzDl/EhAN9VYDawIlDF2Nje9y/bK7vz87sr21++742N4e7Z7Zv5JPBg0OYgioACDsqowOP2tf5b+D4MoggouESEvUyI27fxvRt6NANTwAEJJQE6w7PzZeb7M3CF5oDESJzROd4vnwwjmkFXwAGJyDDoBp7tvx8+BDCI87Ae4Qo4IKH0gc7xkewK33/wIfAWk0FXQKIHcB1PfML7MEABAxRwQELpBV3DRzL4APDHpzbBMATFejTCHbCI4BJ0JJpZAR58ao8/Q/MQFHNRphAagWb4aGYaeJn4/gxIsFmGAoYoSQQcAR94+VCA+L4iDFDMaV+FWYK3wNf+FiO873ADAoMt4MuCX/fv0Q2FKvy6/aWSIT3O+XX7jzB0mcL59ftl0z/vYLDw6Rvw/2JAJrqN4B9mxK+Bgfg1MRC/Ngbi18ZA/BoZiF8jg0r82hhqxycD8WtgqBWfDLXlw9Ba5y9/AYSCOtsqOacYAAAAAElFTkSuQmCC",
        symbolSize: [38, 40],
        itemStyle: {
          normal: {
            color: that.color[3],
            opacity: 1
          }
        },
        data: chanfei
      });

      //处置单位
      series.push({
        name: "处置单位",
        type: "scatter",
        coordinateSystem: "bmap",
        zlevel: 6,
        rippleEffect: {
          brushType: "stroke"
        },
        label: {
          normal: {
            show: false,
            position: "bottom",
            formatter: "{b}",
            textBorderColor: "#0a0c63",
            textBorderWidth: 2
          }
        },
        symbolSize: function(val) {
          return val[4] / 8 + 8;
        },
        // 处置单位
        symbol:
          "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABlCAMAAACFixa5AAAB+FBMVEUAAAD////////8/Pz////////7+/vn5+f+/v7////+/v79/f3////////+/v7////V1dX////8/Pz////////////+/v7////////////////8/Pz39/f////7jgD5jAD9/f33iwD4jADwhwDyiAD6+vrnggDphAD2iwDrhAD1igDziQD0igD8/PzthgDhfwDjgADuhgD8tVnefQDlgQDkgQD4+Pj5+fn8uF/7oi//+PD9uWHcfAD/+/f8nB//6tDffgD8qj///fr+47/7mRn9xn/96c/7lRD+6Mr24sj91aDyjw780579wXL/7tn55cv+16X90Zj6lA77kQbaewD/+vT/9Of82arzy5j9vWn4kw///vz41aj4z5z8s1X8q0D6qT79yof/9+v879793LD01Kv1zZn2yY/9v2/5tV39sk/4rk38pjfjixj0kA7+8eD74L3+3rX9yITsrVvnpU7/+fH+8uT64cD+4Ln9zpDvwof5w37xvHr1sVj8rEXzozr4oC/1lx72jgjggwj++vb48ej57Nr+5sX43Ln12rj8zY/4yIj6wnn2u2/9u2b0nCv7nyf7niX2lRn+5MH73rj02LTz0KTxzZ79zI39xXz9wnfupkj2pj7plyv2nCXhjyXnkB/zlBvehRHwjg/niQ399u3jlzTjlTHgxkCIAAAAHXRSTlMAENCh8KDQEEDgMNBQgLAgEr+BX8CfwJBwb49gIDB2rrcAAAiLSURBVGjetZn5XxJBGIe7U9PK7ms2CuRONEwFBAxCqExTK1IzM7M8svu+7/u+7/v4N3vfmVmG3VmIzfj+0McQn4f3nXdmYZlUYCaXzK+omF1ZSci0ysqFFRXlJZP+Y8qWTiFyZs+f81/o5ctKSa5MWVY2Qfrkimkkf0rnT4Q/X7z46KZEYrS/X1GS/f2hRGLfYVFGyT83R8UH94Uiij6R4biqqPwnRUklp58dVXIkGdrEFQvNr/dSjk8kKWulFF4HV0wrN8lfSGg2RXRwWRLgnVpqanjY3O+LCHoeRz9TLDSxsUppd/o1+NWaaBXDbJwmFzo9dPajEUUDX6WJRgJFBOmeKCts+Fl7koKOcOfYsdajqcPh8OHU0dZjY04mySgCUbrUhRjKKP+swAO8ZyS9nWiy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",
        symbolSize: [38, 40],
        itemStyle: {
          normal: {
            color: that.color[3],
            opacity: 1
          }
        },
        data: chuzhi
      });

      //运输单位
      // series.push({
      //     name: '运输单位',
      //     type: 'scatter',
      //     coordinateSystem: 'bmap',
      //     zlevel: 6,
      //     rippleEffect: {
      //         brushType: 'stroke'
      //     },
      //     label: {
      //         normal: {
      //             show: false,
      //             position:'bottom',
      //             formatter: '{b}',
      //             textBorderColor:'#0a0c63',
      //             textBorderWidth:2
      //         }
      //     },
      //     symbolSize: function (val) {
      //         return val[4]/8+8;
      //     },
      //     // 运输单位
      //     symbol: 'image://data:image/png;base64,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',
      //     symbolSize: [38, 40],
      //     itemStyle: {
      //         normal: {
      //             color: that.color[3],
      //             opacity:1
      //         }
      //     },
      //     data: yunshu
      // });

      //
      //现有仓库
      series.push({
        name: "仓库",
        type: "scatter",
        coordinateSystem: "bmap",
        zlevel: 2,
        rippleEffect: {
          brushType: "stroke"
        },
        label: {
          normal: {
            show: false,
            position: [23, 6],
            formatter: "{b}",
            textBorderColor: "#0a0c63",
            textBorderWidth: 2
          }
        },
        symbolSize: function(val) {
          return val[4] / 8 + 8;
        },
        // 蓝色
        symbol:
          "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAA51BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9Bxvig4/z0/P/o+P+I3PtNyvlx1frQ8f1Zzfm46fxFx/ir5vyx6PxIyPj6/v9l0fpez/ns+f/E7f111vp+2ftQy/jc9P7T8v3K7/2T3/vv+/+96/2V3/ya4fv2/f/a9P2o5fxh0Pnh9v3M7/2T3vvD1Ul6AAAAJ3RSTlMAqgf8+PSHG7jhn/GZWQ3PUCTvysC0kHx4TUgyKxYR6NikXnA4AdHVBSrmAAADXElEQVRIx6WXaVfqMBCGC0IVBNw3RNxv052WVRYVBfUu///3XJo3zVIo9BzmC4dkniYz8yadail2qJfPTkrFYunkrKwfatmt+ZArGooVc9VmJvR6z1hpe9cb0aOckWq5o7XobmXHWGM7ld109mrf2GD7V2nsheTVezcdb9DtDjzHfO9JExcr0byI1m6PQiJZOGq/8Mn7/DJ7cxDPfvwDqVh3/hHPHywFno/ZL7PLCRU3rZhOrh3v+c+ApNpvO66Zyl6y4b8uWWOTN+Z2qSiZlbdD1lsYsILXBVu7zcDCOvC8rXFYx8hbIsvu1DYCL7E227nORVlAdSeKWytAdl8dNW5krXDD4DL9a/Vln7EfPW42HkYzZkua6X9R9wrYBrJlymj0eH9MN9CONhBIVTCRswaFcX5fpOn+YrWAr+Y69oKWUoFw9miqEfGUKM+eygX3Xg2LCJsj6ijhVSwcqrBhteOlHT9ykIWKU1LlwuwQBaY29AhxTTvKOGC12OUFjAtglIBhdoA9eCo8glA07Ql1CpMw5x2XkAQc4nZ40h7p7ydJgaEQwMLe6dyjdk5/52mwp8Cqg87yJSSIHEkwCq2K3GEZO4WPEEgAisOQmCpyjw6caiX6O+A1RY7GPoPNYTRgul4gi3xA5+406MvFqjaqGx8qmO9ggN5hbURGJ461YwlesNAVPGaR91A6bFHsjgzfSdvGDokcAmQK86IQTGnbSsKwzaDPU25BpjzlgEXCUKoxYB4lk6XPZYZT3fcBj3EDM5FMASdlSWEYAmLwlI6ca5eSPCVPxOGrOuXwJ7u96+xgqLBPkjCR4BC5qGt51GqUGeZHcj+vXAaWCrumJcMYmPHLICeuIehdwECFsYHXSAbiGqoVpPr5MUw9bacVxDAbEAeyUBNXrzUhEm5xzxjnA2QiXb1aA7OQPMfhCVwdaMO/Ib/Ye56kYZxdgQPFbE95wR/toBdpkQzW+kDEvDGpYCPf4Wa2+w3fc9EJFTK/3D9ZM3ejcXswGL1h7bDDHJUmWmeDb5NMDY2uyfaci49Tf00rFbeBueeUJq73465G3Z+4Bf2VX+qWSwYza7ayfeRKL6FK6tr3mRvX7VvmpF0VMzfr238mbP+Bsv2nkbBmdfmj7KG5nkn/HKynOP0HJe+84Qnx164AAAAASUVORK5CYII=",
        symbolSize: [22, 22],
        itemStyle: {
          normal: {
            color: that.color[3]
          }
        },
        data: whArray
      });
      //新增仓库
      if (newWhArray && newWhArray.length > 0) {
        series.push({
          name: "新仓库",
          type: "effectScatter",
          coordinateSystem: "bmap",
          zlevel: 2,
          rippleEffect: {
            brushType: "stroke"
          },
          label: {
            normal: {
              show: true,
              position: [20, 0],
              formatter: "{b}"
            }
          },
          symbolSize: function(val) {
            return val[4] / 8 + 8;
          },
          itemStyle: {
            normal: {
              color: that.newColor[0],
              borderColor: "#fff",
              borderWidth: 2
            }
          },
          data: newWhArray
        });
      }
      that.seriesArray = series;

      if (this.mapStock) {
        echarts.dispose(that.mapStock);
      }
      that.mapStock = echarts.init(
        document.getElementById("todayEnter"),
        "walden"
      );
      this.reloadMap(series, [117.20954826, 29.30577822]);
      this.initMapEvent();
      // this.mouseTool();
    },
    //
    initMapEvent() {
      let map = this.mapStock
        .getModel()
        .getComponent("bmap")
        .getBMap();
      map.setMapStyleV2({ styleJson: baiduMapStyle.baiduMapStyle });
      map.disableBizAuthLogo(); //关闭
      map.setMaxZoom(12); //设置最大级数
      map.addEventListener("rightclick", function(e) {
        // addBeginAddress(e.point.lng,e.point.lat)
        addEndAddress(e.point.lng, e.point.lat);
      });
      let that = this;
      // 点击图标生成气泡展示
      this.mapStock.on("click", function(params) {
        that.barPopupTitle = params.name;
        if (params.name === "光明水质净化厂") {
          that.barPopup = true;
          that.baryAxis = [
            23.59,
            23.27,
            23.92,
            21.82,
            22.91,
            20.98,
            21.73,
            20.64,
            23.53,
            20.46,
            20.36,
            22.38
          ];
          that.bartotal = [
            23.59,
            46.86,
            70.78,
            92.6,
            115.51,
            136.49,
            158.22,
            178.86,
            202.39,
            222.85,
            243.21,
            265.59
          ];
          that.billStock6(
            "固废外运(吨)",
            "固废总外运(吨)",
            ["固废外运(吨)", "固废总外运(吨)"],
            "固废外运占比"
          );
        } else if (params.name === "西丽再生水厂") {
          that.barPopup = true;
          that.baryAxis = [
            25.39,
            24.65,
            23.29,
            25.86,
            26.96,
            23.92,
            26.59,
            24.73,
            23.56,
            26.36,
            25.16,
            24.4
          ];
          that.bartotal = [
            25.39,
            50.04,
            73.33,
            99.19,
            126.15,
            150.07,
            176.66,
            201.39,
            224.95,
            251.31,
            276.47,
            300.87
          ];
          that.billStock6(
            "固废外运(吨)",
            "固废总外运(吨)",
            ["固废外运(吨)", "固废总外运(吨)"],
            "固废外运占比"
          );
        } else if (params.name === "福田水质净化厂") {
          that.barPopup = true;
          that.baryAxis = [
            40.89,
            42.01,
            39.93,
            40.47,
            41.38,
            42.17,
            39.78,
            42.33,
            38.65,
            41.92,
            39.38,
            37.63
          ];
          that.bartotal = [
            40.89,
            82.9,
            122.83,
            163.3,
            204.68,
            246.85,
            286.63,
            328.96,
            367.61,
            409.53,
            448.91,
            486.54
          ];
          that.billStock6(
            "固废外运(吨)",
            "固废总外运(吨)",
            ["固废外运(吨)", "固废总外运(吨)"],
            "固废外运占比"
          );
        } else if (params.name === "南山水质净化厂") {
          that.barPopup = true;
          that.baryAxis = [
            28.66,
            29.45,
            30.15,
            32.51,
            29.75,
            30.08,
            30.86,
            30.87,
            29.8,
            31.66,
            29.83,
            32.68
          ];
          that.bartotal = [
            28.66,
            58.11,
            88.26,
            120.77,
            150.52,
            180.6,
            211.46,
            242.33,
            272.13,
            303.79,
            333.62,
            366.3
          ];
          that.billStock6(
            "固废外运(吨)",
            "固废总外运(吨)",
            ["固废外运(吨)", "固废总外运(吨)"],
            "固废外运占比"
          );
        } else if (params.name === "布吉水质净化厂") {
          that.barPopup = true;
          that.baryAxis = [
            29.46,
            28.51,
            31.27,
            28.07,
            28.27,
            28.33,
            29.39,
            29.78,
            30.8,
            29.64,
            29.34,
            30.35
          ];
          that.bartotal = [
            29.46,
            57.97,
            89.24,
            117.31,
            145.58,
            173.91,
            203.3,
            233.08,
            263.88,
            293.52,
            322.86,
            353.21
          ];
          that.billStock6(
            "固废外运(吨)",
            "固废总外运(吨)",
            ["固废外运(吨)", "固废总外运(吨)"],
            "固废外运占比"
          );
        } else if (params.name === "滨河水质净化厂") {
          that.barPopup = true;
          that.baryAxis = [
            40.25,
            39.07,
            39.84,
            39.24,
            40.35,
            39.43,
            38.7,
            38.79,
            40.66,
            41.01,
            41.42,
            43.8
          ];
          that.bartotal = [
            40.25,
            79.32,
            119.16,
            158.4,
            198.75,
            238.18,
            276.88,
            315.67,
            356.33,
            397.34,
            438.76,
            482.56
          ];
          that.billStock6(
            "固废外运(吨)",
            "固废总外运(吨)",
            ["固废外运(吨)", "固废总外运(吨)"],
            "固废外运占比"
          );
        } else if (params.name === "罗芳水质净化厂") {
          that.barPopup = true;
          that.baryAxis = [
            45.71,
            46.12,
            46.84,
            46.56,
            48.23,
            45.15,
            47.36,
            46.55,
            47.48,
            46.14,
            46.33,
            49.79
          ];
          that.bartotal = [
            45.71,
            91.83,
            138.67,
            185.23,
            233.46,
            278.61,
            325.97,
            372.52,
            420,
            466.14,
            512.47,
            562.26
          ];
          that.billStock6(
            "固废外运(吨)",
            "固废总外运(吨)",
            ["固废外运(吨)", "固废总外运(吨)"],
            "固废外运占比"
          );
        }
        // if(params.seriesType == "scatter"){
        //     if(params.value[2] == 1){//仓库
        //         console.log('***********仓库**********');
        //         console.log(params.data.info);
        //         // checkedAddress(params.data);
        //     }
        // }
        // if(params.seriesType =="effectScatter"){
        //     if(params.value[2] == 0){//终端
        //         console.log('***********终端**********');
        //         console.log(params.data.info);
        //         // checkedAddress(params.data);
        //     }
        // }

        if (params.name === "深圳妈湾电力有限公司") {
          that.barPopup = true;
          that.baryAxis = [41, 68, 38, 20, 63, 24, 64, 98, 74, 43, 10.24, 13];
          that.bartotal = [
            41,
            109,
            147,
            167,
            230,
            254,
            318,
            416,
            490,
            533,
            543.24,
            556.24
          ];
          that.billStock6(
            "固废处置(吨)",
            "固废总处置(吨)",
            ["固废处置(吨)", "固废总处置(吨)"],
            "固废处置占比"
          );
        } else if (params.name === "深圳市利赛环保科技有限公司") {
          that.barPopup = true;
          that.baryAxis = [13, 23, 29, 21, 36, 20, 13, 21, 28, 26, 10.66, 33];
          that.bartotal = [
            13,
            26,
            55,
            76,
            112,
            132,
            145,
            166,
            194,
            220,
            230.66,
            263.58
          ];
          that.billStock6(
            "固废处置(吨)",
            "固废总处置(吨)",
            ["固废处置(吨)", "固废总处置(吨)"],
            "固废处置占比"
          );
        } else if (params.name === "广宁县奥茵环境工程科技有限公司") {
          that.barPopup = true;
          that.baryAxis = [30, 54, 68, 16, 52, 71, 64, 39, 25, 21, 14.88, 26];
          that.bartotal = [
            30,
            84,
            152,
            168,
            220,
            291,
            355,
            394,
            419,
            440,
            454.88,
            480.88
          ];
          that.billStock6(
            "固废处置(吨)",
            "固废总处置(吨)",
            ["固废处置(吨)", "固废总处置(吨)"],
            "固废处置占比"
          );
        } else if (params.name === "恩平市华新环境工程有限公司") {
          that.barPopup = true;
          that.baryAxis = [13, 23, 29, 21, 36, 20, 13, 21, 28, 26, 10.66, 33];
          that.bartotal = [
            13,
            26,
            55,
            76,
            112,
            132,
            145,
            166,
            194,
            220,
            230.66,
            263.58
          ];
          that.billStock6(
            "固废处置(吨)",
            "固废总处置(吨)",
            ["固废处置(吨)", "固废总处置(吨)"],
            "固废处置占比"
          );
        } else if (params.name === "河源市固体废弃物集中处置中心有限公司") {
          that.barPopup = true;
          that.baryAxis = [16, 28, 36, 15, 41, 15, 23, 18, 35, 26, 10.66, 36];
          that.bartotal = [
            16,
            44,
            80,
            95,
            136,
            151,
            174,
            192,
            227,
            253,
            263.66,
            299.66
          ];
          that.billStock6(
            "固废处置(吨)",
            "固废总处置(吨)",
            ["固废处置(吨)", "固废总处置(吨)"],
            "固废处置占比"
          );
        } else if (params.name === "罗芳水质净化厂") {
          that.barPopup = true;
          that.baryAxis = [25, 37, 58, 28, 43, 52, 29, 41, 19, 17, 6.54, 6];
          that.bartotal = [
            25,
            62,
            120,
            148,
            191,
            243,
            272,
            313,
            332,
            349,
            355.54,
            361.54
          ];
          that.billStock6(
            "固废处置(吨)",
            "固废总处置(吨)",
            ["固废处置(吨)", "固废总处置(吨)"],
            "固废处置占比"
          );
        } else if (params.name === "华润电力（海丰）有限公司") {
          that.barPopup = true;
          that.baryAxis = [12, 39, 28, 39, 57, 32, 37, 12, 11, 53, 10.61, 20];
          that.bartotal = [
            12,
            51,
            79,
            118,
            175,
            207,
            244,
            256,
            267,
            320,
            330.61,
            350.61
          ];
          that.billStock6(
            "固废处置(吨)",
            "固废总处置(吨)",
            ["固废处置(吨)", "固废总处置(吨)"],
            "固废处置占比"
          );
        }
      });
    },
    //////
    reloadMap(series, centor) {
      let bmap = {
        roam: true
      };
      if (centor) {
        bmap = {
          center: [114.320775, 22.257758],
          zoom: 9,
          roam: true
        };
      }
      console.log(bmap);
      var echartOption = {
        // visualMap: {
        //     min: 0,
        //     max: 50,
        //     calculable: true,
        //     dimension:1,
        //     show:true,
        //     zlevel:99999,
        //     inRange: {
        //         color: ["pink", "red"],
        //     },
        // },
        tooltip: {
          backgroundColor: "rgba(255,255,255,0.8)",
          borderColor: "#0055d5",
          borderWidth: 3,
          padding: 10,
          textStyle: {
            color: "#0055d5"
          },
          trigger: "item",
          formatter: function(params, ticket, callback) {
            // console.log(params);
            if (
              params.seriesType == "effectScatter" &&
              params.value &&
              params.value.length >= 3
            ) {
              let dataType = params.value[2];
              switch (dataType) {
                case 0:
                  return (
                    params.data.info.city +
                    "--" +
                    params.data.info.county +
                    ",车次：" +
                    params.value[4]
                  );
                case 1:
                  return "终端数：" + params.value[4];
                case 2:
                  return "终端数：" + params.value[4];
                case 3:
                  return params.name + ",车次：" + params.value[4];
              }
            } else if (params.seriesType == "scatter") {
              return (
                params.seriesName +
                ":" +
                params.data.name +
                "<br>" +
                "地址：" +
                params.data.address
              );
            } else if (params.seriesType == "lines") {
              return params.data.fromName + ">" + params.data.toName;
            } else {
              return "";
              //return '距' + params.name + ' : ' + params.value[2] + 'km';
            }
          }
        },
        animation: false,
        bmap: bmap,
        series: series
      };
      // var echartOption = {
      //     tooltip: {
      //         trigger: 'item',
      //         formatter: function (params, ticket, callback) {
      //             // console.log(params);
      //             if (params.seriesType == "effectScatter" && params.value && params.value.length>=3) {
      //                 let dataType = params.value[2];
      //                 switch (dataType) {
      //                     case 0:  return params.data.info.city+'--'+params.data.info.county+ ',车次：' + params.value[4];
      //                     case 1:  return '终端数：' + params.value[4];
      //                     case 2:  return '终端数：' + params.value[4];
      //                     case 3:  return params.name+ ',车次：' + params.value[4];
      //                 }
      //             }
      //             else if(params.seriesType == "scatter" && params.value && params.value.length>=3){
      //                 let dataType = params.value[2];
      //                 switch (dataType) {
      //                     case 0:  return params.data.info.city+'--'+params.data.info.county+ ',车次：' + params.value[4];
      //                     case 1:  return '终端数：' + params.value[4];
      //                     case 2:  return '终端数：' + params.value[4];
      //                     case 3:  return params.name+ ',车次：' + params.value[4];
      //                 }
      //             }
      //             else if (params.seriesType == "lines") {
      //                 return params.data.fromName + ">" + params.data.toName;
      //             } else {
      //                 return '';
      //                 //return '距' + params.name + ' : ' + params.value[2] + 'km';
      //
      //             }
      //
      //         }
      //     },
      //     animation: false,
      //     bmap: bmap,
      //     series: series
      // };
      this.mapStock.setOption(echartOption);
    },
    //
    piePopupClose() {
      this.piePopup = false;
    },
    //
    billStock1() {
      let that = this;
      var billStock1 = echarts.init(document.getElementById("billStock1"));
      window.addEventListener("resize", function() {
        billStock1.resize();
      });

      billStock1.on("click", "series.pie", function(param) {
        // alert(param)
        that.piexAxis = [
          "2点",
          "4点",
          "6点",
          "8点",
          "10点",
          "12点",
          "14点",
          "16点",
          "18点",
          "20点",
          "22点",
          "24点"
        ];
        // that.billStock5()
        // console.log(param);
        that.pieTitle = param.data.name;
        if (param.data.name === "40%污泥") {
          that.piePopup = true;
          that.pieyAxis = [
            41.928,
            41.818,
            40.347,
            39.476,
            38.847,
            39.227,
            40.32,
            41.062,
            39.941,
            42.07,
            41.434,
            42.15
          ];
          that.pietotal = [
            41.93,
            83.75,
            124.09,
            163.57,
            202.42,
            241.64,
            281.96,
            323.03,
            362.97,
            405.04,
            446.47,
            488.62
          ];
          that.billStock5();
        } else if (param.data.name === "80%污泥") {
          that.piePopup = true;
          that.pieyAxis = [
            10.735,
            8.756,
            9.244,
            7.009,
            10.149,
            8.096,
            8.298,
            9.196,
            7.006,
            8.482,
            6.865,
            11.844
          ];
          that.pietotal = [
            10.73,
            19.49,
            28.73,
            35.74,
            45.89,
            53.99,
            62.29,
            71.48,
            78.49,
            86.97,
            93.84,
            105.68
          ];
          that.billStock5();
        } else if (param.data.name === "60%污泥") {
          that.piePopup = true;
          that.pieyAxis = [
            22.157,
            20.262,
            22.723,
            20.371,
            20.735,
            22.166,
            20.524,
            21.561,
            22.349,
            21.266,
            19.689,
            18.847
          ];
          that.pietotal = [
            22.16,
            42.42,
            65.14,
            85.51,
            106.25,
            128.41,
            148.94,
            170.5,
            192.85,
            214.11,
            233.8,
            252.65
          ];
          that.billStock5();
        } else if (param.data.name === "栅渣") {
          that.piePopup = true;
          that.pieyAxis = [
            13.044,
            10.978,
            13.895,
            14.604,
            12.514,
            10.969,
            12.25,
            11.533,
            12.497,
            13.225,
            11.909,
            14.812
          ];
          that.pietotal = [
            13.04,
            24.02,
            37.92,
            52.52,
            65.03,
            76,
            88.25,
            99.79,
            112.28,
            125.51,
            137.42,
            152.23
          ];
          that.billStock5();
        } else if (param.data.name === "粪渣") {
          that.piePopup = true;
          that.pieyAxis = [
            4.9,
            5.959,
            4.813,
            3.951,
            4.499,
            5.458,
            6.324,
            4.157,
            2.953,
            2.326,
            5.792,
            3.988
          ];
          that.pietotal = [
            4.9,
            10.86,
            15.67,
            19.62,
            24.12,
            29.58,
            35.9,
            40.06,
            43.01,
            45.34,
            51.13,
            55.12
          ];
          that.billStock5();
        } else if (param.data.name === "通沟污泥") {
          that.piePopup = true;
          that.pieyAxis = [
            14.855,
            12.518,
            13.16,
            12.637,
            11.471,
            11.827,
            14.441,
            13.555,
            12.656,
            14.161,
            12.473,
            16.606
          ];
          that.pietotal = [
            14.86,
            27.37,
            40.53,
            53.17,
            64.64,
            76.47,
            90.91,
            104.46,
            117.12,
            131.28,
            143.75,
            160.36
          ];
          that.billStock5();
        } else if (param.data.name === "砂石") {
          that.piePopup = true;
          that.pieyAxis = [
            5.475,
            5.238,
            4.92,
            5.866,
            3.123,
            2.476,
            5.054,
            5.271,
            4.935,
            2.502,
            5.596,
            2.094,
            52.55
          ];
          that.pietotal = [
            5.47,
            10.71,
            15.63,
            21.5,
            24.62,
            27.1,
            32.15,
            37.42,
            42.36,
            44.86,
            50.46,
            52.55
          ];
          that.billStock5();
        } else if (param.data.name === "罗芳厂") {
          that.piePopup = true;
          that.pieyAxis = [
            25.328,
            24.104,
            23.03,
            25.226,
            24.191,
            25.081,
            25.052,
            24.721,
            25.58,
            25.924,
            24.011,
            21.572
          ];
          that.pietotal = [
            25.33,
            49.43,
            72.46,
            97.69,
            121.88,
            146.96,
            172.01,
            196.73,
            222.31,
            248.24,
            272.25,
            293.82
          ];
          that.billStock5();
        } else if (param.data.name === "华润海丰") {
          that.piePopup = true;
          that.pieyAxis = [
            56.339,
            53.659,
            55.439,
            55.914,
            55.011,
            54.085,
            56.517,
            56.663,
            55.465,
            54.2,
            53.339,
            51.959,
            658.59
          ];
          that.pietotal = [
            56.34,
            110,
            165.44,
            221.35,
            276.36,
            330.45,
            386.96,
            443.63,
            499.09,
            553.29,
            606.63,
            658.59
          ];
          that.billStock5();
        }
      });

      let option_1 = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          itemHeight: 9,
          itemWidth: 3,
          top: "0",
          width: "100%",
          textStyle: {
            color: "#fff",
            fontSize: 14
          },
          data: [
            "80%污泥",
            "60%污泥",
            "40%污泥",
            "栅渣",
            "粪渣",
            "通沟污泥",
            "砂石"
          ]
        },
        series: [
          {
            name: "处理处置总量",
            type: "pie",
            radius: ["0%", "70%"],
            center: ["50%", "56%"],
            label: {
              show: false,
              color: "rgba(255,255,255,.9)",
              fontSize: 12,
              position: "inner",
              formatter: "{a|{c}}",
              rich: {
                a: {
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "bold"
                }
              }
            },
            data: [
              {
                value: 105.68,
                name: "80%污泥",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#e6ae6b"
                    },
                    {
                      offset: 1,
                      color: "#fb6f3e"
                    }
                  ])
                }
              },
              {
                value: 256.25,
                name: "60%污泥",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#AAFFA9"
                    },
                    {
                      offset: 1,
                      color: "#11FFBD"
                    }
                  ])
                }
              },
              {
                value: 488.62,
                name: "40%污泥",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#4568DC"
                    },
                    {
                      offset: 1,
                      color: "#B06AB3"
                    }
                  ])
                }
              },
              {
                value: 152.23,
                name: "栅渣",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#3fb1e3"
                    },
                    {
                      offset: 1,
                      color: "#6be6c1"
                    }
                  ])
                }
              },
              {
                value: 55.12,
                name: "粪渣",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#3fb1e3"
                    },
                    {
                      offset: 1,
                      color: "#6be6c1"
                    }
                  ])
                }
              },
              {
                value: 160.36,
                name: "通沟污泥",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#3fb1e3"
                    },
                    {
                      offset: 1,
                      color: "#6be6c1"
                    }
                  ])
                }
              },
              {
                value: 52.55,
                name: "砂石",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#348fe6"
                    },
                    {
                      offset: 1,
                      color: "#625bef"
                    }
                  ])
                }
              }
            ]
          }
        ]
      };

      billStock1.setOption(option_1);
    },
    //
    billStock2() {
      var billStock2 = echarts.init(document.getElementById("billStock2"));
      window.addEventListener("resize", function() {
        billStock2.resize();
      });

      billStock2.on("click", function(param) {
        // alert(param)

        console.log(param);
      });

      let option_2 = {
        grid: {
          left: "2%",
          right: "2%",
          top: 10,
          bottom: 0,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#fff"
            }
          },
          formatter: "{b} <br/>固废外运:{c}"
        },
        xAxis: [
          {
            name: "吨",
            type: "category",
            nameTextStyle: {
              color: "#fff",
              lineHeight: 8
            },
            boundaryGap: true,
            axisLabel: {
              rotate: 30,
              margin: 12,
              fontSize: 15,
              color: "#fff"
            },
            axisLine: {
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            data: ["12-8", "12-9", "12-10", "12-11", "12-12", "12-13", "12-14"]
          }
        ],
        yAxis: [
          {
            nameTextStyle: {
              color: "#fff",
              lineHeight: 2
            },
            axisLabel: {
              show: false,
              formatter: "{value}",
              textStyle: {
                color: "#fff",
                fontSize: 15
              }
            },
            axisLine: {
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            axisTick: {
              show: false //是否显示坐标轴刻度
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"],
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            type: "line",
            name: "七日固废外运趋势(吨)",
            smooth: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            label: {
              normal: {
                show: false,
                position: "top",
                textStyle: {
                  color: "#fff",
                  fontSize: 15
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#00b2ff",
                lineStyle: {
                  color: "#00b2ff",
                  width: 1
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(7,44,90,0.3)"
                    },
                    {
                      offset: 1,
                      color: "rgba(0,146,246,0.9)"
                    }
                  ])
                }
              }
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: "red"
                }
              }
            },
            data: [
              3135.23,
              2781.38,
              2628.77,
              3070.75,
              3008.96,
              3118.73,
              2969.58
            ]
          }
        ]
      };

      billStock2.setOption(option_2);
    },
    //
    barPopupClose() {
      this.barPopup = false;
    },
    billStock3() {
      let that = this;
      var billStock3 = echarts.init(document.getElementById("billStock3"));
      window.addEventListener("resize", function() {
        billStock3.resize();
      });

      billStock3.on("click", function(param) {
        // alert(param)

        console.log(param);
        that.baryAxisTitle = "固废外运(吨)";
        that.bartotalTitle = "固废总外运(吨)";
        that.piexAxis = [
          "2点",
          "4点",
          "6点",
          "8点",
          "10点",
          "12点",
          "14点",
          "16点",
          "18点",
          "20点",
          "22点",
          "24点"
        ];
        that.barPopupTitle = param.name;

        //
        that.barPopup = true;
        that.billStock6(
          "固废外运(吨)",
          "固废总外运(吨)",
          ["固废外运(吨)", "固废总外运(吨)"],
          "固废外运占比"
        );
        if (param.name === "罗芳厂") {
          that.barPopup = true;
          that.baryAxis = [
            45.71,
            46.12,
            46.84,
            46.56,
            48.23,
            45.15,
            47.36,
            46.55,
            47.48,
            46.14,
            46.33,
            49.79
          ];
          that.bartotal = [
            45.71,
            91.83,
            138.67,
            185.23,
            233.46,
            278.61,
            325.97,
            372.52,
            420,
            466.14,
            512.47,
            562.26
          ];
          that.billStock6(
            "固废外运(吨)",
            "固废总外运(吨)",
            ["固废外运(吨)", "固废总外运(吨)"],
            "固废外运占比"
          );
        } else if (param.name === "福田厂") {
          that.barPopup = true;
          that.baryAxis = [
            40.89,
            42.01,
            39.93,
            40.47,
            41.38,
            42.17,
            39.78,
            42.33,
            38.65,
            41.92,
            39.38,
            37.63
          ];
          that.bartotal = [
            40.89,
            82.9,
            122.83,
            163.3,
            204.68,
            246.85,
            286.63,
            328.96,
            367.61,
            409.53,
            448.91,
            486.54
          ];
          that.billStock6(
            "固废外运(吨)",
            "固废总外运(吨)",
            ["固废外运(吨)", "固废总外运(吨)"],
            "固废外运占比"
          );
        } else if (param.name === "滨河厂") {
          that.barPopup = true;
          that.baryAxis = [
            40.25,
            39.07,
            39.84,
            39.24,
            40.35,
            39.43,
            38.7,
            38.79,
            40.66,
            41.01,
            41.42,
            43.8
          ];
          that.bartotal = [
            40.25,
            79.32,
            119.16,
            158.4,
            198.75,
            238.18,
            276.88,
            315.67,
            356.33,
            397.34,
            438.76,
            482.56
          ];
          that.billStock6(
            "固废外运(吨)",
            "固废总外运(吨)",
            ["固废外运(吨)", "固废总外运(吨)"],
            "固废外运占比"
          );
        } else if (param.name === "南山厂") {
          that.barPopup = true;
          that.baryAxis = [
            28.66,
            29.45,
            30.15,
            32.51,
            29.75,
            30.08,
            30.86,
            30.87,
            29.8,
            31.66,
            29.83,
            32.68
          ];
          that.bartotal = [
            28.66,
            58.11,
            88.26,
            120.77,
            150.52,
            180.6,
            211.46,
            242.33,
            272.13,
            303.79,
            333.62,
            366.3
          ];
          that.billStock6(
            "固废外运(吨)",
            "固废总外运(吨)",
            ["固废外运(吨)", "固废总外运(吨)"],
            "固废外运占比"
          );
        } else if (param.name === "布吉厂") {
          that.barPopup = true;
          that.baryAxis = [
            29.46,
            28.51,
            31.27,
            28.07,
            28.27,
            28.33,
            29.39,
            29.78,
            30.8,
            29.64,
            29.34,
            30.35
          ];
          that.bartotal = [
            29.46,
            57.97,
            89.24,
            117.31,
            145.58,
            173.91,
            203.3,
            233.08,
            263.88,
            293.52,
            322.86,
            353.21
          ];
          that.billStock6(
            "固废外运(吨)",
            "固废总外运(吨)",
            ["固废外运(吨)", "固废总外运(吨)"],
            "固废外运占比"
          );
        } else if (param.name === "西丽厂") {
          that.barPopup = true;
          that.baryAxis = [
            25.39,
            24.65,
            23.29,
            25.86,
            26.96,
            23.92,
            26.59,
            24.73,
            23.56,
            26.36,
            25.16,
            24.4
          ];
          that.bartotal = [
            25.39,
            50.04,
            73.33,
            99.19,
            126.15,
            150.07,
            176.66,
            201.39,
            224.95,
            251.31,
            276.47,
            300.87
          ];
          that.billStock6(
            "固废外运(吨)",
            "固废总外运(吨)",
            ["固废外运(吨)", "固废总外运(吨)"],
            "固废外运占比"
          );
        } else if (param.name === "光明厂") {
          that.barPopup = true;
          that.baryAxis = [
            23.59,
            23.27,
            23.92,
            21.82,
            22.91,
            20.98,
            21.73,
            20.64,
            23.53,
            20.46,
            20.36,
            22.38
          ];
          that.bartotal = [
            23.59,
            46.86,
            70.78,
            92.6,
            115.51,
            136.49,
            158.22,
            178.86,
            202.39,
            222.85,
            243.21,
            265.59
          ];
          that.billStock6(
            "固废外运(吨)",
            "固废总外运(吨)",
            ["固废外运(吨)", "固废总外运(吨)"],
            "固废外运占比"
          );
        }
      });

      var option_3 = {
        grid: {
          left: "2%",
          right: "2%",
          top: "6%",
          bottom: "2%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#fff"
            }
          },
          formatter: "{b}<br>昨日固废外运：{c}吨"
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            nameTextStyle: {
              color: "#fff",
              padding: [0, 0, 0, 8]
            },
            axisLabel: {
              color: "#fff",
              margin: 12,
              rotate: 30,
              fontSize: 12
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            data: [
              "罗芳厂",
              "福田厂",
              "滨河厂",
              "南山厂",
              "布吉厂",
              "西丽厂",
              "光明厂"
            ]
          }
        ],
        yAxis: [
          {
            name: "吨",
            nameTextStyle: {
              color: "#fff",
              lineHeight: -8
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff"
              }
            },
            axisLine: {
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            axisTick: {
              show: false //是否显示坐标轴刻度
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            }
          }
        ],
        series: [
          {
            name: "昨日固废外运排行(吨)",
            type: "bar",
            barWidth: "40%",
            barGap: "50%",
            data: [565.25, 486.54, 482.55, 366.32, 353.23, 300.88, 265.59],
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: { color: "#fff" }
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#6be6c1"
                  },
                  {
                    offset: 1,
                    color: "#3fb1e3"
                  }
                ]),
                opacity: 1
              }
            }
          }
        ]
      };
      billStock3.setOption(option_3);
    },
    //
    billStock4() {
      let that = this;
      var billStock4 = echarts.init(document.getElementById("billStock4"));
      window.addEventListener("resize", function() {
        billStock4.resize();
      });

      that.baryAxisTitle = "固废处置(吨)";
      that.bartotalTitle = "固废总处置(吨)";
      that.piexAxis = [
        "2点",
        "4点",
        "6点",
        "8点",
        "10点",
        "12点",
        "14点",
        "16点",
        "18点",
        "20点",
        "22点",
        "24点"
      ];
      that.legendArr = [that.baryAxisTitle, that.bartotalTitle];
      billStock4.on("click", function(param) {
        // alert(param)

        // that.billStock5()
        console.log(param);
        that.barPopupTitle = param.name;
        // that.pieTitle = param.data.name;
        if (param.name === "华润海丰") {
          that.barPopup = true;
          // that.piePopup = true;
          that.baryAxis = [
            52,
            54,
            28,
            36,
            78,
            12,
            93,
            42,
            28,
            56,
            79.09,
            100.5
          ];
          that.bartotal = [
            52,
            106,
            134,
            170,
            248,
            260,
            353,
            396,
            424,
            480,
            559.09,
            658.59
          ];
          // that.billStock5()
          that.billStock6(
            "固废处置(吨)",
            "固废总处置(吨)",
            ["固废处置(吨)", "固废总处置(吨)"],
            "固废处置占比"
          );
        } else if (param.name === "妈湾电力") {
          // that.piePopup = true;
          // that.pieyAxis =   [0, 10, 50, 0, 0, 12, 10, 20, 10, 18, 12, 0]
          // that.pietotal =  [0, 10, 60, 60, 60, 72, 82, 102, 112, 130, 132, 102]
          // that.billStock5()
          that.barPopup = true;
          that.baryAxis = [41, 68, 38, 20, 63, 24, 64, 98, 74, 43, 10.24, 13];
          that.bartotal = [
            41,
            109,
            147,
            167,
            230,
            254,
            318,
            416,
            490,
            533,
            543.24,
            556.24
          ];
          that.billStock6(
            "固废处置(吨)",
            "固废总处置(吨)",
            ["固废处置(吨)", "固废总处置(吨)"],
            "固废处置占比"
          );
        } else if (param.name === "广宁奥茵") {
          that.barPopup = true;
          that.baryAxis = [30, 54, 68, 16, 52, 71, 64, 39, 25, 21, 14.88, 26];
          that.bartotal = [
            30,
            84,
            152,
            168,
            220,
            291,
            355,
            394,
            419,
            440,
            454.88,
            480.88
          ];
          that.billStock6(
            "固废处置(吨)",
            "固废总处置(吨)",
            ["固废处置(吨)", "固废总处置(吨)"],
            "固废处置占比"
          );
        } else if (param.name === "罗芳厂") {
          that.barPopup = true;
          that.baryAxis = [25, 37, 58, 28, 43, 52, 29, 41, 19, 17, 6.54, 6];
          that.bartotal = [
            25,
            62,
            120,
            148,
            191,
            243,
            272,
            313,
            332,
            349,
            355.54,
            361.54
          ];
          that.billStock6(
            "固废处置(吨)",
            "固废总处置(吨)",
            ["固废处置(吨)", "固废总处置(吨)"],
            "固废处置占比"
          );
        } else if (param.name === "华新环境") {
          that.barPopup = true;
          that.baryAxis = [12, 39, 28, 39, 57, 32, 37, 12, 11, 53, 10.61, 20];
          that.bartotal = [
            12,
            51,
            79,
            118,
            175,
            207,
            244,
            256,
            267,
            320,
            330.61,
            350.61
          ];
          that.billStock6(
            "固废处置(吨)",
            "固废总处置(吨)",
            ["固废处置(吨)", "固废总处置(吨)"],
            "固废处置占比"
          );
        } else if (param.name === "河源固废") {
          that.barPopup = true;
          that.baryAxis = [16, 28, 36, 15, 41, 15, 23, 18, 35, 26, 10.66, 36];
          that.bartotal = [
            16,
            44,
            80,
            95,
            136,
            151,
            174,
            192,
            227,
            253,
            263.66,
            299.66
          ];
          that.billStock6(
            "固废处置(吨)",
            "固废总处置(吨)",
            ["固废处置(吨)", "固废总处置(吨)"],
            "固废处置占比"
          );
        } else if (param.name === "利赛环保") {
          that.barPopup = true;
          that.baryAxis = [13, 23, 29, 21, 36, 20, 13, 21, 28, 26, 10.66, 33];
          that.bartotal = [
            13,
            26,
            55,
            76,
            112,
            132,
            145,
            166,
            194,
            220,
            230.66,
            263.58
          ];
          that.billStock6(
            "固废处置(吨)",
            "固废总处置(吨)",
            ["固废处置(吨)", "固废总处置(吨)"],
            "固废处置占比"
          );
        }
      });

      var option_4 = {
        grid: {
          left: "2%",
          right: "2%",
          top: "6%",
          bottom: "2%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#fff"
            }
          },
          formatter: "{b}<br>昨日固废处置：{c}吨"
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            nameTextStyle: {
              color: "#fff",
              padding: [0, 0, 0, 8]
            },
            axisLabel: {
              color: "#fff",
              margin: 12,
              rotate: 30,
              fontSize: 12
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            data: [
              "华润海丰",
              "妈湾电力",
              "广宁奥茵",
              "罗芳厂",
              "华新环境",
              "河源固废",
              "利赛环保"
            ]
          }
        ],
        yAxis: [
          {
            name: "吨",
            nameTextStyle: {
              color: "#fff",
              lineHeight: -8
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff"
              }
            },
            axisLine: {
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            axisTick: {
              show: false //是否显示坐标轴刻度
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            }
          }
        ],
        series: [
          {
            name: "昨日固废处置排行(吨)",
            type: "bar",
            barWidth: "40%",
            barGap: "50%",
            data: [658.59, 556.24, 480.88, 361.54, 350.61, 299.66, 263.58],
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: { color: "#fff" }
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#6be6c1"
                  },
                  {
                    offset: 1,
                    color: "#3fb1e3"
                  }
                ]),
                opacity: 1
              }
            }
          }
        ]
      };
      billStock4.setOption(option_4);
    },
    //
    billStock5() {
      var billStock5 = echarts.init(document.getElementById("billStock5"));
      window.addEventListener("resize", function() {
        billStock5.resize();
      });

      var option_5 = {
        grid: {
          left: "2.5%",
          right: "2.5%",
          top: "10.5%",
          bottom: "3.5%",
          containLabel: true
        },
        legend: {
          data: ["外运(吨)", "总外运(吨)"],
          top: "2%",
          itemHeight: 9,
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "rgba(0,0,0,0.1)"
            }
          }
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            nameTextStyle: {
              color: "#fff",
              padding: [0, 0, 0, 8]
            },
            axisLabel: {
              color: "#fff"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            data: this.piexAxis
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "吨",
            nameTextStyle: {
              color: "#fff",
              lineHeight: -8
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff"
              }
            },
            axisLine: {
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            axisTick: {
              show: false //是否显示坐标轴刻度
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"],
                type: "dashed"
              }
            }
          },
          {
            type: "value",
            name: "%",
            nameTextStyle: {
              color: "#fff",
              lineHeight: -8
            },

            axisLine: {
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            }
          }
        ],
        series: [
          {
            name: "外运(吨)",
            type: "bar",
            barWidth: "30%",
            barGap: "50%",
            data: this.pieyAxis,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: { color: "#fff" }
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#2193b0"
                  },
                  {
                    offset: 1,
                    color: "#6dd5ed"
                  }
                ]),
                opacity: 1
              }
            }
          },
          {
            name: "总外运(吨)",
            type: "bar",
            barWidth: "30%",
            barGap: "50%",
            data: this.pietotal,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: { color: "#fff" }
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#af6ab3"
                  },
                  {
                    offset: 1,
                    color: "#4668db"
                  }
                ]),
                opacity: 1
              }
            }
          },
          {
            name: "外运率",
            type: "line",
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#EF9F16",
                lineStyle: {
                  color: ["rgba(239,159,22,0.8)"],
                  width: 1,
                  type: "dashed"
                }
              }
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: "red"
                }
              }
            },
            yAxisIndex: 1,
            data: [
              0,
              14.2,
              42.2,
              42.2,
              42.2,
              50.7,
              57.7,
              71.8,
              78.8,
              91.5,
              100,
              100
            ]
          }
        ]
      };

      billStock5.setOption(option_5);
    },
    //
    billStock6(baryAxisTitle, bartotalTitle, legendArr, ratio) {
      var billStock6 = echarts.init(document.getElementById("billStock6"));
      window.addEventListener("resize", function() {
        billStock6.resize();
      });

      var option_6 = {
        grid: {
          left: "2.5%",
          right: "2.5%",
          top: "10.5%",
          bottom: "3.5%",
          containLabel: true
        },
        legend: {
          data: legendArr,
          top: "2%",
          itemHeight: 9,
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "rgba(0,0,0,0.1)"
            }
          }
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            nameTextStyle: {
              color: "#fff",
              padding: [0, 0, 0, 8]
            },
            axisLabel: {
              color: "#fff"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            data: this.piexAxis
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "吨",
            nameTextStyle: {
              color: "#fff",
              lineHeight: -8
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff"
              }
            },
            axisLine: {
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            axisTick: {
              show: false //是否显示坐标轴刻度
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"],
                type: "dashed"
              }
            }
          },
          {
            type: "value",
            name: "%",
            nameTextStyle: {
              color: "#fff",
              lineHeight: -8
            },

            axisLine: {
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(255,255,255,0.1)"]
              }
            }
          }
        ],
        series: [
          {
            name: baryAxisTitle,
            type: "bar",
            barWidth: "30%",
            barGap: "50%",
            data: this.baryAxis,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: { color: "#fff" }
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#2193b0"
                  },
                  {
                    offset: 1,
                    color: "#6dd5ed"
                  }
                ]),
                opacity: 1
              }
            }
          },
          {
            name: bartotalTitle,
            type: "bar",
            barWidth: "30%",
            barGap: "50%",
            data: this.bartotal,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: { color: "#fff" }
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#af6ab3"
                  },
                  {
                    offset: 1,
                    color: "#4668db"
                  }
                ]),
                opacity: 1
              }
            }
          },
          {
            name: ratio,
            type: "line",
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#EF9F16",
                lineStyle: {
                  color: ["rgba(239,159,22,0.8)"],
                  width: 1,
                  type: "dashed"
                }
              }
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: "red"
                }
              }
            },
            yAxisIndex: 1,
            data: [
              0,
              14.2,
              42.2,
              42.2,
              42.2,
              50.7,
              57.7,
              71.8,
              78.8,
              91.5,
              100,
              100
            ]
          }
        ]
      };

      billStock6.setOption(option_6);
    },

    _calculateWidth() {
      // 获取类名为 rampage-list 的标签
      let rampageList = this.$refs.rampageChild.getElementsByClassName(
        "roll-item"
      );

      // 设置一个起始宽度
      let initHeight = 0;
      // 遍历标签
      for (let i = 0; i < rampageList.length; i++) {
        const item = rampageList[i];
        // 将每一个标签宽度相加
        initHeight += item.clientHeight;
        console.log(initHeight);
      }
      // 设置可滚动的宽度
      this.$refs.rampageChild.style.height = `${initHeight}px`;
    }
  },
  mounted() {
    window.onresize = function() {
      if (this.mapStock) {
        this.mapStock.resize();
      }
    };

    this.billStock1();
    this.billStock2();
    this.billStock3();
    this.billStock4();
    // this.billStock5()
    this.refreshChart(dataBeforeAddWh);
    // this.reloadMap()

    // billStock1
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
ul,
li {
  list-style: none;
}
html,
body {
  height: 100%;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  font-family: "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif;
}

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
}

/*滚动条*/
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #000;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
  background-color: #101445;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #049dbc;
  border-radius: 10px;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
}

/*公共类名*/
.fn-clear:after {
  content: " ";
  display: table;
  clear: both;
}
.fn-flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.fn-flex-item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.fn-border-right {
  border-right: 2px solid rgba(1, 46, 119, 0.6);
}
.fn-border-top {
  border-top: 1px solid rgba(0, 0, 0, 0.6);
}
.fn-padding-none {
  padding: 0 !important;
}
.fn-height {
  overflow-y: auto;
}
.fn-text-ellipsis {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.wrap-contain {
  /*width:100%;*/
  /*height:100%;*/
  height: calc(100vh - 93px);
  /*background:#1d2088 url('../img/dhl_bg.jpg') 50% 50% no-repeat;*/
  background-color: #113549;
  background-size: cover;
  position: relative;
  left: 0;
  top: 0;
  margin-top: -20px;
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: -20px;
  width: calc(100% + 40px);
}

.select-contain {
  display: inline-block;
  position: absolute;
  z-index: 100;
  top: 20px;
  left: 20px;
}
.select-contain .sales-local-select {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  display: inline-block;
  padding: 5px 20px;
  padding-right: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: #fff;
  background: #3fb1e3;
  background-image: -webkit-linear-gradient(45deg, #6be6c1, #3fb1e3);
  background-image: linear-gradient(45deg, #6be6c1, #3fb1e3);
  border: none;
  border-radius: 80px;
  cursor: pointer;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  border: none;
}
.select-contain:after {
  content: "";
  display: inline-block;
  width: 20px;
  height: 10px;
  position: absolute;
  z-index: 100;
  right: 18px;
  top: 50%;
  margin-top: -5px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAVBAMAAADGNLEtAAAALVBMVEUAAAD///////////////////////////////////////////////////////+hSKubAAAADnRSTlMA8NAwEIC/YLCgcFBAIKdCLX8AAACMSURBVBjTYzB7hwGSGfIwBZ8xyGEKPmSIwxR8ysCFKbiAgaEOXew5AwMDjxyaiQcYgMAQVVCYAQR49ZDFHl1gAAMnZEEVBghg6UOIvXRggAJOhOAEBjiIQ7gbAdhhggUMSGAjREyaARkwy4HdbcCAAoxAgsoMqIBFD+huBwY04PHuXQsDBoh7yoAXAABXZtl9CzGYpQAAAABJRU5ErkJggg==")
    no-repeat 50% 50%;
  background-size: 18px;
}

.left-contain {
  position: absolute;
  z-index: 100;
  top: 0;
  right: 20px;
  height: calc(100vh - 290px);
  width: 360px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
}
.left-contain .left-block-item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;
}

.right-contain {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 20px;
  height: calc(100vh - 290px);
  width: 360px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
}
.right-contain .right-block-item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;
}

.bottom-contain {
  position: absolute;
  z-index: 100;
  bottom: 10px;
  width: 100%;
  height: 180px;
  color: #fff;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  overflow: hidden;
}
.bottom-contain .bottom-contain-left {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  position: relative;
  margin: 0 20px;
}
.bottom-contain .bottom-contain-right {
  width: 28%;
  margin-left: 60px;
}
.bottom-contain .bottom-cont-bd {
  position: relative;
  height: 130px;
  overflow: hidden;
}
.bottom-cont-tit,
.bottom-cont-bd .roll-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.bottom-cont-tit > div.tit-unit,
.bottom-cont-tit > div.tit-produce,
.bottom-cont-tit > div.tit-handle,
.bottom-cont-bd .roll-item > div.item-unit,
.bottom-cont-bd .roll-item > div.item-produce,
.bottom-cont-bd .roll-item > div.item-handle {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.bottom-cont-tit > div {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 4px 4px;
  font-size: 16px;
  font-weight: 700;
}

.bottom-cont-bd .roll-item > div {
  margin: 8px 0;
  padding: 0 4px;
  font-size: 16px;
}
.bottom-cont-tit .tit-type,
.bottom-cont-bd .item-type {
  width: 140px;
}
.bottom-cont-tit .tit-number,
.bottom-cont-bd .item-number {
  width: 120px;
}

.bottom-cont-tit .tit-kg,
.bottom-cont-bd .item-kg {
  width: 120px;
}
.bottom-cont-tit .tit-date,
.bottom-cont-bd .item-date {
  width: 180px;
}

.panel-tit {
  color: #02be99;
  font-weight: 700;
  font-size: 18px;
  position: relative;
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#00f260),
    to(#0575e6)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /*text-shadow:0 0 4px rgba(0,0,0,0.3);*/
  text-align: center;
  z-index: 100;
  margin-bottom: 6px;
}
.l-inner-cont {
  padding: 10px;
  width: 100%;
  height: 100%;
  /* border-top:2px solid rgba(5,117,230,0.2); */
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 200;
}
.panel-data-cont {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 200;
}

@media screen and (max-width: 1440px) {
  .panel-tit {
    font-size: 15px;
    margin-bottom: 4px;
  }
}

.loader {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  /*background-image: url('../img/loading.gif');*/
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: rgba(0, 0, 0, 0.9);
}
#canvas {
  position: absolute;
  top: 0;
  left: 0;
}

/*DC监控*/
html,
body,
.parent {
  height: 100%;
  overflow: hidden;
}
.parent {
  background: #081f53 url("./../../../assets/img/bg_light.png") center center
    no-repeat;
  background-size: cover;
}
.top {
  height: 6%;
  margin-bottom: 0px;
  background-image: url("./../../../assets/img/01.png");
  background-size: 1000px;
  background-position: center bottom;
  background-repeat: no-repeat;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.parent {
  display: flex;
  flex-direction: column;
}
.middle {
  flex: 1;
  display: flex;
  flex-direction: row;
  padding: 0 15px;
  z-index: 10;
}
.right {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.bottom {
  height: 4%;
  margin-top: 15px;
  z-index: 10;
}
.middle-main {
  display: flex;
  flex-direction: column;
  width: 280px;
}
.left {
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-right: 20px;
}

.bg-mask {
  background: url("./../../../assets/img/11.png") no-repeat;
  background-size: cover;
  border-radius: 8px;
  position: relative;
}
.bg-mask:after {
  content: "";
  background: url("./../../../assets/img/bg_light.png") no-repeat;
  background-position: center top;
  position: absolute;
  top: 0;
  width: 100%;
  height: 38px;
}

.middle-main-item-2 {
  flex: 1;
  height: 100%;
}

.right-main-item {
  margin-bottom: 15px;
}
.right-main-item-1 {
  flex: 1;
}
.right-main-item-2 {
  height: 70px;
}

.right-main-item:last-child {
  margin-bottom: 0;
}

.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: -6px;
  position: relative;
  line-height: 80px\9;
}
.head .head-tit {
  font-weight: 700;
  font-size: 38px;
  color: #02be99;
  background-image: gradient(linear, 0 0, 0 bottom, from(#00f260), to(#0575e6));
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#00f260),
    to(#0575e6)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  display: inline-block;
}

.head .dhl-logo {
  border-radius: 6px;
  width: 150px;
  margin-right: 4px;
}
.head .sgj-logo {
  position: absolute;
  right: 20px;
  top: 10px;
  width: 70px;
}
.footer {
  text-align: center;
  font-size: 14px;
  height: 100%;
  /*弹性盒模型*/
  display: flex;
  /*主轴居中对齐*/
  justify-content: center;
  /*侧轴居中对齐*/
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(126, 206, 244, 0.8);
}
.footer a {
  color: rgba(126, 206, 244, 0.8);
  text-decoration: none;
}
.inner-cont {
  padding: 15px;
  width: 100%;
  height: 100%;
  /* border-top:2px solid rgba(5,117,230,0.2); */
  position: relative;
  display: flex;
  flex-direction: column;
}

.border-style {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(2, 166, 181, 0.1);
}
.border-style .style-item {
  width: 100%;
  height: 100%;
  position: absolute;
}
.border-style .style-item-topleft:before {
  content: "";
  width: 20px;
  height: 20px;
  border-top: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
}
.border-style .style-item-topleft:after {
  content: "";
  width: 20px;
  height: 20px;
  border-left: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
}
.border-style .style-item-topright:before {
  content: "";
  width: 20px;
  height: 20px;
  border-top: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  right: 0;
  top: 0;
}
.border-style .style-item-topright:after {
  content: "";
  width: 20px;
  height: 20px;
  border-right: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  right: 0;
  top: 0;
}
.border-style .style-item-bottomleft:before {
  content: "";
  width: 20px;
  height: 20px;
  border-left: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  left: 0;
  bottom: 0;
}
.border-style .style-item-bottomleft:after {
  content: "";
  width: 20px;
  height: 20px;
  border-bottom: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  left: 0;
  bottom: 0;
}
.border-style .style-item-bottomright:before {
  content: "";
  width: 20px;
  height: 20px;
  border-right: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  right: 0;
  bottom: 0;
}
.border-style .style-item-bottomright:after {
  content: "";
  width: 20px;
  height: 20px;
  border-bottom: 2px solid #02a6b5;
  position: absolute;
  z-index: 100;
  right: 0;
  bottom: 0;
}

#mapGlobal {
  height: 80%;
}
#retrievalData {
  height: 80%;
}

.need-head {
  display: flex;
  flex: 1;
  height: 100%;
}
.data-canvas {
  position: relative;
  z-index: 100;
}

.workd-ynamic-item {
  width: 50%;
  float: left;
  height: 100%;
}

.row-twospece {
  display: flex;
  flex-direction: row;
}
.row-twospece-item {
  display: flex;
  width: 100%;
}

/*车辆列表*/
.car-list {
  width: 100%;
  overflow-y: auto;
  height: calc(100vh - 210px);
  color: #dbdbdb;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  padding-right: 10px;
}
.car-list-item {
  margin-top: 15px;
}
.item-plus {
  background-color: rgba(5, 140, 206, 0.4);
  margin-left: 26px;
  line-height: 36px;
  padding-left: 10px;
  text-align: center;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-weight: 700;
  position: relative;
}
.item-plus:after {
  content: "+";
  font-size: 20px;
  color: #dbdbdb;
  position: absolute;
  left: -20px;
  top: 0;
}
.item-plus:hover {
  opacity: 0.8;
}
.car-list-item-sub {
  margin-left: 68px;
  margin-bottom: 28px;
  display: none;
}

.car-list-item-sub .item-up {
  background-color: rgba(5, 140, 206, 0.2);
  margin-top: 12px;
  line-height: 36px;
  padding-left: 10px;
  text-align: center;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: relative;
}
.item-up:after {
  content: "-";
  font-size: 24px;
  color: #dbdbdb;
  position: absolute;
  left: -16px;
  top: 0;
}
.car-list-item-sub .item-up:hover {
  opacity: 0.8;
}
.car-list-item-sub .item-up.active,
.car-list-item-sub .item-up.active:hover {
  background-color: #03c78c;
  opacity: 1;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
}

/*搜索*/
.search-form {
  position: relative;
  z-index: 100;
  margin-left: 20px;
}
.search-form-item:after,
.search-form-item:before,
.search-form-item-content:after,
.search-form-item-content:before {
  display: table;
  content: "";
}
.search-form-label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #1abaff;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
  width: 200px;
}
.search-form-item-content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
}
.search-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
.search-input-inner {
  -webkit-appearance: none;
  background-color: rgba(0, 0, 0, 0.2);
  background-image: none;
  border-radius: 4px;
  border: 1px solid rgba(26, 86, 255, 0.6);
  box-sizing: border-box;
  color: #fff;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #fff;
}
.search-form-inline .search-form-item {
  display: inline-block;
  margin-right: 25px;
  vertical-align: middle;
}
.search-form-inline .search-form-label {
  float: none;
  display: inline-block;
  width: auto;
}
.search-form-inline .search-form-item-content {
  display: inline-block;
  vertical-align: middle;
}
.search-form-inline .search-input {
  width: 150px;
}

.search-form-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 15px;
  font-weight: 700;
}
.search-form-primary {
  color: #fff;
  background-color: #409eff;
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#1abaff),
    to(#207dff)
  );
  border-color: #409eff;
}
.search-form-outplain {
  background-color: transparent;
  border-color: #409eff;
  border-width: 2px;
  color: #fff;
}
.search-form-button:hover {
  opacity: 0.8;
}

/*地图区域*/
.map-cont {
  position: relative;
  z-index: 100;
  overflow: hidden;
  height: calc(100vh - 262px);
}

@media (min-height: 1080px) and (max-width: 1920px) {
}
@media screen and (max-width: 1600px) {
}
@media screen and (max-width: 1440px) {
  .top {
    background-size: 600px;
  }
  .head {
    margin-top: -3px;
  }
  .head .head-tit {
    font-size: 28px;
  }

  .middle {
    padding: 0 6px;
  }
  .middle-main {
    width: 196px;
  }
  .right {
    margin-left: 6px;
  }
  .right-main-item {
    margin-bottom: 6px;
  }
  .right-main-item-2 {
    height: 58px;
  }
  .bottom {
    margin-top: 6px;
  }

  .inner-cont {
    padding: 8px;
  }

  .car-list {
    height: calc(100vh - 150px);
  }
  .car-list-item-sub {
    margin-left: 38px;
  }

  .map-cont {
    height: 100%;
  }

  .search-input-inner {
    height: 36px;
    line-height: 36px;
  }
  .search-form-button {
    padding: 9px 15px;
  }
}

/*  --------------------  */
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
  width: 860px;
  min-height: 420px;
  border-radius: 12px;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.8);
  position: relative;
  display: flex;
  flex-direction: column;
}
.global-popup-cont .popup-close {
  width: 46px;
  height: 46px;
  background-color: #fff;
  border-radius: 24px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
  position: absolute;
  right: -20px;
  top: -20px;
  cursor: pointer;
}
.global-popup-cont .popup-close:hover {
  opacity: 0.8;
}
.global-popup-cont .popup-close:after,
.global-popup-cont .popup-close:before {
  height: 2px;
  width: 30px;
  background-color: #003b4d;
  content: "";
  display: block;
  position: absolute;
  border-radius: 4px;
}
.global-popup-cont .popup-close:before {
  top: 22px;
  left: 10px;
  -webkit-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.global-popup-cont .popup-close:after {
  top: 22px;
  left: 10px;
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
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#00f260),
    to(#0575e6)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
}
.global-popup .global-popup-bd {
  position: relative;
  height: 400px;
  width: 100%;
}
/*图标说明*/
.map-info-tip {
  position: absolute;
  width: 100%;
  bottom: 200px;
  z-index: 200;
  padding: 15px;
  border-radius: 10px;
  color: #fff;
  text-align: center;
  font-size: 13px;
}
.map-info-tip li {
  display: inline-block;
  margin: 0 15px;
}
.map-info-tip li strong {
  display: inline-block;
  padding: 0 2px;
  color: #6be6c1;
}
.map-info-tip li:last-child {
  margin-bottom: 0;
}
.map-info-tip li img {
  width: 24px;
  vertical-align: middle;
  margin-right: 6px;
}
.map-info-tip li img.local-img {
  width: 16px;
  margin-left: 8px;
}
</style>
