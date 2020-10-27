//接口的业务请求名称
import axios from 'axios';
import testData, { list } from "./testData";
import {
	get,
	post,
	put,
	deletes
} from "../utils/http";
import crypto from "@/common/js/crypto.js";
//用户模块
export const loginAdmin = params => {
	//console.log(params);
	return post("/adminLogin/login", params);
}
//用户退出模块   这个退出有点问题
export const logout = params => {
	return get("/adminLogin/logout", params);
}

//---------------病案首页条件查询----------------
//病案首页条件查询接口
export const SearchHomePage = params => {
	return post("/web/baza/getList", params);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(list)
		}, 500)
	})
};

// 根据病案号搜索病人
export const QueryPatient = Baza00 => {
	let nickname = JSON.parse(crypto.decrypt(sessionStorage.getItem("sessionUser"))).adminData.nickname;
	console.log(nickname);
	return post(`/web/baza/getListByBaza00?Baza00=${Baza00}&nickname=${nickname}`);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(testData)
		}, 500)
	})
};

// 添加病案首页
export const AddBaza = params => {
	return post("/web/baza/insertBaza", params);
};

//编辑病案首页
export const EditBaza = params => {
	return post("/web/baza/updateBaza", params);
};

// 批量审核
export const AuditBaza = params => {
	return post("/web/baza/batchAudit", params);
};

////GRGs
//drg出院人数统计柱形图
export const patientOutCount = params => {
	return axios.post("/web/drg/index/outCountChart/" + params, params);
}

//drg医院指标查询
export const drgIndex = params => {
	return axios.post("/web/drg/index/criterion", params);
}

//科室列表查询
export const deptList = params => {
	return axios.post("/web/drg/dataChart/dept", params);
}

//科室drg对比
export const deptCompare = params => {
	return axios.post("/web/drg/dataChart/deptKpiChart/" + params, params)
}

//drg数量按mdc分组
export const mcdDrgCodeList = params => {
	return axios.post("/web/drg/dataChart/mdcDrgList", params)
}

//单个mcd分组drg时间费用消耗
export const mdcDrgAvgDayAndFee = params => {
	return axios.post("/web/drg/dataChart/mdcDrgAvgDayAndFee/" + params, params)
}

//科室时间费用消耗
export const deptFeeTimeIndex = params => {
	return axios.post("/web/drg/dataChart/deptFeeTimeIndex")
}

//科室所有drg数据查询
export const deptTableData = params => {
	return axios.post("/web/drg/dataChart/deptDrgData", params)
}

//医师cmi和drg组数
export const doctorCmiAndDrgCount = params => {
	return axios.post("/web/drg/dataChart/doctorCmiAndGroupCount")
}

//医师时间费用消耗
export const doctorFeeTimeIndex = params => {
	return axios.post("/web/drg/dataChart/doctorTimeAndFeeIndex")
}

//医师所有drg绩效指标
export const doctorKpi = params => {
	return axios.post("/web/drg/dataChart/doctorKpiChart", params)
}

//未入病例查询
export const notInDrg = params => {
	return axios.post("/web/drg/dataChart/NotInDrgCase", params)
}
//患者地区分布
export const queryPlaceMessage = params => {
	return axios.post("/web/drg/index/patientArea/" + params, params);
}

/*********字典维护***********/
//医师查询
export const GetDoctorDictionary = params => {
	return axios.post("/web/systemManagement/GetDoctorDictionary", params);
}
export const UpdategetDoctorDictionary = params => {
	return axios.post("/web/systemManagement/UpdateDoctorDictionary", params);
}
//获取住院科室(不带分页)
export const GetDepartmentDictionary = params => {
	return axios.post("/web/systemManagement/GetDepartmentDictionary", params);
}
//更新住院科室
export const UpdateDepartmentDictionary = params => {
	return axios.post("/web/systemManagement/UpdateDepartmentDictionary", params);
}
//获取门急诊查询
export const GetOutpatientDepartment = params => {
	return axios.post("/web/systemManagement/GetOutpatientDepartment", params);
}

