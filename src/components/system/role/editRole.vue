<template>
  <el-dialog title="编辑角色"
             id=""
             v-loading="loading"
             :visible.sync="visible"
             :before-close="close"
             :close-on-click-modal="false"
             :close-on-press-escape="false">
    <el-form :model="tableData"
             :inline="true"
             :label-position="labelPosition"
             :rules="editFormRules"
             ref="editForm"
             label-width="160px"
             class="demo-form-inline">

      <el-form-item label="角色名称"
                    prop="roleName">
        <el-input v-model.trim="tableData.roleName"
                  auto-complete="off"
                  class="myselect"></el-input>
      </el-form-item>
      <el-form-item label="角色key"
                    prop="roleKey"
                    id="el-textarea">
        <el-input class="myselect"
                  autosize
                  placeholder="请输入内容"
                  v-model.trim="tableData.roleKey">
        </el-input>
      </el-form-item>
    </el-form>
    <div class="center">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary"
                 @click.native="editSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { updateData } from '../../../api/system/role'
export default {
  data () {
    return {
      labelPosition: 'right',
      loading: false,
      tableData: this.detailData,
      formLabelWidth: '70px',
      editFormRules: {
        roleName: [{ required: true, message: '请输入姓名', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/, message: '只能输入中英文、数字，长度1-20'}],
        roleKey: [{ required: true, message: '请输入角色key', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/, message: '只能输入中英文、数字，长度1-20'}]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },

  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    editSubmit () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            let para = {
              id: this.tableData.id,
              roleName: this.tableData.roleName,
              roleKey: this.tableData.roleKey
            }
            updateData(para).then(res => {
              let code  = res.data.code
              if (code === 0) {
                this.$message({
                  message: '角色修改成功',
                  type: 'success'
                })
                // 直接修改父组件的属性
                this.$emit('update:visible', false)
                // 执行查询方法，刷新页面
                this.$emit('refresh')
              } else {
                this.$message.error('错了哦,请联系管理员')
              }
            })
          })
        }
      })
    }
  }
}

</script>
<style scoped>
  .left {
    float: left;
    width: 70%;
    height: 320px;
  }
  .right {
    float: left;
    width: 30%;
    height: 320px;
  }

  hr {
    color: #d2d2d2;
  }

  .footer {
    text-align: center;
  }
</style>
