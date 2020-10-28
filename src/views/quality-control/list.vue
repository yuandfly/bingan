<template>
  <section>
    <el-form
      :inline="true"
      :model="searchForm"
      class="demo-form-inline"
      size="medium"
    >
      <div class="dict_lan">
        <!-- <el-form-item label="医师代号">
          <el-input
            v-model.trim="searchForm.doctorCode"
            class="inline-input"
            placeholder="请输入内容"
            size="small"
            clearable
          ></el-input>
        </el-form-item> -->
        <el-form-item label="病案号">
          <el-input
            v-model.trim="searchForm.baza00"
            class="inline-input"
            placeholder="请输入内容"
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submit"
            >查询</el-button
          >
        </el-form-item>
      </div>
    </el-form>
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column type="expand" class="inner-table">
        <template slot-scope="props">
          <el-table :data="props.row.detailList" border style="width: 100%">
            <el-table-column label="类别" prop="category"> </el-table-column>
            <el-table-column label="评分项" prop="scoreItem"> </el-table-column>
            <el-table-column label="错误信息" prop="errMsg"></el-table-column>
            <el-table-column
              label="扣分数"
              prop="reduceScore"
            ></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="病案号" prop="baza00"> </el-table-column>
      <el-table-column label="医师姓名" prop="doctorName"> </el-table-column>
      <el-table-column label="总分数" prop="totalScore"> </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { getDoctorResult } from '@/api/qualityControl';
export default {
  name: 'controlList',
  data() {
    return {
      searchForm: {
        baza00: '',
        // doctorCode: '',
      },
      dataList: [],
    };
  },
  // watch: {
  //   searchForm: {
  //     handler(val, oldeVal) {
  //       this.getList();
  //     },
  //     deep: true,
  //   },
  // },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getDoctorResult(this.searchForm).then(
        (res) => {
          this.dataList = res;
        },
        (error) => {
          this.$$message.error(`获取质控结果异常${error}`);
        }
      );
    },
    submit() {
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.dict_lan {
  padding-top: 10px;
  padding-left: 50px;
  min-height: 50px;
  border-radius: 6px;
  background-color: #eee;
}
.inner-table {
  >>> td,
  th {
    padding: 6px 0;
  }
}
</style>
