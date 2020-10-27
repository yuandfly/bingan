<template>
  <!-- 绩效考核-->
  <div>
    <div v-show="this.dateList.audit === '1'">
      <h1>审核结果汇总</h1>
      <el-table :data="sumTableData" stripe border style="width: 100%" >
        <el-table-column prop="ERROR" label="问题所在" align="center" width="900"></el-table-column>
        <el-table-column prop="ls" label="例数" align="center" width></el-table-column>
        <el-table-column prop="zb" label="%" align="center" width="140"></el-table-column>
        <el-table-column prop="ZT" label="类型" align="center" width></el-table-column>
      </el-table>
    </div>
    <div v-show="this.dateList.audit === '2'">
      <h1>审核结果</h1>
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="dm" label="病案号" align="center" width>
          <template slot-scope="scope">
            <span class="link" @click="toHomePage(scope.row.dm)">{{scope.row.dm}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="error" label="问题所在" align="center" width="900"></el-table-column>
        <el-table-column prop="zt" label="类型" align="center" width></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import {
  generateReportCsv,
  generateCsv,
  QueryPatient,
  getHomeList,
} from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";
import XLSX from 'xlsx';
import FileSaver from "file-saver";
export default {
  data() {
    return {
      sumTableData: [],
      tableData: [],
      url: "",
      // 分页
      pager: { page: 1, rows: 10, total: 0 },
      resultData: [],
      patientsNumList: [],
      patientsData: [],
    };
  },
  props: ["dateList"],
  methods: {
    ...mapMutations("homepage", ["setSearchInfo"]),

    getTableList() {
      if (
        (this.dateList.dateBegin && this.dateList.dateEnd) ||
        (this.dateList.year && this.dateList.month)
      ) {
        this.$emit("loadFun", true);
        generateReportCsv({
          endTime: this.dateList.dateEnd,
          startTime: this.dateList.dateBegin,
          sq: this.dateList.year + this.dateList.month,
        })
          .then((res) => {
            if (res.code === 0) {
              this.sumTableData = res.data.summary;
              this.tableData = res.data.detailed;
              this.patientsNum(this.tableData);
              this.$emit("fun", 1, false);
              this.$emit("loadFun", false);
            } else if (res.code === 1010) {
              this.sumTableData = [];
              this.tableData = [];
              this.$emit("fun", 0, false);
              this.$emit("loadFun", false);
              showOkMsg(res.msg);
            } else {
              this.$emit("loadFun", false);
            }
          })
          .catch((err) => {
            this.$emit("loadFun", false);
          });
      } else {
        showErrorMsg("请选择日期");
      }
    },
    patientsNum(list) {
      list.forEach((element) => {
        this.patientsNumList.push(element.dm);
      });
    },
    getPatientsList(baNum, list) {
      getHomeList(list).then((res) => {
        if (res.code === 0) {
          this.patientsData = res.data;
          this.pager.total = this.patientsData.length;
          this.setSearchInfo({
            baza00: baNum,
            randomSearchCondition: {},
            searchData: {
              pager: this.pager,
              tableData: this.patientsData,
            },
          });
          this.$router.push({ path: "/admin/homepage/index" });
        }
      });
    },

    //定义导出Excel表格事件
    exportExcel() {

      var wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'array'
      };
      var workBook = {
        SheetNames: ['Sheet1'],
        Sheets: {},
        Props: {}
      };

      const headerDisplay = {dm:"病案号", error:"问题所在", zt: '类型'};
      const header = ['dm', 'error', 'zt'];
      const newData = [headerDisplay, ...this.tableData];
      /* 从表生成工作簿对象 */
      workBook.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(newData, {header: header, skipHeader:true});
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(workBook, wopts);
      try {
        FileSaver.saveAs(
                //Blob 对象表示一个不可变、原始数据的类文件对象。
                //Blob 表示的不一定是JavaScript原生格式的数据。
                //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
                //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
                new Blob([wbout], { type: "application/octet-stream" }),
                //设置导出文件名称
                "审核结果.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    getInformation(baNum) {
      QueryPatient(baNum).then((res) => {
        if (res && res.code === 0) {
          this.resultData = res.data.bazaDO;
          this.getPatientsList(baNum, this.patientsNumList);
        }
      });
    },
    // 去往首页编辑
    toHomePage(baza00) {
      this.getInformation(baza00);
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  text-align: center;
  padding: 23px 0;
}
h3 {
  text-align: center;
  padding-bottom: 20px;
}
h2 {
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
}
link {
  color: #409eff;
  cursor: pointer;
}
</style>