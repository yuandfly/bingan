import inputConfig from "./config/inputConfig";

export default {

    // 详情原始值
    originData: {
        baf0DO: [],
        baf1DO: [],
        baf4DO: [],
        bazaDO: {},
        baf6DO: {},
        baf2DO: {}
    },

    // 底部固定栏的高度，用不聚焦时滚动
    fixedFooterHeight: 120,

    /**
     * 初始化所有输入项的值为 undefined
     */
    initInputsValues() {
        const inputValues = {};
        inputConfig.forEach(item => inputValues[item.name] = undefined)
        return inputValues
    },

    getOffsetTop(el) {
        // console.log(el, el.offsetTop);
        if (el.offsetParent) return this.getOffsetTop(el.offsetParent) + el.offsetTop;
        return el.offsetTop
    },

    /**
     * 聚焦下一个输入框
     * @param currentName inputConfig中某一项的name属性
     * @param init 是否是初始化，需要聚焦第一个输入项
     * @param jumpNext 是否跳过下一个
     */
    focusNext(currentName, init = false, jumpNext) {
        const index = inputConfig.findIndex(item => item.name === currentName);
        if (index >= 0 && inputConfig[index + 1]) {
            // 下一个输入项
            const nextItem = init ? inputConfig[index] : inputConfig[index + 1];
            // 如果下一个是被禁用的，跳过继续聚焦下一个
            if (nextItem.disabled || jumpNext) {
                this.focusNext(nextItem.name, false)
            } else {
                // 找到下一个输入项的包裹元素
                const boxEl = document.getElementById(nextItem.name);
                if (boxEl) {
                    // 找到element-ui的真实输入框元素
                    const inputEl = boxEl.querySelector('.el-input__inner');
                    // select需要通过触发点才能展开下拉选项
                    // if (nextItem.type === 'select') inputEl && inputEl.click();
                    // 其他类型可直接使这个input聚焦（包括date）
                    inputEl && inputEl.click();
                    inputEl && inputEl.focus();
                    // 滚动到可视区域
                    const boxOffsetTop = this.getOffsetTop(boxEl); // 输入项距离顶部的距离
                    // console.log(boxOffsetTop, document.documentElement.scrollTop + window.innerHeight - 150, 'opo')
                    // 若元素距顶部距离 大于 页面已滚动的高度加页面可视高度，代表元素处在可视区域下方不可见处，需要滚到可见
                    // 减 fixedFooterHeight 是因为页面下方有 fixedFooterHeight 高度的固定栏也会挡住元素
                    if (boxOffsetTop > (document.documentElement.scrollTop + window.innerHeight - this.fixedFooterHeight)) {
                        // 滚到目标元素上方100px处
                        window.scrollTo('auto', boxOffsetTop - 100)
                    }
                } else { // 找不到则跳过到下一个（因为有些输入项会根据条件不渲染）
                    this.focusNext(nextItem.name, false)
                }
            }
        }
    },

    /**
     * 设置所有输入项的值
     * @param data
     * @returns {*}
     */
    setInputValues(data) {
        let inputValues = this.initInputsValues();
        // 遍历data.bazaDO
        Object.keys(data.bazaDO).forEach(key => {
            if (key === 'bazad7' || key === 'bazad8') { // 特殊处理1: 颅脑损伤患者昏迷时间 入院前后
                const time = data.bazaDO[key] ? data.bazaDO[key].split(":") : [];
                const days = time[0] || '', hours = time[1] || '', minutes = time[2] || '';
                inputValues[`bazaDO.${key}.days`] = days;
                inputValues[`bazaDO.${key}.hours`] = hours;
                inputValues[`bazaDO.${key}.minutes`] = minutes;
            } else if (key === 'baza06') { // 特殊处理2：年龄
                inputValues[`bazaDO.${key}.normal`] = data.bazaDO[key];
                if (data.bazaDO.bazaa1 === 'M' || data.bazaDO.bazaa1 === 'D') {
                    inputValues[`bazaDO.${key}.newBaby`] = data.bazaDO[key];
                }
            } else {
                inputValues[`bazaDO.${key}`] = data.bazaDO[key]
            }
        });
        // 遍历data.baf6DO(各类费用)
        Object.keys(data.baf6DO).forEach(key => {
            inputValues[`baf6DO.${key}`] = data.baf6DO[key]
        });
        // 遍历data.baf2DO(外部损伤那里，病理号等)
        if (data.baf2DO) {
            Object.keys(data.baf2DO).forEach(key => {
                inputValues[`baf2DO.${key}`] = data.baf6DO[key]
            });
        }
        // 遍历data.baf9DO(中医诊断 中医证候)
        if (data.baf9DO) {
            Object.keys(data.baf9DO).forEach(key => {
                data.baf9DO[key] && (inputValues[`baf9DO.${key}`] = data.baf9DO[key])
            });
        }
        // 特殊处理3：住院次数
        inputValues.HospitalizationTimes = data.bazaDO.baza00.substr(data.bazaDO.baza00.length - 4, 4);
        // 特殊处理：过敏药物
        inputValues.allergicDrugs = data.bazaDO.baza52 == '2' ? (
            (data.baf5DO || []).filter(item => item.baf502 === '0').map(item => item.baf504Name).join('，')
        ) : '';
        // 特殊处理：病理诊断的显示
        const firstItem = (data.baf2DO || []).find(item => item.baf208 == 1) || {};
        inputValues['bazaDO.pathologicDiagnosisName'] = firstItem.baf203; // 病理诊断名称
        inputValues['bazaDO.pathologicDiagnosis'] = firstItem.baf207; // 编码
        inputValues['bazaDO.baf202'] = firstItem.baf202; // 病理号
        // 返回
        return inputValues;
    },

    /**
     * 设置西医诊断表格：将西医的主要诊断、其他诊断整合为一个表格数据
     * @param data
     */
    setWesternDiagnoseTable(data) {
        const WesternDiagnoseTable = [];
        // 主要诊断：只有一个，数据分散在data.bazaDO对象里
        WesternDiagnoseTable.push({
            type: 'main', // 主要诊断
            diseaseName: data.bazaDO.westernmedicine, // 疾病名称
            diseaseCode: data.bazaDO.baza38, // 疾病编码
            entryState: data.bazaDO.bazafa, // 入院病情
            turnReturn: data.bazaDO.baza41, // 转归
            ICD10: data.bazaDO.baza65 // ICD10
        });
        // 其他诊断：list
        if (data.baf1DO && data.baf1DO.length) {
            data.baf1DO.forEach(item => {
                item && WesternDiagnoseTable.push({
                    ...item,
                    type: 'other',
                    diseaseName: item.baf103name,
                    diseaseCode: item.baf103,
                    entryState: item.baf108,
                    turnReturn: item.baf105,
                    ICD10: item.baf111,
                })
            })
        }
        return WesternDiagnoseTable;
    },

    /**
     * 设置中医诊断表格的数据: ：将中医的主要诊断、其他诊断整合为一个表格数据
     * @param data
     * @returns {*}
     */
    setChineseDiagnoseTable(data) {
        const ChineseDiagnoseTable = [];
        // 主要诊断：只有一个，数据在data.baf9DO对象里
        const main = data.baf9DO && Object.keys(data.baf9DO).length ? data.baf9DO : {};
        ChineseDiagnoseTable.push({
            type: 'main', // 主要诊断
            diseaseCode: main.baf906, // 疾病编码
            diseaseName: main.baf906name, // 疾病名称
            turnReturn: main.baf916,  // 转归
            entryState: main.baf908  // 入院病情
        });
        // 其他诊断：data.baf0DO这个list
        if (data.baf0DO && data.baf0DO.length) {
            data.baf0DO.forEach(item => {
                item && ChineseDiagnoseTable.push({
                    ...item,
                    type: 'other',
                    diseaseCode: item.baf003,
                    diseaseName: item.baf003name,
                    turnReturn: item.baf005,
                    entryState: item.baf004
                })
            })
        }
        return ChineseDiagnoseTable
    },

    /**
     * 整理组合手术表格的数据
     * @param data
     * @returns {*}
     */
    setOperationTable(data) {
        // 是否有手术
        if (data.bazaDO && data.bazaDO.baza53 == "1") {
            return (data.baf4DO || []).map(item => ({
                ...item,
                baf411: item.baf411, // 手术操作日期
            }));
        }
        return []
    },

    /**
     * 重新处理得到提交参数
     * @param inputValues 输入项的值
     * @param allergicDrugsData 过敏药物
     * @param diagnosisData 病理诊断
     * @param WesternDiagnoseTable 西医诊断
     * @param ChineseDiagnoseTable 中医诊断
     * @param operationTable 手术数据
     */
    getSubmitParams(inputValues, allergicDrugsData, diagnosisData, WesternDiagnoseTable, ChineseDiagnoseTable, operationTable) {
        const { originData } = this;

        /* 1、处理inputValues,回填到originData各处 */
        inputConfig.forEach(item => {
            // 示例： [field1, field2, field3] = [bazaDO, bazad7, hours]
            const [field1, field2, field3] = item.name.split('.');
            if (!originData[field1]) originData[field1] = {};
            if (field1 && field2) {
                if (field3) { // 特殊字段
                    if (field2 === 'bazad7' || field2 === 'bazad8') { // 颅脑损伤患者昏迷时间 入院前后
                        originData[field1][field2] = (inputValues[`${field1}.${field2}.days`] || '') +
                            ':' + (inputValues[`${field1}.${field2}.hours`] || '') +
                            ':' + (inputValues[`${field1}.${field2}.minutes`] || '')
                    } else if (field2 === 'baza06') { // 年龄
                        originData[field1][field2] = inputValues[`${field1}.${field2}.newBaby`]
                            || inputValues[`${field1}.${field2}.normal`];
                    }
                } else { // 一般字段
                    originData[field1][field2] = this.trim(inputValues[`${field1}.${field2}`]);
                }
            }
            // 如果有关联字段，如出生地等对应的编码字段，需要同时填入originData中
            if (item.relationFields) {
                item.relationFields.forEach(item => {
                    const [dictField, targetField] = item.split('/');
                    const [field1, field2] = targetField.split('.');
                    if (originData[field1]) {
                        originData[field1][field2] = this.trim(inputValues[`${field1}.${field2}`]);
                    }
                });
            }
        });

        originData.baf5DO = inputValues['bazaDO.baza52'] == '2' ? allergicDrugsData : [];

        originData.baf2DO = diagnosisData;

        /* 2、处理西医诊断表格数据填回 */
        const mainDiagnose = WesternDiagnoseTable.find(item => item.type === 'main'); // 主诊断项
        if (mainDiagnose) {
            originData.bazaDO.westernmedicine = this.trim(mainDiagnose.diseaseName); // 主诊断 名称
            originData.bazaDO.baza38 = this.trim(mainDiagnose.diseaseCode); // 主诊断 疾病编码
            originData.bazaDO.bazafa = mainDiagnose.entryState; // 主诊断 入院病情
            originData.bazaDO.baza41 = mainDiagnose.turnReturn; // 主诊断 转归
            originData.bazaDO.baza65 = this.trim(mainDiagnose.ICD10); // 主诊断 icd10
        }
        originData.baf1DO = WesternDiagnoseTable
            .filter(item => item.type === 'other' && item.diseaseCode)
            .map((item, index) => ({
                ...item,
                baf111: this.trim(item.ICD10),
                baf103: this.trim(item.diseaseCode),
                baf103name: this.trim(item.diseaseName),
                baf105: item.turnReturn,
                baf108: item.entryState || '',
                baf102: String(index + 1) // 序号
            })); // 其他诊断

        /* 3、处理中医诊断表格数据填回 */
        const chineseMainDiagnose = ChineseDiagnoseTable.find(item => item.type === 'main'); // 中医主诊断项
        if (chineseMainDiagnose && chineseMainDiagnose.diseaseCode) {
            if (!originData.baf9DO) originData.baf9DO = {};
            originData.baf9DO.baf906 = this.trim(chineseMainDiagnose.diseaseCode); // 中医主诊断 疾病编码
            originData.baf9DO.baf906name = this.trim(chineseMainDiagnose.diseaseName); // 中医主诊断 疾病名称
            originData.baf9DO.baf916 = chineseMainDiagnose.turnReturn; // 中医主诊断 转归
            originData.baf9DO.baf908 = chineseMainDiagnose.entryState; // 中医主诊断 入院病情
        }
        originData.baf0DO = ChineseDiagnoseTable
            .filter(item => item.type === 'other' && item.diseaseCode)
            .map((item, index) => ({
                ...item,
                baf003: this.trim(item.diseaseCode),
                baf003name: this.trim(item.diseaseCode),
                baf004: item.entryState || '',
                baf005: item.turnReturn,
                baf002: String(index + 1)
            })); // 中医其他诊断

        /* 4、处理手术表格数据填回 */
        originData.baf4DO = operationTable.map((item, index) => ({
            ...item,
            baf407: String(index + 1)
        }));
        // 手术去空格
        originData.baf4DO.forEach(item => {
            Object.keys(item).forEach(key => {
                item[key] = this.trim(item[key])
            })
        });

        return this.originData
    },

    /**
     * 去除左右空格
     * @param str
     */
    trim(str) {
        if (!str || typeof str === 'number') return str;
        return str.trim()
    }
}
