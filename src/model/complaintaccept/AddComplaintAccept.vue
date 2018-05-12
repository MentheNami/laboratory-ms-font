<template>
  <div class="add-dialog">
    <span>投诉时间：{{complaintDetail.gmtCreate}}</span>
    <span>投诉方名称：{{complaintDetail.complainantName}}</span>
    <span>投诉编号：{{complaintDetail.complaintNo}}</span>
    <span>联系人：{{complaintDetail.contactName}}</span>
    <span>联系电话：{{complaintDetail.contactPhone}}</span>
    <span>联系邮箱：{{complaintDetail.contactEmail}}</span>
    <span>地址：{{complaintDetail.address}}</span>
    <span>投诉标题：{{complaintDetail.complaintTitle}}</span>
    <span>投诉详情：{{complaintDetail.complaintDetail}}</span>
    <span>投诉状态：{{complaintDetail.complainantStatus}}</span>
    <el-switch
      style="display: block"
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

  </div>
</template>

<script>

  import complaintAPI from '../../api/complaint/ComplaintAPI'
  import complaintAcceptAPI from '../../api/complaint/ComplaintAcceptAPI'

  export default {
    name: "add-complaint-accept",
    components: {
    },
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
        complaintAcceptForm: {
          complainId: '',
          processingAdvice: '',
          processingContent: ''
        },

        complaintDetail: {},

        rules: {
          complainantName: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          contactEmail: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
        }

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

      async submitForm(complaintForm) {
        let self = this;
        self.$refs[complaintForm].validate((valid) => {
          if (valid) {
          } else {
            return false;
          }
        });
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

</style>
