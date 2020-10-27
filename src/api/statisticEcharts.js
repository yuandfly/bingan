import axios from 'axios';
import {
    get,
    post,
    put,
    deletes
} from "../utils/http";
/**统计图表*/




// 查询统计项目下拉选
export const staticSelect = param => {
    return axios.post("/web/systemManagement/getStatisticItem",param);
}

//查询时间段下拉选
export const dateRangeSelect = param => {
	return axios.post("/web/systemManagement/getDateRangeList",param)
}

//查询图表数据--全员科室单项统计
export const queryStatisticData = param =>{
	return axios.post("/web/statisticalAnalysis/statisticChart",param);
}

//查询科室列表  gb25 住院科室
export const hospitalizationDeptSelect = param => {
	return axios.post("/web/systemManagement/GetDepartmentDictionary",param)
}

//查询科室列表  gb22 门急诊科室
export const outpatientDeptSelect = param => {
	return axios.post("/web/systemManagement/GetOutpatientDepartment",param)
}

//查询图表数据--科室单项全年数据查询
export const queryYearDataByDept = param =>{
	return axios.post("/web/statisticalAnalysis/statisticChart2",param);
}

//查询图表数据--全员科室单项统计(饼图)
export const queryStatisticWithPie = param =>{
	return axios.post("/web/statisticalAnalysis/statisticChart3",param);
}