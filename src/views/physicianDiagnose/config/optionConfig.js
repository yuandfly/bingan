// 所有的select的选项数据
export default {
    // 是否
    whether: [
        {label: '是', value: '1'},
        {label: '否', value: '2'}
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
        {label: '1.1 中医', value: '1.1'},
        {label: '1.2 民族医', value: '1.2'},
        {label: '2. 中西医', value: '2'},
        {label: '3. 西医', value: '3'},
    ],
    // 实施临床路径
    clinicalWay: [
        {label: '中医', value: '1'},
        {label: '西医', value: '2'},
        {label: '否', value: '3'},
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
    // Rh
    Rh: [
        {label: '阴', value: '1'},
        {label: '阳', value: '2'},
        {label: '不详', value: '3'},
        {label: '未查', value: '4'},
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
        {label: '医嘱转院，拟接收医疗机构名称', value: '2'},
        {label: '医嘱转社区卫生服务机构/乡镇卫生院，拟接收医疗机构名称：', value: '3'},
        {label: '非医嘱离院', value: '4'},
        {label: '死亡', value: '5'},
        {label: '其他', value: '6'},
    ]
}
