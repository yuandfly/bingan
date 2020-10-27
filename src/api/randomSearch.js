import {
    get,
    post,
    put,
    deletes
} from "../utils/http";

// 查询已有的条件组或输出组 （下拉选项）
export const GroupNameSelect = tableName => {
    return post(`/web/randomQuery/groupNameSelect?tableName=${tableName}`);
};

// 根据条件组名称获取其条件项
export const ConditionSelect = hmm => {
    return post(`/web/randomQuery/conditionSelect?hmm=${hmm}`);
};

// 删除条件
export const ConditionDel = params => {
    return post("/web/randomQuery/conditionDel", params);
};

// 保存条件
export const ConditionSave = params => {
    return post("/web/randomQuery/conditionSave", params);
};

// 随机查询
export const RandomSearch = params => {
    return post("/web/randomQuery/query", params);
};

// 根据输出组名称hmm查询输出项
export const OutputSelect = hmm => {
    return post(`/web/randomQuery/outPutSelect?hmm=${hmm}`);
};

// 删除输出项
export const OutputDel = params => {
    return post('/web/randomQuery/outPutDel', params)
};

// 保存输出
export const OutputSave = params => {
    return post("/web/randomQuery/outPutSave", params);
};

// 输出查询
export const OutputSearch = params => {
    return post("/web/randomQuery/randomOutPutQuery", params);
};

// 输出excel导出（下载）
export const OutputExport = params => {
    return post("/web/randomQuery/excelExport", params);
};




