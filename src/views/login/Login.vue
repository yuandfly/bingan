<template>
  <div class="bg">
    <div class="bgbox">
      <div class="title">医院综合统计信息管理系统</div>
      <div class="loginbox">
        <h1>用户登录</h1>
        <div class="content">
          <el-form :model="loginObj" :rules="rules" ref="loginForm">
            <el-form-item prop="userName">
              <el-input v-model="loginObj.userName" placeholder="0004"></el-input>
            </el-form-item>
            <el-form-item prop="passWord">
              <el-input v-model="loginObj.passWord" type="password" placeholder="***"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked">记住我</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="btn" @click="loginBtn">登录</el-button>
            </el-form-item>
            <a href="#">忘记密码?</a>
            <!-- 针对忘记密码  忘记密码去注册  还有对这个进行一设置 -->
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mutations, mapMutations } from "vuex";
import { getMd5 } from "@/utils";
import { loginAdmin } from "@/api";
export default {
  data() {
    return {
      checked: "false",
      loginObj: {
        userName: "",
        passWord: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 2, max: 18, message: "长度在 2 到 18 个字符", trigger: "blur" }
        ],
        checked: [
          {
            required: "true"
          }
        ]
      }
    };
  },
  methods: {
    //要对密码进行拦截
    ...mapMutations("user", ["setUserInfo"]),
    loginBtn() {
      //登录按钮
      //进行表单验证
      var loginMsg = JSON.parse(JSON.stringify(this.loginObj)); //对登录的信息进行处理
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //还有对checkedbox的验证如何去实现
          // console.log("验证通过");
        //  console.log(loginMsg);
          loginMsg.passWord = getMd5(loginMsg.passWord);
        //  console.log(loginMsg);
          // 当验证通过的时候,跳转到后台首页
          // this.$router.push({ name: "dashboard" });

          loginAdmin(loginMsg).then(res => {
            if (res.code == 0) {
              //code返回时0的时候
              // console.log(res.data);
              this.setUserInfo(res.data); //一定要保存用户的登录信息
              this.$router.push({ name: "dashboard" });
            }
          });
        } else {
        //  console.log("验证不通过");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/images/cloud.jpg") repeat-x 0 bottom #049ec4;
  animation: move 20s linear 0s infinite both;
  -webkit-animation: move 20s linear 0s infinite both;
  display: flex;
  align-items: center;
  justify-content: center;
  .bgbox {
    .title {
      transform: translateY(-50px);
      font-size: 30px;
      color: #fff;
    }
    .loginbox {
      position: relative;
      .content {
        width: 280px;
        padding: 10px 10px 0px;
        /deep/.el-form-item__content {
          line-height: 1px;
        }
        a {
          font-size: 14px;
          position: absolute;
          text-decoration: none;
          color: skyblue;
          bottom: 10px;
        }
        .btn {
          width: 100%;
          display: block;
          background: #0d7b89;
        }
      }
      width: 280px;
      height: 280px;
      background-color: #fff;
      margin-left: 40px;
      h1 {
        font-size: 14px;
        color: #fff;
        background: #0d7b89;
        padding: 10px 10px;
      }
    }
  }
}

@keyframes move {
  0% {
    background-position-x: 0px;
  }
  100% {
    background-position-x: -2000px;
  }
}
</style>