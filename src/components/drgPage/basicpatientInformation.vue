<template>
    <div class="basic">
        <div class="selectbox">
            <el-date-picker
                    v-model="year"
                    type="year"
                    placeholder="选择年份"
                    size="mini"
                    v-on:change="selectYear()"
                    clearable:false
            ></el-date-picker>
        </div>
        <div class="all">
            <!-- 图表 -->
            <div id="myChart10" class="myChart10" :data="mapDataOne"></div>
            <!-- 表格区域 -->
            <div class="tablebox">
                <div class="tableContent">
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            height="480"
                            :default-sort="{prop: 'index'}"
                            :cell-style="cellStyle"
                            clearable="false"
                    >
                        <el-table-column type="index" width="80"></el-table-column>
                        <el-table-column prop="dmmc" label="地区"></el-table-column>
                        <el-table-column prop="patientCount" label="人次"></el-table-column>
                        <el-table-column prop="percentage" label="占比"></el-table-column>
                        <el-table-column prop="changePer" label="同比"></el-table-column>
                    </el-table>
                </div>
                <!--分页-->
                <!-- <div class="pagationbox">
                  <paging-toolbar :pager="pager" />
                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {queryPlaceMessage} from "../../api/index.js";
    import {
        formatDate
    } from '../../utils';//时间格式化
    import PagingToolbar from "../../components/toolbar/paging";
    import echarts from "echarts";
    //   import '../../node_modules/echarts/map/js/world.js'
    import "../../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据
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
                year: new Date(), //选择年份
                mapDataOne: [], //地图接口中的数据
                tableData: []
            };
        },
        mounted() {
            this.mapInitChinese();
        },
        methods: {
            selectYear() {
                //选择年份
                var yearStr = formatDate(this.year,"YYYY");

                queryPlaceMessage(yearStr).then(response => {
                    // console.log(response.data);
                    if (response.data.code == 0) {
                        // console.log(response.data.data);
                        this.tableData = response.data.data.currList; //表格数据
                        this.mapDataOne = response.data.data.mapData; //地图的数据
                        this.mapInitChinese();
                    }
                });

            },
            cellStyle({row, column, rowIndex, columnIndex}) {
                //表格隔行变色
                if (rowIndex % 2 == 1) {
                    return "background:#f3f7fd;";
                }
            },
            mapInitChinese() {
                //调用中国地图
                let myChart10 = this.$echarts.init(
                    document.getElementById("myChart10"),
                    "macarons"
                );
                var nameColor = " rgb(255, 215, 0)";
                var name_fontFamily = "宋体";
                var name_fontSize = 35;
                var mapName = "china";
                var data = this.mapDataOne;
                // var data = [
                //   { name: "北京", value: 300 },
                //   { name: "天津", value: 700 },
                //   { name: "上海", value: 7620 },
                //   { name: "重庆", value: 459 },
                //   { name: "河北", value: 344 },
                //   { name: "山西", value: 185 },
                //   { name: "辽宁", value: 142 },
                //   { name: "吉林", value: 32 },
                //   { name: "黑龙江", value: 500 },
                //   { name: "江苏", value: 521 },
                //   { name: "浙江", value: 1186 },
                //   { name: "安徽", value: 220 },
                //   { name: "福建", value: 251 },
                //   { name: "江西", value: 318 },
                //   { name: "山东", value: 500 },
                //   { name: "河南", value: 382 },
                //   { name: "湖北", value: 120 },
                //   { name: "湖南", value: 261 },
                //   { name: "广东", value: 786 },
                //   { name: "海南", value: 52 },
                //   { name: "四川", value: 295 },
                //   { name: "贵州", value: 46 },
                //   { name: "云南", value: 68 },
                //   { name: "陕西", value: 145 },
                //   { name: "甘肃", value: 300 },
                //   { name: "青海", value: 24 },
                //   { name: "台湾", value: 0 },
                //   { name: "内蒙古自治区", value: 7 },
                //   { name: "广西壮族自治区", value: 2 },
                //   { name: "西藏自治区", value: 0 },
                //   { name: "宁夏回族自治区", value: 1 },
                //   { name: "新疆维吾尔自治区", value: 10006 },
                //   { name: "香港特别行政区", value: 0 },
                //   { name: "澳门特别行政区", value: 0 },
                //   { name: "新疆", value: 300 },
                //   { name: "西藏", value: 20 },
                //   { name: "内蒙古", value: 500 },
                //   { name: "广西", value: 40 },
                //   { name: "南海诸岛", value: 0 },
                //   { name: "宁夏", value: 500 }
                // ];
                var geoCoordMap = {};
                //  var toolTipData = [];

                /*获取地图数据*/
                var mapFeatures = echarts.getMap(mapName).geoJson.features;
                //  console.log(mapFeatures)
                mapFeatures.forEach(function (v) {
                    // console.info(v);
                    // 地区名称

                    var name = v.properties.name;
                    // 地区经纬度
                    geoCoordMap[name] = v.properties.cp;
                    //  toolTipData.push({
                    //      name: name,
                    //      value: [{
                    //              name: "鲜花",
                    //              value: Math.round(Math.random() * 100 + 10)
                    //          },
                    //          {
                    //              name: "星星",
                    //              value: Math.round(Math.random() * 100 + 10)
                    //          },
                    //          {
                    //              name: "香蕉",
                    //              value: Math.round(Math.random() * 100 + 10)
                    //          },
                    //          {
                    //              name: "嫌弃",
                    //              value: Math.round(Math.random() * 100 + 10)
                    //          }
                    //      ]
                    //  })
                });


                var max = 480,
                    min = 9; // todo
                var maxSize4Pin = 150,
                    minSize4Pin = 20;

                var convertData = function (data) {
                    var res = [];
                   // console.log(data)
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = geoCoordMap[data[i].name];

                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value)
                            });

                        }
                    }
                    console.log(res)
                    return res;
                };
                var option = {
                    tooltip: {
                        trigger: "item",
                        formatter: function (params) {
                             // console.log(params)
                            if (typeof params.value[2] == "undefined") {
                               if(isNaN(params.value)){
                                   params.value = 0;
                               };
                                return params.name + " : " + params.value;
                            } else {
                                return params.name + " : " + params.value[2];

                            }

                        }
                    },
                    //  tooltip: {
                    //     //  trigger: 'item',
                    //      formatter: function(params) {
                    //          console.log(params)
                    //          if (typeof(params.value)[2] == "undefined") {
                    //              var toolTiphtml = ''
                    //              for (var i = 0; i < toolTipData.length; i++) {
                    //                  if (params.name == toolTipData[i].name) {
                    //                      toolTiphtml += toolTipData[i].name + ':<br>'
                    //                      for (var j = 0; j < toolTipData[i].value.length; j++) {
                    //                          toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                    //                      }
                    //                  }
                    //              }
                    //             //  console.log(toolTiphtml)
                    //              // console.log(convertData(data))
                    //              return toolTiphtml;
                    //          } else {
                    //              var toolTiphtml = ''
                    //              for (var i = 0; i < toolTipData.length; i++) {
                    //                  if (params.name == toolTipData[i].name) {
                    //                      toolTiphtml += toolTipData[i].name + ':<br>'
                    //                      for (var j = 0; j < toolTipData[i].value.length; j++) {
                    //                          toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                    //                      }
                    //                  }
                    //              }
                    //             //  console.log(toolTiphtml)
                    //              // console.log(convertData(data))
                    //              return toolTiphtml;
                    //          }
                    //      }
                    //  },
                    legend: {
                        orient: "vertical",
                        y: "bottom",
                        x: "right",
                        data: ["credit_pm2.5"],
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    // visualMap: {
                    //   show: true,
                    //   min: 0,
                    //   max: 500,
                    //   left: "left",
                    //   top: "bottom",
                    //   text: ["高", "低"], // 文本，默认为数值文本
                    //   calculable: true,
                    //   seriesIndex: [1],
                    //   inRange: {
                    //     //   color: ['#3B5077', '#031525'] // 蓝黑
                    //     color: ["#66B3FF", "#005AB5"]
                    //   }
                    // },
                    visualMap: {
                        show: true,
                        x: "left",
                        y: "center",
                        splitList: [
                            {start: 6000, end: 100000},
                            {start: 5000, end: 6000},
                            {start: 4000, end: 5000},
                            {start: 3000, end: 4000},
                            {start: 2000, end: 3000},
                            {start: 1000, end: 2000},
                            {start: 0, end: 1000}
                        ],
                        color: [
                            "#FF7011",
                            "#004B97",
                            "#005AB5",
                            "#0066CC",
                            "#52A9FF",
                            "#84C1FF",
                            "#C4E1FF"
                        ]
                    },
                    geo: {
                        show: true,
                        map: mapName,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: "#031525",
                                borderColor: "#097bba"
                            },
                            emphasis: {
                                areaColor: "#2B91B7"
                            }
                        }
                    },
                    series: [
                        //散点
                        {
                            name: "散点",
                            type: "effectScatter",
                            coordinateSystem: "geo",
                            data: convertData(data), //此处的data值为
                            // data: response.data.data.mapData,
                            symbolSize: function (val) {
                                return 2;
                            },
                            label: {
                                normal: {
                                    formatter: "{b}",
                                    position: "right",
                                    fontWeight: "bold",
                                    color: "#000000",
                                    show: true
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "#fff"
                                }
                            }
                        },
                        //区域颜色
                        {
                            type: "map",
                            map: mapName,
                            geoIndex: 0,
                            aspectScale: 0.75, //长宽比
                            showLegendSymbol: true, // 存在legend时显示
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: "#fff"
                                    }
                                }
                            },
                            roam: true,
                            itemStyle: {
                                normal: {
                                    areaColor: "#031525",
                                    borderColor: "#3B5077"
                                },
                                emphasis: {
                                    areaColor: "#2B91B7"
                                }
                            },
                            animation: false,
                            data: data
                        }
                    ]
                };
                //取代传统设置，加入自动适应屏幕代码
                myChart10.setOption(option);
                //假设实例的名字是myChart,在echats配置完实例以后,配置下面几行代码即可
                // window.onresize = function() {
                //   myChart10.resize();
                // };
            }
        }
    };
</script>
<style scoped>
    /* .basic {
      width: 100%;
      height: 100vh;
      display: flex;
    } */
    /* 选择年份区域 */
    .selectbox {
        width: 100%;
        height: 80px;
        line-height: 80px;
        padding-left: 360px;
        /* box-shadow: 0px 2px 2px 1px #3c3c3c; */
        /* background-color: red; */
    }

    .all {
        display: flex;
    }

    .myChart10 {
        width: 800px;
        height: 600px;
        /* margin-top: -88px; */
    }

    .tablebox {
        width: calc(100% - 800px);
        height: 600px;
    }

    .pagationbox {
        margin-top: 20px;
        transform: translateX(-308px);
    }

    /* 让表格行变色 */
    .el-table_row :nth-child(even) {
        background: #f9f9f9 !important;
    }
</style>