// 所有输入项配置

/**
 * label: 显示的名称
 * name: 字段名 如bazaDO.bazae1代表bazaDO下的bazae1字段，年龄和颅昏迷时间特殊
 * relationFields: 需要关联的字段，如出院科别，显示的是 'bazaDO.leavehospital'字段值，存储的是 'bazaDO.baza23' 字段。在打开字典录入选择后，需要将选择的字典的dm值写入bazaDO.baza23中。
 * dictType: 字典类型，取值要与dict-input组件内的定义一致，有些如出生地，需要按空格键打开字典代码录入窗口进行选择，然后将选择值填入对应的name和codeName中
 * dictExtraParams: 查字典时需要传的额外参数 如中医诊断和症候、科别
 * type: 输入项类型 text select number date
 * staticOptions: type === select 时的静态选项数据，是固定的，从optionConfig里获取
 * staticAfter: 静态的单位后缀，如 克、次等
 * dynamicAfter: 动态的单位后缀，如年龄的单位，需要根据具体的详情里的数据进行匹配判断，见页面data.dynamicAfterObj[dynamicAfter]
 * disabled: 此项是否禁用。 true 禁用，否则启用
 * showCondition：显示条件，某些输入项如新生儿出生体重，需要根据具体的详情数据进行判断是否显示，见页面data.judge[showCondition]
 * span: row col组件里的span参数，指定此项输入在一行中所占宽度,
 * computed: 某些字段值改变时需要计算其他字段的值，如根据出生日期和出院日期计算年龄。格式：{'要计算的字段名': 计算方法}，计算方法接收的参数是所有输入项的值(见页面 handleInputItemChange方法)
 * valuesToJumpNext：预设一些值，当此输入项的值在此预设值中，则聚焦时需要跳过下一个（因为等于这些值时，下一个会disabeld不可输入，如离院方式等，disabled见页面dynamicDisabledObj，跳过判断见input-item组件handleEnter）
 */

import options from "./optionConfig";

// 计算项方法 (tip: 返回null不会设置，返回其他任何值如undefined、''都会被设置)
const computedFunc = {
    // 计算年龄，根据出生日期和出院日期
    age: function (values) {
        let outYear = values['bazaDO.baza27'] ? values['bazaDO.baza27'].split('-')[0] : undefined;
        let birthYear = values['bazaDO.baza04'] ? values['bazaDO.baza04'].split('-')[0] : undefined;
        if (outYear && birthYear) {
            outYear = Number(outYear);
            birthYear = Number(birthYear);
            return (!isNaN(outYear) && !isNaN(birthYear)) ? (outYear - birthYear) : null
        }
        return null
    },
    // 住院天数，根据出生日期和入院日期
    stayDays: function (values) {
        const enterDate = values['bazaDO.baza24'] ? values['bazaDO.baza24'] : undefined;
        const outDate = values['bazaDO.baza27'] ? values['bazaDO.baza27'] : undefined;
        if (enterDate && outDate) {
            // console.log(Date.parse(outDate), Date.parse(enterDate));
            let Days = (Date.parse(outDate) - Date.parse(enterDate)) / (1 * 24 * 60 * 60 * 1000);
            if (isNaN(Days) || Days < 0) return null;
            return Math.ceil(Days)
        }
        return null
    },
    // 再入院目的 （没有31天再入院计划时需要清空再入院目的）
    hospitalAgain: function (values) {
        return values['bazaDO.bazad5'] == '1' ? null : ''
    },
    // 拟接受医疗机构名称(离院方式切换不为2、3时清空)
    leaveAndReceiveName: function (values) {
        return values['bazaDO.bazad5'] == '2' || values['bazaDO.bazad5'] == '3' ? null : ''
    },
    // 过敏药物(过敏不为2时需要清空)
    allergicDrugs: function (values) {
        return values['bazaDO.baza52'] == '2' ? null : ''
    },
    // 住院次数 根据病案号得到（病案号后两位）
    HospitalizationTimes(values) {
        if (values['bazaDO.baza00']) {
            return values['bazaDO.baza00'].substr(values['bazaDO.baza00'].length - 4, 4)
        }
        return null
    }
};

