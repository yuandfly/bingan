<template>
  <el-dialog title="新增角色"
             :label-position="labelPosition"
             :visible.sync="visible"
             :before-close="close"
             :close-on-click-modal="false"
             :close-on-press-escape="false">
    <el-form :inline="true"
             :label-position="labelPosition"
             :model="addForm"
             :rules="addFormRules"
             label-width="160px"
             class="demo-form-inline"
             ref="addForm">
      <el-form-item label="角色名称"
                    prop="roleName">
        <el-input v-model.trim="addForm.roleName"
                  auto-complete="off"
                  class="myselect"></el-input>
      </el-form-item>
      <el-form-item label="角色key"
                    prop="roleKey"
                    id="el-textarea">
        <el-input class="myselect"
                  autosize
                  v-model.trim="addForm.roleKey">
        </el-input>
      </el-form-item>
    </el-form>
    <div class="center">
      <el-button @click.native="close">取消</el-button>
      <el-button type="primary"
                 @click.native="addSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { insertData } from '../../../api/system/role'
export default {
  components: {},
  data () {
    return {
      labelPosition: 'right',
      addForm: {
      },
      addFormRules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' },
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
    }
  },
  methods: {
    close () {
      // 直接修改父组件的属性
      this.$emit('update:visible', false)
    },
    // 新增员工列表
    addSubmit: function () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            let para = Object.assign({}, this.addForm)
            para.parentid = 0
            para.level =1
            insertData(para).then(res => {
              let code = res.data.code
              if (code === 0) {
                this.$message({
                  message: '角色新增成功',
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
