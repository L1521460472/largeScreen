<template>
    <div class="drop-selecter-wrap" v-click-outside="hide">
        <div class="drop-selecter" @click="showOptionsClick">
            <div class="icon" :class="iconClass" v-if="iconClass"></div>
            <div class="title">{{title}}</div>
            <div class="value">{{getCheckedTitle()}}</div>
            <span class="num" v-if="getCheckedNum() > 1">{{getCheckedNum()}}</span>
            <svg class="triangle" width="12" height="9" viewBox="-50 -50 300 300">
                <polygon v-if="showOptions" class="polygon" stroke-linejoin="round" points="100,0 0,200 200,200"/>
                <polygon v-else class="polygon" stroke-linejoin="round" points="0,0 200,0 100,200"/>
            </svg>
        </div>
        <div class="droper-options" v-show="showOptions" v-if="optionList.length">
            <div class="option-item" :class="{checked: item.checked}" v-for="(item, index) in optionList" :key="index" @click="optionClick(item)">{{item.key}}</div>
        </div>
    </div>
</template>

<script>
import ClickOutside from '@/utils/clickoutside.js'

export default {
    props: {
        title: '',
        iconClass: '',
        optionList: {
            type: Array,
            default: () => []
        },
    },
    directives: {
        ClickOutside
    },
    data() {
        return {
            showOptions: false,
            selectedOptions: []
        }
    },
    methods: {
        hide () {
            this.showOptions = false
        },
        getCheckedNum() {
            return this.optionList.filter(item => item.checked).length
        },
        getCheckedTitle() {
            return this.optionList.filter(item => item.checked).map(item => item.key).join(', ') || ' 无 '
        },
        showOptionsClick() {
            this.showOptions = !this.showOptions
        },
        optionClick(item) {
            item.checked = !item.checked
            this.$emit('checked', item)
        }
    }
}
</script>

<style scoped lang="scss">
.drop-selecter-wrap{
    position: relative;
    display: inline-block;
    z-index: 999;
    .drop-selecter{
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
        .icon{
            width: 18px;
            height: 18px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            &.disposition{
                background-image: url(~@/assets/img/icon-droper-disposition.png);
            }
            &.waste{
                background-image: url(~@/assets/img/icon-droper-waste.png);
            }
            &.wasteType{
                background-image: url(~@/assets/img/icon-droper-wtype.png);
            }
            &.car{
                background-image: url(~@/assets/img/icon-droper-car.png);
            }
        }
        .title{
            color: #26B79A;
            padding: 0 10px 0 8px;
            border-right: 1px solid #26B79A33;
        }
        .value{
            color: #37FFD7;
            padding: 0 10px;
            word-break: keep-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 80px;
        }
        .num{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 8px;
            font-size: 12px;
            color: #37FFD7;
            background: #56685d;
            width: 16px;
            height: 16px;
            border-radius: 50%;
        }
        .triangle{
            margin-left: 8px;
            .polygon{
                fill: #37FFD7;
                stroke: #37FFD7;
                stroke-width: 50;
            }
        }
    }
    .droper-options{
        position: absolute;
        top: 42px;
        right: 0;
        min-width: 100%;
        line-height: 34px;
        font-size: 14px;
        border-radius: 4px;
        color: #26B79A;
        background: #042242CC;
        pointer-events: all;
        user-select: none;
        cursor: pointer;
        border: 1px solid #005040;
        word-break: keep-all;
        white-space: nowrap;
        .option-item{
            position: relative;
            padding: 0 30px 0 20px;
            border-bottom: 1px solid #005040;
            &:last-child{
                border-bottom: none;
            }
            &.checked::after{
                position: absolute;
                right: 10px;
                top: 12px;
                content: '';
                display: block;
                width: 10px;
                height: 6px;
                border-left: 2px solid #26B79A;
                border-bottom: 2px solid #26B79A;
                transform-origin: center;
                transform: rotate(-45deg);
            }
        }
    }
}
</style>