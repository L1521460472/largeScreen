/*
 * @Descripttion:
 * @version:
 * @Author: chentianyu
 * @Date: 2021-12-31 14:16:13
 * @LastEditors: chentianyu
 * @LastEditTime: 2021-12-31 15:02:05
 */
import { getOutWasteWeight, getWeekTrendWeight, getDisposalRankWeight, findWasteTransRecord, findWasteTransSort } from '../api'
import data from '@/data.json'
const dataStands = {
  namespaced: true,
  state: {
    outWasteWeightResp: null,
    weekTrendWeightResp: null,
    disposalRankWeightResp: null,
    wasteTransRecordResp: null,
    wasteTransSortResp: null
  },
  mutations: {
    OUT_WASTE_WEIGHT(state, data) {
      state.outWasteWeightResp = data
    },
    WEEK_TREND_WEIGHT(state, data) {
      state.weekTrendWeightResp = data
    },
    DISPOSAL_RANK_WEIGHT(state, data) {
      state.disposalRankWeightResp = data
    },
    WASTE_TRANS_RECORD(state, data) {
      state.wasteTransRecordResp = data
    },
    WASTE_TRANS_SORT(state, data) {
      state.wasteTransSortResp = data
    }
  },
  actions: {
    async getOutWasteWeight({ commit }, obj) {
      // const resp = await getOutWasteWeight(obj)
      const resp = data['OutWasteWeight']
      // console.log('OutWasteWeight', JSON.stringify(resp))
      commit('OUT_WASTE_WEIGHT', resp)
    },
    async getWeekTrendWeight({ commit }, obj) {
      const resp = await getWeekTrendWeight(obj)
      console.log('WeekTrendWeight', JSON.stringify(resp))
      commit('WEEK_TREND_WEIGHT', resp)
    },
    async getDisposalRankWeight({ commit }, obj) {
      const resp = await getDisposalRankWeight(obj)
      console.log('DisposalRankWeight', JSON.stringify(resp))
      commit('DISPOSAL_RANK_WEIGHT', resp)
    },
    async findWasteTransRecord({ commit }, obj) {
      const resp = await findWasteTransRecord(obj)
      console.log('WasteTransRecord', JSON.stringify(resp))
      commit('WASTE_TRANS_RECORD', resp)
    },
    async findWasteTransSort({ commit }, obj) {
      const resp = await findWasteTransSort(obj)
      console.log('WasteTransSort', JSON.stringify(resp))
      commit('WASTE_TRANS_SORT', resp)
    }
  }
}
export default dataStands
