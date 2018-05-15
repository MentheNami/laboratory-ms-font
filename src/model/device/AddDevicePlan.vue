<template>
  <div>
    <span>a</span>
  </div>
</template>

<script>

  import deviceAPI from '../../api/device/DeviceAPI'

  export default {
    name: "add-device-plan",

    components: {},

    props: {
      close: {
        type: Function,
        required: true
      },
      getList: {
        type: Function,
        required: true
      },
      id: {
        type: Number,
        required: true
      },
    },

    data() {
      return {

      }
    },

    // 组件渲染之后
    mounted() {
      let self = this;
      this.initData();
    },

    methods: {

      // 初始化数据
      async initData() {
        let self = this;
        let result = await deviceAPI.selectById({id: self.id});
        console.log(result.detail);
      }

    }

  }
</script>

<style scoped>

</style>
