import service from '@/utils/server';
/** 调度工单页面  */
// 通过处置单位  查询处置工艺等信息
const prefix = process.env.VUE_APP_PREFIX
export const disposalUnitInformation = data => {
    return service({
        url: `${prefix}/basedata/bdDealArtInfo/getDealArtName/${data}`,
        method: 'get',
    })
};
// 通过运输单位  查询车型
export const vehicleModel = data => {
    return service({
        url: `${prefix}/basedata/bdCarsInfo/getCarTypeNameList/${data}`,
        method: 'get',
    })
};
// 调度工单列表查询接口
export const pageInfo = data => {
    return service({
        url: `${prefix}/transmanage/tmDispatchOrder/pageInfo`,
        method: 'post',
        data
    })
};

// 根据运输单位id获取司机列表信息
export const getDeliverNameList = data => {
    return service({
        url: `${prefix}/tms/tmsCarDispatch/getDrivers`,
        method: 'post',
        data
    })
};

// 根据车型id，运输单位id获取车牌列表信息
export const getVehicleNoList = data => {
    return service({
        url: `${prefix}/tms/tmsCarDispatch/getVehicleNos`,
        method: 'post',
        data
    })
};

// 查询产废单位
export const getWasteProduction = data => {
    return service({
        url: `${prefix}/common/common/getWasteProduction`,
        method: 'get',
        data
    })
};

// 查询调度方案
export const getDispatchPlan = data => {
    return service({
        url: `${prefix}/common/common/getDispatchPlan`,
        method: 'get',
        data
    })
};

// 查询产废类型
export const getWasteType = data => {
    return service({
        url: `${prefix}/common/common/getWasteType`,
        method: 'get',
        data
    })
};

// 查询处置单位
export const getDispositionUnit = data => {
    return service({
        url: `${prefix}/common/common/getDispositionUnit`,
        method: 'get',
        data
    })
};

// 查询运输单位
export const getTransUnit = data => {
    return service({
        url: `${prefix}/common/common/getTransUnit`,
        method: 'get',
        data
    })
};

// 取消工单
export const cancelDispatchOrder = data => {
    return service({
        url: `${prefix}/transmanage/tmDispatchOrder/cancelDispatchOrder`,
        method: 'post',
        data
    })
};

// 查询车辆类型
export const queryCarState = data => {
    return service({
        url: `${prefix}/gps/gpsCarState/queryCarState`,
        method: 'post',
        data
    })
};

// 系统调度
export const systemDispatch = data => {
    return service({
        url: `${prefix}/transmanage/tmDispatchOrder/systemDispatch`,
        method: 'post',
        data
    })
};

// 人工调度
export const editDispatchOrder = data => {
    return service({
        url: `${prefix}/transmanage/tmDispatchOrder/editDispatchOrder`,
        method: 'post',
        data
    })
};
//处置变更
export const emergencyChange = data => {
    return service({
        url: `${prefix}/transmanage/tmDispatchOrder/emergencyChange`,
        method: 'post',
        data
    })
}
// 审批
export const auditDispatchOrder = data => {
    return service({
        url: `${prefix}/transmanage/tmDispatchOrder/auditDispatchOrder`,
        method: 'post',
        data
    })
};

// 查询车型列表
export const getbdCarTypeList = data => {
    return service({
        url: `${prefix}/common/common/getCarsType`,
        method: 'get',
        data
    })
};

// 查看详细调度工单信息
export const getDetailedSchedulingData = data => {
    return service({
        url: `${prefix}/transmanage/tmDispatchOrder/getDispatchOrderDetails/` + data,
        method: 'post',
    })
};

/** 派车单页面  */
// 派车单列表查询接口
export const tmsCarDispatchPageInfo = data => {
    return service({
        url: `${prefix}/tms/tmsCarDispatch/pageInfo`,
        method: 'post',
        data
    })
};

// 取消派车单接口
export const deteleTmsCarDispatch = data => {
    return service({
        url: `${prefix}/tms/tmsCarDispatch/cancelCarDispatch`,
        method: 'post',
        data
    })
};

//  查看派车单详细数据的接口
export const getDeliveryOrderInformation = data => {
    return service({
        url: `${prefix}/tms/tmsCarDispatch/getCarDispatchDetails/` + data,
        method: 'post',
    })
};

// 派车接口
export const saveCarrier = data => {
    return service({
        url: `${prefix}/tms/tmsCarDispatch/saveCarrier`,
        method: 'post',
        data
    })
};

//  派车 获取 司机联系方式
export const getDrivercContactInformation = data => {
    return service({
        url: `${prefix}/basedata/bdDriversInfo/` + data,
        method: 'get',
    })
};
/** 调度方案配置页面  */
// 调度方案配置列表查询接口
export const tmDispatcherPlanList = data => {
    return service({
        url: `${prefix}/transmanage/tmDispatcherPlan/pageInfo`,
        method: 'post',
        data
    })
};

// 调度方案  新增接口
export const addTmDispatcherPlan = data => {
    return service({
        url: `${prefix}/transmanage/tmDispatcherPlan/`,
        method: 'post',
        data
    })
};

// 调度方案  编辑接口
export const editTmDispatcherPlan = data => {
    return service({
        url: `${prefix}/transmanage/tmDispatcherPlan/`,
        method: 'PUT',
        data
    })
};

// 调度方案  删除接口
export const deleteTmDispatcherPlan = data => {
    return service({
        url: `${prefix}/transmanage/tmDispatcherPlan/${data}`,
        method: 'DELETE',
        data
    })
};
//  联单号  doubleBidispatchNumberConfirmation
export const systemDispatchGenerate = data => {
    return service({
        url: `${prefix}/extraData/bdTmsDispatchItem/getFiveOrderNo`,
        method: 'post',
        data
    })
};

//  联单号 点击确认按钮
export const doubleBidispatchNumberConfirmation = data => {
    return service({
        url: `${prefix}/tms/tmsCarDispatch/saveFiveOrderNO`,
        method: 'post',
        data
    })
};
//查询运输单位旗下的车型信息，对应查询按钮
export const getCarTypeNameList = data => {
    return service({
        url: `${prefix}/basedata/bdCarsInfo/getCarTypeNameList/${data}`,
        method: 'get',
    })
};
// 操作记录
export const getoperateRecord = data => {
    return service({
        url: `${prefix}/operateRecord/bdOperationRecord/dispatchOrderPageInfo`,
        method: 'post',
        data
    });
}
//人工调度根据车型选择公司
export const getCompanyOfCar = data => {
    return service({
        url: `${prefix}/basedata/bdTransUnitInfo/getTransUnitInfo/${data}`,
        method: 'get',
    });
}
export const getDistance = data => {
    return service({
        url: `${prefix}/contract/contractDistance/getDistance`,
        method: 'post',
        data
    });
}
export const getmessage = () => {
    return service({
        url: `${prefix}/message/messageInfo/getMessageNum`,
        method: 'get',
        closeGlobalLoading: { closeLoading: true }
    })
}

//查询运输单位旗下的车型信息，对应查询按钮
export const getTransunitBycarTypeId = data => {
    return service({
        url: `${prefix}/basedata/bdTransUnitInfo/getTransUnitInfo/${data}`,
        method: 'get',
    })
};
//应急变更
export const emergencyExtraChangeSave = data => {
    return service({
        url: `${prefix}/transmanage/tmDispatchOrder/emergencyExtraChange`,
        method: 'post',
        data
    })
}

