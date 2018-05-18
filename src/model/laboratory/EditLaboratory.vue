<template>
  <div class="add-dialog">
    <el-form :model="laboratoryForm" :rules="rules" ref="laboratoryForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="实验室名称" prop="laboratoryName">
        <el-input v-model="laboratoryForm.laboratoryName" style="float:left;width: 200px;margin: 0 0 0 5px"></el-input>
      </el-form-item>
      <el-form-item label="楼层" prop="floor">
        <select-option name="floor" v-model="laboratoryForm.floor" title="11"
                       style="float:left;width: 200px;margin: 0 0 0 5px"></select-option>
      </el-form-item>

      <el-form-item label="容量（人数）" prop="capacity">
        <el-input v-model="laboratoryForm.capacity" style="float:left;width: 200px;margin: 0 0 0 5px"></el-input>
      </el-form-item>

      <el-form-item label="是否预定" prop="isAutonomy">
        <el-radio v-model="laboratoryForm.isAutonomy" :label="1" style="float: left;margin: 12px 0 0 40px">是</el-radio>
        <el-radio v-model="laboratoryForm.isAutonomy" :label="0" style="float: left;margin: 12px 0 0 40px">否</el-radio>
      </el-form-item>
      <el-form-item>
        <el-tooltip content="修改" placement="bottom" effect="light">
          <el-button type="success" icon="icon-tsy-xiugai2" circle @click="submitForm('laboratoryForm')"
                     style="clear:both;float: left;margin-left: 0px"></el-button>
        </el-tooltip>
        <el-tooltip content="取消" placement="bottom" effect="light">
          <el-button el-button type="info" icon="icon-tsy-quxiao" circle @click="cancelSubmit"
                     style="margin-right: 100px"></el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import laboratoryAPI from '../../api/laboratory/LaboratoryAPI'

  import selectOption from '../../components/SelectConfigOption'

  export default {
    name: "edit-laboratory",

    components: {
      selectOption
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
        laboratoryForm: {},
        savePicDTO: {
          type: ''
        },

        isUpload: false,

        rules: {
          laboratoryName: [
            {required: true, message: '请输入实验室名称', trigger: 'blur'},
          ],
          floor: [
            {required: true, message: '请输入楼层', trigger: 'blur'}
          ],
          capacity: [
            {required: true, message: '请输入容量', trigger: 'blur'},
          ],
          isAutonomy: [
            {required: true, message: '请选择是否预定', trigger: 'blur'},
          ],
        }

      }
    },

    // 组件渲染之后
    mounted() {
      let self = this;
      self.getLaboratoryById();
    },

    methods: {

      // 获取设备信息
      async getLaboratoryById() {
        let self = this;
        let result = await laboratoryAPI.selectById({id: self.id});
        if (!result.status) {
          return self.$message({
            message: result.reason,
            type: 'warning'
          });
        }
        self.laboratoryForm = result.detail;
      },

      async submitForm(laboratoryForm) {
        let self = this;
        let isUpdate = false;
        self.$refs[laboratoryForm].validate((valid) => {
          if (valid) {
            isUpdate = true;
          } else {
            return false;
          }
        });
        if (isUpdate) {
          // 校验通过
          let result = await laboratoryAPI.updateLaboratory(self.laboratoryForm);
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
        }
      },

      // 取消新增
      cancelSubmit() {
        let self = this;
        self.close();
      },
    },
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
