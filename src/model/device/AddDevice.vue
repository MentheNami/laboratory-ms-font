<template>
  <div class="add-dialog">
    <el-form :model="deviceForm" :rules="rules" ref="deviceForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="设备名称" prop="deviceName">
        <el-input v-model="deviceForm.deviceName" style="float:left;width: 200px;margin: 0 0 0 5px"></el-input>
      </el-form-item>

      <el-form-item label="所属会议室" prop="laboratory">
        <select-customize-option :customizeOption="laboratoryList" v-model="deviceForm.laboratory"
                       style="float:left;width: 200px;margin: 0 0 0 5px"></select-customize-option>
      </el-form-item>

      <el-form-item label="设备类型" prop="deviceType">
        <select-config-option name="deviceType" v-model="deviceForm.deviceType"
                              style="float:left;width: 200px;margin: 0 0 0 5px"></select-config-option>
      </el-form-item>
      <el-form-item>
        <el-tooltip content="添加" placement="bottom" effect="light">
          <el-button type="success" icon="el-icon-check" circle @click="submitForm('deviceForm')"
                     style="clear:both;float: left;margin-left: 0px"></el-button>
        </el-tooltip>
        <el-tooltip content="取消" placement="bottom" effect="light">
          <el-button el-button type="info" icon="el-icon-close" circle @click="cancelSubmit"
                     style="margin-right: 100px"></el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import deviceAPI from '../../api/device/DeviceAPI'

  import laboratoryAPI from '../../api/laboratory/LaboratoryAPI'

  import selectConfigOption from '../../components/SelectConfigOption'

  import selectCustomizeOption from '../../components/SelectCustomizeOption'

  export default {
    name: "add-device",
    components: {
      selectConfigOption, selectCustomizeOption
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
        deviceForm: {
          deviceName: '',
          deviceType: '',
          laboratory: '',
        },

        laboratoryList: [],

        radio: '1',

        isUpload: false,

        rules: {
          deviceName: [
            {required: true, message: '请输入设备名称', trigger: 'blur'},
          ],
          laboratory: [
            {required: true, message: '请选择所属会议室', trigger: 'blur'}
          ],
          deviceType: [
            {required: true, message: '请选择设备类别', trigger: 'blur'},
          ],
        }

      }
    },

    mounted() {
      let self = this;
      // 获取所有实验室
      self.getLaboratoryList();
    },

    methods: {

      async getLaboratoryList() {
        let self = this;
        let result = await laboratoryAPI.getLaboratoryList({page: 1, row: 1000});
        if (!result.status) {
          return self.$message({
            message: result.reason,
            type: 'warning'
          });
        }
        for (let laboratory of result.records) {
          // 构造选项列表
          self.laboratoryList.push({
            value: laboratory.id,
            label: laboratory.laboratoryName
          });
        }
        console.log(self.laboratoryList);
      },

      async submitForm(deviceFrom) {
        let self = this;
        let idAdd = true;
        self.$refs[deviceFrom].validate((valid) => {
          if (valid) {
          } else {
            idAdd = false;
          }
        });
        // 是否添加
        if (idAdd) {
          let result = await deviceAPI.addDevice(self.deviceForm);
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
