


<template>
  <el-dialog
    title="病理诊断录入"
    class="pathologic-dialog"
    :visible="visible"
    :append-to-body="false"
    width="1200px"
    top="50px"
    v-dialogDrag
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="drugs-header">
      <el-form :inline="true" :model="form">
        <el-form-item label="病案号">
          <el-input
            :ref="formFields[0]"
            style="width: 130px"
            size="mini"
            :value="baza00"
            @keydown.native.enter="handleFocus(1)"
          />
        </el-form-item>
        <el-form-item label="医技诊断标志">
          <el-select
            :ref="formFields[1]"
            v-model="form[formFields[1]]"
            size="mini"
            style="width: 100px"
            @keydown.native.enter="handleFocus(2)"
          >
            <el-option v-for="item in options" :value="item.dm" :label="item.dmmc"  :key="item.dm">{{item.dm + ':' + item.dmmc}}</el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="诊断符合情况">
              <!--          <el-input-->
              <!--            :ref="formFields[4]"-->
              <!--            :controls="false"-->
              <!--            :min="0"-->
              <!--            :max="3"-->
              <!--            style="width: 50px"-->
              <!--            size="mini"-->
              <!--            @input="handleInput"-->
              <!--            v-model="form[formFields[4]]"-->
              <!--          />-->
              <el-select
                      v-model="form[formFields[4]]"
                      size="mini"
                      style="width: 100px"
                      :ref="formFields[4]"
              >
                  <el-option value="0" label="未做"></el-option>
                  <el-option value="1" label="符合"></el-option>
                  <el-option value="2" label="不符合"></el-option>
                  <el-option value="3" label="不肯定"></el-option>
              </el-select>
          </el-form-item>
        <el-form-item label="病理检查号">
          <el-input
            :ref="formFields[2]"
            style="width: 130px"
            size="mini"
            autofocus="autofocus"
            v-model="form[formFields[2]]"
            @keydown.native.enter="handleFocus(3)"
          />
        </el-form-item>
        <el-form-item label="病理诊断">
          <el-input
                  :ref="formFields[3]"
                  style="width: 130px"
                  size="mini"
                  @keyup.native.32="openDictInput('westernDiagnoseDict', 'form')"
                  @keydown.native.115="clearDictInputFormValue"
                  :value="form[formFields[3]]"
          />
        </el-form-item>
        <el-form-item label="医生描述">
          <el-input
                  :ref="formFields[5]"
                  size="mini"
                  v-model="form[formFields[5]]"
                  @keydown.native.enter="handleAdd"
          />
        </el-form-item>



      </el-form>
    </div>
    <div style="margin-bottom: 10px">
      <el-button type="primary" size="mini" @click="handleAdd">追加</el-button>
    </div>
    <div id="pathologic-table">
      <el-table :data="diagnosisData || []" border row-key="key">
        <el-table-column prop="baf208" label="序号"></el-table-column>
        <el-table-column prop="baf202" label="病理检查号">
          <template slot-scope="scope">
            <el-input
                    style="width: 130px"
                    size="mini"
                    v-model="scope.row.baf202"
            />
          </template>
        </el-table-column>
        <el-table-column prop="baf205" label="诊断类别"></el-table-column>
        <el-table-column prop="baf203" label="病理诊断名称">
            <template slot-scope="scope">
                <el-input
                        style="width: 130px"
                        size="mini"
                        @keyup.native.32="openDictInput('westernDiagnoseDict', scope.$index)"
                        @keydown.native.115="clearDictInputValue(scope.$index)"
                        :value="scope.row.baf203"
                />
            </template>
        </el-table-column>
        <el-table-column prop="baf207" label="诊断编码"></el-table-column>
        <el-table-column prop="describes" label="医生描述">
          <template slot-scope="scope">
            <el-input
                    style="width: 130px"
                    size="mini"
                    v-model="scope.row.describes"
            />
          </template>
        </el-table-column>
        <el-table-column prop="c" label="操作">
          <template slot-scope="scope">
            <el-button
                    style="color: #F56C6C"
                    @click="handleDel(scope.$index)"
                    type="text"
                    size="mini"
                    icon="el-icon-delete"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <DictInput
      :visible.sync="dict.visible"
      :append-to-body="true"
      :dictType="dict.dictType"
      :extraParams="dict.extraParams"
      @submit="this.handleDictInputSubmit"
    />
    <span slot="footer">
      <el-button size="small" type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Sortable from "sortablejs";
