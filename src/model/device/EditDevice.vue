<template>
  <div class="add-dialog">
    <el-form :model="deviceForm" :rules="rules" ref="deviceForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="设备名称" prop="deviceName">
        <el-input v-model="deviceForm.deviceName" style="float:left;width: 200px;margin: 0 0 0 5px"></el-input>
      </el-form-item>

      <el-form-item label="所属实验室" prop="laboratory">
        <select-customize-option :customizeOption="laboratoryList" v-model="deviceForm.laboratory"
                                 style="float:left;width: 200px;margin: 0 0 0 5px"></select-customize-option>
      </el-form-item>

      <el-form-item label="设备类型" prop="deviceType">
        <select-config-option name="deviceType" v-model="deviceForm.deviceType"
                              style="float:left;width: 200px;margin: 0 0 0 5px"></select-config-option>
      </el-form-item>
      <el-form-item>
        <el-tooltip content="修改" placement="bottom" effect="light">
          <el-button type="primary" icon="icon-tsy-xiugai-copy" circle @click="submitForm('deviceForm')"
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

  import deviceAPI from '../../api/device/DeviceAPI'

  import laboratoryAPI from '../../api/laboratory/LaboratoryAPI'

  import selectConfigOption from '../../components/SelectConfigOption'

  import selectCustomizeOption from '../../components/SelectCustomizeOption'

    export default {
        name: "edit-device",
      components: {
        selectConfigOption, selectCustomizeOption
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
          deviceForm: {},

          laboratoryList: [],

          radio: '1',

          isUpload: false,

          rules: {
            deviceName: [
              {required: true, message: '请输入设备名称', trigger: 'blur'},
            ],
            laboratory: [
              {required: true, message: '请选择所属实验室', trigger: 'blur'}
            ],
            deviceType: [
              {required: true, message: '请选择设备类别', trigger: 'blur'},
            ],
          }

        }
      },

      mounted() {
        let self = this;
        self.getDevice();
        // 获取所有实验室
        self.getLaboratoryList();
      },

      methods: {

          async getDevice() {
            let self = this;
            let result = await deviceAPI.selectById({id: self.id});
            if (!result.status) {
              return self.$message({
                message: result.reason,
                type: 'warning'
              });
            }
            self.deviceForm = result.detail;
          },

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
        },

        async submitForm(deviceFrom) {
          let self = this;
          let idUpdate = true;
          self.$refs[deviceFrom].validate((valid) => {
            if (valid) {
            } else {
              idUpdate = false;
            }
          });
          // 是否更新
          if (idUpdate) {
            let result = await deviceAPI.updateDevice(self.deviceForm);
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

</style>
