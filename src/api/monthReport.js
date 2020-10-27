import {
    get,
    post,
    put,
    deletes
} from "../utils/http";
import utils from "../views/homepage/utils";
import testData from "./testData";

/* ----------------门诊--------------------------*/

// 门诊 由库生成
export const CreateFormKu = params => {
    return post(`/web/outpatient/getsumtjm7`, params);
};

// 门诊 由日志生成
export const CreateFormLog = params => {
    return post(`/web/outpatient/getTjm7`, params);
};

// 门诊 查询
export const SeletcTjm7List = params => {
    return post('/web/outpatient/seletcTjm7List', params)
};

// 门诊 月报保存
export const UpdateTjm7 = params => {
    return post('/web/outpatient/updateTjm7', params)
};

// 门诊 获取工作日设置
export const GetGzrList = params => {
    return post(`/web/outpatient/getGzrList`, params);
};

// 门诊 新增工作日设置
export const InsertGzrList = params => {
    return post(`/web/outpatient/insertGzrList`, params);
};

// 门诊 修改工作日设置
export const UpdateGzrList = params => {
    return post(`/web/outpatient/updataWorkday`, params);
};




// 住院 查询
export const SeletcTjz2List = params => {
    return post('/web/hospitalized/seletcTjz2List', params)
};

// 住院 由库生成
export const GetTjz2list = params => {
    return post('/web/hospitalized/getTjz2list', params);
};

// 住院 保存
export const SaveTjz2List = params => {
    return post('/web/hospitalized/updateTjz2', params);
};