//修改门急诊查询
export const UpdateOutpatientDepartment = params => {
	return axios.post("/web/systemManagement/UpdateOutpatientDepartment", params);
}

//获取门观科查询
export const GetObservationRoom = params => {
	return axios.post("/web/systemManagement/GetObservationRoom", params);
}

//修改门观科
export const UpdateObservationRoom = params => {
	return axios.post("/web/systemManagement/UpdateObservationRoom", params);
}


//获取医技科室查询
export const GetMedicalLaboratory = params => {
	return axios.post("/web/systemManagement/GetMedicalLaboratory", params);
}

//修改医技科室
export const UpdateMedicalLaboratory = params => {
	return axios.post("/web/systemManagement/UpdateMedicalLaboratory", params);
}

//新增医技科室
export const InsertMedicalLaboratory = params => {
	return axios.post("/web/systemManagement/InsertMedicalLaboratory", params);
}

// 删除医技科室

export const DeleteMedicalLaboratory = params => {
	return axios.post("/web/systemManagement/DeleteMedicalLaboratory", params);
}

// 获取医技项目

export const GetMedicalItem = params => {
	return axios.post("/web/systemManagement/GetMedicalProject", params);
}

// 新增医技项目

export const InsertMedicalItem = params => {
	return axios.post("/web/systemManagement/insertData", params);
}

// 删除医技项目

export const deleteMedicalItem = params => {
	return axios.post("/web/systemManagement/deleteMedicalProject", params);
}


// 更新医技项目

export const updateMedicalItem = params => {
	return axios.post("/web/systemManagement/UpdateMedicalProject", params);
}



//获取民族查询
export const GetNationDictionary = params => {
	return axios.post("/web/systemManagement/GetNationDictionary", params);
}

//修改民族代码
export const UpdateNationDictionary = params => {
	return axios.post("/web/systemManagement/UpdateNationDictionary", params);
}

//删除民族代码
export const DeleteNationDictionary = params => {
	return axios.post("/web/systemManagement/DeleteNationDictionary", params);
}
//新增民族代码
export const InsertNationDictionary = params => {
	return axios.post("/web/systemManagement/InsertNationDictionary", params);
}



//修改缺失的部分1---------------------------------
//获取行政区划字典信息
export const GetDistrict = params => {
	return axios.post("/web/systemManagement/GetDistrict", params);
}
//
//修改行政区划字典信息
export const UpdateDistrict = params => {
	return axios.post("/web/systemManagement/UpdateDistrict", params);
}

//删除行政区划字典信息
export const DeleteDistrict = params => {
	return axios.post("/web/systemManagement/DeleteDistrict", params);
}

//新增行政区划字典信息
export const InsertDistrict = params => {
	return axios.post("/web/systemManagement/InsertDistrict", params);
}

//获取中医病、证代码表
export const GetTCM_Disease = params => {
	return axios.post("/web/systemManagement/GetTCM_Disease", params);
}

//修改中医病、证代码字典信息
export const UpdateTCM_Disease = params => {
	return axios.post("/web/systemManagement/UpdateTCM_Disease", params);
}

//删除中医病、证代码字典信息
export const DeleteTCM_Disease = params => {
	return axios.post("/web/systemManagement/DeleteTCM_Disease", params);
}


//新增中医病、证代码字典信息
export const InsertTCM_Disease = params => {
	return axios.post("/web/systemManagement/InsertTCM_Disease", params);
}


//修改诊疗科目代码字典信息
export const UpdateMedicalSubjects = params => {
	return axios.post("/web/systemManagement/UpdateMedicalSubjects", params);
}

//新增诊疗科目代码字典信息
export const InsertMedicalSubjects = params => {
	return axios.post("/web/systemManagement/InsertMedicalSubjects", params);
}
//删除诊疗科目代码字典信息
export const DeleteMedicalSubjects = params => {
	return axios.post("/web/systemManagement/DeleteMedicalSubjects", params);
}
//获取诊疗科目代码字典信息
export const GetMedicalSubjects = params => {
	return axios.post("/web/systemManagement/GetMedicalSubjects", params);
}

