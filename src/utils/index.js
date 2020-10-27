import {
    Message
} from "element-ui"
import crypto from "crypto-js";
export function getMd5(str) {
    return crypto
        .MD5(str)
        .toString()
        .toUpperCase();
}
export function showOkMsg(msg) {
    Message({
        type: "success",
        message: msg,
        duration: 2000,
    });
}
export function showErrorMsg(msg) {
    Message({
        type: "error",
        message: msg,
        duration: 2000,
    });
}

/**
 * 清除空参数
 * @param params
 */
export function clearBlankParam(params) {
    const result = {};
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
            result[key] = params[key]
        }
    });
    return result;
}

/**
 * 格式化日期
 * @param date Date类型
 * @param fmt 格式化模板： YYYY-MM-DD HH:mm:ss
 * @returns {*}
 */
export function formatDate(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
    console.log(date);
    let t = {
        'YYYY': date.getFullYear(),
        'MM': date.getMonth() + 1,
        'DD': date.getDate(),
        'HH': date.getHours(),
        'mm': date.getMinutes(),
        'ss': date.getSeconds()
    };
    for (let item in t) {
        if (fmt.indexOf(item) >= 0) {
            fmt = fmt.replace(item, t[item] >= 10 ? t[item] : `0${t[item]}`)
        }
    }
    return fmt
}

/**
* 获取昨天日期
*/
export function yesterday() {
    let day = new Date();
    day.setTime(day.getTime() - 24 * 60 * 60 * 1000);
    let month = day.getMonth() + 1;
    let date = day.getDate();
    if (month < 10) {
        month = '0' + month;
    }
    if (date < 10) {
        date = '0' + date;
    }
    return day.getFullYear() + "-" + month + "-" + date;
}

/**
* 获取今天日期
*/
export function today() {
    let day = new Date();
    day.setTime(day.getTime());
    let month = day.getMonth() + 1;
    let date = day.getDate();
    if (month < 10) {
        month = '0' + month;
    }
    if (date < 10) {
        date = '0' + date;
    }
    return day.getFullYear() + "-" + month + "-" + date;
}

// 两个日期月数 差向下取整
export function MonthsBetw(date1, date2) { //date1和date2是2019-3-12格式
    //用-分成数组
    date1 = date1.split("-");
    date2 = date2.split("-");
    //获取年,月数
    var year1 = Number(date1[0]),
        month1 = Number(date1[1]),
        days1 = Number(date1[2]),
        year2 = Number(date2[0]),
        month2 = Number(date2[1]),
        days2 = Number(date2[2]),
        //通过年,月差计算月份差
        months = (year2 - year1) * 12 + (month2 - month1);
    console.log(month1, month2, days1, days2);
    months = days2 - days1 > 0? months + 1 : months;
    return Math.abs(months);
}
// 相差天数
export function  getDaysBetween(dateString1,dateString2){
    var  startDate = Date.parse(dateString1);
    var  endDate = Date.parse(dateString2);
    var days=(endDate - startDate)/(1*24*60*60*1000);
    // alert(days);
    return  days;
}


/**
 * 生成随机字符串
 * @param len 长度
 * @param strs 所有字符
 * @returns {string}
 */
export function randomStr(len, strs) {
    let allStrs = strs || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let maxPos = allStrs.length;
    let result = '';
    for (let i = 0; i < len; i++) {
        result += allStrs.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

//将大数组拆分为若干小数组
export function reSetData (dataList, num) {

    let arr = [];
    let len = dataList.length;
    console.log(len);
    for (let i = 0; i < len; i += num) {
        arr.push(dataList.slice(i, i + num));
        console.log(i, num);
    }
    return arr;
}

//
export function cleanSpelChar(th){
    if(/^[0-9\.-]*$/g.test(th)){
        $(th).val(th.value.replace(/^[0-9\.-]*$/g,""));
    }
}
