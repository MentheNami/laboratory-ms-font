<template>
  <div class="add-dialog">
    <el-form :model="laboratoryForm" :rules="rules" ref="laboratoryForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="实验室名称" prop="laboratoryName">
        <el-input v-model="laboratoryForm.laboratoryName" style="float:left;width: 200px;margin: 0 0 0 5px" ></el-input>
      </el-form-item>
      <el-form-item label="楼层" prop="floor" >
        <select-option name="floor" v-model="laboratoryForm.floor" title="11"style="float:left;width: 200px;margin: 0 0 0 5px"></select-option>
      </el-form-item>

      <el-form-item label="容量（人数）" prop="capacity" >
        <el-input v-model="laboratoryForm.capacity" style="float:left;width: 200px;margin: 0 0 0 5px"></el-input>
      </el-form-item>

      <el-form-item label="是否预定" prop="isAutonomy"  >
        <el-radio v-model="radio" label="1" style="float: left;margin: 12px 0 0 40px">是</el-radio>
        <el-radio v-model="radio" label="2"  style="float: left;margin: 12px 0 0 40px">否</el-radio>
      </el-form-item>
      <el-form-item>
        <el-tooltip content="添加" placement="bottom" effect="light">
        <el-button type="success"  icon="icon-tsy-new"  circle @click="submitForm('laboratoryForm')" style="clear:both;float: left;margin-left: 0px"></el-button>
        </el-tooltip>
        <el-tooltip content="取消" placement="bottom" effect="light">
        <el-button  el-button type="info"  icon="icon-tsy-quxiao"  circle  @click="cancelSubmit" style="margin-right: 100px"></el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import laboratoryAPI from '../../api/laboratory/LaboratoryAPI'

  import selectOption from '../../components/SelectConfigOption'

  export default {
    name: "add-laboratory",
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
        laboratoryForm: {
          laboratoryName:'',
          floor:'',
          capacity:'',
          isAutonomy:'',
        },
        radio: '1',
        savePicDTO: {
          type: ''
        },

        isUpload: false,

        rules: {
          laboratoryName: [
            { required: true, message: '请输入实验室名称', trigger: 'blur' },
          ],
          floor: [
            { required: true, message: '请输入楼层', trigger:'blur' }
          ],
          capacity: [
            { required: true, message: '请输入容量', trigger: 'blur' },
          ],
          isAutonomy: [
            { required: true, message: '请选择是否预定', trigger: 'blur' },
          ],
        }

      }
    },


    methods: {

      async submitForm(laboratoryForm) {
        let self = this;
        self.$refs[laboratoryForm].validate((valid) => {
          if (valid) {
          } else {
            return false;
          }
        });
        // 校验通过
        let result = await laboratoryAPI.addLaboratory(self.laboratoryForm);
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
    },
    components:{
      selectOption
    }
  }
</script>

<style scoped>
  .add-dialog {
    width: 100%;
  }

  .module {
    width: 50%;
    float: left;
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
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
