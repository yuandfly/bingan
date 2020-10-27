// 所有的select的选项数据
export default {
    // 是否
    whether: [
        {label: '是', value: '1'},
        {label: '否', value: '2'}
    ],

    whether1: [
        {label: '无', value: '1'},
        {label: '有', value: '2'}
    ],
    // 付费方式
    payType: [
        {label: '城镇职工基本医疗保险', value: '1'},
        {label: '城镇居民基本医疗保险', value: '2'},
        {label: '新型农村合作医疗', value: '3'},
        {label: '贫困救治', value: '4'},
        {label: '商业医疗保险', value: '5'},
        {label: '全公费', value: '6'},
        {label: '全自费', value: '7'},
        {label: '其他社会保险', value: '8'},
        {label: '其他', value: '9'},
    ],
    // APGAR
    APGAR: [
        {label: '0', value: '0'},
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'}
    ],

    // 性别
    sex: [
        {label: '男', value: '1'},
        {label: '女', value: '2'},
        {label: '未知', value: '3'}
    ],
    // 婚姻
    marry: [
        {label: '未婚', value: '1'},
        {label: '已婚', value: '2'},
        {label: '丧偶', value: '3'},
        {label: '离婚', value: '4'},
        {label: '其他', value: '9'},
    ],

    // 身份类型
    cardType: [

        {label: '居民身份证', value: '1'},
        {label: '中国人民解放军军人身份证件', value: '2'},
        {label: '中国人民武装警察身份证件', value: '3'},
        {label: '港澳居民来往内地通行证', value: '4'},
        {label: '台湾居民来往大陆通行证', value: '5'},
        {label: '护照', value: '6'},
        {label: '其它', value: '9'}
    ],

    // 身份证明不详的具体原因
    cardOther: [
        {label: '三无人员', value: '0'},
        {label: '新生儿', value: '1'},
        {label: '无完全民事行为能力', value: '2'},
        {label: '意识障碍', value: '4'},
        {label: '其他', value: '9'},
    ],
    // 关系
    relation: [
        {label: '本人', value: '0'},
        {label: '配偶', value: '1'},
        {label: '子', value: '2'},
        {label: '女', value: '3'},
        {label: '孙子女', value: '4'},
        {label: '父母', value: '5'},
        {label: '祖父母', value: '6'},
        {label: '兄弟姐妹', value: '7'},
        {label: '同事同学', value: '8'},
        {label: '其他', value: '9'},
    ],
    // 入院途径
    enterWay: [
        {label: '急诊', value: '1'},
        {label: '门诊', value: '2'},
        {label: '其他医疗机构转入', value: '3'},
        {label: '其他', value: '4'},
    ],
    // 治疗类别
    treatmentType: [
        {label: '中医', value: '1.1'},
        {label: '民族医', value: '1.2'},
        {label: '中西医', value: '2'},
        {label: '西医', value: '3'},
    ],
    // 实施临床路径
    clinicalWay: [
        {label: '中医', value: '1'},
        {label: '西医', value: '2'},
        {label: '否', value: '3'},
    ],

    // 入院情况
    hospitalized: [
        {label: '危', value: '1'},
        {label: '急', value: '2'},
        {label: '一般', value: '3'},
    ],
    // 药物过敏
    DrugAllergy: [
        {label: '无', value: '1'},
        {label: '有', value: '2'},
    ],
    // 血型
    bloodType: [
        {label: '未知', value: '0'},
        {label: 'A', value: '1'},
        {label: 'B', value: '2'},
        {label: 'O', value: '3'},
        {label: 'AB', value: '4'},
        {label: '不详', value: '5'},
        {label: '未查', value: '6'},
    ],
    // 输血反应
    transfusionBlood: [
        {label: '未输', value: '0'},
        {label: '有', value: '1'},
        {label: '无', value: '2'}
    ],
    // Rh
    Rh: [
        {label: '阴', value: '1'},
        {label: '阳', value: '2'},
        {label: '不详', value: '3'},
        {label: '未查', value: '4'},
    ],

    // HBsAg
    HBsAg: [
        {label: '未做', value: '0'},
        {label: '阴', value: '1'},
        {label: '阳', value: '2'},
    ],
    // HCVAb
    HCVAb: [
        {label: '未做', value: '0'},
        {label: '阴', value: '1'},
        {label: '阳', value: '2'},
    ],
    // HIV-Ab
    HIVAb: [
        {label: '未做', value: '0'},
        {label: '阴', value: '1'},
        {label: '阳', value: '2'},
    ],
    // 病案质量
    quality: [
        {label: '甲', value: '1'},
        {label: '乙', value: '2'},
        {label: '丙', value: '3'},
    ],
    // 离院方式
    outWay: [

        {label: '医嘱离院', value: '1'},
        {label: '医嘱转院', value: '2'},
        {label: '医嘱转社区卫生服务机构/乡镇卫生院', value: '3'},
        {label: '非医嘱离院', value: '4'},
        {label: '死亡', value: '5'},
        {label: '其他', value: '9'},
    ],
    // 日间手术病例
    dayTimeOperation: [
        {label: '否', value: '0'},
        {label: '是', value: '1'}
    ],

    // 病案附页 单病例管理否
    SingleCase: [
        {label: '是', value: '1'},
        {label: '否', value: '2'}
    ],
    // 病案附页 drgs管理
    DrgsManager: [
        {label: '无', value: '1'},
        {label: '按病种', value: '2'},
        {label: '按费用', value: '3'},
        {label: '两者都有', value: '4'},
    ],
    // 病案附页 MDT病例
    MDT: [
        {label: '是', value: '1'},
        {label: '否', value: '2'}
    ],
    // 病案附页 法定传染病
    Infectious: [
        {label: '甲类', value: '1'},
        {label: '乙类', value: '2'},
        {label: '丙类', value: '3'},
        {label: '未定', value: '4'},
    ],
    // 病案附页 细菌培养标准
    Bacteria: [
        {label: '是', value: '1'},
        {label: '否', value: '2'}
    ],
    // 病案附页 示教病例
    SJCase: [
        {label: '是', value: '1'},
        {label: '否', value: '2'}
    ],
    // 病案附页 肿瘤分期
    tumour: [
        {label: 'T', value: '1'},
        {label: 'N', value: '2'},
        {label: 'M', value: '3'},
    ],
    tumourT: [
        {label: '0期', value: '1'},
        {label: 'I期', value: '2'},
        {label: 'II期', value: '3'},
        {label: 'III期', value: '4'},
        {label: 'IV期', value: '5'},
        {label: '不详', value: '6'},
    ],
    tumourM: [
        {label: '0期', value: '1'},
        {label: 'I期', value: '2'},
        {label: 'II期', value: '3'},
        {label: 'III期', value: '4'},
        {label: 'IV期', value: '5'},
        {label: '不详', value: '6'},
    ],
    tumourN: [
        {label: '0期', value: '1'},
        {label: 'I期', value: '2'},
        {label: 'II期', value: '3'},
        {label: 'III期', value: '4'},
        {label: 'IV期', value: '5'},
        {label: '不详', value: '6'},
    ],
    // 病案附页 同城互认
    City: [
        {label: '无', value: '1'},
        {label: '影像检查', value: '2'},
        {label: '检验检查', value: '3'},
        {label: '病理检查', value: '4'},
        {label: '其他', value: '9'},
    ],
    CityType1: [
        {label: '是', value: '1'},
        {label: '否', value: '2'}
    ],
    CityType2: [
        {label: '是', value: '1'},
        {label: '否', value: '2'}
    ],
    CityType3: [
        {label: '是', value: '1'},
        {label: '否', value: '2'}
    ],
    CityType4: [
        {label: '是', value: '1'},
        {label: '否', value: '2'}
    ],
    CityType5: [
        {label: '是', value: '1'},
        {label: '否', value: '2'}
    ],

    // 病案附页 单病种诊疗
    Diagnosis: [
        {label: '是', value: '1'},
        {label: '否', value: '2'}
    ],

    // 病案附页 病案类型
    CaseType: [
        {label: '西医病案', value: '1'},
        {label: '中医病案', value: '2'}
    ],

    // 病案附页 临床路径
    clinic1: [
        {label: '是', value: '1'},
        {label: '否', value: '2'}
    ],
    clinic2: [
        {label: '完成', value: '1'},
        {label: '退出', value: '2'}
    ],
    clinic3: [
        {label: '无', value: '1'},
        {label: '有', value: '2'}
    ],
    clinic4: [
        {label: '完成', value: '1'},
        {label: '变异', value: '2'},
        {label: '退出', value: '3'},
        {label: '未入', value: '4'},
    ],
    accordance1: [
        {label: '未做', value: '0'},
        {label: '符合', value: '1'},
        {label: '不符合', value: '2'},
        {label: '不确定', value: '3'},
    ],
    accordance2: [
        {label: '未做', value: '0'},
        {label: '符合', value: '1'},
        {label: '不符合', value: '2'},
        {label: '不确定', value: '3'},
    ],
    accordance3: [
        {label: '未做', value: '0'},
        {label: '符合', value: '1'},
        {label: '不符合', value: '2'},
        {label: '不确定', value: '3'},
    ],
    accordance4: [
        {label: '未做', value: '0'},
        {label: '符合', value: '1'},
        {label: '不符合', value: '2'},
        {label: '不确定', value: '3'},
    ],
    accordance5: [
        {label: '未做', value: '0'},
        {label: '符合', value: '1'},
        {label: '不符合', value: '2'},
        {label: '不确定', value: '3'},
    ],
    zgqk: [
        {label: '治愈', value: '1'},
        {label: '好转', value: '2'},
        {label: '未愈', value: '3'},
        {label: '死亡', value: '4'},
        {label: '其它', value: '5'},
    ],
    tutelage: [
        {label: '无', value: '1'},
        {label: '有', value: '2'}
    ],
    parting: [

        {label: 'A', value: '1'},
        {label: 'B', value: '2'},
        {label: 'C', value: '3'},
        {label: 'D', value: '4'}
    ],
    antibiotic: [
        {label: '是', value: '1'},
        {label: '否', value: '2'},
        {label: '不肯定', value: '3'}
    ],
    infection: [
        {label: '是', value: '1'},
        {label: '否', value: '2'},
        {label: '不肯定', value: '3'}
    ],
    allergy: [
        {label: '是', value: '1'},
        {label: '否', value: '2'},
        {label: '不肯定', value: '3'}
    ],
    area: [
    {label: '市区内', value: '1'},
    {label: '本市', value: '2'},
    {label: '本省', value: '3'},
    {label: '外省', value: '4'},
    {label: '国外', value: '5'},
    ]
}
