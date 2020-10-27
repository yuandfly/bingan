import axios from 'axios'

/**操作日志接口*/

/**获取操作日志*/
export const getCzrzPageList = params => { return axios.post('/web/czrz/getCzrzPageList', params) }

/**获取操作日志 不分页*/
export const getCzrzPageListAll = params => { return axios.post('/web/czrz/getCzrzList', params) }

/*获取操作日志详情**/
export const seletcCzrzxqList = params => { return axios.post('/web/czrz/seletcCzrzxqList', params) }