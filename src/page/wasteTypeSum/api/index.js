import service from '@/utils/server';
const prefix = process.env.VUE_APP_PREFIX
const modName = `${prefix}/dataBoard/`;

// 条件查询产废类型
export const getWasteTypeList = data => {
  return service({
    url: `${prefix}/dataBoard/getWasteTypeList`,
    method: 'get',
  });
};
// 查询当前固废类型的当天整点产废过磅净重
export const getWasteHourWeight = data => {
  return service({
    url: `${prefix}/dataBoard/getWasteHourWeight/` + data,
    method: 'get',
  });
};
// 查询该类型七日外运趋势总重
export const getWeekWeightByWaste = data => {
  return service({
    url: `${prefix}/dataBoard/getWeekWeightByWaste/` + data,
    method: 'get',
  });
};
// 获取同比和环比数据
export const getCompareByWaste = data => {
  return service({
    url: `${prefix}/dataBoard/getCompareByWaste/` + data,
    method: 'get',
  });
};
