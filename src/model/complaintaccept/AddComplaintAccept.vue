<template>
  <div>
    <span class="linespan"><b>投诉编号：</b>{{complaintDetail.complaintNo}}</span>

    <span class="linespan"><b>投诉方名称：</b>{{complaintDetail.complainantName}}</span>

    <span class="linespan"><b>投诉时间：</b>{{complaintDetail.gmtCreate}}</span>

    <span class="linespan"><b>地址：</b>{{complaintDetail.address}}</span>

    <span class="linespan"><b>投诉标题：</b>{{complaintDetail.complaintTitle}}</span>

    <p class="linep"><b>投诉详情：</b>{{complaintDetail.complaintDetail}}</p>

    <span class="linespan"><b>投诉状态：</b>{{complaintDetail.complainantStatus}}</span>

    <el-switch
      class="linebuttom"
      v-model="complaintAcceptForm.processingAdvice"
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
      v-model="complaintAcceptForm.processingContent">
    </el-input>

    <el-tooltip content="立即处理" placement="bottom" effect="light">
      <el-button type="success" icon="el-icon-check" circle @click="submitForm"
                 style="clear:both;float: left"></el-button>
    </el-tooltip>
  </div>
</template>

<script>

  import complaintAPI from '../../api/complaint/ComplaintAPI'
  import complaintAcceptAPI from '../../api/complaint/ComplaintAcceptAPI'

  export default {
    name: "add-complaint-accept",
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
        complaintAcceptForm: {
          complainId: '',
          processingAdvice: '',
          processingContent: ''
        },

        // 投诉建议详情
        complaintDetail: {},

      }
    },

    // 组件渲染之后
    mounted() {
      let self = this;
      self.complaintAcceptForm.complainId = self.id;
      self.initData();
    },

    methods: {

      async initData() {
        let self = this;
        let result = await complaintAPI.selectById({id: self.id});
        if (!result.status) {
          return self.$message({
            message: result.reason,
            type: 'warning'
          });
        }
        self.complaintDetail = result.detail;
      },

      async submitForm() {
        let self = this;
        if ('' === self.complaintAcceptForm.processingContent) {
          // 处理内容未填写
          return self.$message({
            message: '请填写处理内容',
            type: 'warning'
          });
        }
        let result = await complaintAcceptAPI.handlingComplaint(self.complaintAcceptForm);
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
