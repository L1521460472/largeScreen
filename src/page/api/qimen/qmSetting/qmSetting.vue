<template>
    <layout-body>
        <div slot="top-form">
            <!--  主页面top表单   -->
            <zhqc-top-form :ref-obj.sync="topForm.ref"
                           :data="topForm.data"
                           :field-list="topForm.fieldList"
                           :rules="topForm.rules"
                           :list-type-info="listTypeInfo"
                           :label-width="topForm.labelWidth"
                           @handleClick="handleClick"
                           @handleEvent="handleEvent">
            </zhqc-top-form>
        </div>
        <div slot="left-btn">
            <el-button-group>
                <el-button icon="el-icon-folder-add"  @click="handleClick('openAddPage')"  :disabled="$hasPerm('add')">{{$t('table.add')}}</el-button>
            </el-button-group>
         <!--   <export-vue templateName="qmSettingService"
                        exportUrl="base/qmSetting/export"
                        exportName="开放平台之奇门设置表"
                        @exportParam="exportData">
            </export-vue>-->
        </div>

        <div slot="tab-body">
            <!--  主页面的table表格  -->
            <zhqc-table
                    :data.sync="resp"
                    :field-list="tableInfo.fieldList"
                    :handle="tableInfo.handle"
                    :height="tabHeight" :contentHeight="contentHeight"
                    @handleClick="handleClick">
            </zhqc-table>
        </div>

        <div slot="bottom-page">
            <!--  分页组件   -->
            <zhqc-page :total="total"
                       :pageRequest="pageRequest" @pageChange="pageChange">
            </zhqc-page>
        </div>
        <!--増、查、改的表单-->
        <zhqc-dialog :title="dialogInfo.title"
                     :visible.sync="dialogInfo.visible"
                     :width="dialogInfo.width"
                     :bt-list="dialogInfo.btList"
                     @handleClick="handleClick">
            <zhqc-form :ref-obj.sync="diaFormInfo.ref"
                       :data="diaFormInfo.data"
                       :field-list="diaFormInfo.fieldList"
                       :rules="diaFormInfo.rules"
                       :list-type-info="listTypeInfo"
                       :label-width="diaFormInfo.labelWidth">
            </zhqc-form>
        </zhqc-dialog>
    </layout-body>
</template>

<script>
    import qmSettingMixins from './mixins';
    export default {
        name: "qmSetting",
        mixins:[ qmSettingMixins ],
        computed:{
            resp(){return this.$store.state[this.modName].pageResp},
            total(){return this.$store.state[this.modName].total}
        },
        data(){
            return{
                store:'qmSetting/',
                modName:'qmSetting',
                pageRequest: {limit:this.$globalLimit,page:this.$globalPage},
                dialogInfo: {
                    title: "",
                    visible: false,
                    type: '',
                    btList: [
                        {label: this.$t('table.close'), type: '', icon: '', event: 'close', show: true},
                        {label: this.$t('table.save'), type: 'primary', icon: '', event: 'save', btLoading: false, show: true}]
                },
            }
        },
        watch:{
            //监听弹窗的状态 清除校验与初始化字段
            'dialogInfo.visible' (val) {
                const diaFormInfo = this.diaFormInfo
                if (!val) {
                    if (diaFormInfo.ref) {
                        diaFormInfo.ref.resetFields()
                    }
                    this.resetFormData()
                }
            },
        },
        methods: {

        },
        mounted() {

        }
    }
</script>