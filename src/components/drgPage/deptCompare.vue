<template>
  <div>
    <!-- 科室 -->
    <div class="buttonbox">
      <el-button
        id="btn"
        :class="item.dm"
        plain
        v-for="(item,index) in allDept"
        @click="btnClick(item.dm)"
      >{{item.dmmc}}</el-button>
    </div>
    <el-container class="c1">
      <!-- <el-header>
        <el-button type="success" round>科室绩效指标对比</el-button>
      </el-header>-->
      <el-main>
        <div id="myChart2"></div>

        <div id="table">
          <table class="imagetable">
            <tbody>
              <tr id="t1">
                <th>指标值</th>
                <td v-text="deptData1[7]">科室一</td>
                <td v-text="deptData2[7]">科室一</td>
                <td v-text="deptData3[7]">科室一</td>
              </tr>
              <tr id="t2">
                <th>药占比(%)</th>
                <td v-text="deptData1[0]">路上捡到1万元钱是种什么体验？</td>
                <td v-text="deptData2[0]">路上捡到1万元钱是种什么体验？</td>
                <td v-text="deptData3[0]">路上捡到1万元钱是种什么体验？</td>
              </tr>
              <tr id="t3">
                <th>时间消耗指数</th>
                <td v-text="deptData1[1]">路上捡到1万元钱是种什么体验？</td>
                <td v-text="deptData2[1]">路上捡到1万元钱是种什么体验？</td>
                <td v-text="deptData3[1]">路上捡到1万元钱是种什么体验？</td>
              </tr>
              <tr id="t4">
                <th>费用消耗指数</th>
                <td v-text="deptData1[2]">2019-8-11</td>
                <td v-text="deptData2[2]">2019-8-11</td>
                <td v-text="deptData3[2]">2019-8-11</td>
              </tr>
              <tr id="t5">
                <th>中低风险死亡率(%)</th>
                <td v-text="deptData1[3]">2019-8-11</td>
                <td v-text="deptData2[3]">2019-8-11</td>
                <td v-text="deptData3[3]">2019-8-11</td>
              </tr>
              <tr id="t6">
                <th>CMI</th>
                <td v-text="deptData1[4]">2019-8-11</td>
                <td v-text="deptData2[4]">2019-8-11</td>
                <td v-text="deptData3[4]">2019-8-11</td>
              </tr>
              <tr id="t7">
                <th>平均住院日</th>
                <td v-text="deptData1[5]">2019-8-11</td>
                <td v-text="deptData2[5]">2019-8-11</td>
                <td v-text="deptData3[5]">2019-8-11</td>
              </tr>
              <tr id="t8">
                <th>drg组数</th>
                <td v-text="deptData1[6]">2019-8-11</td>
                <td v-text="deptData2[6]">2019-8-11</td>
                <td v-text="deptData3[6]">2019-8-11</td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { deptList, deptCompare } from "../../api/index.js";