import DictInput from "../../../components/dialog/dict-input";
import { GetUpdateKeyDiagnosis } from "../../../api/dictionary";
import {randomStr} from '../../../utils/index';
export default {
  name: "pathologic-diagnosis-input", // 病理诊断录入
  components: { DictInput },
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    baza00: {
      type: String,
      default: "",
      required: true
    },
    diagnosisData: {
      type: Array,
      required: false
    },
    westernData:{

    }
  },
  data() {
    return {
      dict: {
        dictType: undefined,
        visible: false,
        extraParams: undefined,
        currentOpener: undefined,

      },
      tag: false,
      formFields: ["baza00", "baf205", "baf202", "baf203", "baf206", "describes"],
      formFieldsName: [
        "病案号",
        "医技诊断标志",
        "病理检查号",
        "病理诊断",
        "诊断符合情况",
          "医生描述"
      ],
      form: {"baf205": "L", "baf206": "1"},
      tableData: [],
      options: [],
      dragInited: false
    };
  },
  watch: {
    baza00(val) {
      this.form.baza00 = val;
    },
    visible(next) {

      next && !this.options.length && this.getOptions();
      if (next && !this.dragInited) {
          this.$nextTick(() => {
              this.drag();
          })
      }
      setTimeout(() => {
          console.log(this.$refs);
          this.$refs['baf202'].focus();
      }, 20);


      // 如果西医诊断 icd10 包含c00 - c99 ， d00 - d18，则病理诊断必填，且只能查询带斜杠 / 的
      this.tag = false;
      let icd10Name = '';
      for (let i = 0; i < 100; i++) {
        i < 10 ? icd10Name = 'C0' + i : icd10Name = 'C' + i;
        this.westernData.some((item) => {
          if (item.ICD10 && item.ICD10.indexOf(icd10Name) === 0) {
            console.log(item);
            this.tag  = true;
          }
        })
      }
      for (let i = 0; i < 19; i++) {
        i < 10 ? icd10Name = 'D0' + i : icd10Name = 'D' + i;
        this.westernData.some((item) => {
          if (item.ICD10 && item.ICD10.indexOf(icd10Name) === 0) {
            console.log(item);
            this.tag  = true;
          }
        })
      }
    }
  },
    created() {
      // let that = this;
      //   document.onkeydown = function(e) {
      //       var key = window.event.keyCode;
      //       if (key === 13) {
      //       }
      //   }
    },
    mounted() {
    this.getOptions();

  },
  methods: {
    clearDictInputValue(index) {
      this.diagnosisData[index]['baf203'] = undefined;
      this.diagnosisData[index]['baf207'] = undefined;
      console.log(this.form);
    },
    clearDictInputFormValue(index) {
      this.$delete(this.form, 'baf203');
      this.$delete(this.form, 'baf207');
      console.log(this.form);
    },
    drag () {
      // 首先获取需要拖拽的dom节点
      const el1 = document.querySelectorAll('#pathologic-table .el-table__body-wrapper')[0].querySelectorAll('table > tbody')[0];
     // console.log(el1, 'el');
        Sortable.create(el1, {
        disabled: false, // 是否开启拖拽
        ghostClass: 'sortable-ghost', //拖拽样式
        animation: 150, // 拖拽延时，效果更好看
        group: { // 是否开启跨表拖拽
          pull: false,
          put: false
        },
        onEnd: (e) => { // 这里主要进行数据的处理，拖拽实际并不会改变绑定数据的顺序，这里需要自己做数据的顺序更改
          let arr = this.diagnosisData.map((item, index) => ({...item})); // 获取表数据
          const temp = arr.splice(e.oldIndex, 1);
         // console.log(temp, 'temp');
          arr.splice(e.newIndex, 0, temp[0]);
          // arr.splice(e.newIndex, 0, arr.splice(e.oldIndex, 1)[0]); // 数据处理
            arr.forEach((item, index) => {
                item.baf208 = String(index + 1)
            });
         // console.log(e, arr);
          this.$nextTick(() => {
              this.$emit("update:diagnosisData", arr);
          })
        }
      });
        this.dragInited = true;
    },
    getOptions() {
      GetUpdateKeyDiagnosis({}).then(res => {
        if (res && res.data) {
          this.options = res.data;
        }
      });
    },

    handleInput(val) {
      const num = val[val.length - 1];
      if (Number(num) <= 3) this.form[this.formFields[4]] = num;
      else this.form[this.formFields[4]] = val[val.length - 2] || undefined;
    },

    openDictInput(dictType, currentOpener) {
      this.dict = {
        visible: true,
        dictType,
        currentOpener,
         extraParams: { code: 1, blzdTag: this.diagnosisData[0] ? false : this.tag }
      };
    },

    handleDictInputSubmit(item) {
        const {currentOpener} = this.dict;
        if (currentOpener === 'form') {
            const fields = ["baf203/dmmc", "baf207/icd10"];
            fields.forEach(field => {
                const [targetField, dictField] = field.split("/");
                this.form[targetField] = item[dictField];
            });
            this.handleFocus(5);
        } else {
            const arr = this.diagnosisData.slice();
            arr[currentOpener].baf203 = item.dmmc;
            arr[currentOpener].baf207 = item.icd10;
            this.$emit("update:diagnosisData", arr);
        }
    },

    handleFocus(nextIndex) {
      if (nextIndex === 2) {
        this.$refs[this.formFields[1]].blur();
      }
      this.$refs[this.formFields[nextIndex]].focus();
      this.$refs[this.formFields[nextIndex]].$el.click();
    },

    handleAdd() {
      // 验证完整
      let error = false;



      for (let i = 0; i < this.formFields.length; i++) {
        const val = this.form[this.formFields[i]];
        if ((!val || !val.trim()) && this.formFields[i] !== 'baf202' && this.formFields[i] !== 'describes') {
          console.log(this.diagnosisData[0], this.tag);
          if ( (this.formFields[i] === 'baf203' && (this.tag === false || this.diagnosisData[0]))) {

          } else {
            error = true;
            if (this.formFields[i] === 'baf203') {

              this.$message.error(`诊断中包含肿瘤编码，请填写M编码`);
            } else {
              this.$message.error(`请输入${this.formFieldsName[i]}`);

            }
            break;
          }

        }
      }
      if (!error) {
      //  console.log("good");
        const diagnosisData = this.diagnosisData.slice();
        // diagnosisData.push({
        //   baf208: String(diagnosisData.length + 1), // 序号
        //   key: randomStr(8),
        //   ...this.form
        // });
        this.$set(diagnosisData, diagnosisData.length, {
          baf208: String(diagnosisData.length + 1), // 序号
          key: randomStr(8),
          ...this.form
        });
        console.log(diagnosisData);
        this.$emit("update:diagnosisData", diagnosisData);
        this.form = { baza00: this.baza00, "baf205": "L", "baf206": "1" };
      }
    },

    handleDel(index) {
      console.log(index, this.diagnosisData);
      const diagnosisData = this.diagnosisData.slice();
      diagnosisData.splice(index, 1);
      diagnosisData.forEach((item, index) => {
        item.baf208 = String(index + 1);
      });
      this.$emit("update:diagnosisData", diagnosisData);
    },

    handleSubmit() {
   //   const firstItem = this.diagnosisData.find(item => item.baf208 == 1) || {};
        let firstItem = {};
         this.diagnosisData.some((v) => {
            if (v.baf205 === 'L') {
                firstItem = v;
                return true;
            }
        })
      console.log(firstItem);
      this.$emit("submit", firstItem);
    },

    handleClose() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style scoped lang="less">
.pathologic-dialog {
}
</style>