//获取过敏药物代码字典信息
export const GetAllergyDrugs = params => {
	return axios.post("/web/systemManagement/GetAllergyDrugs", params);
}

//修改过敏药物代码字典信息
export const UpdateAllergyDrugs = params => {
	return axios.post("/web/systemManagement/UpdateAllergyDrugs", params);
}
//新增过敏药物代码字典信息
export const InsertAllergyDrugs = params => {
	return axios.post("/web/systemManagement/InsertAllergyDrugs", params);
}

//删除过敏药物代码字典信息
export const DeleteAllergyDrugs = params => {
	return axios.post("/web/systemManagement/DeleteAllergyDrugs", params);
}

//获取麻醉方法代码字典信息
export const GetAnesthesia = params => {
	return axios.post("/web/systemManagement/GetAnesthesia", params);
}

//修改麻醉方法代码字典信息
export const UpdateAnesthesia = params => {
	return axios.post("/web/systemManagement/UpdateAnesthesia", params);
}
//删除麻醉方法代码字典信息
export const DeleteAnesthesia = params => {
	return axios.post("/web/systemManagement/DeleteAnesthesia", params);
}
//新增麻醉方法代码字典信息
export const InsertAnesthesia = params => {
	return axios.post("/web/systemManagement/InsertAnesthesia", params);
}

//获取重点医技诊断代码字典信息
export const GetKeyDiagnosis = params => {
	return axios.post("/web/systemManagement/GetKeyDiagnosis", params);
}

//修改重点医技诊断代码字典信息
export const UpdateKeyDiagnosis = params => {
	return axios.post("/web/systemManagement/UpdateKeyDiagnosis", params);
}

//删除重点医技诊断代码字典信息
export const DeleteKeyDiagnosis = params => {
	return axios.post("/web/systemManagement/DeleteKeyDiagnosis", params);
}
//新增重点医技诊断代码字典信息
export const InsertKeyDiagnosis = params => {
	return axios.post("/web/systemManagement/InsertKeyDiagnosis", params);
}

//获取生产胎方位代码字典信息
export const GetFetalPosition = params => {
	return axios.post("/web/systemManagement/GetFetalPosition", params);
}

//修改生产胎方位代码字典信息
export const UpdateFetalPosition = params => {
	return axios.post("/web/systemManagement/UpdateFetalPosition", params);
}

//新增生产胎方位代码字典信息
export const InsertFetalPosition = params => {
	return axios.post("/web/systemManagement/InsertFetalPosition", params);
}

//删除生产胎方位代码字典信息
export const DeleteFetalPosition = params => {
	return axios.post("/web/systemManagement/DeleteFetalPosition", params);
}


//修改上报科室统计归口代码字典信息
export const UpdateDepartmentStatistics = params => {
	return axios.post("/web/systemManagement/UpdateDepartmentStatistics", params);
}


//删除上报科室统计归口代码字典信息
export const DeleteDepartmentStatistics = params => {
	return axios.post("/web/systemManagement/DeleteDepartmentStatistics", params);
}

//获取上报科室统计归口代码字典信息
export const GetDepartmentStatistics = params => {
	return axios.post("/web/systemManagement/GetDepartmentStatistics", params);
}

//新增上报科室统计归口代码字典信息
export const InsertDepartmentStatistics = params => {
	return axios.post("/web/systemManagement/InsertDepartmentStatistics", params);
}

//获取门诊科室统计分类代码字典信息
export const GetOutpatientDepartmentStatistics = params => {
	return axios.post("/web/systemManagement/GetOutpatientDepartmentStatistics", params);
}

