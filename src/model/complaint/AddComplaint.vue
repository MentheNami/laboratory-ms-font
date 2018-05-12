<template>
  <div class="add-dialog">
    <el-form :model="complaintForm" :rules="rules" ref="complaintForm" label-width="100px" class="demo-ruleForm" label-position="right">

      <el-form-item label="投诉方名称" prop="complainantName" style="float: left">
        <el-input v-model="complaintForm.complainantName" style="float:left;width: 200px;"></el-input>
      </el-form-item>

      <el-form-item label="联系人" prop="contactName" style="float: right">
        <el-input v-model="complaintForm.contactName" style="float:right;width: 200px;margin-right:60px"></el-input>
      </el-form-item>

      <el-form-item label="联系电话" prop="contactPhone" style="clear: both;float: left">
        <el-input v-model="complaintForm.contactPhone" style="float:left;width: 200px;"></el-input>
      </el-form-item>

      <el-form-item label="联系邮箱" prop="contactEmail" style="float: right">
        <el-input v-model="complaintForm.contactEmail"  style="float:right;width: 200px;margin-right:60px"></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="address">
        <el-input v-model="complaintForm.address" style="float:left;width: 200px;margin: 0 0 0 5px"></el-input>
      </el-form-item>

      <el-form-item label="投诉标题" prop="complaintTitle">
        <el-input v-model="complaintForm.complaintTitle" style="float:left;width: 200px;margin: 0 0 0 5px"></el-input>

      </el-form-item>

      <el-form-item label="投诉详情" prop="complaintDetail">
        <el-input type="textarea"  v-model="complaintForm.complaintDetail" style="float:left;width: 200px;margin: 0 0 0 5px;"  :rows="5" ></el-input>
      </el-form-item>


      <el-tooltip content="添加" placement="bottom" effect="light">
        <el-button type="success"  icon="el-icon-check"  circle @click="submitForm('laboratoryForm')" style="clear:both;float: left;margin-left: 120px"></el-button>
      </el-tooltip>
      <el-tooltip content="取消" placement="bottom" effect="light">
        <el-button  el-button type="info"  icon="el-icon-close"  circle  @click="cancelSubmit" style="margin-left: 20px"></el-button>
      </el-tooltip>

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
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          contactEmail: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          contactName: [
            {required: true, message: '请输入联系人', trigger: 'blur'},
          ],
          contactPhone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入地址', trigger: 'blur'},
          ],
          complaintTitle: [
            {required: true, message: '请输入投诉标题', trigger: 'blur'},
          ],
          complaintDetail: [
            {required: true, message: '请输入投诉内容', trigger: 'blur'},
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
