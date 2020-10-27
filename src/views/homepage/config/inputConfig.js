// 所有输入项配置

/**
 * label: 显示的名称
 * name: 字段名 如bazaDO.bazae1代表bazaDO下的bazae1字段，年龄和颅昏迷时间特殊
 * relationFields: 需要关联的字段，如出院科别，显示的是 'bazaDO.leavehospital'字段值，存储的是 'bazaDO.baza23' 字段。在打开字典录入选择后，需要将选择的字典的dm值写入bazaDO.baza23中。
 * dictType: 字典类型，取值要与dict-input组件内的定义一致，有些如出生地，需要按空格键打开字典代码录入窗口进行选择，然后将选择值填入对应的name和codeName中
 * dictExtraParams: 查字典时需要传的额外参数 如中医诊断和症候、科别
 * type: 输入项类型 text select number date checkbox
 * staticOptions: type === select 时的静态选项数据，是固定的，从optionConfig里获取
 * staticCheckbox: type === checkbox 时的静态选项数据，是固定的，从optionConfig里获取
 * staticAfter: 静态的单位后缀，如 克、次等
 * dynamicAfter: 动态的单位后缀，如年龄的单位，需要根据具体的详情里的数据进行匹配判断，见页面data.dynamicAfterObj[dynamicAfter]

 * dynamicBefore: 动态的单位前缀，如身份类型，身份证、护照、军人证 类似动态单位后缀
 * btnAfter: 会作为一个text类型的el-button插入
 * isBtnAfter:  是否禁用text类型的el-button
 * disabled: 此项是否禁用。 true 禁用，否则启用
 * showCondition：显示条件，某些输入项如新生儿出生体重，需要根据具体的详情数据进行判断是否显示，见页面data.judge[showCondition]
 * span: row col组件里的span参数，指定此项输入在一行中所占宽度,
 * computed: 某些字段值改变时需要计算其他字段的值，如根据出生日期和出院日期计算年龄。格式：{'要计算的字段名': 计算方法}，计算方法接收的参数是所有输入项的值(见页面 handleInputItemChange方法)
 * valuesToJumpNext：预设一些值，当此输入项的值在此预设值中，则聚焦时需要跳过下一个（因为等于这些值时，下一个会disabeld不可输入，如离院方式等，disabled见页面dynamicDisabledObj，跳过判断见input-item组件handleEnter）
 */

