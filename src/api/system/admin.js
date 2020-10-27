import axios from 'axios'
let base = '/web-api'

/*
 *管理员相关接口
 */
// 1.管理员管理列表分页接口
export const getAdminVOPageList = params => { return axios.post('/web/admin/getAdminVOPageList', params) }
// 2.删除接口-----禁用..
export const deleteRoleById = params => { return axios.get('/web/admin/deleteById/' + params) }
// 3.页面修改员工状态接口
export const updateDisabledById = params => { return axios.get('/web/admin/updateDisabledById', { params: params }) }
// 4.管理员编辑接口
export const updateData = params => { return axios.post('/web/admin/updateData', params) }
// 5.管理员新增接口
export const insertData = params => { return axios.post('/web/admin/insertData', params) }
// 5.查询单个adminDO
export const getById = params => { return axios.post('/web/admin/getById/' + params) }

export const adminChangePassword = params => { return axios.post('/web/admin/adminChangePassword', params) }
