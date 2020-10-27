import {
    get,
    post,
    put,
    deletes
} from "../utils/http";

// 新增货柜
export const insertData = params => {
  return  post('/web/bas5/insertData', params);
}
// 修改货柜
export const updateData = params => {
  return  post('/web/bas5/updateData', params);
}
// 查询货柜列表 分页
export const bas2PageList = params => {
  return  post('/web/bas5/bas2PageList', params);
}
// 删除货柜
export const deleteById = bas200 => {
  return  get(`/web/bas5/deleteById/${bas200}`);
    }
// 删除货柜格子
export const deleteCellById = bas200 => {
  return  get(`/web/bas5/deleteCellById/${bas200}`);
}

// 查询货柜格子信息
export const getCellList = params => {
    return  post('/web/bas5/getCellList', params);
}
// 添加货柜格子信息
export const insertCell = params => {
    return  post('/web/bas5/insertCell', params);
}
// 修改货柜格子信息
export const updateCell = params => {
    return  post('/web/bas5/updateCell', params);
}