//删除门诊科室统计分类代码字典信息
export const DeleteOutpatientDepartmentStatistics = params => {
	return axios.post("/web/systemManagement/DeleteOutpatientDepartmentStatistics", params);
}
//新增门诊科室统计分类代码字典信息
export const InsertOutpatientDepartmentStatistics = params => {
	return axios.post("/web/systemManagement/InsertOutpatientDepartmentStatistics", params);
}

//修改门诊科室统计分类代码字典信息
export const UpdateOutpatientDepartmentStatistics = params => {
	return axios.post("/web/systemManagement/UpdateOutpatientDepartmentStatistics", params);
}

//获取住院科室统计分类代码字典信息
export const GetInpatientDepartmentStatistics = params => {
	return axios.post("/web/systemManagement/GetInpatientDepartmentStatistics", params);
}

//修改住院科室统计分类代码字典信息
export const UpdateInpatientDepartmentStatistics = params => {
	return axios.post("/web/systemManagement/UpdateInpatientDepartmentStatistics", params);
}
//删除住院科室统计分类代码字典信息
export const DeleteInpatientDepartmentStatistics = params => {
	return axios.post("/web/systemManagement/DeleteInpatientDepartmentStatistics", params);
}

//新增住院科室统计分类代码字典信息
export const InsertInpatientDepartmentStatistics = params => {
	return axios.post("/web/systemManagement/InsertInpatientDepartmentStatistics", params);
}

//获取各地街道名称代码字典信息
export const GetStreet = params => {
	return axios.post("/web/systemManagement/GetStreet", params);
}

//修改各地街道名称代码字典信息
export const UpdateStreet = params => {
	return axios.post("/web/systemManagement/UpdateStreet", params);
}

//删除各地街道名称代码字典信息
export const DeleteStreet = params => {
	return axios.post("/web/systemManagement/DeleteStreet", params);
}


//新增各地街道名称代码字典信息
export const InsertStreet = params => {
	return axios.post("/web/systemManagement/InsertStreet", params);
}

// 获取西医诊断

export const GetDiagnosis = params => {
	return axios.post("/web/systemManagement/GetDiagnosis", params);
}


// 修改西医诊断

export const UpdateDiagnosis = params => {
	return axios.post("/web/systemManagement/UpdateDiagnosis", params);
}


// 删除西医诊断

export const DeleteDiagnosis = params => {
	return axios.post("/web/systemManagement/DeleteDiagnosis", params);
}


// 新增西医诊断

export const InsertDiagnosis = params => {
	return axios.post("/web/systemManagement/InsertDiagnosis", params);
}


// 删除手术名称

export const DeleteOperationName = params => {
	return axios.post("/web/systemManagement/DeleteOperationName", params);
}


// 新增手术名称

export const InsertOperationName = params => {
	return axios.post("/web/systemManagement/InsertOperationName", params);
}

// 获取手术名称

export const GetOperationName = params => {
	return axios.post("/web/systemManagement/GetOperationName", params);
}


// 修改手术名称

export const UpdateOperationName = params => {
	return axios.post("/web/systemManagement/UpdateOperationName", params);
}



//获取病区(不带分页)
export const GetInpatientArea = params => {
	return axios.post("/web/systemManagement/GetInpatientArea", params);
}


//新增病区
export const InsertInpatientArea = params => {
	return axios.post("/web/systemManagement/InsertInpatientArea", params);
}


//修改病区
export const UpdateInpatientArea = params => {
	return axios.post("/web/systemManagement/UpdateInpatientArea", params);
}

//删除病区
export const DeleteInpatientArea = params => {
	return axios.post("/web/systemManagement/DeleteInpatientArea", params);
}

//获取医技项目归口
export const GetMedicalProjectFile = params => {
	return axios.post("/web/systemManagement/GetMedicalProjectFile", params);
}

//删除医技项目归口
export const DeleteMedicalProjectFile = params => {
	return axios.post("/web/systemManagement/DeleteMedicalProjectFile", params);
}

//新增医技项目归口
export const InsertMedicalProjectFile = params => {
	return axios.post("/web/systemManagement/InsertMedicalProjectFile", params);
}

