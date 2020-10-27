<template>
  <!-- 头部内容盒子开始 -->
  <div class="headBox">
    <div class="headerscroll">
      <div class="title">病案管理系统</div>
      <!-- 菜单区域 -->
      <div class="menu">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          text-color="#FFFFFF"
          background-color="#0683B1"
          active-text-color="#FF8000"
          router
        >
          <el-submenu
            :index="item.id"
            v-for="item in permissionTreeList"
            :key="item.id"
          >
            <template slot="title">{{ item.name }}</template>
            <el-menu-item
              :index="item.key"
              :key="item.id"
              v-if="!item.childList"
              >{{ item.name }}</el-menu-item
            >
            <el-menu-item
              :index="one.key"
              v-for="one in item.childList"
              :key="one.id"
              v-if="!one.childList"
              >{{ one.name }}</el-menu-item
            >
            <el-submenu :index="one.id" v-else>
              <template slot="title">{{ one.name }}</template>
              <el-menu-item
                :index="owm.key"
                v-for="owm in one.childList"
                :key="owm.id"
                >{{ owm.name }}</el-menu-item
              >
            </el-submenu>
          </el-submenu>
        </el-menu>
      </div>
      <!-- 登录退出接口 -->
      <div class="rightrwall">
        <el-dropdown trigger="click" @command="choiseCom">
          <div class="el-dropdown-link">
            <el-avatar :src="circleUrl"></el-avatar>
            <span class="admin">{{ user.username }}-欢迎你!!!</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" command="1"
              >个人中心</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-circle-plus" command="2"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <changePassword :visible.sync="dialogFormVisible"></changePassword>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { get } from '@/utils/http.js';
import crypto from '@/common/js/crypto.js';
import { delCookie } from '@/common/js/cookie.js';
import changePassword from '@/components/system/admin/ChangePassword.vue';
import { logout } from '@/api';

export default {
  name: 'home',
  components: { changePassword },
  data() {
    return {
      form: {
        originalPassword: '',
        newPassword: '',
        rePassword: '',
      },
      dialogFormVisible: false,
      permissionTreeList: [],
      activeIndex: '1',
      activeIndex2: '1',
      circleUrl:
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
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
    ...mapMutations('user', ['removeUserInfo']),
    //菜单栏目选择的方法
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (
        !keyPath[1] &&
        key.indexOf('/admin/shelf') < 0 &&
        key.indexOf('/admin/trace') < 0
      ) {
        this.dialogFormVisible = true;
      }
    },
    modification() {
      this.dialogFormVisible = false;
    },
    choiseCom(val) {
      if (val == 1) {
        // console.log("个人中心");
      } else {
        //退出到登录页面  清除登录信息
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          logout({}).then((res) => {
            if (res.code === 0) {
              this.$router.push({ path: '/' });
              sessionStorage.removeItem('sessionUser');
              delCookie('token');
              delCookie('JSESSIONID');
            }
          });
          // this.$router.push({ name: "adlogin" });
          // this.removeUserInfo();
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.headBox {
  width: 100%;
  height: 70px;
  cursor: pointer;
  background-color: #0683b1;
  .headerscroll {
    display: flex;
    overflow: hidden;
    .title {
      width: 200px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      color: #fff;
    }
    .menu {
      width: calc(100% - 200px - 300px);
      height: 70px;
      padding-top: 5px;
      /deep/.el-menu.el-menu--horizontal {
        display: flex;
        border-bottom: 0;
        overflow: hidden;
        .el-submenu {
          float: none;
          flex: 1;
        }
        .el-submenu__title {
          padding: 0;
          text-align: center;
        }
      }
    }
    .rightrwall {
      width: 300px;
      height: 70px;
      padding-top: 13px;
      // background-color: #0080c0;
      .el-dropdown {
        margin-left: 100px;
      }
      .admin {
        display: inline-block;
        margin-left: 10px;
        transform: translateY(-10px);
        color: #eee;
      }
    }
  }
  .formLabelWidth {
    width: 300px;
  }
}
</style>
