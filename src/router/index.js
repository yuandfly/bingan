import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Layout from "../views/layout/Layout.vue";
import Login from "../views/login/Login.vue";
import HomePage from "../views/homepage/index.vue";
import Information from "../views/information/Information.vue";
import GroupSearch from "../views/groupSearch/index.vue";
import RandomSearch from "../views/randomSearch/index.vue";
import HomeVerify from "../views/verify/homeVerify.vue";
import LogVerify from "../views/verify/logVerify.vue";
import Receive from "../views/receive/receive";
import InpatientWorkload from "../views/statistics/inpatientWorkload.vue";
import ReceiveManager from "../views/receiveManager/index.vue"; // 病案签收管理
import BorrowManager from "../views/borrowManager/index.vue";
import StatisticEcharts from "../views/StatisticEcharts/index.vue"; //统计图表
import HospitalizedMonthReport from '../views/monthReport/hospitalized/index.vue'; //  住院月报
import OutpaientMonthReport from '../views/monthReport/outpatient/index.vue'; // 门诊月报

import {
    getCookie,
    delCookie
} from "@/common/js/cookie.js";

import crypto from "@/common/js/crypto.js";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: "/admin"
},
{
    path: "/admin",
    // redirect: "/admin/dashboard",
    redirect: "/admin/login",
    component: Layout,
    children: [{
        path: "dashboard",
        name: "dashboard",
        component: Home,
        // component: Helmet,
        meta: {
            title: "dashboard",
            icon: "dashboard"
        }
    }]
},
// {
//     path: "/admin/login",
//     name: "adlogin",
//     component: Login
// },
{
    path: '/admin/login',
    name: 'Home',

    component: () =>
        import("@/views/Login.vue")
},
{
    path: "/admin/homepage",
    component: Layout,
    children: [{
        path: "index",
        meta: { title: '病案首页' },
        name: "homepage",
        component: HomePage
    },
    { //日志编辑
        path: "rzbj/:logName",
        name: "rzbj",
        meta: { title: '日志编辑' },
        component: () =>
            import("@/views/logEditing/rzbj.vue")
    },
    {
        path: "delRecord",
        name: "delRecord",
        meta: { title: '删除病案' },
        component: () =>
            import("@/views/logEditing/delRecord.vue")
    },
    {
        path: "delLog",
        name: "delLog",
        meta: { title: '删除日志' },
        component: () =>
            import("@/views/logEditing/delLog.vue")
    }
    ]
},
{
    path: "/admin",
    component: Layout,
    children: [{
        path: "information",
        name: "information",
        component: Information
    }]
},
// test为第一个目录
{
    path: "/admin/system",
    component: Layout,
    children: [{
        path: '3-5',
        meta: { title: '住院月报' },
        name: '3-5',
        component: HospitalizedMonthReport
    }, {
        path: '3-6',
        name: '3-6',
        meta: { title: '门诊月报' },
        component: OutpaientMonthReport
    }, {
        path: "test1",
        name: "test1",
        component: () =>
            import("@/views/test/Test1.vue")
    },
    {
        path: "test2",
        name: "test2",
        component: () =>
            import("@/views/test/Test2.vue")
    },
    {
        path: "dict/:dictName",
        name: "dict",
        meta: { title: '数据字典' },
        component: () =>
            import("@/views/test/Test3.vue")
    },
    // {
    //     path: "test4",
    //     name: "test4",
    //     component: () =>
    //         import("@/views/test/Test4.vue")
    // },
    {  //单位信息设置
        path: "unitSetting",
        name: "unitSetting",
        meta: { title: '单位信息设置' },
        component: () =>
            import("@/views/system/unitSetting.vue")
    },
    {  //权限管理
        path: "PermissionPage",
        name: "PermissionPage",
        meta: { title: '权限管理' },
        component: () =>
            import("@/views/system/PermissionPage.vue")
    },
    {  //查看日志
        path: "rz",
        name: "rz",
        meta: { title: '查看日志' },
        component: () =>
            import("@/views/system/rz.vue")
    },
    {   //角色管理
        path: "RolePage",
        name: "RolePage",
        meta: { title: '角色管理' },
        component: () =>
            import("@/views/system/RolePage.vue")
    },
    {   //用户管理
        path: "AdminPage",
        name: "AdminPage",
        meta: { title: '用户管理' },
        component: () =>
            import("@/views/system/AdminPage.vue")
    },
    { //这里面有个数据审核以及其他内容
        path: "test5",
        name: "test5",
        component: () =>
            import("@/views/test/Test5.vue")
    },
    {
        path: "drgDataAnalysis",
        name: "drgDataAnalysis",
        component: () =>
            import("@/views/drg/drgDataAnalysis.vue")
    },
    {
        path: "notInDrg",
        name: "notInDrg",
        component: () =>
            import("@/views/drg/notInDrg.vue")
    },
    {
        path: "physicianDiagnose",
        name: "physicianDiagnose",
        component: () =>
            import("@/views/physicianDiagnose/index.vue")
    },
    {
        path: "groupSearch",
        name: "groupSearch",

        component: GroupSearch,
        meta: {
            keepAlive: true,
            title: "组合查询"
        }
    },
    {
        path: 'randomSearch',
        name: 'randomSearch',
        component: RandomSearch,
        meta: {
            keepAlive: true,
            title: "随机查询"
        }
    },
    {
        path: 'borrowManager',
        name: 'borrowManager',
        meta: { title: '病案借阅' },
        component: BorrowManager
    },
    {
        path: 'receiveManager',
        name: 'receiveManager',
        meta: { title: '病案签收管理' },
        component: ReceiveManager
    },
    {
        path: 'homeVerify',
        name: 'homeVerify',
        meta: { title: '首页审核' },
        component: HomeVerify
    },
    {
        path: 'logVerify',
        name: 'logVerify',
        meta: { title: '住院日志审核' },
        component: LogVerify
    },
    {
        path: 'receive',
        name: '接收网络病案数据',
        component: Receive
    }
    ]
},
//病案管理    illnessPrime
{
    path: "/admin/caseManage",
    component: Layout,
    children: [{
        path: "caseRegister/:caseManageName",
        name: "caseRegister",
        meta: { title: '病案登记表' },
        component: () =>
            import("@/views/caseManage/branchRegister")
    }, {
        path: "illnessIndexes/:caseManageName",
        name: "illnessIndexes",
        meta: { title: '疾病索引卡' },
        component: () =>
            import("@/views/caseManage/illnessIndexes")
    }
    ]
},
//院内统计
{
    path: "/admin/statistics",
    component: Layout,
    children: [{
        path: "treatmentDaily",
        name: "treatmentDaily",
        meta: { title: '医疗业务日报表' },
        component: () =>
            import("@/views/statistics/treatmentDaily")
    }, {
        path: "physicianWorkload",
        name: "physicianWorkload",
        meta: { title: '科室医师工作量' },
        component: () =>
            import("@/views/statistics/inpatientWorkload")
    }, {
        path: "comprehensiveStatistics",
        name: "comprehensiveStatistics",
        meta: { title: '综合统计报表' },
        component: () =>
            import("@/views/statistics/comprehensiveStatistics")
    }, {
        path: "medicalProfessionDaily",
        name: "medicalProfessionDaily",
        meta: { title: '医疗业务逐日登记表' },
        component: () =>
            import("@/views/statistics/medicalProfessionDaily")
    }, {
        path: "standingBook",
        name: "standingBook",
        meta: { title: '统计台账' },
        component: () =>
            import("@/views/statistics/standingBook")
    }, {
        path: "statisticsSynthesize/:statisticsName",
        name: "statisticsSynthesize",
        meta: { title: '临床科室指标完成情况' },
        component: () =>
            import("@/views/statistics/statisticsSynthesize")
    },
    {
        path: "test2",
        name: "test2",
        component: () =>
            import("@/views/test/Test2.vue")
    }
    ]
},
// 质量统计 diagnoseQuality
{
    path: "/admin/quality",
    component: Layout,
    children: [{
        path: "operationQuality",
        name: "operationQuality",
        meta: { title: '手术质量情况统计' },
        component: () =>
            import("@/views/qualityStatistics/operationQuality")
    }, {
        path: "diagnoseQuality",
        name: "diagnoseQuality",
        component: () =>
            import("@/views/qualityStatistics/diagnoseQualityStatistics")
    }, {
        path: "criticalPatientsSalvage",
        name: "criticalPatientsSalvage",
        component: () =>
            import("@/views/qualityStatistics/criticalSalvageDefect")
    }, {
        path: "emergencyCriticalPuzzleStatistics",
        name: "emergencyCriticalPuzzleStatistics",
        meta: { title: '急危重病人情况统计' },
        component: () =>
            import("@/views/qualityStatistics/emergencyCriticalPuzzleStatistics")
    }, {
        path: "medicalTreatmentqualityNorm",
        name: "medicalTreatmentqualityNorm",
        meta: { title: '部分医疗质量指标汇总' },
        component: () =>
            import("@/views/qualityStatistics/medicalTreatmentIndicator")
    }, {
        path: "infectiousDiseasesDepartmentQuality",
        name: "infectiousDiseasesDepartmentQuality",
        component: () =>
            import("@/views/qualityStatistics/infectCentreMessage")
    }, {
        path: "infectionBranch",
        name: "infectionBranch",
        meta: { title: '医院感染反馈表一(分科信息)' },
        component: () =>
            import("@/views/qualityStatistics/infectionBranch")
    }, {
        path: "entityStatistics",
        name: "entityStatistics",
        meta: { title: '医院感染反馈表二(病种统计)' },
        component: () =>
            import("@/views/qualityStatistics/entityStatistics")
    }, {
        path: "operationNotch",
        name: "operationNotch",
        meta: { title: '医院感染反馈表三(手术切口)' },
        component: () =>
            import("@/views/qualityStatistics/operationNotch")
        },
        {
            path: 'control',
            name:'qualityControl',
            component: () =>
                    import("@/views/quality-control/index.vue")
        }
    ]
},
//中医统计
{
    path: "/admin/TCMStatistics",
    component: Layout,
    children: [{
        path: "TCMIllnessClassify/:comName",
        name: "TCMIllnessClassify",
        component: () =>
            import("@/views/TCMStatistics/TCMIllnessClassify")
    }, {
        path: "TCMDiagnoseClassify/:comName",
        name: "TCMDiagnoseClassify",
        component: () =>
            import("@/views/TCMStatistics/TCMIllnessClassify")
    }, {
        path: "TCMWesternMedicineContrast/:comName",
        name: "TCMWesternMedicineContrast",
        component: () =>
            import("@/views/TCMStatistics/TCMIllnessClassify")
    }, {
        path: "TCMTherapyCureNurse/:comName",
        name: "TCMTherapyCureNurse",
        component: () =>
            import("@/views/TCMStatistics/TCMIllnessClassify")
    }, {
        path: "TCMEmphasisClinic/:comName",
        name: "TCMEmphasisClinic",
        component: () =>
            import("@/views/TCMStatistics/TCMIllnessClassify")
    }, {
        path: "TCMQualityControl/:comName",
        name: "TCMQualityControl",
        component: () =>
            import("@/views/TCMStatistics/TCMIllnessClassify")
    }, {
        path: "TCMillnessIndexes/:comName",
        name: "TCMillnessIndexes",
        component: () =>
            import("@/views/TCMStatistics/TCMIllnessClassify")
    }, {
        path: "TCMillnessAnalysis/:comName",
        name: "TCMillnessAnalysis",
        component: () =>
            import("@/views/TCMStatistics/TCMIllnessClassify")
    }
    ]
},
//统计分析
{
    path: "/admin/statisticsAnalyze",
    component: Layout,
    children: [{
        path: "illnessConstitutePosition",
        name: "illnessConstitutePosition",
        meta: { title: '病种类目构成顺位统计' },
        component: () =>
            import("@/views/statisticsAnalyze/illnessConstitutePosition")
    }, {
        path: "illnessSuborderConstitutePosition",
        name: "illnessSuborderConstitutePosition",
        component: () =>
            import("@/views/statisticsAnalyze/illnessSuborderConstitutePosition")
    }, {
        path: "entityAnalyze",
        name: "entityAnalyze",
        meta: { title: '病种病名分析表' },
        component: () =>
            import("@/views/statisticsAnalyze/entityAnalyze")
    }, {
        path: "illnessDeathSynPosition",
        name: "illnessDeathSynPosition",
        meta: { title: '疾病根本死因构成分析' },
        component: () =>
            import("@/views/statisticsAnalyze/illnessDeathSynPosition")
    }, {
        path: "entityStatisticsClassify",
        name: "entityStatisticsClassify",
        meta: { title: '病种分类登记一览表' },
        component: () =>
            import("@/views/statisticsAnalyze/entityStatisticsClassify")
    }, {
        path: "entityBranchStatistics",
        name: "entityBranchStatistics",
        meta: { title: '分科病种构成统计表' },
        component: () =>
            import("@/views/statisticsAnalyze/entityBranchStatistics")
    }, {
        path: "entityBasicSituation",
        name: "entityBasicSituation",
        meta: { title: '30个病种基本情况' },
        component: () =>
            import("@/views/statisticsAnalyze/entityBasicSituation")
    }, {
        path: "workloadContrast",
        name: "workloadContrast",
        component: () =>
            import("@/views/statisticsAnalyze/workloadContrast")
    }, {
        path: "medicalTechnicianContrast",
        name: "medicalTechnicianContrast",
        component: () =>
            import("@/views/statisticsAnalyze/medicalTechnicianContrast")
    }, {
        path: "statisticChart",
        name: "statisticChart",
        meta: { title: '统计图表' },
        component: StatisticEcharts
    },


    ]
},
//数据上报
{
    path: "/admin/dataReport",
    component: Layout,
    children: [{
        path: "complexReport/:dataReportName",
        name: "complexReport",
        component: () =>
            import("@/views/dataReport/complexReport")
    }, {
        path: "reportStatement/:dataReportName",
        name: "reportStatement",
        component: () =>
            import("@/views/dataReport/reportStatement")
    }, {
        path: "reportedData/:dataReportName",
        name: "reportedData",
        meta: { title: '上报数据', keepAlive: true },
        component: () =>
            import("@/views/dataReport/reportedData")
    }, {
        path: "performanceAppraisal",
        name: "performanceAppraisal",
        meta: { title: '绩效考核' ,keepAlive: true },
        component: () =>
            import("@/views/dataReport/performanceAppraisal")
    }

    ]
},
    




];

// history历史模式可以去掉#号
const router = new VueRouter({
    mode: 'history',
    routes
});
//前置导航守卫   应该放在const创建之前
//前置导航守卫
// import store from '@/store'
// router.beforeEach((to, from, next) => {
//     // to and from are both route objects. must call `next`
//     var isLogin = store.getters['user/isLogin'];
//     if (to.path == '/admin/login' && isLogin) {
//         next();
//     } else if (isLogin) {
//         next();
//     } else if (to.path == '/admin/login') {
//         next();
//     } else {
//         next('/admin/login');
//     }
// })

router.beforeEach((to, from, next) => {
    if (to.path == '/' || to.path == '/admin' || to.path == '/admin/login') {
        next();
    } else if (sessionStorage.getItem("sessionUser")) {
        next();
    } else {
        next('/admin/login')
    }
})

export default router;
