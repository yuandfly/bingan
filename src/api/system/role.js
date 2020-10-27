import axios from 'axios'
let base = '/web-api'

/*
 *角色管理相关接口
 */
// 1.角色管理列表分页接口
export const getRolePageList = params => { return axios.post('/web/role/getPageList', params) }
// 2.角色删除接口
export const deleteRoleById = params => { return axios.get('/web/role/deleteById/' + params) }
// // 3.roleId对应的菜单(角色权限回显)
export const getRolePerTree = params => { return axios.get('/web/permission/getRolePermissTree/' + params) }
// 4.角色编辑接口
export const updateData = params => { return axios.post('/web/role/updateData', params) }
// 5.角色新增接口
export const insertData = params => { return axios.post('/web/role/insertData', params) }
// 6.角色下拉选接口
export const getRoleSelect = params => { return axios.get('/web/role/getRoleSelect', params) }
