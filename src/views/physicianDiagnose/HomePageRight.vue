<template>
  <div class="rightside" id="rightDiv">
    <div class="content">
      <div>
        <span>医疗付费方式</span>
        <input type="text" />
        <span>健康卡号</span>
        <input type="text" />
        <span>住院次数</span>
        <input type="text" class="small" />
        <span>次</span>
        <span>病案号</span>
        <input type="text" />
        <span>姓名</span>
        <input type="text" class="middle" />
        <span>性别</span>
        <input id="sex" type="text" list="sexlist" class="middle" />
        <datalist id="sexlist">
          <option>男</option>
          <option>女</option>
        </datalist>
      </div>
      <div>
        <span>出生日期</span>
        <input type="text" class="small" />
        <span>年</span>
        <input type="text" class="middle" />
        <span>月</span>
        <input type="text" class="small" />
        <span>日</span>
        <span>年龄</span>
        <input type="text" class="small" />
        <span>岁</span>
        <span>国籍</span>
        <input type="text" />
        <span>(年龄不足1周岁的)</span>
        <span>年龄</span>
        <input type="text" class="small" />
        <span>月</span>
        <span>新生儿出生体重</span>
        <input type="text" class="middle" />
        <span>克</span>
      </div>
      <div>
        <span>出生地</span>
        <input type="text" class="middle" />
        <span>省（区、市）</span>
        <input type="text" class="small" />
        <span>市</span>
        <input type="text" class="middle" />
        <span>县</span>
        <span>籍贯</span>
        <input type="text" class="middle" />
        <span>省（区、市）</span>
        <input type="text" class="middle" />
        <span>市</span>
        <span>民族</span>
        <input type="text" class="middle" />
        <span>身份证号</span>
        <input type="text" />
      </div>
      <div>
        <span>职业</span>
        <input type="text" class="middle" />
        <span>婚姻</span>
        <input id="marry" type="text" list="marrylist" class="middle" />
        <datalist id="marrylist">
          <option>1.未婚</option>
          <option>2.已婚</option>
          <option>3.丧偶</option>
          <option>4.离婚</option>
          <option>其他</option>
        </datalist>
        <span>现住址</span>
        <input type="text" class="maxsize" />
        <span>电话</span>
        <input type="text" />
        <span>邮编</span>
        <input type="text" class="middle" />
        <span>户口地址</span>
        <input type="text" class="maxsize" />
      </div>
      <div>
        <span>邮编</span>
        <input type="text" class="middle" />
        <span>工作单位及地址</span>
        <input type="text" class="maxsize" />
        <span>单位电话</span>
        <input type="text" />
        <span>邮编</span>
        <input type="text" class="middle" />
        <span>联系人姓名</span>
        <input type="text" class="middle" />
        <span>关系</span>
        <input type="text" class="middle" />
      </div>
      <div>
        <span>地址</span>
        <input type="text" class="maxsize" />
        <span>电话</span>
        <input type="text" />
        <span>入院途径</span>
        <input id="way" type="text" list="waylist" />
        <datalist id="waylist">
          <option>1.急诊</option>
          <option>2.门诊</option>
          <option>3.其他医疗机构转入</option>
          <option>其他</option>
        </datalist>
        <span>入院时间</span>
        <input type="text" class="middle" />
        <span>年</span>
        <input type="text" class="middle" />
        <span>月</span>
        <input type="text" class="small" />
        <span>日</span>
        <input type="text" class="small" />
        <span>时</span>
      </div>
      <div>
        <span>入院科别</span>
        <input type="text" />
        <span>病房</span>
        <input type="text" />
        <span>转科科别</span>
        <input type="text" />
        <span>出院时间</span>
        <input type="text" class="middle" />
        <span>年</span>
        <input type="text" class="middle" />
        <span>月</span>
        <input type="text" class="small" />
        <span>日</span>
        <input type="text" class="small" />
        <span>时</span>
      </div>
      <div>
        <span>出院科别</span>
        <input type="text" />
        <span>病房</span>
        <input type="text" class="middle" />
        <span>实际住院</span>
        <input type="text" class="small" />
        <span>天</span>
        <span>门(急)诊诊断</span>
        <input type="text" class="mostsize" />
      </div>
      <div>
        <span>疾病编码</span>
        <input type="text" class="maxsize" />
      </div>
      <!-- 基本信息结束,出院诊断开始 -->
      <div>
        <table>
          <thead>
            <tr>
              <th>出院诊断</th>
              <th width="180">疾病编码</th>
              <th width="40">入院病情</th>
              <th>出院诊断</th>
              <th width="180">疾病编码</th>
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
              <td colspan="2">
                <input type="text" placeholder="入院病情" list="conditionlist" />
                <datalist id="conditionlist">
                  <option>1.有</option>
                  <option>2.临床未确定</option>
                  <option>3.情况不明</option>
                  <option>4.无</option>
                </datalist>
              </td>
              <td></td>
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
              <th>
                手术及
                操作编码
              </th>
              <th>
                手术及
                操作日期
              </th>
              <th>手术级别</th>
              <th>手术及操作名称</th>
              <th colspan="3">手术及操作医师</th>
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
                <input type="text" />
              </td>
              <td>术者</td>
              <td>Ⅰ助</td>
              <td>Ⅱ助</td>
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
        <input id="liyuan" type="text" list="liyuanlist" class="mostsize" />
        <datalist id="liyuanlist">
          <option>1.医嘱离院</option>
          <option>2.医嘱转院，拟接收医疗机构名称</option>
          <option>3.医嘱转社区卫生服务机构/乡镇卫生院，拟接收医疗机构名称：</option>
          <option>4.非医嘱离院</option>
          <option>5.死亡</option>
          <option>其他</option>
        </datalist>
        <span>是否有出院31天内再住院计划</span>
        <input id="zhuyuan" type="text" list="zhuyuanlist" />
        <datalist id="zhuyuanlist">
          <option>1.无</option>
          <option>2.有，目的</option>
        </datalist>
        <span>颅脑损伤患者昏迷时间:</span>
        <span>入院前</span>
        <input type="text" class="small" />
        <span>天</span>
        <input type="text" class="small" />
        <span>小时</span>
        <input type="text" class="small" />
        <span>分钟</span>
        <span>入院后</span>
        <input type="text" class="small" />
        <span>天</span>
        <input type="text" class="small" />
        <span>小时</span>
        <input type="text" class="small" />
        <span>分钟</span>
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
        <span>（15）医疗机构中药制剂费</span>
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
    <div class="btn">
      <button>住院首页</button>
      <button>中医院首页</button>
    </div>
    <!-- 需要的弹框 -->
    <div class="dialogbox"></div>
  </div>
</template>

<style lang="less" scoped>
.rightside {
  float: left;
  width: calc(100% - 168px - 50px - 40px);
  min-height: calc(100px);
  .content {
    color: #3c3c3c;
    width: calc(100% - 168px - 50px - 40px);
    .small {
      width: 40px;
    }
    .middle {
      width: 80px;
    }
    .maxsize {
      width: 220px;
    }
    .mostsize {
      width: 550px;
    }
    span {
      margin: 0 10px;
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
        border: 1px solid #3c3c3c;
        height: 40px;
        line-height: 40px;
      }
      td {
        border: 1px solid #3c3c3c;
        height: 30px;
      }
      input {
        width: 100%;
        border: 0;
      }
    }
  }
}
</style>