import {
  get,
  post,
  put,
  deletes
} from "../utils/http";

// 获取检查项目
export const getItemList = () => {
  return post('/web/qualityController/selectZktjDO');
};

// 查询已有评分
export const getQualityList = (param={}) => {
  return post('/web/qualityController/selectQuality',param);
};

/* 修改评分提交接口 */
export const updateQuality = (param={}) => {
  return post('/web/qualityController/updateQuality',param);
};

/* 新增评分提交接口 */
export const addQuality = (param={}) => {
  return post('/web/qualityController/addQuality',param);
};

/* 查询医师病案质控结果 */
export const getDoctorResult = (param={}) => {
  return post('/web/baza/doctorResult',param);
};