//修改医技项目归口
export const UpdateMedicalProjectFile = params => {
	return axios.post("/web/systemManagement/UpdateMedicalProjectFile", params);
}

//获取单位地址
export const GetUnitAddress = params => {
	return axios.post("/web/systemManagement/GetUnitAddress", params);
}

//删除单位地址
export const DeleteUnitAddress = params => {
	return axios.post("/web/systemManagement/DeleteUnitAddress", params);
}

//新增单位地址
export const InsertUnitAddress = params => {
	return axios.post("/web/systemManagement/InsertUnitAddress", params);
}

//修改单位地址
export const UpdateUnitAddress = params => {
	return axios.post("/web/systemManagement/UpdateUnitAddress", params);
}

// 通用字典 拼音/五笔码生成
export const universalGenerate = params => {
	return axios.post("/web/transcode/universalGenerate", params);
}





//********* 字典维护 end ***********/




//医疗业务日报表
export const SelectHospitalStatistics = params => {
	return post('/web/hospitalStatistics/SelectHospitalStatistics', params)
}

//门诊医师工作量
export const outPatientWorkAmount = params => {
	return post('/web/hospitalStatistics/outPatientWorkAmount', params)
}

//医师工作量统计表
export const inpatientWorkload = params => {
	return post('/web/hospitalStatistics/inpatientWorkload', params)
}

//急诊科室工作量统计表
export const emergencyDepartmentWorkload = params => {
	return post('/web/hospitalStatistics/emergencyDepartmentWorkload', params)
}

//观察室分科工作量
export const watchRoomWorkload = params => {
	return post('/web/hospitalStatistics/watchRoomWorkload', params)
}

//手术质量情况统计
export const surgeryQualityStatistics = params => {
	return post('/web/qualityStatisticsController/surgeryQualityStatistics', params)
}

//诊断质量情况统计表
export const diagnosticQualityStatistics = params => {
	return post('/web/qualityStatisticsController/diagnosticQualityStatistics', params)
}

//危重病人抢救及医疗缺陷情况表
export const emergencyPatientDefectStatistics = params => {
	return post('/web/qualityStatisticsController/emergencyPatientDefectStatistics', params)
}

//急症、危重、疑难病人情况统计表
export const emergencyPatientStatistics = params => {
	return post('/web/qualityStatisticsController/emergencyPatientStatistics', params)
}

//部分医疗质量汇总表
export const medicalQualitySummary = params => {
	return post('/web/qualityStatisticsController/medicalQualitySummary', params)
}

//传染科医疗质量信息表
export const contagionDeptMedicalQuality = params => {
	return post('/web/qualityStatisticsController/contagionDeptMedicalQuality', params)
}

//感染监测报表一 分科信息
export const infect1 = params => {
	return post('/web/qualityStatisticsController/infect1', params)
}

//感染监测报表二 按病种统计
export const infect2 = params => {
	return post('/web/qualityStatisticsController/infect2', params)
}

//感染监测报表三 按病种统计
export const infect3 = params => {
	return post('/web/qualityStatisticsController/infect3', params)
}

//中医疾病分类情况
export const diseaseSortStatistics = params => {
	return post('/web/tcmStatistics/diseaseSortStatistics', params)
}

//中医病症诊断分类统计表
export const classification = params => {
	return post('/web/tcmStatistics/classification', params)
}

//中西医病症疾病对照统计
export const tcmWesternContrast = params => {
	return post('/web/tcmStatistics/tcmWesternContrast', params)
}

//中医药治疗及护理情况统计表
export const zyzlhl = params => {
	return post('/web/tcmStatistics/zyzlhl', params)
}

//中医重点专科临床工作统计
export const keySpecialist = params => {
	return post('/web/tcmStatistics/keySpecialist', params)
}

//中医医院质控评分表    
export const zyzk = params => {
	return post('/web/tcmStatistics/zyzk', params)
}

