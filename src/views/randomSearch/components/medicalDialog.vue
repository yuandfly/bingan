<template>
  <div>
    <el-dialog title :visible.sync="dialogTableVisible" append-to-body>
      <el-card class="card" shadow="never" body-style="padding: 10px 20px">
        <span style="margin-right: 20px">查询病案结果 病案份数：{{pager.total}}</span>
        <OutPutDialog v-if="conditionList" :conditionList="conditionList"></OutPutDialog>
      </el-card>

      <el-table :data="resultData" border size="small" v-loading="resultLoading">
        <el-table-column prop="baza01" label="病案号" align="center">
          <template slot-scope="scope">
            <span class="link" @click="toHomePage(scope.row.baza00)">{{scope.row.baza01}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="baza02" label="姓名" align="center"></el-table-column>
        <el-table-column prop="BAZA27" label="出院日期" align="center"></el-table-column>
        <el-table-column prop="kb" label="出院科别" align="center"></el-table-column>
        <el-table-column prop="baza80" label="归档号" align="center"></el-table-column>
      </el-table>
      <div class="page_foot">
        <PagingToolbar style="margin-top: 20px;" :pager="pager" @change="getResultData"></PagingToolbar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import OutPutDialog from "./output-dialog.vue";
import PagingToolbar from "../../../components/toolbar/paging";
import { mapMutations } from "vuex";
import {
  GroupNameSelect,
  ConditionSelect,
  ConditionDel,
  ConditionSave,
  RandomSearch,
} from "@/api/randomSearch";

export default {
  data() {
    return {
      dialogTableVisible: false,
      resultData: [],
      // 条件项集合
      conditionItems: [],
      // 已保存的条件组名称，左侧下拉选择
      savedGroups: [],
      // 表格loading
      resultLoading: false,
      // 分页
      // pager: { page: 1, rows: 10, total: 0 }
    };
  },
  props: {
    // visible: {
    //   type: Boolean,
    //   default: false
    // },
    resulList: {
      type: Array,
      default: [],
    },
    pager: {
      type: Object,
      default: { page: 1, rows: 10, total: 0 },
    },
    conditionList: {
      type: null,
      default: undefined,
    },
    condition: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    // 获取已保存的条件组
    this.getSavedGroup();
  },
  watch: {
    resulList(val) {
      this.resultData = val;
    },
    condition(val) {
      this.conditionItems = val;
    },
  },
  components: {
    OutPutDialog,
    PagingToolbar,
  },

  methods: {
    ...mapMutations("homepage", ["setSearchInfo"]),

    showBox() {
      this.dialogTableVisible = true;
    },
    ///////////
    //    获取已保存有的条件组
    getSavedGroup() {
      GroupNameSelect("sj_cxtj")
        .then((res) => {
          if (res && res.data) this.savedGroups = res.data;
          else
            this.$message.error(
              res && res.msg ? res.msg : "获取已有条件组失败"
            );
        })
        .catch((err) => {
          this.$message.error("获取已有条件组失败");
        });
    },
    // 查询病案结果数据
    getResultData(pager) {
      const pagination = pager || this.pager;
      this.validateCondition(() => {
        const conditionList = this.dealConditionItems();
        this.resultLoading = true;
        RandomSearch({
          page: pagination.page,
          size: pagination.rows,
          conditionList: conditionList,
        })
          .then((res) => {
            if (res && res.data) {
              this.resultData = res.data.content;
              this.pager = { ...pagination, total: res.data.total };
              this.conditionList = conditionList;
            } else {
              this.$message.error("查询失败");
              this.resultData = [];
              this.pager = { page: 1, rows: 10, total: 0 };
              this.conditionList = undefined;
            }
            this.resultLoading = false;
          })
          .catch((res) => {
            this.$message.error("查询失败");
            this.resultData = [];
            this.pager = { page: 1, rows: 10, total: 0 };
            this.conditionList = undefined;
            this.resultLoading = false;
          });
      });
    },
    // 去往首页编辑
    toHomePage(baza00) {
      this.validateCondition(() => {
        this.setSearchInfo({
          baza00,
          randomSearchCondition: this.dealConditionItems(),
          searchData: {
            pager: { ...this.pager },
            tableData: this.resultData.slice(),
          },
        });
        this.$router.push({ path: "/admin/homepage/index" });
      });
    },
    // 校验条件项是否完整
    validateCondition(successCallBack) {
      if (!this.conditionItems.length) {
        this.$message.error("请设置条件");
      } else {
        // 判断括号是否匹配
        const fh1Nums = this.conditionItems
          .filter((item) => item.fh1)
          .reduce((sum, item) => item.fh1.length + sum, 0);
        const fh2Nums = this.conditionItems
          .filter((item) => item.fh2)
          .reduce((sum, item) => item.fh2.length + sum, 0);
        if (fh1Nums !== fh2Nums) {
          this.$message.error(
            `括号不匹配，左括号数 ${fh1Nums}，右括号数 ${fh2Nums}`
          );
          return;
        }
        // 判断括号方向是否匹配（如第一个时),第二个是(,数量一致但方向不对）
        const str = this.conditionItems
          .map((item) => (item.fh1 || "") + (item.fh2 || ""))
          .join("");
        console.log(str, "str");
        let lastLeft = undefined;
        let errIndex = -1;
        for (let i = 0; i < str.length; i++) {
          if (errIndex >= 0) break;
          if (str[i] === "(") {
            lastLeft = "(";
          } else if (str[i] === ")") {
            if (!lastLeft) errIndex = i;
            else lastLeft = undefined;
          }
        }
        if (errIndex >= 0) {
          this.$message.error(`左右括号不匹配`); // 第${errIndex + 1}个右括号没有匹配的左括号
          return;
        }
        const names = ["conditionField", "conditionRelation", "itemRelation"]; //  'conditionValueName',
        const labels = ["条件项", "关系", "关联"]; // '条件值',
        let err = false;
        for (let i = 0; i < this.conditionItems.length; i++) {
          if (err) break;
          for (let j = 0; j < names.length; j++) {
            // 没有值，且不是最后一个itemRelation，显示error
            if (
              !this.conditionItems[i][names[j]] &&
              (i !== this.conditionItems.length - 1 || j !== names.length - 1)
            ) {
              this.$message.error(`第${i + 1}个条件未设置${labels[j]}`);
              err = true;
              break;
            }
          }
        }
        !err && successCallBack();
      }
    },
    // 整理条件项数据 用于保存和查询
    dealConditionItems() {
      return this.conditionItems.map((item, index) => ({
        hmm: this.addGroupName || this.editGroupId, // 条件组名称
        cxx: item.conditionField, // 条件项字段名
        name: item.conditionFieldName, // 条件项字段名对应中文
        ysz: item.bzk
          ? item.conditionValue
          : item.conditionValueName
          ? item.conditionValueName.trim()
          : "", // 条件项值(没有bzk是直接输入的值)
        yszt: item.conditionValueName ? item.conditionValueName.trim() : "", // 条件项值对应中文
        gxf: item.conditionRelation, // 条件字段与条件值的关系
        glf: item.itemRelation, // 条件之间的关系
        km: item.km, // 条件项所在表名
        bzk: item.bzk, // 值的字典表
        bzkdmmc: item.bzkdmmc, // 字典字段
        type: item.type, // 条件类型
        xh: index + 1, // 排序
        fh1: item.fh1, // 左括号
        fh2: item.fh2, // 右括号
      }));
    },
  },
};
</script>

<style scoped>
.page_foot {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}
</style>