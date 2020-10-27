import {
    get,
    post,
    put,
    deletes
} from "../utils/http";

// 签收查询
export const receiveSearch = params => {
    return post('/web/medicalRecordsManagement/pageList', params);
};

// 签收登记（保存）
export const receiveSave = params => {
    return post('/web/medicalRecordsManagement/update', params);
};

