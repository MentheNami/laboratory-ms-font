<template>
  <div class="add-dialog">
    <el-form :model="deviceForm" :rules="rules" ref="deviceForm" label-width="150px" class="demo-ruleForm">


      <el-form-item label="设备名称" prop="deviceName" >
        <el-input v-model="deviceForm.deviceName" style="float:left;width: 200px;margin: 0 0 0 5px"></el-input>
      </el-form-item>

      <el-form-item label="所属会议室" prop="laboratory" >
        <select-option  v-model="deviceForm.laboratory" style="float:left;width: 200px;margin: 0 0 0 5px"></select-option>
      </el-form-item>

      <el-form-item label="设备类型" prop="deviceType" >
        <el-input v-model="deviceForm.deviceType" style="float:left;width: 200px;margin: 0 0 0 5px"></el-input>
      </el-form-item>

      <el-form-item label="设备状态" prop="deviceStatus" >
        <el-input v-model="deviceForm.deviceStatus" style="float:left;width: 200px;margin: 0 0 0 5px"></el-input>
      </el-form-item>

      <el-form-item label="是否在线" prop="isOnline"  >
        <el-radio v-model="deviceForm.isOnline" label="1" style="float: left;margin: 12px 0 0 40px">是</el-radio>
        <el-radio v-model="deviceForm.isOnline" label="2"  style="float: left;margin: 12px 0 0 40px">否</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('deviceFrom')" style="clear:both;float: left;margin-left: 0px">添加</el-button>
        <el-button @click="cancelSubmit" style="margin-right: 100px">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import deviceAPI from '../../../api/device/DeviceAPI'

  import selectOption from '../../../components/SelectConfigOption'

  export default {
    name: "add-device",
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
          deviceName:'',
          deviceType:'',
          deviceStatus:'',
          laboratory:'',
          isOnline:'',
        },
        radio: '1',

        isUpload: false,

        rules: {
          deviceName: [
            { required: true, message: '请输入设备名称', trigger: 'blur' },
          ],
          laboratory: [
            { required: true, message: '请选择所属会议室', trigger:'blur' }
          ],
          deviceType: [
            { required: true, message: '请选择设备类别', trigger: 'blur' },
          ],
          deviceStatus: [
            { required: true, message: '请输入状态', trigger: 'blur' },
          ],
        }

      }
    },


    methods: {

      async submitForm(deviceFrom) {
        let self = this;
        self.$refs[deviceFrom].validate((valid) => {
          if (valid) {
          } else {
            return false;
          }
        });
        // 校验通过
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
