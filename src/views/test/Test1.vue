<template>
  <div class="homepage clearfix">
     <!-- <v-distpicker @selected="onSelected"></v-distpicker> -->
    <!-- 上边区域 -->
    <div class="topside">
      <el-form :model="form" :inline="true">
        <el-form-item label="执行年度">
          <el-input v-model="form.time" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="科别">
          <el-select v-model="form.kebie" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="form.radius">
            <el-radio label="未审核"></el-radio>
            <el-radio label="已审核"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出院起止日期 ">
          <span>从</span>
          <el-date-picker v-model="value2" type="date" size="mini"></el-date-picker>
          <span>到</span>
          <el-date-picker v-model="value21" type="date" size="mini"></el-date-picker>
        </el-form-item>
        <el-form-item label="定位病案号">
          <el-input v-model="form.id" size="mini"></el-input>
        </el-form-item>
         <el-form-item >
           <el-button type="primary" size="mini" @click="queryBtn">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 左边盒子 -->
    <div class="leftside" id="leftDiv" v-on:dblclick="expendDiv">
      <!-- 表格 -->
      <!-- 111 -->
      <div class="tablebox">
        
        <el-table :data="tableData" border  v-loading="loading"  @row-contextmenu="QueryatientCode">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="baza00" label="病案号" width="120"></el-table-column>
          <el-table-column prop="baza02" label="姓名"></el-table-column>
          <el-table-column prop="kb" label="出院科别" width="120"></el-table-column>
          <el-table-column prop="BAZA27" label="出院日期" width="100"></el-table-column>
          <el-table-column prop="baza65" label="ICD10"></el-table-column>
          <el-table-column prop="dmmc" label="诊断名称" width="180"></el-table-column>
        </el-table>
         
      </div>
      <!-- 分页 -->
      <div class="pagebox">
       	<paging-toolbar :pager="pager" @change="queryBtn('condition')" />
      </div>
    </div>
    <!-- 右边盒子区域 -->
    <div class="rightside" id="rightDiv">
      <!-- 右边下面的 -->
      <div class="content">
        <!-- 基本信息开始 -->
          <el-form ref="form" :model="baza">
          <div>
          <span>医疗付费方式</span>
           <el-select v-model="baza.baza02"  style="width:120px" size="mini">
            <el-option label="1.城镇职工基本医疗保险" value="1"></el-option>
            <el-option label="2.城镇居民基本医疗保险" value="2"></el-option>
            <el-option label="3.新型农村合作医疗" value="3"></el-option>
            <el-option label="4.贫困救治" value="4"></el-option>
            <el-option label="5.商业医疗保险" value="5"></el-option>
            <el-option label="6.全公费" value="6"></el-option>
            <el-option label="7.全自费" value="7"></el-option>
            <el-option label="8.其他社会保险" value="8"></el-option>
            <el-option label="9.其他" value="9"></el-option>
          </el-select>
          <span>健康卡号</span>
          <input type="text"  v-model="baza.baza01"/>
          <span>住院次数</span>
          <input  
            v-model="baza.baza29"
            type="text"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          />
          <span>次</span>
          <span>病案号</span>
          <input type="text"  v-model="baza.baza00"/>
        </div>
        <div>
          <span>姓名</span>
          <input type="text"  v-model="baza.baza02" />
          <span>性别</span>
          <el-select v-model="baza.baza03"  style="width:100px" size="mini">
            <el-option label="1.男" value="1"></el-option>
            <el-option label="2.女" value="2"></el-option>
          </el-select>
          <span>出生日期</span>
          <!-- <input type="date"  class="chushengdata" v-model="baza.baza04.slice(0,10)" /> -->
          <span>年龄</span>
           <input 
               v-model="baza.baza06"
            type="text" class="small" 
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          />
          <span>岁</span>
          <span>国籍</span>
          <input type="text"  v-model="baza.nationality"/>
        </div>
        <div v-if="bz=='D'|| bz=='M'">
          <span>(年龄不足1周岁的)</span>
          <span>年龄</span>
            <input  id="smallage"  
            type="text"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          />
          <span>月</span>
          <span >新生儿出生体重</span>
            <input id="xianshengtizhong"
            type="text"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          />
          <span>克</span>
          <span>新生儿入院体重</span>
          <!-- <input type="text" class="ruyuan" /> -->
            <input class="ruyuan"  id="xinshengruyuan"
            type="text"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          />
          <span>克</span>
        </div>
        <div>
          <span>出生地</span>
          <input type="text"   v-model="baza.birthplace"/>
          <span>省（区、市）</span>
          <input type="text" class="middle" />
          <span>市</span>
          <input type="text" class="middle" />
          <span>县</span>
          <span>籍贯</span>
          <input type="text"  v-model="baza.birthplace"/>
          <span>省（区、市）</span>
          <input type="text" class="middle" />
          <span>市</span>
          <span>民族</span>
          <input type="text" class="mingzu" v-model="baza.nation" />
        </div>
        <div>
          <span>身份证号</span>
          <input type="text" class="shenfenzheng"  v-model="baza.baza05"/>
          <span>职业</span>
          <input type="text" class="zhiye"  v-model="baza.profession"/>
          <span>婚姻</span>
           <el-select v-model="baza.baza07"  style="width:100px" size="mini">
            <el-option label="1.未婚" value="1"></el-option>
            <el-option label="2.已婚" value="2"></el-option>
            <el-option label="3.丧偶" value="3"></el-option>
            <el-option label="4.离婚" value="4"></el-option>
            <el-option label="9.其他" value="9"></el-option>
          </el-select>
        </div>
        <div>
          <span>现住址</span>
          <input type="text" class="xianzhuzhi"  v-model="baza.bazaf7"/>
          <span>电话</span>
            <input 
            type="text" v-model="baza.bazaa5"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          />
          <span>邮编</span>
           <input   v-model="baza.bazaa6"
            type="text"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          />
        </div>
        <div>
          <span>户口地址</span>
          <input type="text" class="hukoudizhi"   v-model="baza.birthplace"/>
          <span>邮编</span>
         <input 
            type="text"  v-model="baza.bazaa6"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          />
        </div>
        <div>
          <span>工作单位及地址</span>
          <input type="text" class="danweidizhi" v-model="baza.bazaa3"/>
          <span>单位电话</span>
            <input  v-model="baza.baza11"
            type="text"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          />
          <span>邮编</span>
           <input  v-model="baza.bazaa4"
            type="text"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          />
        </div>
        <div>
          <span>联系人姓名</span>
          <input type="text"  v-model="baza.baza15" />
          <span>关系</span>
           <el-select v-model="baza.baza16"  style="width:100px" size="mini">
            <el-option label="0.本人" value="0"></el-option>
            <el-option label="1.配偶" value="1"></el-option>
            <el-option label="2.子" value="2"></el-option>
            <el-option label="3.女" value="3"></el-option>
            <el-option label="4.孙子女" value="4"></el-option>
            <el-option label="5.父母" value="5"></el-option>
            <el-option label="6.祖父母" value="6"></el-option>
            <el-option label="7.兄弟姐妹" value="7"></el-option>
            <el-option label="8.同事同学" value="8"></el-option>
            <el-option label="9.其他" value="9"></el-option>
          </el-select>
          <span>地址</span>
          <input type="text" class="Address"  v-model="baza.baza17"/>
          <span>电话</span>
          <input type="text"  v-model="baza.baza19" />
        </div>
        <div>
          <span>入院途径</span>
            <el-select v-model="baza.baza56"  style="width:100px" size="mini">
            <el-option label="1.急诊" value="1"></el-option>
            <el-option label="2.门诊" value="2"></el-option>
            <el-option label="3.其他医疗机构转入" value="3"></el-option>
            <el-option label="其他" value="4"></el-option>
          </el-select>
        </div>
        <div v-if="ifZhongyi">
          <span>治疗类别</span>
          <el-select v-model="baza.baza55"  style="width:120px" size="mini">
            <el-option label="1.中医（ 1.1 中医   1.2民族医)" value="1"></el-option>
            <el-option label="2.中西医" value="2"></el-option>
            <el-option label="3.西医" value="3"></el-option>
          </el-select>
        </div>
        <div>
          <span>入院时间</span>
          <!-- <input type="date" class="ruyuanshijian"  v-model="baza.baza24.slice(0,10)"/> -->
          <span>入院科别</span>
          <input type="text"  v-model="baza.hospitalization"/>
          <span>病房</span>
          <input type="text"  v-model="baza.hospitalizationwards" />
          <span>转科科别</span>
          <input type="text" class="zhuanyekebie"   v-model="baza.leavehospital"/>
        </div>
        <div>
          <span>出院时间</span>
          <!-- <input type="date" class="chuyuantime"  v-model="baza.baza27.slice(0,10)"/> -->
          <span>出院科别</span>
          <input type="text"  v-model="baza.leavehospital"/>
          <span>病房</span>
          <input type="text" v-model="baza.leavehospitalwards"/>
          <span>实际住院</span>
            <input  class="shijizhuyuan"  v-model="baza.baza29"
            type="text"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          />
          <span>天</span>
        </div>
        <div v-if="ifZhongyi">
          <span>门(急)诊诊断(中医诊断)</span>
          <input type="text" class="menjizhen" readonly="readonly"  v-model="baza.baf902name"/>
          <span>疾病编码</span>
          <input type="text" class="maxsize" readonly="readonly"  v-model="baza.baf902"/>
        </div>
        <!-- 判断是否是中医 此处要调用接口 -->
        <div>
          <span>门(急)诊诊断（西医诊断）</span>
          <input type="text" class="menjizhen"  v-model="baza.baza36name"/>
          <span>疾病编码</span>
          <input type="text" class="maxsize"  v-model="baza.bazad9"/>
        </div>
        <div v-if="ifZhongyi">
          <span>实施临床路径</span>
            <el-select v-model="baza.bazag1"   size="mini" class="linchuanlujinhg">
            <el-option label="中医" value="1"></el-option>
            <el-option label="西医" value="2"></el-option>
            <el-option label="否" value="3"></el-option>
          </el-select>
          <span>使用医疗机构中药制剂</span>
            <el-select v-model="baza.baza70"   size="mini" class="yiliaoyaoji">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="2"></el-option>
          </el-select>
        </div>
        <div v-if="ifZhongyi">
          <span>使用中医诊疗设备</span>
          <el-select v-model="baza.bazag2"   size="mini" class="zhongyishebei">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="2"></el-option>
          </el-select>
          <span>使用中医诊疗技术</span>
            <el-select v-model="baza.baza71"   size="mini" class="zhongyishebei">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="2"></el-option>
          </el-select>
          <span>辨证施护</span>
           <el-select v-model="baza.bazag3"   size="mini" class="zhongyishebei">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="2"></el-option>
          </el-select>
        </div>
     </el-form>
        <!-- 基本信息结束,出院诊断开始 -->
      <div>
          <table style="height:375px;">
            <thead>
              <tr>
                <th>
                  <span v-if="ifZhongyi" class="spanZD">出院中医诊断</span>
                  <span v-else class="spanZD">出院诊断</span>
                </th>
                <th>疾病编码</th>
                <th>入院病情</th>
                <th> <span v-if="ifZhongyi" class="spanZD">出院西医诊断</span>
                  <span v-else class="spanZD">出院诊断</span>
                </th></th>
                <th>疾病编码</th>
                <th>入院病情</th>
              </tr>
            </thead>
            <draggable element="tbody" :move="getdata" @update="datadragEnd" id="tbody_id">
              <tr>
                <td>主要诊断:</td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)" id="mainjibingCode" />
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>主要诊断:</td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)" id="qitazhenduan" />
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)" />
                </td>
              </tr>
              <!-- 此处添加了40条数据 -->
              <tr v-for="i in 40" :key="i">
                <td>其他诊断:</td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>其他诊断:</td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
              </tr>
              <tr>
               <td>其他诊断:</td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)" />
                </td>
                  <td>其他诊断:</td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
              </tr>
              <tr>
                <td>其他诊断:</td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
               <td>其他诊断:</td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
              </tr>
              <tr>
                <td>其他诊断:</td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)" />
                </td>
                <td>其他诊断:</td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)" />
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)" />
                </td>
              </tr>
              <tr>
               <td>其他诊断:</td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>其他诊断:</td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)" />
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
              </tr>
              <tr>
                <td>其他诊断:</td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>其他诊断:</td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)" />
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
              </tr>
            </draggable>
          </table>
        </div>
          <!-- 开关 -->
        <div>
          <el-switch
             v-model="switchBtn"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="switchChange">
             </el-switch>
        </div>
        <!-- 出院诊断结束  损伤中毒开始 缺线条-->
        <div>
          <span>损伤、中毒的外部原因</span>
          <input type="text" class="zhongduwaiyin" id="zhongduwaiyin" v-model="baza.baza79"/>
          <span>疾病编码</span>
          <input type="text" id="jibingCode" />
        </div>
        <div>
          <span>病理诊断</span>
          <input type="text" class="binglizhenduan" id="binglizhenduan"/>
          <span>疾病编码</span>
          <input type="text" id="jibingbianma"/>
        </div>
        <div>
          <input type="text" class="bilispace" />
          <span>病理号</span>
          <input type="text" id="binglihao" />
        </div>
        <div>
          <span>药物过敏</span>
           <el-select v-model="baza.baza5"  class="yaowuguomin" size="mini">
            <el-option label="1.无" value="1"></el-option>
            <el-option label="2.有,过敏药物" value="2"></el-option>
          </el-select>
          <span>死亡患者尸检</span>
            <el-select v-model="baza.bazace"   size="mini">
            <el-option label="1.是" value="1"></el-option>
            <el-option label="2.否" value="2"></el-option>
          </el-select>
        </div>
        <div>
          <span>血型</span>
            <el-select v-model="baza.baza45"  size="mini" class="xuexing">
            <el-option label="未知" value="0"></el-option>
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
            <el-option label="O" value="3"></el-option>
            <el-option label="AB" value="4"></el-option>
            <el-option label="不详" value="5"></el-option>
            <el-option label="未查" value="6"></el-option>
          </el-select>
          <span>Rh</span>
          <el-select v-model="baza.bazac5"  size="mini" class="Rh">
            <el-option label="1.阴" value="1"></el-option>
            <el-option label="2.阳" value="2"></el-option>
            <el-option label="3.不详" value="3"></el-option>
            <el-option label="4.AB" value="4"></el-option>
            <el-option label="5.未查" value="5"></el-option>
            <el-option label="6.未查" value="6"></el-option>
          </el-select>
        </div>
        <div>
          <span>科主任</span>
          <input type="text"  v-model="baza.bazab1"/>
          <span>主任(副主任)医师</span>
          <input type="text"  v-model="baza.baza32"/>
          <span>主治医师</span>
          <input type="text"  v-model="baza.baza33"/>
          <span>住院医师</span>
          <input type="text" class="zhuyuanyishi"  v-model="baza.baza34"/>
          <div>
            <span>责任护士</span>
            <input type="text" v-model="baza.bazabf"/>
            <span>进修医师</span>
            <input type="text"  v-model="baza.bazab2"/>
            <span>实习医师</span>
            <input type="text"  v-model="baza.bazab4"/>
            <span>编码员</span>
            <input type="text" class="bianmayuan" v-model="baza.baza59"/>
          </div>
        </div>
        <div>
          <span>病案质量</span>
            <el-select v-model="baza.baza51"  class="binganzl" size="mini">
            <el-option label="1.甲" value="1"></el-option>
            <el-option label="2.乙" value="2"></el-option>
            <el-option label="3.丙" value="3"></el-option>
          </el-select>
          <span>质控医师</span>
          <input type="text" v-model="baza.bazab5"/>
          <span>质控护士</span>
          <input type="text"  v-model="baza.baza69"/>
          <span>质控日期</span>
          <!-- <input type="date" id="zhikongriqi"/> -->
        </div>
        
       
          <!-- 手术操作开始 -->
        <div>
          <table class="tabletwo">
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
                <th colspan="3">
                  <template>
                    <div>
                      <div class="toppppp" style="border-bottom:1px solid #3c3c3c;">手术及操作医师</div>
                      <div class="bottommm" style="display:flex;">
                        <div style="flex:1;border-right:1px solid #3c3c3c;">术者</div>
                        <div style="flex:1;">Ⅰ助</div>
                        <div style="flex:1;border-left:1px solid #3c3c3c;">Ⅱ助</div>
                      </div>
                    </div>
                  </template>
                </th>
                <th>切口愈合等级</th>
                <th>麻醉方式</th>
                <th>麻醉医师</th>
              </tr>
            </thead>
            <draggable
              element="tbody"
              :move="getdata"
              @update="datadragEnd"
              id="tbody_idtwo"
              class="tbodyTwo"
            >
              <tr>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)" id="coazuoCode"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)" id="caozuoDate"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)" id="shoushujibie"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)" id="shoushuname"/>
                </td>
                <td><input type="text"  @keyup.32="mainDiag($event)" id="shuzhe"/></td>
                <td><input type="text"  @keyup.32="mainDiag($event)" id="yizhu"/></td>
                <td><input type="text"  @keyup.32="mainDiag($event)" id="erzhu"/></td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)" id="qiekoudengji" />
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)" id="mazuifangshi"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)" id="mazuiyishi"/>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text"@keyup.32="mainDiag($event)" />
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
                <td>
                  <input type="text"  @keyup.32="mainDiag($event)"/>
                </td>
              </tr>
            </draggable>
          </table>
        </div>
        <!-- 手术操作结束 离院方式开始 -->

        <div>
          <span>离院方式</span>
            <el-select v-model="baza.bazaf8"  class="liyuanfangshi" size="mini">
            <el-option label="1.医嘱离院" value="1"></el-option>
            <el-option label="2.医嘱转院，拟接收医疗机构名称" value="2"></el-option>
            <el-option label="3.医嘱转社区卫生服务机构/乡镇卫生院，拟接收医疗机构名称：" value="3"></el-option>
            <el-option label="4.非医嘱离院" value="4"></el-option>
            <el-option label="5.死亡" value="5"></el-option>
            <el-option label="其他" value="6"></el-option>
          </el-select>
          <div>
            <span>是否有出院31天内再住院计划</span>
            <el-select v-model="baza.bazad5"  class="againzhuyuan" size="mini">
            <el-option label="1.无" value="1"></el-option>
            <el-option label="2.有，目的" value="2"></el-option>
          </el-select>
          </div>
          <div>
            <span>颅脑损伤患者昏迷时间:</span>
            <span>入院前</span>
            <!-- <input type="text" class="small"  id="hunmitime" /> -->
            <span>天</span>
            <input type="text" class="small" />
            <span>小时</span>
            <input type="text" class="small" />
            <span>分钟</span>
            <span>入院后</span>
            <!-- <input type="text" class="small"  id="ruyuanaftertime"/> -->
            <span>天</span>
            <input type="text" class="small" />
            <span>小时</span>
            <input type="text" class="small" />
            <span>分钟</span>
          </div>
        </div>
      
        <!-- 住院费用开始 -->
        
          <div>
          <span>住院费用（元）：总费用</span>
          <input type="text"  v-model="baf6.baf601"/>
          (
          <span>自付金额：</span>
          <input type="text"  v-model="baf6.baf602"/>)
        </div>
        <div>
          <span>1.综合医疗服务类：（1）一般医疗服务费：</span>
          <input type="text" class="zonghe" v-model="baf6.baf603"/>
          <span>（2）一般治疗操作费：</span>
          <input type="text" class="zonghe"  v-model="baf6.baf604" />
          <span>（3）护理费：</span>
          <input type="text" class="zonghe"   v-model="baf6.baf605"/>
        </div>
        <div>
          <span>（4）其他费用：</span>
          <input type="text"  v-model="baf6.baf606"/>
        </div>
        <div>
          <span>2.诊断类：（5）病理诊断费：</span>
          <input type="text"  v-model="baf6.baf607"/>
          <span>（6）实验室诊断费：</span>
          <input type="text"  v-model="baf6.baf608" />
          <span>（7）影像学诊断费：</span>
          <input type="text" class="yingxiangpay"  v-model="baf6.baf609" />
        </div>
        <div>
          <span>（8）临床诊断项目费：</span>
          <input type="text"  v-model="baf6.baf610"/>
        </div>
        <div>
          <span>3.治疗类：（9）非手术治疗项目费：</span>
          <input type="text"  v-model="baf6.baf611" />
            <span>  （临床物理治疗费：</span>
          <input type="text" v-model="baf6.baf612"/>
        </div>
        <div>
          <span>（10）手术治疗费：</span>
          <input type="text"  v-model="baf6.baf613"/>
              <span>（麻醉费：</span>
          <input type="text"   v-model="baf6.baf614" />
              <span>手术费：</span>
          <input type="text"  v-model="baf6.baf615"/>)
        </div>
        <div>
          <span>4.康复类：（11）康复费：</span>
          <input type="text" id="kangfufei" v-model="baf6.baf616" />
        </div>
        <div>
          <span>5.中医类：（12）中医治疗费：</span>
          <input type="text"  v-model="baf6.baf617" />
        </div>
        <div>
          <span>6.西药类：（13）西药费：</span>
          <input type="text"  v-model="baf6.baf618"/>
               <span>（抗菌药物费用：</span>
          <input type="text"   v-model="baf6.baf619"/>)
        </div>
        <div>
          <span>7.中药类：（14）中成药费：</span>
          <input type="text"  v-model="baf6.baf620"/>
          <span>（15）中草药费</span>
          <input type="text" v-model="baf6.baf621"/>
        </div>
        <div>
          <span>8.血液和血液制品类：（16）血费：</span>
          <input type="text" class="xiefei"  v-model="baf6.baf622"/>
          <span>（17）白蛋白类制品费：</span>
          <input type="text" class="xiefei"  v-model="baf6.baf623"/>
          <span>（18）球蛋白类制品费：</span>
          <input type="text" class="xiefei"  v-model="baf6.baf624" />
        </div>
        <div>
          <span>（19）凝血因子类制品费：</span>
          <input type="text"   v-model="baf6.baf625"/>
          <span>（20）细胞因子类制品费：</span>
          <input type="text"  v-model="baf6.baf626" />
        </div>
        <div>
          <span>9.耗材类：（21）检查用一次性医用材料费：</span>
          <input type="text"   v-model="baf6.baf627"/>
          <span>（22）治疗用一次性医用材料费：</span>
          <input type="text"  v-model="baf6.baf628"/>
        </div>
        <div>
          <span>（23）手术用一次性医用材料费：</span>
          <input type="text"  v-model="baf6.baf629"/>
          <span>其他类：（24）其他费：</span>
          <input type="text"  v-model="baf6.baf630"/>
        </div>
        <!-- 需要的弹框 以及里面的内容  第一个弹框-->
      <div class="dialogbox" >
        <el-dialog @keydown.113.native="FTwoExpend($event)"
          title="代码录入窗口"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose"
        >
          <el-form :model="form" :inline="true">
            <el-form-item label="拼音码" v-if="ifpinyin">
              <el-input v-model="formhidden.pingyinma"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="formhidden.mingcheng"></el-input>
            </el-form-item>
          </el-form>
          <el-table :data="tableDatatwo" border>
            <el-table-column prop="pinyinma" label="拼音码"></el-table-column>
            <el-table-column prop="mingcheng" label="名称"></el-table-column>
          </el-table>
          <!-- <span>这是一段信息</span> -->
          <span slot="footer" class="dialog-footer" >
            <el-button @click="dialogVisible = false" >取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 开关控制的弹框区域 -->
      <div class="dialogboxtwo">
         <el-dialog
          title=""
          :visible.sync="dialogVisibletwo"
          :before-close="handleClose"
        >
        <!-- 出院诊断展示信息 -->
         <table style="height:365px;">
            <thead>
              <tr>
                <th>
                  <span v-if="ifZhongyi" class="spanZD">出院中医诊断</span>
                  <span v-else class="spanZD">出院诊断</span>
                </th>
                <th>疾病编码</th>
                <th>入院病情</th>
                <th> <span v-if="ifZhongyi" class="spanZD">出院西医诊断</span>
                  <span v-else class="spanZD">出院诊断</span>
                </th></th>
                <th>疾病编码</th>
                <th>入院病情</th>
              </tr>
            </thead>
            <draggable element="tbody" :move="getdata" @update="datadragEnd" id="tbody_id">
              <tr>
                <td>主要诊断:</td>
                <td>
                  <input type="text" readonly="readonly" />
                </td>
                <td>
                  <input type="text" readonly="readonly" />
                </td>
                <td>其他诊断:</td>
                <td>
                  <input type="text" readonly="readonly"  />
                </td>
                <td>
                  <input type="text" readonly="readonly"  />
                </td>
              </tr>
              <!-- 此处添加了40条数据 -->
              <tr v-for="i in 40" :key="i">
                <td>其他诊断:</td>
                <td>
                  <input type="text" readonly="readonly" />
                </td>
                <td>
                  <input type="text" readonly="readonly" />
                </td>
                <td>其他诊断:</td>
                <td>
                  <input type="text" readonly="readonly" />
                </td>
                <td>
                  <input type="text"  readonly="readonly" />
                </td>
              </tr>
              <tr>
               <td>其他诊断:</td>
                <td>
                  <input type="text"  readonly="readonly" />
                </td>
                <td>
                  <input type="text" readonly="readonly"  />
                </td>
                  <td>其他诊断:</td>
                <td>
                  <input type="text" readonly="readonly" />
                </td>
                <td>
                  <input type="text" readonly="readonly" />
                </td>
              </tr>
              <tr>
                <td>其他诊断:</td>
                <td>
                  <input type="text" readonly="readonly" />
                </td>
                <td>
                  <input type="text" readonly="readonly" />
                </td>
               <td>其他诊断:</td>
                <td>
                  <input type="text" readonly="readonly" />
                </td>
                <td>
                  <input type="text"  readonly="readonly" />
                </td>
              </tr>
              <tr>
                <td>其他诊断:</td>
                <td>
                  <input type="text"  readonly="readonly" />
                </td>
                <td>
                  <input type="text" readonly="readonly"  />
                </td>
                <td>其他诊断:</td>
                <td>
                  <input type="text" readonly="readonly"  />
                </td>
                <td>
                  <input type="text" readonly="readonly" />
                </td>
              </tr>
              <tr>
               <td>其他诊断:</td>
                <td>
                  <input type="text"  readonly="readonly"/>
                </td>
                <td>
                  <input type="text"  readonly="readonly"/>
                </td>
                <td>其他诊断:</td>
                <td>
                  <input type="text" readonly="readonly" />
                </td>
                <td>
                  <input type="text"   readonly="readonly"/>
                </td>
              </tr>
              <tr>
                <td>其他诊断:</td>
                <td>
                  <input type="text"  readonly="readonly"/>
                </td>
                <td>
                  <input type="text"  readonly="readonly"/>
                </td>
                <td>其他诊断:</td>
                <td>
                  <input type="text" readonly="readonly" />
                </td>
                <td>
                  <input type="text" readonly="readonly"/>
                </td>
              </tr>
            </draggable>
          </table>
        </el-dialog>
      </div>
      
        <!-- 编辑信息按钮 @click="editMessage" -->
        <div>
          <el-button type="primary" round  size="mini" @click="addMessage"> 新增信息</el-button>
          <el-button type="info" round  size="mini" > 编辑信息</el-button>
          </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import {showOkMsg, showErrorMsg} from "@/utils";