import options from "./optionConfig";
import {MonthsBetw, getDaysBetween} from '../../../utils';
// 计算项方法 (tip: 返回null不会设置，返回其他任何值如undefined、''都会被设置)
const computedFunc = {
    // 计算年龄，根据出生日期和出院日期
    age: function (values) {

        console.log(values['bazaDO.baza24'], values['bazaDO.baza04']);
        let outYear = values['bazaDO.baza24'] ? values['bazaDO.baza24'].split('-')[0] : undefined;
        let birthYear = values['bazaDO.baza04'] ? values['bazaDO.baza04'].split('-')[0] : undefined;
        let monthDiff = MonthsBetw(values['bazaDO.baza04'], values['bazaDO.baza24']);
        let dayDiff = getDaysBetween(values['bazaDO.baza04'], values['bazaDO.baza24']);
        console.log(monthDiff, dayDiff);
        if (monthDiff < 12) {
            console.log(values);
            // 如果是一个月，那就计算出生天数
            if (monthDiff === 1) {
                return dayDiff;
            } else {
                return monthDiff;
            }
        } else {
            if (outYear && birthYear) {
                outYear = Number(outYear);
                birthYear = Number(birthYear);

                return (!isNaN(outYear) && !isNaN(birthYear)) ? (outYear - birthYear) : null
            }
        }

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

    // 是否禁用按钮

    isTutelage: function (value) {
      //  console.log(value);
        return value['bazaDO.bazag5'] === '2' ? true : false;
    },
    // 过敏药物(过敏不为2时需要清空)
    allergicDrugs: function (values) {
        return values['bazaDO.baza52'] == '2' ? null : ''
    },

    // 转入机构名称
    // setOrgName: function(values) {
    //     console.log(values);
    //     return values['bazaDO.baza56'] === '3' ? true : false;
    //     // if (values['bazaDO.baza56'] === '3') {
    //     //
    //     // }
    // },

    // 住院次数 根据病案号得到（病案号后两位）
    HospitalizationTimes(values) {
        if (values['bazaDO.baza00']) {
            return values['bazaDO.baza00'].substr(values['bazaDO.baza00'].length - 4, 4)
        }
        return null
    }
};



export default [

    // 第一段（0 - 57）

    { label: '病案号', name: 'bazaDO.displaybaza00', type: 'text', span: 6, disabled: true, computed: { 'HospitalizationTimes': computedFunc.HospitalizationTimes } },
    { label: '住院次数', name: 'HospitalizationTimes', disabled: true, type: 'text', staticAfter: '次', span: 6 },
    { label: '健康卡号', name: 'bazaDO.baza81', type: 'text', span: 6 },
    { label: '医疗付费方式', name: 'bazaDO.bazae1', type: 'select', staticOptions: options.payType, span: 6 },


    { label: '姓名', name: 'bazaDO.baza02', type: 'text', span: 5 },
    { label: '性别', name: 'bazaDO.baza03', type: 'select', staticOptions: options.sex, span: 4 },

    { label: '出生日期', name: 'bazaDO.baza04', type: 'date', span: 4, computed: { 'bazaDO.baza06.normal': computedFunc.age } },
    { label: '年龄', name: 'bazaDO.baza06.normal', type: 'text',  dynamicAfter: 'ageAfter', dynamicAfterDisable: false, disabled: true,  span: 5 },
    { label: '国籍', name: 'bazaDO.nationality', relationFields: ['dm/bazaDO.bazaa2'], dictType: 'nationalityDict', type: 'text', span: 6 },

    // { label: '(年龄不足1周岁的)年龄', name: 'bazaDO.baza06.newBaby', type: 'number', max: 10000, min: 0, showCondition: 'isNewBaby', span: 8 },
    { label: '新生儿出生体重', name: 'bazaDO.bazaf3', type: 'number', max: 10000, min: 0,  btnAfter: '新生儿信息', isBtnAfter: true, span: 10, disabled: true },
    { label: 'APGAR评分', name: 'bazaDO.bazagc', type: 'number', max: 10, min: 0,   span: 6, disabled: true },

    { label: '新生儿入院体重', name: 'bazaDO.bazaf4', type: 'number', max: 10000, min: 0, disabled: true, staticAfter: '克', span: 8 },


    { label: '出生地', name: 'bazaDO.baza09name', relationFields: ['dmmc/bazaDO.bazaa3','dm/bazaDO.baza09','dm/bazaDO.bazaf6','dmmc/bazaDO.bazaf6name', 'dm/bazaDO.baza12', 'dmmc/bazaDO.baza12name', 'dm/bazaDO.baza17','dmmc/bazaDO.baza17name' ], dictType: 'districtDict', type: 'text', span: 10 },
    { label: '籍贯', name: 'bazaDO.bazaf5name', relationFields: ['dm/bazaDO.bazaf5'], dictType: 'districtDict', type: 'text', span: 8 },
    { label: '民族', name: 'bazaDO.nation', relationFields: ['dm/bazaDO.baza10'], dictType: 'nationDict', type: 'text', span: 6 },
    { label: '身份类型', name: 'baf8DO.baf810', type: 'select',  staticOptions: options.cardType, span: 5 },
    { label: '', name: 'bazaDO.baza05', type: 'text', span: 4,  disabled: true },
    { label: '身份证件不详的具体原因', name: 'baf8DO.baf811', type: 'select', span: 6, staticOptions: options.cardOther, disabled: true },
    { label: '职业', name: 'bazaDO.profession', relationFields: ['dm/bazaDO.baza08'], dictType: 'occupationDict', type: 'text', span: 5 },
    { label: '婚姻', name: 'bazaDO.baza07', type: 'select', staticOptions: options.marry, span: 4 },

    { label: '现住址', name: 'bazaDO.bazaf6name', relationFields: ['dm/bazaDO.bazaf6'], dictType: 'districtDict', type: 'text', span: 6 },
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

    { label: '入院途径', name: 'bazaDO.baza56', type: 'select', staticOptions: options.enterWay, span: 12 },
    { label: '转入机构名称', name: 'bazaDO.bazaa7', type: 'text', span: 12, disabled: true  },

    { label: '治疗类别', name: 'bazaDO.baza55', type: 'select', staticOptions: options.treatmentType, span: 24 },

    { label: '入院日期', name: 'bazaDO.baza24', type: 'date', span: 5, computed: { 'bazaDO.baza29': computedFunc.stayDays } },
    { label: '时间', name: 'bazaDO.baza25', type: 'text', span: 4,  },
    { label: '入院科别', name: 'bazaDO.hospitalization', relationFields: ['dm/bazaDO.baza21', 'bqmc/bazaDO.rgb43', 'bqdm/bazaDO.bazaba'], dictType: 'departmentDict', dictExtraParams: { bz: '0' }, type: 'text', span: 5 },
    { label: '入院病室', name: 'bazaDO.rgb43', relationFields: ['dm/bazaDO.bazaba'], dictType: 'inpatientAreaDict', type: 'text', span: 5 },
    { label: '转科科别', name: 'bazaDO.baza22name', relationFields: ['dm/bazaDO.baza22'], dictType: 'departmentDict', dictExtraParams: { bz: '0' }, type: 'text', span: 5, btnAfter: '查看详情' },
    { label: '出院日期', name: 'bazaDO.baza27', type: 'date', span: 5, computed: { 'bazaDO.baza06.normal': computedFunc.age, 'bazaDO.baza29': computedFunc.stayDays } },
    { label: '时间', name: 'bazaDO.baza28', type: 'text', span: 4,  },
    { label: '出院科别', name: 'bazaDO.leavehospital', relationFields: ['dm/bazaDO.baza23', 'bqmc/bazaDO.cgb43', 'bqdm/bazaDO.bazabc'], dictType: 'departmentDict', dictExtraParams: { bz: '0' }, type: 'text', span: 5 },
    { label: '出院病室', name: 'bazaDO.cgb43', relationFields: ['dm/bazaDO.bazabc'], dictType: 'inpatientAreaDict', type: 'text', span: 5 },
    { label: '实际住院', name: 'bazaDO.baza29', type: 'text', staticAfter: '天', span: 5 },

    { label: '门(急)诊断(中医诊断)', name: 'baf9DO.baf902name', relationFields: ['dm/baf9DO.baf902'], dictType: 'chineseDiagnoseDict', dictExtraParams: { code: 'B', bz: '1' }, type: 'text', span: 18 },
    { label: '疾病编码', name: 'baf9DO.baf902', disabled: true, type: 'text', span: 6 },

    { label: '门(急)诊断(中医证候)', name: 'baf9DO.baf903name', relationFields: ['dm/baf9DO.baf903'], dictType: 'chineseDiagnoseDict', dictExtraParams: { code: 'Z', bz: '1' }, type: 'text', span: 18 },
    { label: '疾病编码', name: 'baf9DO.baf903', disabled: true, type: 'text', span: 6 },

    { label: '门(急)诊断(西医诊断)', name: 'bazaDO.baza36name', relationFields: ['dm/bazaDO.baza36', 'icd10/bazaDO.bazad9', 'fjm/bazaDO.fjm'], dictExtraParams: { code: 1 }, dictType: 'westernDiagnoseDict', type: 'text', span: 14 },
    { label: '　ICD10', name: 'bazaDO.bazad9', type: 'text', disabled: true, span: 6 },
    { label: '　附码', name: 'bazaDO.fjm', type: 'text', disabled: true, span: 4 },

    { label: '入院时情况', name: 'bazaDO.baza20', type: 'select', staticOptions: options.hospitalized, span: 6 },
    { label: '入院诊断名称', name: 'bazaDO.baza37name', relationFields: ['dm/bazaDO.baza37', 'icd10/bazaDO.baza64'], dictExtraParams: { code: 1 }, dictType: 'westernDiagnoseDict', type: 'text',  span: 6 },
    { label: '入院诊断编码', name: 'bazaDO.baza64', type: 'text',  span: 6, disabled: true },
    { label: '入院后确诊日期', name: 'bazaDO.baza30', type: 'text',  span: 6 },

    { label: '实施临床路径', name: 'bazaDO.bazag1', type: 'select', staticOptions: options.clinicalWay, span: 12 },
    { label: '使用医疗机构中药制剂', name: 'bazaDO.baza70', type: 'select', staticOptions: options.whether, span: 12 },

    { label: '使用中医诊疗设备', name: 'bazaDO.bazag2', type: 'select', staticOptions: options.whether, span: 8 },
    { label: '使用中医诊疗技术', name: 'bazaDO.baza71', type: 'select', staticOptions: options.whether, span: 8 },
    { label: '辨证施护', name: 'bazaDO.bazag3', type: 'select', staticOptions: options.whether, span: 8 },

    // 第二段（54 - 76）

    { label: '损伤、中毒的外部原因', name: 'bazaDO.dmmc', relationFields: ['dm/bazaDO.baza79'], dictExtraParams: { code: 1 }, dictType: 'gb29Dict', dictCanDel: true, type: 'text', span: 18 },
    { label: '疾病编码', disabled: true, name: 'bazaDO.baza79', type: 'text', span: 6 },

    { label: '病理诊断', name: 'bazaDO.pathologicDiagnosisName', specialInput: 'pathologicDiagnosis', type: 'text', span: 8 },
    { label: '疾病编码', disabled: true, name: 'bazaDO.pathologicDiagnosis', type: 'text', span: 8 }, // 这连个名字是假的
    { label: '病理号', disabled: false, name: 'bazaDO.baf202', type: 'text', span: 8 },

    { label: '药物过敏', name: 'bazaDO.baza52', type: 'select', staticOptions: options.DrugAllergy, span: 8, valuesToJumpNext: ['1'],computed: { 'bazaDO.allergicDrugs': computedFunc.allergicDrugs } },
    { label: '过敏药物', name: 'bazaDO.allergicDrugs', type: 'text', span: 8, specialInput: 'allergicDrugs' },
    { label: '死亡患者尸检', name: 'bazaDO.bazace', type: 'select', disabled: true, staticOptions: options.whether, span: 8 },

    { label: '输血反应', name: 'bazaDO.baza57', type: 'select', staticOptions: options.transfusionBlood, span: 3 },
    { label: '输血量：红细胞', name: 'bafcDO.bafc02', type: 'text',  span: 5 , staticAfter: '单位', disabled: true},
    { label: '血小板', name: 'bafcDO.bafc03', type: 'text',   span: 4,  staticAfter: '人份', disabled: true },
    { label: '血浆', name: 'bafcDO.bafc04', type: 'text',   span: 4 , staticAfter: 'ml', disabled: true},
    { label: '全血', name: 'bafcDO.bafc05', type: 'text',   span: 4 , staticAfter: 'ml', disabled: true},
    { label: '自体血回输', name: 'bafcDO.bafc11', type: 'text',   span: 4,  staticAfter: 'ml', disabled: true },

    { label: '血型', name: 'bazaDO.baza45', type: 'select', disabled: false, staticOptions: options.bloodType, span: 4 },
    { label: 'Rh', name: 'bazaDO.bazac5', type: 'select', staticOptions: options.Rh, span: 5 },
    { label: 'HBsAg', name: 'bazaDO.bazac51', type: 'select', staticOptions: options.HBsAg, span: 5 },
    { label: 'HCV-Ab', name: 'bazaDO.bazac52', type: 'select', staticOptions: options.HCVAb, span: 5 },
    { label: 'HIV-Ab', name: 'bazaDO.bazac53', type: 'select', staticOptions: options.HIVAb, span: 5 },

    { label: '科主任', name: 'bazaDO.bazab1name', relationFields: ['dm/bazaDO.bazab1'], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '主任(副主任)医师', name: 'bazaDO.baza32name', relationFields: ['dm/bazaDO.baza32'], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '主治医师', name: 'bazaDO.baza33name', relationFields: ['dm/bazaDO.baza33'], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '住院医师', name: 'bazaDO.baza34name', relationFields: ['dm/bazaDO.baza34'], dictType: 'doctorDict', type: 'text', span: 6 },

    { label: '责任护士', name: 'bazaDO.bazabfname', relationFields: ['dm/bazaDO.bazabf'], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '主进修医师', name: 'bazaDO.bazab2name', relationFields: ['dm/bazaDO.bazab2'], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '实习医师', name: 'bazaDO.bazab4name', relationFields: ['dm/bazaDO.bazab4'], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '编码员', name: 'bazaDO.baza59', relationFields: [], dictType: 'doctorDict', type: 'text', span: 6 },

    { label: '病案质量', name: 'bazaDO.baza51', type: 'select', staticOptions: options.quality, span: 6 },
    { label: '质控医师', name: 'bazaDO.bazab5name', relationFields: ['dm/bazaDO.bazab5'], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '质控护士', name: 'bazaDO.baza69name', relationFields: ['dm/bazaDO.baza69'], dictType: 'doctorDict', type: 'text', span: 6 },
    { label: '质控日期', name: 'bazaDO.bazab6', type: 'date', span: 6 },

    // 第三段（76 - end）

    { label: '是否日间手术', name: 'baf8DO.baf813', type: 'select', staticOptions: options.dayTimeOperation, span: 6  },
    { label: '离院方式', name: 'bazaDO.bazaf8', type: 'select', staticOptions: options.outWay, span: 6, btnAfter: '死亡详情',isBtnAfter: true, computed: { 'bazaDO.bazaf9': computedFunc.leaveAndReceiveName }, valuesToJumpNext: ['1', '4', '5', '6'] },
    { label: '拟接受医疗机构名称', name: 'bazaDO.bazaf9', type: 'text', span: 12 },

    { label: '是否有出院31天内再住院计划', name: 'bazaDO.bazad5', type: 'select', staticOptions: options.whether1,  valuesToJumpNext: ['1'], span: 12 },
    { label: '再住院目的', name: 'bazaDO.bazad6', type: 'text', span: 12, disabled: false },

    { label: '颅脑损伤患者昏迷时间：入院前', name: 'bazaDO.bazad7.days', disabled: true, type: 'text', staticAfter: '天', span: 8 },
    { label: '', name: 'bazaDO.bazad7.hours', type: 'text',disabled: true, staticAfter: '小时', span: 3 },
    { label: '', name: 'bazaDO.bazad7.minutes', type: 'text',disabled: true, staticAfter: '分钟', span: 3 },
    { label: '入院后', name: 'bazaDO.bazad8.days', type: 'text',disabled: true, staticAfter: '天', span: 4 },
    { label: '', name: 'bazaDO.bazad8.hours', type: 'text', disabled: true,staticAfter: '小时', span: 3 },
    { label: '', name: 'bazaDO.bazad8.minutes', type: 'text',disabled: true, staticAfter: '分钟', span: 3 },

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

    { label: '(17)医疗机构中药制剂费', name: 'baf6DO.baf643', type: 'text', span: 8 },
    { label: '(18) 中草药费', name: 'baf6DO.baf621', type: 'text', staticAfter: '）', span: 8 },


    { label: '8.血液和血液制品类: (18) 血费', name: 'baf6DO.baf622', type: 'text', span: 8 },
    { label: '(19) 白蛋白类制品费', name: 'baf6DO.baf623', type: 'text', span: 6 },
    { label: '(20) 球蛋白类制品费', name: 'baf6DO.baf624', type: 'text', span: 10 },

    { label: '(21) 凝血因子类制品费', name: 'baf6DO.baf625', type: 'text', span: 8, offset: 0 },
    { label: '(22) 细胞因子类制品费', name: 'baf6DO.baf626', type: 'text', span: 8 },

    { label: '9.耗材类: (23) 检查用一次性医用材料费', name: 'baf6DO.baf627', type: 'text', span: 9 },
    { label: '(24) 治疗用一次性医用材料费', name: 'baf6DO.baf628', type: 'text', span: 7 },
    { label: '(25) 手术用一次性医用材料费', name: 'baf6DO.baf629', type: 'text', span: 8 },

    { label: '10.其他类: (26) 其他费', name: 'baf6DO.baf630', type: 'text', span: 8 },

    // 119

    // 新增病案附页
    { label: '单病种管理', name: 'bazaDO.bazag7', type: 'select', staticOptions: options.SingleCase, span: 8 },
    { label: '临床路径管理', name: 'bazaDO.bazag4', type: 'select', staticOptions: options.clinic4, span: 8 },
    { label: '诊断符合情况：门诊与出院', name: 'bazaDO.baza43', type: 'select', staticOptions: options.accordance1, span: 8 },
    { label: '入院与出院', name: 'bazaDO.baza44', type: 'select', staticOptions: options.accordance2, span: 4 },
    { label: '术前与术后', name: 'baf4DO.baf406', type: 'select', staticOptions: options.accordance3, span: 4 },
    { label: '临床与病理', name: 'bazaDO.bazac1', type: 'select', staticOptions: options.accordance4, span: 4 },
    { label: '放射与病理', name: 'bazaDO.bazac2', type: 'select', staticOptions: options.accordance5, span: 4 },

    { label: '抢救情况：抢救', name: 'bazaDO.baza46', type: 'text',  span: 8, staticAfter: '次', disabled: false },
    { label: '成功', name: 'bazaDO.baza47', type: 'text',  span: 8, staticAfter: '次',disabled: false },
    { label: '转归情况', name: 'bazaDO.baza41', type: 'select', staticOptions: options.zgqk, span: 8 },

    { label: '实施DRGs管理', name: 'bazaDO.bazag8', type: 'select', staticOptions: options.DrgsManager, span: 6 },
    { label: 'MDT病例', name: 'baf8DO.baf812', type: 'select', staticOptions: options.MDT, span: 6 },
    { label: '法定传染病', name: 'bazaDO.bazaga', type: 'select', staticOptions: options.Infectious, span: 6 },
    { label: '细菌培养标本送检否', name: 'bazaDO.bazag9', type: 'select', staticOptions: options.Bacteria, span: 6 },
    { label: '示教病例', name: 'bazaDO.baza50', type: 'select', staticOptions: options.SJCase, span: 6 },
    { label: '肿瘤分期: T', name: 'zlfqt', type: 'select', staticOptions: options.tumourT, span: 5 },
    { label: 'N', name: 'zlfqn', type: 'select', staticOptions: options.tumourN, span: 5 },
    { label: 'M', name: 'zlfqm', type: 'select', staticOptions: options.tumourM, span: 5 },
    { label: '', name: 'bazaDO.bazagb', type: 'text', staticOptions: options.CityType5, disabled: true, span: 3 },
    { label: '同城互认: 无', name: 'baf8DO.baf814', type: 'select', staticOptions: options.CityType1, span: 5 },
    { label: '影像检查', name: 'baf8DO.baf815', type: 'select', staticOptions: options.CityType2, span: 5 },
    { label: '检验检查', name: 'baf8DO.baf816', type: 'select', staticOptions: options.CityType3, span: 5 },
    { label: '病理检查', name: 'baf8DO.baf817', type: 'select', staticOptions: options.CityType4, span: 5 },
    { label: '其他', name: 'baf8DO.baf818', type: 'select', staticOptions: options.CityType5, span: 4 },

    { label: '单病种诊疗', name: 'baf8DO.baf802', type: 'select', staticOptions: options.Diagnosis, span: 8 },
    { label: '病案类型', name: 'baf8DO.baf809', type: 'select', staticOptions: options.CaseType, span: 8 },


    { label: '完成情况', name: 'baf8DO.baf804', type: 'select', staticOptions: options.clinic2, span: 4 },
    { label: '退出原因', name: 'baf8DO.baf805', type: 'text',  span: 4, disabled: false },
    { label: '变异情况', name: 'baf8DO.baf806', type: 'select', staticOptions: options.clinic3, span: 4 },
    { label: '变异原因', name: 'baf8DO.baf807', type: 'text',  span: 4, disabled: false },
    { label: '实施重症监护', name: 'bazaDO.bazag5', type: 'select', staticOptions: options.tutelage, span: 6,  btnAfter: '重症监护信息', isBtnAfter: true },
    { label: '监护总时间', name: 'bazaDO.bazag6', type: 'text',  span: 4, disabled: true },
    { label: '有创(无创)呼吸机使用时间', name: 'baf8DO.baf808', type: 'text',  span: 6, staticAfter: '小时'},
    { label: '病例分型', name: 'bazaDO.bazad4', type: 'select', staticOptions: options.parting, span: 6 },
    { label: '病例整理', name: 'bazaDO.bazabd', type: 'text', span: 6,  },
    { label: '使用抗生素否', name: 'bazaDO.bazae7', type: 'select', staticOptions: options.antibiotic, span: 4 },
    { label: '传染病史否', name: 'bazaDO.bazae8', type: 'select', staticOptions: options.infection, span: 4 },
    { label: '过敏史否', name: 'bazaDO.bazagd', type: 'select', staticOptions: options.allergy, span: 4 },
    { label: '患者来院区域', name: 'bazaDO.bazac4', type: 'select', staticOptions: options.area, span: 6 },
    { label: '护理天数：特级', name: 'bazaDO.baza66', type: 'number',  span: 6,   },
    { label: '一级', name: 'bazaDO.baza67', type: 'number',  span: 4,  },
    { label: '二级', name: 'bazaDO.baza68', type: 'number',  span: 4,   },
    { label: '三级', name: 'bazaDO.bazae9', type: 'number',  span: 4, staticAfter: '天',  },

];