//中医疾病构成分析
export const tcmDiseaseAnalysis = params => {
	return post('/web/tcmStatistics/tcmDiseaseAnalysis', params)
}

//病种类目构成顺位统计表
export const diseaseCategory = params => {
	return post('/web/statisticalAnalysis/diseaseCategory', params)
}

//病种亚目构成顺位统计表
export const diseaseSuborder = params => {
	return post('/web/statisticalAnalysis/diseaseSuborder', params)
}

//病种病名分析表
export const searchDiseaseName = params => {
	return post('/web/statisticalAnalysis/searchDiseaseName', params)
}

//死因构成顺位表
export const deathReason = params => {
	return post('/web/statisticalAnalysis/deathReason', params)
}

//分科病种构成统计表
export const diseaseTypeRegister = params => {
	return post('/web/statisticalAnalysis/diseaseTypeRegister', params)
}

//病种分科统计表
export const selectBranchDiseaseSpecies = params => {
	return post('/web/statisticalAnalysis/selectBranchDiseaseSpecies', params)
}

//病种分科统计表
export const diseaseSpeciesBasicInformation = params => {
	return post('/web/statisticalAnalysis/diseaseSpeciesBasicInformation', params)
}

//门急诊工作量同期对比
export const outpatientWorkCompare = params => {
	//console.log(params)
	return post('/web/statisticalAnalysis/outpatientWorkCompare', params)
}

//医技科室工作量同期对比表
export const searchMedicalSkillsDeptWork = params => {
	return post('web/statisticalAnalysis/searchMedicalSkillsDeptWork', params)
}

//获取时间段选择列表  
export const getDateRangeList = params => {
	return post('/web/systemManagement/getDateRangeList', params)
}

//数据上报-医院工作报表
export const hospitalWork = params => {
	return post('/web/dataReport/hospitalWork', params)
}

//出院病人疾病转归情况
export const patientOutcome = params => {
	return post('/web/dataReport/patientOutcome', params)
}

//出院病人疾病分类年龄别情况
export const classificationAge = params => {
	return post('/web/dataReport/classificationAge', params)
}

//部分病种住院医疗费用
export const hospitalCostsVO = params => {
	return post('/web/dataReport/hospitalCostsVO', params)
}

//14个单病种报表
export const dbz = params => {
	return post('/web/dataReport/dbz', params)
}

//急诊工作逐日登记表
export const emergencyDepartmentRegister = params => {
	return post('/web/hospitalStatistics/emergencyDepartmentRegister', params)
}

//观察室工作逐日登记表
export const watchRoomRegister = params => {
	return post('/web/hospitalStatistics/watchRoomRegister', params)
}

//住院工作逐日登记表
export const inpatientRegister = params => {
	return post('web/hospitalStatistics/inpatientRegister', params)
}

//家床工作逐日登记表

//健康体检逐日登记表
export const serachDepartmentPhysician = params => {
	return post('/web/hospitalStatistics/serachDepartmentPhysician', params)
}

//年度健康检查台账
export const healthyExamination = params => {
	return post('/web/hospitalStatistics/healthyExamination', params)
}

//家庭病床统计台账
export const familyBedLedger = params => {
	return post('/web/hospitalStatistics/familyBedLedger', params)
}

//门诊工作统计台账
export const outpatientLedger = params => {
	return post('/web/hospitalStatistics/outpatientLedger', params)
}

//医技科室工作量台账
export const deptWorkLedger = params => {
	return post('/web/hospitalStatistics/deptWorkLedger', params)
}

//住院工作台账
export const hospitalizeLedger = params => {
	return post('/web/hospitalStatistics/hospitalizeLedger', params)
}

//临床科室指标完成情况
export const clinicalDepartmentIndexComplete = params => {
	return post('/web/hospitalStatistics/clinicalDepartmentIndexComplete', params)
}

//住院病人费用统计表
export const patientCostStatistics = params => {
	return post('/web/hospitalStatistics/patientCostStatistics', params)
}

