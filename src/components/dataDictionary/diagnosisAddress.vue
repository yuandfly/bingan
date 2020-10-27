<!--诊断地址等-->
<template slot-scope="props">
  <section>
    <el-form :inline="true" :model="form" class="demo-form-inline" size="medium"  >
      <div class="dict_lan">
        <el-form-item label="选择维护项目">
          <el-select v-model="Keshi" size="small" @change="KeshiChange">
            <el-option v-for="item in KeshiList"  :label="item.value" :value="item.id" :key="item.id" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input
                  class="inline-input"
                  @input="queryAll()"
                  v-model="form.dmmc"
                  placeholder="请输入内容"
                  size="small"
          ></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" size="small" @click="add()">新增</el-button>
        </el-form-item>
      </div>

        <component :is="KeshiList[Keshi]['name']" :filter="this.form" ref="child"></component>
    </el-form>
  </section>
</template>

<script>

import Diagnosis from './diagnosisAddressComponent/Diagnosis';
import InpatientArea from './diagnosisAddressComponent/InpatientArea';
import MedicalProjectFile from './diagnosisAddressComponent/MedicalProjectFile';
import OperationName from './diagnosisAddressComponent/OperationName';
import UnitAddress from './diagnosisAddressComponent/UnitAddress';
export default {
  components: {
    Diagnosis,
    InpatientArea,
    MedicalProjectFile,
    OperationName,
    UnitAddress
  },
  data() {
    return {
      pageSizes: 10,
      nowPage: 1,
      total: 0,
      show1: false,
      index: 0,
      currentItem: undefined,
      restaurants: [],
      form: {
        user: "",
        region: "",
      },
      dictInputDialog: {
        visible: false,
        dictType: undefined, // 字典类型，全部类型见 dict-input 组件 typeAPI
        extraParams: undefined, // 额外参数，如科室,见 filtersFields
        currentOpener: {}, // 字典选择后需要填值的字段名 {name, dictField}, 见 handleDictInputSubmit
      },
      tableData: [],
      KeshiList: [
        {value: '西医诊断',name : 'Diagnosis', id: 0},
        {value: '手术名称',name : 'OperationName', id: 1},
        {value: '单位地址',name : 'UnitAddress', id: 2},
        {value: '住院病区设置',name : 'InpatientArea', id: 3},
        {value: '医技项目归口',name : 'MedicalProjectFile', id: 4}
      ],
      Keshi: 0
    };
  },
  methods: {
    add () {
      this.$refs['child'].openBox();
    },
    queryAll () {
      this.$refs['child'].queryAll();
    },
    KeshiChange(ev) {
      this.Keshi = ev;
      console.log(this.KeshiList[this.Keshi]);
    },
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

.dict_lan {
  display: flex;
  padding: 10px 20px;
  background-color: #eee;
}
</style>
