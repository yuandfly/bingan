import axios from 'axios'
let base = '/web-api'

/*
 *权限管理相关接口
 */
// 1.权限管理列表分页接口---一级目录的分页列表信息
// export const getPageList = params => { return axios.post('${base}/web/permission/getPageList', params) }
export const getPageList = params => { return axios.post('/web/permission/getPageList', params) }
// 2.权限管理列表接口---二级目录的分页列表信息
export const getList = params => { return axios.post('/web/permission/getList', params) }
// // 3.页面修改员工状态接口
// export const updateDisabledById = params => { return axios.get(`${base}/web/admin/updateDisabledById`, {params:params}) }
// // 4.管理员编辑接口
// export const updateData = params => { return axios.post(`${base}/web/admin/updateData`, params) }
// // 5.管理员新增接口
// export const insertData = params => { return axios.post(`${base}/web/admin/insertData`, params) }
// // 5.查询单个adminDO
// export const getById = params => { return axios.post(`${base}/web/admin/getById/`+params) }

