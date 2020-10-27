import {
    get,
    post,
    put,
    deletes
} from "../utils/http";

// 组合搜索查询
export const UnionSearch = params => {
    return post("/web/unionQuery/patientInfo", params);
};
