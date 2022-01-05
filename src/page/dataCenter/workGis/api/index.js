import service from '@/utils/server';
const prefix = process.env.VUE_APP_PREFIX
export const gpsCarState = data => {
  return service({
    url: `${prefix}/gps/gpsCarState/getTenantCarData`,
    method: 'post',
    data
  });
};

export const gpsCarStateQuery = data => {
  return service({
    url: `${prefix}/gps/gpsHistory/pageInfo`,
    method: 'post',
    data
  });
};

export const gpsCarStateQueryFirst = data => {
  return service({
    url: `${prefix}/gps/gpsCarState/query`,
    method: 'post',
    data
  });
};
export const getTmDispatchOrder = data => {
  return service({
    url: `${prefix}/transmanage/tmDispatchOrder/getDetailByCarNum`,
    method: 'post',
    data
  });
}
export const bdStructuresPoint = data => {
  return service({
    url: `${prefix}/basedata/bdStructuresPoint/findLocation`,
    method: 'post',
    data
  });
}