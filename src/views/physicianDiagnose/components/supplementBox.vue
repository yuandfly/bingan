<template>
  <div>
    <el-dialog title="复选字典" :visible.sync="dialogVisible">
      <el-table :data="gridData" @cell-dblclick="selectDictionaries">
        <el-table-column property="icdCode" label="ICD码" width></el-table-column>
        <el-table-column property="dmmc" label="名称" width></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dirType: "",
      gridData: []
    };
  },
  methods: {
    showBox(type, list) {
      this.dialogVisible = true;
      this.dirType = type;
      this.gridData = list;
    },
    selectDictionaries(row) {
      this.dialogVisible = false;
      this.$emit("fun", this.dirType, row);
    }
  }
};
</script>

<style scoped>
</style>