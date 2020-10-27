import {
    get,
    post,
    put,
    deletes
} from "../utils/http";

// 首页审核数据
export const BaCheck = params => {
    return post("/web/dataCheck/baCheck", params);
};

export const LogCheck = params => {
    return post("/web/dataCheck/logCheck", params);
};

export const getXls = params => {
    return post("/web/dataCheck/getXls", params);
};
