<template>
  <div>
    <p>
      姓名：{{selfInfo.realName}}
      手机号：{{selfInfo.cellPhone}}
      邮箱：{{selfInfo.email}}
    </p>
  </div>
</template>

<script>

  import userInfoAPI from '../../api/info/UserInfoAPI'

  export default {
    name: "self-info",

    // 组件渲染之后
    mounted() {
      let self = this;
      self.initData();
    },

    // 数据
    data() {
      return {
        selfInfo: {

        }
      }
    },

    // 方法
    methods: {
      async initData() {
        let self = this;
        let result = await userInfoAPI.getSelfInfo();
        // 检验接口获取数据是否成功
        if (!result.status) {
          return self.$message({
            message: result.reason,
            type: 'warning'
          });
        }
        self.selfInfo = result.detail;
      }
    }

  }
</script>

<style scoped>

</style>
