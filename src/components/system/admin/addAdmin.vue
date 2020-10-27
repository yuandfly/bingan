<template>
  <!-- 新增界面 -->
  <el-dialog title="新增员工"
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
      <el-form-item label="员工账号"
                    prop="nickname">
        <el-input v-model.trim="addForm.nickname"
                  class="myselect"></el-input>
      </el-form-item>

      <el-form-item label="员工头像" prop="facephoto">
        <COS  v-on:childByValue="childByValue" :type="cosType"></COS>
      </el-form-item>

      <el-form-item label="员工姓名"
                    prop="username">
        <el-input v-model.trim="addForm.username"
                  class="myselect"></el-input>
      </el-form-item>

      <el-form-item label="登录密码"
                    prop="password">
        <el-input v-model.trim="addForm.password"
                  class="myselect"
                  type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="checkPass">
        <el-input v-model.trim="addForm.checkPass"
                  class="myselect"
                  type="password"></el-input>
      </el-form-item>

      <el-form-item label="员工电话" prop="telephone">
        <el-input v-model.trim="addForm.telephone"
                  class="myselect"></el-input>
      </el-form-item>

      <el-form-item label="员工邮箱" prop="email">
        <el-input v-model.trim="addForm.email"
                  class="myselect"></el-input>
      </el-form-item>

      <el-form-item label="员工角色"
                    prop="roleid">
        <el-select v-model="addForm.roleid"
                   class="myselect"
                   placeholder="请选择角色">
          <el-option v-for="item in getRoleList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="addForm.sex">
          <el-radio class="radio" :label="0">男</el-radio>
          <el-radio class="radio" :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="center">
        <el-button @click.native="close">取消</el-button>
        <el-button type="primary"
                   size="medium"
                   @click.native="addSubmit">提交</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import roleList from '../../../constants/options/roleOption.js'
import {insertData} from '../../../api/system/admin'
import util from '../../../common/js/util'

import crypto from "../../../common/js/crypto.js"
export default {
  components: {
 
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    // 校验用户账号
    let validateNickName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入员工账号'))
      } else {
        let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/.test(value)
        if (!reg) {
          callback(new Error('只能输入中英文、数字，长度1-20'))
        }
        callback()
      }
    }

    // 校验密码
    let validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        if (this.addForm.checkPass !== '') {
          this.$refs.addForm.validateField('checkPass')
        }
        callback()
      }
    }
    // 校验确认密码
    let validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
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
    // 校验手机号
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
      addForm: {},
      addFormRules: {
        username: [{ required: true, message: '请输入员工姓名', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/, message: '只能输入中英文、数字，长度1-20'}],
        nickname: [{validator: validateNickName, trigger: 'blur'}],
        telephone: [{validator: validateTelephone, trigger: 'blur'}],
        email: [{validator: validateEmail, trigger: 'blur'}],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        roleid: [{ required: true, message: '请选择员工所属角色', trigger: 'change' }],
        sex: [{ required: true, message: '请选择员工性别', trigger: 'blur' }]
      },
      /** 角色下拉选 */
      getRoleList: roleList.roleSelect(),
      cosType: 1, // 1-单张图片
      url: '',
      isUse: 'false'
    }
  },
  methods: {
    close () {
      // 直接修改父组件的属性
      this.$emit('update:visible', false)
    },
    // 新增员工列表
    addSubmit: function () {
      // // 先校验账号是否已经存在..
      // getStaffByLoginName(this.addForm.staffLoginName).then(res => {
      //   if (res.data.data === 1) {
      //     this.$message({
      //       message: '您输入的员工账号已经被使用了,请重新输入 ',
      //       type: 'error'
      //     })
      //   } else {
          this.$refs.addForm.validate(valid => {
            if (valid) {
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                this.addLoading = true
                let para = Object.assign({}, this.addForm)
                para.createTime = util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
                para.facephoto = this.url
                // para.staffPwd = cryptoUtil.MD5(para.staffAliasName + '-' + para.staffPwd)
                para.password = crypto.MD5(this.addForm.password)
                para.disabled = 0 // 员工状态默认正常..
               // console.log(Object.assign({}, para))
                insertData(para).then(res => {
                  if (res.data.code === 0) {
                    this.$message({
                      message: '添加成功',
                      type: 'success'
                    })
                    // 直接修改父组件的属性
                    this.$emit('update:visible', false)
                    // 执行查询方法，刷新页面
                    this.$emit('refresh')
                  } else {
                    this.$message({
                      message: '添加失败 ',
                      type: 'error'
                    })
                  }
                })
              })
            }
          })
      //   }
      // })
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
