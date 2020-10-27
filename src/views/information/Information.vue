<template>
  <!-- 基本信息录入窗口 -->
  <div class="information">
    <!-- form表单内的数据 -->
    <div class="formationbox">
      <!-- 第一横行 下面都是出生地和籍贯等编辑 -->
      <el-form label-width="80px" :inline="true">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex">
            <el-option label="男" value="shanghai"></el-option>
            <el-option label="女" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col>
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="国籍">
          <el-input v-model="form.nation"></el-input>
        </el-form-item>
        <el-form-item label="出生地">
          <el-input v-model="form.brith"></el-input>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input v-model="form.jiguan"></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="form.mingzu"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.shenfen"></el-input>
        </el-form-item>
        <el-form-item label="职业">
          <el-input v-model="form.job"></el-input>
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-select v-model="form.hunyin">
            <el-option label="已婚" value="shanghai"></el-option>
            <el-option label="未婚" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="现住地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="街村">
          <el-input v-model="form.jiecun"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="户口地址">
          <el-input v-model="form.hukouaddress"></el-input>
        </el-form-item>
        <el-form-item label="街村">
          <el-input v-model="form.jiecuntwo"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="form.emailtwo"></el-input>
        </el-form-item>
        <el-form-item label="工作单位/地址">
          <el-input v-model="form.jobdanwei"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone2"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="form.email2"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input v-model="form.lixiname"></el-input>
        </el-form-item>
        <el-form-item label="关系">
          <el-select v-model="form.guanxi">
            <el-option label value="亲子"></el-option>
            <el-option label value="父母"></el-option>
          </el-select>
          <!-- <el-input v-model="form.guanxi"></el-input> -->
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone3"></el-input>
        </el-form-item>
        <el-form-item label="联系人地址">
          <el-input v-model="form.lixinadress"></el-input>
        </el-form-item>
        <el-form-item label="邻村">
          <el-input v-model="form.lincun"></el-input>
        </el-form-item>
        <el-form-item label="入院途径">
          <el-select v-model="form.ruyuantujing">
            <el-option label="门诊2" value="shanghai"></el-option>
            <el-option label="门诊3" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入院科别">
          <el-input v-model="form.ruyuankebie"></el-input>
        </el-form-item>
        <el-form-item label="病室">
          <el-input v-model="form.bingshi1"></el-input>
        </el-form-item>
        <el-form-item label="转科科别">
          <el-input v-model="form.zhuankekebie"></el-input>
        </el-form-item>
        <el-form-item label="病室">
          <el-input v-model="form.bingshji2"></el-input>
        </el-form-item>
        <el-form-item label="出院日期">
          <el-col>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="出院科别">
          <el-input v-model="form.chuyuankebie"></el-input>
        </el-form-item>
        <el-form-item label="病室">
          <el-input v-model="form.bingshi3"></el-input>
        </el-form-item>
      </el-form>
      <div class="buttonbox">
        <el-button type="primary">基本信息</el-button>
        <el-button type="primary">中医信息</el-button>
        <el-button type="primary">医疗信息</el-button>
        <el-button type="primary">费用及补充信息</el-button>
        <el-button type="default">返回</el-button>
      </div>
    </div>
    <!-- 其他的，怎么去设置 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "如果",
        sex: "男",
        date: "1977-01-01",
        date1: "2012-01-01",
        age: "",
        nation: "中国",
        brith: "北京市顺义区",
        jiguan: "",
        mingzu: "汉族",
        shenfen: "",
        job: "",
        hunyin: "已婚",
        address: "北京市顺义区",
        jiecun: "武汉市",
        phone: "",
        email: "",
        phone2: "",
        phone3: "",
        email2: "",
        hukouaddress: "北京市顺义区",
        jiecuntwo: "武汉市",
        emailtwo: "",
        jobdanwei: "武汉市",
        lixiname: "",
        lixiname2: "",
        guanxi: "",
        lixinadress: "",
        ruyuantujing: "",
        ruyuankebie: "儿童门诊",
        bingshi1: "",
        bingshi2: "",
        bingshi3: "",
        zhuankekebie: "",
        chuyuankebie: "儿童门诊"
      }
    };
  }
};
</script>
<style lang="less" scoped>
.information {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  .formationbox {
    width: 1100px;
    height: 1600px;
    margin: 0 auto;

    // background-color: pink;
    /deep/.el-input__inner {
      width: 130px !important;
      height: 25px;
    }
    .buttonbox {
      text-align: center;
    }
  }
}
</style>