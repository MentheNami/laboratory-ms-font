<template>
    <div>个人信息

      <el-button plain :style="buttonStyle" @click="test">9:00-10:00</el-button>
      <el-button plain :style="buttonStyle">10:00-11:00</el-button>
      <el-button plain :style="buttonStyle">11:00-12:00</el-button>
      <el-button plain :style="buttonStyle">12:00-13:00</el-button>
      <el-button plain :style="buttonStyle">13:00-14:00</el-button>
      <el-button plain :style="buttonStyle">朴素按钮</el-button>
      <el-button plain :style="buttonStyle">朴素按钮</el-button>
      <el-button plain :style="buttonStyle">朴素按钮</el-button>
      <el-button plain :style="buttonStyle">朴素按钮</el-button>
      <el-button plain :style="buttonStyle">朴素按钮</el-button>
      <el-button plain :style="buttonStyle">朴素按钮</el-button>
      <el-button plain :style="buttonStyle">朴素按钮</el-button>
      <el-button plain :style="buttonStyle">朴素按钮</el-button>

    </div>
</template>

<script>
    export default {
        name: "self-info",
      data() {
        return {

          selectStyle:'color:red',
          selectStyle22:'color:black',
          buttonStyle:''

        }},


      methods: {
          test() {
            this.buttonStyle = this.selectStyle;
          }
      }
    }
</script>

<style scoped>

</style>
