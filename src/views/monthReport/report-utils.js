/**
 * 获取某年某月最大天数
 * @param year number 年份
 * @param month number|string 月份，数字或英文
 * @returns {number|undefined}
 */
export const getMonthMaxDays = function(year, month) {
    let monthNumber;
    if (typeof month === 'number') {
        monthNumber = month
    } else {
        const monthsArray = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        const index = monthsArray.findIndex(item => item === month);
        if (index < 0) return undefined;
        monthNumber = index ? (index + 1) : 1;
    }
    if (monthNumber === 2) {
        // 闰年：可同时被4和100整除 或者 可被400整除
        const leapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        return leapYear ? 29 : 28;
    } else {
        const bigMonth = '1, 3, 5, 7, 8, 10, 12';
        return bigMonth.indexOf(monthNumber) >= 0 ? 31 : 30
    }
};
