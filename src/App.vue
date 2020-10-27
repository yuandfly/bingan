<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import url("./assets/css/reset.css");
@import url("assets/css/style.css");
// html {
//   overflow: hidden;
// }
body {
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background: #e0e0e0;
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
</style>