import "echarts/theme/macarons.js";
export default {
  data() {
    return {
      allDept: [],
      deptData1: [], //第一个科室数据
      deptData2: [], //第二个科室
      deptData3: [], //第三个
      flag1: "", //第一个科室编码
      flag2: "", //第二个
      flag3: "" //第三个
    };
  },
  mounted() {
    this.fun2(); //科室列表
    this.fun3(); //科室指标数据
  },

  methods: {
    //按钮点击
    btnClick(code) {
      deptCompare(code).then(res => {
        //console.log(res.data.data);
        if (res.data.data.length > 0) {
          if (this.flag1 == code) {
            //如果该科室已选中，再次点击取消
            this.deptData1 = [];
            this.flag1 = "";
            this.chartInit(); //echart初始化
            $("." + code).css("background", "white");
            return;
          } else if (this.flag2 == code) {
            this.deptData2 = [];
            this.flag2 = "";
            this.chartInit();
            $("." + code).css("background", "white");
            return;
          } else if (this.flag3 == code) {
            this.deptData3 = [];
            this.flag3 = "";
            this.chartInit();
            $("." + code).css("background", "white");
            return;
          }

          if (this.deptData1.length == 0 && this.flag1 != code) {
            //console.log("1111");
            this.deptData1 = res.data.data;
            this.chartInit();
            this.flag1 = code;
            $("." + code).css("background", "#E6E6E6");
          } else if (this.deptData2.length == 0 && this.flag2 != code) {
            //console.log("2222");
            this.deptData2 = res.data.data;
            this.chartInit();
            this.flag2 = code;
            $("." + code).css("background", "#E6E6E6");
          } else if (this.deptData3.length == 0 && this.flag3 != code) {
            //console.log("333");
            this.deptData3 = res.data.data;
            this.chartInit();
            this.flag3 = code;
            $("." + code).css("background", "#E6E6E6");
          }
        }
      });
    },

    //科室列表
    fun2() {
      deptList().then(res => {
        //console.log(res.data.data);
        this.allDept = res.data.data;
      });
    },

    fun3(deptCode) {
      deptCompare().then(response => {
        //console.log(response.data);
        this.deptData1 = response.data.data;
        this.chartInit();
      });
    },

    chartInit() {
      let myChart2 = this.$echarts.init(
        document.getElementById("myChart2"),
        "macarons"
      );
      //绘制图表
      myChart2.setOption({
        title: {
          text: "{a|科室组绩效指标对比}",
          textStyle: {
            rich: {
              a: {
                color: "#fff",
                backgroundColor: "#17B292",
                height: 30,
                width: 120,
                align: "center",
                borderRadius: 30
              }
            }
          }
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          data: [this.deptData1[7], this.deptData2[7], this.deptData3[7]]
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#32BF72",
              padding: [3, 5]
            }
          },
          indicator: [
            {
              name: "药占比",
              max: 80
            },
            {
              name: "时间消耗指数",
              max: 5
            },
            {
              name: "费用消耗指数",
              max: 5
            },
            {
              name: "中低风险死亡率",
              max: 5
            },
            {
              name: "cmi值",
              max: 10
            },
            {
              name: "平均住院日",
              max: 60
            },
            {
              name: "drg组数",
              max: 100
            }
          ]
        },
        series: [
          {
            name: "科室数据",
            type: "radar",

            // areaStyle: {
            // 	normal: {}
            // },
            data: [
              {
                value: this.deptData1,
                name: this.deptData1[7]
              },
              {
                value: this.deptData2,
                name: this.deptData2[7]
              },
              {
                value: this.deptData3,
                name: this.deptData3[7]
              }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
table.imagetable {
  font-family: verdana, arial, sans-serif;
  font-size: 14px;
  color: #787b7c;
  border-collapse: collapse;
}
table.imagetable tr {
  border-bottom: 1px solid #efefef;
}
table.imagetable th {
  width: 140px;
  line-height: 50px;
  border-bottom: 1px solid #efefef;
}
table.imagetable td {
  /* border-bottom: 1px solid #efefef; */
  width: 140px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
table tr:nth-child(odd) {
  background: #fff;
}
/*设置偶数行颜色*/
table tr:nth-child(even) {
  background: #f9f9f9;
}
table td {
  line-height: 0px;
  border-top: 0px;
}

.el-main {
  margin-top: 30px;
  border-top: 1px solid #eee;
  display: flex;
  height: 100vh;
}
#myChart2 {
  display: inline-block;
  width: 800px;
  height: 400px;
  top: 20px;
  /* box-shadow: 2px 2px 2px 2px #ccc; */
}
#table {
  display: inline-block;
  margin-left: 30px;
  width: calc(100% - 800px - 30px);
  height: 400px;
  /* box-shadow: 2px 2px 2px 2px #ccc; */
}
#btn {
  height: 38px;
  margin: 5px;
  color: #5b5e60;
  background-color: white;
}
</style>
