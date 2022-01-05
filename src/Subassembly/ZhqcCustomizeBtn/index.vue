<!--Main-->
<template>
    <div class="CustomTableColumnBtn" :class="className">
        <el-popover
                placement="bottom"
                title="标题"
                width="340"
                trigger="click">
            <div class="border_top">
                <el-checkbox v-model="item.isFieldShow" v-for="(item,idx) in customColumn.fieldList" class="mt10 border_top_item" :key="idx" @change="checkBoxChange">
                    {{item.label}}
                </el-checkbox>
            </div>
            <el-button slot="reference" icon="el-icon-setting fz16" @click="customColumnFn">{{customColumn.customColumnBtnText}}</el-button>
        </el-popover>

    </div>
</template>

<script>
    export default {
        name: "zhqcCustomTableColumnBtn",
        props: {
            // 自定义类名
            className: {
                type: String
            },
            // 自定义操作列
            customColumn: {
                type: Object,
                default: {
                    fieldList: [],
                    customColumnBtnText: "隐藏列",
                    dialogTitle: "显示/隐藏表格列",
                }
            },
        },
        data () {
            return {
                dialogTableVisible: false,
            }
        },
        watch: {
        },
        mounted () {
            this.$nextTick(() => {
                //
                if (localStorage[this.getStorageLabelName()]) {
                    this.customColumn.fieldList = JSON.parse(localStorage[this.getStorageLabelName()])
                } else {
                    this.customColumn.fieldList = this.customColumn.fieldList.map(v=>{
                        this.$set(v, 'isFieldShow', true)
                        return v;
                    })
                }

            })

        },
        methods: {
            getStorageLabelName() {
                return this.$route.path + '_TableNameLocalStorage'
            },
            customColumnFn(){
                this.dialogTableVisible = true
            },
            checkBoxChange(e) {
                localStorage[this.getStorageLabelName()] = JSON.stringify(this.customColumn.fieldList);
                this.$emit("updateFieldList", this.customColumn.fieldList.filter((v) => v.isFieldShow ))
            },
        }
    }
</script>
<style lang="scss" scoped>
    .CustomTableColumnBtn{
        display: inline-block;
    }
    .mt10{
        margin-top: 10px;
    }
    .mt20{
        margin-top: 20px;
    }
    .tr {
        text-align: right !important;
    }
    .border_top {
        border-top: 1px solid #EBEAE8;
    }
    .border_top_item{
        width: 120px;
    }
</style>
