<template>
  <div class="rotation-container">
    <div class="rotation-box">
      <div class="header-title panel-tit">固废实时运输记录</div>
      <div class="box-content">
        <div class="content-lable">
          <ul class="lable-box">
            <li class="lable ws">产废单位</li>
            <li class="lable dp">处置单位</li>
            <li class="lable time">发运时间</li>
          </ul>
        </div>
        <vue-seamless-scroll
          v-if="dataCfg.length"
          :data="dataCfg"
          class="scroll-box"
          :class-option="classOption"
        >
          <ul class="item-list">
            <li v-for="(item,index) in dataCfg" :key="index" class="roll-item" :class="{first: index == 0}">
              <div class="item-1 ws" :title="item.wasteProductionName">{{ item.wasteProductionName }}</div>
              <div class="item-2 dp" :title="item.dispositionName">{{ item.dispositionName }}</div>
              <div class="item-3 time" :title="item.deliverTimeStr">{{ item.deliverTimeStr }}</div>
            </li>
          </ul>
        </vue-seamless-scroll>
        <div v-else class="panel-nodata">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  components: {
    vueSeamlessScroll
  },
  props: {
    dataCfg: {
      type: Array
    }
  },
  data() {
    return {
      listData: [1, 2, 3, 4, 5, 6, 7, 8]
      // dataCfg: [ // 测试用数据
      //   {wasteProductionName: '罗芳水质净化厂有限公司1', dispositionName: '华润电力（海丰）有限公司', deliverTime: '2020/12/14 12:18:12'},
      //   {wasteProductionName: '罗芳水质净化厂有限公司2', dispositionName: '华润电力（海丰）有限公司', deliverTime: '2020/12/14 12:18:12'},
      //   {wasteProductionName: '罗芳水质净化厂有限公司3', dispositionName: '华润电力（海丰）有限公司', deliverTime: '2020/12/14 12:18:12'},
      //   {wasteProductionName: '罗芳水质净', dispositionName: '华润电力', deliverTime: '2020/12/1'},
      //   {wasteProductionName: '罗芳水质净化厂有限公司7', dispositionName: '华润电力（海丰）有限公司', deliverTime: '2020/12/14 12:18:12'},
      //   {wasteProductionName: '罗芳水质净化厂有限公司8', dispositionName: '华润电力（海丰）有限公司', deliverTime: '2020/12/14 12:18:12'},
      //   {wasteProductionName: '罗芳水质净化厂有限公司9', dispositionName: '华润电力（海丰）有限公司', deliverTime: '2020/12/14 12:18:12'},
      //   {wasteProductionName: '罗芳水质净化厂有限公司10', dispositionName: '华润电力（海丰）有限公司', deliverTime: '2020/12/14 12:18:12'},
      // ]
    }
  },
  computed: {
    classOption() {
      return {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.rotation-container{
  width: 100%;
  height: 60%;
  flex: 2;
  position: relative;
  background: rgba(0,0,0,.2);
  overflow: hidden;
  .rotation-box{
    width: 100%;
    height: 100%;
    .header-title{
      box-sizing: content-box;
      padding: 10px;
      height: 25px /* 25/80 */;
      font-size: 18px /* 18/80 */;
      color: #37FFD7;
      font-weight: 700;
      position: relative;
      text-align: center;
      z-index: 100;
    }
      .box-content{
        height: calc(100% - 45px /* 35/80 */);
        padding: 10px;
      .content-lable{
        .lable-box{
          height: 21px /* 21/80 */;
          font-size: 15px /* 15/80 */;
          line-height: 18px /* 18/80 */;
          color: #fff;
          display: flex;
          list-style: none;
        }
      }
      .scroll-box{
        height: calc(100% - 21px /* 21/80 */);
        overflow: hidden;
        .item-list{
          .roll-item{
            display: flex;
            // height: 18px /* 18/80 */;
            font-size: 13px /* 13/80 */;
            line-height: 18px /* 18/80 */;
            color: rgba(255,255,255,.75);
            margin-top: 21px /* 21/80 */;
            &.first{
              color: #F9CA0B;
            }
          }
        }
      }
      &.box-content .content-lable .lable-box .ws,& .scroll-box .item-list .roll-item .ws,
      &.box-content .content-lable .lable-box .dp,& .scroll-box .item-list .roll-item .dp,
      &.box-content .content-lable .lable-box .time,& .scroll-box .item-list .roll-item .time
      {
        // width: 2.5rem /* 200/80 */;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        padding: 0 12px /* 18/80 */;
        white-space: nowrap;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden
      }
      &.box-content .content-lable .lable-box .time,& .scroll-box .item-list .roll-item .time{
        flex: 1.2;
      }
    }
  }
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
.panel-tit {
  color: #37ffd7;
  font-weight: 700;
  font-size: 18px;
  position: relative;
  text-align: center;
  z-index: 100;
  margin-bottom: 6px;
}
.panel-data-cont {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 200;
}
.panel-nodata{
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  color: #37ffd7;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#00f260), to(#0575e6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  font-size: 18px;
  transform: translate(-50%);

}
</style>
