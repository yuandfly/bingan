<template>
  <!-- 中医疾病构成分析 -->
  <div id="print">
    <h1>{{title}}</h1>
    <h3>时期: {{startDate}} ~ {{endDate}}</h3>
    <h2>医院名称：{{unitName}}</h2>
    <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
      <el-table-column prop="xh" label="序号" align="center" width></el-table-column>
      <el-table-column prop="bmmc" label="病名" width="300"></el-table-column>
      <el-table-column prop="f1" label="总例数" align="center" width></el-table-column>
      <el-table-column prop="f2" label="占总例数%" align="center" width></el-table-column>
      <el-table-column label="治愈" align="center" width>
        <el-table-column prop="f3" label="例数" align="center" width></el-table-column>
        <el-table-column prop="f4" label="%" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="好转" align="center" width>
        <el-table-column prop="f5" label="例数" align="center" width></el-table-column>
        <el-table-column prop="f6" label="%" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="未愈" align="center" width>
        <el-table-column prop="f7" label="例数" align="center" width></el-table-column>
        <el-table-column prop="f8" label="%" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="死亡" align="center" width>
        <el-table-column prop="f9" label="例数" align="center" width></el-table-column>
        <el-table-column prop="f10" label="%" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="其他" align="center" width>
        <el-table-column prop="f11" label="例数" align="center" width></el-table-column>
        <el-table-column prop="f12" label="%" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="住院天数	" align="center" width>
        <el-table-column prop="f13" label="合计" align="center" width></el-table-column>
        <el-table-column prop="f14" label="平均" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="住院费用（元）" align="center" width>
        <el-table-column prop="f15" label="合计" align="center" width></el-table-column>
        <el-table-column prop="f16" label="平均" align="center" width></el-table-column>
      </el-table-column>
    </el-table>

    <div class="page_block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { diseaseSuborder } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

import XLSX from 'xlsx';

import FileSaver from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: "",
      title: "",
      currentPage: 1,
      pageNum: 1,
      pageSize: 15,
      total: 0,
      unitName: sessionStorage.getItem('unitName')
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {

    printContext () {
      this.$print(document.querySelector('#print'));
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableList();
      //   console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTableList();
      //   console.log(`当前页: ${val}`);
    },
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        diseaseSuborder({
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd,
          bz: this.dateList.num,
          page: this.pageNum,
          limit: this.pageSize
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data.content;
            this.total = res.data.total;
            if (this.dateList.num === 0) {
              this.title = "全病种【ICD-10】亚目顺位统计概况表";
            } else {
              this.title =
                "病种亚目前 " + this.dateList.num + " 位顺位统计概况表";
            }
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择开始或结束日期");
      }
    },
    exportExcel() {

      // if (this.tableData && this.tableData.length === 0) {
      //   this.$message.error('数据为空不能下载');
      //   return;
      // }

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

//将表头放到原始数据里面去，要保证表头在数组的最前面
      //  const newData = [headerDisplay, ...this.tableData];
      //  console.log(newData);
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      try {
        FileSaver.saveAs(
                //Blob 对象表示一个不可变、原始数据的类文件对象。
                //Blob 表示的不一定是JavaScript原生格式的数据。
                //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
                //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
                new Blob([wbout], { type: "application/octet-stream" }),
                //设置导出文件名称
                "全病种【ICD-10】亚目顺位统计概况表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  }
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
}
.page_block {
  display: flex;
  justify-content: center;
  margin-top: 14px;
}
</style>