<template>
  <!-- HNB医技科室工作量表 -->
  <div id="print">
    <h1>HNB医技科室工作量表</h1>
    <h3>时期：{{dateList.dateBegin}} ~ {{dateList.dateEnd}}</h3>
    <h2>医院名称:{{unitName}}</h2>
    <el-table :data="tableData" id="out-table" :span-method="objectSpanMethod" stripe border style="width: 100%">
      <el-table-column prop="id" label="科室名称" width="120" align="center"></el-table-column>
      <el-table-column prop="name" label="项目名称" align="center"></el-table-column>
      <el-table-column prop="amount1" label="工作量" align="center">
        <el-table-column prop="amount2" label="合计" align="center"></el-table-column>
        <el-table-column prop="amount3" label="门诊" align="center"></el-table-column>
        <el-table-column prop="amount4" label="住院" align="center"></el-table-column>
        <el-table-column prop="amount4" label="单位" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="amount1" label="总收入（元）" align="center">
        <el-table-column prop="amount2" label="合计" align="center"></el-table-column>
        <el-table-column prop="amount3" label="门诊" align="center"></el-table-column>
        <el-table-column prop="amount4" label="住院" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="amount2" label="阳性数" align="center"></el-table-column>
      <el-table-column prop="amount3" label="阳性率（%）" align="center"></el-table-column>
    </el-table>

      <template v-if="manyData.length > 0 && tableIsShow">
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
      </template>
      <template v-else>
        <el-table-column prop="id" label="科室名称" width="120" align="center"></el-table-column>
        <el-table-column prop="name" label="项目名称" align="center"></el-table-column>
        <el-table-column prop="amount1" label="工作量" align="center">
          <el-table-column prop="amount2" label="合计" align="center"></el-table-column>
          <el-table-column prop="amount3" label="门诊" align="center"></el-table-column>
          <el-table-column prop="amount4" label="住院" align="center"></el-table-column>
          <el-table-column prop="amount4" label="单位" align="center"></el-table-column>
        </el-table-column>
        <el-table-column prop="amount1" label="总收入（元）" align="center">
          <el-table-column prop="amount2" label="合计" align="center"></el-table-column>
          <el-table-column prop="amount3" label="门诊" align="center"></el-table-column>
          <el-table-column prop="amount4" label="住院" align="center"></el-table-column>
        </el-table-column>
        <el-table-column prop="amount2" label="阳性数" align="center"></el-table-column>
        <el-table-column prop="amount3" label="阳性率（%）" align="center"></el-table-column>
      </template>
  </div>
</template>

<script>
import {inpatientWorkload} from "@/api";
import { showOkMsg, showErrorMsg,reSetData } from "@/utils/index.js";
import XLSX from 'xlsx';

import FileSaver from "file-saver";
export default {
  data() {
    return {
      manyData: [],
      tableIsShow: false,
      printLength: 17,
      unitName: sessionStorage.getItem('unitName'),
      tableData: [
        {
          id: "放射科",
          name: "小计",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
          amount4: 10
        },
        {
          id: "12987123",
          name: "照片",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
          amount4: 10
        },
        {
          id: "12987124",
          name: "透视",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
          amount4: 10
        },
        {
          id: "12987125",
          name: "排粪照影",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
          amount4: 10
        },
        {
          id: "12987126",
          name: "造影",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
          amount4: 10
        },
        {
          id: "12987125",
          name: "吞钡",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
          amount4: 10
        },
        {
          id: "12987126",
          name: "运输",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
          amount4: 10
        },
        {
          id: "检验科",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
          amount4: 10
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
          amount4: 10
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
          amount4: 10
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
          amount4: 10
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
          amount4: 10
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
          amount4: 10
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
          amount4: 10
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
          amount4: 10
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
          amount4: 10
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
          amount4: 10
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
          amount4: 10
        }
      ],
      column_row_offset: {
        id: [7, 19, 1, 1],
        name: [],
        amount1: [],
        amount2: [],
        amount3: [],
        amount4: []
      },
      now_col_row_num: {},
      now_col_offset: {},
      total: 0
    };
  },
  created() {
    this.getTableList(this.dateList.dateBegin, this.dateList.dateEnd);
  },
  mounted() {
    this.algorithm();
  },
  props: ["dateList"],
  methods: {
    algorithm() {
      this.column_row_offset.id.forEach(els => {
        this.total += els;
      });
      for (let i = 0; i <= this.total; i++) {
        this.column_row_offset.name.push(1);
        this.column_row_offset.amount1.push(1);
        this.column_row_offset.amount2.push(1);
        this.column_row_offset.amount3.push(1);
        this.column_row_offset.amount4.push(1);
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (!this.now_col_row_num[column.property]) {
        this.now_col_row_num[column.property] = Object.assign(
          [],
          this.column_row_offset[column.property]
        );
        let a = this.now_col_row_num[column.property].shift();
        this.now_col_offset[column.property] = a;
        return {
          rowspan: a,
          colspan: 1
        };
      } else if (rowIndex >= this.now_col_offset[column.property]) {
        let a = this.now_col_row_num[column.property].shift();
        this.now_col_offset[column.property] += a;
        return {
          rowspan: a,
          colspan: 1
        };
      } else {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    },


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
            showOkMsg(res.msg);
            this.tableData = res.data;
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
                "HNB医技科室工作量表.xlsx"
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