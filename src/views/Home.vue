<style scoped>
.icon {
  font-size: 30px;
  color: #fff;
  margin-left: -40px;
  margin-top: 1%;
}

.header-title {
  width: 8.5%;
  text-align: center;
  color: #fff;
  font-size: 22px;
}

/**头像 */
.avatar {
  margin-top: 13%;
}

.center {
  text-align: center;
}

html,
body,
#app,
.homeBox,
.el-container {
  padding: 0px;
  /*设置内部填充为0 几个布局元素之间没有间距*/
  margin: 0px;
  /*设置外部填充为0 几个布局元素之间没有间距*/
  height: 100%;
  /*统一设置高度为100%*/
}
</style>

<template>
  <section>
    <div class="homeBox">
      <el-container>
        <!-- <el-header>
          <el-row>
            <el-col :span="3" class="header-title">{{sysName}}</el-col>
            <el-col :span="18">
            
              <span @click="getCollapse(false)">
                <i class="el-icon-s-fold icon" v-if="isCollapse===true"></i>
              </span>
              <span @click="getCollapse(true)">
                <i class="el-icon-s-unfold icon" v-if="isCollapse===false"></i>
              </span>
            </el-col>
            <el-col :span="1" class="center" v-if="user.facephoto!=''">
              <el-avatar :size="40" class="avatar" :src="user.facephoto" @error="errorHandler"></el-avatar>
            </el-col>
            <el-col :span="1" class="center" v-if="user.facephoto==''">
              <el-avatar :size="40" class="avatar" :src="sysUserAvatar" @error="errorHandler"></el-avatar>
            </el-col>
            <el-col :span="1" class="center">
              <el-menu
                class="el-menu-demo"
                mode="horizontal"
                background-color="#409EFF"
                text-color="#fff"
                active-text-color="#fff"
              >
                <el-submenu index="2">
                  <template slot="title">{{user.nickname}}</template>
                  <el-menu-item index="2-1" @click="ChangePassword()">修改密码</el-menu-item>
                  <el-menu-item index="2-2" @click="logout()">退出登录</el-menu-item>
                </el-submenu>
              </el-menu>

            </el-col>

        
          </el-row>
        </el-header>-->

        <el-container>
          <el-aside :width="menuWidth">
            <el-menu
              default-active="1-4-1"
              class="el-menu-vertical-demo homeBox"
              @open="handleOpen"
              unique-opened
              @close="handleClose"
              :collapse="isCollapse"
            >
              <template v-for="(item, index) in permissionTreeList">
                <el-submenu :index="index + ''" :key="index">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.name }}</span>
                  </template>
                  <el-menu-item
                    v-for="child in item.childList"
                    :index="child.key"
                    :key="child.key"
                    @click="toContent(item.name, child)"
                  >
                    <span>{{ child.name }}</span>
                  </el-menu-item>
                </el-submenu>
              </template>
            </el-menu>
          </el-aside>
          <el-main>
            <el-row>
              <el-col :span="24" class="content-wrapper">
                <!--<transition name="fade"
                          mode="out-in">
                <router-view></router-view>
                </transition>-->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="{ path: '/' }">{{
                    indexName
                  }}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
                </el-breadcrumb>
                <router-view></router-view>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <change-password
      v-if="dialogVisibles"
      :visible.sync="dialogVisibles"
    ></change-password>
  </section>
</template>

<script>
import { get } from '@/utils/http.js';
import crypto from '@/common/js/crypto.js';
import { delCookie } from '@/common/js/cookie.js';
import changePassword from '@/components/system/admin/ChangePassword.vue';

export default {
  components: {
    changePassword,
  },
  data() {
    return {
      indexName: '首页',
      title: '个人工作台',
      sysName: '直报系统',
      dialogVisibles: false,

      menuWidth: '220px',
      isCollapse: false, //展开与收起
      permissionTreeList: [],
      user: {},
      sysUserAvatar: require('../common/image/ad.png'),
    };
  },
  created() {
    let sessionUser = sessionStorage.getItem('sessionUser');
    let sessionUserValue = crypto.decrypt(sessionUser, null);
    if (sessionUserValue) {
      sessionUserValue = JSON.parse(sessionUserValue);
      this.permissionTreeList = sessionUserValue.permission;
      this.user = sessionUserValue.adminData;
    }
    if (
      sessionStorage.getItem('indexName') !== null &&
      sessionStorage.getItem('indexName') !== ''
    ) {
      this.indexName = sessionStorage.getItem('indexName');
    }
    if (
      sessionStorage.getItem('title') !== null &&
      sessionStorage.getItem('title') !== ''
    ) {
      this.title = sessionStorage.getItem('title');
    }
  },
  methods: {
    //用户密码修改
    ChangePassword() {
      this.dialogVisibles = true;
    },

    //展开与收起
    getCollapse(it) {
      if (it === true) {
        this.menuWidth = '70px';
      } else {
        this.menuWidth = '220px';
      }
      this.isCollapse = it;
    },
    //图片加载失败
    errorHandler() {
      return true;
    },
    //菜单跳转
    toContent(name, child) {
      sessionStorage.setItem('indexName', name);
      sessionStorage.setItem('title', child.name);
      this.indexName = sessionStorage.getItem('indexName');
      this.title = sessionStorage.getItem('title');
      return this.$router.push({
        path: child.key,
      });
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    logout() {
      this.$confirm('确认退出吗?', '提示', {
        //type: 'warning'
      })
        .then(() => {
          get('/adminLogin/logout', {})
            .then((data) => {
              if (data.code != 0) {
                this.$message({
                  message: data.msg,
                  type: 'error',
                });
                return false;
              }
              sessionStorage.removeItem('sessionUser');
              delCookie('token');
              delCookie('JSESSIONID');
              this.$router.push({
                path: '/login',
              });
            })
            .catch(function (error) {
              //  console.log(error);
            });
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #2d8cf0;
  color: #333;
  line-height: 60px;
}

/**设置头*/
.el-aside {
  color: #333;
  line-height: 220px;
}

.el-main {
  background-color: #fff;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

/**设置左侧菜单样式*/
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
