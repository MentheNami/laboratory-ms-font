<template>
  <div class="add-dialog">
    <el-form :model="educationRecordForm" :rules="rules" ref="educationRecordForm" label-width="110px"
             class="demo-ruleForm"
             label-position="right" :inline="true">
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="educationRecordForm.realName" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <select-customize-option :customizeOption="provinceList"
                                 v-model="province"></select-customize-option>
      </el-form-item>

      <el-form-item label="毕业院校" prop="school">
        <select-customize-option :customizeOption="universityList"
                                 v-model="educationRecordForm.school"></select-customize-option>
      </el-form-item>

      <el-form-item label="毕业日期" prop="graduationDate">
        <el-date-picker
          v-model="educationRecordForm.graduationDate"
          type="date"
          value-format="yyyy/MM/dd"
          placeholder="选择毕业日期"
          style="width: 200px">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="学历" prop="academicQualifications" >
        <select-config-option name="education"
                              v-model="educationRecordForm.academicQualifications" style="width: 200px"></select-config-option>
      </el-form-item>

      <el-form-item label="毕业证书编号" prop="graduationCertificateNo">
        <el-input v-model="educationRecordForm.graduationCertificateNo" style="width: 200px"></el-input>
      </el-form-item>

      <el-form-item label="学位" prop="academicDegree">
        <select-config-option name="educationalLevel"
                              v-model="educationRecordForm.academicDegree" style="width: 200px"></select-config-option>
      </el-form-item>

      <el-form-item label="学位证书编号" prop="academicDegreeCertificateNo">
        <el-input v-model="educationRecordForm.academicDegreeCertificateNo" style="width: 200px"></el-input>
      </el-form-item>

      <el-form-item>
        <el-tooltip content="建立档案" placement="bottom" effect="light">
          <el-button type="primary" icon="icon-tsy-new" circle @click="submitForm('educationRecordForm')"
                     style="clear:both;float: left"></el-button>
        </el-tooltip>
        <el-tooltip content="取消" placement="bottom" effect="light">
          <el-button el-button type="info" icon="icon-tsy-quxiao" circle @click="cancelSubmit"
                     style="margin-left: 100px"></el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import utilsAPI from '../../api/common/utils'
  import educationRecordAPI from '../../api/info/EducationRecordAPI'

  import selectConfigOption from '../../components/SelectConfigOption'
  import selectCustomizeOption from '../../components/SelectCustomizeOption'

  export default {
    name: "add-education-record",

    components: {selectConfigOption, selectCustomizeOption},

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

        province: 22,

        // 省份列表
        provinceList: [],

        // 大学列表
        universityList: [],

        educationRecordForm: {
          realName: '',
          userId: '',
          graduationDate: '',
          school: '',
          academicQualifications: '',
          academicDegreeCertificateNo: '',
          academicDegree: '',
          graduationCertificateNo: ''
        },

        rules: {
          realName: [
            {required: true, message: '你忘记告诉我真实姓名啦', trigger: 'blur'},
          ],
          school: [
            {required: true, message: '请选择毕业院校', trigger: 'blur'},
          ],
          graduationDate: [
            {required: true, message: '请选择毕业日期', trigger: 'blur'}
          ],
          academicQualifications: [
            {required: true, message: '请选择学历', trigger: 'blur'},
          ],
          graduationCertificateNo: [
            {required: true, message: '请填写毕业证书编号', trigger: 'blur'},
          ],
          academicDegree: [
            {required: true, message: '请选择学位', trigger: 'blur'},
          ],
          academicDegreeCertificateNo: [
            {required: true, message: '请输入学位证书编号', trigger: 'blur'},
          ],
        }
      }
    },

    // 组件渲染之后
    mounted() {
      let self = this;
      // 获取省份列表
      self.educationRecordForm.userId = self.id;
      self.getProvinceList();
      self.getUniversityList();
    },

    methods: {

      // 获取省份
      async getProvinceList() {
        let self = this;
        let result = await utilsAPI.getProvinceList();
        if (!result.status) {
          return self.$message({
            message: result.reason,
            type: 'warning'
          });
        }
        // 构造数据
        for (let province of result.records) {
          self.provinceList.push({value: province.id, label: province.provinceName});
        }
      },

      // 获取学校
      async getUniversityList() {
        let self = this;
        let result = await utilsAPI.getUniversityList({provinceId: self.province});
        if (!result.status) {
          return self.$message({
            message: result.reason,
            type: 'warning'
          });
        }
        // 构造数据
        for (let university of result.records) {
          self.universityList.push({value: university.id, label: university.universityName});
        }
      },

      async submitForm(educationRecordForm) {
        let self = this;
        let isAdd = false;
        self.$refs[educationRecordForm].validate((valid) => {
          if (valid) {
            isAdd = true;
          } else {
            return false;
          }
        });
        if (isAdd) {
          let result = await educationRecordAPI.addLaboratoryUser(self.educationRecordForm);
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

    watch: {
      province() {
      let self = this;
      self.educationRecordForm.school = '';
      self.universityList = [];
      self.getUniversityList();
    }
  }
  }
</script>

<style scoped>

</style>
