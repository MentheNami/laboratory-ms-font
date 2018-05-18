<template>
  <div>
    <span class="linespan"><b>方案编号：</b>{{deviceProgramDetail.applyNo}}</span>

    <span class="linespan"><b>方案申请人：</b>{{deviceProgramDetail.applyUser}}</span>

    <span class="linespan"><b>设备名称：</b>{{deviceProgramDetail.deviceName}}</span>

    <span class="linespan"><b>方案类型：</b>{{deviceProgramDetail.programType}}</span>

    <span class="linespan"><b>方案描述：</b>{{deviceProgramDetail.description}}</span>

    <span class="linespan"><b>执行时间：</b>{{deviceProgramDetail.executionDate}}</span>

    <el-switch
      class="linebuttom"
      v-model="deviceProgramForm.approvalOpinion"
      active-value="1"
      inactive-value="0"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="同意"
      inactive-text="驳回">
    </el-switch>

    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="deviceProgramForm.approvalDescription">
    </el-input>

    <el-tooltip content="立即处理" placement="bottom" effect="light">
      <el-button type="primary" icon="icon-tsy-xiugai-copy" circle @click="submitForm" style="margin-top: 10px"></el-button>
    </el-tooltip>
  </div>
</template>

<script>

  import devicePlanAPI from '../../api/device/DevicePlanAPI'


    export default {
        name: "accept-device-plan",
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
        }
      },

      data() {
        return {

          // 投诉处理组成
          deviceProgramForm: {
            id: '',
            approvalOpinion: '',
            approvalDescription: ''
          },

          // 投诉建议详情
          deviceProgramDetail: {},

        }
      },

      // 组件渲染之后
      mounted() {
        let self = this;
        self.deviceProgramForm.id = self.id;
        self.initData();
      },

      methods: {

        async initData() {
          let self = this;
          let result = await devicePlanAPI.selectById({id: self.id});
          if (!result.status) {
            return self.$message({
              message: result.reason,
              type: 'warning'
            });
          }
          self.deviceProgramDetail = result.detail;
        },

        async submitForm() {
          let self = this;
          if ('' === self.deviceProgramForm.approvalDescription) {
            // 处理内容未填写
            return self.$message({
              message: '请填写审批意见',
              type: 'warning'
            });
          }
          let result = await devicePlanAPI.acceptDeviceProgram(self.deviceProgramForm);
          if (result.status) {
            self.$message({
              message: '操作成功',
              type: 'success'
            });
          } else {
            // 操作失败
            return self.$message({
              message: result.reason,
              type: 'warning'
            });
          }
          // 操作成功之后
          self.close();
          self.getList();
        },
        // 取消新增
        cancelSubmit() {
          let self = this;
          self.close();
        },
      }
    }
</script>

<style scoped>
  @import "../../assets/icon/iconfont.css";
  .linespan {
    float: left;
    margin-left: 30px;
    padding: 5px 0;
    width: 350px;
    text-align: left;
  }

  .linep {
    float: left;
    margin-left: 30px;
    padding-top: 0;
    margin-top: 5px;
    width: 350px;
    text-align: left;
  }

  .linebuttom {
    float: right;
    text-align: right;
    padding: 10px 0;
    width: 400px;
    font-weight: bold;
    display: block;
  }
</style>
