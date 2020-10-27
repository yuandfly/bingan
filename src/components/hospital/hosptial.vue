<template>
  <div class="test1">
    <div class="top"></div>
    <div class="left"></div>
    <div class="right">
      <div class="content">
        <!-- 基本信息开始 -->
        <div>
          <span>医疗付费方式</span>
          <input type="text" />
          <span>健康卡号</span>
          <input type="text" />
          <span>住院次数</span>
          <input type="text" />
          <span>病案号</span>
          <input type="text" />
        </div>
        <div>
          <span>姓名</span>
          <input type="text" />
          <span>性别</span>
          <!-- <input type="text" /> -->
          <input id="sex" type="text" list="sexlist" />
          <datalist id="sexlist">
            <option>男</option>
            <option>女</option>
          </datalist>
          <span>出生日期</span>
          <input type="text" />
          <span>年龄</span>
          <input type="text" />
          <span>国籍</span>
          <input type="text" />
        </div>
        <div>
          <span>(年龄不足1周岁的)</span>
          <input type="text" />
          <span>年龄</span>
          <input type="text" />
          <span>新生儿出生体重</span>
          <input type="text" />
        </div>
        <div>
          <span>出生地</span>
          <input type="text" />
          <span>籍贯</span>
          <input type="text" />
          <span>民族</span>
          <input type="text" />
        </div>
        <div>
          <span>身份证号</span>
          <input type="text" />
          <span>职业</span>
          <input type="text" />
          <span>婚姻</span>
          <!-- <input type="text" /> -->
          <input id="marry" type="text" list="marrylist" />
          <datalist id="marrylist">
            <option>1.未婚</option>
            <option>2.已婚</option>
            <option>3.丧偶</option>
            <option>4.离婚</option>
            <option>其他</option>
          </datalist>
        </div>
        <div>
          <span>现住址</span>
          <input type="text" />
          <span>电话</span>
          <input type="text" />
          <span>邮编</span>
          <input type="text" />
        </div>
        <div>
          <span>户口地址</span>
          <input type="text" />
          <span>邮编</span>
          <input type="text" />
        </div>
        <div>
          <span>工作单位及地址</span>
          <input type="text" />
          <span>单位电话</span>
          <input type="text" />
          <span>邮编</span>
          <input type="text" />
        </div>
        <div>
          <span>联系人姓名</span>
          <input type="text" />
          <span>关系</span>
          <input type="text" />
          <span>地址</span>
          <input type="text" />
          <span>电话</span>
          <input type="text" />
        </div>
        <div>
          <span>入院途径</span>
          <input id="way" type="text" list="waylist" />
          <datalist id="waylist">
            <option>1.急诊</option>
            <option>2.门诊</option>
            <option>3.其他医疗机构转入</option>
            <option>其他</option>
          </datalist>
        </div>
        <div>
          <span>入院时间</span>
          <input type="text" />
          <span>入院科别</span>
          <input type="text" />
          <span>病房</span>
          <input type="text" />
          <span>转科科别</span>
          <input type="text" />
        </div>
        <div>
          <span>出院时间</span>
          <input type="text" />
          <span>出院科别</span>
          <input type="text" />
          <span>病房</span>
          <input type="text" />
          <span>实际住院</span>
          <input type="text" />
        </div>
        <div>
          <span>门(急)诊诊断</span>
          <input type="text" />
          <span>疾病编码</span>
          <input type="text" />
        </div>
        <!-- 基本信息结束,出院诊断开始 -->
        <div>
          <table>
            <thead>
              <tr>
                <th>出院诊断</th>
                <th width="120">疾病编码</th>
                <th width="40">入院病情</th>
                <th>出院诊断</th>
                <th width="120">疾病编码</th>
                <th width="40">入院病情</th>
              </tr>
            </thead>
            <draggable element="tbody" :move="getdata" @update="datadragEnd">
              <tr>
                <td>主要诊断:</td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>其他诊断:</td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>其他诊断:</td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>其他诊断:</td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>

              <!-- 入院病情 -->
              <tr>
                <td colspan="2">入院病情:</td>
                <td>
                  <!-- 此处 -->
                  <!-- <input id="condition" type="text" list="conditionlist" />
              <datalist id="conditionlist">
                <option>1.有</option>
                <option>2.临床未确定</option>
                <option>3.情况不明</option>
                <option>4.无</option>
                  </datalist>-->
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
            </draggable>
          </table>
        </div>
        <!-- 出院诊断结束  损伤中毒开始 缺线条-->
        <div>
          <span>损伤、中毒的外部原因</span>
          <input type="text" />
          <span>疾病编码</span>
          <input type="text" />
        </div>
        <div>
          <span>病理诊断</span>
          <input type="text" />
          <span>疾病编码</span>
          <input type="text" />
        </div>
        <div>
          <input type="text" />
          <span>病理号</span>
          <input type="text" />
        </div>
        <div>
          <span>药物过敏</span>
          <input id="drug" type="text" list="druglist" />
          <datalist id="druglist">
            <option>1.无</option>
            <option>2.有，过敏药物：</option>
          </datalist>
          <span>死亡患者尸检</span>
          <input id="death" type="text" list="deathlist" />
          <datalist id="deathlist">
            <option>1.是</option>
            <option>2.否</option>
          </datalist>
        </div>
        <div>
          <span>血型</span>
          <input id="blood" type="text" list="bloodlist" />
          <datalist id="bloodlist">
            <option>1.A</option>
            <option>2.B</option>
            <option>3.O</option>
            <option>4.AB</option>
            <option>5.不详</option>
            <option>6.未查</option>
          </datalist>
          <span>Rh</span>
          <input id="Rh" type="text" list="Rhlist" />
          <datalist id="Rhlist">
            <option>1.阴</option>
            <option>2.阳</option>
            <option>3.不详</option>
            <option>4.未查</option>
          </datalist>
        </div>
        <div>
          <span>科主任</span>
          <input type="text" />
          <span>主任(副主任)医师</span>
          <input type="text" />
          <span>主治医师</span>
          <input type="text" />
          <span>住院医师</span>
          <input type="text" />
          <div>
            <span>责任护士</span>
            <input type="text" />
            <span>进修医师</span>
            <input type="text" />
            <span>实习医师</span>
            <input type="text" />
            <span>编码员</span>
            <input type="text" />
          </div>
        </div>
        <div>
          <span>病案质量</span>
          <input id="quality" type="text" list="qualitylist" />
          <datalist id="qualitylist">
            <option>1.甲</option>
            <option>2.乙</option>
            <option>3.丙</option>
          </datalist>
          <input type="text" />
          <span>质控医师</span>
          <input type="text" />
          <span>质控护士</span>
          <input type="text" />
          <span>质控日期</span>
          <input type="text" />
        </div>
        <!-- 手术操作开始 -->
        <div>
          <table>
            <thead>
              <tr>
                <th>手术及操作编码</th>
                <th>手术及操作日期</th>
                <th>手术级别</th>
                <th>手术及操作名称</th>
                <th>手术及操作医师</th>
                <th>切口愈合等级</th>
                <th>麻醉方式</th>
                <th>麻醉医师</th>
              </tr>
            </thead>
            <draggable element="tbody" :move="getdata" @update="datadragEnd">
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <span>手术</span>
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
            </draggable>
          </table>
        </div>
        <!-- 手术操作结束 离院方式开始 -->
        <div>
          <span>离院方式</span>
          <input id="liyuan" type="text" list="liyuanlist" />
          <datalist id="liyuanlist">
            <option>1.医嘱离院</option>
            <option>2.医嘱转院，拟接收医疗机构名称</option>
            <option>3.医嘱转社区卫生服务机构/乡镇卫生院，拟接收医疗机构名称：</option>
            <option>4.非医嘱离院</option>
            <option>5.死亡</option>
            <option>其他</option>
          </datalist>
          <span>是否有出院31天内再住院计划</span>
          <input id="liyuan" type="text" list="liyuanlist" />
          <datalist id="liyuanlist">
            <option>1.无</option>
            <option>2.有，目的</option>
          </datalist>
          <span>颅脑损伤患者昏迷时间:</span>
          <span>入院前</span>
          <input type="text" />
          <span>入院后</span>
          <input type="text" />
        </div>
        <!-- 住院费用开始  下面框框画成横线-->
        <div>
          <span>住院费用（元）：总费用</span>
          <input type="text" />
          (
          <span>自付金额：</span>
          <input type="text" />)
        </div>
        <div>
          <span>1.综合医疗服务类：（1）一般医疗服务费：</span>
          <input type="text" />
          <span>（2）一般治疗操作费：</span>
          <input type="text" />
          <span>（3）护理费：</span>
          <input type="text" />
          <span>（4）其他费用：</span>
          <input type="text" />
        </div>
        <div>
          <span>2.诊断类：（5）病理诊断费：</span>
          <input type="text" />
          <span>（6）实验室诊断费：</span>
          <input type="text" />
          <span>（7）影像学诊断费：</span>
          <input type="text" />
          <span>（8）临床诊断项目费：</span>
          <input type="text" />
        </div>
        <div>
          <span>3.治疗类：（9）非手术治疗项目费：</span>
          <input type="text" />
          <span>（10）手术治疗费：</span>
          <input type="text" />
        </div>
        <div>
          <span>4.康复类：（11）康复费：</span>
          <input type="text" />
        </div>
        <div>
          <span>5.中医类：（12）中医治疗费：</span>
          <input type="text" />
        </div>
        <div>
          <span>6.西药类：（13）西药费：</span>
          <input type="text" />
        </div>
        <div>
          <span>7.中药类：（14）中成药费：</span>
          <input type="text" />
          <span>（15）中草药费</span>
          <input type="text" />
        </div>
        <div>
          <span>8.血液和血液制品类：（16）血费：</span>
          <input type="text" />
          <span>（17）白蛋白类制品费：</span>
          <input type="text" />
          <span>（18）球蛋白类制品费：</span>
          <input type="text" />
          <span>（19）凝血因子类制品费：</span>
          <input type="text" />
          <span>（20）细胞因子类制品费：</span>
          <input type="text" />
        </div>
        <div>
          <span>9.耗材类：（21）检查用一次性医用材料费：</span>
          <input type="text" />
          <span>（22）治疗用一次性医用材料费：</span>
          <input type="text" />
          <span>（23）手术用一次性医用材料费：</span>
          <input type="text" />
        </div>
        <div>
          <span>其他类：（24）其他费：</span>
          <input type="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
      tablelist: [
        { id: 1, name: "活动消息1", time: "2018-08-25 14：54", num: "1000" },
        { id: 2, name: "公司消息2", time: "2018-08-25 14：54", num: "200" },
        { id: 3, name: "个人消息3", time: "2018-08-25 14：54", num: "30000" },
        { id: 4, name: "客户消息4", time: "2018-08-25 14：54", num: "40" }
      ]
    };
  },
  methods: {
    //拖动中与拖动结束
    getdata(evt) {
      console.log(evt.draggedContext.element.id);
    },
    datadragEnd(evt) {
      console.log("拖动前的索引 :" + evt.oldIndex);
      console.log("拖动后的索引 :" + evt.newIndex);
      console.log(this.tags);
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
.test1 {
  width: 1200px;
  // height: 100vh;
  margin: 0 auto;
  padding-top: 15px;
  padding-left: 5px;
  background-color: #fff;
  // background: pink;
  overflow: hidden;
  .top {
    height: 100px;
    background-color: pink;
    margin-bottom: 30px;
  }
  .left {
    //因为没有内容，所以暂时给一个高度  后面去掉 让内容撑开盒子
    width: 200px;
    height: 800px;
    background-color: skyblue;
    float: left;
  }
  .right {
    width: 960px;
    float: right;
    min-height: calc(500px); //这个最小高度也可以去掉，因为后面让内容撑开盒子
    .content {
      min-height: calc(10px);
      overflow: scroll;
      span {
        // margin: 0 10px;
      }
      input {
        vertical-align: bottom;
        height: 28px;
        outline: none;
        border: 0;
        border-bottom: 1px solid #ccc;
      }
      table {
        width: 100%;
        border: 1px solid #000000;
        th {
          border: 1px solid #000000;
          height: 40px;
          line-height: 40px;
        }
        td {
          border: 1px solid #000000;
          height: 30px;
        }
        input {
          width: 100%;
          border: 0;
        }
      }
    }
  }
}
</style>