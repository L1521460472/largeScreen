//
import service from './../utils/server'

export const getPersonInfo = data => {
    return service({
        url: '/fmUser/login',
        method: 'post',
        data
    })
};


// export const fmRoleUserData = data => {
//     return service({
//         url: '/fmRole/getRoleInfoByName',
//         method: 'post',
//         data
//     })
// };

export const fmRoleUserAddData = data => {
    return service({
        url: '/fmRole/addRole',
        method: 'post',
        data
    })
};

export const fmRoleUpdateData = data => {
    return service({
        url: '/fmRole/updateRole',
        method: 'post',
        data
    })
};

export const fmUserQueryList = data => {
    return service({
        url: '/fmUser/getUsersByNoOrName',
        method: 'post',
        data
    })
};

export const fmUserLogin = data => {
    return service({
        url: '/fmUser/login',
        method: 'post',
        data
    })
};

export const queryPowerByMenuId = data => {
  return service({
    url: '/fmPageOp/queryPowerByMenuId',
    method: 'post',
    data
  })
};

export const fmUserLoginOut = data =>{
  return service({
    url: '/fmUser/out',
    method: 'post',
    data
  })
};
export const fmUserChangeUserPwdRequest = data =>{
  return service({
    url: '/fmUser/editPwd',
    method: 'post',
    data
  })
};
