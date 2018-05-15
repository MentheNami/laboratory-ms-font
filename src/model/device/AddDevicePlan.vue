<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-tag type="warning" style="margin-bottom: 10px;font-size: 14px"><b>设备名称：</b>{{deviceForm.deviceName}}</el-tag>
      <el-tag type="primary" style="margin-bottom: 10px;font-size: 14px;margin-left: 5px"><b>设备编号：</b>{{deviceForm.deviceNo}}</el-tag>
      <el-tag type="danger" style="margin-bottom: 10px;font-size: 14px;margin-left: 5px"><b>状态：</b>{{deviceForm.deviceStatus}}</el-tag>
    </div>
    <div style="width: 100%">
      <el-form :model="devicePlanForm" :rules="rules" ref="devicePlanForm" :inline="true" label-width="100px" style="width: 100%">

        <el-form-item label="方案类型" prop="programType" >
          <select-config-option style="width: 180px" name="deviceStatus" v-model="devicePlanForm.programType"></select-config-option>
        </el-form-item>

        <el-form-item label="执行时间" prop="executionDate" >
          <el-date-picker
            v-model="devicePlanForm.executionDate"
            type="date"
            placeholder="请选项执行日期"
            style="">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="方案描述" prop="description" >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入方案描述"
            v-model="devicePlanForm.description"
            style="width: 520px"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-tooltip content="申请" placement="bottom" effect="light">
            <el-button type="success" icon="el-icon-check" circle @click="submitForm('devicePlanForm')"
                       style=""></el-button>
          </el-tooltip>
          <el-tooltip content="取消" placement="bottom" effect="light">
            <el-button el-button type="info" icon="el-icon-close" circle @click="cancelSubmit"
                       style=""></el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

  import deviceAPI from '../../api/device/DeviceAPI'

  import devicePlanAPI from '../../api/device/DevicePlanAPI'

  import selectConfigOption from '../../components/SelectConfigOption'

  export default {
    name: "add-device-plan",

    components: {
      selectConfigOption
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
      },
    },

    data() {
      return {
        deviceForm: {},
        devicePlanForm: {
          deviceId: '',
          programType: '',
          description: '',
          executionDate: ''
        },

        rules: {
          programType: [
            {required: true, message: '请选择方案类型', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '请输入方案描述', trigger: 'blur'}
          ],
          executionDate: [
            {required: true, message: '请选择方案执行日期', trigger: 'blur'},
          ],
        }
      }
    },

    // 组件渲染之后
    mounted() {
      let self = this;
      // 设置设备id
      self.devicePlanForm.deviceId = self.id;
      self.initData();
    },

    methods: {

      // 初始化数据
      async initData() {
        let self = this;
        let result = await deviceAPI.selectDetail({id: self.id});
        if (!result.status) {
          // 设备信息获取失败
          return self.$message({
            message: result.reason,
            type: 'warning'
          });
        } else {
          // 设备信息获取成功
          self.deviceForm = result.detail;
        }
      },

      async submitForm(devicePlanForm) {
        let self = this;
        let idAdd = true;
        self.$refs[devicePlanForm].validate((valid) => {
          if (valid) {
          } else {
            idAdd = false;
          }
        });
        // 是否添加
        if (idAdd) {
          let date = new Date(self.devicePlanForm.executionDate.valueOf());
          self.devicePlanForm.executionDate = date.getFullYear() + '/'+ (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/'+ date.getDate();
          let result = await devicePlanAPI.addDeviceProgram(self.devicePlanForm);
          if (result.status) {
            self.$message({
              message: '操作成功',
              type: 'success'
            });
            // 操作成功之后
            self.close();
            self.getList();
          } else {
            // 操作失败
            return self.$message({
              message: result.reason,
              type: 'warning'
            });
          }
        }
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
