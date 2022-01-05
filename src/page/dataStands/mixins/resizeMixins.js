/*
 * @Descripttion:
 * @version:
 * @Author: chentianyu
 * @Date: 2021-12-31 14:16:13
 * @LastEditors: chentianyu
 * @LastEditTime: 2021-12-31 15:24:29
 */
const resizeChartMethod = '$__resizeChartMethod'

export default {

  created() {
    window.addEventListener('resize', this[resizeChartMethod], false)
  },

  beforeDestroy() {
    window.removeEventListener('reisze', this[resizeChartMethod])
  }
}
