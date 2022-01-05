import service from '@/utils/server';
const prefix = process.env.VUE_APP_PREFIX
const modName = `${prefix}/dataBoard/`;

export const getMapInfo = data => {
  return service({
    url: modName + 'getMapInfo',
    method: 'get',
    closeGlobalLoading: { closeLoading: true }
  });
};
export const getVehicleMonitor = data => {
  return service({
    url: modName + 'getVehicleMonitor',
    method: 'get',
    closeGlobalLoading: { closeLoading: true }
  });
};

// 查询昨日固废外运总量
export const getOutWasteWeight = data => {
  return service({
    url: modName + 'getOutWasteWeight',
    method: 'get',
    closeGlobalLoading: { closeLoading: true }
  });
};
//七日外运趋势
export const getWeekTrendWeight = data => {
  return service({
    url: modName + 'getWeekTrendWeight',
    method: 'get',
    closeGlobalLoading: { closeLoading: true }
  });
};
//昨日固废处置排行
export const getDisposalRankWeight = data => {
  return service({
    url: modName + 'getDisposalRankWeight',
    method: 'get',
    closeGlobalLoading: { closeLoading: true }
  });
};
// 固废实时运输记录
export const findWasteTransRecord = data => {
  return service({
    url: modName + 'findWasteTransRecord',
    method: 'get',
    data
  });
};
// 查询固废外运污泥量
export const findWasteTransSort = data => {
  return service({
    url: modName + 'findWasteTransSort',
    method: 'get',
    data,
    closeGlobalLoading: { closeLoading: true }
  });
};
//地图
export const getMapData = data => {
  return service({
    url: `${prefix}/dataBoard/getMapData`,
    method: 'get',
  });
};
export const getDisposalPlanReceive = dispositionId => {
  return service({
    url: `${prefix}/dataBoard/getDisposalPlanReceive/${dispositionId}`,
    method: 'get',
  });
};

export const getWasteData = id => {
  return service({
    url: `${prefix}/dataBoard/getWasteData/${id}`,
    method: 'get',
  });
};

export const getTransCarData = id => {
  return service({
    url: `${prefix}/dataBoard/getTransCarData/${id}`,
    method: 'get',
  });
};
