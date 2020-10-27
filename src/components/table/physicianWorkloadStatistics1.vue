<template>
  <!-- 医师工作量统计表 -->
  <div  id="print">
    <h1>{{title}}</h1>
    <h3>时期：{{startDate}} ~ {{endDate}}</h3>
    <h2>医院名称:{{unitName}}</h2>
    <div v-if="manyData.length > 0 && tableIsShow">

        <el-table v-for="(data, index) in manyData" :data="data" :key="index"    stripe border style="width: 100%;margin-bottom: 180px;">
          <el-table-column label="科别\医师" align="center" prop="kbjc" width></el-table-column>
          <el-table-column label="总例数" align="center" width></el-table-column>
          <el-table-column label="三日确诊" align="center" width>
            <el-table-column prop label="例数" align="center" width></el-table-column>
            <el-table-column prop label="%" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column label="治愈" align="center" width>
            <el-table-column prop label="例数" align="center" width></el-table-column>
            <el-table-column prop label="%" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column label="好转" align="center" width>
            <el-table-column prop label="例数" align="center" width></el-table-column>
            <el-table-column prop label="%" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column label="未愈" align="center" width>
            <el-table-column prop label="例数" align="center" width></el-table-column>
            <el-table-column prop label="%" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column label="死亡" align="center" width>
            <el-table-column prop label="例数" align="center" width></el-table-column>
            <el-table-column prop label="%" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column label="其他" align="center" width>
            <el-table-column prop label="例数" align="center" width></el-table-column>
            <el-table-column prop label="%" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column prop label="出院病人占床日数" align="center" width></el-table-column>
          <el-table-column prop label="平均住院日" align="center" width></el-table-column>
          <el-table-column prop label="住院总费用（元）" align="center" width></el-table-column>
          <el-table-column label="服务费" align="center" width>
            <el-table-column prop label="小计" align="center" width></el-table-column>
            <el-table-column prop label="其中：床位及诊疗费" align="center" width></el-table-column>
          </el-table-column>
        </el-table>
    </div>
    <div v-else>
      <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
        <el-table-column label="科别\医师" align="center" prop="kbjc" width></el-table-column>
        <el-table-column label="总例数" align="center" width></el-table-column>
        <el-table-column label="三日确诊" align="center" width>
          <el-table-column prop label="例数" align="center" width></el-table-column>
          <el-table-column prop label="%" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="治愈" align="center" width>
          <el-table-column prop label="例数" align="center" width></el-table-column>
          <el-table-column prop label="%" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="好转" align="center" width>
          <el-table-column prop label="例数" align="center" width></el-table-column>
          <el-table-column prop label="%" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="未愈" align="center" width>
          <el-table-column prop label="例数" align="center" width></el-table-column>
          <el-table-column prop label="%" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="死亡" align="center" width>
          <el-table-column prop label="例数" align="center" width></el-table-column>
          <el-table-column prop label="%" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="其他" align="center" width>
          <el-table-column prop label="例数" align="center" width></el-table-column>
          <el-table-column prop label="%" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column prop label="出院病人占床日数" align="center" width></el-table-column>
        <el-table-column prop label="平均住院日" align="center" width></el-table-column>
        <el-table-column prop label="住院总费用（元）" align="center" width></el-table-column>
        <el-table-column label="服务费" align="center" width>
          <el-table-column prop label="小计" align="center" width></el-table-column>
          <el-table-column prop label="其中：床位及诊疗费" align="center" width></el-table-column>
        </el-table-column>
      </el-table>
    </div>


  </div>
</template>

<script>
import { inpatientWorkload } from "@/api";
import { showOkMsg, showErrorMsg, formatDate, reSetData } from "@/utils/index.js";
import XLSX from 'xlsx';
import FileSaver from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      title: "",
      startDate: "",
      endDate: "",
      manyData: [],
      tableIsShow: false,
      printLength: 16,
      unitName: sessionStorage.getItem('unitName')
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {

    printContext () {

      this.$prompt('请输入每页打印行数', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: this.printLength
      }).then(({ value }) => {
        this.tableIsShow = true;
        this.printLength = Number(value);
        this.manyData = reSetData(this.tableData, this.printLength);
        setTimeout(() => {
          this.$print(document.querySelector('#print'));
          console.log(this.tableIsShow);
        }, 500);

        setTimeout(() => {
          this.tableIsShow = false;
          console.log(this.tableIsShow);
        }, 2000);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消打印'
        });
      });


      // this.$print(document.querySelector('#print'), this.printOptions);
    },
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        inpatientWorkload({
          kb: this.dateList.administrative,
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd
        }).then(res => {
          if (res.code === 0) {
            this.title =
              this.dateList.levelList[this.dateList.level] + "工作量统计表";
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data;
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择开始或结束日期");
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
                "科主任工作量统计表.xlsx"
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