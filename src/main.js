/*
 * @Descripttion:
 * @version:
 * @Author: chentianyu
 * @Date: 2021-12-31 14:16:13
 * @LastEditors: chentianyu
 * @LastEditTime: 2022-01-04 14:40:26
 */
import Vue from 'vue'
import 'xe-utils'
import App from './App'
import router from './router'
import zhqcPlugin from './plugin/index'
import store from './store'
import i18n from './lang'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(zhqcPlugin)
// import risize from '@/layout/Home/mixin/RisizeTable'
// Vue.mixin(risize)
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  created() {

  },
  methods: {

  },
  template: '<App/>'
})

