
const options = {
    // 付费方式
    payType: [
        { label: '城镇职工基本医疗保险', value: '1' },
        { label: '城镇居民基本医疗保险', value: '2' },
        { label: '新型农村合作医疗', value: '3' },
        { label: '贫困救治', value: '4' },
        { label: '商业医疗保险', value: '5' },
        { label: '全公费', value: '6' },
        { label: '全自费', value: '7' },
        { label: '其他社会保险', value: '8' },
        { label: '其他', value: '9' },
    ],

    // 年龄单位
    ageUnit: [
        { label: '岁', value: 'Y' },
        { label: '月', value: 'M' },
        { label: '日', value: 'D' },
    ],

    gender: [
        { label: '男', value: '1' },
        { label: '女', value: '2' },
        { label: '未知', value: '3' }
    ],

    turnReturn: [
        { label: '治愈', value: '1' }, { label: '好转', value: '2' },
        { label: '未愈', value: '3' }, { label: '死亡', value: '4' },
        { label: '其他', value: '5' }, { label: '其他', value: '9' },
    ],

    // 离院方式
    outWay: [
        { label: '医嘱离院', value: '1' },
        { label: '医嘱转院', value: '2' },
        { label: '医嘱转社区卫生服务机构/乡镇卫生院：', value: '3' },
        { label: '非医嘱离院', value: '4' },
        { label: '死亡', value: '5' },
        { label: '其他', value: '6' },
    ],

    operationLevel: [
        { label: '一级', value: '1' }, { label: '二级', value: '2' },
        { label: '三级', value: '3' }, { label: '四级', value: '4' },
    ]
};

export default {

    // 基础
    baseInfo: {
        header: '基础信息',
        span: 24,
        fields: [
            { label: '姓　　名', name: 'baza02', type: 'input', span: 8 },
            { label: '归 档 号', name: 'baza80', type: 'input', span: 16, range: ['baza80Begin', 'baza80End'], seperate: '~' },

            { label: '病 案 号', name: 'baza01', type: 'input', span: 8 },
            { label: '付款方式', name: 'baza82', type: 'select', options: options.payType, span: 16 },

            { label: '住院次数', name: 'inNum', type: 'input', span: 6 },
            { label: '录 入 员', name: 'baza59', type: 'input', span: 6 },
            { label: '录入日期', name: 'baza60', type: 'date', span: 12, range: ['baza60Begin', 'baza60End'], seperate: '到' },

            { label: '年　　龄', name: 'baza06', type: 'input', span: 12, range: ['baza06Begin', 'baza06End'], seperate: '到', unit: ['bazaa1Begin', 'bazaa1End'], unitOptions: options.ageUnit },
            { label: '入院日期', name: 'baza24', type: 'date', span: 12, range: ['baza24Begin', 'baza24End'], seperate: '到' },

            { label: '性　　别', name: 'baza03', type: 'select', options: options.gender, span: 12 },
            { label: '出院日期', name: 'baza27', type: 'date', span: 12, range: ['baza27Begin', 'baza27End'], seperate: '到' },

            { label: '出生日期', name: 'baza04', type: 'date', span: 12, range: ['baza04Begin', 'baza04End'], seperate: '到' }
        ]
    },

    // 诊断
    diagnoseInfo: {
        header: '诊断信息',
        span: 16,
        fields: [

            { label: '出院诊断编码', name: 'baza65', type: 'input', span: 24, range: ['baza65Begin', 'baza65End'], seperate: '~' },

            // { label: '诊断名称', name: 'baza38', type: 'input', span: 12, dictType: 'westernDiagnoseDict' },
            // { label: '诊断名称', name: 'baza38-name', type: 'input', span: 12, dictField: 'baza38', dictType: 'westernDiagnoseDict' },
            { label: '诊断名称', name: 'baza38Name', type: 'input', span: 12, dictField: 'baza38', dictType: 'westernDiagnoseDict' },
            { label: '主 转 归', name: 'baza41', type: 'select', options: options.turnReturn, span: 12 },

            // { label: '次 诊 断', name: 'baf103', type: 'input', span: 24, dictType: 'westernDiagnoseDict' },
            // { label: '次 诊 断', name: 'baf103-name', type: 'input', span: 24, dictField: 'baf103', dictType: 'westernDiagnoseDict' },
            { label: '次 诊 断', name: 'baf103Name', type: 'input', span: 24, dictField: 'baf103', dictType: 'westernDiagnoseDict' },
            { label: '次诊断编码', name: 'baf104', type: 'input', span: 24, range: ['baf104Begin', 'baf104End'], seperate: '~' },
        ]
    },

    // 科室
    departmentInfo: {
        header: '科室信息',
        span: 8,
        heightRows: 4,
        fields: [

            // { label: '入院科室', name: 'baza21-name', type: 'input', span: 24, dictType: 'departmentDict', dictExtraParams: { bz: '0' }, dictField: 'baza21' },
            { label: '入院科室', name: 'baza21Name', type: 'input', span: 24, dictType: 'departmentDict', dictExtraParams: { bz: '0' }, dictField: 'baza21' },

            // { label: '出院科室', name: 'baza23-name', type: 'input', span: 24, dictType: 'departmentDict', dictExtraParams: { bz: '0' }, dictField: 'baza23' },
            { label: '出院科室', name: 'baza23Name', type: 'input', span: 24, dictType: 'departmentDict', dictExtraParams: { bz: '0' }, dictField: 'baza23' },

            { label: '离院方式', name: 'bazaf8', type: 'select', options: options.outWay, span: 24 },
        ]
    },

    // 手术
    operationInfo: {
        header: '手术信息',
        heightRows: 4,
        span: 16,
        fields: [

            { label: '只检索有手术', name: 'baza53', type: 'check', span: 6 },
            // { label: '麻醉方式', name: 'baf410-name', type: 'input', span: 18, dictField: 'baf410', dictType: 'anesthesiaDict' },
            { label: '麻醉方式', name: 'baf410Name', type: 'input', span: 18, dictField: 'baf410', dictType: 'anesthesiaDict' },

            // { label: '手术名称', name: 'baf408-name', type: 'input', span: 24, dictField: 'baf408', dictType: 'operationDict' },
            { label: '手术名称', name: 'baf408Name', type: 'input', span: 24, dictField: 'baf408', dictType: 'operationDict' },

            { label: '手术编码', name: 'baf405', type: 'input', span: 12 },
            { label: '手术级别', name: 'baf404', type: 'select', options: options.operationLevel, span: 12 },
        ]
    },

    // 大夫
    doctorInfo: {
        header: '大夫信息',
        span: 8,
        fields: [

            { label: '主治医师', name: 'baza33', type: 'input', span: 24, dictType: 'doctorDict' },

            { label: '住院医师', name: 'baza34', type: 'input', span: 24, dictType: 'doctorDict' },

            { label: '手术医师', name: 'baf409', type: 'input', span: 24, dictType: 'doctorDict' },

            { label: '门诊医师', name: 'baza35', type: 'input', span: 24, dictType: 'doctorDict' },
        ]
    },

    // 费用
    costInfo: {
        header: '费用信息',
        span: 24,
        fields: [
            { label: '总费用', name: 'baf601', type: 'input', span: 18, range: ['baf601Begin', 'baf601End'], seperate: '~' },
            { label: '中医治疗', name: 'baf617', type: 'check', span: 3 },
            { label: '有输血', name: 'baza57', type: 'check', span: 3 },
        ]
    }
}
