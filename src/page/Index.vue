<template>
  <el-container>
    <el-header class="header">
      <m-header></m-header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <nav-menu></nav-menu>
      </el-aside>
      <el-main>
        <!--具体内容   内嵌动画  淡入-->
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
        <!--具体内容-->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import NavMenu from "../components/NavMenu";
  import mHeader from "../components/mHeader";

  export default {
    name: "index",
    components: {
      NavMenu,
      'nav-menu': NavMenu,
      'mHeader': mHeader
    }
  }
</script>

<style scoped>
  /*Header 样式*/
  .header {
    background-color: #409EFF;
    color: #fff;
    line-height: 60px;
  }
  .el-aside{
    background-color: #545C64;
    height: 550px;
  }
</style>