//病房工作辅助表
export const wardWorkAuxiliary = params => {
	return post('/web/hospitalStatistics/wardWorkAuxiliary', params)
}

//分科登记一览表
export const branchRegistration = params => {
	return post('/web/medicalRecordsManagement/branchRegistration', params)
}

//分科疾病分析登记
export const diseaseAnalysis = params => {
	return post('/web/medicalRecordsManagement/diseaseAnalysis', params)
}

//分科手术登记一览表
export const SurgicalRecords = params => {
	return post('/web/medicalRecordsManagement/SurgicalRecords', params)
}

//死亡登记表
export const deadPatientRegister = params => {
	return post('/web/medicalRecordsManagement/deadPatientRegister', params)
}

//产科登记表
export const obstetrics = params => {
	return post('/web/medicalRecordsManagement/obstetrics', params)
}

//随诊登记表
export const followDiagnosis = params => {
	return post('/web/medicalRecordsManagement/followDiagnosis', params)
}

//疾病主索引
export const primaryIndex = params => {
	return post('/web/medicalRecordsManagement/primaryIndex', params)
}

//疾病次索引
export const secondaryIndex = params => {
	return post('/web/medicalRecordsManagement/secondaryIndex', params)
}

//手术索引
export const operationIndex = params => {
	return post('/web/medicalRecordsManagement/operationIndex', params)
}

//并发症索引
export const complicationIndex = params => {
	return post('/web/medicalRecordsManagement/complicationIndex', params)
}

//死亡病人索引
export const deathIndex = params => {
	return post('/web/medicalRecordsManagement/deathIndex', params)
}

//病人姓名索引
export const surnameIndex = params => {
	return post('/web/medicalRecordsManagement/surnameIndex', params)
}
//病人姓名列表索引
export const groupBySurname = params => {
	return post('/web/medicalRecordsManagement/groupBySurname', params)
}

//肿瘤索引
export const tumourIndex = params => {
	return post('/web/medicalRecordsManagement/tumourIndex', params)
}

//出院病人分科统计表
export const deptOutStatis = params => {
	return post('/web/medicalRecordsManagement/deptOutStatis', params)
}

//数据上报-上报数据-审核结果汇总
export const selectResultSum = params => {
	return post('/web/dataReport/selectResultSum', params)
}

//生成中医上报DBF文件  
export const zyShangbao = params => {
	return post('/web/wtShangBao/zyShangbao', params)
}

//中医上报绩效考核文件 
export const generateReportCsv = params => {
	return post('/web/zysb/generateReportCsv', params)
}

//4-1
export const xyShangbao = params => {
	return post('/web/wtShangBao/xyShangbao', params)
}

//确认中医上报csv文件生成完成
export const generateCsv = params => {
	return post('/web/zysb/generateCsv', params)
}

//判断费用
export const cost = params => {
	return post('/web/judgment/cost', params)
}

//判断主诊断
export const icd = params => {
	return post('/web/judgment/icd', params)
}

//判断手术编码
export const iccm = params => {
	return post('/web/judgment/iccm', params)
}

//获取门诊工作日志登记
export const getTjm2List = params => {
	return post('/web/workLogEditing/GetTjm2List', params)
}

//保存门诊工作日志
export const updateTjm2Batch = params => {
	return post('/web/workLogEditing/updateTjm2Batch', params)
}

//获取门诊医师工作量日志
export const getTjm1List = params => {
	return post('/web/workLogEditing/GetTjm1List', params)
}

//保存修改门诊医师工作量日志
export const updateTjm1Batch = params => {
	return post('/web/workLogEditing/updateTjm1Batch', params)
}

//获取住院工作日志
export const getTjz1List = params => {
	return post('/web/workLogEditing/GetTjz1List', params)
}

//保存住院工作日志
export const updateTjz1Batch = params => {
	return post('/web/workLogEditing/updateTjz1Batch', params)
}

//查询出院情况
export const outPatientInfo = params => {
	return post('/web/workLogEditing/outPatientInfo', params)
}

