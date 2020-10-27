<template>
  <!-- 病房工作辅助报表 -->
  <div id="print">
    <h1>病 房 工 作 辅 助 报 表</h1>
    <h3>时期：{{startDate}} ~ {{endDate}}</h3>
    <h2>医院名称:{{unitName}}</h2>
    <el-table :data="tableData" id="out-table" stripe style="width: 100%">
      <el-table-column prop="tjz2mc" label="科别" align="center" width></el-table-column>
      <el-table-column prop="tjz2005" label="出院人数" align="center" width></el-table-column>
      <el-table-column label="诊断情况" align="center" width>
        <el-table-column label="待诊" align="center" width>
          <el-table-column prop="tjz2023" label="门诊" align="center" width></el-table-column>
          <el-table-column prop="tjz2026" label="入院" align="center" width></el-table-column>
          <el-table-column prop="tjz2027" label="出院" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="门诊与出院诊断" align="center" width>
          <el-table-column prop="mzbf" label="不符" align="center" width></el-table-column>
          <el-table-column prop="tjz2022" label="相符" align="center" width></el-table-column>
          <el-table-column prop="tjz2046" label="符合率%" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="入院与出院诊断" align="center" width>
          <el-table-column prop="ryzdbf" label="不符" align="center" width></el-table-column>
          <el-table-column prop="tjz2025" label="相符" align="center" width></el-table-column>
          <el-table-column prop="tjz2047" label="符合率%" align="center" width></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="入院三日确诊" align="center" width>
        <el-table-column prop="tjz2028" label="例数" align="center" width></el-table-column>
        <el-table-column prop="tjz2050" label="确诊率%" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="危重病人抢救次数" align="center" width>
        <el-table-column prop="tjz2030" label="次数" align="center" width></el-table-column>
        <el-table-column prop="tjz2067" label="成功次数" align="center" width></el-table-column>
        <el-table-column prop="tjz2060" label="成功率%" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="中医药治疗" align="center" width>
        <el-table-column prop="tjz2034" label="例数" align="center" width></el-table-column>
        <el-table-column prop="tjz2063" label="治疗率%" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="手术情况" align="center" width>
        <el-table-column prop="tjz2061" label="例数" align="center" width></el-table-column>
        <el-table-column label="术前后诊断" align="center" width>
          <el-table-column prop="ssbf" label="不符" align="center" width></el-table-column>
          <el-table-column prop="tjz2035" label="符合" align="center" width></el-table-column>
          <el-table-column prop="tjz2053" label="符合率%" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="无菌切口" align="center" width>
          <el-table-column prop="tjz2030" label="次数" align="center" width></el-table-column>
          <el-table-column prop="tjz2033" label="感染次数" align="center" width></el-table-column>
          <el-table-column prop="tjz2052" label="感染率%" align="center" width></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="护理情况" align="center" width>
        <el-table-column prop="tjz2018" label="实际占床" align="center" width></el-table-column>
        <el-table-column prop="tjz2020" label="陪人占床" align="center" width></el-table-column>
        <el-table-column prop="tjz2045" label="陪护率%" align="center" width></el-table-column>
        <el-table-column prop="tjz2079" label="一极护理" align="center" width></el-table-column>
        <el-table-column prop="yjhll" label="一极护理率%" align="center" width></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { wardWorkAuxiliary } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: "",
      unitName: sessionStorage.getItem('unitName')
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        wardWorkAuxiliary({
          kb: "0000",
          endTime: this.dateList.dateEnd,
          startTime: this.dateList.dateBegin
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data;
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择开始和结束日期");
      }
    },

    printContext () {
      this.$print(document.querySelector('#print'));
    },
    // 导出表格为excel
    //定义导出Excel表格事件
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
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'), {raw:true});
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
                "病房工作辅助报表.xlsx"
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
  display: flex;
  justify-content: space-between;
}
</style>