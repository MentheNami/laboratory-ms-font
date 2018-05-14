<template>
  <div>
    <div>
      <p>
        姓名：{{userInfoForm.realName}}
        电话号码：{{userInfoForm.cellPhone}}
        邮箱：{{userInfoForm.email}}
      </p>
    </div>
    <div>
      <p>
        毕业日期：{{educationRecordForm.graduationDate}}
        毕业院校(通过一个a标签链接官网)：<a :href="educationRecordForm.website">{{educationRecordForm.school}}</a>
        学历：{{educationRecordForm.academicQualifications}}
        学位：{{educationRecordForm.academicDegree}}
        毕业证编号：{{educationRecordForm.graduationCertificateNo}}
        学位证编号：{{educationRecordForm.academicDegreeCertificateNo}}
      </p>
    </div>
    <div>
      <span> 这是一个不需要翻页的表格，不需要边框等等，可以缩小一点</span>
      <hr/>
      <el-tag type="success">工作经历</el-tag>
      <el-table
        :data="workRecordList"
        empty-text="暂无工作经历"
        style="width: 80%">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="beginDate"
          label="开始时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="结束时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="工作单位">
        </el-table-column>
        <el-table-column
          prop="workPosition"
          label="职务">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

  // 引入档案学历API
  import educationRecordAPI from '../../api/info/EducationRecordAPI'

  export default {
    name: "base-info",
    data() {
      return {

        // 个人档案信息
        educationRecordForm: {},
        // 个人基本信息
        userInfoForm: {},
        // 个人工作经历
        workRecordList: [],

        selectStyle: 'color:red',
        selectStyle22: 'color:black',
        buttonStyle: ''
      }
    },

    // 组件渲染之后
    mounted() {
      let self = this;
      self.initData();
    },

    methods: {

      async initData() {
        let self = this;
        let result = await educationRecordAPI.getSelfEducationRecord();
        self.userInfoForm = result.detail.simpleUserInfoVO;
        self.educationRecordForm = result.detail.simpleEducationRecordVO;
        self.workRecordList = result.detail.simpleWorkRecordVOList;
      },

    }
  }
</script>

<style scoped>

</style>