export default [

    // 第一段（0 - 54）

    { label: '病案号', name: 'bazaDO.baza00', type: 'text', span: 6, computed: { 'HospitalizationTimes': computedFunc.HospitalizationTimes } },
    { label: '住院次数', name: 'HospitalizationTimes', disabled: true, type: 'text', staticAfter: '次', span: 6 },
    { label: '健康卡号', name: 'bazaDO.baza81', type: 'text', span: 6 },
    { label: '医疗付费方式', name: 'bazaDO.bazae1', type: 'select', staticOptions: options.payType, span: 6 },


    { label: '姓名', name: 'bazaDO.baza02', type: 'text', span: 6 },
    { label: '性别', name: 'bazaDO.baza03', type: 'select', staticOptions: options.sex, span: 3 },
    { label: '出生日期', name: 'bazaDO.baza04', type: 'date', span: 6, computed: { 'bazaDO.baza06.normal': computedFunc.age } },
    { label: '年龄', name: 'bazaDO.baza06.normal', type: 'text', staticAfter: '岁', dynamicAfter: 'ageAfter', disabled: true, span: 3 },
    { label: '国籍', name: 'bazaDO.nationality', relationFields: ['dm/bazaDO.bazaa2'], dictType: 'nationalityDict', type: 'text', span: 6 },

    { label: '(年龄不足1周岁的)年龄', name: 'bazaDO.baza06.newBaby', type: 'number', max: 10000, min: 0, showCondition: 'isNewBaby', span: 8 },
    { label: '新生儿出生体重', name: 'bazaDO.bazaf3', type: 'number', max: 10000, min: 0, showCondition: 'isNewBaby', staticAfter: '克', span: 8 },
    { label: '新生儿入院体重', name: 'bazaDO.bazaf4', type: 'number', max: 10000, min: 0, showCondition: 'isNewBaby', staticAfter: '克', span: 8 },

    { label: '出生地', name: 'bazaDO.birthplace', relationFields: ['dm/bazaDO.baza09'], dictType: 'districtDict', type: 'text', span: 10 },
    { label: '籍贯', name: 'bazaDO.bazaf5name', relationFields: ['dm/bazaDO.bazaf5'], dictType: 'districtDict', type: 'text', span: 8 },
    { label: '民族', name: 'bazaDO.nation', relationFields: ['dm/bazaDO.baza10'], dictType: 'nationDict', type: 'text', span: 6 },

    { label: '身份证号', name: 'bazaDO.baza05', type: 'text', span: 10 },
    { label: '职业', name: 'bazaDO.profession', relationFields: ['dm/bazaDO.baza08'], dictType: 'occupationDict', type: 'text', span: 8 },
    { label: '婚姻', name: 'bazaDO.baza07', type: 'select', staticOptions: options.marry, span: 6 },

    { label: '现住址', name: 'bazaDO.baza09name', relationFields: ['dm/bazaDO.bazaf6'], dictType: 'districtDict', type: 'text', span: 6 },
    { label: '街村', name: 'bazaDO.bazaf7', type: 'text', span: 7 },
    { label: '电话', name: 'bazaDO.bazaa5', type: 'text', span: 5 },
    { label: '邮编', name: 'bazaDO.bazaa6', type: 'text', span: 6 },

    { label: '户口地址', name: 'bazaDO.baza12name', relationFields: ['dm/bazaDO.baza12'], dictType: 'districtDict', type: 'text', span: 9 },
    { label: '街村', name: 'bazaDO.baza13', type: 'text', span: 9 },
    { label: '邮编', name: 'bazaDO.baza14', type: 'text', span: 6 },

    { label: '工作单位及地址', name: 'bazaDO.bazaa3', type: 'text', span: 10 },
    { label: '单位电话', name: 'bazaDO.baza11', type: 'text', span: 8 },
    { label: '邮编', name: 'bazaDO.bazaa4', type: 'text', span: 6 },

    { label: '联系人姓名', name: 'bazaDO.baza15', type: 'text', span: 8 },
    { label: '关系', name: 'bazaDO.baza16', type: 'select', staticOptions: options.relation, span: 8 },
    { label: '电话', name: 'bazaDO.baza19', type: 'text', span: 8 },

    { label: '联系人地址', name: 'bazaDO.baza17name', relationFields: ['dm/bazaDO.baza17'], dictType: 'districtDict', type: 'text', span: 12 },
    { label: '街村', name: 'bazaDO.baza18', type: 'text', span: 12 },

    { label: '入院途径', name: 'bazaDO.baza56', type: 'select', staticOptions: options.enterWay, span: 24 },

    { label: '治疗类别', name: 'bazaDO.baza55', type: 'select', staticOptions: options.treatmentType, span: 24 },

    { label: '入院日期', name: 'bazaDO.baza24', type: 'date', span: 5, computed: { 'bazaDO.baza29': computedFunc.stayDays } },
    { label: '时间', name: 'bazaDO.baza25', type: 'time', span: 4, computed: { 'bazaDO.baza29': computedFunc.stayDays } },
    { label: '入院科别', name: 'bazaDO.hospitalization', relationFields: ['dm/bazaDO.baza21', 'bqmc/bazaDO.rgb43', 'bqdm/bazaDO.bazaba'], dictType: 'departmentDict', dictExtraParams: { bz: '0' }, type: 'text', span: 5 },
    { label: '入院病室', name: 'bazaDO.rgb43', relationFields: ['dm/bazaDO.bazaba'], dictType: 'inpatientAreaDict', type: 'text', span: 5 },
    { label: '转科科别', name: 'bazaDO.baza22name', relationFields: ['dm/bazaDO.baza22'], dictType: 'departmentDict', dictExtraParams: { bz: '0' }, type: 'text', span: 5 },

    { label: '出院日期', name: 'bazaDO.baza27', type: 'date', span: 5, computed: { 'bazaDO.baza06.normal': computedFunc.age, 'bazaDO.baza29': computedFunc.stayDays } },
    { label: '时间', name: 'bazaDO.baza28', type: 'time', span: 4, computed: { 'bazaDO.baza29': computedFunc.stayDays } },
    { label: '出院科别', name: 'bazaDO.leavehospital', relationFields: ['dm/bazaDO.baza23', 'bqmc/bazaDO.cgb43', 'bqdm/bazaDO.bazabc'], dictType: 'departmentDict', dictExtraParams: { bz: '0' }, type: 'text', span: 5 },
    { label: '出院病室', name: 'bazaDO.cgb43', relationFields: ['dm/bazaDO.bazabc'], dictType: 'inpatientAreaDict', type: 'text', span: 5 },
    { label: '实际住院', name: 'bazaDO.baza29', type: 'text', staticAfter: '天', span: 5 },

    { label: '门(急)诊断(中医诊断)', name: 'baf9DO.baf902name', relationFields: ['dm/baf9DO.baf902'], dictType: 'chineseDiagnoseDict', dictExtraParams: { code: 1 }, type: 'text', span: 18 },
    { label: '疾病编码', name: 'baf9DO.baf902', disabled: true, type: 'text', span: 6 },

    { label: '门(急)诊断(中医证候)', name: 'baf9DO.baf903name', relationFields: ['dm/baf9DO.baf903'], dictType: 'chineseDiagnoseDict', dictExtraParams: { code: 2 }, type: 'text', span: 18 },
    { label: '疾病编码', name: 'baf9DO.baf903', disabled: true, type: 'text', span: 6 },

    { label: '门(急)诊断(西医诊断)', name: 'bazaDO.baza36name', relationFields: ['dm/bazaDO.baza36', 'icd10/bazaDO.bazad9'], dictType: 'westernDiagnoseDict', type: 'text', span: 18 },
    { label: '　ICD10', name: 'bazaDO.bazad9', type: 'text', disabled: true, span: 6 },

    { label: '实施临床路径', name: 'bazaDO.bazag1', type: 'select', staticOptions: options.clinicalWay, span: 12 },
    { label: '使用医疗机构中药制剂', name: 'bazaDO.baza70', type: 'select', staticOptions: options.whether, span: 12 },

    { label: '使用中医诊疗设备', name: 'bazaDO.bazag2', type: 'select', staticOptions: options.whether, span: 8 },
    { label: '使用中医诊疗技术', name: 'bazaDO.baza71', type: 'select', staticOptions: options.whether, span: 8 },
    { label: '辨证施护', name: 'bazaDO.bazag3', type: 'select', staticOptions: options.whether, span: 8 },


    // 第二段（54 - 76）

    { label: '损伤、中毒的外部原因', name: 'bazaDO.dmmc', relationFields: ['dm/bazaDO.baza79'], dictType: 'gb29Dict', dictCanDel: true, type: 'text', span: 18 },
    { label: '疾病编码', disabled: true, name: 'bazaDO.baza79', type: 'text', span: 6 },

    { label: '病理诊断', name: 'bazaDO.pathologicDiagnosisName', specialInput: 'pathologicDiagnosis', type: 'text', span: 8 },
    { label: '疾病编码', disabled: true, name: 'bazaDO.pathologicDiagnosis', type: 'text', span: 8 }, // 这连个名字是假的
    { label: '病理号', disabled: false, name: 'bazaDO.baf202', type: 'text', span: 8 },

    { label: '药物过敏', name: 'bazaDO.baza52', type: 'select', staticOptions: options.DrugAllergy, span: 8, computed: { 'bazaDO.allergicDrugs': computedFunc.allergicDrugs }, valuesToJumpNext: ['1'] },
    { label: '过敏药物', name: 'bazaDO.allergicDrugs', type: 'text', span: 8, specialInput: 'allergicDrugs' },
    { label: '死亡患者尸检', name: 'bazaDO.bazace', type: 'select', staticOptions: options.whether, span: 8 },

    { label: '血型', name: 'bazaDO.baza45', type: 'select', staticOptions: options.bloodType, span: 12 },
    { label: 'Rh', name: 'bazaDO.bazac5', type: 'select', staticOptions: options.Rh, span: 12 },

    { label: '科主任', name: 'bazaDO.bazab1', relationFields: [], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '主任(副主任)医师', name: 'bazaDO.baza32', relationFields: [], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '主治医师', name: 'bazaDO.baza33', relationFields: [], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '住院医师', name: 'bazaDO.baza34', relationFields: [], dictType: 'doctorDict', type: 'text', span: 6 },

    { label: '责任护士', name: 'bazaDO.bazabf', relationFields: [], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '主进修医师', name: 'bazaDO.bazab2', relationFields: [], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '实习医师', name: 'bazaDO.bazab4', relationFields: [], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '编码员', name: 'bazaDO.baza59', relationFields: [], dictType: 'doctorDict', type: 'text', span: 6 },

    { label: '病案质量', name: 'bazaDO.baza51', type: 'select', staticOptions: options.quality, span: 6 },
    { label: '质控医师', name: 'bazaDO.bazab5', relationFields: [], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '质控护士', name: 'bazaDO.baza69', relationFields: [], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '质控日期', name: 'bazaDO.bazab6', type: 'date', span: 6 },

    // 第三段（76 - end）

    { label: '离院方式', name: 'bazaDO.bazaf8', type: 'select', staticOptions: options.outWay, span: 12, computed: { 'bazaDO.bazaf9': computedFunc.leaveAndReceiveName }, valuesToJumpNext: ['1', '4', '5', '6'] },
    { label: '拟接受医疗机构名称', name: 'bazaDO.bazaf9', type: 'text', span: 12 },

    { label: '是否有出院31天内再住院计划', name: 'bazaDO.bazad5', type: 'select', staticOptions: options.whether1, computed: { 'bazaDO.bazad6': computedFunc.hospitalAgain }, valuesToJumpNext: ['2'], span: 12 },
    { label: '再住院目的', name: 'bazaDO.bazad6', type: 'text', span: 12 },

    { label: '颅脑损伤患者昏迷时间：入院前', name: 'bazaDO.bazad7.days', type: 'text', staticAfter: '天', span: 8 },
    { label: '', name: 'bazaDO.bazad7.hours', type: 'text', staticAfter: '小时', span: 3 },
    { label: '', name: 'bazaDO.bazad7.minutes', type: 'text', staticAfter: '分钟', span: 3 },
    { label: '入院后', name: 'bazaDO.bazad8.days', type: 'text', staticAfter: '天', span: 4 },
    { label: '', name: 'bazaDO.bazad8.hours', type: 'text', staticAfter: '小时', span: 3 },
    { label: '', name: 'bazaDO.bazad8.minutes', type: 'text', staticAfter: '分钟', span: 3 },

    { label: '住院费用(元): 总费用', name: 'baf6DO.baf601', type: 'text', span: 12 },
    { label: '( 自付金额', name: 'baf6DO.baf602', type: 'text', staticAfter: ')', span: 12 },

    { label: '1.综合医疗服务类: (1) 一般医疗服务费', name: 'baf6DO.baf603', type: 'text', span: 8 },
    { label: '( 中医辨证论治费', name: 'baf6DO.baf631', type: 'text', span: 8 },
    { label: '中医辨证论治会诊费', name: 'baf6DO.baf632', type: 'text', staticAfter: '）', span: 8 },

    { label: '(2) 一般治疗操作费', name: 'baf6DO.baf604', type: 'text', span: 5 },
    { label: '(3) 护理费', name: 'baf6DO.baf605', type: 'text', span: 5 },
    { label: '(4) 其他费用', name: 'baf6DO.baf606', type: 'text', span: 5 },

    { label: '2.诊断类:(5) 病理诊断费', name: 'baf6DO.baf607', type: 'text', span: 12 },
    { label: '(6) 实验室诊断费', name: 'baf6DO.baf608', type: 'text', span: 12 },
    { label: ' (7) 影像学诊断费', name: 'baf6DO.baf609', type: 'text', span: 12 },
    { label: '(8) 临床诊断项目费', name: 'baf6DO.baf610', type: 'text', span: 12 },

    { label: '3.治疗类:(9) 非手术治疗项目费', name: 'baf6DO.baf611', type: 'text', span: 12 },
    { label: '（临床物理治疗费', name: 'baf6DO.baf612', type: 'text', staticAfter: '）', span: 8 },
    { label: '(10) 手术治疗费', name: 'baf6DO.baf613', type: 'text', span: 5, offset: 0 },
    { label: '( 麻醉费', name: 'baf6DO.baf614', type: 'text', span: 5 },
    { label: '手术费', name: 'baf6DO.baf615', type: 'text', staticAfter: '）', span: 5 },

    { label: '4.康复类: (11) 康复费', name: 'baf6DO.baf616', type: 'text', span: 24, width: 235 },

    { label: '5.中医类（中医和民族医疗服务） (12) 中医诊断', name: 'baf6DO.baf633', type: 'text', span: 12 },
    { label: '(13) 中医治疗', name: 'baf6DO.baf617', type: 'text', span: 6, },
    { label: '( 中医外治：', name: 'baf6DO.baf634', type: 'text', span: 6, },
    { label: '中医骨伤：', name: 'baf6DO.baf635', type: 'text', span: 4, },
    { label: '针灸与灸法：', name: 'baf6DO.baf636', type: 'text', span: 5, },
    { label: '中医中医推拿治疗：', name: 'baf6DO.baf637', type: 'text', span: 5, },
    { label: '中医肛肠治疗：', name: 'baf6DO.baf638', type: 'text', span: 5, },
    { label: '中医特殊治疗：', name: 'baf6DO.baf639', type: 'text', span: 5, staticAfter: '）' },
    { label: '（14）中医其他：', name: 'baf6DO.baf640', type: 'text', span: 5 },
    { label: '（中药特殊调配加工：', name: 'baf6DO.baf641', type: 'text', span: 5 },
    { label: '辨证施膳：', name: 'baf6DO.baf642', type: 'text', span: 5, staticAfter: ')' },

    { label: '6.西药类: (15) 西药费', name: 'baf6DO.baf618', type: 'text', span: 12 },
    { label: '(抗菌药物费用', name: 'baf6DO.baf619', type: 'text', staticAfter: ')', span: 12 },

    { label: '7.中药类: (16) 中成药费', name: 'baf6DO.baf620', type: 'text', span: 8 },
    { label: '(医疗机构中药制剂费', name: 'baf6DO.baf643', type: 'text', span: 8, staticAfter: '）' },
    { label: '(17) 中草药费', name: 'baf6DO.baf621', type: 'text', span: 8 },

    { label: '8.血液和血液制品类: (18) 血费', name: 'baf6DO.baf622', type: 'text', span: 8 },
    { label: '(19) 白蛋白类制品费', name: 'baf6DO.baf623', type: 'text', span: 8 },
    { label: '(20) 球蛋白类制品费', name: 'baf6DO.baf624', type: 'text', span: 8 },

    { label: '(21) 凝血因子类制品费', name: 'baf6DO.baf625', type: 'text', span: 8, offset: 0 },
    { label: '(22) 细胞因子类制品费', name: 'baf6DO.baf626', type: 'text', span: 8 },

    { label: '9.耗材类: (23) 检查用一次性医用材料费', name: 'baf6DO.baf627', type: 'text', span: 9 },
    { label: '(24) 治疗用一次性医用材料费', name: 'baf6DO.baf628', type: 'text', span: 7 },
    { label: '(25) 手术用一次性医用材料费', name: 'baf6DO.baf629', type: 'text', span: 8 },

    { label: '10.其他类: (26) 其他费', name: 'baf6DO.baf630', type: 'text', span: 8 },
];
