<template>
  <!-- 医疗业务统计日报表 -->
  <div id="print" >



      <template v-if="manyData.length > 0 && tableIsShow">
        <template v-for="(data, index) in manyData">
          <h1>{{unitName}}医疗统计日报表</h1>
          <h3>{{dateValue}}</h3>
          <el-table  :data="data" :key="index"    stripe border style="width: 100%;margin-bottom: 180px;">
            <el-table-column :label="aggregate" align="center" width>
              <el-table-column prop="mjc" label="科别" align="center" width="100px"></el-table-column>
              <el-table-column label="门、急诊人次" align="center" width>
                <el-table-column prop="total" label="合计" align="center" width="50px"></el-table-column>
                <el-table-column prop="tjm2009" label="门诊" align="center" width="50px"></el-table-column>
                <el-table-column prop="tjm2012" label="急诊" align="center" width="50px"></el-table-column>
              </el-table-column>
              <el-table-column prop label="病房" align="center" width="50px"></el-table-column>
            </el-table-column>
            <el-table-column label="住 院 部 分" align="center" width>
              <el-table-column prop="zjc" label="科别" align="center" width="50px"></el-table-column>
              <el-table-column prop="tjz1001" label="实际开放床数" align="center" width="50px"></el-table-column>
              <el-table-column prop="tjz1002" label="原有人数" align="center" width="50px"></el-table-column>
              <el-table-column prop="tjz1003" label="入院人数" align="center" width="50px"></el-table-column>
              <el-table-column prop="tjz1004" label="他科转入" align="center" width="50px"></el-table-column>
              <el-table-column label="出院人数" align="center" width>
                <el-table-column prop="tjz1005" label="合计" align="center" width="50px"></el-table-column>
                <el-table-column prop="tjz1010" label="死亡" align="center" width="50px"></el-table-column>
              </el-table-column>
              <el-table-column prop="tjz1015" label="转往他科" align="center" width="50px"></el-table-column>
              <el-table-column prop="tjz1016" label="留院人数" align="center" width="50px"></el-table-column>
              <el-table-column prop="kcs" label="空床数" align="center" width="50px"></el-table-column>
              <el-table-column prop="tjz1018" label="危重病人" align="center" width="50px"></el-table-column>
              <el-table-column prop="tjz1019" label="陪伴人数" align="center" width="50px"></el-table-column>
              <el-table-column prop label="本日手术人数" align="center" width="50px"></el-table-column>
            </el-table-column>
          </el-table>
        </template>
      </template>
      <template v-else>
        <h1>{{unitName}}医疗统计日报表</h1>
        <h3>{{dateValue}}</h3>
        <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
          <el-table-column :label="aggregate" align="center" width>
            <el-table-column prop="mjc" label="科别" align="center" width></el-table-column>
            <el-table-column label="门、急诊人次" align="center" width>
              <el-table-column prop="total" label="合计" align="center" width></el-table-column>
              <el-table-column prop="tjm2009" label="门诊" align="center" width></el-table-column>
              <el-table-column prop="tjm2012" label="急诊" align="center" width></el-table-column>
            </el-table-column>
            <el-table-column prop label="病房" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column label="住 院 部 分" align="center" width>
            <el-table-column prop="zjc" label="科别" align="center" width></el-table-column>
            <el-table-column prop="tjz1001" label="实际开放床数" align="center" width></el-table-column>
            <el-table-column prop="tjz1002" label="原有人数" align="center" width></el-table-column>
            <el-table-column prop="tjz1003" label="入院人数" align="center" width></el-table-column>
            <el-table-column prop="tjz1004" label="他科转入" align="center" width></el-table-column>
            <el-table-column label="出院人数" align="center" width>
              <el-table-column prop="tjz1005" label="合计" align="center" width></el-table-column>
              <el-table-column prop="tjz1010" label="死亡" align="center" width></el-table-column>
            </el-table-column>
            <el-table-column prop="tjz1015" label="转往他科" align="center" width></el-table-column>
            <el-table-column prop="tjz1016" label="留院人数" align="center" width></el-table-column>
            <el-table-column prop="kcs" label="空床数" align="center" width></el-table-column>
            <el-table-column prop="tjz1018" label="危重病人" align="center" width></el-table-column>
            <el-table-column prop="tjz1019" label="陪伴人数" align="center" width></el-table-column>
            <el-table-column prop label="本日手术人数" align="center" width></el-table-column>
          </el-table-column>
        </el-table>
      </template>
  </div>
</template>

<script>
import { SelectHospitalStatistics } from "@/api";
import { showOkMsg, showErrorMsg,reSetData } from "@/utils/index.js";
import XLSX from 'xlsx';
import FileSaver from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      dateValue: "",
      aggregate: "门诊总量",
      manyData: [],
      tableIsShow: false,
      printLength: 10,
      unitName: sessionStorage.getItem('unitName')
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {

    printContext () {


        this.tableIsShow = true;
        this.manyData = reSetData(this.tableData, this.printLength);
        setTimeout(() => {
          this.$print(document.querySelector('#print'));
          console.log(this.tableIsShow);
        }, 500);

        setTimeout(() => {
          this.tableIsShow = false;
          console.log(this.tableIsShow);
        }, 2000);



      // this.$print(document.querySelector('#print'), this.printOptions);
    },
    getTableList() {
      if (this.dateList.dateValue) {
        SelectHospitalStatistics({
          number: this.dateList.daily,
          time: this.dateList.dateValue
        }).then(res => {
          if (res.code === 0) {
            this.dateValue = this.dateList.dateValue;
            this.tableData = res.data;
            this.tableData.forEach(els => {
              els.total = Number(els.tjm2009) + Number(els.tjm2012);
            });
            this.aggregate = "门诊总量";
            this.aggregate += ": " + this.tableData[0].total;
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择日期");
      }
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
      workBook.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(this.tableData);
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
                this.unitName + "医疗统计日报表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  }
};
</script>

<style lang="less" scoped>
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
#print{
  width: 100%;
}
@media print {
  html, body {
    height: inherit;
  }
}

/deep/ .el-table  {
td, th {
  padding: 5px 0;
  font-size: 12px;
}



}
/deep/ .el-table::before {
  width: 0;

}
/deep/ .el-table--border::after, .el-table--group::after, .el-table::before {
  background-color: #fff;
}

/deep/ .el-table--border, .el-table--group {
  border: 0;
}

</style>