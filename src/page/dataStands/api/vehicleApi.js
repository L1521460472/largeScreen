import service from '@/utils/server';
const prefix = process.env.VUE_APP_PREFIX
const gps = process.env.VUE_APP_GPS_PREFIX


export const initInfo = data => {
  return service({
    url: `${prefix}/gfHome/initInfo`,
    method: 'get',
    data
  });
}
export const getBaseInfo = data => {
  return service({
    url: `${prefix}/gfHome/get/monitoring/base/info`,
    method: 'post',
    data,
    closeGlobalLoading: { closeLoading: true }
  });
}
export const queryCarStateDeatil = obj => {
  return service({
    url: `${prefix}/gfHome/queryDeatil/${obj.carNumber}/${obj.dispatchOrder}/${obj.dispatchCode}`,
    method: 'post',
  });
};
export const getTmDispatchOrder = data => {
  return service({
    url: `${prefix}/transmanage/tmDispatchOrder/getDetailByCarNum`,
    method: 'post',
    data
  });
}
export const getIdleCars = () => {
  return service({
    url: `${prefix}/gfHome/idle/cars/base`,
    method: 'get',
  });
}
export const getIdleCarDetail = carNumber => {
  return service({
    url: `${prefix}/gfHome/idle/cars/detail/${carNumber}`,
    method: 'get',
  });
}
export const getGpsHistoryBatch = data => {
  return service({
    url: `${gps}/gps/gpsHistory/getGpsHistoryBatch`,
    method: 'post',
    data
  });
};




export const gpsCarState = data => {
  return service({
    url: `${gps}/gps/gpsCarState/getTenantCarData`,
    method: 'post',
    data
  });
};
export const gpsHistoryPageInfo = data => {
  return service({
    url: `${gps}/gps/gpsHistory/pageInfo`,
    method: 'post',
    data
  });
};
export const gpsCarStateQueryFirst = data => {
  return service({
    url: `${gps}/gps/gpsCarState/query`,
    method: 'post',
    data
  });
};
export const getTransUnitsAndCars = data => {
  return service({
    url: `${gps}/gps/gpsCarState/getTransUnitsAndCars`,
    method: 'post',
    data
  });
}
export const trackCar = data => {
  return service({
    url: `${gps}/gps/gpsCarState/trackCar`,
    method: 'post',
    data
  });
}

export const getAllUnit = data => {
  return service({
    url: `${gps}/gps/gpsUnitInfo/getAllUnit`,
    method: 'get',
    data
  });
}
