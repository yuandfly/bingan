 <template>
  <!-- 新增界面 -->
  <el-dialog title="编辑员工"
             id=""
             v-loading="loading"
             :visible.sync="visible"
             :before-close="close"
             :close-on-click-modal="false"
             :close-on-press-escape="false">
    <el-form :inline="true"
             :label-position="labelPosition"
             :model="editForm"
             :rules="editFormRules"
             ref="editForm"
             label-width="160px"
             class="demo-form-inline">

      <el-form-item label="员工账号"
                    prop="nickname" id="bg">
        <el-input v-model="editForm.nickname"
                  class="myselect" readonly></el-input>
      </el-form-item>

      <el-form-item label="员工头像" prop="facephoto">
        <COS v-on:childByValue="childByValue" :type="cosType" ref="cos"></COS>
      </el-form-item>

      <el-form-item label="员工姓名"
                    prop="username" >
        <el-input v-model.trim="editForm.username"
                  class="myselect" ></el-input>
      </el-form-item>

      <el-form-item label="员工电话" prop="telephone">
        <el-input v-model="editForm.telephone"
                  class="myselect"></el-input>
      </el-form-item>

      <el-form-item label="员工邮件" prop="email">
        <el-input v-model="editForm.email"
                  class="myselect"></el-input>
      </el-form-item>

      <el-form-item label="员工角色"
                    prop="roleid">
        <el-select v-model="editForm.roleid"
                   class="myselect"
                   placeholder="请选择角色">
          <el-option v-for="item in getRoleList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item><br />

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="editForm.sex">
          <el-radio class="radio" :label="0">男</el-radio>
          <el-radio class="radio" :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>


    </el-form>
    <div class="center">
      <el-button @click.native="close">取消</el-button>
      <el-button type="primary"
                 @click.native="editSubmit"
                 style="margin-top: 40px">提交</el-button>
    </div>
  </el-dialog>

</template>

<script>
/** 员工编辑回显接口 */
import {getById, updateData } from '../../../api/system/admin'
/** 角色下拉选 */
import roleList from '../../../constants/options/roleOption.js'

export default {
  components: {
   
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: ''
  },
  data () {
    // 校验邮箱
    let validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入员工邮箱'))
      } else {
        let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
        if (!reg) {
          callback(new Error('请输入正确的邮箱格式'))
        }
        callback()
      }
    }
    // 校验邮箱
    let validateTelephone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入员工手机号'))
      } else {
        let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)
        if (!reg) {
          callback(new Error('请输入正确的手机号'))
        }
        callback()
      }
    }
    return {
      labelPosition: 'right',
      loading: false,
      editForm: {},
      /** 角色下拉选 */
      getRoleList: roleList.roleSelect(),
      /** 客户下拉选 */
      editFormRules: {
        username: [{ required: true, message: '请输入员工姓名', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/, message: '只能输入中英文、数字，长度1-20'}],
        roleid: [{ required: true, message: '请选择员工所属角色', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择员工性别', trigger: 'blur' }],
        telephone: [{validator: validateTelephone, trigger: 'blur'}],
        email: [{validator: validateEmail, trigger: 'blur'}]
      },
      cosType: 1, // 1-单张图片
      url: ''
    }
  },
  mounted () {
    this.initTableData()
  },
  methods: {
    initTableData: function () {
      getById(this.id).then(res => {
        if (res.data.code === 0) {
          let file = res.data.data.facephoto
          // 调用子组件的方法，回显图片..
          if (file !== null && file !== '') {
            this.$nextTick(() => {
              this.$refs.cos.change(file, '', 1)
            })
          }
          this.editForm = res.data.data
          this.editForm.roleid = this.editForm.roleid + ''
        }
      })
    },

    close () {
      // 直接修改父组件的属性
      this.$emit('update:visible', false)
    },

    editSubmit: function () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            let para = Object.assign({}, this.editForm)
            if (this.url === '') {
              // 没有编辑图片保存原来的..
              para.facephoto = this.editForm.facephoto
            } else {
              para.facephoto = this.url
            }
            para.roleid = parseInt(para.roleid)
            console.log(para)
            updateData(para).then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                // 直接修改父组件的属性
                this.$emit('update:visible', false)
                // 执行查询方法，刷新页面
                this.$emit('refresh')
              } else {
                this.$message({
                  message: '修改失败 ',
                  type: 'error'
                })
              }
            })
          })
        }
      })
    },

    childByValue (childValue) {
      this.url = childValue.url
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
