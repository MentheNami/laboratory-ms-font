<template>
  <el-row class="tac">
    <!--24 标签占满-->
    <el-col :span="24">
      <el-menu
       :default-active="$route.path"
        class="el-menu-vertical-demo"
        unique-opened
        router
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu v-for="item in menuConfig" :index="item.componentName" :key="item.componentName" v-if="item.level === '10'? item.level === level : true">
          <template slot="title">
            <span v-text="item.name"></span>
          </template>
          <el-menu-item-group class="over-hide" v-for="sub in item.sub" :key="sub.componentName" v-if="sub.level === '10'? sub.level === level : true">
            <el-menu-item :index="sub.componentName" v-text="sub.name">
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>

  import menuConfig from "../config/MenuConfig"

  let cookies = require('browser-cookies');

  export default {
    name: "nav-menu",

    mounted() {
      let self = this;
      self.level = cookies.get('level');
    },

    data () {
      return {
        menuConfig: menuConfig,
        level: ''
      }
    },
    methods: {
   }
  }
</script>

<style scoped>
.over-hide{
  background-color: #606266;
}

</style>
