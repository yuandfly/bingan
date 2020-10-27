<template>
  <div class="layout">
    <helmet></helmet>
    <primary></primary>
    <div class="thirdly">
      <Tags></Tags>
      <div class="main">
<!--        <keep-alive :include="tagsList">-->
<!--          <router-view ></router-view>-->
<!--        </keep-alive>-->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Helmet from "./Helmet.vue";
import primary from "./Primary.vue";
import Tags from "./Tags";
import bus from './bus';
export default {
  components: {
    Helmet,
    primary,
    Tags
  },
  data () {
    return {
      tagsList: []
    }
  },
  created() {
    bus.$on('tags', msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      console.log(this.tagsList, this.$route.meta);

    });
  }
};
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
  overflow: hidden;
  .thirdly {
    .main {
      width: 100%;
      // 此处可以不设置最小高度
      // min-height: 100vh;
      // background-color: pink;
      margin-top: 0px;
      // margin-top: 140px;
      // padding-bottom: 40px;
    }
  }
}
</style>
