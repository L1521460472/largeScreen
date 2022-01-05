/*
 * @Descripttion:
 * @version:
 * @Author: chentianyu
 * @Date: 2021-12-31 14:16:13
 * @LastEditors: chentianyu
 * @LastEditTime: 2022-01-04 14:43:07
 */
// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'

// 组件
import '@/components'
import '@/icons' // icon
// import Axios from 'axios'
import Qs from 'qs'
import vueToTop from 'vue-totop'
// import VueAxios from '@/utils/vueAxios'
import validatorPlugin from '@/utils/validator-plugin'
import { hasPermission } from '@/utils/hasPermission'
import vueWaves from '@/directive/waves/index'
import { showLoading, hideLoading } from './../utils/loading'
import { setPageLimit, setPageChange, setPageLimitDt, setPageChangeDt, setEditPageChange } from './../utils'
// import min from '@/layout/Home/mixin/RisizeTable'
import { deepClone } from './../utils'
import { isEmpty } from '@/utils/common'
import print from './../utils/print'
import server from './../utils/server'

import echarts from 'echarts'

export default {
  async install(Vue, options) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false
    Vue.use(ElementUI, { size: 'mini' })
    Vue.use(VXETable)
    VXETable.setup({
      keepSource: true
    })
    VXETable.use(VXETablePluginElement)
    Vue.use(Qs)
    Vue.use(vueToTop)
    Vue.use(validatorPlugin)
    Vue.use(vueWaves)
    // Vue.mixin(min)
    Vue.prototype.$globalLimit = 20
    Vue.prototype.$globalPage = 1

    Vue.prototype.$globalLimitDt = 10
    Vue.prototype.$globalPageDt = 1
    Vue.prototype.$speechSynthesis = window.speechSynthesis
    Vue.prototype.$speechSynMsg = new SpeechSynthesisUtterance()
    Vue.prototype.$setEditPageChange = setEditPageChange

    Vue.prototype.$successCode = 200
    Vue.prototype.$partSuccessCode = 201
    Vue.prototype.$showLoading = showLoading
    Vue.prototype.$hideLoading = hideLoading
    Vue.prototype.$setPageLimit = setPageLimit
    Vue.prototype.$setPageLimitDt = setPageLimitDt
    Vue.prototype.$setPageChange = setPageChange
    Vue.prototype.$setPageChangeDt = setPageChangeDt
    Vue.prototype.$hasPerm = hasPermission
    Vue.prototype.$deepClone = deepClone
    Vue.prototype.$isEmpty = isEmpty
    Vue.prototype.$print = print
    Vue.prototype.$server = server
    Vue.prototype.$echarts = echarts
  }
}
