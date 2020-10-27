import {
    get,
    post,
    put,
    deletes
} from "../utils/http";

/* 借阅登记 */

// 病案信息查询
export const searchInfo = baza00 => {
    return post(`/web/medicalRecordBorrow/findInfo?baza00=${baza00}`);
};

// 借阅登记
export const borrow = params => {
    return post('/web/medicalRecordBorrow/borrow', params);
};

/* 归还处理 */

// 查询未归还的病案
export const searchUnBackBorrowRecords = bafy03 => {
    if (bafy03) return post(`/web/medicalRecordBorrow/findBorrowRecord?bafy03=${bafy03}`);
    return post(`/web/medicalRecordBorrow/findBorrowRecord`);
};

// 归还病案
export const giveBack = params => {
    return post('/web/medicalRecordBorrow/giveBack', params)
};

/* 查询统计 */

// 借阅查询
export const borrowSearch = params => {
    return post('/web/medicalRecordBorrow/borrowInfo', params)
};

// 借阅统计
export const borrowStatistics = params => {
    return post('/web/medicalRecordBorrow/statistic', params)
};
