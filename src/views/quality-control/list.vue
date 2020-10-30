<template>
  <section>
    <el-form
      :inline="true"
      :model="searchForm"
      class="demo-form-inline"
      size="medium"
    >
      <div class="dict_lan">
        <el-form-item label="医师姓名">
          <el-input
            v-model.trim="searchForm.doctorName"
            class="inline-input"
            placeholder="请输入内容"
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="病案号">
          <el-input
            v-model.trim="searchForm.baza00"
            class="inline-input"
            placeholder="请输入内容"
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="科室代码">
          <el-input
            v-model.trim="searchForm.baza00"
            class="inline-input"
            placeholder="请输入内容"
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="病区代码">
          <el-input
            v-model.trim="searchForm.wardCode"
            class="inline-input"
            placeholder="请输入内容"
            size="small"
            clearable
          ></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" size="small" @click="submit"
            >查询</el-button
          >
        </el-form-item>
      </div>
    </el-form>
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column label="病案号" prop="baza00"> </el-table-column>
      <!-- <el-table-column label="科室代码" prop="deptCode"> </el-table-column>
      <el-table-column label="病区代码" prop="wardCode"> </el-table-column>
      <el-table-column label="医师代码" prop="doctorCode"> </el-table-column> -->
      <el-table-column label="医师代码" prop="doctorName"> </el-table-column>
      <el-table-column label="总分数" prop="totalScore"> </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-link @click="detail(row.resultId)">查看详情</el-link>
          <!-- <el-link>历史记录</el-link> -->
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { getDoctorResult, getDoctorDetailById } from '@/api/qualityControl';
export default {
  name: 'controlList',
  data() {
    return {
      searchForm: {
        baza00: '',
        doctorName: '',
        deptCode: '',
        wardCode: '',
      },
      dataList: [],
      page: 1,
      limit: 10,
      detailList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const params = Object.assign(this.searchForm, {
        page: this.page,
        limit: this.limit,
      });
      getDoctorResult(params).then(
        (res) => {
          this.dataList = res.content;
        },
        (error) => {
          this.$$message.error(`获取质控结果异常${error}`);
        }
      );
    },
    detail(id) {
      getDoctorDetailById(id).then(
        (res) => {
          this.detailList = res;
        },
        (error) => {
          this.$message.error(`获取详情异常${erro}`);
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
