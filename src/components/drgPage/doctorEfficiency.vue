<template>
  <div>
    <div class="chartsbox">
      <div id="myChart5"></div>
      <div id="myChart6"></div>
    </div>
    <h1 style="font-size:18px;">医师绩效评价指标</h1>
    <div class="tablebox">
      <el-table
        border
        :data="doctorData"
        style="width: 100%"
        :default-sort="{prop: 'doctorCode', order: 'descending'}"
      >
        <el-table-column prop="doctorCode" label="编号" sortable ></el-table-column>
        <el-table-column prop="doctorName" label="姓名" sortable ></el-table-column>
        <el-table-column prop="totalCount" label="病例数(例)" sortable ></el-table-column>
        <el-table-column prop="cmi" label="CMI" sortable ></el-table-column>
        <el-table-column prop="totalWeight" label="总权重" sortable ></el-table-column>
        <el-table-column prop="groupCount" label="DRG组数(组)" sortable ></el-table-column>
        <el-table-column prop="timeConsumIndex" label="时间指数" sortable ></el-table-column>
        <el-table-column prop="feeConsumIndex" label="费用指数" sortable ></el-table-column>
        <el-table-column prop="totalScore" label="综合素质" sortable ></el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pagationbox">
      <paging-toolbar :pager="pager" @change="fun7('condition')" />
    </div>
  </div>
</template>

<script>
import PagingToolbar from "../../components/toolbar/paging";
import {
  doctorCmiAndDrgCount,
  doctorFeeTimeIndex,
  doctorKpi
} from "../../api/index.js";
import "echarts/theme/macarons.js";

export default {
  components: {
    PagingToolbar
  },
  data() {
    return {
      pager: {
        total: 0, // 总条数
        page: 1, // 当前页
        rows: 10 // 每页显示多少条
      },
      restaurants: [],
      formInline: {},
      doctorData: []
    };
  },
  mounted() {
    this.fun5();
    this.fun6();
    this.fun7();
  },
  methods: {
    fun5() {
      //cmi和drg组数
      doctorCmiAndDrgCount().then(response => {
        console.log(response);

        let myChart5 = this.$echarts.init(
          document.getElementById("myChart5"),
          "macarons"
        );
        myChart5.setOption({
          title: {
            text: "医师服务广度与技术难度"
          },
          legend: {
            // right: 10,
            data: ["医师：CMI/drg组数"]
          },
          tooltip: {
            trigger: "axis",
            formatter: function (params) {
              //console.log(params)
                return 'drg组数：'+ params[0].value[0]+'(组)' + '<br/>' +
                        'CMI：'+ params[0].value[1]
            }
          },
          xAxis: {
            name: "drg组数",
            scale: true
          },
          yAxis: {
            name: "CMI",
            scale: true
          },
          series: [
            {
              name: '医师：CMI/drg组数',
			  type: "scatter",
			  symbolSize: 15,
              data: response.data.data,
              emphasis: {
                label: {
                  show: true,
                  formatter: function(param) {
                    return param.data[2];
                  },
                  color: "#f3340e",
                  position: "top",
                  fontWeight: 'bolder',//字体粗细
                }
              }
            }
          ]
        });
      });
    },

    fun6() {
      //时间和费用消耗指数
      doctorFeeTimeIndex().then(response => {
        //console.log(response.data);

        let myChart6 = this.$echarts.init(
          document.getElementById("myChart6"),
          "macarons"
        );
        myChart6.setOption({
          title: {
            text: "医师工作效率"
          },
          legend: {
            // right: 10,
            data: ["医师：费用消耗指数/时间消耗指数"]
          },
          tooltip: {
            trigger: "axis",
            formatter: function (params) {
              //console.log(params)
              return  '医师：'+params[0].value[2]+'<br/>'+'时间消耗指数：'+ params[0].value[0] + '<br/>' +
                      '费用消耗指数：'+ params[0].value[1]
            }
          },
          xAxis: {
            name: "时间消耗指数",
            scale: true
          },
          yAxis: {
            name: "费用消耗指数",
            scale: true
          },
          series: [
            {
              name: '医师：费用消耗指数/时间消耗指数',
			  type: "scatter",
			   symbolSize: 15,
              data: response.data.data,
              emphasis: {
                label: {
                  show: true,
                  formatter: function(param) {
                    return param.data[2];
                  },
                  color: "#f3340e",
                  position: "top",
                  fontWeight: 'bolder',//字体粗细
                }
              }
            }
          ]
        });
      });
    },

    formatter(row, column) {
      return row.address;
    },
    fun7(condition) {
      let formInitData = {};
      if (condition === undefined) {
        // 条件查询
        sessionStorage.setItem("formInit", JSON.stringify(this.formInline));
        this.formInline.page = 1;
        this.formInline.limit = this.pager.rows;
        formInitData = this.formInline;
      } else {
        // 分页查询
        let formInit = JSON.parse(sessionStorage.getItem("formInit"));
        if (JSON.stringify(formInit) !== "{}") {
          formInitData = formInit;
        }
        formInitData.page = this.pager.page;
        formInitData.limit = this.pager.rows;
      }
      //请求数据
      doctorKpi(formInitData).then(response => {
        //console.log(response)
        //console.log(response.data.data.content);
        this.pager.page = formInitData.page;
        this.pager.total = response.data.total;
        this.doctorData = response.data.data.content;
      });
    }
  }
};
</script>

<style scoped>
h1 {
  color: gray;
  margin-bottom: 10px;
}
.chartsbox {
  display: flex;
}
.el-pagination {
	transform: translateX(-220%);
  /* text-align: center ; */
  margin-top: 10px;
}
#myChart5 {
  /* display: inline-block; */
  width: 830px;
  height: 400px;
}

#myChart6 {
  /* display: inline-block; */
  width: 830px;
  height: 400px;
}
</style>
