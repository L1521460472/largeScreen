<template>
    <div class="main-box">
        <!-- <button @click="add">添加</button> -->
        <div class="main-box-tab">
            <div class="previous" :style="{top:(parseInt(contentHeight)+20)/2+'px'}">
                <span class="tips" v-if="preCount>0"></span>
              <i @click="previous" class="el-icon-d-arrow-left"></i>
            </div>
            <div class="next" :style="{top:(parseInt(contentHeight)+20)/2+'px'}">
                <span class="tips" v-if="ntCount>0"></span>
               <i @click="next" class="el-icon-d-arrow-right"></i>
            </div>
            <div class="main-box-tab-content" ref="tabs" :style="{height:contentHeight}">
                <div class="main-box-tab-roll">
                    <div v-for="(item,index) in tabs" :key="index"
                         :class="{'tab-item-action':actionName === item.name ,'tab-item':actionName !== item.name}"
                         @click.stop="clickTab(item,index)"
                         :title='item.meta.title'>
                        <span>{{item.meta.title}}</span>
                        <i class="el-icon-close" @click.stop="close(item.name)"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "index",
        props:{
           tabs:{
               type:Array,
               default:()=>{
                   return []
               }
           },
           contentHeight:{
               type:String,
               default:'',
           },
           actionName:{
               type:String,
               default:''
           } 
        },
        data() {
            return {
                // tabs: [],
                moveX: 0,
                count: 1,
                unoccupied: 0,
                tabsCount: 0,
                // actionName: '',
                preCount:0,
                ntCount:0,
            }
        },
        watch: {
            tabs:{
                handler:function(v){
                    if(v.length>0){
                        // this.actionName=this.tabs[0].name
                        this.count=v.length
                        this.initPage()
                    }else{
                        this.count=0
                    }
                },
                deep:true,
                immediate:true
            }
        },
        mounted() {
        },
        methods: {
            initPage(){
                this.$nextTick(() => {
                    let tabs = this.$refs.tabs
                    console.log(tabs.children[0].children[0])
                    // debugger
                    let getStyle = getComputedStyle(tabs.children[0].children[0], null)
                    let marginLeft = parseFloat(getStyle.marginLeft.substr(0, getStyle.marginLeft.length - 2))
                    let marginRight = parseFloat(getStyle.marginRight.substr(0, getStyle.marginRight.length - 2))
                    this.width = marginLeft + marginRight + tabs.children[0].children[0].offsetWidth
                    this.unoccupied = tabs.offsetWidth % this.width
                    this.tabsCount = parseInt(tabs.offsetWidth / this.width)
                    this.initNtCount()
                })
            },
            initNtCount(){
                if(this.count>this.tabsCount){
                       this.ntCount=this.count-this.tabsCount
                }else{
                    this.ntCount=0
                }
            },

            /**
             * 切换tab标签页
             **/
            clickTab(item) {
                this.$emit('changeActionName',item)
            },

            /**
             * 关闭tab标签页
             **/
            close(name) {
                let len = this.tabs.length
                let jumpName = null
                if (len > 1) {
                    for (let i = 0; i < len; i++) {
                        if (this.tabs[i].name === name) {
                            this.tabs.splice(i, 1)

                            jumpName = this.tabs[i ? i - 1 : 0].name
                            if (this.actionName !== jumpName && name === this.actionName) {
                                this.actionName = jumpName
                            }

                            this.$nextTick(() => {
                                this.previous()
                            })
                            return
                        }
                    }
                }
            },

            /**
             * 往右偏移
             **/
            next() {
                let totalWidth = this.width * this.tabs.length
                this.$nextTick(() => {
                    let dom = this.$refs.tabs
                    if (dom.clientWidth < totalWidth && this.moveX + dom.clientWidth < totalWidth) {
                        this.moveX += this.moveX ? this.width : this.width - this.unoccupied
                        this.translateX(this.moveX)
                        this.ntCount--
                        this.preCount++
                    }
                })
            },

            /**
             * 往左偏移
             **/
            previous() {
                if (this.moveX > 0) {
                    this.moveX -= this.width
                    this.translateX(this.moveX)
                    this.preCount--
                    this.ntCount++
                }
            },

            /**
             * 开始移动dom
             **/
            translateX(x) {
                this.moveX = x < 0 ? 0 : x
                this.$refs.tabs.children[0].style.transform = `translateX(-${this.moveX}px)`
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main-box {
        // height: 500px;
        width: 100%;
        padding: 10px 20px 20px 20px;

        .main-box-tab {
            position: relative;
            padding: 10px 30px;
            overflow: hidden;
            // height: 45px;
            .previous,.next {
                position: absolute;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 30px;
                width: 28px;
                border: 1px solid #eee;
                bottom: 8px;
                transform: translateY(-50%);

            }
            .previous {
                left: 0;
                // transform: translateY(-50%);
                .tips{
                    position: absolute;
                    content: '';
                    height: 8px;
                    width: 8px;
                    background: rgb(235, 23, 23);
                    top: 0;
                    right: 0;
                    border-radius: 10px;
                }
            }

            .next{
                right: 0;
                .tips{
                    position: absolute;
                    content: '';
                    height: 8px;
                    width: 8px;
                    background: rgb(235, 23, 23);
                    top: 0;
                    left: 0;
                    font-size: 1px;
                    text-align: center;
                    border-radius: 10px;
                }
            }

            .main-box-tab-content {
                overflow: hidden;
                border: 1px solid #eee;
                display: flex;
                align-items: center;
                .main-box-tab-roll {
                    transition: transform .5s;
                    display: flex;
                    align-items: center;

                    div {
                        flex-shrink: 0;
                        cursor: pointer;
                        width: 180px;
                        height: 25px;
                        margin: 0 5px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        span, i {
                            font-size: 12px;
                        }

                        span {
                            margin-left: 10px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                        i {
                            margin-right: 10px;
                        }
                    }
                }
            }

            .tab-item {
                color: #fff;
                background-color: #aad1fd;
                border-radius: 0 1px 0 1px;
                border: 1px solid #409eff;
                border-radius: 8px;
                position: relative;
            }

            .tab-item-action {
                color: #ffffff;
                background: #409eff;
                border-radius: 0 1px 0 1px;
                border: 1px solid #409eff;
                border-radius: 8px;
                position: relative;
            }

        }

        .main-box-content {
            height: calc(100% - 70px);
            padding: 10px;
            border: 1px saddlebrown solid;
            background-size: 100% 100%;
        }
    }
</style>