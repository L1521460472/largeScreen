/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lijiancong
 * @Date: 2022-01-05 14:30:49
 * @LastEditors: lijiancong
 * @LastEditTime: 2022-01-05 16:19:30
 */
import service from "../../../../utils/server";
const prefix = process.env.VUE_APP_PREFIX;
const gps = process.env.VUE_APP_GPS_PREFIX;
export const gpsHistory = data => {
  return service({
    url: `${gps}/gps/gpsHistory/pageInfo`,
    method: "post",
    data
  });
};

export const getTimeRangeHistoryData = data => {
  return service({
    url: `${gps}/gps/gpsHistory/getTimeRangeHistoryData`,
    method: "post",
    data
  });
};
export const getCarParkingInfo = data => {
  return service({
    url: `${gps}/gps/gpsHistory/getCarParkingInfo`,
    method: "post",
    data
  });
};
