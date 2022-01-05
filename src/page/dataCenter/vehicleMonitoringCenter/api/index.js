/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2022-01-05 14:30:49
 * @LastEditors: lijiancong
 * @LastEditTime: 2022-01-05 16:25:48
 */
import service from "@/utils/server";
const prefix = process.env.VUE_APP_PREFIX;
const gps = process.env.VUE_APP_GPS_PREFIX;
export const gpsCarState = data => {
  return service({
    url: `${gps}/gps/gpsCarState/getTenantCarData`,
    method: "post",
    data
  });
};

export const gpsHistoryPageInfo = data => {
  return service({
    url: `${gps}/gps/gpsHistory/pageInfo`,
    method: "post",
    data
  });
};
export const queryCarStateDeatil = obj => {
  return service({
    url: `${gps}/gps/gpsCarState/queryDeatil/${obj.carNumber}/${obj.dispatchOrder}/${obj.dispatchCode}`,
    method: "post"
  });
};

export const gpsCarStateQueryFirst = data => {
  return service({
    url: `${gps}/gps/gpsCarState/query`,
    method: "post",
    data
  });
};
export const getTmDispatchOrder = data => {
  return service({
    url: `${prefix}/transmanage/tmDispatchOrder/getDetailByCarNum`,
    method: "post",
    data
  });
};
export const getTransUnitsAndCars = data => {
  return service({
    url: `${gps}/gps/gpsCarState/getTransUnitsAndCars`,
    method: "post",
    data
  });
};
export const trackCar = data => {
  return service({
    url: `${gps}/gps/gpsCarState/trackCar`,
    method: "post",
    data
  });
};

export const getBaseInfo = data => {
  return service({
    url: `${gps}/gps/gpsCarState/get/baseInfo`,
    method: "post",
    data
  });
};

export const getAllUnit = data => {
  return service({
    url: `${gps}/gps/gpsUnitInfo/getAllUnit`,
    method: "get",
    data
  });
};
