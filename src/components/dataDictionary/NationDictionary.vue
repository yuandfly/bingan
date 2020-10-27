<!--标准代码-->
<template slot-scope="props">
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
      <el-form-item label="代码名称">
        <el-input
                size="small"
          class="inline-input"
          @input="queryAll()"
          v-model="formInline.dmmc"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>

      <el-form-item label="标准表名">
        <el-select v-model="value" placeholder="请选择" size="small" @change="queryAll(undefined,value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="queryAll()">新增</el-button>
      </el-form-item>
      <div style="padding: 20px;">
      <el-table :data="tableData" border :height="dataList">
        <el-table-column prop="dm" label="代码">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.dm" size="small" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dmmc" label="代码名称">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.dmmc" size="small" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="wbm" label="五笔码">
          <template slot-scope="scope">
            <el-input v-model="scope.row.wbm" size="small" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="pym" label="拼音码">
          <template slot-scope="scope">
            <el-input v-model="scope.row.pym" size="small" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="lm" label="LM">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lm" size="small" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="bz" label="是否停用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.bz"
              active-value="0"
              inactive-value="1"
              active-text="启"
              inactive-text="停"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="update(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </el-form>
    <paging-toolbar :pager="pager" @change="queryAll('condition',value)" />
  </section>
</template>

<script>
import {
  GetNationDictionary, //获取民族
  UpdateNationDictionary, //更新民族
  GetDistrict, //获取行政区划字典信息
  UpdateDistrict, //修改行政区划字典信息
  GetTCM_Disease, //获取中医病、证代码表
  UpdateTCM_Disease, //修改中医病、证代码字典信息
  GetMedicalSubjects, //获取科目
  UpdateMedicalSubjects, //修改科目
  GetAllergyDrugs, //获取过敏药物代码字典信息
  UpdateAllergyDrugs, //修改过敏药物代码字典信息
  GetAnesthesia, //获取麻醉方法代码字典信息
  UpdateAnesthesia, //修改麻醉方法代码字典信息
  GetKeyDiagnosis, //获取重点医技诊断代码字典信息
  UpdateKeyDiagnosis, //修改重点医技诊断代码字典信息
  GetFetalPosition, //获取生产胎方位代码字典信息
  UpdateFetalPosition, //修改生产胎方位代码字典信息
  GetDepartmentStatistics, //获取统计归口(不带分页)
  UpdateDepartmentStatistics, //修改上报科室统计归口代码字典信息
  GetOutpatientDepartmentStatistics, //获取门诊科室统计分类代码字典信息
  UpdateOutpatientDepartmentStatistics, //修改门诊科室统计分类代码字典信息
  GetInpatientDepartmentStatistics, //获取住院科室统计分类代码字典信息
  UpdateInpatientDepartmentStatistics, //修改住院科室统计分类代码字典信息
  GetStreet, //获取各地街道名称代码字典信息
  UpdateStreet, //修改各地街道名称代码字典信息
} from "@/api";
import departmentDictionary from "../../components/dialog/departmentdictionary";
import PagingToolbar from "../../components/toolbar/paging";
import MedicalSubjects from "../../components/dialog/medicalSubjects";
export default {
  components: {
    PagingToolbar,
    MedicalSubjects,
    "department-dictionary": departmentDictionary,
  },
  data() {
    return {
      options: [
        {
          value: "1",
          label: "民族代码表",
        },
        {
          value: "2",
          label: "行政区划代码表",
        },
        {
          value: "3",
          label: "中医病·证代码表",
        },
        {
          value: "4",
          label: "诊疗科目代码表",
        },
        {
          value: "5",
          label: "过敏药物代码表",
        },
        {
          value: "6",
          label: "麻醉方法代码表",
        },
        {
          value: "7",
          label: "重点医技诊断代码表",
        },
        {
          value: "8",
          label: "生产胎方位代码表",
        },
        {
          value: "9",
          label: "上报科室统计归口代码表",
        },
        {
          value: "10",
          label: "门诊科室统计分类代码表",
        },
        {
          value: "11",
          label: "住院科室统计分类代码表",
        },
        {
          value: "12",
          label: "街道/乡镇名称代码表",
        },
      ],
      value: "1", // 选取默认值
      formInline: {},
      XH: "1",
      pager: {
        total: 0, // 总条数
        page: 1, // 当前页
        rows: 10, // 每页显示多少条
      },
      tableData: [],
      getFunction: "",
    };
  },
  props: ["dataList"],
  methods: {
    queryAll(condition, vu) {
      if (vu != undefined) {
        this.XH = vu;
      }
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
      if (this.XH === "1") {
        GetNationDictionary(this.formInline).then((res) => {
          this.tableData = res.data.data;
        });
      } else if (this.XH === "2") {
        GetDistrict(formInitData).then((res) => {
          this.pager.page = formInitData.page;
          this.pager.total = res.data.data.total;
          this.tableData = res.data.data.content;
        });
      } else if (this.XH === "3") {
        GetTCM_Disease(formInitData).then((res) => {
          this.pager.page = formInitData.page;
          this.pager.total = res.data.data.total;
          this.tableData = res.data.data.content;
        });
      } else if (this.XH === "4") {
        GetMedicalSubjects(this.formInline).then((res) => {
          this.tableData = res.data.data;
        });
      } else if (this.XH === "5") {
        GetAllergyDrugs(formInitData).then((res) => {
          this.pager.page = formInitData.page;
          this.pager.total = res.data.data.total;
          this.tableData = res.data.data.content;
        });
      } else if (this.XH === "6") {
        GetAnesthesia(this.formInline).then((res) => {
          this.tableData = res.data.data;
        });
      } else if (this.XH === "7") {
        GetKeyDiagnosis(this.formInline).then((res) => {
          this.tableData = res.data.data;
        });
      } else if (this.XH === "8") {
        GetFetalPosition(this.formInline).then((res) => {
          this.tableData = res.data.data;
        });
      } else if (this.XH === "9") {
        GetDepartmentStatistics(this.formInline).then((res) => {
          this.tableData = res.data.data;
        });
      } else if (this.XH === "10") {
        GetOutpatientDepartmentStatistics(this.formInline).then((res) => {
          this.tableData = res.data.data;
        });
      } else if (this.XH === "11") {
        GetInpatientDepartmentStatistics(this.formInline).then((res) => {
          this.tableData = res.data.data;
        });
      } else if (this.XH === "12") {
        GetStreet(formInitData).then((res) => {
          this.pager.page = formInitData.page;
          this.pager.total = res.data.data.total;
          this.tableData = res.data.data.content;
        });
      }
    },

    handleDelete(row) {
      this.$confirm("此操作将永久删除此人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    update(row) {
      this.$confirm("确定要修改此项吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.XH === "1") {
            UpdateMedicalLaboratory(row).then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "修改失败请联系管理员!",
                });
              }
              this.queryAll();
            });
          } else {
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
          this.queryAll();
        });
    },
  },
  mounted() {
    this.queryAll();
  },
};
</script>

<style scoped>
.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-dropdown-link {
  cursor: pointer;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
