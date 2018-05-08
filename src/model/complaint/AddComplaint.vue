<template>
  <div class="add-dialog">
    <el-form :model="complaintForm" :rules="rules" ref="complaintForm" label-width="150px" class="demo-ruleForm">

      <el-form-item label="投诉方名称" prop="complainantName">
        <el-input v-model="complaintForm.complainantName" style="float:left;width: 200px;margin: 0 0 0 5px"></el-input>
      </el-form-item>

      <el-form-item label="联系人" prop="contactName">
        <el-input v-model="complaintForm.contactName" style="float:left;width: 200px;margin: 0 0 0 5px"></el-input>
      </el-form-item>

      <el-form-item label="联系电话" prop="contactPhone">
        <el-input v-model="complaintForm.contactPhone" style="float:left;width: 200px;margin: 0 0 0 5px"></el-input>
      </el-form-item>

      <el-form-item label="联系邮箱" prop="contactEmail">
        <select-option v-model="complaintForm.contactEmail"
                       style="float:left;width: 200px;margin: 0 0 0 5px"></select-option>
      </el-form-item>

      <el-form-item label="地址" prop="address">
        <select-option v-model="complaintForm.address"
                       style="float:left;width: 200px;margin: 0 0 0 5px"></select-option>
      </el-form-item>

      <el-form-item label="投诉标题" prop="complaintTitle">
        <select-option v-model="complaintForm.complaintTitle"
                       style="float:left;width: 200px;margin: 0 0 0 5px"></select-option>
      </el-form-item>

      <el-form-item label="投诉详情" prop="complaintDetail">
        <select-option v-model="complaintForm.complaintDetail"
                       style="float:left;width: 200px;margin: 0 0 0 5px"></select-option>
      </el-form-item>


        <el-form-item>
        <el-button type="primary" @click="submitForm('complaintForm')" style="clear:both;float: left;margin-left: 0px">添加
        </el-button>
        <el-button @click="cancelSubmit" style="margin-right: 100px">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import selectOption from '../../components/SelectConfigOption'
  import compliantAPI from '../../api/complaint/CompaliantAPI'
  export default {
    name: "add-complaint",
    components: {
      selectOption
    },
    props: {
      close: {
        type: Function,
        required: false
      },
      getList: {
        type: Function,
        required: false
      }
    },
    data() {
      return {
        complaintForm: {
          complainantName: '',
          contactName: '',
          contactPhone: '',
          contactEmail: '',
          address: '',
          complaintTitle: '',
          complaintDetail: ''
        },
        radio: '1',

        isUpload: false,

        rules: {
          complainantName: [
            {required: true, message: '请输入设备名称', trigger: 'blur'},
          ],
          contactEmail: [
            {required: true, message: '请选择所属会议室', trigger: 'blur'}
          ],
          contactName: [
            {required: true, message: '请选择设备类别', trigger: 'blur'},
          ],
          contactPhone: [
            {required: true, message: '请输入状态', trigger: 'blur'},
          ],
        }

      }
    },


    methods: {

      async submitForm(complaintForm) {
        let self = this;
        self.$refs[complaintForm].validate((valid) => {
          if (valid) {
          } else {
            return false;
          }
        });
        // 校验通过
        // TODO 投诉API 未完成
        let result = await compliantAPI.addComplaint(self.complaintForm);
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
  .add-dialog {
    width: 100%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
</style>
