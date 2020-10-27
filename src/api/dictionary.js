import {
    get,
    post,
    put,
    deletes
} from "../utils/http";
import axios from 'axios';

// 获取麻醉方法代码字典信息接口
export const GetAnesthesiaDict = params => {
    return post("/web/systemManagement/GetAnesthesia", params);
};

// 获取西医诊断名称代码字典信息接口 （疾病编码）
export const GetWesternDiagnoseDict = params => {
    return post("/web/systemManagement/GetDiagnosis", params);
};

// 获取中医诊断名称代码字典信息接口 （疾病编码）
export const GetChineseDiagnoseDict = params => {
    return post("/web/systemManagement/getDiseaseList", params);
};

//获取中医病、证代码表
export const GetTCM_Disease = params => {
    return post("/web/systemManagement/GetTCM_Disease", params);
}

// 获取手术名称代码字典信息接口
export const GetOperationDict = params => {
    return post("/web/systemManagement/GetOperationName", params);
};

// 国籍
export const GetNationality = params => {
    return post("/web/systemManagement/GetNationality", params)
};

// 民族
export const GetNation = params => {
    return post("/web/systemManagement/GetNationDictionary", params)
};

// 职业
export const GetOccupation = params => {
    return post("/web/systemManagement/GetOccupation", params)
};

// 行政规划
export const GetDistrictDict = params => {
    return post("web/systemManagement/GetDistrict", params)
};

// 科别 住院科室
export const GetDepartment = params => {
    return post('/web/systemManagement/GetDepartmentDictionary', params)
};

//查询科室列表  gb25 住院科室
export const outpatientDeptSelect = param => {
    return post("/web/systemManagement/GetOutpatientDepartment", param)
}


//获取医技科室查询
export const GetMedicalLaboratory = params => {
    return post("/web/systemManagement/GetMedicalLaboratory", params);
}


//获取门观科查询
export const GetObservationRoom = params => {
    return post("/web/systemManagement/GetObservationRoom", params);
}

// 医师
export const GetDoctor = params => {
    return post('/web/systemManagement/GetDoctorDictionary', params)
};

// 随机查询条件项
export const GetConditionDict = params => {
    return post('/web/randomQuery/itemSelect', params)
};

// 随机查询条件值
export const GetConditionValueDict = params => {
    return post('/web/randomQuery/valueSelect', params)
};

// 损伤、中毒的外部原因， 特殊检查、治疗项目代码表接口
export const GetGb29ListDict = params => {
    return post('/web/systemManagement/getGb29List', params)
};

// 病理诊断
export const GetGb48ListDict = params => {
    return post('/web/systemManagement/getGb48List', params)
};


// 住院病区、病室
export const GetInpatientArea = params => {
    return post('/web/systemManagement/GetInpatientArea', params)
};

// 过敏药物
export const GetAllergicDrugs = params => {
    return post('/web/systemManagement/GetAllergyDrugs', params)
};

// 过敏源
export const GetAllergen = params => {
    return post('/web/systemManagement/getGb64List', params)
};

// 医技诊断标志
export const GetUpdateKeyDiagnosis = params => {
    return post('/web/systemManagement/GetKeyDiagnosis', params)
};


// 门诊、住院月报 时间范围
export const GetDateRangeList = params => {
    return post('/web/systemManagement/getDateRangeList', params)
}

// 获取经济类型字典
export const getGb51List = params => {
    return post('/web/systemManagement/getGb51List', params)
}

//获取卫生机构类别字典
export const getGb50List = params => {
    return post('/web/systemManagement/getGb50List', params)
}

//增加医师字典信息
export const insetDoctorDictionary = params => {
    return post('/web/systemManagement/InsetDoctorDictionary', params)
}

//新增住院科室字典信息接口
export const insertDepartmentDictionary = params => {
    return post('/web/systemManagement/InsertDepartmentDictionary', params)
}

//获取科目(不带分页)
export const GetMedicalSubjects = params => {
    return post("/web/systemManagement/GetMedicalSubjects", params);
}

//获取统计归口(不带分页)
export const GetDepartmentStatistics = params => {
    return post("/web/systemManagement/GetDepartmentStatistics", params);
}

//获取统计归口(不带分页)
export const insertOutpatientDepartment = params => {
    return post("/web/systemManagement/InsertOutpatientDepartment", params);
}

//新增门观科室字典信息接口
export const insertObservationRoom = params => {
    return post("/web/systemManagement/InsertObservationRoom", params);
}

//获取医技项目归口代码
export const GetMedicalProjectFile = params => {
    return post("/web/systemManagement/GetMedicalProjectFile", params);
}