//,NewAddHomePage  这个是新增病案首页   EditHomepage编辑首页
import {SearchHomePage,QueryPatient,NewAddHomePage,EditHomepage} from "@/api";
import draggable from "vuedraggable";
import VDistpicker from 'v-distpicker'
import PagingToolbar from '../../components/toolbar/paging';
export default {
  components: {
    draggable,
    VDistpicker,
    PagingToolbar
  },
  data() {
    return {
      baf6:{},
      baza:{},
      bz:"",
      loading:true,
      pager: {
					total: 0, // 总条数
					page: 1, // 当前页
					rows: 10 // 每页显示多少条
				},
      ifpinyin:true,//判断是否是拼音
      switchBtn:false,
      ifZhongyi:true,//判断是否是中医或者是西医
      tableDatatwo: [
        { pinyinma: "HLYY010HIQQQ", mingcheng: "化疗后恢复期" },
        { pinyinma: "HLYY010HIQQQ", mingcheng: "霍乱接触者" },
        { pinyinma: "HLYY010HIQQQ", mingcheng: "霍乱" },
        { pinyinma: "HLYY010HIQQQ", mingcheng: "黄痰" },
        { pinyinma: "HLYY010HIQQQ", mingcheng: "霍乱轻型" },
        { pinyinma: "HLYY010HIQQQ", mingcheng: "寒冷性皮炎" }
      ],
      formhidden: {
        pingyinma: "HLYY010HI",
        mingcheng: "霍乱，由于01群霍乱弧菌"
      },
      tablelist: [
        { id: 1, name: "活动消息1", time: "2018-08-25 14：54", num: "1000" },
        { id: 2, name: "公司消息2", time: "2018-08-25 14：54", num: "200" },
        { id: 3, name: "个人消息3", time: "2018-08-25 14：54", num: "30000" },
        { id: 4, name: "客户消息4", time: "2018-08-25 14：54", num: "40" }
      ],
      // 是否展开
      isExpend: false,
      options: [
        {
          value: "选项1",
          label: "儿科"
        },
        {
          value: "选项2",
          label: "肛肠科"
        },
        {
          value: "选项3",
          label: "老年病科(光谷)"
        },
        {
          value: "选项4",
          label: "针灸科"
        },
        {
          value: "选项5",
          label: "产科(光谷)"
        }
      ],
      dialogVisible: false,
      dialogVisibletwo:false,
      valuetxt: "其他",
      valuetxt2: "1091526",
      valuetxt3: "1",
      value2: "2019-01-01",
      value21: "2019-12-31",
      // value22: "2019-12-18",
      currentPage4: 1,
      form: {
        // time: "2019",
        // kebie: "",
        // date: "2011年10月5日",
        // id: "0015112510",
        // radius: "未审核",
        // delivery: false
      },
      tableData: [],
    };
  },
  	created() {
			this.queryBtn();//调用查询病案首页接口
		},
  methods: {
    queryBtn(condition){//1.查询病案首页
    let formInitData = {}
				if (condition === undefined) { // 条件查询
					sessionStorage.setItem('formInit', JSON.stringify(this.form))
					this.form.page = 1
					this.form.limit = this.pager.rows
					formInitData = this.form
				} else { // 分页查询
					let formInit = JSON.parse(sessionStorage.getItem('formInit'))
					if (JSON.stringify(formInit) !== '{}') {
						formInitData = formInit
					}
					formInitData.page = this.pager.page
					formInitData.limit = this.pager.rows
				}
    SearchHomePage(formInitData).then(res => {
					this.pager.page = formInitData.page
					this.pager.total = res.data.total
          this.tableData = res.data.content
          this.loading=false;
				}).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    QueryatientCode(row){//2.根据病案号查询 组件自带的参数
    QueryPatient(row.baza00).then(res=>{
      if(res.code==0){
          // debugger
        // console.log(res.data);
        this.baza=res.data.bazaDO;
        this.baf6=res.data.baf6DO;

        //111  
        //---------------------------出院诊断   暂时这样------------------------------------


          document.getElementById("qitazhenduan").value=res.data.bazaDO.westernmedicine;// 西医主要诊断 
        //document.getElementById("qitazhenduano").value=res.data.bafDO.baf103name;// 西医其他诊断
                    //从损伤开始的外部原因开始  res后面的字段要判断是啥
        //  document.getElementById("jibingCode").value=res.data.baf4DO.baf405;// （sun）疾病编码
        //  document.getElementById("binglizhenduan").value=res.data.baf4DO.baf405;//  病理诊断
        //  document.getElementById("jibingbianma").value=res.data.baf4DO.baf405;// 疾病编码
        //  document.getElementById("binglihao").value=res.data.baf4DO.baf405;// 病理号

           //改      now就是现在
        //  document.getElementById("zhikongriqi").value=res.data.bazaDO.bazab6.slice(0,10);// 质控日期     时间？？？？？？？



      //-----------------------手术操作字段  baf4DO  暂时这样，还要调整  -------------------------------
     if(res.data.bazaDO.baza53=="1"){
        for(var j=0,len=res.data.baf4DO.length;j<len;j++){    //临时变量将数组存储起来
          //  console.log(j);
          //如果是手术，显示手术情况
         document.getElementById("coazuoCode").value=res.data.baf4DO[j].baf405;// 手术及操作编码
         document.getElementById("caozuoDate").value=res.data.baf4DO[j].baf411.slice(0,10);//手术及操作日期
         document.getElementById("shoushujibie").value=res.data.baf4DO[j].baf404;//手术级别
         document.getElementById("shoushuname").value=res.data.baf4DO[j].baf405name;//  手术及操作名称
         document.getElementById("shuzhe").value=res.data.baf4DO[j].baf409;//   术者
         document.getElementById("yizhu").value=res.data.baf4DO[j].baf414;// Ⅰ助
         document.getElementById("erzhu").value=res.data.baf4DO[j].baf415;//Ⅱ助
         document.getElementById("qiekoudengji").value=res.data.baf4DO[j].baf413;//切口愈合等级
         document.getElementById("mazuifangshi").value=res.data.baf4DO[j].baf410;// 麻醉方式
         document.getElementById("mazuiyishi").value=res.data.baf4DO[j].baf416;// 麻醉医师
       }
      } 
      // document.getElementById("ruyuanaftertime").value=res.data.bazaDO.bazad8;//  入院后颅脑损伤患者昏迷时间 ？
      // document.getElementById("hunmitime").value=res.data.bazaDO.bazad7;//  入院前颅脑损伤患者昏迷时间  ?

      //开始修改
      // document.getElementById("liyuan").value=res.data.bazaDO.bazaf8;// 离院方式
      // document.getElementById("zhuyuan").value=res.data.bazaDO.bazad5;// 是否有出院31天内再住院计划
      //------------------------ 住院费用字段  费用：Baf6DO   还要对费用进行判断 这个在后面----------------------------
        //  document.getElementById("zongfeiyong").value=res.data.baf6DO.baf601;// 住院费用（元）：总费用
        //  document.getElementById("zifumoney").value=res.data.baf6DO.baf602;//   自付金额：
        //  document.getElementById("yibanfuwufei").value=res.data.baf6DO.baf603;//   1.综合医疗服务类：（1）一般医疗服务费：
        //  document.getElementById("yibanzhiliaofei").value=res.data.baf6DO.baf604;// （2）一般治疗操作费：
        //  document.getElementById("hulifei").value=res.data.baf6DO.baf605;// （3）护理费：
        //  document.getElementById("qitafeiyong").value=res.data.baf6DO.baf606;// (4）其他费用
        //  document.getElementById("binglizhengduanfei").value=res.data.baf6DO.baf607;//  2.诊断类：（5）病理诊断费
        //  document.getElementById("shiyanshifei").value=res.data.baf6DO.baf608;// （6）实验室诊断费：
        //  document.getElementById("yingxiangpay").value=res.data.baf6DO.baf609;// （7）影像学诊断费：
        //  document.getElementById("linchuanpay").value=res.data.baf6DO.baf610;// （8）临床诊断项目费：
        //  document.getElementById("shoushupay").value=res.data.baf6DO.baf611;;//  3.治疗类：（9）非手术治疗项目费：
        //  document.getElementById("lichuanwulipay").value=res.data.baf6DO.baf612;;//  （临床物理治疗费)：
        //  document.getElementById("shoushuzhiliao").value=res.data.baf6DO.baf613;//   （10）手术治疗费
        //  document.getElementById("mazuipay").value=res.data.baf6DO.baf614;//   （麻醉费：
        //  document.getElementById("ssfei").value=res.data.baf6DO.baf615;//   手术费：
        //  document.getElementById("kangfufei").value=res.data.baf6DO.baf616;//     4.康复类：（11）康复费：
        //  document.getElementById("zhongyipay").value=res.data.baf6DO.baf617;// 5.中医类：（12）中医治疗费
        //  document.getElementById("xiyaopay").value=res.data.baf6DO.baf618;//   6.西药类：（13）西药费：
        //  document.getElementById("kangjunyaopay").value=res.data.baf6DO.baf619;//   6.西药类：（13）西药费：
        //  document.getElementById("zhongchengyao").value=res.data.baf6DO.baf620;//  7.中药类：（14）中成药费
        //  document.getElementById("zhongcaoyaopay").value=res.data.baf6DO.baf621;// （15）中草药费
        //  document.getElementById("xiepay").value=res.data.baf6DO.baf622;//   8.血液和血液制品类：（16）血费
        //  document.getElementById("baidanbaipay").value=res.data.baf6DO.baf623;// （17）白蛋白类制品费
        //  document.getElementById("qiudanbaipay").value=res.data.baf6DO.baf624;//  （18）球蛋白类制品费：
        //  document.getElementById("linxiepay").value=res.data.baf6DO.baf625;// (19）凝血因子类制品费'
        //  document.getElementById("xibaoyinzipay").value=res.data.baf6DO.baf626;//（20）细胞因子类制品费
        //  document.getElementById("oncecailiaopay").value=res.data.baf6DO.baf627;//     9.耗材类：（21）检查用一次性医用材料费：
        //  document.getElementById("zhiliaooncepay").value=res.data.baf6DO.baf628;// （22）治疗用一次性医用材料费：
        //  document.getElementById("ssusepay").value=res.data.baf6DO.baf629;// （23）手术用一次性医用材料费：
        //  document.getElementById("qitafei").value=res.data.baf6DO.baf630;//   其他类：（24）其他费
         
      }else{
      }
    })
    },
    addMessage(){
    //新增首页信息
       //  console.log(res);
         //let a = document.getElementById('formMessageOne').innertext;
          // document.getElementById('formMessageTwo');
          // document.getElementById('formMessageThree');
          // document.getElementById('formMessageFour');
       
    },
    // EditHomepage(){
    //   //编辑首页信息
    //   EditHomepage().then(res=>{
    //     if(res.code==0){

    //     }
    //   })
    // },
    
    // xinadd(){//新增按钮事件
    //    NewAddHomePage().then(res=>{//新增加病案首页   这个后面在添加
    //      if(res.code==0){
    //       //对那4个form表单进行判断
    //       console.log(123);
    //       console.log(res.data);
    //      }
    //    })
    // },
    switchChange(){//开关事件
    this.dialogVisibletwo=true;
    },
    FTwoExpend(){//按f2切换事件
   
    },
    mainDiag(){//主要诊断事件
        this.dialogVisible=true;
    },
    handleClose() {//关闭弹框事件
      this.dialogVisible=false;
      this.dialogVisibletwo=false;
      this.switchBtn=false;
    },
    getdata(evt) {//getdata和 datadragEnd
      // console.log(evt.draggedContext.element.id);
    },
    datadragEnd(evt) {
      // console.log("拖动前的索引 :" + evt.oldIndex);
      // console.log("拖动后的索引 :" + evt.newIndex);
      // console.log(this.tags);
    },
    //分页 每页多少条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    //当前页多少页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    expendDiv() {
      //左边表格展开的功能
      var leftDiv = document.getElementById("leftDiv");
      if (!this.isExpend) {
        //自从搞了宽度高度自适应，这里就出了点问题
        leftDiv.style.width = 168 + "px";
        this.isExpend = true;
      } else {
        leftDiv.style.width = 720 + "px";
        this.isExpend = false;
      }
    }
  },
  
};
</script>
<style lang="less" scoped>
.homepage {
  width: 100%;
  .topside {
    height: 50px;
    border-radius: 6px;
    background-color: #eee;
    /deep/.el-input--mini .el-input__inner {
      width: 140px !important;
    }
    .el-form {
      margin-left: 50px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 150px;
    }
  }
  .leftside {
    width: 168px;
    margin: 0px 40px 0px 50px;
    float: left;
    box-shadow: 0px 0px 1px #ccc;
  }
  .rightside {
    float: left;
    width: calc(100% - 168px - 50px - 40px);
    min-height: calc(100px);
    box-shadow: 0px 0px 5px #ccc;
    .dialogboxtwo{//tableboxtwo的样式
     /deep/.el-dialog__header {
       padding: 0px;
     }
       table {
        display: block;
         height: 308px;
         overflow-y: scroll;
        margin-top: 10px;
        border: 1px solid #000000;
        tbody {
          height: 235px;
        }
        thead {
          display: table;
          width: 100%;
        }
        th {
          line-height: 4;
          border: 1px solid #3c3c3c;
          height: 40px;
          .spanZD{
            display: inline-block;
            margin: 0px;
          }
        }
        td {
          width: 120px;
          border: 1px solid #3c3c3c;
          height: 30px;
        }
        input {
          width: 100%;
          height: 31px;
          outline: none;
          border: 0;
        }
      }
    }
    .content {
     /deep/ .el-switch__core {//开关样式
           transform: translateX(961px);
      }
      /deep/.el-button--mini, .el-button--mini.is-round{
        margin-left: 200px;
        margin-top: 20px;
      }
      color: #3c3c3c;
      .chushengdata{
        width: 280px;
        text-align: center;
      }
      .ruyuanshijian{
        width: 285px;
         text-align: center;
      }
      .chuyuantime{
        width: 270px;
         text-align: center;
      }
      .mingzu {
        width: 88px;
      }
      .shenfenzheng {
        width: 400px;
      }
      .zhiye {
        width: 251px;
      }
      .xianzhuzhi {
        width: 516px;
      }
      .hukoudizhi {
        width: 701px;
      }
      .danweidizhi {
        width: 420px;
      }
      .Address {
        width: 282px;
      }
      .ruyuantujin {
        width: 905px;
      }
      .zhuanyekebie {
        width: 100px;
      }
      .shijizhuyuan {
        width: 100px;
      }
      .menjizhen {
        width: 650px;
      }
      .zhongduwaiyin {
        width: 588px;
      }
      .binglizhenduan {
        width: 685px;
      }
      .bilispace {
        width: 788px;
      }

      .yaowuguomin {
        width: 658px;
      }
      .xuexing {
        width: 500px;
      }
      .Rh {
        width: 417px;
      }
      .zhuyuanyishi {
        width: 181px;
      }
      .bianmayuan {
        width: 240px;
      }
      .binganzl {
        width: 224px;
      }
      .liyuanfangshi {
        width: 916px;
      }
      .againzhuyuan {
        width: 770px;
      }
      //222
      .xiefei {
        width: 108px;
      }
      .zonghe {
        width: 119px;
      }
      .yingxiangpay {
        width: 122px;
      }
      .linchuanlujinhg {
        width: 340px;
      }
      .yiliaoyaoji {
        width: 358px;
      }
      .zhongyishebei {
        width: 204px;
      }
      .small {
        width: 40px;
      }
      .middle {
        width: 30px;
      }
      span {
        margin: 0 10px;
      }
      input {
        vertical-align: bottom;
        height: 28px;
        // outline: none;
        border: 0;
        border-bottom: 1px solid #ccc;
        width: 150px;
      }
      .tabletwo {
          height: 134px;
          th{
            width: 98px;
          }
      }
      table {
        text-align: center;
        display: block;
         overflow-y: scroll;
        margin-top: 20px;
        width: 1000px; //给固定的宽度
        border: 1px solid #000000;
        tbody {
          height: 235px;
        }
        thead {
          display: table;                                
          width: 100%;
        }
        th {
          padding-top: 10px;
          border: 1px solid #3c3c3c;
          height: 40px;
          .spanZD{
            display: inline-block;
            margin: 0px;
          }
        }
        td {
          width: 168px;
          border: 1px solid #3c3c3c;
          height: 30px;
        }
        input {
          outline:none;
          width: 100%;
          border: 0;
        }
      }
    }
  }
}
</style>