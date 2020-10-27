import inputConfig from "./config/inputConfig";
import crypto from "@/common/js/crypto.js";
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

    // 详情原始值的复制，用于提交时的数据对比
    copyOriginData: {
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
        inputConfig.forEach(item => inputValues[item.name] = "")
        console.log(inputValues);
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
     * @param step 步长 1为下一个， -1为上一个
     */
    focusNext(currentName, init = false, jumpNext, step = 1) {
        const index = inputConfig.findIndex(item => item.name === currentName);
        if (index >= 0 && inputConfig[index + step]) {
            // 下一个输入项
            const nextItem = init ? inputConfig[index] : inputConfig[index + step];
            console.log(nextItem, jumpNext);
            // 如果下一个是被禁用的，跳过继续聚焦下一个
            if (nextItem.disabled || jumpNext) {

                this.focusNext(nextItem.name, false, false, step)
            } else {
                // 找到下一个输入项的包裹元素
                const boxEl = document.getElementById(nextItem.name);
                console.log(boxEl);
                if (boxEl && !boxEl.querySelector('input').disabled) {
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
                    this.focusNext(nextItem.name, false,false, step)
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
        console.log(data)
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
        // 遍历data.bafcDO(输血症状)
        if (data.bafcDO) {
            Object.keys(data.bafcDO).forEach(key => {
                data.bafcDO[key] && (inputValues[`bafcDO.${key}`] = data.bafcDO[key])
            });
        }

        // 遍历data.baf8DO(病种管理)
        if (data.baf8DO) {
            Object.keys(data.baf8DO).forEach(key => {
                data.baf8DO[key] && (inputValues[`baf8DO.${key}`] = data.baf8DO[key])
            });
        }

        // // 遍历data.baf7DO(重症监护)
        // if (data.baf7DO) {
        //     console.log(data.baf7DO);
        //     Object.keys(data.baf7DO).forEach((key, index) => {
        //         data.baf7DO[key] && (inputValues[`baf7DO.${key}`] = data.baf7DO[key])
        //     });
        // }
        // 特殊处理3：住院次数
        inputValues.HospitalizationTimes = Number(data.bazaDO.baza00.substr(data.bazaDO.baza00.length - 5, 5));
        // 特殊处理：过敏药物
        inputValues.allergicDrugs = data.bazaDO.baza52 == '2' ? (
            (data.baf5DO || []).filter(item => item.baf502 === '0').map(item => item.baf504Name).join('，')
        ) : '';
        // 特殊处理：病理诊断的显示
        const firstItem = (data.baf2DO || []).find(item => item.baf208 == 1) || {};
        inputValues['bazaDO.pathologicDiagnosisName'] = firstItem.baf203; // 病理诊断名称
        inputValues['bazaDO.pathologicDiagnosis'] = firstItem.baf207; // 编码
        inputValues['bazaDO.baf202'] = firstItem.baf202; // 病理号

        // 特殊处理 日间手术病例
        if (data.baf8DO) {
            inputValues['baf8DO.baf813'] = data.baf8DO.baf813;
        }
        // 特殊处理 重症监护 显示
        if (data.baf7DO) {
            inputValues['baf7DO'] = data.baf7DO;
        } else {
            inputValues['baf7DO'] = [];
        }

        // 特殊处理， 术前与术后，取手术记录的第一条的baf406
        if (data.baf4DO && data.baf4DO[0]) {
            inputValues['baf4DO.baf406'] = data.baf4DO[0]['baf406'];
        }

        // 特殊处理 医师信息为空的话 自动同步
        if (data.physicianDO) {
                Object.keys(data.physicianDO).forEach(key => {
                    data.physicianDO[key] && (inputValues[`physicianDO.${key}`] = data.physicianDO[key])
                });

            console.log(data.physicianDO, inputValues);

            // 科主任
            if(!inputValues['bazaDO.bazab1']) {
                inputValues['bazaDO.bazab1'] = inputValues['physicianDO.bazab1'];
                inputValues['bazaDO.bazab1name'] = inputValues['physicianDO.bazab1name'];
            }
            // 主任医师
            if(!inputValues['bazaDO.baza32']) {
                inputValues['bazaDO.baza32'] = inputValues['physicianDO.baza32'];
                inputValues['bazaDO.baza32name'] = inputValues['physicianDO.baza32name'];
            }
            // 主治医师
            if(!inputValues['bazaDO.baza33']) {
                inputValues['bazaDO.baza33'] = inputValues['physicianDO.baza33'];
                inputValues['bazaDO.baza33name'] = inputValues['physicianDO.baza33name'];
            }
            // 住院医师
            if(!inputValues['bazaDO.baza34']) {
                inputValues['bazaDO.baza34'] = inputValues['physicianDO.baza34'];
                inputValues['bazaDO.baza34name'] = inputValues['physicianDO.baza34name'];
            }
            // 责任护士
            if(!inputValues['bazaDO.bazabf']) {
                inputValues['bazaDO.bazabf'] = inputValues['physicianDO.bazabf'];
                inputValues['bazaDO.bazabfname'] = inputValues['physicianDO.bazabfname'];
            }
            // 主进修医师
            if(!inputValues['bazaDO.bazab2']) {
                inputValues['bazaDO.bazab2'] = inputValues['physicianDO.bazab2'];
                inputValues['bazaDO.bazab2name'] = inputValues['physicianDO.bazab2name'];
            }
            // 实习医师
            if(!inputValues['bazaDO.bazab4']) {
                inputValues['bazaDO.bazab4'] = inputValues['physicianDO.bazab4'];
                inputValues['bazaDO.bazab4name'] = inputValues['physicianDO.bazab4name'];
            }
            // 质控医师
            if(!inputValues['bazaDO.bazab5']) {
                inputValues['bazaDO.bazab5'] = inputValues['physicianDO.bazab5'];
                inputValues['bazaDO.bazab5name'] = inputValues['physicianDO.bazab5name'];
            }
            // 质控护士
            if(!inputValues['bazaDO.baza69']) {
                inputValues['bazaDO.baza69'] = inputValues['physicianDO.baza69'];
                inputValues['bazaDO.baza69name'] = inputValues['physicianDO.baza69name'];
            }
        }

        // 特殊处理 死亡详情 显示
        if (data.baf3DO) {
            inputValues['baf3DO'] = data.baf3DO;
        } else {
            inputValues['baf3DO'] = {};
        }

        // 特殊处理 重症监护 显示
        if (data.bafaDO && data.bafaDO.length > 0) {
            console.log(data)
            inputValues['bafaDO'] = data.bafaDO;
        } else {
            inputValues['bafaDO'] = [];
        }


        // 特殊处理 肿瘤分期
        if (data.bazaDO.bazagb) {
            inputValues['zlfqt'] = data.bazaDO.bazagb.substr(1, 1);
            inputValues['zlfqn'] = data.bazaDO.bazagb.substr(3, 1);
            inputValues['zlfqm'] = data.bazaDO.bazagb.substr(5, 1);
        }

        // 返回
            console.log(inputValues);
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
        if (data.bazaDO && data.bazaDO.baza53 !== "2") {
            console.log(data.baf4DO);

            // 如果麻醉方式是其它 则清空
            data.baf4DO.forEach((item) => {
                if (item['baf410'] === '9' || item['baf410'] === 'RNA00' ) {
                    item['baf410'] = null;
                    item['baf410name'] = null;
                }
            })

            return (data.baf4DO || []).map(item => ({
                ...item,
                baf411: item.baf411, // 手术操作日期
            }));
        }
        return []
    },

    /**
     * 重新处理得到提交参数
     * @param type add or edit
     * @param inputValues 输入项的值
     * @param allergicDrugsData 过敏药物
     * @param diagnosisData 病理诊断
     * @param WesternDiagnoseTable 西医诊断
     * @param ChineseDiagnoseTable 中医诊断
     * @param operationTable 手术数据
     */

    getSubmitParams(type, inputValues, allergicDrugsData, diagnosisData, WesternDiagnoseTable, ChineseDiagnoseTable, operationTable) {

        console.log(WesternDiagnoseTable);
        const { originData } = this;

        /* 1、处理inputValues,回填到originData各处 */
        inputConfig.forEach(item => {
            // 示例： [field1, field2, field3] = [bazaDO, bazad7, hours]
            const [field1, field2, field3] = item.name.split('.');
            if (!originData[field1]) originData[field1] = {};
            if (field1) {
                if (field3) { // 特殊字段
                    if (field2 === 'bazad7' || field2 === 'bazad8') { // 颅脑损伤患者昏迷时间 入院前后
                        originData[field1][field2] = (inputValues[`${field1}.${field2}.days`] || '') +
                            ':' + (inputValues[`${field1}.${field2}.hours`] || '') +
                            ':' + (inputValues[`${field1}.${field2}.minutes`] || '')
                        // 没有的话还是填回null
                        // if (originData[field1][field2] === '::') originData[field1][field2] = null
                    } else if (field2 === 'baza06') { // 年龄
                        originData[field1][field2] = inputValues[`${field1}.${field2}.newBaby`]
                            || inputValues[`${field1}.${field2}.normal`];
                        originData[field1]['bazaa1'] = inputValues[`${field1}.bazaa1`]; // 动态单位
                    }
                } else { // 一般字段
                    // baf8dO 添加 病历号
                    if (field1 === 'baf8DO') {
                        originData[field1]['baza00'] = originData['bazaDO']['baza00'];
                        originData[field1]['baza01'] = originData['bazaDO']['baza01'];
                    }
                    if (field1 === 'bafcDO') {
                        originData[field1]['baza00'] = originData['bazaDO']['baza00'];
                        originData[field1]['baza01'] = originData['bazaDO']['baza01'];
                    }
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
                baza00: item.baza00,
                baza01: item.baza01,
                baf111: this.trim(item.ICD10),
                baf103: this.trim(item.diseaseCode),
                baf103name: this.trim(item.diseaseName),
                baf105: item.turnReturn,
                baf106: item.baf106,
                baf107: item.baf107,
                baf109: item.baf109,
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
            originData.baf9DO.baf907 = inputValues['baf9DO.baf907']; //
        }
        originData.baf0DO = ChineseDiagnoseTable
            .filter(item => item.type === 'other' && item.diseaseCode)
            .map((item, index) => ({
                baza00: item.baza00,
                baza01: item.baza01,
                baf003: this.trim(item.diseaseCode),
                baf003name: this.trim(item.diseaseName),
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

        // 手术 术前与术后
        if (originData.baf4DO && originData.baf4DO[0]) {
            originData.baf4DO[0]['baf406'] = inputValues['baf4DO.baf406'];
        }


        // 新增，处理必要的病案号等数据
        if (type === 'add') {
            // 病案号
            const baza00 = originData.bazaDO.baza00;
            const baza01 = originData.bazaDO.baza01;
            Object.keys(originData).forEach(key => {
                const dataItem = originData[key]
                if (Array.isArray(dataItem)) {
                    dataItem.forEach(item => { item.baza00 = baza00; item.baza01 = item.baza01 })
                } else if (typeof dataItem === 'object' && dataItem !== null) {
                    dataItem.baza00 = baza00;
                    dataItem.baza01 = baza01;
                }
            });
        }

        /* 6、比对数据修改 */
        const editLog = this.getEditLog(type, this.originData, this.copyOriginData);

        this.originData.czrzxqList = editLog;

        this.originData.adminDO = this.adminDO();

        // 重症监护信息
      //  this.$set(this.originData, 'baf7DO', inputValues['baf7DO']);
        let baf7DO = [];
        console.log(inputValues);
       if (inputValues['bazaDO.bazag5'] === '2') {
            baf7DO = JSON.parse(JSON.stringify(inputValues['baf7DO']));
           for (let i = 0;i < baf7DO.length; i++) {
               for (let v in baf7DO[i]) {
                   if (v.indexOf('baf') < 0 && v !== 'baza00') {
                       delete baf7DO[i][v];
                   }
               }
               baf7DO[i]['baza00'] = this.originData['bazaDO']['baza00'];
               baf7DO[i]['baza01'] = this.originData['bazaDO']['baza01'];
           }
       } else {
           baf7DO = [];
       }

        // 新生儿信息
        let bafaDO = [];
        if (inputValues['bafaDO'] && inputValues['bafaDO'].length > 0) {
            console.log(inputValues['bafaDO']);
            bafaDO = JSON.parse(JSON.stringify(inputValues['bafaDO']));
            for (let i = 0;i < bafaDO.length; i++) {
                for (let v in bafaDO[i]) {
                    if (v.indexOf('bafa') < 0 && v !== 'baza00') {
                        delete bafaDO[i][v];
                    }
                    bafaDO[i]['baza00'] = this.originData['bazaDO']['baza00'];
                    bafaDO[i]['baza01'] = this.originData['bazaDO']['baza01'];
                }
            }
        }






        // 添加用户信息
        this.originData['adminDO'] = crypto.getUserInfo().adminData;


        this.originData['baf7DO'] = inputValues['baf7DO'] = baf7DO;
        this.originData['bafaDO'] = inputValues['bafaDO'] = bafaDO;

        // 死亡详情
        this.originData['baf3DO'] = inputValues['baf3DO'];

        console.log(operationTable);

        // 修改否有手术标志
        // if (operationTable &&operationTable.length > 0) {
        //     this.originData['bazaDO']['baza53'] = inputValues['bazaDO.baza53'] = '1';
        // } else {
        //     this.originData['bazaDO']['baza53'] = inputValues['bazaDO.baza53'] = '0';
        // }

        return this.originData
    },

    /**
     * 获取当前登录人的信息（用于操作日志）
     */
    adminDO() {
        let sessionUser = sessionStorage.getItem("sessionUser");
        let sessionUserValue = JSON.parse(crypto.decrypt(sessionUser, null));
        return sessionUserValue.adminData
    },

    /**
     * 比对新旧数据，得到具体修改了哪些东西
     * @param type
     * @param newData
     * @param oldData
     */
    getEditLog(type, newData, oldData) {
        if (type === 'add') return [];
        const editLog = {};
        for (let key in oldData) {
            editLog[key] = [];
            if (Array.isArray(newData[key])) {
                // 取新旧两数组的长度最大值
                const maxLength = Math.max(newData[key].length, (oldData[key] || []).length);
                // 遍历最大长度
                for (let i = 0; i < maxLength; i++) {
                    // 新旧两数组第【i】项
                    const newItem = newData[key][i], oldItem = oldData[key][i];
                    console.log(newItem, oldItem);
                    // 新旧数组同时存在这一项，可能有修改
                    if (newItem && oldItem) {
                        Object.keys(oldItem).forEach(field => {
                            if (this.trim(oldItem[field]) != newItem[field]) {
                                editLog[key].push({zdmc: field, xh: i, gq: oldItem[field], gh: newItem[field]})
                            }
                        })
                    }
                    // 新数据有，旧数据没有，是添加了这一项
                    if (newItem && !oldItem) {
                        Object.keys(newItem).forEach(field => {
                            editLog[key].push({zdmc: field, xh: i, gq: '', gh: newItem[field]})
                        })
                    }
                    // 新数据没有，旧数据有，是删除了这一项
                    if (!newItem && oldItem) {
                        Object.keys(oldItem).forEach(field => {
                            editLog[key].push({zdmc: field, xh: i, gq: oldItem[field], gh: ''})
                        })
                    }
                }
            } else if (typeof newData[key] === 'object' && newData[key] !== null ) {
                Object.keys(newData[key]).forEach(objKey => {
                    const oldValue = oldData[key] ? this.trim(oldData[key][objKey]) : '';
                    const newValue = newData[key][objKey];
                    console.log(oldValue, newValue, objKey);
                    if ((oldValue != newValue) && !(oldValue === undefined &&  newValue === "")) {
                        editLog[key].push({zdmc: objKey, gq: oldValue || '', gh: newValue})
                    }
                })
            }
        }
        let newEditLog = {};
        Object.keys(editLog).forEach((value, index, arr) => {
            newEditLog[value + 'XQ'] = editLog[value];
        })

        // 删除与后台无关，只用做前台回显的操作
        newEditLog.bazaDOXQ = newEditLog.bazaDOXQ.filter((value) => {

            if (value.zdmc === 'pathologicDiagnosisName' || value.zdmc === 'pathologicDiagnosis'  ) {
               return false;
            } else {
                return true;
            }
        })
        newEditLog.baf1DOXQ = newEditLog.baf1DOXQ.filter((value) => {

            if (value.zdmc === 'fjm') {
               return false;
            } else {
                return true;
            }
        })
        newEditLog.baf8DOXQ = newEditLog.baf8DOXQ.filter((value) => {

            if (value.zdmc === 'baza00' || value.zdmc === 'baza01') {
               return false;
            } else {
                return true;
            }
        })
        newEditLog.bafcDOXQ = newEditLog.bafcDOXQ.filter((value) => {

            if (value.zdmc === 'baza00' || value.zdmc === 'baza01') {
               return false;
            } else {
                return true;
            }
        })
        newEditLog.bazaDOXQ = newEditLog.bazaDOXQ.filter((value) => {

            if ((value.zdmc === 'baza59' && value.gh === '系统管理员') || (value.zdmc === 'bazad7' && value.gh === '::') || (value.zdmc === 'bazad8' && value.gh === '::')) {
               return false;
            } else {
                return true;
            }
        })
        console.log(oldData);
        return newEditLog;
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