//获取急诊工作日志
export const getTjm3List = params => {
	return post('/web/workLogEditing/GetTjm3List', params)
}

//保存急诊工作日志
export const saveData = params => {
	return post('/web/workLogEditing/saveData', params)
}

//获取观察室日志
export const getListByTjm4rq = params => {
	return post('/web/workLogEditing/getListByTjm4rq', params)
}

//更新观察室日志
export const updateTjm4Batch = params => {
	return post('/web/workLogEditing/updateTjm4Batch', params)
}

//获取医技工作日志
export const getTjjcList = params => {
	return post('/web/workLogEditing/getTjjcList', params)
}

//保存修改医技工作日志
export const updateTjjcBatch = params => {
	return post('/web/workLogEditing/updateTjjcBatch', params)
}

//获取家庭病床工作日志
export const getTjm5List = params => {
	return post('/web/workLogEditing/GetTjm5List', params)
}

//保存家庭病床工作日志
export const tjm5Save = params => {
	return post('/web/workLogEditing/tjm5Save', params)
}

//获取诊，急诊，观察室工作日志
export const selectTjm234 = params => {
	return post('/web/workLogEditing/selectTjm234', params)
}

//保存门诊，急诊，观察室工作日志
export const saveTjm234 = params => {
	return post('/web/workLogEditing/saveTjm234', params)
}

//获取健康检查日志
export const getByTjm6rq = params => {
	return post('/web/workLogEditing/getByTjm6rq', params)
}

//更新健康检查日志
export const updateByTjm6rq = params => {
	return post('/web/workLogEditing/updateByTjm6rq', params)
}

//刷新当日信息
export const flushData = params => {
	return post('/web/workLogEditing/flushData', params)
}

//数据上报返回到首页的列表
export const getHomeList = params => {
	return post('/web/baza/getHomeList', params)
}

//删除病案接口
export const deleteBaza = params => {
	return post('/web/baza/deleteBaza', params)
}

//删除日志接口
export const deleteLog = params => {
	return post('/web/baza/deleteLog', params)
}

//  获取单位信息选项
export const getUnit = params => {
	return post('/web/unitMessage/getUnit', params)
}

//修改单位信息选项
export const update = params => {
	return post('/web/unitMessage/update', params)
}

//修改病案号——查看当前病人列表接口
export const getPatient = params => {
	return get("/web/baza/getPatient/" + params);
}

//修改病案号
export const modifyBaza = params => {
	return post('/web/baza/modifyBaza00', params)
}

//删除门观科室字典信息接口
export const deleteObservationRoom = params => {
	return post('/web/systemManagement/DeleteObservationRoom', params)
}

//删除医师字典信息接口
export const deleteDoctorDictionary = params => {
	return post('/web/systemManagement/DeleteDoctorDictionary', params)
}

//删除住院科室字典信息接口
export const deleteDepartmentDictionary = params => {
	return post('/web/systemManagement/DeleteDepartmentDictionary', params)
}

//删除门急诊字典信息接口
export const deleteOutpatientDepartment = params => {
	return post('/web/systemManagement/DeleteOutpatientDepartment', params)
}

// 院内统计 综合统计报表

//  住院工作分科统计表
export const hoBrStatistics = params => {
	return post('/web/hospitalStatistics/hoBrStatistics', params)
}


//  住院工作分科统计表
export const compared = params => {
	return post('/web/hospitalStatistics/compared', params)
}

//  门诊工作分科统计表
export const zspTjm7 = params => {
	return post('/web/outpatientWork/zspTjm7', params)
}

//  门诊综合统计分科同期对比表
export const zspTjm7Db = params => {
	return post('/web/outpatientWork/zspTjm7Db', params)
}

//  住院工作统计
export const searchHospitalInpatientWork = params => {
	return post('/web/hospitalStatistics/searchHospitalInpatientWork', params)
}

// end 院内统计 综合统计报表

//  接收网络病案
export const receive = params => {
	return post('/web/baza/receive', params)
}