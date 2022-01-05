<template>
    <div class="top">
        <div class="top-left">
          <DropSelecter iconClass="waste" title="产废" :optionList="optionLists.waste" @checked="unitsCheck"></DropSelecter>
          <DropSelecter iconClass="disposition" title="处置" :optionList="optionLists.disposition" @checked="unitsCheck" style="margin-left: 12px;"></DropSelecter>

          <div class="check-box" :class="{checked: optionCheck.order}" @click="optionCheck.order = !optionCheck.order">
            <div class="icon order"></div>
            <div class="title">工单</div>
          </div>
        </div>
        <div class="top-right">
          <div class="check-box" :class="{checked: optionCheck.emptyCar}" @click="emptyCarsCheck" style="margin-right: 12px;">
            <div class="icon car"></div>
            <div class="title">空闲车辆</div>
          </div>
          <DropSelecter v-if="optionCheck.order" iconClass="wasteType" title="污泥" :optionList="optionLists.wasteType" @checked="typesCheck"></DropSelecter>
          <DropSelecter v-if="optionCheck.order" iconClass="car" title="车辆" :optionList="optionLists.carType" @checked="typesCheck" style="margin-left: 12px;"></DropSelecter>
        </div>
        
        <div class="top-middle" v-if="optionCheck.order">
          <div class="item-block" :class="item.class" v-for="(item, index) in statusBarList" :key="index" @click="statusCheck(item)">
            <i :class="{checked: item.checked}"></i>
            <span>{{item.name}}</span>
            <span class="num">{{item.num}}</span>
          </div>
        </div>
    </div>
</template>

<script>
import DropSelecter from '../dropSelecter.vue'

export default {
  props: {
    optionLists: {
      type: Object,
      default: {}
    },
    optionCheck: {
      type: Object,
      default: {}
    },
    statusBarList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    DropSelecter
  },
  methods: {
      statusCheck(item) {
        this.$emit('statusCheck', item)
      },
      typesCheck(item) {
        this.$emit('typesCheck', item)
      },
      unitsCheck(item) {
        this.$emit('unitsCheck', item)
      },
      emptyCarsCheck() {
        this.optionCheck.emptyCar = !this.optionCheck.emptyCar
        this.$emit('emptyCarsCheck', this.optionCheck.emptyCar)
      }
  }
}
</script>

<style scoped lang="scss">
.top{
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .check-box{
    margin-left: 12px;
    display: inline-flex;
    align-items: center;
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    border-radius: 4px;
    background: #042242cc;
    pointer-events: all;
    user-select: none;
    cursor: pointer;
    padding: 0 8px;
    border: 1px solid #042242cc;
    &.checked{
      border: 1px solid #37FFD7;
      background: #042242cc url(~@/assets/img/icon-check.png) no-repeat top right;
      background-size: 14px 14px;
    }
    .icon{
        width: 18px;
        height: 18px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        &.order{
            background-image: url(~@/assets/img/icon-droper-order.png);
        }
        &.car{
            background-image: url(~@/assets/img/icon-droper-car.png);
        }
    }
    .title{
        color: #26B79A;
        padding: 0 8px;
    }
  }
  .top-left{
    
  }
  .top-middle{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    pointer-events: all;
    .item-block{
      position: relative;
      color: #fff;
      font-size: 14px;
      padding: 0 10px;
      height: 34px;
      line-height: 34px;
      margin: 0 6px;
      border-radius: 4px;
      cursor: pointer;
      i{
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 14px;
        height: 14px;
        &.checked{
          background: url(~@/assets/img/icon-check2.png) no-repeat center;
          background-size: contain;
        }
      }
      .num{
        margin-left: 8px;
      }
      &.red{
        background-color: #FF793EFF;
      }
      &.green{
        background-color: #2BC472FF;
      }
      &.blue{
        background-color: #00C7F1FF;
      }
      &.yellow{
        background-color: #F8A500FF;
      }
      &.lightGreen{
        background-color: #00EEBEFF;
      }
    }
  }
}
</style>
