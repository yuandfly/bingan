<template>
  <el-form
    :model="ruleForm2"
    :rules="rules2"
    ref="ruleForm2"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
  >
    <h3 class="title">系统登录</h3>
    <el-form-item prop="userName">
      <el-input type="text" v-model="ruleForm2.userName" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="passWord">
      <el-input type="password" v-model="ruleForm2.passWord" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="handleSubmit2" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// import { post } from "@/http/http.js";
import { post } from "../utils/http";
import { getUnit } from "@/api";
import crypto from "@/common/js/crypto.js";
import { getCookie } from "@/common/js/cookie.js";
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {},
      /*{
        account: "a",
        checkPass: "0"
      },*/
      rules2: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  created() {
    this.keyupSubmit();
  },
  methods: {
    keyupSubmit() {
      let that = this;
      document.onkeydown = e => {
        let _key = window.event.keyCode;
        if (_key === 13) {
          //登陆成功后，将回车事件取消，避免登录后全局触发
          document.onkeydown = undefined;
          that.handleSubmit2();
        }
      };
    },
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2() {
      post("/adminLogin/login", {
        userName: this.ruleForm2.userName,
        passWord: crypto.MD5(this.ruleForm2.passWord)
      })
        .then(data => {
          if (data.code != 0) {
            this.$message({ message: data.msg, type: "error" });
            return false;
          } else {
            let msg = "欢迎[" + data.data.adminLoginVO.nickname + "]登录!";
            // this.$message({ message: msg, type: "success" });
          }
          let sessionUser = {};
          sessionUser.adminData = data.data.adminLoginVO;
          sessionUser.permission = data.data.permissionTreeList;
          // sessionUser.token = getCookie("token");
          sessionUser.token = data.data.adminLoginVO.token;
          let values = crypto.encrypt(JSON.stringify(sessionUser, null));
          sessionStorage.setItem("sessionUser", values);
          // this.$router.push({ path: "/admin/dashboard" });
          this.$router.push({ path: "/admin/homepage" });

        // 获取单位名称
          getUnit().then((res) => {
            if (res.code === 0) {
              sessionStorage.setItem('unitName', res.data.fyymc);
            }
          });

        })
        .catch(function(error) {
        //  console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
}
</style>
